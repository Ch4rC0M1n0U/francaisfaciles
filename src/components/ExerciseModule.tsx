/**
 * FrançaisPro - Module d'exercices classiques
 * Composant pour les exercices générés par IA avec suivi des performances
 * 
 * @author FrançaisPro Team
 * @version 1.0.0
 * @license MIT
 */

import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle, XCircle, Lightbulb, RotateCcw, Brain } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { aiService } from '../services/aiService';
import { db } from '../services/database';
import { EncouragementModal } from './EncouragementModal';
import { useEncouragement } from '../hooks/useEncouragement';

interface ExerciseModuleProps {
  module: string;
  onBack: () => void;
}

interface Exercise {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'facile' | 'moyen' | 'difficile';
  skillId?: string;
}

export const ExerciseModule: React.FC<ExerciseModuleProps> = ({ module, onBack }) => {
  const { updateStats, currentUser } = useUser();
  const { 
    encouragement, 
    closeEncouragement, 
    checkEncouragementTriggers,
    checkLevelMilestone,
    checkMotivationalBoost 
  } = useEncouragement();
  
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [totalExercises] = useState(5);
  const [isLoading, setIsLoading] = useState(true);
  const [consecutiveWrong, setConsecutiveWrong] = useState(0);

  useEffect(() => {
    generateExercises();
  }, [module]);

  useEffect(() => {
    if (exercises.length > 0) {
      setCurrentExercise(exercises[exerciseIndex]);
    }
  }, [exerciseIndex, exercises]);

  const generateExercises = async () => {
    if (!currentUser) return;
    
    setIsLoading(true);
    try {
      // La difficulté est maintenant calculée automatiquement
      const generatedExercises = await aiService.generateAdaptiveExercises({
        module: module as any,
        difficulty: 'facile', // Valeur par défaut, sera recalculée automatiquement
        userLevel: currentUser.level,
        userId: currentUser.id
      }, totalExercises);

      setExercises(generatedExercises);
      setCurrentExercise(generatedExercises[0]);
    } catch (error) {
      console.error('Error generating exercises:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null || !currentExercise) return;
    
    setShowResult(true);
    const isCorrect = selectedAnswer === currentExercise.correctAnswer;
    
    if (isCorrect) {
      setScore(score + 1);
      updateStats(20, module);
      setConsecutiveWrong(0);
    } else {
      updateStats(0, module);
      setConsecutiveWrong(prev => prev + 1);
    }

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
    
    const currentAccuracy = Math.round(((score + (isCorrect ? 1 : 0)) / (exerciseIndex + 1)) * 100);
    checkEncouragementTriggers(isCorrect, currentAccuracy, exerciseIndex + 1);
    
    if (!isCorrect) {
      checkMotivationalBoost(consecutiveWrong + 1, currentAccuracy);
    }
    
    if (currentUser) {
      const oldLevel = currentUser.level;
      setTimeout(() => {
        const updatedUser = db.getUserById(currentUser.id);
        if (updatedUser && updatedUser.level > oldLevel) {
          checkLevelMilestone(updatedUser.level, oldLevel);
        }
      }, 100);
    }
  };

  const handleNext = () => {
    if (exerciseIndex < totalExercises - 1) {
      setExerciseIndex(exerciseIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      alert(`Série terminée ! Score: ${score + (selectedAnswer === currentExercise?.correctAnswer ? 1 : 0)}/${totalExercises}`);
      onBack();
    }
  };

  const handleRestart = () => {
    setExerciseIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <div className="animate-spin mx-auto mb-6">
            <Brain className="h-16 w-16 text-blue-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Génération d'exercices personnalisés...
          </h2>
          <p className="text-gray-600">
            L'IA ({aiService.getCurrentProvider()}) analyse tes points faibles et prépare des exercices adaptés
          </p>
        </div>
      </div>
    );
  }

  if (!currentExercise) {
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

  const moduleInfo = {
    orthographe: { title: 'Orthographe', color: 'blue', emoji: '✏️' },
    grammaire: { title: 'Grammaire', color: 'green', emoji: '📝' },
    vocabulaire: { title: 'Vocabulaire', color: 'purple', emoji: '📚' },
    comprehension: { title: 'Compréhension', color: 'orange', emoji: '🧠' }
  };

  const info = moduleInfo[module as keyof typeof moduleInfo];
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
                  <span>{info.emoji}</span>
                  <span>{info.title} IA</span>
                </h1>
                <p className="text-blue-100">Exercice {exerciseIndex + 1} sur {totalExercises} • Généré par IA</p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-lg font-semibold">Score: {score}/{exerciseIndex + (showResult && isCorrect ? 1 : 0)}</p>
              <div className="w-32 bg-white bg-opacity-30 rounded-full h-2 mt-2">
                <div 
                  className="bg-white h-2 rounded-full transition-all duration-500"
                  style={{ width: `${((exerciseIndex + 1) / totalExercises) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                currentExercise.difficulty === 'facile' 
                  ? 'bg-green-100 text-green-800'
                  : currentExercise.difficulty === 'moyen'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {currentExercise.difficulty.charAt(0).toUpperCase() + currentExercise.difficulty.slice(1)}
              </span>
              
              <button
                onClick={handleRestart}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <RotateCcw className="h-4 w-4" />
                <span className="text-sm">Nouveaux exercices</span>
              </button>
            </div>
            
            <h2 className="text-xl font-semibold text-gray-800 mb-6 leading-relaxed">
              {currentExercise.question}
            </h2>
          </div>

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
                  buttonClass += "border-gray-300 hover:border-gray-400 hover:bg-gray-50";
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={buttonClass}
                  disabled={showResult}
                >
                  <div className="flex items-center space-x-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center text-sm font-semibold">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="font-medium">{option}</span>
                    {showResult && index === currentExercise.correctAnswer && (
                      <CheckCircle className="h-5 w-5 text-green-600 ml-auto" />
                    )}
                    {showResult && index === selectedAnswer && index !== currentExercise.correctAnswer && (
                      <XCircle className="h-5 w-5 text-red-600 ml-auto" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

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
                  {isCorrect ? (
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  ) : (
                    <XCircle className="h-6 w-6 text-red-600" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className={`font-bold text-lg ${
                    isCorrect ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {isCorrect ? 'Bravo ! 🎉' : 'Pas tout à fait... 🤔'}
                  </h3>
                  <div className="mt-3 flex items-start space-x-2">
                    <Lightbulb className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700 leading-relaxed">{currentExercise.explanation}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex space-x-4">
            {!showResult && selectedAnswer !== null && (
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
                className={`flex-1 bg-gradient-to-r from-${info.color}-500 to-${info.color}-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-${info.color}-600 hover:to-${info.color}-700 transition-all duration-200 transform hover:scale-105`}
              >
                {exerciseIndex < totalExercises - 1 ? 'Exercice suivant →' : 'Terminer la série'}
              </button>
            )}
          </div>
        </div>
      </div>
      
      <EncouragementModal
        isOpen={encouragement.isOpen}
        onClose={closeEncouragement}
        type={encouragement.type}
        data={encouragement.data}
      />
    </div>
  );
};