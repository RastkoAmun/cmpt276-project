import React from 'react'
import { Link, Box, Slider, Input } from '@mui/material';

const AgeSlider = ({selectedAge, setSelectedAge}) => {


  const handleAgeChange = (event, age) => {
    setSelectedAge(age);
  };

  const handleInputChange = (event) => {
    setSelectedAge(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleBlur = () => {
    if (selectedAge < 13) {
      setSelectedAge(13);
    } else if (selectedAge > 120) {
      setSelectedAge(120);
    }
  }

  return (
    <Box style={{marginTop:'5vh'}}>

      <Box style={{ display: 'flex', justifyContent: 'center', padding: '0 12vw' }}>
        <Slider
          value={selectedAge}
          onChange={handleAgeChange}
          min={13}
          max={120}
          step={1}
          marks={[
            {value: 13, label: '13'},
            {value: 120, label: '120'},
          ]}
        />
      </Box>

      <Box style={{ display: 'flex', justifyContent: 'center', marginLeft: '40px'}}>
        <Input
          style={{ width:'10vw', backgroundColor:'#F5F5F5' }}
          value={selectedAge}
          onChange={handleInputChange}
          onBlur={handleBlur}
          type="number"
          inputProps={{
            min: 13,
            max: 120,
            step: 1,
            style: {
              textAlign: 'center',
              fontSize: '22px',
              fontWeight: 'bold',
              paddingLeft: '5px'
            }
          }}
        />
        <h3 style={{display:'flex',flexDirection:'column',justifyContent:'center', marginLeft:'10px'}}>
          yrs
        </h3>
      </Box>



    </Box>
  )
}

export default AgeSlider