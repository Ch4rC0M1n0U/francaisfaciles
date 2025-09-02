/**
 * FrançaisPro - Système de badges
 * Composant de gestion et affichage des récompenses utilisateur
 * 
 * @author FrançaisPro Team
 * @version 1.0.0
 * @license MIT
 */

import React from 'react';

interface BadgeSystemProps {
  onBack: () => void;
}

export const BadgeSystem: React.FC<BadgeSystemProps> = ({ onBack }) => {
  // Placeholder minimaliste pour épuration maximale
  const sample = [
    { id: 'first-exercise', title: "Premier pas" },
    { id: 'streak-3', title: "Régularité" },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-4">
        <button onClick={onBack} className="text-sm text-blue-600">← Retour</button>
      </div>
      <h1 className="text-2xl font-bold mb-2">Mes récompenses</h1>
      <p className="text-sm text-gray-600 mb-4">Liste simplifiée des badges (placeholder).</p>

      <ul className="space-y-2">
        {sample.map(b => (
          <li key={b.id} className="p-3 border rounded bg-white">{b.title}</li>
        ))}
      </ul>
    </div>
  );
};