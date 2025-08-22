/**
 * FrançaisPro - Timer Pomodoro pour TDAH
 * Composant de gestion du temps adapté aux enfants avec troubles de l'attention
 * 
 * @author FrançaisPro Team
 * @version 1.0.0
 * @license MIT
 */

import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Settings, Clock, Brain, Zap, Check } from 'lucide-react';
import { useUser } from '../context/UserContext';

interface PomodoroTimerProps {
  isActive: boolean;
  onToggle: () => void;
}

interface PomodoroSettings {
  workDuration: number; // en minutes
  shortBreak: number;
  longBreak: number;
  sessionsBeforeLongBreak: number;
}

export const PomodoroTimer: React.FC<PomodoroTimerProps> = ({ isActive, onToggle }) => {
  const { currentUser } = useUser();
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [currentSession, setCurrentSession] = useState<'work' | 'shortBreak' | 'longBreak'>('work');
  const [sessionCount, setSessionCount] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [showBreakOverlay, setShowBreakOverlay] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageIndex, setMessageIndex] = useState(0);
  const [tempSettings, setTempSettings] = useState<PomodoroSettings>({
    workDuration: 15,
    shortBreak: 5,
    longBreak: 15,
    sessionsBeforeLongBreak: 4
  });
  const [settings, setSettings] = useState<PomodoroSettings>({
    workDuration: 15,
    shortBreak: 5,
    longBreak: 15,
    sessionsBeforeLongBreak: 4
  });

  // Messages d'encouragement par phase
  const getEncouragementMessages = () => {
    const workMessages = [
      "💪 Tu peux le faire ! Reste concentré !",
      "🎯 Focus ! Tu es sur la bonne voie !",
      "🚀 Allez, encore un petit effort !",
      "⭐ Tu es un champion de la concentration !",
      "🔥 Tu brûles les étapes ! Continue !",
      "🧠 Ton cerveau absorbe tout ! Génial !",
      "💎 Chaque minute compte, tu es précieux !",
      "🌟 Tu illumines ton apprentissage !"
    ];
    
    const breakMessages = [
      "😌 Parfait ! Tu mérites cette pause !",
      "🌈 Repose-toi bien, tu l'as mérité !",
      "🍃 Respire profondément, tu es formidable !",
      "☀️ Profite de ce moment de détente !",
      "🎈 Pause bien méritée, champion !",
      "🌸 Détends-toi, tu progresses super bien !",
      "🦋 Laisse ton esprit se reposer !",
      "🌺 Tu es sur le bon chemin !"
    ];

    return currentSession === 'work' ? workMessages : breakMessages;
  };

  // Messages spéciaux pour l'overlay de pause
  const getBreakOverlayMessages = () => {
    const shortBreakMessages = [
      "🌟 Pause courte ! Étire-toi et respire !",
      "💧 Bois un verre d'eau, tu le mérites !",
      "🌸 Regarde par la fenêtre, détends tes yeux !",
      "🧘‍♂️ Quelques respirations profondes !",
      "🎵 Écoute ta musique préférée !",
      "🤸‍♂️ Bouge un peu, réveille ton corps !"
    ];
    
    const longBreakMessages = [
      "🏖️ Grande pause ! Va prendre l'air !",
      "🍎 C'est le moment de grignoter sainement !",
      "🚶‍♂️ Une petite marche te ferait du bien !",
      "📱 Appelle un ami, socialise un peu !",
      "🎨 Fais quelque chose de créatif !",
      "🛋️ Allonge-toi et repose-toi vraiment !"
    ];
    
    return currentSession === 'longBreak' ? longBreakMessages : shortBreakMessages;
  };
  // Durées recommandées selon l'âge pour enfants TDAH
  const getRecommendedSettings = (age: number): PomodoroSettings => {
    if (age <= 8) {
      return {
        workDuration: 10,
        shortBreak: 5,
        longBreak: 15,
        sessionsBeforeLongBreak: 3
      };
    } else if (age <= 12) {
      return {
        workDuration: 15,
        shortBreak: 5,
        longBreak: 15,
        sessionsBeforeLongBreak: 4
      };
    } else if (age <= 15) {
      return {
        workDuration: 20,
        shortBreak: 5,
        longBreak: 20,
        sessionsBeforeLongBreak: 4
      };
    } else {
      return {
        workDuration: 25,
        shortBreak: 5,
        longBreak: 25,
        sessionsBeforeLongBreak: 4
      };
    }
  };

  // Initialiser avec les paramètres recommandés SEULEMENT au premier chargement
  useEffect(() => {
    if (currentUser) {
      const recommended = getRecommendedSettings(currentUser.age);
      setSettings(recommended);
      setTempSettings(recommended);
      setTimeLeft(recommended.workDuration * 60);
      // Initialiser le premier message
      const messages = getEncouragementMessages();
      setCurrentMessage(messages[0]);
      setMessageIndex(0);
    }
  }, [currentUser?.id]); // Seulement quand l'utilisateur change

  // Changer le message d'encouragement toutes les 30 secondes
  useEffect(() => {
    let messageInterval: NodeJS.Timeout;
    
    if (isRunning) {
      messageInterval = setInterval(() => {
        const messages = getEncouragementMessages();
        setMessageIndex(prev => {
          const newIndex = (prev + 1) % messages.length;
          setCurrentMessage(messages[newIndex]);
          return newIndex;
        });
      }, 45000); // Changer toutes les 45 secondes
    }
    
    return () => {
      if (messageInterval) clearInterval(messageInterval);
    };
  }, [isRunning, currentSession]);

  // Mettre à jour le message quand la session change
  useEffect(() => {
    const messages = getEncouragementMessages();
    setCurrentMessage(messages[0]);
    setMessageIndex(0);
  }, [currentSession]);
  // Timer principal - NE PAS réinitialiser automatiquement
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleSessionComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft]);

  const handleSessionComplete = () => {
    setIsRunning(false);
    
    // Son de notification (optionnel)
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Pomodoro terminé !', {
        body: currentSession === 'work' ? 'Temps de pause ! 🎉' : 'Retour au travail ! 💪',
        icon: '/favicon.ico'
      });
    }
    
    // Passer à la session suivante
    if (currentSession === 'work') {
      setSessionCount(prev => prev + 1);
      const nextSession = (sessionCount + 1) % settings.sessionsBeforeLongBreak === 0 ? 'longBreak' : 'shortBreak';
      setCurrentSession(nextSession);
      setTimeLeft((nextSession === 'longBreak' ? settings.longBreak : settings.shortBreak) * 60);
      setShowBreakOverlay(true);
      // Démarrer automatiquement la pause après un petit délai
      setTimeout(() => {
        setIsRunning(true);
      }, 1000);
    } else {
      setCurrentSession('work');
      setTimeLeft(settings.workDuration * 60);
      setShowBreakOverlay(false);
      // Ne pas redémarrer automatiquement le travail
    }
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setCurrentSession('work');
    setSessionCount(0);
    setTimeLeft(settings.workDuration * 60);
    setShowBreakOverlay(false);
  };

  const applySettings = () => {
    setSettings(tempSettings);
    setIsRunning(false);
    setCurrentSession('work');
    setSessionCount(0);
    setTimeLeft(tempSettings.workDuration * 60);
    setShowSettings(false);
    setShowBreakOverlay(false);
  };

  const skipBreak = () => {
    setCurrentSession('work');
    setTimeLeft(settings.workDuration * 60);
    setShowBreakOverlay(false);
    setIsRunning(false);
  };
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getSessionInfo = () => {
    switch (currentSession) {
      case 'work':
        return { title: 'Temps de travail', color: 'blue', icon: Brain, bgColor: 'bg-blue-500', textColor: 'text-blue-600' };
      case 'shortBreak':
        return { title: 'Pause courte', color: 'green', icon: Zap, bgColor: 'bg-green-500', textColor: 'text-green-600' };
      case 'longBreak':
        return { title: 'Pause longue', color: 'purple', icon: Clock, bgColor: 'bg-purple-500', textColor: 'text-purple-600' };
    }
  };

  const sessionInfo = getSessionInfo();
  const SessionIcon = sessionInfo.icon;
  const progress = currentSession === 'work' 
    ? ((settings.workDuration * 60 - timeLeft) / (settings.workDuration * 60)) * 100
    : currentSession === 'shortBreak'
    ? ((settings.shortBreak * 60 - timeLeft) / (settings.shortBreak * 60)) * 100
    : ((settings.longBreak * 60 - timeLeft) / (settings.longBreak * 60)) * 100;

  // Couleur dynamique selon le temps restant
  const getTimerColor = () => {
    const percentage = (timeLeft / (currentSession === 'work' ? settings.workDuration * 60 : 
                      currentSession === 'shortBreak' ? settings.shortBreak * 60 : settings.longBreak * 60)) * 100;
    
    if (percentage > 50) return sessionInfo.textColor;
    if (percentage > 25) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressColor = () => {
    const percentage = (timeLeft / (currentSession === 'work' ? settings.workDuration * 60 : 
                      currentSession === 'shortBreak' ? settings.shortBreak * 60 : settings.longBreak * 60)) * 100;
    
    if (percentage > 50) return sessionInfo.bgColor;
    if (percentage > 25) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  if (!isActive) return null;

  // Overlay plein écran pour les pauses
  if (showBreakOverlay) {
    const overlayMessages = getBreakOverlayMessages();
    const randomMessage = overlayMessages[Math.floor(Math.random() * overlayMessages.length)];
    
    return (
      <div className="fixed inset-0 z-50 bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 flex items-center justify-center">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative z-10 text-center text-white max-w-2xl mx-auto px-8">
          {/* Animation de particules */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full opacity-30 animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              ></div>
            ))}
          </div>
          
          {/* Contenu principal */}
          <div className="relative z-20">
            <div className="mb-8">
              <SessionIcon className="h-24 w-24 mx-auto mb-6 animate-bounce" />
              <h1 className="text-6xl font-bold mb-4 animate-pulse">
                {formatTime(timeLeft)}
              </h1>
              <h2 className="text-3xl font-semibold mb-6">
                {sessionInfo.title}
              </h2>
            </div>
            
            {/* Message d'encouragement */}
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-8 mb-8">
              <p className="text-2xl font-medium mb-4">
                {randomMessage}
              </p>
              <div className="w-full bg-white bg-opacity-30 rounded-full h-4 mb-4">
                <div 
                  className="bg-white h-4 rounded-full transition-all duration-1000 shadow-lg"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-lg opacity-90">
                {timeLeft > 60 
                  ? `Plus que ${Math.ceil(timeLeft / 60)} minute${Math.ceil(timeLeft / 60) > 1 ? 's' : ''} de détente !`
                  : `Plus que ${timeLeft} seconde${timeLeft > 1 ? 's' : ''} !`
                }
              </p>
            </div>
            
            {/* Conseils de détente */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {[
                { icon: '🌬️', text: 'Respire profondément' },
                { icon: '💧', text: 'Bois de l\'eau' },
                { icon: '🤸‍♂️', text: 'Étire-toi' },
                { icon: '👀', text: 'Repose tes yeux' },
                { icon: '🚶‍♂️', text: 'Bouge un peu' },
                { icon: '🎵', text: 'Écoute de la musique' }
              ].map((tip, index) => (
                <div 
                  key={index}
                  className="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-opacity-25 transition-all duration-300"
                >
                  <div className="text-3xl mb-2">{tip.icon}</div>
                  <p className="text-sm font-medium">{tip.text}</p>
                </div>
              ))}
            </div>
            
            {/* Boutons d'action */}
            <div className="flex justify-center space-x-4">
              <button
                onClick={toggleTimer}
                className={`flex items-center space-x-2 px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg ${
                  isRunning 
                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
              >
                {isRunning ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                <span>{isRunning ? 'Pause' : 'Reprendre'}</span>
              </button>
              
              <button
                onClick={skipBreak}
                className="flex items-center space-x-2 px-8 py-4 rounded-xl bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-semibold text-lg transition-all transform hover:scale-105 backdrop-blur-sm"
              >
                <span>Passer la pause</span>
              </button>
            </div>
            
            {/* Statistiques */}
            <div className="mt-8 flex justify-center space-x-8 text-center">
              <div>
                <div className="text-2xl font-bold">{sessionCount}</div>
                <div className="text-sm opacity-75">Sessions</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{Math.round(progress)}%</div>
                <div className="text-sm opacity-75">Progression</div>
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {currentSession === 'longBreak' ? '🏖️' : '🌸'}
                </div>
                <div className="text-sm opacity-75">
                  {currentSession === 'longBreak' ? 'Grande pause' : 'Petite pause'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="fixed top-20 right-4 z-40">
      <div className={`bg-white rounded-xl shadow-lg border-2 p-4 w-80 ${isRunning ? 'border-green-400 shadow-green-200' : 'border-gray-200'}`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <SessionIcon className={`h-5 w-5 ${sessionInfo.textColor} ${isRunning ? 'animate-pulse' : ''}`} />
            <h3 className={`font-semibold ${sessionInfo.textColor}`}>{sessionInfo.title}</h3>
            {isRunning && (
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-600 font-medium">ACTIF</span>
              </div>
            )}
          </div>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
            disabled={isRunning}
          >
            <Settings className={`h-4 w-4 ${isRunning ? 'text-gray-400' : 'text-gray-600'}`} />
          </button>
        </div>

        {/* Message d'encouragement */}
        {isRunning && (
          <div className={`text-center mb-4 p-3 rounded-lg ${currentSession === 'work' ? 'bg-blue-50' : 'bg-green-50'}`}>
            <p className={`text-sm font-medium ${currentSession === 'work' ? 'text-blue-800' : 'text-green-800'}`}>
              {currentMessage}
            </p>
            <div className="flex justify-center mt-2 space-x-1">
              {getEncouragementMessages().map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === messageIndex 
                      ? (currentSession === 'work' ? 'bg-blue-500' : 'bg-green-500')
                      : 'bg-gray-300'
                  }`}
                ></div>
              ))}
            </div>
          </div>
        )}

        {/* Timer Display */}
        <div className="text-center mb-4">
          <div className={`text-4xl font-bold mb-2 ${getTimerColor()} ${isRunning ? 'animate-pulse' : ''}`}>
            {formatTime(timeLeft)}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className={`h-3 rounded-full transition-all duration-1000 ${getProgressColor()}`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          {isRunning && (
            <p className="text-xs text-gray-600 mt-2">
              {timeLeft > 60 ? `Plus que ${Math.ceil(timeLeft / 60)} minutes !` : `Plus que ${timeLeft} secondes !`}
            </p>
          )}
        </div>

        {/* Session Counter */}
        <div className="text-center mb-4">
          <div className="flex justify-center space-x-1">
            {Array.from({ length: settings.sessionsBeforeLongBreak }).map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index < sessionCount ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              ></div>
            ))}
          </div>
          <p className="text-xs text-gray-600 mt-1">
            Session {sessionCount + 1}/{settings.sessionsBeforeLongBreak}
          </p>
        </div>

        {/* Controls */}
        <div className="flex justify-center space-x-2 mb-4">
          <button
            onClick={toggleTimer}
            className={`flex items-center space-x-1 px-4 py-2 rounded-lg text-white font-medium transition-all transform hover:scale-105 ${
              isRunning 
                ? 'bg-red-500 hover:bg-red-600 shadow-red-200' 
                : `${sessionInfo.bgColor} hover:opacity-90 shadow-lg`
            }`}
          >
            {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            <span>{isRunning ? 'Pause' : 'Start'}</span>
          </button>
          <button
            onClick={resetTimer}
            className="flex items-center space-x-1 px-4 py-2 rounded-lg bg-gray-500 hover:bg-gray-600 text-white font-medium transition-all transform hover:scale-105"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Reset</span>
          </button>
        </div>

        {/* Settings Panel */}
        {showSettings && !isRunning && (
          <div className="border-t pt-4 space-y-4">
            <h4 className="font-semibold text-gray-800 text-sm flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Paramètres</span>
            </h4>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-xs text-gray-600">Travail (min)</label>
                <input
                  type="number"
                  min="5"
                  max="60"
                  value={tempSettings.workDuration}
                  onChange={(e) => setTempSettings(prev => ({ ...prev, workDuration: parseInt(e.target.value) || 15 }))}
                  className="w-16 px-2 py-1 text-xs border rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="flex justify-between items-center">
                <label className="text-xs text-gray-600">Pause courte (min)</label>
                <input
                  type="number"
                  min="1"
                  max="15"
                  value={tempSettings.shortBreak}
                  onChange={(e) => setTempSettings(prev => ({ ...prev, shortBreak: parseInt(e.target.value) || 5 }))}
                  className="w-16 px-2 py-1 text-xs border rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="flex justify-between items-center">
                <label className="text-xs text-gray-600">Pause longue (min)</label>
                <input
                  type="number"
                  min="10"
                  max="60"
                  value={tempSettings.longBreak}
                  onChange={(e) => setTempSettings(prev => ({ ...prev, longBreak: parseInt(e.target.value) || 15 }))}
                  className="w-16 px-2 py-1 text-xs border rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Recommandations par âge */}
            <div className="bg-blue-50 p-3 rounded text-xs">
              <p className="font-semibold text-blue-800 mb-1">
                💡 Recommandé pour {currentUser?.age} ans (TDAH):
              </p>
              {currentUser && (() => {
                const rec = getRecommendedSettings(currentUser.age);
                return (
                  <p className="text-blue-700">
                    Travail: {rec.workDuration}min • Pause: {rec.shortBreak}min
                  </p>
                );
              })()}
            </div>

            {/* Boutons d'action */}
            <div className="flex space-x-2">
              <button
                onClick={applySettings}
                className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-green-500 hover:bg-green-600 text-white text-xs rounded transition-all transform hover:scale-105"
              >
                <Check className="h-3 w-3" />
                <span>Appliquer</span>
              </button>
              
              <button
                onClick={() => {
                  if (currentUser) {
                    const recommended = getRecommendedSettings(currentUser.age);
                    setTempSettings(recommended);
                  }
                }}
                className="flex-1 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded transition-all transform hover:scale-105"
              >
                Recommandés
              </button>
            </div>
          </div>
        )}

        {/* Close Button - seulement si pas en cours */}
        {!isRunning && (
          <button
            onClick={onToggle}
            className="w-full mt-2 px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs rounded transition-colors"
          >
            Fermer le Pomodoro
          </button>
        )}

        {/* Statistiques de session */}
        {isRunning && (
          <div className="mt-4 text-center">
            <div className="flex justify-around text-xs text-gray-600">
              <div>
                <div className="font-semibold text-blue-600">{sessionCount}</div>
                <div>Sessions</div>
              </div>
              <div>
                <div className="font-semibold text-green-600">{Math.round(progress)}%</div>
                <div>Progression</div>
              </div>
              <div>
                <div className="font-semibold text-purple-600">
                  {currentSession === 'work' ? '🧠' : '😌'}
                </div>
                <div>{currentSession === 'work' ? 'Focus' : 'Pause'}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};