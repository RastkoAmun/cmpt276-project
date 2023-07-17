import React from 'react'
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
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles'

const SignUp = () => {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');

  const [invalidUsername, setInvalidUsername] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [registrationError, setRegistrationError] = useState(null);

  const navigate = useNavigate();
  const theme = useTheme();

  const submit = async () => {
    let invUsername = false;
    let invEmail = false;
    let invPassword = false;
    let passMismatch = false;

    //Username validation
    setInvalidUsername(false);
    if (username === '') {
      invUsername = true;
      setInvalidUsername(true);
    }

    //Email validation
    setInvalidEmail(false);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      invEmail = true;
      setInvalidEmail(true);
    }

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

    if (!invUsername && !invEmail && !invPassword && !passMismatch) {
      try {
        const body = { username, email, password }
        const res = await fetch('http://localhost:8080/user/register', {
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
          navigate('/success')
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
          <Typography variant="h4"> Create your account </Typography>
          <Stack>
            <Typography variant='body2' component='div' p={1.5} pl={0}
              color={theme.palette.grey[700]}>
              Username
            </Typography>
            <TextField
              type='text'
              variant="outlined"
              size='small'
              value={username}
              onChange={(e) => { setUserName(e.target.value) }}
              error={invalidUsername ? true : false}
              helperText={invalidUsername && 'Please enter a valid username'}
              required
            />

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
              error={invalidEmail ? true : false}
              helperText={invalidEmail && 'Please enter a valid email address'}
              required
            />

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
                Sign up
              </Button>

              <Box display='flex' flexDirection='row' mt={2} >
                <Typography variant='body2' mr={1}>
                  Already have an account?
                </Typography>
                <Typography
                  variant='body2'
                  component={Link}
                  to={'/login'}
                  color='primary'>
                  Log in
                </Typography>
              </Box>
            </Box>
          </Stack>

        </Stack>
      </Card>
    </Box>
  );
}

export default SignUp