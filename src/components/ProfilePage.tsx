/**
 * FrançaisPro - Page de profil utilisateur
 * Gestion des informations personnelles et paramètres du compte
 */

import React from 'react';

interface ProfilePageProps {
  onBack: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ onBack }) => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-4">
        <button onClick={onBack} className="text-sm text-blue-600">← Retour</button>
      </div>
      <h1 className="text-2xl font-bold mb-2">Mon Profil</h1>
      <p className="text-sm text-gray-600">Page de profil simplifiée (placeholder).</p>
    </div>
  );
};