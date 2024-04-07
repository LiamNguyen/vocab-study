import { useState } from 'react';
import { Button, OutlinedInput } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';

import { KAPPALE_LIST, MAX_QUESTION_DEFAULT } from './constants';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 300,
  bgcolor: 'background.paper',
  p: 4,
  borderRadius: 5,
  backgroundColor: '#cdffd0',
  color: '#3eb489',

};

const headerStyle: any = {
  display: 'flex',
  justifyContent: 'flex-start',
  fontSize: '20px',
  fontWeight: 'bold'
}

const containerStyle: any = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '20px'
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const noOfQuestionOptions = [1, 5, 10, 20, 50, 100, 150, 200, 250, 300, 350, 400];

interface props {
  open: boolean
  onClose: (noOfQuestion: number, kappale: number[]) => any
}

export const TestDesignModal = ({
  open,
  onClose,
}: props) => {
  const [noOfQuestion, setNoOfQuestion] = useState(MAX_QUESTION_DEFAULT)
  const [kappale, setKappale] = useState<number[]>([]);

  const handleKappaleChange = (event: SelectChangeEvent<typeof kappale>) => {
    const {
      target: { value },
    } = event;

    setKappale(value as number[]);
  };

  const handleNoOfQuestionChange = (e: any) => {
    setNoOfQuestion(e.target.value);
  };

  const handleClose = () => {
    onClose(noOfQuestion, kappale)
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
        <div style={headerStyle}>
          Design your test
        </div>
        <div style={containerStyle}>
          Number of questions
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={noOfQuestion}
            label="Age"
            onChange={handleNoOfQuestionChange}
          >
            {noOfQuestionOptions.map(option => (
              <MenuItem key={option} value={option}>{option}</MenuItem>
            ))}
          </Select>
        </div>
        <div style={containerStyle}>
          Kappale
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={kappale}
            onChange={handleKappaleChange}
            input={<OutlinedInput label="Tag" />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {KAPPALE_LIST.map(({ id, kappale: kappaleName }) => (
              <MenuItem key={id} value={id}>
                <Checkbox checked={kappale.includes(id)} />
                <ListItemText primary={kappaleName} />
              </MenuItem>
            )
            )}
          </Select>
        </div>
        <div id='continue-button'>
          <Button variant='contained' onClick={handleClose}>Save</Button>
        </div>
      </Box>
    </Modal>
  )
}