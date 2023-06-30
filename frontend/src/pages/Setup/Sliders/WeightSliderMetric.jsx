import React from 'react'
import { Typography, Button, Link, Box, Slider, Input } from '@mui/material';

const WeightSliderMetric = ({selectedWeight, setSelectedWeight, handleWeightUnitToggle}) => {


  const handleWeightChange = (event, weight) => {
    setSelectedWeight(weight);
  };

  const handleInputChange = (event) => {
    setSelectedWeight(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleBlur = () => {
    if (selectedWeight < 9) {
      setSelectedWeight(9);
    } else if (selectedWeight > 227) {
      setSelectedWeight(227);
    }
  }

  return (
    <Box style={{marginTop:'5vh'}}>

      <Box style={{ display: 'flex', justifyContent: 'center', padding: '0 12vw' }}>
        <Slider
          value={selectedWeight}
          onChange={handleWeightChange}
          min={9}
          max={227}
          step={0.1}
          marks={[
            {value: 9, label: '9'},
            {value: 227, label: '227'},
          ]}
        />
      </Box>

      <Box style={{ display: 'flex', justifyContent: 'center', marginLeft: '35px'}}>
        <Input
          style={{ width:'11em', backgroundColor:'#F5F5F5' }}
          value={selectedWeight}
          onChange={handleInputChange}
          onBlur={handleBlur}
          type="number"
          inputProps={{
            min: 9,
            max: 227,
            step: 0.1,
            style: {
              textAlign: 'center',
              fontSize: '22px',
              fontWeight: 'bold',
              paddingLeft: '8px',
            }
          }}
        />
        <h3 style={{ display:'flex',flexDirection:'column',justifyContent:'center', marginLeft:'10px'}}>
          kg
        </h3>
      </Box>

      <Box style={{display:'flex',justifyContent:'center',marginTop:'5px'}}>
        <Link
          style={{fontSize:'0.7rem'}}
          component="button"
          variant="body2"
          onClick={handleWeightUnitToggle}
        >
          Switch to lbs
        </Link>
      </Box>

    </Box>
  )
}

export default WeightSliderMetric