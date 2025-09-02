/**
 * FrançaisPro - Modal d'encouragement
 * Composant de motivation et félicitations pour l'utilisateur
 * 
 * @author FrançaisPro Team
 * @version 1.0.0
 * @license MIT
 */

import React from 'react';

interface EncouragementModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: string;
  data?: Record<string, any>;
}

export const EncouragementModal: React.FC<EncouragementModalProps> = ({ isOpen, onClose, type }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Message d'encouragement</h2>
          <button onClick={onClose} className="text-sm text-gray-600">Fermer</button>
        </div>
        <p className="text-sm text-gray-600">Type: {type}</p>
      </div>
    </div>
  );
};