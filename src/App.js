import { Button } from '@mui/material'
import { useEffect, useState } from 'react';
import { shuffle, find, matchesProperty } from 'lodash'

import './App.css';
import catImg from './assets/study-cat.avif'
import { vocabulary } from './assets/vocabulary'
import { CssTextField } from './CssTextField';

const EN = 'en'
const FI = 'fi'

const randomizeLangSelection = wordList => {
  return wordList.map(wordSet => {
    const randomInt = Math.floor(Math.random() * 2) // Only 0 or 1
    const selectedLang = randomInt === 0 ? EN : FI

    return { ...wordSet, selectedLang }
  })
}

export const addQuestionId = wordList => {
  let id = 1
  return wordList.map(wordSet => {
    const wordSetWithId = {
      ...wordSet,
      id
    }
    id++

    return wordSetWithId
  })
}

const designTestSet = wordList => {
  const shuffledList = shuffle(wordList)
  const randomizeLangSelectionList = randomizeLangSelection(shuffledList)
  const testSetWithQuestionId = addQuestionId(randomizeLangSelectionList)

  return testSetWithQuestionId
}

const getQuestionAndAnswer = (testSet, currentQuestion) => {
  if (!testSet || testSet.length === 0) return

  const wordSet = find(testSet, matchesProperty('id', currentQuestion))
  const question = wordSet[wordSet.selectedLang]
  const answer = wordSet[EN] === question ? wordSet[FI] : wordSet[EN]

  return {
    question,
    answer
  }
}

const App = () => {
  const [testSet] = useState(designTestSet(vocabulary))
  const [currentQuestion, setCurrentQuestion] = useState(1)

  useEffect(() => {
    // localStorage.setItem('testSet', JSON.stringify(testSet))
  }, [testSet])

  useEffect(() => {
    // localStorage.setItem('currentQuestion', JSON.stringify(currentQuestion))
  }, [currentQuestion])

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1
    setCurrentQuestion(nextQuestion)
  }

  const handleKeyDown = e => {
    if (e.keyCode !== 13) return

    handleNextQuestion()
  }

  return (
    <div className="App">
      <h1>Suomen kielen sanasto</h1>
      <div id='cat-img'><img src={catImg} alt='' /></div>
      <div id='question-card'>
        <h1>{getQuestionAndAnswer(testSet, currentQuestion)?.question}</h1>
        <div id='answer-input'>
          <CssTextField
            id='standard-basic'
            label='Vastaus'
            variant='standard'
            onKeyDown={handleKeyDown}
            fullWidth
          />
        </div>
        <div id='next-button'>
          <h3>{`${currentQuestion}/${testSet.length}`}</h3>
          <Button variant="contained" onClick={handleNextQuestion}>Next</Button>
        </div>
      </div>
    </div>
  );
}

export default App;
