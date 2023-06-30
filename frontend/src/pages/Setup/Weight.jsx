import React, { useState } from 'react';
import { Typography, Button, Box, Slider, Input } from '@mui/material';
import SliderMetric from './Sliders/WeightSliderMetric'
import SliderImperial from './Sliders/WeightSliderImperial.jsx'

const Weight = ({selectedWeight, setSelectedWeight, handleNextPage, handleWeightUnitToggle, currentWeightUnit}) => {

  const handleNextButtonClick = () => {
    if (selectedWeight) {
      handleNextPage();
    }
  };


  let sliderContent;
  switch (currentWeightUnit) {
    case 'metric':
      sliderContent = (
        <SliderMetric selectedWeight={selectedWeight} setSelectedWeight={setSelectedWeight} handleWeightUnitToggle={handleWeightUnitToggle}/>
      );
      break;
    case 'imperial':
      sliderContent = (
        <SliderImperial selectedWeight={selectedWeight} setSelectedWeight={setSelectedWeight} handleWeightUnitToggle={handleWeightUnitToggle}/>
      );
      break;
    default:
      sliderContent = null;
  };

  const weightButtonStyle = {
    width: '180px',
    padding: '25px',
    paddingBottom: '10px',
    display: 'flex',
    flexDirection: 'column',
    textTransform: 'none',
    color: 'black',
  }
  return (
    <Box>
      {/* #1 Container for text */}
      <Box style={{ padding: '0 10vw' }}>
        <Typography variant="h5" align="center" mb={2} fontWeight="bold" style={{ marginBottom: '5px' }}>
          Choose your weight
        </Typography>
        <Typography variant="body2" align="center" mb={2} style={{ margin: '0 auto 16px', maxWidth: '250px', color: '#696969'}}>
          Tell us more about you so we can tailor the experience to suit your needs.
        </Typography>
      </Box>

      {/* #2 Container for sliders and inputs */}
      {sliderContent}

      {/* #3 Container for 'next' button */}
      <Box style={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}>
        <Button
          style={{textTransform: 'none', minWidth: '15em',color: 'white'}}
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
  )
}

export default Weight