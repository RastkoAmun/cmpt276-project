import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  TextField,
  Typography
}
  from '@mui/material';
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
      // const user = await fetch('http://localhost:8080/user/login', {
      const user = await fetch('/user/login', {
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
    <Box sx={{ display: 'flex', justifyContent: 'center', height: '100vh' }}>
      <Card
        elevation={10}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          width: '40%',
          boxShadow: 'none'
        }}>
        <Box mx={5}
          sx={{
            display: 'flex', flexDirection: 'column',
            justifyContent: 'center',
            width: '70%',
          }}>
          <Typography variant="h4" style={{fontWeight:'bold', fontSize: '30px'}}>
            Login
          </Typography>

          <Typography variant='h7' component='div' p={1}
            sx={{ alignSelf: 'flex-start', padding: '12px', paddingLeft: '0', fontSize: '14px', color:'rgba(0,0,0,0.6)' }}>
            Username
          </Typography>
          <TextField id="outlined-basic1" variant="outlined"
            size='small' value={username} onChange={(e) => { setUserName(e.target.value) }}
          />

          <Typography variant='h7' component='div' p={1} mt={1.5} style={{padding:'12px', paddingLeft:'0',  fontSize: '14px', color:'rgba(0,0,0,0.6)'}}> Password </Typography>
          <TextField id="outlined-basic2" type='password' variant="outlined"
            size='small' value={password} onChange={(e) => { setPassword(e.target.value) }}
          />

          {
            loginError ?
              <div style={{ color: "red" }}>{loginError}</div>
              : null
          }

          <Box mt={4} style={{display: 'flex', flexDirection: 'column'}}>
            <Button variant='contained' color='info' onClick={submit}
              sx={{ backgroundColor: '#4169e1', textTransform: 'none', padding: '10px'}}>
              Login
            </Button>

            <Box style={{flexDirection: 'row', display: 'flex', marginTop:'20px'}}>
              <Typography style={{marginRight: '5px', fontSize: '14px'}}>
                Don't have an account?
              </Typography>
              <Typography style={{fontSize: '14px', textDecoration: 'none'}} component={Link} to={'/signup'} color='#4169e1'>
                Sign up
              </Typography>
            </Box>

            <Typography style={{fontSize: '14px', textDecoration: 'none', marginTop:'5px'}} component={Link} to={''} color='#4169e1'>
              Forgot password (TO BE IMPLEMENTED)
            </Typography>

          </Box>
        </Box>
      </Card>
    </Box>
  );
}

export default Login;