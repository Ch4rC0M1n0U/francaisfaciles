/**
 * FrançaisPro - Application d'entraînement au français avec IA
 * Développé pour les collégiens (11-15 ans)
 * Utilise l'IA Gemini pour générer des exercices personnalisés
 * 
 * @author FrançaisPro Team
 * @version 1.0.0
 * @license MIT
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { ExerciseModule } from './components/ExerciseModule';
import { ExerciseGenerator } from './components/ExerciseGenerator';
import { ProgressTracking } from './components/ProgressTracking';
import { BadgeSystem } from './components/BadgeSystem';
import { ProfilePage } from './components/ProfilePage';
import { BadgeModal } from './components/BadgeModal';
import { PomodoroTimer } from './components/PomodoroTimer';
import { AuthModal } from './components/AuthModal';
import { EncouragementModal } from './components/EncouragementModal';
import { UserProvider } from './context/UserContext';
import { useUser } from './context/UserContext';

function AppContent() {
  const { currentUser, login, register, newBadges, clearNewBadges } = useUser();
  const [currentView, setCurrentView] = useState<string>('dashboard');
  const [currentModule, setCurrentModule] = useState<string>('');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isPomodoroActive, setIsPomodoroActive] = useState(false);
  const [welcomeEncouragement, setWelcomeEncouragement] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      setShowAuthModal(true);
    } else {
      setShowAuthModal(false);
      
      const isFirstLogin = currentUser.total_exercises === 0 && 
                          currentUser.created_at === currentUser.last_login;
      
      if (isFirstLogin) {
        setTimeout(() => {
          setWelcomeEncouragement(true);
        }, 1000);
      }
    }
  }, [currentUser]);

  const handleModuleSelect = (module: string) => {
    setCurrentModule(module);
    setCurrentView('exercise');
  };

  const handleModuleSelectAI = (module: string) => {
    setCurrentModule(module);
    setCurrentView('exercise-ai');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setCurrentModule('');
  };

  const handleViewProgress = () => {
    setCurrentView('progress');
  };

  const handleViewBadges = () => {
    setCurrentView('badges');
  };

  const handleViewProfile = () => {
    setCurrentView('profile');
  };
  
  const handleTogglePomodoro = () => {
    setIsPomodoroActive(!isPomodoroActive);
  };

  const handleLogin = async (email: string, password: string): Promise<boolean> => {
    return await login(email, password);
  };

  const handleRegister = async (
    username: string, 
    firstName: string, 
    lastName: string, 
    birthDate: string, 
    classLevel: string, 
    email: string, 
    password: string
  ): Promise<boolean> => {
    return await register(username, firstName, lastName, birthDate, classLevel, email, password);
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-full inline-block mb-6">
            <span className="text-4xl">📚</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">FrançaisPro</h1>
          <p className="text-xl text-gray-600 mb-8">Maîtrise ton français avec l'IA !</p>
          <button
            onClick={() => setShowAuthModal(true)}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
          >
            Commencer l'aventure
          </button>
        </div>
        
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onLogin={handleLogin}
          onRegister={handleRegister}
        />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header 
        onBackToDashboard={handleBackToDashboard}
        currentView={currentView}
        onViewProfile={handleViewProfile}
        onTogglePomodoro={handleTogglePomodoro}
        isPomodoroActive={isPomodoroActive}
      />
      
      {/* Pomodoro Timer */}
      <PomodoroTimer 
        isActive={isPomodoroActive}
        onToggle={handleTogglePomodoro}
      />
      
      <main className="container mx-auto px-4 py-6">
        {currentView === 'dashboard' && (
          <Dashboard 
            onModuleSelect={handleModuleSelect}
            onModuleSelectAI={handleModuleSelectAI}
            onViewProgress={handleViewProgress}
            onViewBadges={handleViewBadges}
          />
        )}
        
        {currentView === 'exercise' && (
          <ExerciseModule 
            module={currentModule}
            onBack={handleBackToDashboard}
          />
        )}
        
        {currentView === 'exercise-ai' && (
          <ExerciseGenerator 
            module={currentModule}
            onBack={handleBackToDashboard}
          />
        )}
        
        {currentView === 'progress' && (
          <ProgressTracking onBack={handleBackToDashboard} />
        )}
        
        {currentView === 'badges' && (
          <BadgeSystem onBack={handleBackToDashboard} />
        )}
        
        {currentView === 'profile' && (
          <ProfilePage onBack={handleBackToDashboard} />
        )}
        
        {/* Badge Modal */}
        <BadgeModal
          isOpen={newBadges.length > 0}
          onClose={clearNewBadges}
          badges={newBadges.map(badgeId => ({ id: badgeId, title: '', description: '', icon: '', points: 0 }))}
        />
        
        {/* Message de bienvenue */}
        <EncouragementModal
          isOpen={welcomeEncouragement}
          onClose={() => setWelcomeEncouragement(false)}
          type="comeback"
          data={{}}
        />
      </main>
    </div>
  );
}

function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}

export default App;