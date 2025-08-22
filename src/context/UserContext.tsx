/**
 * FrançaisPro - Contexte utilisateur React
 * Gestion de l'état global de l'utilisateur et de ses données
 * 
 * @author FrançaisPro Team
 * @version 1.0.0
 * @license MIT
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { db, User, UserProgress } from '../services/database';

interface UserContextType {
  currentUser: User | null;
  userProgress: UserProgress[];
  userBadges: string[];
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, firstName: string, lastName: string, birthDate: string, classLevel: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateStats: (points: number, module: string) => void;
  addBadge: (badgeId: string) => void;
  refreshUserData: () => void;
  updateProfile: (updates: Partial<User>) => Promise<boolean>;
  deleteAccount: () => Promise<boolean>;
  resetProfile: () => Promise<boolean>;
  newBadges: string[];
  clearNewBadges: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress[]>([]);
  const [userBadges, setUserBadges] = useState<string[]>([]);
  const [newBadges, setNewBadges] = useState<string[]>([]);

  useEffect(() => {
    const savedUserId = localStorage.getItem('currentUserId');
    if (savedUserId) {
      const user = db.getUserById(savedUserId);
      if (user) {
        setCurrentUser(user);
        refreshUserData(savedUserId);
      }
    }
  }, []);

  const refreshUserData = (userId?: string) => {
    const id = userId || currentUser?.id;
    if (!id) return;

    const progress = db.getUserProgress(id);
    const badges = db.getUserBadges(id);
    
    const updatedUser = db.getUserById(id);
    if (updatedUser) {
      setCurrentUser(updatedUser);
    }
    
    setUserProgress(progress);
    setUserBadges(badges);
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const user = await db.authenticateUser(email, password);
      if (user) {
        setCurrentUser(user);
        localStorage.setItem('currentUserId', user.id);
        refreshUserData(user.id);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (
    username: string, 
    firstName: string, 
    lastName: string, 
    birthDate: string, 
    classLevel: string, 
    email: string, 
    password: string
  ): Promise<boolean> => {
    try {
      const user = await db.createUser(username, firstName, lastName, birthDate, classLevel, email, password);
      setCurrentUser(user);
      localStorage.setItem('currentUserId', user.id);
      refreshUserData(user.id);
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setUserProgress([]);
    setUserBadges([]);
    localStorage.removeItem('currentUserId');
  };

  const clearNewBadges = () => {
    setNewBadges([]);
  };

  const updateStats = (points: number, module: string) => {
    if (!currentUser) return;
    
    db.updateUserProgress(currentUser.id, module, points);
    
    const newBadgeIds = db.checkAndAwardBadges(currentUser.id);
    if (newBadgeIds.length > 0) {
      setNewBadges(prev => [...prev, ...newBadgeIds]);
    }
    
    const updatedUser = db.getUserById(currentUser.id);
    if (updatedUser) {
      setCurrentUser(updatedUser);
    }
    refreshUserData();
  };

  const addBadge = (badgeId: string) => {
    if (!currentUser) return;
    
    db.addBadge(currentUser.id, badgeId);
    refreshUserData();
  };

  const updateProfile = async (updates: Partial<User>): Promise<boolean> => {
    if (!currentUser) return false;
    
    const success = db.updateUserProfile(currentUser.id, updates);
    if (success) {
      const updatedUser = db.getUserById(currentUser.id);
      if (updatedUser) {
        setCurrentUser(updatedUser);
      }
      refreshUserData();
    }
    return success;
  };

  const deleteAccount = async (): Promise<boolean> => {
    if (!currentUser) return false;
    
    const success = db.deleteUser(currentUser.id);
    if (success) {
      logout();
    }
    return success;
  };

  const resetProfile = async (): Promise<boolean> => {
    if (!currentUser) return false;
    
    try {
      const success = db.resetUserProgress(currentUser.id);
      if (success) {
        const updatedUser = db.getUserById(currentUser.id);
        if (updatedUser) {
          setCurrentUser(updatedUser);
        }
        refreshUserData();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erreur dans resetProfile:', error);
      return false;
    }
  };

  return (
    <UserContext.Provider value={{ 
      currentUser, 
      userProgress, 
      userBadges, 
      newBadges,
      clearNewBadges,
      login, 
      register, 
      logout, 
      updateStats, 
      addBadge, 
      refreshUserData,
      updateProfile,
      deleteAccount,
      resetProfile
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};