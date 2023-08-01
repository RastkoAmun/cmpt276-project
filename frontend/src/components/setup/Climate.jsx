import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import { NextButtonContainerStyle, NextButtonStyle, SelectionButtonStyle } from '../../pages/SetupPages/SetupStyles';

const Climate = ({ selectedClimate, setSelectedClimate, handleNextPage }) => {
  const handleClimateSelection = (climate) => {
    setSelectedClimate(climate);
  };

  const handleNextButtonClick = () => {
    if (selectedClimate) {
      handleNextPage();
    };
  };

  return (
    <>
      <Box>
        <Box style={{ paddingLeft: '10vw', paddingRight: '10vw' }}>
          {/* Container for text */}
          <Typography variant="h5" align="center" mb={2} fontWeight="bold" style={{ marginBottom: '5px' }}>
            Choose your climate
          </Typography>
          <Typography color="lightText.main" variant="body2" align="center" mb={2} style={{ margin: '0 auto 16px', maxWidth: '250px' }}>
            Tell us more about you so we can tailor the experience to suit your needs.
          </Typography>
        </Box>
        <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>


          <Button
            style={SelectionButtonStyle}
            sx={{
              border: '2px solid',
              borderColor: selectedClimate === 'hot' ? '#4169e1' : '#ebebeb',
              boxShadow: selectedClimate === 'hot' ? '0px 0px 10px #4169e1' : 'none',
              mr: 1,
            }}
            onClick={() => handleClimateSelection('hot')}
          >
            <Typography variant="h7">
              Hot
            </Typography>
          </Button>


          <Button
            style={SelectionButtonStyle}
            sx={{
              border: '2px solid',
              borderColor: selectedClimate === 'temperate' ? '#4169e1' : '#ebebeb',
              boxShadow: selectedClimate === 'temperate' ? '0px 0px 10px #4169e1' : 'none',
              mr: 1,
            }}
            onClick={() => handleClimateSelection('temperate')}
          >
            <Typography variant="h7">
              Temperate
            </Typography>
          </Button>


          <Button
            style={SelectionButtonStyle}
            sx={{
              border: '2px solid',
              borderColor: selectedClimate === 'cold' ? '#4169e1' : '#ebebeb',
              boxShadow: selectedClimate === 'cold' ? '0px 0px 10px #4169e1' : 'none',
              mr: 1,
            }}
            onClick={() => handleClimateSelection('cold')}
          >
            <Typography variant="h7">
              Cold
            </Typography>
          </Button>

        </Box>
        <Box style={NextButtonContainerStyle}>
          {/* Container for next button */}
          <Button style={NextButtonStyle} sx={{ backgroundColor: selectedClimate ? '#4169e1' : '#D3D3D3', mt: 2 }}
            onClick={handleNextButtonClick}
            disabled={!selectedClimate}
          >
            Next
          </Button>
        </Box>
      </Box>
    </>

  )
}

export default Climate