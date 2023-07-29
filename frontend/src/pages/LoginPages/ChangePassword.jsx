import React, { useContext, useEffect } from 'react';
import { useState } from 'react'
import {
  Box,
  Button,
  Card,
  Stack,
  TextField,
  Typography,
}
  from '@mui/material'
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import { useTheme } from '@mui/material/styles'

const ChangePassword = () => {
  const close = async () => {
    navigate('/login');
  }
  
  const {token} = useParams();

  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');

  const [invalidPassword, setInvalidPassword] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [registrationError, setRegistrationError] = useState(null);

  const navigate = useNavigate();
  const theme = useTheme();

  const submit = async () => {
    let invPassword = false;
    let passMismatch = false;

    //Password validation
    setInvalidPassword(false);
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(password)) {
      invPassword = true;
      setInvalidPassword(true);
    }

    //Check if passwords are matching
    setPasswordMismatch(false);
    if (password !== confPassword) {
      passMismatch = true;
      setPasswordMismatch(true);
    }

    if (!invPassword && !passMismatch) {
      try {
        const body = {password }
        const res = await fetch(`http://localhost:8080/user/changepassword/${token}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        })
        const resJson = await res.json();
        console.log(resJson)
        if (resJson.status) {
          setRegistrationError(resJson.message);
          console.log('error');
        } else {
          navigate('/passwordchanged')
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  const checkToken = async () => {
    try {
      const user = await fetch(`http://localhost:8080/user/changepassword/${token}`, {
        method: "GET",
        credentials: "include"
      })
      const userCredentials = await user.json();

      if (userCredentials.username) {
        console.log(userCredentials);
      } 
    } catch (e) {        
      navigate(`/expiredlink/${token}`);
      console.log(e)
    }
  }

  useEffect(() => {
    checkToken()
  }, [])

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
          <Typography variant="h4"> Change Password </Typography>
          <Stack>
            <Typography variant='body2' component='div' p={1.5} pl={0}
              color={theme.palette.grey[700]}>
              Password
            </Typography>
            <TextField
              type='password'
              variant="outlined"
              size='small'
              value={password}
              onChange={(e) => { setPassword(e.target.value) }}
              error={invalidPassword || passwordMismatch ? true : false}
              required
              helperText={
                invalidPassword ?
                  <span>
                    Please enter a valid password. Required:<br />
                    - 6 characters<br />
                    - 1 number<br />
                    - 1 uppercase letter<br />
                    - 1 symbol character
                  </span>
                  :
                  null
              }
            />

            <Typography variant='body2' component='div' p={1.5} pl={0}
              color={theme.palette.grey[700]}>
              Confirm Password
            </Typography>
            <TextField
              type='password'
              variant="outlined"
              size='small'
              value={confPassword}
              onChange={(e) => { setConfPassword(e.target.value) }}
              error={invalidPassword || passwordMismatch ? true : false}
              helperText={
                passwordMismatch && 'Password does not match'
              }
              required
            />

            <Box mt={4} display='flex' flexDirection='column'>
            {/* <Box sx={{ flexGrow: 1 }} /> */}
            {
                registrationError ?
                  <Typography color="error" mb={2}>{registrationError}</Typography>
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

              <Button variant='contained' mt={1}
                onClick={close}
                color='inherit'
                sx={{ display: 'flex', padding: '10px' }}
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
export default ChangePassword