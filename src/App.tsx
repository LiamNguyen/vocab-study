import { Button } from '@mui/material'
import { useEffect, useState } from 'react';
import { shuffle, find, matchesProperty } from 'lodash'

import './App.css';
import catImg from './assets/study-cat.avif'
import { vocabulary } from './assets/vocabulary'
import { CssTextField } from './CssTextField';
import { LANG, Question, UnrefinedQuestion } from './types';

const randomizeLangSelection = (testSet: UnrefinedQuestion[]): Question[] => {
  return testSet.map((question: Question) => {
    const randomInt = Math.floor(Math.random() * 2) // Only 0 or 1
    const selectedLang = randomInt === 0 ? LANG.EN : LANG.FI

    return { ...question, selectedLang }
  })
}

export const addQuestionId = (testSet: Question[]): Question[] => {
  let id = 1
  return testSet.map((question: Question) => {
    const wordSetWithId = {
      ...question,
      id
    }
    id++

    return wordSetWithId
  })
}

const designTestSet = (testSet: UnrefinedQuestion[]): Question[] => {
  const shuffledList = shuffle(testSet)
  const randomizeLangSelectionList = randomizeLangSelection(shuffledList)
  const testSetWithQuestionId = addQuestionId(randomizeLangSelectionList)

  return testSetWithQuestionId
}

const getQuestionAndAnswer = (testSet: Question[], currentQuestion: number) => {
  if (!testSet || testSet.length === 0) return

  const wordSet = find(testSet, matchesProperty('id', currentQuestion))
  const question = wordSet[wordSet.selectedLang]
  const answer = wordSet[LANG.EN] === question ? wordSet[LANG.FI] : wordSet[LANG.EN]

  return {
    question,
    answer
  }
}

const isAnswerCorrect = (userAnswer: string, correctAnswer: string): boolean => {
  return correctAnswer.trim().toLowerCase().includes(userAnswer.toLowerCase().trim())
}

const updateTestResult = (
  testSet: Question[],
  currentQuestion: number,
  userAnswer: string
): Question[] => {
  const correctAnswer = getQuestionAndAnswer(testSet, currentQuestion).answer

  return testSet.map((question: Question) => {
    if (question.id !== currentQuestion) return { ...question }

    return {
      ...question,
      userAnswer,
      isCorrect: isAnswerCorrect(userAnswer, correctAnswer)
    }
  })
}

const App = () => {
  const [testSet, setTestSet] = useState(designTestSet(vocabulary) as Question[])
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [userAnswer, setUserAnswer] = useState('')

  useEffect(() => {
    // localStorage.setItem('testSet', JSON.stringify(testSet))
  }, [testSet])

  useEffect(() => {
    // localStorage.setItem('currentQuestion', JSON.stringify(currentQuestion))
  }, [currentQuestion])

  const handleKeyDown = (e: any) => {
    if (e.keyCode !== 13) return

    handleNextQuestion()
  }

  const handleInputChange = (e: any) => {
    setUserAnswer(e.target.value)
  }

  const handleNextQuestion = () => {
    const updatedTestResult = updateTestResult(testSet, currentQuestion, userAnswer)
    setTestSet(updatedTestResult)
    console.log(updatedTestResult)

    setUserAnswer('') // Clear input field
    const nextQuestion = currentQuestion + 1
    setCurrentQuestion(nextQuestion)
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
            value={userAnswer}
            onKeyDown={handleKeyDown}
            onChange={handleInputChange}
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
