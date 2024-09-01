import React from 'react';
import { FormattedMessage } from 'react-intl';

function Feedback({ userDrawing, correctCharacter, similarity, message }) {
  return (
    <div className="mt-4 p-4 bg-gray-100 rounded-lg">
      <div className="flex justify-around mb-4">
        <div>
          <p className="text-center mb-2">
            <FormattedMessage id="feedback.yourDrawing" />
          </p>
          <img src={userDrawing} alt="Your drawing" className="border-2 border-gray-300" width="150" height="150" />
        </div>
        <div>
          <p className="text-center mb-2">
            <FormattedMessage id="feedback.correctCharacter" />
          </p>
          <div className="border-2 border-gray-300 w-[150px] h-[150px] flex items-center justify-center">
            <span className="text-6xl">{correctCharacter}</span>
          </div>
        </div>
      </div>
      <p className="text-center font-bold mb-2">
        <FormattedMessage id={similarity > 0.8 ? "feedback.wellDone" : "feedback.tryAgain"} />
      </p>
      <p className="text-center">
        <FormattedMessage id="feedback.similarity" values={{ similarity: (similarity * 100).toFixed(2) }} />
      </p>
    </div>
  );
}

export default Feedback;