import React from 'react';
import { FormattedMessage } from 'react-intl';

function CharacterTypeSelector({ includeHiragana, includeKatakana, onToggle }) {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold mb-2">
        <FormattedMessage id="character.type" />
      </h2>
      <div className="flex space-x-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={includeHiragana}
            onChange={() => onToggle('hiragana')}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="ml-2">
            <FormattedMessage id="character.type.hiragana" />
          </span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={includeKatakana}
            onChange={() => onToggle('katakana')}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="ml-2">
            <FormattedMessage id="character.type.katakana" />
          </span>
        </label>
      </div>
    </div>
  );
}

export default CharacterTypeSelector;