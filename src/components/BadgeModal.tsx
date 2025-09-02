/**
 * FrançaisPro - Modal de badges
 * Composant d'affichage des nouveaux badges obtenus
 * 
 * @author FrançaisPro Team
 * @version 1.0.0
 * @license MIT
 */

import React from 'react';

interface BadgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  badges: Array<{ id: string; title?: string; description?: string; icon?: string; points?: number }>;
}

export const BadgeModal: React.FC<BadgeModalProps> = ({ isOpen, onClose, badges }) => {
  if (!isOpen || badges.length === 0) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Nouveaux badges</h2>
          <button onClick={onClose} className="text-sm text-gray-600">Fermer</button>
        </div>

        <ul className="space-y-2">
          {badges.map(b => (
            <li key={b.id} className="p-2 border rounded">{b.title || b.id}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};