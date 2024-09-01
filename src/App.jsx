import React, { useState, useRef, useEffect } from 'react';

import { IntlProvider } from 'react-intl';
import enMessages from './locales/en.json';
import esMessages from './locales/es.json';

import HiraganaCanvas from './components/HiraganaCanvas';
import Controls from './components/Controls';
import Feedback from './components/Feedback';
import PracticeMode from './components/PracticeMode';
import DifficultyLevel from './components/DifficultyLevel';
import Tutorial from './components/Tutorial';
import CanvasSettings from './components/CanvasSettings';
import CharacterTypeSelector from './components/CharacterTypeSelector';
import CharacterSelector from './components/CharacterSelector';
import { getRandomCharacter } from './utils/hiraganaData';
import { saveProgress, getAllProgress, getNextSRSCharacter, cleanProgress } from './utils/localStorage';



function App() {
  const [locale, setLocale] = useState('en');
  const [currentCharacter, setCurrentCharacter] = useState(getRandomCharacter(true, false));
  const [feedback, setFeedback] = useState(null);
  const [progress, setProgress] = useState([]);
  const [practiceMode, setPracticeMode] = useState('free');
  const [difficultyLevel, setDifficultyLevel] = useState('easy');
  const [examCharacters, setExamCharacters] = useState([]);
  const [currentExamIndex, setCurrentExamIndex] = useState(0);
  const referenceCanvasRef = useRef(null);
  const [showTutorial, setShowTutorial] = useState(false);
  const [canvasSettings, setCanvasSettings] = useState({
    strokeColor: '#000000',
    strokeWidth: 5,
    guideColor: '#D3D3D3'
  });
  const [includeHiragana, setIncludeHiragana] = useState(true);
  const [includeKatakana, setIncludeKatakana] = useState(false);
  const [showCharacterSelector, setShowCharacterSelector] = useState(false);

  const messages = {
    'en': enMessages,
    'es': esMessages
  };
  useEffect(() => {
    const tutorialCompleted = localStorage.getItem('tutorialCompleted');
    if (tutorialCompleted) {
      setShowTutorial(false);
    }
    setProgress(getAllProgress());
  }, []);

  const getNextCharacter = () => {
    const srsCharacter = getNextSRSCharacter();
    if (srsCharacter && Math.random() < 0.6) { // 60%
      return srsCharacter;
    }
    return getRandomCharacter(includeHiragana, includeKatakana);
  };

  const handleNextCharacter = () => {
    if (practiceMode === 'exam') {
      if (currentExamIndex < examCharacters.length - 1) {
        setCurrentExamIndex(currentExamIndex + 1);
        setCurrentCharacter(examCharacters[currentExamIndex + 1]);
      } else {
        
        setPracticeMode('free');
      }
    } else {
      setCurrentCharacter(getNextCharacter());
    }
    setFeedback(null);
  };

  const handleModeChange = (mode) => {
    setPracticeMode(mode);
    if (mode === 'exam') {
      const examChars = Array(10).fill().map(() => getRandomCharacter(true, false));
      setExamCharacters(examChars);
      setCurrentExamIndex(0);
      setCurrentCharacter(examChars[0]);
    } else {
      setCurrentCharacter(getNextCharacter());
    }
    setFeedback(null);
  };

  const handleDifficultyChange = (difficulty) => {
    setDifficultyLevel(difficulty);
    setFeedback(null);
  };

  const compareDrawings = (userDrawing) => {
    const similarity = Math.random();
    
    saveProgress(currentCharacter, similarity);

    setFeedback({
      userDrawing,
      similarity,
      message: similarity > 0.6 ? '¡Bien hecho!' : 'Intenta de nuevo',
    });

    if (practiceMode === 'exam') {
      if (currentExamIndex === examCharacters.length - 1) {
        const examScore = examCharacters.reduce((sum, char) => sum + similarity, 0) / examCharacters.length;
        setFeedback(prevFeedback => ({ ...prevFeedback, examScore: examScore }));
      }
    }
  };

  const handleTutorialComplete = () => {
    setShowTutorial(false);
    localStorage.setItem('tutorialCompleted', 'true');
  };

  const handleCharacterTypeToggle = (type) => {
    if (type === 'hiragana') {
      setIncludeHiragana(!includeHiragana);
    } else if (type === 'katakana') {
      setIncludeKatakana(!includeKatakana);
    }
    if (!includeHiragana && !includeKatakana) {
      setIncludeHiragana(true);
    }
    setCurrentCharacter(getNextCharacter());
  };

  const handleSelectCharacter = (character) => {
    setCurrentCharacter(character);
    setShowCharacterSelector(false);
  };

  const handleCleanProgress = () => {
    cleanProgress();
    setProgress([]);
    setCurrentCharacter(getRandomCharacter(includeHiragana, includeKatakana));
  };

  return (
    <IntlProvider messages={messages[locale]} locale={locale}>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <select value={locale} onChange={(e) => setLocale(e.target.value)}>
          <option value="en">English</option>
          <option value="es">Español</option>
        </select>
        {showTutorial && <Tutorial onComplete={handleTutorialComplete} />}
        <h1 className="text-3xl font-bold mb-8 text-center">Hiragana y Katakana </h1>
        <div className="bg-white p-4 sm:p-8 rounded-lg shadow-md max-w-md w-full">
          <CharacterTypeSelector
            includeHiragana={includeHiragana}
            includeKatakana={includeKatakana}
            onToggle={handleCharacterTypeToggle}
          />
          <PracticeMode currentMode={practiceMode} onModeChange={handleModeChange} />
          <DifficultyLevel currentDifficulty={difficultyLevel} onDifficultyChange={handleDifficultyChange} />
          <CanvasSettings settings={canvasSettings} onSettingsChange={setCanvasSettings} />
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{currentCharacter}</h2>
            <button
              onClick={() => setShowCharacterSelector(!showCharacterSelector)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {showCharacterSelector ? 'hide chars' : 'show chars'}
            </button>
          </div>
          {showCharacterSelector && (
            <CharacterSelector
              onSelectCharacter={handleSelectCharacter}
              includeHiragana={includeHiragana}
              includeKatakana={includeKatakana}
            />
          )}
          <HiraganaCanvas 
            character={currentCharacter} 
            onDrawingComplete={compareDrawings} 
            guidedMode={practiceMode === 'guided'}
            difficulty={difficultyLevel}
            settings={canvasSettings}
          />
          <Controls onNext={handleNextCharacter} />
          {feedback && (
            <Feedback 
              userDrawing={feedback.userDrawing}
              correctCharacter={currentCharacter}
              similarity={feedback.similarity}
              message={feedback.message}
              examScore={feedback.examScore}
            />
          )}
          {practiceMode !== 'exam' && (
            <div className="mt-4">
              <h2 className="text-xl font-bold mb-2">Progress</h2>
              <div className="max-h-40 overflow-y-auto">
                {progress.map(({ character, average }) => (
                  <div key={character} className="flex justify-between">
                    <span>{character}</span>
                    <span>{(average * 100).toFixed(2)}%</span>
                  </div>
                ))}
              </div>

              <button
                onClick={handleCleanProgress}
                className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                clean progress
              </button>

            </div>
          )}
        </div>
          
        <canvas ref={referenceCanvasRef} width="300" height="300" style={{display: 'none'}} />
      </div>
    </IntlProvider>
  );
}

export default App;