import React, { } from 'react';
import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  Stack,
  TextField,
  Typography,
}
  from '@mui/material';
import { useTheme } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [resetError, setResetError] = useState('');

  const navigate = useNavigate();
  const theme = useTheme();

  const close = async () => {
    navigate('/login');
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      submit();
    }
  };

  const submit = async () => {
    let invEmail = false;

    //Email validation
    setInvalidEmail(false);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      invEmail = true;
      setInvalidEmail(true);
    }

    if (!invEmail) {
      try {
        const body = {email}
        const res = await fetch('http://localhost:8080/user/forgetpassword', {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        })
        const resJson = await res.json();
        console.log(resJson)
        if (resJson.status) {
          setResetError(resJson.message);
          console.log('error');
        } else {
          navigate('/resetlink')
        }
      } catch (error) {
        console.log(error)
      }
    }
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
          <Typography variant="h4"> Find your account</Typography>
          <Typography variant="h7"><br/></Typography>
          <Typography display="h9"> Please enter your email to search for your account.</Typography>

          <Stack>
            <Typography variant='body2' component='div' p={1.5} pl={0}
              color={theme.palette.grey[700]}>
              Email
            </Typography>
            <TextField
              type='email'
              variant="outlined"
              size='small'
              value={email}
              onChange={(e) => { setEmail(e.target.value) }}
              onKeyDown={handleKeyDown}
              error={invalidEmail ? true : false}
              helperText={invalidEmail && 'Please enter a valid email address'}
              required
            />

            <Box mt={4} display='flex' flexDirection='column'>
            {/* <Box sx={{ flexGrow: 1 }} /> */}
            {
                resetError ?
                  <Typography color="error" mb={2}>{resetError}</Typography>
                  : null
              }
              <Button variant='contained' mt={1}
                onClick={submit}
                color='primary'
                sx={{ display: 'flex', padding: '10px' }}
              >
                Submit
              </Button>
              <Typography variant="h7"><br/></Typography>

              <Button variant='contained' color='inherit'
                onClick={close}
                sx={{ display: 'flex', padding: '10px'}}
              >
                Close
              </Button>
            </Box>
          </Stack>

        </Stack>
      </Card>
    </Box>
  );
}

export default ForgetPassword;