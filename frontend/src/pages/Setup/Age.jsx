import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import { NextButtonContainerStyle, NextButtonStyle, SelectionButtonStyle } from './SetupStyles';

const Age = ({selectedAge, setSelectedAge, handleNextPage}) => {
  const handleAgeSelection = (age) => {
    setSelectedAge(age);
  };

  const handleNextButtonClick = () => {
    if (selectedAge) {
      handleNextPage();
    };
  };

  return (
    <Box>
      <Box style={{ paddingLeft: '10vw', paddingRight: '10vw' }}>
      {/* Container for text */}
        <Typography variant="h5" align="center" mb={2} fontWeight="bold" style={{ marginBottom: '5px' }}>
          Choose your age group
        </Typography>
        <Typography variant="body2" align="center" mb={2} style={{ margin: '0 auto 16px', maxWidth: '250px'}}>
          Tell us more about you so we can tailor the experience to suit your needs.
        </Typography>
      </Box>
      <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Button 
        style = {SelectionButtonStyle}
        sx={{
          border: '2px solid',
          borderColor: selectedAge === 'child' ? '#4169e1' : '#ebebeb',
          boxShadow: selectedAge === 'child' ? '0px 0px 10px #4169e1' : 'none',
          mr: 1,
        }}
        onClick={() => handleAgeSelection('child')}
        >
          <h3 style={{fontSize: '20px'}}>
            4-11
          </h3>
        </Button>
        <Button
        style = {SelectionButtonStyle}
        sx={{
          border: '2px solid',
          borderColor: selectedAge === 'teenager' ? '#4169e1' : '#ebebeb',
          boxShadow: selectedAge === 'teenager' ? '0px 0px 10px #4169e1' : 'none',
          mr: 1,
        }}
        onClick={() => handleAgeSelection('teenager')}
        >
          <h3 style={{fontSize: '20px'}}>
            12-18
          </h3>
        </Button>
        <Button
        style = {SelectionButtonStyle}
        sx={{
          border: '2px solid',
          borderColor: selectedAge === 'earlyadult' ? '#4169e1' : '#ebebeb',
          boxShadow: selectedAge === 'earlyadult' ? '0px 0px 10px #4169e1' : 'none',
          mr: 1,
        }}
        onClick={() => handleAgeSelection('earlyadult')}
        >
          <h3 style={{fontSize: '20px'}}>
            19-29
          </h3>
        </Button>
        <Button
        style = {SelectionButtonStyle}
        sx={{
          border: '2px solid',
          borderColor: selectedAge === 'lateadult' ? '#4169e1' : '#ebebeb',
          boxShadow: selectedAge === 'lateadult' ? '0px 0px 10px #4169e1' : 'none',
          mr: 1,
        }}
        onClick={() => handleAgeSelection('lateadult')}
        >
          <h3 style={{fontSize: '20px'}}>
            30-49
          </h3>
        </Button>
        <Button
        style = {SelectionButtonStyle}
        sx={{
          border: '2px solid',
          borderColor: selectedAge === 'elder' ? '#4169e1' : '#ebebeb',
          boxShadow: selectedAge === 'elder' ? '0px 0px 10px #4169e1' : 'none',
          mr: 1,
        }}
        onClick={() => handleAgeSelection('elder')}
        >
          <h3 style={{fontSize: '20px'}}>
            50+
          </h3>
        </Button>
      </Box>
      <Box style={NextButtonContainerStyle}>
        {/* Container for next button */}
          <Button style={NextButtonStyle} sx={{backgroundColor: selectedAge ? '#4169e1' : '#D3D3D3', mt: 2}}
          onClick={handleNextButtonClick}
          disabled={!selectedAge}
          >
            Next
          </Button>
      </Box>
    </Box>

  )
}

export default Age