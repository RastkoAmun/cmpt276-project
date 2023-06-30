import React from 'react';
import { Typography, Button, Box } from '@mui/material';

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
      <Box sx={{ paddingLeft: '10vw', paddingRight: '10vw' }}>
      {/* Container for text */}
        <Typography variant="h5" align="center" mb={2} fontWeight="bold" sx={{ marginBottom: '5px' }}>
          Choose your age group
        </Typography>
        <Typography variant="body2" align="center" mb={2} sx={{ margin: '0 auto 16px', maxWidth: '250px'}}>
          Tell us more about you so we can tailor the experience to suit your needs.
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Button 
        sx={{
          padding: '25px',
          paddingBottom: '10px',
          display: 'flex',
          flexDirection: 'column',
          border: '2px solid',
          borderColor: selectedAge === 'child' ? '#4169e1' : '#ebebeb',
          boxShadow: selectedAge === 'child' ? '0px 0px 10px #4169e1' : 'none',
          mr: 1,
          textTransform: 'none',
          color: 'black'
        }}
        onClick={() => handleAgeSelection('child')}
        >
          4-11
        </Button>
        <Button>
          12-18
        </Button>
        <Button>
          19-29
        </Button>
        <Button>
          30-49
        </Button>
        <Button>
          50+
        </Button>
      </Box>
      <Box sx={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}>
        {/* Container for next button */}
          <Button
          sx={{
            textTransform: 'none',
            minWidth: '15em',
            backgroundColor: selectedAge ? '#4169e1' : '#D3D3D3',
            color: 'white',
            mt: 2
          }}
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