import React from 'react';
import { Typography, Button, Box } from '@mui/material';

const Height = ({selectedHeight, setSelectedHeight, handleNextPage}) => {
  const handleHeightSelection = (height) => {
    setSelectedHeight(height);
  };

  const handleNextButtonClick = () => {
    if (selectedHeight) {
      handleNextPage();
    }
  };

  const heightButtonStyle = {
    width: '180px',
    padding: '25px',
    paddingBottom: '10px',
    display: 'flex',
    flexDirection: 'column',
    textTransform: 'none',
    color: 'black',
  }
  return (
    <box>
      <Box style={{ paddingLeft: '10vw', paddingRight: '10vw' }}>
      {/* Container for text */}
        <Typography variant="h5" align="center" mb={2} fontWeight="bold" style={{ marginBottom: '5px' }}>
          Choose your gender
        </Typography>
        <Typography variant="body2" align="center" mb={2} style={{ margin: '0 auto 16px', maxWidth: '250px'}}>
          Tell us more about you so we can tailor the experience to suit your needs.
        </Typography>
      </Box>
    </box>
  )
}

export default Height