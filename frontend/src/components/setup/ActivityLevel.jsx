import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import { NextButtonContainerStyle, NextButtonStyle, SelectionButtonStyle } from '../../pages/SetupPages/SetupStyles';

const ActivityLevel = ({ selectedActivityLevel, setSelectedActivityLevel, handleNextPage }) => {
  const handleActivityLevelSelection = (activitylevel) => {
    setSelectedActivityLevel(activitylevel);
  };

  const handleNextButtonClick = () => {
    if (selectedActivityLevel) {
      handleNextPage();
    };
  };

  return (
    <>
      <Box>
        <Box style={{ paddingLeft: '10vw', paddingRight: '10vw' }}>
          {/* Container for text */}
          <Typography variant="h5" align="center" mb={2} fontWeight="bold" style={{ marginBottom: '5px' }}>
            Choose your activity level
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
              borderColor: selectedActivityLevel === 'sedentary' ? '#4169e1' : '#ebebeb',
              boxShadow: selectedActivityLevel === 'sedentary' ? '0px 0px 10px #4169e1' : 'none',
              mr: 1,
            }}
            onClick={() => handleActivityLevelSelection('sedentary')}
          >
            <Typography variant="h7">
              Sedentary
            </Typography>
          </Button>


          <Button
            style={SelectionButtonStyle}
            sx={{
              border: '2px solid',
              borderColor: selectedActivityLevel === 'light' ? '#4169e1' : '#ebebeb',
              boxShadow: selectedActivityLevel === 'light' ? '0px 0px 10px #4169e1' : 'none',
              mr: 1,
            }}
            onClick={() => handleActivityLevelSelection('light')}
          >
            <Typography variant="h7">
              Light Activity
            </Typography>
          </Button>


          <Button
            style={SelectionButtonStyle}
            sx={{
              border: '2px solid',
              borderColor: selectedActivityLevel === 'moderate' ? '#4169e1' : '#ebebeb',
              boxShadow: selectedActivityLevel === 'moderate' ? '0px 0px 10px #4169e1' : 'none',
              mr: 1,
            }}
            onClick={() => handleActivityLevelSelection('moderate')}
          >
            <Typography variant="h7">
              Moderate Activity
            </Typography>
          </Button>


          <Button
            style={SelectionButtonStyle}
            sx={{
              border: '2px solid',
              borderColor: selectedActivityLevel === 'heavy' ? '#4169e1' : '#ebebeb',
              boxShadow: selectedActivityLevel === 'heavy' ? '0px 0px 10px #4169e1' : 'none',
              mr: 1,
            }}
            onClick={() => handleActivityLevelSelection('heavy')}
          >
            <Typography variant="h7">
              Heavy Activity
            </Typography>
          </Button>


        </Box>
        <Box style={NextButtonContainerStyle}>
          {/* Container for next button */}
          <Button style={NextButtonStyle} sx={{ backgroundColor: selectedActivityLevel ? '#4169e1' : '#D3D3D3', mt: 2 }}
            onClick={handleNextButtonClick}
            disabled={!selectedActivityLevel}
          >
            Next
          </Button>
        </Box>
      </Box>
    </>
  )
}

export default ActivityLevel