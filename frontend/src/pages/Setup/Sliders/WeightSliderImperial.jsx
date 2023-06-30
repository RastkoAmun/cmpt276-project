import React from 'react'
import { Typography, Button, Link, Box, Slider, Input } from '@mui/material';

const WeightSliderImperial = ({selectedWeight, setSelectedWeight, handleWeightUnitToggle}) => {


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
    <Box style={{marginTop:'5vh'}}>

      <Box style={{ display: 'flex', justifyContent: 'center', padding: '0 12vw' }}>
        <Slider
          value={selectedWeight}
          onChange={handleWeightChange}
          min={20}
          max={500}
          step={0.1}
          marks={[
            {value: 20, label: '20'},
            {value: 500, label: '500'},
          ]}
        />
      </Box>

      <Box style={{ display: 'flex', justifyContent: 'center', marginLeft: '35px'}}>
        <Input
          style={{ width:'10vw', backgroundColor:'#F5F5F5' }}
          value={selectedWeight}
          onChange={handleInputChange}
          onBlur={handleBlur}
          type="number"
          inputProps={{
            min: 20,
            max: 500,
            step: 0.1,
            style: {
              textAlign: 'center',
              fontSize: '22px',
              fontWeight: 'bold',
            }
          }}
        />
        <h3 style={{display:'flex',flexDirection:'column',justifyContent:'center', marginLeft:'10px'}}>
          lbs
        </h3>
      </Box>

      <Box style={{display:'flex',justifyContent:'center',marginTop:'5px'}}>
        <Link
          style={{fontSize:'0.7rem'}}
          component="button"
          variant="body2"
          onClick={handleWeightUnitToggle}
        >
          Switch to kg
        </Link>
      </Box>

    </Box>
  )
}

export default WeightSliderImperial