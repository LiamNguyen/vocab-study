import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';


import { QuestionResult } from '../types';
import { boxStyle, buttonContainerStyle, buttonStyle, resultCardItemStyle, resultContainerStyle } from './styles';
import { ResultSummaryCard, smallerTextStyle, smallerWarningTextStyle } from '../ResultSummaryCard';

interface props {
  open: boolean
  onClose: () => void
  testSet: QuestionResult[]
  showCloseButton?: boolean
}

export const FinalTestResultModal = ({ open, onClose, testSet, showCloseButton = false }: props) => (
  <Modal
    id='result-modal'
    open={open}
    aria-labelledby='modal-modal-title'
    aria-describedby='modal-modal-description'
    disableEnforceFocus
    closeAfterTransition
  >
    <Box sx={boxStyle}>
      {testSet ? <div style={resultContainerStyle}>
        <ResultSummaryCard testSet={testSet} />
        {testSet.map(({ id, question, correctAnswer, userAnswer, isCorrect }) => (
          <div key={id} style={resultCardItemStyle}>
            <div style={smallerTextStyle}>
              Question <b>{question}</b>
            </div>
            <div style={smallerTextStyle}>
              Correct answer <b>{correctAnswer}</b>
            </div>
            <div style={isCorrect ? smallerTextStyle : smallerWarningTextStyle}>
              Your answer <b>{userAnswer}</b>
            </div>
          </div>
        ))}
      </div> : <div />}
      <div style={buttonContainerStyle}>
        <Button style={buttonStyle} variant='contained' onClick={onClose}>
          {showCloseButton ? 'Close' : 'Start new test'}
        </Button>
      </div>
    </Box>
  </Modal>
)