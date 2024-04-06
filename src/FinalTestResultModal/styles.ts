export const boxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: window.innerWidth - 50,
  minHeight: window.innerHeight - 50,
  bgcolor: 'background.paper',
  p: 4,
  borderRadius: 5,
  backgroundColor: '#3eb489',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
};

export const resultContainerStyle = {
  maxHeight: '100%',
  overflow: 'auto',
  flex: '1 1 auto',
  height: 0
}

export const resultCardItemStyle: any = {
  color: '#3eb489',
  width: '100%',
  height: '170px',
  marginBottom: '10px',
  backgroundColor: '#c1fbc5',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly'
}

export const buttonContainerStyle: any = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  marginTop: '10px',
  height: '50px'
}

export const buttonStyle = {
  color: '#3eb489',
  fontWeight: 'bold',
  backgroundColor: '#b6ffbb',
  borderRadius: '10px',
  height: '45px'
}
