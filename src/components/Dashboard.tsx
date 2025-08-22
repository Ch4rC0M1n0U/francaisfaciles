/**
 * FrançaisPro - Tableau de bord principal
 * Interface principale avec modules d'exercices et statistiques
 * 
 * @author FrançaisPro Team
 * @version 1.0.0
 * @license MIT
 */

import React from 'react';
import { BookOpen, Users, FileText, MessageSquare, Award, TrendingUp, Target, Zap, Sparkles, Brain } from 'lucide-react';
import { useUser } from '../context/UserContext';

import { db } from '../services/database';
import { getSkillById } from '../data/skillsMapping';

interface DashboardProps {
  onModuleSelect: (module: string) => void;
  onModuleSelectAI: (module: string) => void;
  onViewProgress: () => void;
  onViewBadges: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onModuleSelect, onModuleSelectAI, onViewProgress, onViewBadges }) => {
  const { currentUser, userProgress, userBadges } = useUser();

  if (!currentUser) return null;

  const moduleProgressMap = userProgress.reduce((acc, progress) => {
    acc[progress.module] = {
      progress: progress.progress,
      skillLevel: progress.skill_level,
      accuracy: progress.accuracy
    };
    return acc;
  }, {} as Record<string, { progress: number; skillLevel: number; accuracy: number }>);

  const modules = [
    {
      id: 'orthographe',
      title: 'Orthographe',
      description: 'Accords, conjugaisons, homophones',
      icon: BookOpen,
      color: 'from-blue-500 to-blue-600',
      progress: moduleProgressMap.orthographe?.progress || 0,
      level: moduleProgressMap.orthographe?.skillLevel || 1
    },
    {
      id: 'grammaire',
      title: 'Grammaire',
      description: 'Nature des mots, fonctions, syntaxe',
      icon: Users,
      color: 'from-green-500 to-green-600',
      progress: moduleProgressMap.grammaire?.progress || 0,
      level: moduleProgressMap.grammaire?.skillLevel || 1
    },
    {
      id: 'vocabulaire',
      title: 'Vocabulaire',
      description: 'Synonymes, antonymes, expressions',
      icon: MessageSquare,
      color: 'from-purple-500 to-purple-600',
      progress: moduleProgressMap.vocabulaire?.progress || 0,
      level: moduleProgressMap.vocabulaire?.skillLevel || 1
    },
    {
      id: 'comprehension',
      title: 'Compréhension',
      description: 'Analyse de textes',
      icon: FileText,
      color: 'from-orange-500 to-orange-600',
      progress: moduleProgressMap.comprehension?.progress || 0,
      level: moduleProgressMap.comprehension?.skillLevel || 1
    }
  ];

  const accuracy = currentUser.total_exercises > 0 
    ? Math.round((currentUser.correct_answers / currentUser.total_exercises) * 100)
    : 0;

  const weakSkills = db.getWeakSkills(currentUser.id, 3);

  return (
    <div className="space-y-8">
      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Série actuelle</p>
              <p className="text-3xl font-bold text-blue-600">{currentUser.streak_days}</p>
              <p className="text-xs text-gray-500">jours consécutifs</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Zap className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Précision</p>
              <p className="text-3xl font-bold text-green-600">{accuracy}%</p>
              <p className="text-xs text-gray-500">{currentUser.correct_answers}/{currentUser.total_exercises} exercices</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <Target className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Badges obtenus</p>
              <p className="text-3xl font-bold text-purple-600">{userBadges.length}</p>
              <p className="text-xs text-gray-500">récompenses</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <Award className="h-8 w-8 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Niveau global</p>
              <p className="text-3xl font-bold text-orange-600">{currentUser.level}</p>
              <p className="text-xs text-gray-500">{currentUser.xp} XP</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <TrendingUp className="h-8 w-8 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Points faibles identifiés */}
      {weakSkills.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
            <Target className="h-6 w-6 text-red-500" />
            <span>Points à renforcer</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {weakSkills.map((skill) => {
              const skillInfo = getSkillById(skill.skill_id);
              if (!skillInfo) return null;
              
              return (
                <div key={skill.id} className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-red-800">{skillInfo.name}</h3>
                    <span className="text-sm text-red-600">{skill.mastery_level}%</span>
                  </div>
                  <p className="text-sm text-red-700 mb-3">{skillInfo.description}</p>
                  <div className="w-full bg-red-200 rounded-full h-2">
                    <div 
                      className="bg-red-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${skill.mastery_level}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-red-600 mt-2">
                    {skill.successes}/{skill.attempts} réussites
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Entraînement adaptatif par IA</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <div
                key={module.id}
                onClick={() => onModuleSelectAI(module.id)}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 group"
              >
                <div className={`bg-gradient-to-r ${module.color} p-6 rounded-t-xl`}>
                  <div className="flex items-center justify-between text-white">
                    <div>
                      <h3 className="text-xl font-bold">{module.title}</h3>
                      <p className="text-blue-100 text-sm">Exercices IA personnalisés</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Sparkles className="h-8 w-8 opacity-90" />
                      <Icon className="h-12 w-12 opacity-90" />
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-gray-600">Progression</span>
                    <span className="text-sm font-bold text-gray-800">{module.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                    <div 
                      className={`bg-gradient-to-r ${module.color} h-3 rounded-full transition-all duration-500`}
                      style={{ width: `${module.progress}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">Niveau</span>
                      <span className="bg-gray-100 px-2 py-1 rounded-full text-xs font-semibold text-gray-700">
                        {module.level}
                      </span>
                    </div>
                    <span className="text-purple-600 font-semibold text-sm">
                      IA Adaptative →
                    </span>
                  </div>
                  
                  <div className="mt-3 text-xs text-gray-600 bg-purple-50 p-2 rounded-lg">
                    <div className="flex items-center space-x-1">
                      <Target className="h-3 w-3 text-purple-600" />
                      <span>Cible tes points faibles automatiquement</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button
          onClick={onViewProgress}
          className="bg-white rounded-xl shadow-lg p-6 text-left hover:shadow-xl transition-all duration-300 group"
        >
          <div className="flex items-center space-x-4">
            <div className="bg-indigo-100 p-3 rounded-full group-hover:bg-indigo-200 transition-colors">
              <TrendingUp className="h-8 w-8 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">Suivi des progrès</h3>
              <p className="text-gray-600 text-sm">Analyse détaillée de tes performances</p>
            </div>
          </div>
        </button>

        <button
          onClick={onViewBadges}
          className="bg-white rounded-xl shadow-lg p-6 text-left hover:shadow-xl transition-all duration-300 group"
        >
          <div className="flex items-center space-x-4">
            <div className="bg-yellow-100 p-3 rounded-full group-hover:bg-yellow-200 transition-colors">
              <Award className="h-8 w-8 text-yellow-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">Mes récompenses</h3>
              <p className="text-gray-600 text-sm">Collection de badges et achievements</p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};