import React from 'react'
import { useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardMedia,
  Checkbox,
  Fab,
  FormControlLabel,
  FormGroup,
  Grid,
  Stack,
  TextField,
  Typography
}
  from '@mui/material'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import image from '../images/health.png'
import CloseIcon from '@mui/icons-material/Close';

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
        // const res = await fetch('http://localhost:8080/user/register', {
        const res = await fetch('/user/register', {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        })
        const resJson = await res.json();
        if (resJson.status) {
          setRegistrationError(resJson.message);
          console.log('error');
        } else {
          navigate('/login')
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

        <Stack display='flex' flexDirection='column' justifyContent='center'
          sx={{
            width: '70%',
            height: '100vh'
          }}>
          <Typography variant="h4" style={{fontWeight:'bold', fontSize: '30px'}}>
            Create your account
          </Typography>
          <Stack>

            <Typography variant='h7' component='div' p={1}
              sx={{ alignSelf: 'flex-start', padding: '12px', paddingLeft: '0', fontSize: '14px', color:'rgba(0,0,0,0.6)' }}>
              Username
            </Typography>
            <TextField
              type='text' variant="outlined"
              size='small' value={username}
              onChange={(e) => { setUserName(e.target.value) }}
              error={invalidUsername ? true : false}
              helperText={invalidUsername && 'Please enter a valid username'}
              required
            />

            <Typography variant='h7' component='div' p={1} mt={1.5} style={{padding:'12px', paddingLeft:'0',  fontSize: '14px', color:'rgba(0,0,0,0.6)'}}> Email </Typography>
            <TextField
              type='email' variant="outlined"
              size='small' value={email}
              onChange={(e) => { setEmail(e.target.value) }}
              error={invalidEmail ? true : false}
              helperText={invalidEmail && 'Please enter a valid email address'}
              required
            />

            <Typography variant='h7' component='div' p={1} mt={1.5} style={{padding:'12px', paddingLeft:'0',  fontSize: '14px', color:'rgba(0,0,0,0.6)'}}> Password </Typography>
            <TextField
              type='password' variant="outlined"
              size='small' value={password}
              onChange={(e) => { setPassword(e.target.value) }}
              error={invalidPassword || passwordMismatch ? true : false}
              required
              helperText = {
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

            <Typography variant='h7' component='div' p={1} mt={1.5} style={{padding:'12px', paddingLeft:'0',  fontSize: '14px', color:'rgba(0,0,0,0.6)'}}> Confirm Password </Typography>
            <TextField
              type='password' variant="outlined"
              size='small' value={confPassword}
              onChange={(e) => { setConfPassword(e.target.value) }}
              error={invalidPassword || passwordMismatch ? true : false}
              helperText={
                passwordMismatch && 'Password does not match'
              }
              required
            />

            <Box mt={4} style={{display: 'flex', flexDirection: 'column'}}>
              {/* <Box sx={{ flexGrow: 1 }} /> */}
              {
                registrationError ?
                  <div style={{ color: "red", marginBottom: "1rem" }}>{registrationError}</div>
                  : null
              }
              <Button variant='contained' mt={1}
                onClick={submit}
                sx={{ display: 'flex', textTransform: 'none', padding: '10px', backgroundColor: '#4169e1'}}>
                Sign up
              </Button>

              <Box style={{flexDirection: 'row', display: 'flex', marginTop:'20px'}}>
              <Typography style={{marginRight: '5px', fontSize: '14px'}}>
                Already have an account?
              </Typography>
              <Typography style={{fontSize: '14px', textDecoration: 'none'}} component={Link} to={'/login'} color='#4169e1'>
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