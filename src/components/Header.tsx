/**
 * FrançaisPro - Composant Header
 * Barre de navigation principale avec profil utilisateur et contrôles
 * 
 * @author FrançaisPro Team
 * @version 1.0.0
 * @license MIT
 */

import React from 'react';
import { BookOpen, Home, LogOut, User, Clock } from 'lucide-react';
import { useUser } from '../context/UserContext';

interface HeaderProps {
  onBackToDashboard: () => void;
  currentView: string;
  onViewProfile: () => void;
  onTogglePomodoro: () => void;
  isPomodoroActive: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onBackToDashboard, currentView, onViewProfile, onTogglePomodoro, isPomodoroActive }) => {
  const { currentUser, logout } = useUser();

  if (!currentUser) return null;

  return (
    <header className="bg-white shadow-lg border-b-4 border-blue-500">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">FrançaisPro</h1>
              <p className="text-sm text-gray-600">Maîtrise ton français !</p>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">⭐</span>
                  <span className="font-bold text-lg text-gray-800">Niveau {currentUser.level}</span>
                </div>
                <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(currentUser.xp / currentUser.xp_to_next_level) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-600 mt-1">{currentUser.xp} / {currentUser.xp_to_next_level} XP</p>
              </div>

              <button
                onClick={onViewProfile}
                className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-800 transition-colors p-2 rounded-lg hover:bg-gray-100"
              >
                <User className="h-4 w-4" />
                <span>{currentUser.first_name} {currentUser.last_name}</span>
              </button>
              
              <button
                onClick={onTogglePomodoro}
                className={`flex items-center space-x-2 text-sm transition-colors p-2 rounded-lg ${
                  isPomodoroActive 
                    ? 'bg-blue-100 text-blue-800 hover:bg-blue-200' 
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                }`}
                title="Timer Pomodoro pour TDAH"
              >
                <Clock className="h-4 w-4" />
                <span>Pomodoro</span>
              </button>
            </div>

            <div className="flex items-center space-x-3">
              {currentView !== 'dashboard' && (
                <button
                  onClick={onBackToDashboard}
                  className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  <Home className="h-5 w-5" />
                  <span>Accueil</span>
                </button>
              )}
              
              <button
                onClick={logout}
                className="flex items-center space-x-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                <LogOut className="h-5 w-5" />
                <span>Déconnexion</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};