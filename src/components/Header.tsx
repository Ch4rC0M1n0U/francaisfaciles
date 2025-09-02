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
      <header className="p-4 border-b bg-white">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onBackToDashboard} className="font-bold">FrançaisPro</button>
            <span className="text-sm text-gray-500">{currentView}</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={onViewProfile} className="text-sm">Profil</button>
            <button onClick={onTogglePomodoro} className="text-sm">{isPomodoroActive ? 'Stop' : 'Pomodoro'}</button>
          </div>
        </div>
      </header>
    );
};