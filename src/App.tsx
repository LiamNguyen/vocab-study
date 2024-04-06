import { Button } from '@mui/material'
import { useEffect, useReducer, useState } from 'react';

import './App.css';
import catImg from './assets/study-cat.avif'
import { vocabulary } from './assets/vocabulary'
import { CssTextField } from './CssTextField';
import { QuestionResult, AppState, ActionName } from './types';
import { ResultModal } from './ResultModal';
import { designTestSet, fetchCurrentQuestionId, fetchOngoingTest, fetchTestHistory, getCurrentQuestion, storeCurrentQuestionId, storeOngoingTest, updateTestHistory, updateTestResult } from './utils';
import { FinalTestResultModal } from './FinalTestResultModal/FinalTestResultModal';
import { MAX_QUESTION } from './constants';
import { restartButtonStyle, viewHistoryButtonStyle } from './AppStyles';
import { TestHistoryModal } from './TestHistoryModal/TestHistoryModal';
import { orderBy } from 'lodash';

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
  const [testHistoryModalOpen, setTestHistoryModalOpen] = useState(false)
  const testHistory = fetchTestHistory()

  useEffect(() => {
    const onGoingTest = fetchOngoingTest()
    if (onGoingTest?.length > 0) {
      dispatchUpdateTestSet(onGoingTest)
      dispatchUpdateCurrentQuestionId(fetchCurrentQuestionId())
    } else {
      dispatchUpdateTestSet(designTestSet(vocabulary, MAX_QUESTION))
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
    const orderedTestSet = orderBy(updatedTestResult, ['isCorrect'], ['asc']) // Wrong questions first

    dispatchUpdateTestSet(orderedTestSet) // Store user answer

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

    dispatchUpdateTestSet(designTestSet(vocabulary, MAX_QUESTION))
    dispatchUpdateCurrentQuestionId(1)
  }

  const handleRestartTest = () => {
    dispatchUpdateTestSet(designTestSet(vocabulary, MAX_QUESTION))
    dispatchUpdateCurrentQuestionId(1)
  }

  const handleViewTestHistory = () => {
    if (testHistory.length < 1) return
    setTestHistoryModalOpen(true)
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
          <Button
            variant='text'
            style={restartButtonStyle}
            onClick={handleRestartTest}
          >
            Restart test
          </Button>
          <Button
            variant='text'
            style={viewHistoryButtonStyle}
            onClick={handleViewTestHistory}
          >
            View test history
          </Button>
        </div>
        <ResultModal
          open={resultModalOpen}
          onClose={handleResultModalClose}
          questionResult={getCurrentQuestion(state.testSet, state.currentQuestionId)}
        />
        <FinalTestResultModal
          open={finalTestResultModalOpen}
          onClose={handleFinalTestResultModalClose}
          testSet={state.testSet}
        />
        <TestHistoryModal
          open={testHistoryModalOpen}
          onClose={() => setTestHistoryModalOpen(false)}
          testHistory={testHistory}
        />
      </div>) : <div />}
    </div>
  );
}

export default App;
