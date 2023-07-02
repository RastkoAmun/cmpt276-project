import React from 'react'
import { Box, Button, Card, CardMedia, Checkbox, Fab, FormControlLabel, FormGroup, Grid, Stack, TextField, Typography } from '@mui/material'
import { Link } from 'react-router-dom';
import image from '../images/health.png'
import CloseIcon from '@mui/icons-material/Close';

const SignUp = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }} mt={15}>
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
            sx={{ boxShadow: 0, alignSelf: 'flex-end', marginRight: 2,
            marginBottom: 3 }}>
            <CloseIcon />
          </Fab>
          <Stack spacing={1} width='50%' ml={12}>
            <TextField label="Username" variant="outlined"
              size='small' 
            />
            <TextField label="Email" variant="outlined"
              size='small' 
            />
            <TextField label="Password" variant="outlined"
              size='small' 
            />
            <TextField label="Confirm Password" variant="outlined"
              size='small' 
            />
            <Box mt={4}>
              <Typography>
                Select which features you would liketo have (can change later)
              </Typography>
              <FormGroup sx={{display: 'flex', justifyContent: 'center', mb: 2}}>
                <Grid container>
                  <Grid item xs={6}>
                    <FormControlLabel 
                    control={<Checkbox checked={false} />} label="Food" />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel 
                    control={<Checkbox checked={false}  />} label="Exercise" />
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