import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import { NextButtonContainerStyle, NextButtonStyle, SelectionButtonStyle } from '../../pages/SetupPages/SetupStyles';
import { ThemeProvider } from '@emotion/react';
import lightTheme from '../../utils/lightTheme';
import Slider from './Sliders/AgeSlider';

const Age = ({selectedAge, setSelectedAge, handleNextPage}) => {

  const handleNextButtonClick = () => {
    if (selectedAge) {
      handleNextPage();
    };
  };

  let sliderContent = (
    <Slider selectedAge={selectedAge} setSelectedAge={setSelectedAge} />
  )

  return (
  <ThemeProvider theme={lightTheme}>
    <Box>
      <Box style={{ paddingLeft: '10vw', paddingRight: '10vw' }}>
      {/* Container for text */}
        <Typography variant="h5" align="center" mb={2} fontWeight="bold" style={{ marginBottom: '5px' }}>
          Choose your age
        </Typography>
        <Typography color="lightText.main" variant="body2" align="center" mb={2} style={{ margin: '0 auto 16px', maxWidth: '250px'}}>
          Tell us more about you so we can tailor the experience to suit your needs.
        </Typography>
      </Box>

      {sliderContent}

      <Box style={NextButtonContainerStyle}>
        {/* Container for next button */}
          <Button style={NextButtonStyle} sx={{backgroundColor: selectedAge ? '#4169e1' : '#D3D3D3', mt: 2}}
          onClick={handleNextButtonClick}
          disabled={!selectedAge}
          >
            Next
          </Button>
      </Box>
    </Box>
  </ThemeProvider>
  )
}

export default Age