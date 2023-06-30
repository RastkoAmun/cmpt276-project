import React from 'react'
import { Box, Button, Grid, Paper, Typography } from '@mui/material'

const paperStyle = {
  bgcolor: 'lightgray',
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
  return (
    <Box>
      <Grid container spacing={5} >
        <Grid item xs={8}>
          <Paper sx={paperStyle}>
            <Typography> Statistical Data </Typography>
          </Paper>
        </Grid>
        <Grid item xs={4}>
        <Paper sx={paperStyle}>
          <Box display='flex' justifyContent='space-between'>
            <Typography variant='h6'> Profile </Typography>
            <Button variant='contained' sx={buttonStyle}>Edit</Button>
          </Box>
          <Typography>Name</Typography>
          <Typography>Height</Typography>
          <Typography>Weight</Typography>
        </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={paperStyle}>
            <Typography>
              Logs
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default MainPage