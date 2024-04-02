import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Emoji from 'react-emojis';
import { Question } from './types';

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
  handleClose: () => void
  question: Question
}

const getEmoji = (isCorrect: boolean): string =>
  isCorrect ? 'partying-face' : 'upside-down-face'


export const ResultModal = ({ open, handleClose, question }: props) => (
  <Modal
    id='result-modal'
    open={open}
    aria-labelledby='modal-modal-title'
    aria-describedby='modal-modal-description'
    disableEnforceFocus
  >
    <Box sx={style}>
      <div id='header'>
        <Emoji emoji={getEmoji(question.isCorrect)} />
      </div>
      <div id='continue-button'>
        <Button variant='contained' onClick={handleClose}>Continue</Button>
      </div>
    </Box>
  </Modal>
)