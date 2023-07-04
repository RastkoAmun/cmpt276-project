import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import { NextButtonContainerStyle, NextButtonStyle, SelectionButtonStyle } from './SetupStyles';

const ActivityLevel = ({selectedActivityLevel, setSelectedActivityLevel, handleNextPage}) => {
  const handleActivityLevelSelection = (activitylevel) => {
    setSelectedActivityLevel(activitylevel);
  };

  const handleNextButtonClick = () => {
    if (selectedActivityLevel) {
      handleNextPage();
    };
  };

  return (
    <Box>
      <Box style={{ paddingLeft: '10vw', paddingRight: '10vw' }}>
      {/* Container for text */}
        <Typography variant="h5" align="center" mb={2} fontWeight="bold" style={{ marginBottom: '5px' }}>
          Choose your activity level
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
          borderColor: selectedActivityLevel === 'sedentary' ? '#4169e1' : '#ebebeb',
          boxShadow: selectedActivityLevel === 'sedentary' ? '0px 0px 10px #4169e1' : 'none',
          mr: 1,
        }}
        onClick={() => handleActivityLevelSelection('sedentary')}
        >
          <h3 style={{fontSize: '20px'}}>
            Sedentary
          </h3>
        </Button>


        <Button
        style = {SelectionButtonStyle}
        sx={{
          border: '2px solid',
          borderColor: selectedActivityLevel === 'light' ? '#4169e1' : '#ebebeb',
          boxShadow: selectedActivityLevel === 'light' ? '0px 0px 10px #4169e1' : 'none',
          mr: 1,
        }}
        onClick={() => handleActivityLevelSelection('light')}
        >
          <h3 style={{fontSize: '20px'}}>
            Light Activity
          </h3>
        </Button>


        <Button
        style = {SelectionButtonStyle}
        sx={{
          border: '2px solid',
          borderColor: selectedActivityLevel === 'moderate' ? '#4169e1' : '#ebebeb',
          boxShadow: selectedActivityLevel === 'moderate' ? '0px 0px 10px #4169e1' : 'none',
          mr: 1,
        }}
        onClick={() => handleActivityLevelSelection('moderate')}
        >
          <h3 style={{fontSize: '20px'}}>
            Moderate Activity
          </h3>
        </Button>


        <Button
        style = {SelectionButtonStyle}
        sx={{
          border: '2px solid',
          borderColor: selectedActivityLevel === 'heavy' ? '#4169e1' : '#ebebeb',
          boxShadow: selectedActivityLevel === 'heavy' ? '0px 0px 10px #4169e1' : 'none',
          mr: 1,
        }}
        onClick={() => handleActivityLevelSelection('heavy')}
        >
          <h3 style={{fontSize: '20px'}}>
            Heavy Activity
          </h3>
        </Button>


      </Box>
      <Box style={NextButtonContainerStyle}>
        {/* Container for next button */}
          <Button style={NextButtonStyle} sx={{backgroundColor: selectedActivityLevel ? '#4169e1' : '#D3D3D3', mt: 2}}
          onClick={handleNextButtonClick}
          disabled={!selectedActivityLevel}
          >
            Next
          </Button>
      </Box>
    </Box>

  )
}

export default ActivityLevel