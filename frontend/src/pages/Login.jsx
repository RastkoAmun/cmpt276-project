import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardMedia,
  TextField,
  Typography
}
  from '@mui/material';
import image from '../images/health.png'
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../index'

const Login = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const { setGlobalUser } = useContext(UserContext);

  const navigate = useNavigate();

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
  })

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }} mt={15}>
      <Card
        elevation={10}
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          width: '70%',
        }}>
        <CardMedia
          component="img"
          sx={{ width: '40%' }}
          image={image}
          alt="Live from space album cover"
        />
        <Box mx={5}
          sx={{
            display: 'flex', flexDirection: 'column',
            justifyContent: 'center',
            width: '70%',
          }}>
          <Typography variant='h6' component='div' p={1}
            sx={{ alignSelf: 'flex-start' }}>
            Username
          </Typography>
          <TextField id="outlined-basic1" label="Username" variant="outlined"
            size='small' value={username} onChange={(e) => { setUserName(e.target.value) }}
          />
          <Typography variant='h6' component='div' p={1} mt={1.5}> Password </Typography>
          <TextField id="outlined-basic2" label="Password" variant="outlined"
            size='small' value={password} onChange={(e) => { setPassword(e.target.value) }}
          />
          {
            loginError ?
              <div style={{ color: "red" }}>{loginError}</div>
              : null
          }
          <Box mt={4}>
            <Button variant='contained' color='info' onClick={submit}
              sx={{ marginRight: 3, backgroundColor: 'black' }}>
              Login
            </Button>
            <Button variant='contained' color='inherit'
              component={Link} to={'/signup'}>SignUp</Button>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}

export default Login;