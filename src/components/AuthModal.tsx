/**
 * FrançaisPro - Modal d'authentification
 * Composant de connexion et inscription utilisateur
 * 
 * @author FrançaisPro Team
 * @version 1.0.0
 * @license MIT
 */

import React from 'react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => Promise<boolean>;
  onRegister: (username: string, firstName: string, lastName: string, birthDate: string, classLevel: string, email: string, password: string) => Promise<boolean>;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Connexion / Inscription</h2>
          <button onClick={onClose} className="text-sm text-gray-600">Fermer</button>
        </div>
        <p className="text-sm text-gray-600">Formulaire simplifié (placeholder).</p>
      </div>
    </div>
  );
};