import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  TextField,
  Typography,
}
  from '@mui/material';
import { useTheme } from '@mui/material/styles'
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../index'

const Login = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const { setGlobalUser } = useContext(UserContext);

  const navigate = useNavigate();
  const theme = useTheme();

  const submit = async () => {
    try {
      const body = { username, password }
      const user = await fetch('http://localhost:8080/user/login', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: "include"
      })
      const userCredentials = await user.json();

      if (userCredentials.status) {
        setLoginError(userCredentials.message);
      } else {
        setGlobalUser(userCredentials);
        navigate('/');
      }
    } catch (error) {
      console.log(error)
    }
  }

  const sessionLogin = async () => {
    try {
      const user = await fetch('http://localhost:8080/user/login', {
        method: "GET",
        credentials: "include"
      })
      const userCredentials = await user.json();

      if (userCredentials.username) {
        console.log(userCredentials);
        setGlobalUser(userCredentials);
        navigate('/');
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    sessionLogin()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box display='flex' justifyContent='center' height='100vh'>
      <Card
        elevation={10}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          width: '40%',
          boxShadow: 'none'
        }}>
        <Box mx={5}
          display='flex'
          flexDirection='column'
          justifyContent='center'
          width='70%'>
          <Typography variant="h4">
            Login
          </Typography>

          <Typography variant='body2' component='div' p={1.5} pl={0}
            color={theme.palette.grey[700]}>
            Username
          </Typography>
          <TextField
            id="outlined-basic1"
            variant="outlined"
            size='small'
            value={username}
            onChange={(e) => { setUserName(e.target.value) }}
          />

          <Typography variant='body2' component='div' p={1.5} pl={0}
            color={theme.palette.grey[700]}>
            Password
          </Typography>
          <TextField
            id="outlined-basic2"
            type='password'
            variant="outlined"
            size='small'
            value={password}
            onChange={(e) => { setPassword(e.target.value) }}
          />

          {
            loginError ?
              <Typography color='error'>{loginError}</Typography>
              : null
          }

          <Box mt={4} display='flex' flexDirection='column'>
            <Button variant='contained' color='primary' onClick={submit}
              sx={{ textTransform: 'none', padding: '10px' }}>
              Login
            </Button>

            <Box display='flex' flexDirection='row' mt={2.5} >
              <Typography variant='body2' mr={1}>
                Don't have an account?
              </Typography>
              <Typography
                variant='body2'
                component={Link}
                to={'/signup'}
                color='primary'>
                Sign up
              </Typography>
            </Box>

            <Typography variant='body2' mt={1}
              component={Link} to={''} color='primary'
              sx={{ textDecoration: 'none' }}>
              Forgot password (TO BE IMPLEMENTED)
            </Typography>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}

export default Login;