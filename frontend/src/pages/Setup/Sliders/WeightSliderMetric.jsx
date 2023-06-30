import React, { useState } from 'react'
import { Typography, Button, Box, Slider, Input } from '@mui/material';

const WeightSliderMetric = ({selectedWeight, setSelectedWeight, handleNextPage}) => {

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

  return (
    <Box>
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
            {value: 260, label: '260'}
          ]}
        />
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
        />
      </Box>
    </Box>
  )
}

export default WeightSliderMetric