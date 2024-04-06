import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Emoji from 'react-emojis';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import { QuestionResult } from './types';
import { resultSummaryStatsStyle, smallerTextStyle, smallerWarningTextStyle } from './ResultSummaryCard';
import { useState } from 'react';

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

interface props {
  open: boolean,
  onClose: () => void
  questionResult: QuestionResult
}

const getEmoji = (isCorrect: boolean): string =>
  isCorrect ? 'partying-face' : 'upside-down-face'


export const ResultModal = ({
  open,
  onClose,
  questionResult: { isCorrect, correctAnswer, userAnswer }
}: props) => {
  const [switchState, setSwitchState] = useState(false)

  const handleSwitchChange = () => {
    setSwitchState(!switchState)
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
        {/* <FormControlLabel control={<Switch />} label='Mark as correct' onChange={handleSwitchChange} /> */}
        <div id='continue-button'>
          <Button variant='contained' onClick={onClose}>Continue</Button>
        </div>
      </Box>
    </Modal>
  )
}