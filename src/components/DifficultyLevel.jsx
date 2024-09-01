import React from 'react';

function DifficultyLevel({ currentDifficulty, onDifficultyChange }) {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold mb-2">Nivel de dificultad</h2>
      <div className="flex space-x-2">
        <button
          className={`px-4 py-2 rounded ${currentDifficulty === 'easy' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
          onClick={() => onDifficultyChange('easy')}
        >
          Fácil
        </button>
        <button
          className={`px-4 py-2 rounded ${currentDifficulty === 'medium' ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}
          onClick={() => onDifficultyChange('medium')}
        >
          Medio
        </button>
        <button
          className={`px-4 py-2 rounded ${currentDifficulty === 'hard' ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
          onClick={() => onDifficultyChange('hard')}
        >
          Difícil
        </button>
      </div>
    </div>
  );
}

export default DifficultyLevel;