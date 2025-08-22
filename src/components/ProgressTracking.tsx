/**
 * FrançaisPro - Suivi des progrès
 * Composant d'analyse détaillée des performances utilisateur
 * 
 * @author FrançaisPro Team
 * @version 1.0.0
 * @license MIT
 */

import React from 'react';
import { ArrowLeft, TrendingUp, Calendar, Target, Award } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { db } from '../services/database';

interface ProgressTrackingProps {
  onBack: () => void;
}

export const ProgressTracking: React.FC<ProgressTrackingProps> = ({ onBack }) => {
  const { currentUser, userProgress } = useUser();

  if (!currentUser) return null;

  // Obtenir les données réelles d'activité hebdomadaire
  const weeklyData = db.getWeeklyActivity(currentUser.id);
  const userStats = db.getUserStatistics(currentUser.id);

  const moduleProgressMap = userProgress.reduce((acc, progress) => {
    acc[progress.module] = progress;
    return acc;
  }, {} as Record<string, typeof userProgress[0]>);

  const moduleStats = [
    {
      name: 'Orthographe',
      progress: moduleProgressMap.orthographe?.progress || 0,
      level: moduleProgressMap.orthographe?.skill_level || 1,
      color: 'blue',
      exercises: moduleProgressMap.orthographe?.exercises_completed || 0,
      accuracy: moduleProgressMap.orthographe?.accuracy || 0
    },
    {
      name: 'Grammaire',
      progress: moduleProgressMap.grammaire?.progress || 0,
      level: moduleProgressMap.grammaire?.skill_level || 1,
      color: 'green',
      exercises: moduleProgressMap.grammaire?.exercises_completed || 0,
      accuracy: moduleProgressMap.grammaire?.accuracy || 0
    },
    {
      name: 'Vocabulaire',
      progress: moduleProgressMap.vocabulaire?.progress || 0,
      level: moduleProgressMap.vocabulaire?.skill_level || 1,
      color: 'purple',
      exercises: moduleProgressMap.vocabulaire?.exercises_completed || 0,
      accuracy: moduleProgressMap.vocabulaire?.accuracy || 0
    },
    {
      name: 'Compréhension',
      progress: moduleProgressMap.comprehension?.progress || 0,
      level: moduleProgressMap.comprehension?.skill_level || 1,
      color: 'orange',
      exercises: moduleProgressMap.comprehension?.exercises_completed || 0,
      accuracy: moduleProgressMap.comprehension?.accuracy || 0
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
          <div className="flex items-center space-x-3">
            <button
              onClick={onBack}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            <div>
              <h1 className="text-2xl font-bold flex items-center space-x-2">
                <TrendingUp className="h-8 w-8" />
                <span>Suivi des progrès</span>
              </h1>
              <p className="text-indigo-100">Analyse détaillée de tes performances</p>
            </div>
          </div>
        </div>
      </div>

        {/* Statistiques générales */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center space-x-2">
              <Target className="h-5 w-5 text-blue-600" />
              <span>Statistiques générales</span>
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Exercices totaux</span>
                <span className="font-bold text-xl text-gray-800">{userStats.totalExercises}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Précision globale</span>
                <span className="font-bold text-xl text-green-600">{userStats.accuracy}%</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Série actuelle</span>
                <span className="font-bold text-xl text-orange-600">{currentUser.streak_days} jours</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Niveau global</span>
                <span className="font-bold text-xl text-purple-600">{currentUser.level}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Cette semaine</span>
                <span className="font-bold text-xl text-blue-600">{userStats.weeklyExercises} exercices</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-green-600" />
              <span>Activité hebdomadaire</span>
            </h3>
            
            <div className="space-y-3">
              {weeklyData.map((day, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-600 w-8">{day.day}</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    {weeklyData.length > 0 && Math.max(...weeklyData.map(d => d.exercises)) > 0 ? (
                    <div 
                      className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full"
                      style={{ width: `${Math.min(100, (day.exercises / Math.max(1, Math.max(...weeklyData.map(d => d.exercises)))) * 100)}%` }}
                    ></div>
                    ) : (
                    <div 
                      className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full"
                      style={{ width: day.exercises > 0 ? '20%' : '0%' }}
                    ></div>
                    )}
                  </div>
                  <span className="text-sm text-gray-600 w-12">{day.exercises} ex.</span>
                  {day.exercises > 0 && (
                    <span className="text-xs text-gray-500 w-12">{day.accuracy}%</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center space-x-2">
              <Award className="h-5 w-5 text-yellow-600" />
              <span>Progression par module</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {moduleStats.map((module, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-gray-800">{module.name}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold bg-${module.color}-100 text-${module.color}-800`}>
                      Niveau {module.level}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Progression</span>
                        <span className="font-semibold">{module.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`bg-gradient-to-r from-${module.color}-400 to-${module.color}-600 h-2 rounded-full transition-all duration-500`}
                          style={{ width: `${module.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Exercices réalisés</span>
                      <span className="font-semibold">{module.exercises}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Précision</span>
                      <span className={`font-semibold ${
                        module.accuracy >= 90 ? 'text-green-600' :
                        module.accuracy >= 80 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {module.accuracy}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">🎯 Recommandations personnalisées</h3>
            
            <div className="space-y-4">
              {db.getPersonalizedRecommendations(currentUser.id).map((rec, index) => (
                <div key={index} className={`bg-${rec.color}-50 border-l-4 border-${rec.color}-500 p-4 rounded-r-lg`}>
                  <h4 className={`font-semibold text-${rec.color}-800 mb-2`}>{rec.icon} {rec.title}</h4>
                  <p className={`text-${rec.color}-700 text-sm`}>{rec.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};