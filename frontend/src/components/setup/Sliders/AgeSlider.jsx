import React from 'react'
import { Box, Slider, Input } from '@mui/material';
import { InputContainerStyle } from '../../../pages/SetupPages/SetupStyles';

const AgeSlider = ({ selectedAge, setSelectedAge }) => {

  const handleAgeChange = (event, age) => {
    setSelectedAge(age);
  };

  const handleInputChange = (event) => {
    setSelectedAge(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleBlur = () => {
    if (selectedAge < 1) {
      setSelectedAge(1);
    } else if (selectedAge > 125) {
      setSelectedAge(125);
    }
  }

  return (
    <Box style={{ marginTop: '5vh' }}>

      <Box style={{ display: 'flex', justifyContent: 'center', padding: '0 12vw' }}>
        <Slider
          value={selectedAge}
          onChange={handleAgeChange}
          min={0}
          max={125}
          step={1}
          marks={[
            { value: 1, label: '1' },
            { value: 125, label: '125' },
          ]}
        />
      </Box>

      <Box style={InputContainerStyle} sx={{ marginLeft: '0' }}>
        <Input
          style={{ width: '11em', backgroundColor: '#F5F5F5' }}
          value={selectedAge}
          onChange={handleInputChange}
          onBlur={handleBlur}
          type="number"
          inputProps={{
            min: 1,
            max: 125,
            step: 1,
            style: {
              textAlign: 'center',
              fontSize: '22px',
              fontWeight: 'bold',
            }
          }}
        />
        <h3 style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginLeft: '10px' }}>
          years
        </h3>
      </Box>
    </Box>
  )
}

export default AgeSlider