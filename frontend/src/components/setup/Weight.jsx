import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import SliderMetric from '../../components/setup/Sliders/WeightSliderMetric';
import SliderImperial from '../../components/setup/Sliders/WeightSliderImperial.jsx';
import { NextButtonStyle, NextButtonContainerStyle } from '../../pages/SetupPages/SetupStyles';

const Weight = ({ selectedWeight, setSelectedWeight, handleNextPage, handleWeightUnitToggle, currentWeightUnit }) => {

  const handleNextButtonClick = () => {
    if (selectedWeight) {
      handleNextPage();
    }
  };



  let sliderContent;
  switch (currentWeightUnit) {
    case 'metric':
      sliderContent = (
        <SliderMetric selectedWeight={selectedWeight} setSelectedWeight={setSelectedWeight} handleWeightUnitToggle={handleWeightUnitToggle} />
      );
      break;
    case 'imperial':
      sliderContent = (
        <SliderImperial selectedWeight={selectedWeight} setSelectedWeight={setSelectedWeight} handleWeightUnitToggle={handleWeightUnitToggle} />
      );
      break;
    default:
      sliderContent = null;
  };

  return (
    <>
      <Box>
        {/* #1 Container for text */}
        <Box style={{ padding: '0 10vw' }}>
          <Typography variant="h5" align="center" mb={2} fontWeight="bold" style={{ marginBottom: '5px' }}>
            Choose your weight
          </Typography>
          <Typography color="lightText.main" variant="body2" align="center" mb={2} style={{ margin: '0 auto 16px', maxWidth: '250px' }}>
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
              backgroundColor: selectedWeight ? '#4169e1' : '#D3D3D3',
              mt: 2
            }}
            onClick={handleNextButtonClick}
            disabled={!selectedWeight}
          >
            Next
          </Button>
        </Box>
      </Box>
    </>
  )
}

export default Weight