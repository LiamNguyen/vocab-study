import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Emoji from 'react-emojis';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import { QuestionResult } from './types';
import { resultSummaryStatsStyle, smallerTextStyle, smallerWarningTextStyle } from './ResultSummaryCard';
import { useEffect, useState } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 300,
  bgcolor: 'background.paper',
  p: 4,
  borderRadius: 5,
  backgroundColor: '#cdffd0'
};

const getEmoji = (isCorrect: boolean): string =>
  isCorrect ? 'partying-face' : 'upside-down-face'

interface props {
  open: boolean
  onClose: () => void
  onSwitch: (switchActive: boolean) => void
  questionResult: QuestionResult
}

// const reducer = (state: AppState, action: any) => {
//   switch (action.type) {
//     case ActionName.UPDATE_TEST_SET:
//       const newTestSet = action.testSet

//       storeOngoingTest(newTestSet)

//       return { ...state, testSet: newTestSet }
//     case ActionName.UPDATE_QUESTION_ID:
//       const updatedCurrentQuestionId = action.currentQuestionId

//       storeCurrentQuestionId(updatedCurrentQuestionId)

//       return { ...state, currentQuestionId: updatedCurrentQuestionId }
//     default:
//       return
//   }
// } 

export const ResultModal = ({
  open,
  onClose,
  onSwitch,
  questionResult: { isCorrect, correctAnswer, userAnswer }
}: props) => {
  const [switchActive, setSwitchActive] = useState(false)

  useEffect(() => {
    if (switchActive) {
      setSwitchActive(false)
    }
  }, [open])

  const handleSwitchChange = () => {
    const currentState = !switchActive

    setSwitchActive(currentState)
    onSwitch(currentState)
  }

  return (
    <Modal
      id='result-modal'
      open={open}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
      disableEnforceFocus
    >
      <Box sx={style}>
        <div id='header'>
          <Emoji emoji={getEmoji(isCorrect)} />
        </div>
        <div style={{ ...resultSummaryStatsStyle, marginTop: '20px' }}>
          <div style={smallerTextStyle}>
            Correct answer <b>{correctAnswer}</b>
          </div>
          <div style={isCorrect ? smallerTextStyle : smallerWarningTextStyle}>
            Your answer <b>{userAnswer}</b>
          </div>
        </div>
        {<FormControlLabel
          control={
            <Switch checked={switchActive} onChange={handleSwitchChange} />
          }
          label='Mark as correct'
        />}
        <div id='continue-button'>
          <Button variant='contained' onClick={onClose}>Continue</Button>
        </div>
      </Box>
    </Modal>
  )
}