import React, { useContext } from 'react';
import { Box, Button, Fab, Grid, Paper, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { UserContext } from '../index';

const paperStyle = {
  // bgcolor: 'lightgray',
  p: 2,
}

const buttonStyle = {
  p: 0,
  bgcolor: 'white',
  color: 'black',
  border: '1px solid black',
  borderRadius: 1
}

const MainPage = () => {
  const { globalUser } = useContext(UserContext);

  return (
    <Box>
      <Grid container spacing={5} >
        <Grid item xs={8}>
          <Paper sx={paperStyle}>
            <Typography variant='h5'> Statistical Data </Typography>
            <Box display='flex' justifyContent='center' alignItems='center'
              sx={{ height: 300 }}>
              <Typography> Graph will go here </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper sx={paperStyle}>
            <Box display='flex' justifyContent='space-between'>
              <Typography variant='h5'> Profile </Typography>
              <Button variant='contained' sx={buttonStyle}>Edit</Button>
            </Box>
            <Box sx={{ height: 300 }} >
              <Typography pt={2}>Name: {globalUser ? globalUser.username : null}</Typography>
              <Typography pt={2}>Height: </Typography>
              <Typography pt={2}>Weight: </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={paperStyle}>
            <Typography variant='h5'>
              Logs
            </Typography>
            <Grid container spacing={2} mt={2}>
              <Grid item xs={3}>
                <Paper sx={{ p: 2 }}>
                  <Fab color="primary" aria-label="add" size="small" >
                    <AddIcon />
                  </Fab>
                </Paper>

              </Grid>
              <Grid item xs={3}>
                <Paper sx={{ p: 2 }}>
                  <Fab color="primary" aria-label="add" size="small" >
                    <AddIcon />
                  </Fab>
                </Paper>
              </Grid>
              <Grid item xs={3}>
                <Paper sx={{ p: 2 }}>
                  <Fab color="primary" aria-label="add" size="small" >
                    <AddIcon />
                  </Fab>
                </Paper>
              </Grid>
              <Grid item xs={3}>
                <Paper sx={{ p: 2 }}>
                  <Fab color="primary" aria-label="add" size="small" >
                    <AddIcon />
                  </Fab>
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default MainPage