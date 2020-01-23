import React, {useEffect, useState} from 'react';
import './App.css';

function App() {
  const [charCount, setCharCount] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(5);

  function handleCharChange(e) {
    const {value} = e.target;
    setCharCount(value)
  }

  function calculateWordCount(string) {
    const wordsArr = string.trim().split(" ");
    return wordsArr.filter(word => word !== "").length
  }

  useEffect(() => {
    if(timeRemaining >= 1) {
      setTimeout(() => {
        setTimeRemaining(prevTime => prevTime - 1)
      }, 1000)
    }
  },[timeRemaining]);

  return (
    <div>
      <h1>Speed Typing Game</h1>
      <textarea
        onChange={handleCharChange}
        value={charCount}
      />
      <h4>Time Remaining: {timeRemaining}</h4>
      <button>Start game</button>
      <h1>You typed x words</h1>
    </div>
  );
}

export default App;
