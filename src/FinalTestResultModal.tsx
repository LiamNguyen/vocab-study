import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import { QuestionResult } from './types';

const boxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: window.innerWidth - 50,
  minHeight: window.innerHeight - 50,
  bgcolor: 'background.paper',
  p: 4,
  borderRadius: 5,
  backgroundColor: '#073021',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
};

const resultContainerStyle = {
  maxHeight: '100%',
  overflow: 'auto',
  flex: '1 1 auto',
  height: 0
}

const resultCardItemStyle: any = {
  color: '#3eb489',
  width: '100%',
  height: '170px',
  marginBottom: '10px',
  backgroundColor: '#c1fbc5',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly'
}

const textStyle = {
  padding: '10px',
  fontSize: '25px'
}

const warningTextStyle = {
  ...textStyle,
  color: '#FF5F15'
}

const smallerTextStyle = {
  ...textStyle,
  padding: 0,
  paddingLeft: '10px',
  fontSize: '20px'
}

const smallerWarningTextStyle = {
  ...warningTextStyle,
  padding: 0,
  paddingLeft: '10px',
  fontSize: '20px'
}

const buttonContainerStyle: any = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  marginTop: '10px',
  height: '50px'
}

const buttonStyle = {
  backgroundColor: '#3eb489',
  borderRadius: '10px',
  height: '45px'
}

interface props {
  open: boolean,
  handleClose: () => void
  testSet: QuestionResult[]
}

export const FinalTestResultModal = ({ open, handleClose, testSet }: props) => (
  <Modal
    id='result-modal'
    open={open}
    aria-labelledby='modal-modal-title'
    aria-describedby='modal-modal-description'
    disableEnforceFocus
  >
    <Box sx={boxStyle}>
      <div style={resultContainerStyle}>
        <div style={resultCardItemStyle}>
          <span style={textStyle}>
            Correct: <b>{testSet.filter(i => i.isCorrect).length}</b>
          </span>
          <span style={warningTextStyle}>
            Incorrect: <b>{testSet.filter(i => !i.isCorrect).length}</b>
          </span>
        </div>
        {testSet.map(({ id, question, correctAnswer, userAnswer, isCorrect }) => (
          <div key={id} style={resultCardItemStyle}>
            <span style={smallerTextStyle}>Question: <b>{question}</b></span>
            <span style={smallerTextStyle}>Correct answer: <b>{correctAnswer}</b></span>
            <span style={isCorrect ? smallerTextStyle : smallerWarningTextStyle}>
              Your answer: <b>{userAnswer}</b>
            </span>
          </div>
        ))}
      </div>
      <div style={buttonContainerStyle}>
        <Button style={buttonStyle} variant='contained' onClick={handleClose}>
          Start new test
        </Button>
      </div>
    </Box>
  </Modal>
)