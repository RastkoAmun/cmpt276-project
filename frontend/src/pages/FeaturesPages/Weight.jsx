import React, { useState } from 'react'
import {
  Typography,
  Box,
  TextField,
  Grid,
  Card,
  List,
  ListItem,
  ListItemText,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Link
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import { titleContainerStyle } from '../Style';


const Weight = () => {

  const [selectedWeight, setSelectedWeight] = useState('500');
  const initialWeight = 500
  const weightChange = 5;

  const cardStyle = {
    // bgcolor: 'lightgray',
    p: 2,
  }


  const entries = [
    { id: 1, date: '2023-01-01', weight: 75 },
    { id: 2, date: '2023-01-02', weight: 74.5 },
    { id: 3, date: '2023-01-03', weight: 74 },
  ]

  const [open, setOpen] = useState(false);
  const [weight, setWeight] = useState('');
  const [date, setDate] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = () => {
    // Perform submit logic here
    console.log('Weight:', weight);
    console.log('Date:', date);
    handleClose();
  };
  const handleWeightChange = (event) => {
    setWeight(event.target.value);
  };
  const handleDateChange = (event) => {
    setDate(event.target.value);
  };



  return (
    <Box>
      <Box display="flex" sx={titleContainerStyle} paddingBottom="30px">
        <Box display="flex" flexDirection="column">
          <Typography variant="fh2">
            Weight
          </Typography>
          <Typography variant="fh1">
            Weight Progress
          </Typography>
        </Box>
        <Box display="flex" alignItems='center' marginLeft="auto">
          <Fab color="primary" aria-label="add" size="small" onClick={handleOpen} >
            <AddIcon />
          </Fab>
        </Box>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Weight Entry</DialogTitle>
        <DialogContent>
          <TextField
            label="Weight (kg)"
            value={weight}
            onChange={handleWeightChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Date"
            type="date"
            value={date}
            onChange={handleDateChange}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Submit TO DB
          </Button>
        </DialogActions>
      </Dialog>


      <Box>
        <Grid container spacing={4} >

          <Grid item xs={4}>
            <Card sx={cardStyle} >
              <Typography variant='h5'>Initial weight</Typography>
              <Box>
                <Typography>
                  {initialWeight} kg
                </Typography>
              </Box>
            </Card>
          </Grid>

          <Grid item xs={4}>
            <Card sx={cardStyle} >
              <Typography variant='h5'>Current weight</Typography>
              <Typography>
                {selectedWeight} kg
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={4}>
            <Card sx={cardStyle} >
              <Typography variant='h5'>Change</Typography>
              <Typography>
                {weightChange} %
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={8.5}>
            <Card sx={cardStyle} >
              <Typography component="span" variant='h5'>
                <Link>30 days</Link>
                <span> / </span>
                <Link>90 days</Link>
                <span> / </span>
                <Link>1 year</Link>
              </Typography>
              <Box display='flex' justifyContent='center' alignItems='center'
                sx={{ height: 500 }}>
                <Typography> Graph will go here </Typography>
              </Box>
            </Card>
          </Grid>

          <Grid item xs={3.5}>
            <Card sx={cardStyle}
              style={{ height: '100%' }} >
              <Typography variant='h5'>Entries (render from db)</Typography>
              <List>
                {entries.map((entry) => (
                  <ListItem key={entry.id}>
                    <ListItemText primary={entry.date} secondary={`Weight: ${entry.weight} kg`} />
                  </ListItem>
                ))}
              </List>
            </Card>
          </Grid>

        </Grid>
      </Box>
    </Box>

  )
}

export default Weight