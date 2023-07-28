import React, { useContext, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  Stack,
  Typography,
}
  from '@mui/material';
import { useTheme } from '@mui/material/styles'
import { UserContext } from '../../index'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const ResetLink = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [globalUser, setGlobalUser] = useState(null);

  const close = async () => {
    setGlobalUser(null);
    navigate('/login');
  }

  useEffect(() => {
    setTimeout(() => {
      setGlobalUser(null);
      navigate('/login')
    }, 5000)
  }, [navigate])

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
        <Typography variant="h4"> Change Password</Typography>
        <Typography variant="h7"><br/></Typography>
        <Typography display="h9"> A link has been sent to your email address.<br/> Please check your inbox to change your password.</Typography>      
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

export default ResetLink;