import React from 'react';
import { FormattedMessage } from 'react-intl';

function Controls({ onNext }) {
  return (
    <div className="mt-4 flex justify-center">
      <button 
        onClick={onNext}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        <FormattedMessage id="next.character" />
      </button>
    </div>
  );
}

export default Controls;