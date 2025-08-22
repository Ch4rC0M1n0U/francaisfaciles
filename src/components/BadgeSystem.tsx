/**
 * FrançaisPro - Système de badges
 * Composant de gestion et affichage des récompenses utilisateur
 * 
 * @author FrançaisPro Team
 * @version 1.0.0
 * @license MIT
 */

import React from 'react';
import { ArrowLeft, Award, Lock, Star } from 'lucide-react';
import { useUser } from '../context/UserContext';

interface BadgeSystemProps {
  onBack: () => void;
}

interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'progression' | 'performance' | 'dedication' | 'special';
  requirement: string;
  points: number;
}

const allBadges: Badge[] = [
  {
    id: 'first-exercise',
    title: 'Premier pas',
    description: 'Premier exercice terminé',
    icon: '🎯',
    category: 'progression',
    requirement: 'Terminer 1 exercice',
    points: 10
  },
  {
    id: 'streak-3',
    title: 'Régularité',
    description: '3 jours consécutifs',
    icon: '🔥',
    category: 'dedication',
    requirement: '3 jours de suite',
    points: 25
  },
  {
    id: 'perfect-score',
    title: 'Sans faute',
    description: '10 exercices parfaits',
    icon: '💯',
    category: 'performance',
    requirement: '100% de réussite sur 10 exercices',
    points: 50
  },
  {
    id: 'orthographe-master',
    title: 'Maître orthographe',
    description: 'Niveau 3 en orthographe',
    icon: '✏️',
    category: 'progression',
    requirement: 'Atteindre le niveau 3 en orthographe',
    points: 75
  },
  {
    id: 'vocab-expert',
    title: 'Expert vocabulaire',
    description: '50 mots appris',
    icon: '📚',
    category: 'progression',
    requirement: 'Apprendre 50 nouveaux mots',
    points: 60
  },
  {
    id: 'speed-demon',
    title: 'Éclair',
    description: 'Réponse en moins de 10s',
    icon: '⚡',
    category: 'performance',
    requirement: 'Répondre en moins de 10 secondes',
    points: 30
  },
  {
    id: 'streak-7',
    title: 'Une semaine parfaite',
    description: '7 jours consécutifs',
    icon: '🌟',
    category: 'dedication',
    requirement: '7 jours de suite',
    points: 50
  },
  {
    id: 'century-club',
    title: 'Club des 100',
    description: '100 exercices terminés',
    icon: '🏆',
    category: 'progression',
    requirement: 'Terminer 100 exercices',
    points: 100
  },
  {
    id: 'night-owl',
    title: 'Chouette nocturne',
    description: 'Exercice après 22h',
    icon: '🦉',
    category: 'special',
    requirement: 'Faire un exercice après 22h',
    points: 20
  },
  {
    id: 'early-bird',
    title: 'Lève-tôt',
    description: 'Exercice avant 7h',
    icon: '🐦',
    category: 'special',
    requirement: 'Faire un exercice avant 7h',
    points: 20
  },
  {
    id: 'comeback-kid',
    title: 'Retour gagnant',
    description: 'Après une pause de 7 jours',
    icon: '🎭',
    category: 'special',
    requirement: 'Revenir après 7 jours d\'absence',
    points: 40
  },
  {
    id: 'all-rounder',
    title: 'Polyvalent',
    description: 'Niveau 2 dans tous les modules',
    icon: '🎨',
    category: 'progression',
    requirement: 'Niveau 2 dans tous les modules',
    points: 150
  }
];

export const BadgeSystem: React.FC<BadgeSystemProps> = ({ onBack }) => {
  const { userBadges } = useUser();

  const categories = [
    { id: 'progression', name: 'Progression', color: 'blue', emoji: '📈' },
    { id: 'performance', name: 'Performance', color: 'green', emoji: '🎯' },
    { id: 'dedication', name: 'Assiduité', color: 'purple', emoji: '💪' },
    { id: 'special', name: 'Spéciaux', color: 'orange', emoji: '🌟' }
  ];

  const getBadgesByCategory = (categoryId: string) => {
    return allBadges.filter(badge => badge.category === categoryId);
  };

  const isBadgeUnlocked = (badgeId: string) => {
    return userBadges.includes(badgeId);
  };

  const totalBadges = allBadges.length;
  const unlockedBadges = userBadges.length;
  const progressPercentage = Math.round((unlockedBadges / totalBadges) * 100);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
        <div className="bg-gradient-to-r from-yellow-500 to-orange-600 p-6 text-white">
          <div className="flex items-center space-x-3">
            <button
              onClick={onBack}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold flex items-center space-x-2">
                <Award className="h-8 w-8" />
                <span>Mes récompenses</span>
              </h1>
              <p className="text-yellow-100">Collection de badges et achievements</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">{unlockedBadges}/{totalBadges}</p>
              <p className="text-yellow-100 text-sm">badges obtenus</p>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Progression globale</span>
              <span>{progressPercentage}%</span>
            </div>
            <div className="w-full bg-white bg-opacity-30 rounded-full h-3">
              <div 
                className="bg-white h-3 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-8">
        {categories.map((category) => {
          const categoryBadges = getBadgesByCategory(category.id);
          const unlockedInCategory = categoryBadges.filter(badge => isBadgeUnlocked(badge.id)).length;
          
          return (
            <div key={category.id} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center space-x-3">
                  <span className="text-2xl">{category.emoji}</span>
                  <span>{category.name}</span>
                </h2>
                <span className="text-sm text-gray-600">
                  {unlockedInCategory}/{categoryBadges.length} obtenus
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {categoryBadges.map((badge) => {
                  const isUnlocked = isBadgeUnlocked(badge.id);
                  
                  return (
                    <div
                      key={badge.id}
                      className={`relative p-4 rounded-lg border-2 transition-all duration-300 ${
                        isUnlocked
                          ? `border-${category.color}-500 bg-${category.color}-50 shadow-md hover:shadow-lg`
                          : 'border-gray-300 bg-gray-50 opacity-60'
                      }`}
                    >
                      {!isUnlocked && (
                        <div className="absolute top-2 right-2">
                          <Lock className="h-4 w-4 text-gray-400" />
                        </div>
                      )}
                      
                      <div className="text-center space-y-3">
                        <div className={`text-4xl ${!isUnlocked ? 'grayscale' : ''}`}>
                          {badge.icon}
                        </div>
                        
                        <div>
                          <h3 className={`font-bold ${
                            isUnlocked ? 'text-gray-800' : 'text-gray-500'
                          }`}>
                            {badge.title}
                          </h3>
                          <p className={`text-sm ${
                            isUnlocked ? 'text-gray-600' : 'text-gray-400'
                          }`}>
                            {badge.description}
                          </p>
                        </div>
                        
                        <div className={`text-xs px-2 py-1 rounded-full ${
                          isUnlocked 
                            ? `bg-${category.color}-100 text-${category.color}-800` 
                            : 'bg-gray-200 text-gray-500'
                        }`}>
                          {badge.requirement}
                        </div>
                        
                        <div className="flex items-center justify-center space-x-1">
                          <Star className={`h-4 w-4 ${
                            isUnlocked ? 'text-yellow-500' : 'text-gray-300'
                          }`} />
                          <span className={`text-sm font-semibold ${
                            isUnlocked ? 'text-yellow-600' : 'text-gray-400'
                          }`}>
                            +{badge.points} XP
                          </span>
                        </div>
                      </div>
                      
                      {isUnlocked && (
                        <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1">
                          <Award className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Prochains badges à débloquer */}
      <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center space-x-2">
          <Star className="h-5 w-5 text-yellow-600" />
          <span>Prochains objectifs</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allBadges
            .filter(badge => !isBadgeUnlocked(badge.id))
            .slice(0, 3)
            .map((badge) => (
              <div key={badge.id} className="border border-gray-200 rounded-lg p-4 bg-gradient-to-br from-gray-50 to-white">
                <div className="text-center space-y-2">
                  <div className="text-3xl opacity-70">{badge.icon}</div>
                  <h4 className="font-bold text-gray-700">{badge.title}</h4>
                  <p className="text-sm text-gray-600">{badge.requirement}</p>
                  <div className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full inline-block">
                    +{badge.points} XP
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};