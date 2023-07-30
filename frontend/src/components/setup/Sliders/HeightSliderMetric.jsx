import React from 'react'
import { Link, Box, Slider, Input } from '@mui/material';

const HeightSliderMetric = ({ selectedHeight, setSelectedHeight, handleHeightUnitToggle }) => {


  const handleHeightChange = (event, Height) => {
    setSelectedHeight(Height);
  };

  const handleInputChange = (event) => {
    setSelectedHeight(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleBlur = () => {
    if (selectedHeight < 9) {
      setSelectedHeight(9);
    } else if (selectedHeight > 227) {
      setSelectedHeight(227);
    }
  }

  return (
    <Box style={{ marginTop: '5vh' }}>

      <Box style={{ display: 'flex', justifyContent: 'center', padding: '0 12vw' }}>
        <Slider
          value={selectedHeight}
          onChange={handleHeightChange}
          min={9}
          max={227}
          step={1}
          marks={[
            { value: 9, label: '9' },
            { value: 227, label: '227' },
          ]}
        />
      </Box>

      <Box style={{ display: 'flex', justifyContent: 'center', marginLeft: '28px' }}>
        <Input
          style={{ width: '11em', backgroundColor: '#F5F5F5' }}
          value={selectedHeight}
          onChange={handleInputChange}
          onBlur={handleBlur}
          type="number"
          inputProps={{
            min: 9,
            max: 227,
            step: 1,
            style: {
              textAlign: 'center',
              fontSize: '22px',
              fontWeight: 'bold',
              paddingLeft: '1vw',
            }
          }}
        />
        <h3 style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginLeft: '10px' }}>
          cm
        </h3>
      </Box>

      <Box style={{ display: 'flex', justifyContent: 'center', marginTop: '5px' }}>
        <Link
          style={{ fontSize: '0.7rem' }}
          component="button"
          variant="body2"
          onClick={handleHeightUnitToggle}
        >
        </Link>
      </Box>

    </Box>
  )
}

export default HeightSliderMetric