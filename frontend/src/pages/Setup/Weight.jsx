import React, { useState } from 'react';
import { Typography, Button, Box, Slider, Input } from '@mui/material';
import SliderMetric from './Sliders/WeightSliderMetric'
import SliderImperial from './Sliders/WeightSliderImperial.jsx'

const Weight = ({selectedWeight, setSelectedWeight, handleNextPage}) => {
  const [currentSlider, setCurrentSlider] = useState(0);
  
  const handleWeightChange = (event, weight) => {
    setSelectedWeight(weight);
  };

  const handleInputChange = (event) => {
    setSelectedWeight(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleBlur = () => {
    if (selectedWeight < 20) {
      setSelectedWeight(20);
    } else if (selectedWeight > 500) {
      setSelectedWeight(500);
    }
  }

  const handleNextButtonClick = () => {
    if (selectedWeight) {
      handleNextPage();
    }
  };

  let sliderContent;
  switch (currentSlider) {
    case 0:
      sliderContent = (
        <SliderMetric />
      );
      break;
    case 1:
      sliderContent = (
        <SliderImperial />
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
        <Typography variant="body2" align="center" mb={2} style={{ margin: '0 auto 16px', maxWidth: '250px'}}>
          Tell us more about you so we can tailor the experience to suit your needs.
        </Typography>
      </Box>

      {/* #2 Container for sliders and inputs */}
      <Box style={{ display: 'flex', justifyContent: 'center', padding: '0 12vw' }}>
        <Slider
          value={selectedWeight}
          onChange={handleWeightChange}
          min={20}
          max={500}
          step={1}
          marks={[
            {value: 20, label: '20'},
            {value: 500, label: '500'},
          ]}
        >
        </Slider>
      </Box>
      <Box>
        <Input
          value={selectedWeight}
          onChange={handleInputChange}
          onBlur={handleBlur}
          type="number"
          inputProps={{
            min: 20,
            max: 500,
            step: 1,
          }}
        >
        </Input>
      </Box>

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