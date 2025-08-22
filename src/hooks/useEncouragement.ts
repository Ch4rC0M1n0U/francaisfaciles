/**
 * FrançaisPro - Hook d'encouragement
 * Logique de déclenchement des messages de motivation
 * 
 * @author FrançaisPro Team
 * @version 1.0.0
 * @license MIT
 */

import { useState, useCallback } from 'react';
import { useUser } from '../context/UserContext';

interface EncouragementData {
  streak?: number;
  score?: number;
  improvement?: number;
  exercises?: number;
  level?: number;
}

interface EncouragementState {
  isOpen: boolean;
  type: 'streak' | 'perfect' | 'improvement' | 'persistence' | 'comeback' | 'milestone';
  data: EncouragementData;
}

export const useEncouragement = () => {
  const { currentUser } = useUser();
  const [encouragement, setEncouragement] = useState<EncouragementState>({
    isOpen: false,
    type: 'streak',
    data: {}
  });

  // Historique des performances pour détecter les améliorations
  const [performanceHistory, setPerformanceHistory] = useState<{
    lastAccuracy: number;
    consecutiveCorrect: number;
    lastSessionDate: string;
    totalExercises: number;
  }>({
    lastAccuracy: 0,
    consecutiveCorrect: 0,
    lastSessionDate: '',
    totalExercises: 0
  });

  const showEncouragement = useCallback((type: EncouragementState['type'], data: EncouragementData) => {
    setEncouragement({
      isOpen: true,
      type,
      data
    });
  }, []);

  const closeEncouragement = useCallback(() => {
    setEncouragement(prev => ({ ...prev, isOpen: false }));
  }, []);

  // Vérifier les conditions d'encouragement après un exercice
  const checkEncouragementTriggers = useCallback((
    isCorrect: boolean,
    currentAccuracy: number,
    exerciseCount: number
  ) => {
    if (!currentUser) return;

    const now = new Date().toISOString().split('T')[0];
    
    // Mise à jour de l'historique
    setPerformanceHistory(prev => {
      const newHistory = {
        lastAccuracy: currentAccuracy,
        consecutiveCorrect: isCorrect ? prev.consecutiveCorrect + 1 : 0,
        lastSessionDate: now,
        totalExercises: exerciseCount
      };

      // Déclencheurs d'encouragement
      
      // 1. Série de réussites (3, 5, 7, 10+)
      if (newHistory.consecutiveCorrect >= 3 && newHistory.consecutiveCorrect % 2 === 1) {
        setTimeout(() => {
          showEncouragement('streak', { streak: newHistory.consecutiveCorrect });
        }, 500);
      }

      // 2. Score parfait (100% sur 5+ exercices)
      if (currentAccuracy === 100 && exerciseCount >= 5) {
        setTimeout(() => {
          showEncouragement('perfect', { score: currentAccuracy });
        }, 800);
      }

      // 3. Amélioration significative (+15% par rapport à la dernière session)
      const improvement = currentAccuracy - prev.lastAccuracy;
      if (improvement >= 15 && prev.lastAccuracy > 0) {
        setTimeout(() => {
          showEncouragement('improvement', { improvement: Math.round(improvement) });
        }, 1000);
      }

      // 4. Persévérance (multiples de 10 exercices)
      if (exerciseCount > 0 && exerciseCount % 10 === 0) {
        setTimeout(() => {
          showEncouragement('persistence', { exercises: exerciseCount });
        }, 1200);
      }

      // 5. Retour après absence (plus de 3 jours)
      if (prev.lastSessionDate) {
        const lastDate = new Date(prev.lastSessionDate);
        const currentDate = new Date(now);
        const daysDiff = Math.floor((currentDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
        
        if (daysDiff >= 3 && exerciseCount === 1) {
          setTimeout(() => {
            showEncouragement('comeback', {});
          }, 300);
        }
      }

      return newHistory;
    });
  }, [currentUser, showEncouragement]);

  // Vérifier les jalons de niveau
  const checkLevelMilestone = useCallback((newLevel: number, oldLevel: number) => {
    if (newLevel > oldLevel) {
      setTimeout(() => {
        showEncouragement('milestone', { level: newLevel });
      }, 1500);
    }
  }, [showEncouragement]);

  // Encouragements spéciaux pour les moments difficiles
  const checkMotivationalBoost = useCallback((
    consecutiveWrong: number,
    currentAccuracy: number
  ) => {
    // Si l'utilisateur a plusieurs erreurs consécutives, l'encourager
    if (consecutiveWrong >= 3) {
      const motivationalMessages = [
        "💪 Ne lâche rien ! Chaque erreur est une leçon !",
        "🌟 Tu es plus fort que tu ne le penses !",
        "🚀 Les champions se relèvent toujours !",
        "💡 Chaque difficulté te rend plus intelligent !",
        "🎯 Persévère, la réussite t'attend !"
      ];
      
      // Utiliser une notification discrète plutôt qu'une modale
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Courage ! 💪', {
          body: motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)],
          icon: '/favicon.ico'
        });
      }
    }
  }, []);

  return {
    encouragement,
    closeEncouragement,
    checkEncouragementTriggers,
    checkLevelMilestone,
    checkMotivationalBoost,
    performanceHistory
  };
};