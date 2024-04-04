import { Button } from '@mui/material'
import { useEffect, useReducer, useState } from 'react';
import { shuffle, find, matchesProperty, slice } from 'lodash'

import './App.css';
import catImg from './assets/study-cat.avif'
import { vocabulary } from './assets/vocabulary'
import { CssTextField } from './CssTextField';
import { LANG, QuestionResult, Question, QuestionResultWithoutId, AppState, ActionName } from './types';
import { ResultModal } from './ResultModal';
import { fetchCurrentQuestionId, fetchOngoingTest, isAnswerCorrect, storeCurrentQuestionId, storeOngoingTest, updateTestHistory } from './utils';
import { FinalTestResultModal } from './FinalTestResultModal';

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

const getCurrentQuestion = (testSet: QuestionResult[], currentQuestionId: number): QuestionResult =>
  find(testSet, matchesProperty('id', currentQuestionId))

const designTestSet = (testSet: Question[], numberOfQuestion: number): QuestionResult[] => {
  const shuffledList = shuffle(testSet)
  const randomizeLangSelectionList = randomizeLangSelection(shuffledList)
  const testSetWithQuestionId = addQuestionId(randomizeLangSelectionList)

  return slice(testSetWithQuestionId, 0, numberOfQuestion)
}

const updateTestResult = (
  testSet: QuestionResult[],
  currentQuestionId: number,
  userAnswer: string
): QuestionResult[] => {
  const correctAnswer = getCurrentQuestion(testSet, currentQuestionId).correctAnswer

  return testSet.map((questionResult: QuestionResult) => {
    if (questionResult.id !== currentQuestionId) return { ...questionResult }

    return {
      ...questionResult,
      userAnswer,
      isCorrect: isAnswerCorrect(userAnswer, correctAnswer)
    }
  })
}

const reducer = (state: AppState, action: any) => {
  switch (action.type) {
    case ActionName.UPDATE_TEST_SET:
      const newTestSet = action.testSet

      storeOngoingTest(newTestSet)

      return { ...state, testSet: newTestSet }
    case ActionName.UPDATE_QUESTION_ID:
      const updatedCurrentQuestionId = action.currentQuestionId

      storeCurrentQuestionId(updatedCurrentQuestionId)

      return { ...state, currentQuestionId: updatedCurrentQuestionId }
    default:
      return
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, { testSet: [], currentQuestionId: 1 })
  const [userAnswer, setUserAnswer] = useState('')
  const [resultModalOpen, setResultModalOpen] = useState(false)
  const [finalTestResultModalOpen, setfinalTestResultModalOpen] = useState(false)

  useEffect(() => {
    const onGoingTest = fetchOngoingTest()
    if (onGoingTest?.length > 0) {
      dispatchUpdateTestSet(onGoingTest)
      dispatchUpdateCurrentQuestionId(fetchCurrentQuestionId())
    } else {
      dispatchUpdateTestSet(designTestSet(vocabulary, 100))
      dispatchUpdateCurrentQuestionId(1)
    }
  }, [])

  const dispatchUpdateTestSet = (testSet: QuestionResult[]) => {
    dispatch({ type: ActionName.UPDATE_TEST_SET, testSet })
  }

  const dispatchUpdateCurrentQuestionId = (currentQuestionId: number) => {
    dispatch({ type: ActionName.UPDATE_QUESTION_ID, currentQuestionId })
  }

  const handleKeyDown = (e: any) => {
    if (e.keyCode !== 13) return

    checkAnswer()
  }

  const handleInputChange = (e: any) => {
    setUserAnswer(e.target.value)
  }

  const checkAnswer = () => {
    const { testSet, currentQuestionId } = state
    const updatedTestResult = updateTestResult(testSet, currentQuestionId, userAnswer)
    dispatchUpdateTestSet(updatedTestResult) // Store user answer

    setResultModalOpen(true)

    setUserAnswer('') // Clear input field
  }

  const handleResultModalClose = () => {
    setResultModalOpen(false)

    const { testSet, currentQuestionId } = state

    if (currentQuestionId === testSet.length) {
      setfinalTestResultModalOpen(true)
      updateTestHistory(testSet)

      return
    }

    const nextQuestion = currentQuestionId + 1
    dispatchUpdateCurrentQuestionId(nextQuestion)
  }

  const handleFinalTestResultModalClose = () => {
    setfinalTestResultModalOpen(false)

    dispatchUpdateTestSet(designTestSet(vocabulary, 100))
    dispatchUpdateCurrentQuestionId(1)
  }

  return (
    <div className='App'>
      <h1>Suomen kielen sanasto</h1>
      <div id='cat-img'><img src={catImg} alt='' /></div>
      {state.testSet.length > 0 ? (<div>
        <div id='question-card'>
          <h1>{getCurrentQuestion(state.testSet, state.currentQuestionId)?.question}</h1>
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
            <h3>{`${state.currentQuestionId}/${state.testSet.length}`}</h3>
            <Button variant='contained' onClick={checkAnswer}>Next</Button>
          </div>
        </div>
        <ResultModal
          open={resultModalOpen}
          handleClose={handleResultModalClose}
          questionResult={getCurrentQuestion(state.testSet, state.currentQuestionId)}
        />
        <FinalTestResultModal
          open={finalTestResultModalOpen}
          handleClose={handleFinalTestResultModalClose}
          testSet={state.testSet}
        />
      </div>) : <div />}

    </div>
  );
}

export default App;
