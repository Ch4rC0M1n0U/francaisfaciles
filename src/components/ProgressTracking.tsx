import React from 'react';

export const ProgressTracking: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold">Suivi des progrès</h2>
      <p className="mt-2 text-gray-600">Placeholder de suivi. Données détaillées supprimées.</p>
      <div className="mt-4">
        <button onClick={onBack} className="px-3 py-2 bg-gray-100 rounded">Retour</button>
      </div>
    </div>
  );
};