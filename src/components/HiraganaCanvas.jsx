import React, { useRef, useEffect, useState } from 'react';

function HiraganaCanvas({ character, onDrawingComplete, guidedMode, difficulty, settings }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentStroke, setCurrentStroke] = useState(0);
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (guidedMode) {
      drawGuidedCharacter(ctx, character, currentStroke);
    } else {
      drawCharacter(ctx, character, difficulty);
    }
    
    ctx.strokeStyle = settings.strokeColor;
    ctx.lineWidth = settings.strokeWidth;
    ctx.lineCap = 'round';

    if (difficulty === 'hard') {
      setTimeLeft(5);
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            handleStrokeComplete();
            return null;
          }
          return prevTime - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [character, guidedMode, currentStroke, difficulty, settings]);

  const drawCharacter = (ctx, char, diff) => {
    ctx.font = '100px serif';
    if (diff === 'easy') {
      ctx.fillStyle = settings.guideColor;
      ctx.fillText(char, 75, 150);
    } else if (diff === 'medium') {
      ctx.fillStyle = `${settings.guideColor}4D`; 
      ctx.fillText(char, 75, 150);
    }
    
  };

  const drawGuidedCharacter = (ctx, char, stroke) => {
    ctx.font = '100px serif';
    ctx.fillStyle = settings.guideColor;
    ctx.fillText(char, 75, 150);
    
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
   
    ctx.beginPath();
    ctx.moveTo(75, 150);
    ctx.lineTo(75 + stroke * 20, 150);
    ctx.stroke();
  };

  const startDrawing = (e) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    const imageData = canvas.toDataURL();
    onDrawingComplete(imageData);
  };

  const handleStrokeComplete = () => {
    if (guidedMode) {
      setCurrentStroke(currentStroke + 1);
      if (currentStroke >= 3) { 
        onDrawingComplete(canvasRef.current.toDataURL());
        setCurrentStroke(0);
      }
    } else {
      onDrawingComplete(canvasRef.current.toDataURL());
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCharacter(ctx, character, difficulty);
  };

  return (
    <div>
      <canvas 
        ref={canvasRef} 
        width="300" 
        height="300" 
        className="border-2 border-gray-300"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
      />
      <button 
        onClick={clearCanvas}
        className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Limpiar
      </button>
      {difficulty === 'hard' && timeLeft !== null && (
        <p className="text-center mt-2">Tiempo restante: {timeLeft}s</p>
      )}
    </div>
  );
}

export default HiraganaCanvas;