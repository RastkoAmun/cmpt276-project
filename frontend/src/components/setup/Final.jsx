import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import {NextButtonContainerStyle,NextButtonStyle} from '../../pages/SetupPages/SetupStyles'

const Final = ({ estimatedGoal, finishSetup }) => {

  return (
    <Box>
      {/* #1 Container for text */}
      <Box style={{ padding:'0 10vw' }}>
        <Typography variant="h5" align="center" mb={2} fontWeight="bold" style={{ marginBottom: '5px' }}>
          Recommended daily goal
        </Typography>
        <Typography variant="body2" align="center" mb={2} style={{margin: '0 auto 16px', maxWidth: '250px'}}>
          Estimated hydration target based on your personal parameters
        </Typography>
      </Box>

      <Typography variant="h2" align="center" mb={2} fontWeight="bold" style={{ margin: '50px 0', color: '#4169e1' }}>
        {estimatedGoal} mL
      </Typography>

      {/* #3 Container for 'next' button */}
      <Box style={NextButtonContainerStyle}>
        <Button style={NextButtonStyle} sx={{ backgroundColor:'#4169e1', mt: 2}}
        onClick={finishSetup}
        >
          Finish
        </Button>
      </Box>
    </Box>
  );
};

export default Final;
