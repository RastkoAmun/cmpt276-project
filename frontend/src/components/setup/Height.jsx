import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import SliderMetric from '../../components/setup/Sliders/HeightSliderMetric';
import SliderImperial from '../../components/setup/Sliders/HeightSliderImperial';
import { NextButtonStyle, NextButtonContainerStyle} from '../../pages/SetupPages/SetupStyles';

const Height = ({selectedHeight, setSelectedHeight, handleNextPage, handleHeightUnitToggle, currentHeightUnit}) => {

  const handleNextButtonClick = () => {
    if (selectedHeight) {
      handleNextPage();
    }
  };
  


  let sliderContent;
  switch (currentHeightUnit) {
    case 'metric':
      sliderContent = (
        <SliderMetric selectedHeight={selectedHeight} setSelectedHeight={setSelectedHeight} handleHeightUnitToggle={handleHeightUnitToggle}/>
      );
      break;
    case 'imperial':
      sliderContent = (
        <SliderImperial selectedHeight={selectedHeight} setSelectedHeight={setSelectedHeight} handleHeightUnitToggle={handleHeightUnitToggle}/>
      );
      break;
    default:
      sliderContent = null;
  };

  return (
    <Box>
      {/* #1 Container for text */}
      <Box style={{ padding: '0 10vw' }}>
        <Typography variant="h5" align="center" mb={2} fontWeight="bold" style={{ marginBottom: '5px' }}>
          Choose your height
        </Typography>
        <Typography variant="body2" align="center" mb={2} style={{ margin: '0 auto 16px', maxWidth: '250px', color: '#696969'}}>
          Tell us more about you so we can tailor the experience to suit your needs.
        </Typography>
      </Box>

      {/* #2 Container for sliders and inputs */}
      {sliderContent}

      {/* #3 Container for 'next' button */}
      <Box style={NextButtonContainerStyle}>
        <Button
          style={NextButtonStyle}
          sx={{
            backgroundColor: selectedHeight ? '#4169e1' : '#D3D3D3',
            mt: 2
          }}
          onClick={handleNextButtonClick}
          disabled={!selectedHeight}
        >
          Next
        </Button>
      </Box>
    </Box>
  )
}

export default Height