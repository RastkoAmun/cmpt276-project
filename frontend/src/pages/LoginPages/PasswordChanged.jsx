import React, { useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  Stack,
  Typography,
}
  from '@mui/material';
import { useTheme } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom';

const PasswordChanged = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const close = async () => {
    navigate('/login');
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }} >
    <Card
      elevation={10}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        width: '40%',
        boxShadow: 'none'
      }}>

      <Stack
        display='flex'
        flexDirection='column'
        justifyContent='center'
        width='70%'
        height='100vh'
      >
        <Typography variant="h4"> Password Changed</Typography>
        <Typography variant="h7"><br/></Typography>
        <Typography display="h9">Your password has been changed. Please use your new password to login.</Typography>      
        <Typography variant="h7"><br/></Typography>

        <Button variant='contained' mt={1}
                onClick={close}
                color='primary'
                sx={{ display: 'flex', padding: '10px' }}
              >
                Close
              </Button>

        </Stack>
    </Card>
  </Box>
  );
}

export default PasswordChanged;