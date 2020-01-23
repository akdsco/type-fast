import React, {useEffect, useRef, useState} from 'react';
import './App.css';

function App() {
  const STARTING_TIME = 5;
  const textBoxRef = useRef(null);

  const [text, setText] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(STARTING_TIME);
  const [isTimeRunning, setIsTimeRunning] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [isGameOver, setGameOver] = useState(false);

  function handleCharChange(e) {
    const {value} = e.target;
    setText(value)
  }

  function calculateWordCount(string) {
    const wordsArr = string.trim().split(" ");
    return wordsArr.filter(word => word !== "").length
  }

  function startGame() {
    setIsTimeRunning(true);
    setTimeRemaining(STARTING_TIME);
    setText('');
    setGameOver(false);
    textBoxRef.current.disabled = false;
    textBoxRef.current.focus();
  }

  function endGame() {
    setWordCount(calculateWordCount(text));
    setIsTimeRunning(false);
    setGameOver(true);
  }

  useEffect(() => {
    if(isTimeRunning && timeRemaining > 0) {
      setTimeout(() => {
        setTimeRemaining(prevTime => prevTime - 1)
      }, 1000)
    } else if(timeRemaining === 0) {
      endGame()
    }
  },[timeRemaining, isTimeRunning]);

  return (
    <div>
      <h1>Speed Typing Game</h1>
      <textarea
        ref={textBoxRef}
        onChange={handleCharChange}
        value={text}
        disabled={!isTimeRunning}
      />
      <h4>Time Remaining: {timeRemaining}</h4>
      <button disabled={isTimeRunning} onClick={startGame}>Start game</button>
      {isGameOver && <h1>You typed {wordCount} {wordCount === 1 ? 'word' : 'words'}</h1>}
    </div>
  );
}

export default App;
