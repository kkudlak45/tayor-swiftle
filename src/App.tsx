import { Fragment, useCallback, useEffect, useState } from 'react'
import { songs } from './constants/songs'
import { getCodeWord } from './constants/answer';

const targetAnswerCount = 13;
const roundMaxTime = 10;

const optionCount = Array.from(songs.keys()).length;
const getNewAnswerKey = () => {
  const index = Math.floor(Math.random() * optionCount);
  return Array.from(songs.keys())[index];
}

function App() {
  const [playerWon, setPlayerWon] = useState(false);
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0);
  const [selectedKey, setSelectedKey] = useState('');
  const [answerKey, setAnswerKey] = useState(getNewAnswerKey());
  const answerSong = songs.get(answerKey);
  const [elapsedTime, setElapsedTime] = useState(0);

  // @ts-ignore
  const onSubmit = useCallback((e) => {
    // handle submission of an answer
    e.preventDefault();
    answerSong.pause();
    answerSong.currentTime = 0;

    if (selectedKey === answerKey) {
      alert('Nice one!')
      setCorrectAnswerCount((prevVal) => prevVal + 1);
    } else {
      alert('Sorry! That\'s incorrect.')
      setCorrectAnswerCount(0);
    }

    setElapsedTime(0);
    setAnswerKey(getNewAnswerKey());
  }, [selectedKey, answerKey, answerSong, setCorrectAnswerCount]);

  // play the song on first render
  useEffect(() => {
    answerSong.play()
  }, [answerSong]);

  // check for game win
  useEffect(() => {
    if (correctAnswerCount >= targetAnswerCount) {
      setPlayerWon(true);
    }
  }, [correctAnswerCount])

  // handle timer
  useEffect(() => {
    if (elapsedTime >= roundMaxTime) {
      alert('Sorry! Time limit exceeded')
      setCorrectAnswerCount(0);
      setElapsedTime(0);
      answerSong.pause();
      setAnswerKey(getNewAnswerKey());
    }

    const timeout = window.setTimeout(() => {
      setElapsedTime((currVal) => currVal + 1);
      window.clearTimeout(timeout);
    }, 1000)

    return () => window.clearTimeout(timeout);
  }, [elapsedTime]);

  return (
    <Fragment>
      <h1>{"Swiftle (Signal's Version)"}</h1>
      {playerWon && (
        <p style={{ color: 'red', fontWeight: 'bold' }}>
          CODE WORD: {getCodeWord()}
        </p>
      )}
      <p>Time Remaining: {roundMaxTime - elapsedTime}</p>
      <p>Correct Answer Streak: {correctAnswerCount} / {targetAnswerCount}</p>
      <button onClick={() => answerSong.play()}>Play</button>
      <button onClick={() => answerSong.pause()}>Pause</button>
      <br />
      <form onSubmit={onSubmit}>
        <select name="Answer" value={selectedKey} onChange={(e) => setSelectedKey(e.target.value)}>
          {Array.from(songs.keys()).sort().map((songName) => {
            return (<option key={songName} value={songName}>{songName}</option>)
          })}
        </select>
        <br />
        <button type="submit">Submit</button>
        <br />
        <p style={{ position: 'absolute', bottom: '10px', left: 0, width: 'calc(100vw - 20px)' }}>
          NOTE: This was developed and tested on Chrome for Windows.
          For best results, please use Google Chrome on a PC. The app may
          not function properly on other devices. There are known issues with
          trying to play the audio on IOS
        </p>
      </form>
    </Fragment>
  )
}

export default App
