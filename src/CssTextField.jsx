import { TextField } from "@mui/material";
import { withStyles } from "@mui/styles";

export const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: '#3eb489',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#3eb489',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#3eb489',
      },
      '&:hover fieldset': {
        borderColor: '#3eb489',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#3eb489',
      },
    },
  }
})(TextField)