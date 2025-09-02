import React from 'react';

const DashboardPlaceholder: React.FC<{
  onModuleSelect: (module: string) => void;
  onModuleSelectAI: (module: string) => void;
  onViewProgress: () => void;
  onViewBadges: () => void;
}> = ({ onModuleSelect, onModuleSelectAI, onViewProgress, onViewBadges }) => {
  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold">Tableau de bord</h2>
      <p className="mt-2 text-gray-600">Placeholders — sélectionne un module pour commencer.</p>
      <div className="mt-4 space-x-2">
        <button onClick={() => onModuleSelect('orthographe')} className="px-3 py-2 bg-blue-100 rounded">Orthographe</button>
        <button onClick={() => onModuleSelect('grammaire')} className="px-3 py-2 bg-green-100 rounded">Grammaire</button>
        <button onClick={() => onModuleSelectAI('vocabulaire')} className="px-3 py-2 bg-purple-100 rounded">Vocabulaire (IA)</button>
      </div>
      <div className="mt-4 space-x-2">
        <button onClick={onViewProgress} className="px-3 py-2 bg-gray-100 rounded">Progression</button>
        <button onClick={onViewBadges} className="px-3 py-2 bg-yellow-100 rounded">Badges</button>
      </div>
    </div>
  );
};

export { DashboardPlaceholder as Dashboard };