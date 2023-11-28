import { Fragment, useCallback, useEffect, useState } from 'react'
import { songs } from './constants/songs'

const targetAnswerCount = 13;

const optionCount = Array.from(songs.keys()).length;
const getNewAnswerKey = () => {
  const index = Math.floor(Math.random() * optionCount);
  return Array.from(songs.keys())[index];
}

function App() {
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0);
  const [selectedKey, setSelectedKey] = useState('');
  const [answerKey, setAnswerKey] = useState(getNewAnswerKey());
  const answerSong = songs.get(answerKey);

  // @ts-ignore
  const onSubmit = useCallback((e) => {
    e.preventDefault();
    answerSong.pause();
    answerSong.currentTime = 0;

    if (selectedKey === answerKey) {
      alert('Nice one!')
      setCorrectAnswerCount((prevVal) => prevVal + 1);
    } else {
      alert('Sorry! That\'s incorrect.')
    }

    setAnswerKey(getNewAnswerKey());
  }, [selectedKey, answerKey, answerSong, setCorrectAnswerCount]);

  useEffect(() => {
    answerSong.play()
  }, [answerSong]);

  useEffect(() => {
    if (correctAnswerCount > targetAnswerCount) {
      alert('Congratulations! N 39 XX.XXX W 080 XX.XXX')
    }
  }, [targetAnswerCount])

  return (
    <Fragment>
      <h1>Taylor Swiftle</h1>
      <p>Correct Answers: {correctAnswerCount} / 13</p>
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
      </form>
    </Fragment>
  )
}

export default App
