/**
 * Placeholder PomodoroTimer (simplifié pour épuration maximale)
 */

import React from 'react';

interface PomodoroTimerProps {
  isActive: boolean;
  onToggle: () => void;
}

export const PomodoroTimer: React.FC<PomodoroTimerProps> = ({ isActive, onToggle }) => {
  if (!isActive) return null;

  return (
    <div className="fixed top-20 right-4 z-40">
      <div className="bg-white rounded-lg p-4 shadow">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold">Pomodoro</div>
            <div className="text-xs text-gray-500">00:00</div>
          </div>
          <div>
            <button onClick={onToggle} className="text-sm text-blue-600">Fermer</button>
          </div>
        </div>
      </div>
    </div>
  );
};
 