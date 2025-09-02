import React from 'react';

export const ExerciseGenerator: React.FC<{ module: string; onBack: () => void }> = ({ module, onBack }) => {
  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold">Générateur IA — {module || 'général'}</h2>
      <p className="mt-4 text-gray-600">Placeholder de génération IA. La logique a été retirée.</p>
      <div className="mt-6">
        <button onClick={onBack} className="px-4 py-2 bg-gray-200 rounded">Retour</button>
      </div>
    </div>
  );
};