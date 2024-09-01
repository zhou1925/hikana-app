import React, { useState } from 'react';

function Tutorial({ onComplete }) {
  const [step, setStep] = useState(0);

  const tutorialSteps = [
    {
      title: "Bienvenido a la Práctica de Hiragana",
      content: "Esta aplicación te ayudará a practicar la escritura de caracteres Hiragana."
    },
    {
      title: "Dibuja el carácter",
      content: "Intenta dibujar el carácter mostrado en el canvas. Puedes usar el mouse o una pantalla táctil."
    },
    {
      title: "Recibe retroalimentación",
      content: "Después de dibujar, recibirás retroalimentación sobre tu trazo."
    },
    {
      title: "Diferentes modos de práctica",
      content: "Puedes elegir entre modo libre, examen o guiado para tu práctica."
    },
    {
      title: "Ajusta la dificultad",
      content: "Selecciona entre niveles fácil, medio y difícil para desafiarte a ti mismo."
    }
  ];

  const handleNext = () => {
    if (step < tutorialSteps.length - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg max-w-md">
        <h2 className="text-2xl font-bold mb-4">{tutorialSteps[step].title}</h2>
        <p className="mb-6">{tutorialSteps[step].content}</p>
        <button
          onClick={handleNext}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {step < tutorialSteps.length - 1 ? "Siguiente" : "Comenzar"}
        </button>
      </div>
    </div>
  );
}

export default Tutorial;