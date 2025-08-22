/**
 * FrançaisPro - Modal de badges
 * Composant d'affichage des nouveaux badges obtenus
 * 
 * @author FrançaisPro Team
 * @version 1.0.0
 * @license MIT
 */

import React from 'react';
import { X, Award, Star, Sparkles } from 'lucide-react';

interface BadgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  badges: Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
    points: number;
  }>;
}

export const BadgeModal: React.FC<BadgeModalProps> = ({ isOpen, onClose, badges }) => {
  if (!isOpen || badges.length === 0) return null;

  const getBadgeInfo = (badgeId: string) => {
    const badgeMap: Record<string, { title: string; description: string; icon: string; points: number }> = {
      'first-exercise': {
        title: 'Premier pas',
        description: 'Premier exercice terminé',
        icon: '🎯',
        points: 10
      },
      'streak-3': {
        title: 'Régularité',
        description: '3 jours consécutifs',
        icon: '🔥',
        points: 25
      },
      'streak-7': {
        title: 'Une semaine parfaite',
        description: '7 jours consécutifs',
        icon: '🌟',
        points: 50
      },
      'perfect-score': {
        title: 'Sans faute',
        description: '10 exercices parfaits',
        icon: '💯',
        points: 50
      },
      'century-club': {
        title: 'Club des 100',
        description: '100 exercices terminés',
        icon: '🏆',
        points: 100
      },
      'orthographe-master': {
        title: 'Maître orthographe',
        description: 'Niveau 3 en orthographe',
        icon: '✏️',
        points: 75
      },
      'grammaire-master': {
        title: 'Maître grammaire',
        description: 'Niveau 3 en grammaire',
        icon: '📝',
        points: 75
      },
      'vocabulaire-master': {
        title: 'Maître vocabulaire',
        description: 'Niveau 3 en vocabulaire',
        icon: '📚',
        points: 75
      },
      'comprehension-master': {
        title: 'Maître compréhension',
        description: 'Niveau 3 en compréhension',
        icon: '🧠',
        points: 75
      },
      'night-owl': {
        title: 'Chouette nocturne',
        description: 'Exercice après 22h',
        icon: '🦉',
        points: 20
      },
      'early-bird': {
        title: 'Lève-tôt',
        description: 'Exercice avant 7h',
        icon: '🐦',
        points: 20
      },
      'comeback-kid': {
        title: 'Retour gagnant',
        description: 'Après une pause de 7 jours',
        icon: '🎭',
        points: 40
      },
      'all-rounder': {
        title: 'Polyvalent',
        description: 'Niveau 2 dans tous les modules',
        icon: '🎨',
        points: 150
      }
    };

    return badgeMap[badgeId] || {
      title: 'Badge mystère',
      description: 'Nouveau badge débloqué',
      icon: '🎖️',
      points: 10
    };
  };

  const totalPoints = badges.reduce((sum, badge) => {
    const info = getBadgeInfo(badge.id);
    return sum + info.points;
  }, 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-bounce-in">
        {/* Header avec animation */}
        <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 p-6 text-white rounded-t-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 animate-pulse"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="animate-spin-slow">
                  <Award className="h-8 w-8" />
                </div>
                <h2 className="text-2xl font-bold">
                  {badges.length === 1 ? 'Nouveau Badge !' : 'Nouveaux Badges !'}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Sparkles className="h-5 w-5 animate-pulse" />
                <span className="text-lg font-semibold">Félicitations !</span>
                <Sparkles className="h-5 w-5 animate-pulse" />
              </div>
              <p className="text-yellow-100">
                Tu viens de débloquer {badges.length} {badges.length === 1 ? 'récompense' : 'récompenses'} !
              </p>
            </div>
          </div>
        </div>

        {/* Corps de la modale */}
        <div className="p-6">
          <div className="space-y-4">
            {badges.map((badge, index) => {
              const info = getBadgeInfo(badge.id);
              return (
                <div
                  key={badge.id}
                  className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-lg p-4 transform transition-all duration-300 hover:scale-105"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl animate-bounce" style={{ animationDelay: `${index * 100}ms` }}>
                      {info.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-800 mb-1">
                        {info.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">
                        {info.description}
                      </p>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm font-semibold text-yellow-600">
                          +{info.points} XP
                        </span>
                      </div>
                    </div>
                    <div className="bg-green-500 text-white rounded-full p-2">
                      <Award className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Résumé des points */}
          <div className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Star className="h-6 w-6 text-blue-600" />
                <span className="text-lg font-bold text-gray-800">
                  +{totalPoints} XP au total !
                </span>
                <Star className="h-6 w-6 text-blue-600" />
              </div>
              <p className="text-gray-600 text-sm">
                Continue comme ça, tu progresses à vitesse grand V ! 🚀
              </p>
            </div>
          </div>

          {/* Bouton de fermeture */}
          <div className="mt-6 text-center">
            <button
              onClick={onClose}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Continuer l'aventure ! 🎯
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};