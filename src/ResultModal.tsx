import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Emoji from 'react-emojis';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import { QuestionResult } from './types';
import { resultSummaryStatsStyle, smallerTextStyle, smallerWarningTextStyle } from './ResultSummaryCard';
import { useEffect, useReducer, useState } from 'react';

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

interface ResultModalState {
  originalResult: { isCorrect: boolean }
}

const UPDATE_ORIGINAL_RESULT = 'UPDATE_ORIGINAL_RESULT'

const reducer = (state: ResultModalState, action: any) => {
  switch (action.type) {
    case UPDATE_ORIGINAL_RESULT:
      const { originalResult: { isCorrect } } = action

      return { ...state, originalResult: { isCorrect } }
    default:
      return
  }
}

export const ResultModal = ({
  open,
  onClose,
  onSwitch,
  questionResult: { isCorrect, correctAnswer, userAnswer }
}: props) => {
  const [state, dispatch] = useReducer(reducer, { originalResult: { isCorrect: false } })
  const [switchActive, setSwitchActive] = useState(false)

  const dispatchUpdateOriginalResult = (originalResult: { isCorrect: boolean }) => {
    dispatch({ type: UPDATE_ORIGINAL_RESULT, originalResult })
  }

  useEffect(() => {
    if (switchActive) {
      setSwitchActive(false)
    }
    if (open) {
      dispatchUpdateOriginalResult({ isCorrect })
    }
    // eslint-disable-next-line
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
        {!state.originalResult.isCorrect && <FormControlLabel
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