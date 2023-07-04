import React from 'react';
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

const Login = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const submit = async () => {
    try {
      const body = { username, password }
      const user = await fetch('http://localhost:8080/login', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      })
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

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