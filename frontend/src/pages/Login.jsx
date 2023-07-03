import React from 'react';
import { 
  Box,
  Button,
  Card,
  CardMedia, 
  TextField, 
  Typography } 
from '@mui/material';
import image from '../images/health.png'
import { Link } from 'react-router-dom';

const Login = () => {
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
              sx={{ alignSelf: 'flex-start'}}> 
              Username 
            </Typography>
            <TextField id="outlined-basic1" label="Username" variant="outlined" 
              size='small' 
            />
            <Typography variant='h6' component='div' p={1} mt={1.5}> Password </Typography>
            <TextField id="outlined-basic2" label="Password" variant="outlined" 
              size='small' 
            />
            <Box mt={4}>
              <Button variant='contained' color='info'
                sx={{ marginRight: 3, backgroundColor: 'black' }}>Login</Button>
              <Button variant='contained' color='inherit'
                component={Link} to={'/signup'}>SignUp</Button>
            </Box>
        </Box>
      </Card>
    </Box>
  );
}

export default Login;