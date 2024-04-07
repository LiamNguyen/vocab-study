import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';


import { boxStyle, buttonContainerStyle, buttonStyle, resultContainerStyle } from './styles';
import { ResultSummaryCard } from '../ResultSummaryCard';
import { useState } from 'react';
import { FinalTestResultModal } from '../FinalTestResultModal/FinalTestResultModal';
import { find, matchesProperty } from 'lodash';
import { QuestionResult, TestHistory } from '../types';

interface props {
  open: boolean
  onClose: () => void
  testHistory: TestHistory[]
}

export const TestHistoryModal = ({ open, onClose, testHistory }: props) => {
  const [testDetailOpen, setTestDetailOpen] = useState(false)
  const [chosenTestResult, setChosenTestResult] = useState([] as QuestionResult[])

  const handleCardClick = (testId: number) => {
    const chosenTest: TestHistory = find(testHistory, matchesProperty('id', testId))

    setChosenTestResult(chosenTest.testResult)
    setTestDetailOpen(true)
  }

  return (
    <Modal
      id='result-modal'
      open={open}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
      disableEnforceFocus
    >
      <Box sx={boxStyle}>
        <div style={resultContainerStyle}>
          {testHistory.map(({ id, testResult, createdAt }) => (
            <div key={id}>
              <ResultSummaryCard key={id} testId={id} date={createdAt} testSet={testResult} onClick={handleCardClick} />
            </div>
          ))}
        </div>
        <div style={buttonContainerStyle}>
          <Button style={buttonStyle} variant='contained' onClick={onClose}>
            Close
          </Button>
        </div>
        <FinalTestResultModal
          open={testDetailOpen}
          onClose={() => setTestDetailOpen(false)}
          testSet={chosenTestResult}
          showCloseButton={true}
        />
      </Box>
    </Modal>
  )
}