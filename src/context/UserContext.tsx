import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  username: string;
  created_at: string;
  last_login: string;
  total_exercises: number;
}

interface UserContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, firstName: string, lastName: string, birthDate: string, classLevel: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  newBadges: string[];
  clearNewBadges: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [newBadges, setNewBadges] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('ff_current_user');
      if (raw) setCurrentUser(JSON.parse(raw));
    } catch (e) {
      // noop
    }
  }, []);

  const persist = (user: User | null) => {
    try {
      if (user) localStorage.setItem('ff_current_user', JSON.stringify(user));
      else localStorage.removeItem('ff_current_user');
    } catch (e) {
      // noop
    }
  };

  const login = async (email: string, _password: string) => {
    const now = new Date().toISOString();
    const user: User = { id: 'local-1', username: email.split('@')[0] || 'user', created_at: now, last_login: now, total_exercises: 0 };
    setCurrentUser(user);
    persist(user);
    return true;
  };

  const register = async (_username: string, _firstName: string, _lastName: string, _birthDate: string, _classLevel: string, email: string, _password: string) => {
    const now = new Date().toISOString();
    const user: User = { id: 'local-1', username: email.split('@')[0] || 'user', created_at: now, last_login: now, total_exercises: 0 };
    setCurrentUser(user);
    persist(user);
    setNewBadges(['first-exercise']);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    persist(null);
  };

  const clearNewBadges = () => setNewBadges([]);

  return (
    <UserContext.Provider value={{ currentUser, login, register, logout, newBadges, clearNewBadges }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within UserProvider');
  return ctx;
};