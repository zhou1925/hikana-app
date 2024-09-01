import React from 'react';
import { FormattedMessage } from 'react-intl';

function PracticeMode({ currentMode, onModeChange }) {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold mb-2">
        <FormattedMessage id="practice.mode" defaultMessage="Practice Mode" />
      </h2>
      <div className="flex space-x-2">
        <button
          className={`px-4 py-2 rounded ${currentMode === 'free' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => onModeChange('free')}
        >
          <FormattedMessage id="practice.mode.free" defaultMessage="Free" />
        </button>
        <button
          className={`px-4 py-2 rounded ${currentMode === 'exam' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => onModeChange('exam')}
        >
          <FormattedMessage id="practice.mode.exam" defaultMessage="Exam" />
        </button>
        <button
          className={`px-4 py-2 rounded ${currentMode === 'guided' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => onModeChange('guided')}
        >
          <FormattedMessage id="practice.mode.guided" defaultMessage="Guided" />
        </button>
      </div>
    </div>
  );
}

export default PracticeMode;