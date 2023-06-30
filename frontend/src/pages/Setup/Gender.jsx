import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import ManIcon from '../../images/man-thinking-svgrepo-com.svg';
import WomanIcon from '../../images/woman-with-hand-on-chin-svgrepo-com.svg';
import {NextButtonContainerStyle,NextButtonStyle} from './SetupStyles'

const Gender = ({ selectedGender, setSelectedGender, handleNextPage }) => {

  const handleGenderSelection = (gender) => {
    setSelectedGender(gender);
  };

  const handleNextButtonClick = () => {
    if (selectedGender) {
      handleNextPage();
    }
  };

  const genderButtonStyle = {
    width: '180px',
    padding: '25px',
    paddingBottom: '10px',
    display: 'flex',
    flexDirection: 'column',
    textTransform: 'none',
    color: 'black',
  }
  const maleButtonSx = {
    mr: 1,
    border: '2px solid',
    borderColor: selectedGender === 'male' ? '#4169e1' : '#ebebeb',
    boxShadow: selectedGender === 'male' ? '0px 0px 10px #4169e1' : 'none',
  }
  const femaleButtonSx = {
    border: '2px solid',
    borderColor: selectedGender === 'female' ? '#4169e1' : '#ebebeb',
    boxShadow: selectedGender === 'female' ? '0px 0px 10px #4169e1' : 'none',
  }
    
  return (
    <Box>
      {/* #1 Container for text */}
      <Box style={{ padding:'0 10vw' }}>
        <Typography variant="h5" align="center" mb={2} fontWeight="bold" style={{ marginBottom: '5px' }}>
          Choose your gender
        </Typography>
        <Typography variant="body2" align="center" mb={2} style={{margin: '0 auto 16px', maxWidth: '250px'}}>
          Tell us more about you so we can tailor the experience to suit your needs.
        </Typography>
      </Box>

      {/* #2 Container for gender buttons */}
      <Box style={{ display: 'flex', justifyContent: 'center' }}>
        <Button style={genderButtonStyle} sx={maleButtonSx} 
          onClick={() => handleGenderSelection('male')}
        >
          <img src={ManIcon} alt="Man Icon" style={{ marginBottom: '15px', height: '100px' }} />
          Male
        </Button>
        <Button style={genderButtonStyle} sx={femaleButtonSx}
          onClick={() => handleGenderSelection('female')}
        >
          <img src={WomanIcon} alt="Woman Icon" style={{ marginBottom: '15px', height: '100px' }} />
          Female
        </Button>
      </Box>

      {/* #3 Container for 'next' button */}
      <Box style={NextButtonContainerStyle}>
        <Button style={NextButtonStyle} sx={{ backgroundColor: selectedGender ? '#4169e1' : '#D3D3D3', mt: 2}}
          onClick={handleNextButtonClick}
          disabled={!selectedGender}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default Gender;
