import {useState, useRef, useEffect} from 'react'

function useWordGame(startingTime = 10) {
  const textBoxRef = useRef(null);

  const [text, setText] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(startingTime);
  const [isTimeRunning, setIsTimeRunning] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [isGameOver, setGameOver] = useState(false);

  function handleTextChange(e) {
    const {value} = e.target;
    setText(value)
  }

  function calculateWordCount(string) {
    const wordsArr = string.trim().split(" ");
    return wordsArr.filter(word => word !== "").length
  }

  function startGame() {
    setIsTimeRunning(true);
    setTimeRemaining(startingTime);
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

  return [
    text,
    wordCount,
    textBoxRef,
    isGameOver,
    isTimeRunning,
    timeRemaining,
    handleTextChange,
    startGame
  ]
}

export default useWordGame