import { Button } from '@mui/material'
import { useEffect, useState } from 'react';
import { shuffle, find, matchesProperty } from 'lodash'

import './App.css';
import catImg from './assets/study-cat.avif'
import { vocabulary } from './assets/vocabulary'
import { CssTextField } from './CssTextField';
import { LANG, QuestionResult, Question, QuestionResultWithoutId } from './types';
import { ResultModal } from './ResultModal';
import { isAnswerCorrect } from './utils';

const randomizeLangSelection = (testSet: Question[]) => {
  return testSet.map((testSetQuestion: Question) => {
    const randomInt = Math.floor(Math.random() * 2) // Only 0 or 1
    const selectedLang = randomInt === 0 ? LANG.EN : LANG.FI
    const question = testSetQuestion[selectedLang]
    const correctAnswer = testSetQuestion[LANG.EN] === question ? testSetQuestion[LANG.FI] : testSetQuestion[LANG.EN]

    return { question, correctAnswer }
  })
}

export const addQuestionId = (testSet: QuestionResultWithoutId[]) => {
  let id = 1
  return testSet.map((question: QuestionResultWithoutId) => {
    const wordSetWithId = {
      ...question,
      id
    }
    id++

    return wordSetWithId
  })
}

const getCurrentQuestion = (testSet: QuestionResult[], currentQuestion: number): QuestionResult =>
  find(testSet, matchesProperty('id', currentQuestion))

const designTestSet = (testSet: Question[]): QuestionResult[] => {
  const shuffledList = shuffle(testSet)
  const randomizeLangSelectionList = randomizeLangSelection(shuffledList)
  const testSetWithQuestionId = addQuestionId(randomizeLangSelectionList)

  return testSetWithQuestionId
}

const updateTestResult = (
  testSet: QuestionResult[],
  currentQuestion: number,
  userAnswer: string
): QuestionResult[] => {
  const correctAnswer = getCurrentQuestion(testSet, currentQuestion).correctAnswer

  return testSet.map((questionResult: QuestionResult) => {
    if (questionResult.id !== currentQuestion) return { ...questionResult }

    return {
      ...questionResult,
      userAnswer,
      isCorrect: isAnswerCorrect(userAnswer, correctAnswer)
    }
  })
}

const App = () => {
  const [testSet, setTestSet] = useState(designTestSet(vocabulary) as QuestionResult[])
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [userAnswer, setUserAnswer] = useState('')
  const [resultModalOpen, setResultModalOpen] = useState(false)

  useEffect(() => {
    // localStorage.setItem('testSet', JSON.stringify(testSet))
  }, [testSet])

  useEffect(() => {
    // localStorage.setItem('currentQuestion', JSON.stringify(currentQuestion))
  }, [currentQuestion])

  const handleKeyDown = (e: any) => {
    if (e.keyCode !== 13) return

    checkAnswer()
  }

  const handleInputChange = (e: any) => {
    setUserAnswer(e.target.value)
  }

  const checkAnswer = () => {
    const updatedTestResult = updateTestResult(testSet, currentQuestion, userAnswer)
    setTestSet(updatedTestResult) // Store user answer

    setResultModalOpen(true)

    setUserAnswer('') // Clear input field
  }

  const handleResultModalClose = () => {
    setResultModalOpen(false)

    const nextQuestion = currentQuestion + 1
    setCurrentQuestion(nextQuestion)
  }

  return (
    <div className='App'>
      <h1>Suomen kielen sanasto</h1>
      <div id='cat-img'><img src={catImg} alt='' /></div>
      <div id='question-card'>
        <h1>{getCurrentQuestion(testSet, currentQuestion)?.question}</h1>
        <div id='answer-input'>
          <CssTextField
            id='standard-basic'
            label='Vastaus'
            variant='standard'
            value={userAnswer}
            onKeyDown={handleKeyDown}
            onChange={handleInputChange}
            fullWidth
          />
        </div>
        <div id='next-button'>
          <h3>{`${currentQuestion}/${testSet.length}`}</h3>
          <Button variant='contained' onClick={checkAnswer}>Next</Button>
        </div>
      </div>
      <ResultModal
        open={resultModalOpen}
        handleClose={handleResultModalClose}
        questionResult={getCurrentQuestion(testSet, currentQuestion)}
      />
    </div>
  );
}

export default App;
