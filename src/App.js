import React from 'react';
import './App.css';
import useWordGame from "./hooks/useWordGame";

function App() {
  const [
    text,
    wordCount,
    textBoxRef,
    isGameOver,
    isTimeRunning,
    timeRemaining,
    handleTextChange,
    startGame
  ] = useWordGame(15);


  return (
    <div>
      <h1>Speed Typing Game</h1>
      <textarea
        ref={textBoxRef}
        onChange={handleTextChange}
        value={text}
        disabled={!isTimeRunning}
      />
      <h4>Time Remaining: {timeRemaining}</h4>
      <button
        disabled={isTimeRunning}
        onClick={startGame}
      >
        Start game
      </button>
      {isGameOver &&
        <h1>You typed {wordCount} {wordCount === 1 ? 'word' : 'words'}</h1>
      }
    </div>
  );
}

export default App;
