import React from 'react';
import { FormattedMessage } from 'react-intl';

function CanvasSettings({ settings, onSettingsChange }) {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold mb-2">
        <FormattedMessage id="canvas.settings" />
      </h2>
      <div className="flex flex-col space-y-2">
        <div>
          <label className="mr-2">
            <FormattedMessage id="canvas.strokeWidth" />:
          </label>
          <input 
            type="range" 
            min="1" 
            max="10" 
            value={settings.strokeWidth} 
            onChange={(e) => onSettingsChange({ ...settings, strokeWidth: parseInt(e.target.value) })} 
          />
          <span className="ml-2">{settings.strokeWidth}px</span>
        </div>
      </div>
    </div>
  );
}

export default CanvasSettings;