import React from 'react';
import { hiraganaCharacters, katakanaCharacters } from '../utils/hiraganaData';

function CharacterSelector({ onSelectCharacter, includeHiragana, includeKatakana }) {
  const characters = [
    ...(includeHiragana ? hiraganaCharacters : []),
    ...(includeKatakana ? katakanaCharacters : [])
  ];

  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold mb-2">Seleccionar carácter</h2>
      <div className="grid grid-cols-5 gap-2">
        {characters.map((char) => (
          <button
            key={char}
            onClick={() => onSelectCharacter(char)}
            className="p-2 border rounded hover:bg-gray-200"
          >
            {char}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CharacterSelector;