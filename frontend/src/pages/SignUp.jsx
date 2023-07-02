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

  const submit = () => {
    let invUsername = false;
    let invEmail = false;
    let invPassword = false;

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
    if(password !== confPassword){
      invPassword = true;
      setInvalidPassword(true);
    }

    if (!invUsername && !invEmail && !invPassword) {
      console.log(username);
      console.log(email);
      console.log(password);
      console.log(confPassword);
    }

  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }} mt={5}>
      <Card
        elevation={10}
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          width: '60%',
        }}>
        {/* <Box> */}
        <CardMedia
          component="img"
          sx={{ width: '40%', height: 350, alignSelf: 'center', pl: 2 }}
          image={image}
          alt="Live from space album cover"
        />
        {/* </Box> */}
        <Stack display='flex' flexDirection='column' justifyContent='center'
          mt={2}
          sx={{
            width: '60%',
          }}>
          <Fab size='small' component={Link} to={'/'}
            sx={{
              boxShadow: 0, alignSelf: 'flex-end', marginRight: 2,
              marginBottom: 3
            }}>
            <CloseIcon />
          </Fab>
          <Stack spacing={1} width='50%' ml={12}>
            <TextField
              type='text' label="Username" variant="outlined"
              size='small' value={username}
              onChange={(e) => { setUserName(e.target.value) }}
              error={invalidUsername ? true : false}
              helperText={invalidUsername && 'Please enter your username'}
              required
            />
            <TextField
              type='email' label="Email" variant="outlined"
              size='small' value={email}
              onChange={(e) => { setEmail(e.target.value) }}
              error={invalidEmail ? true : false}
              helperText={invalidEmail && 'Please enter valid email'}
              required
            />
            <TextField
              type='password' label="Password" variant="outlined"
              size='small' value={password}
              onChange={(e) => { setPassword(e.target.value) }}
              error={invalidPassword ? true : false}
              helperText={invalidPassword &&
                <span>
                  Please enter a valid password. Required:<br />
                  - 6 characters<br />
                  - 1 number<br />
                  - 1 uppercase letter<br />
                  - 1 symbol character
                </span>
              }
              required
            />
            <TextField
              type='text' label="Confirm Password" variant="outlined"
              size='small' value={confPassword}
              onChange={(e) => { setConfPassword(e.target.value) }}
              error={invalidPassword ? true : false}
              helperText={invalidPassword && 'Password mismatch'}
              required
            />
            <Box pt={2}>
              <Typography>
                Select which features you would liketo have (can change later)
              </Typography>
              <FormGroup sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <Grid container>
                  <Grid item xs={6}>
                    <FormControlLabel
                      control={<Checkbox checked={false} />} label="Food" />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel
                      control={<Checkbox checked={false} />} label="Exercise" />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel
                      control={<Checkbox checked={false} />} label="Sleep" />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel
                      control={<Checkbox checked={false} />} label="Hydration" />
                  </Grid>
                </Grid>
              </FormGroup>
              {/* <Box sx={{ flexGrow: 1 }} /> */}
              <Button variant='contained' color='primary'
                onClick={submit}
                sx={{ mb: 5, display: 'flex' }}>
                Submit
              </Button>
            </Box>
          </Stack>

        </Stack>
      </Card>
    </Box>
  );
}

export default SignUp