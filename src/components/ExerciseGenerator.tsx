/**
 * FrançaisPro - Générateur d'exercices IA
 * Composant pour les exercices adaptatifs générés en temps réel
 * 
 * @author FrançaisPro Team
 * @version 1.0.0
 * @license MIT
 */

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Sparkles, RefreshCw, Brain, Target, Clock, Zap } from 'lucide-react';
import { aiService } from '../services/aiService';
import { db } from '../services/database';
import { useUser } from '../context/UserContext';
import { EncouragementModal } from './EncouragementModal';
import { useEncouragement } from '../hooks/useEncouragement';

interface ExerciseGeneratorProps {
  module: string;
  onBack: () => void;
}

interface GeneratedExercise {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'facile' | 'moyen' | 'difficile';
}

export const ExerciseGenerator: React.FC<ExerciseGeneratorProps> = ({ module, onBack }) => {
  const { currentUser, updateStats } = useUser();
  const { 
    encouragement, 
    closeEncouragement, 
    checkEncouragementTriggers,
    checkLevelMilestone,
    checkMotivationalBoost 
  } = useEncouragement();
  
  const [exercises, setExercises] = useState<GeneratedExercise[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingNext, setIsGeneratingNext] = useState(false);
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [timeLeft, setTimeLeft] = useState(30);
  const [timerActive, setTimerActive] = useState(false);
  const [totalQuestions] = useState(20); // Série de 20 questions
  const [weakSkillsToRetry, setWeakSkillsToRetry] = useState<string[]>([]);
  const [consecutiveWrong, setConsecutiveWrong] = useState(0);

  const moduleInfo = {
    orthographe: { title: 'Orthographe', color: 'blue', emoji: '✏️' },
    grammaire: { title: 'Grammaire', color: 'green', emoji: '📝' },
    vocabulaire: { title: 'Vocabulaire', color: 'purple', emoji: '📚' },
    comprehension: { title: 'Compréhension', color: 'orange', emoji: '🧠' }
  };

  const info = moduleInfo[module as keyof typeof moduleInfo];

  useEffect(() => {
    generateInitialExercises();
  }, [module]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (timerActive && timeLeft > 0 && !showResult) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            // Temps écoulé - pas de réponse
            handleTimeOut();
            return 30;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive, timeLeft, showResult]);

  // Démarrer le timer quand un nouvel exercice commence
  useEffect(() => {
    if (exercises.length > 0 && !showResult) {
      setTimeLeft(30);
      setTimerActive(true);
      setStartTime(Date.now());
    }
  }, [currentIndex, showResult, exercises.length]);

  const generateInitialExercises = async () => {
    if (!currentUser) return;
    
    setIsGenerating(true);
    try {
      // Générer les 3 premiers exercices pour commencer rapidement
      const initialExercises = await aiService.generateAdaptiveExercises({
        module: module as any,
        difficulty: 'facile', // Valeur par défaut, sera recalculée automatiquement
        userLevel: currentUser.level,
        userId: currentUser.id
      }, 3);

      setExercises(initialExercises);
      setCurrentIndex(0);
      setScore(0);
      
      // Générer les exercices suivants en arrière-plan
      generateRemainingExercises();
    } catch (error) {
      console.error('Error generating exercises:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateRemainingExercises = async () => {
    if (!currentUser) return;
    
    try {
      // Générer les exercices restants (17 de plus pour atteindre 20)
      const remainingExercises = await aiService.generateAdaptiveExercises({
        module: module as any,
        difficulty: 'facile',
        userLevel: currentUser.level,
        userId: currentUser.id
      }, totalQuestions - 3);

      setExercises(prev => [...prev, ...remainingExercises]);
    } catch (error) {
      console.error('Error generating remaining exercises:', error);
    }
  };

  const generateNextExercise = async (targetSkill?: string) => {
    if (!currentUser) return null;
    
    setIsGeneratingNext(true);
    try {
      const newExercise = await aiService.generateExercise({
        module: module as any,
        difficulty: 'facile',
        userLevel: currentUser.level,
        userId: currentUser.id,
        focusSkills: targetSkill ? [targetSkill] : undefined
      });
      
      return newExercise;
    } catch (error) {
      console.error('Error generating next exercise:', error);
      return null;
    } finally {
      setIsGeneratingNext(false);
    }
  };

  const handleTimeOut = () => {
    if (showResult || !currentUser) return;
    
    setTimerActive(false);
    const currentExercise = exercises[currentIndex];
    const timeSpent = Date.now() - startTime;
    
    // Sauvegarder comme exercice non répondu
    db.saveExercise({
      user_id: currentUser.id,
      module,
      skill_id: currentExercise.skillId || null,
      question: currentExercise.question,
      options: JSON.stringify(currentExercise.options),
      correct_answer: currentExercise.correctAnswer,
      user_answer: null, // Pas de réponse
      is_correct: null, // Pas de réponse
      difficulty: currentExercise.difficulty,
      explanation: currentExercise.explanation,
      completed_at: new Date().toISOString(),
      time_spent: timeSpent
    });

    // Marquer cette compétence comme faible si elle existe
    if (currentExercise.skillId) {
      setWeakSkillsToRetry(prev => {
        if (!prev.includes(currentExercise.skillId!)) {
          return [...prev, currentExercise.skillId!];
        }
        return prev;
      });
    }

    setShowResult(true);
    setSelectedAnswer(null);
    
    // Message d'encouragement
    setTimeout(() => {
      alert('⏰ Temps écoulé ! Pas de panique, on continue ! 💪');
    }, 100);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult || !timerActive) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null || !currentUser) return;
    
    setTimerActive(false);
    const currentExercise = exercises[currentIndex];
    const isCorrect = selectedAnswer === currentExercise.correctAnswer;
    const timeSpent = Date.now() - startTime;
    
    // Save exercise to database
    db.saveExercise({
      user_id: currentUser.id,
      module,
      skill_id: currentExercise.skillId || null,
      question: currentExercise.question,
      options: JSON.stringify(currentExercise.options),
      correct_answer: currentExercise.correctAnswer,
      user_answer: selectedAnswer,
      is_correct: isCorrect,
      difficulty: currentExercise.difficulty,
      explanation: currentExercise.explanation,
      completed_at: new Date().toISOString().split('T')[0] + ' ' + new Date().toTimeString().split(' ')[0],
      time_spent: timeSpent
    });

    setShowResult(true);
    
    if (isCorrect) {
      setScore(score + 1);
      updateStats(20, module);
      setConsecutiveWrong(0);
      
      // Retirer de la liste des compétences faibles si réussie
      if (currentExercise.skillId) {
        setWeakSkillsToRetry(prev => prev.filter(skill => skill !== currentExercise.skillId));
      }
    } else {
      updateStats(5, module); // Small points for attempt
      setConsecutiveWrong(prev => prev + 1);
      
      // Ajouter à la liste des compétences à retravailler
      if (currentExercise.skillId && !weakSkillsToRetry.includes(currentExercise.skillId)) {
        setWeakSkillsToRetry(prev => [...prev, currentExercise.skillId!]);
      }
    }
    
    // Vérifier les déclencheurs d'encouragement
    const currentAccuracy = Math.round(((score + (isCorrect ? 1 : 0)) / (currentIndex + 1)) * 100);
    checkEncouragementTriggers(isCorrect, currentAccuracy, currentIndex + 1);
    
    // Vérifier si besoin d'encouragement motivationnel
    if (!isCorrect) {
      checkMotivationalBoost(consecutiveWrong + 1, currentAccuracy);
    }
    
    // Vérifier les jalons de niveau
    if (currentUser) {
      const oldLevel = currentUser.level;
      // Simuler une vérification de niveau après mise à jour des stats
      setTimeout(() => {
        const updatedUser = db.getUserById(currentUser.id);
        if (updatedUser && updatedUser.level > oldLevel) {
          checkLevelMilestone(updatedUser.level, oldLevel);
        }
      }, 100);
    }
  };

  const handleNext = async () => {
    const totalExercisesNeeded = totalQuestions + weakSkillsToRetry.length;
    
    if (currentIndex < totalExercisesNeeded - 1) {
      // Vérifier si on a besoin de générer un exercice ciblé
      if (currentIndex >= exercises.length - 1) {
        // Générer un exercice ciblé sur une compétence faible
        const targetSkill = weakSkillsToRetry[Math.floor(Math.random() * weakSkillsToRetry.length)];
        const newExercise = await generateNextExercise(targetSkill);
        
        if (newExercise) {
          setExercises(prev => [...prev, newExercise]);
        }
      }
      
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // End of exercises
      const finalScore = score + (selectedAnswer === exercises[currentIndex]?.correctAnswer ? 1 : 0);
      const accuracy = Math.round((finalScore / totalExercisesNeeded) * 100);
      
      let message = `🎉 Série terminée ! Score: ${finalScore}/${totalExercisesNeeded} (${accuracy}%)\n\n`;
      
      if (accuracy >= 90) {
        message += "🏆 Excellent ! Tu maîtrises parfaitement ! 🌟";
      } else if (accuracy >= 80) {
        message += "👏 Très bien ! Continue comme ça ! 💪";
      } else if (accuracy >= 70) {
        message += "👍 Bon travail ! Encore un petit effort ! 📈";
      } else {
        message += "💪 Pas mal ! On va retravailler les points difficiles ! 🎯";
      }
      
      alert(message);
      onBack();
    }
  };

  const resetSeries = async () => {
    setExercises([]);
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setWeakSkillsToRetry([]);
    await generateInitialExercises();
  };

  if (isGenerating) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <div className="animate-spin mx-auto mb-6">
            <Brain className="h-16 w-16 text-blue-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            🤖 Préparation de ta série personnalisée...
          </h2>
          <p className="text-gray-600 mb-6">
            L'IA ({aiService.getCurrentProvider()}) analyse tes points faibles et prépare {totalQuestions} exercices sur mesure
          </p>
          <div className="w-64 mx-auto bg-gray-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full animate-pulse w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (exercises.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Erreur de génération
          </h2>
          <p className="text-gray-600 mb-6">
            Impossible de générer les exercices. Vérifiez vos clés API (Gemini/Mistral).
          </p>
          <button
            onClick={onBack}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Retour au tableau de bord
          </button>
        </div>
      </div>
    );
  }

  const currentExercise = exercises[currentIndex];
  const isCorrect = selectedAnswer === currentExercise.correctAnswer;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className={`bg-gradient-to-r from-${info.color}-500 to-${info.color}-600 p-6 text-white`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={onBack}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-6 w-6" />
              </button>
              <div>
                <h1 className="text-2xl font-bold flex items-center space-x-2">
                  <Sparkles className="h-6 w-6" />
                  <span>{info.emoji} {info.title} IA</span>
                </h1>
                <p className="text-blue-100">
                  Exercice {currentIndex + 1} sur {totalQuestions + weakSkillsToRetry.length} • Série adaptative
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={resetSeries}
                className="flex items-center space-x-2 bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
                <span className="text-sm">Nouvelle série</span>
              </button>
              
              <div className="text-right">
                <p className="text-lg font-semibold">Score: {score}/{currentIndex + (showResult && isCorrect ? 1 : 0)}</p>
                <div className="w-32 bg-white bg-opacity-30 rounded-full h-2 mt-2">
                  <div 
                    className="bg-white h-2 rounded-full transition-all duration-500"
                    style={{ width: `${((currentIndex + 1) / (totalQuestions + weakSkillsToRetry.length)) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Exercise Content */}
        <div className="p-8">
          {/* Timer */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Clock className={`h-5 w-5 ${timeLeft <= 10 ? 'text-red-500' : 'text-gray-600'}`} />
                <span className={`font-semibold ${timeLeft <= 10 ? 'text-red-600' : 'text-gray-700'}`}>
                  {timeLeft}s
                </span>
              </div>
              
              {weakSkillsToRetry.length > 0 && (
                <div className="flex items-center space-x-2 text-sm text-orange-600">
                  <Target className="h-4 w-4" />
                  <span>{weakSkillsToRetry.length} notion(s) à retravailler</span>
                </div>
              )}
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-1000 ${
                  timeLeft <= 10 ? 'bg-red-500' : timeLeft <= 20 ? 'bg-yellow-500' : 'bg-green-500'
                }`}
                style={{ width: `${(timeLeft / 30) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 ${
                currentExercise.difficulty === 'facile' 
                  ? 'bg-green-100 text-green-800'
                  : currentExercise.difficulty === 'moyen'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                <Target className="h-3 w-3" />
                <span>{currentExercise.difficulty.charAt(0).toUpperCase() + currentExercise.difficulty.slice(1)}</span>
              </span>
              
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                {isGeneratingNext ? (
                  <>
                    <div className="animate-spin">
                      <Brain className="h-4 w-4" />
                    </div>
                    <span>Génération...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    <span>IA Adaptative</span>
                  </>
                )}
              </div>
            </div>
            
            <h2 className="text-xl font-semibold text-gray-800 mb-6 leading-relaxed">
              {currentExercise.question}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {currentExercise.options.map((option, index) => {
              let buttonClass = "w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ";
              
              if (showResult) {
                if (index === currentExercise.correctAnswer) {
                  buttonClass += "border-green-500 bg-green-50 text-green-800";
                } else if (index === selectedAnswer && index !== currentExercise.correctAnswer) {
                  buttonClass += "border-red-500 bg-red-50 text-red-800";
                } else {
                  buttonClass += "border-gray-200 bg-gray-50 text-gray-600";
                }
              } else {
                if (selectedAnswer === index) {
                  buttonClass += `border-${info.color}-500 bg-${info.color}-50 text-${info.color}-800`;
                } else {
                  buttonClass += `border-gray-300 hover:border-gray-400 hover:bg-gray-50 ${!timerActive ? 'opacity-50 cursor-not-allowed' : ''}`;
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={buttonClass}
                  disabled={showResult || !timerActive}
                >
                  <div className="flex items-center space-x-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center text-sm font-semibold">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="font-medium">{option}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Result and Explanation */}
          {showResult && (
            <div className={`p-6 rounded-lg border-l-4 mb-6 ${
              isCorrect 
                ? 'bg-green-50 border-green-500' 
                : 'bg-red-50 border-red-500'
            }`}>
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-full ${
                  isCorrect ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  <Brain className={`h-6 w-6 ${
                    isCorrect ? 'text-green-600' : 'text-red-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <h3 className={`font-bold text-lg ${
                    isCorrect ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {isCorrect ? 'Excellent ! 🎉' : 'Pas tout à fait... 🤔'}
                  </h3>
                  <div className="mt-3">
                    <p className="text-gray-700 leading-relaxed">{currentExercise.explanation}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-4">
            {!showResult && selectedAnswer !== null && timerActive && (
              <button
                onClick={handleSubmit}
                className={`flex-1 bg-gradient-to-r from-${info.color}-500 to-${info.color}-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-${info.color}-600 hover:to-${info.color}-700 transition-all duration-200 transform hover:scale-105`}
              >
                Valider ma réponse
              </button>
            )}
            
            {showResult && (
              <button
                onClick={handleNext}
                disabled={isGeneratingNext}
                className={`flex-1 bg-gradient-to-r from-${info.color}-500 to-${info.color}-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-${info.color}-600 hover:to-${info.color}-700 transition-all duration-200 transform hover:scale-105`}
              >
                {isGeneratingNext ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin">
                      <Zap className="h-4 w-4" />
                    </div>
                    <span>Préparation...</span>
                  </div>
                ) : (
                  currentIndex < (totalQuestions + weakSkillsToRetry.length - 1) ? 'Exercice suivant →' : 'Terminer la série'
                )}
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Modale d'encouragement */}
      <EncouragementModal
        isOpen={encouragement.isOpen}
        onClose={closeEncouragement}
        type={encouragement.type}
        data={encouragement.data}
      />
    </div>
  );
};