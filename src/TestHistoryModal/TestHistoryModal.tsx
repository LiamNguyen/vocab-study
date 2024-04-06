import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';


import { boxStyle, buttonContainerStyle, buttonStyle, resultContainerStyle } from './styles';
import { ResultSummaryCard } from '../ResultSummaryCard';
import { fetchTestHistory } from '../utils';

interface props {
  open: boolean,
  handleClose: () => void
}

export const TestHistoryModal = ({ open, handleClose }: props) => {
  const testHistory = fetchTestHistory()

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
          {testHistory.map(({ testResult }) => (
            <ResultSummaryCard testSet={testResult} />
          ))}
        </div>
        <div style={buttonContainerStyle}>
          <Button style={buttonStyle} variant='contained' onClick={handleClose}>
            Close
          </Button>
        </div>
      </Box>
    </Modal>
  )
}