import React, { useState, useContext, useEffect, useRef } from 'react'
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
import { UserContext } from '../../index';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Weight = () => {

  const [selectedWeight, setSelectedWeight] = useState('');

  const cardStyle = {
    // bgcolor: 'lightgray',
    p: 2,
  }

  const [open, setOpen] = useState(false);
  const [weight, setWeight] = useState('');
  const [date, setDate] = useState('');
  const [entries, setEntries] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [initialWeight, setInitialWeight] = useState(0);
  const [currentWeight, setCurrentWeight] = useState(0);
  const [weightChange, setWeightChange] = useState(0);
  const [refresh, setRefresh] = useState(0);
  const { globalUser } = useContext(UserContext);


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    await axios.post('http://localhost:8080/weight/add', {
      "uid": globalUser.uid,
      "date": date,
      "weight": weight
    });

    setRefresh(refresh + 1);
    handleClose();
  };

  const fetchEntries = async () => {
    const res = await axios.post('http://localhost:8080/weight', {
      "uid": globalUser.uid,
      "reverse": true
    });

    setEntries(res.data.weightHistory);
    setCurrentWeight(res.data.weightHistory[0].weight)
  }

  const fetchGraphData = async (length) => {
    const res = await axios.post('http://localhost:8080/weight', {
      "uid": globalUser.uid,
    });

    setGraphData(res.data.weightHistory);
    setInitialWeight(res.data.weightHistory[0].weight)

  }

  const updateProgress = () => {
    setWeightChange(Math.round(currentWeight - initialWeight));
  }

  const handleWeightChange = (event) => {
    setWeight(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  useEffect(() => {
    fetchEntries();
    fetchGraphData();
    updateProgress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh])

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
            Submit
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
                {currentWeight} kg
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
            <Card sx={cardStyle} style={{ height: '100%' }}>
              {/* <Typography component="span" variant='h5'>
                <Link>30 days</Link>
                <span> / </span>
                <Link>90 days</Link>
                <span> / </span>
                <Link>1 year</Link>
              </Typography> */}
              <Box display='flex' justifyContent='center' alignItems='center' sx={{ minHeight: '100%', minWidth: '100%' }}>
                <ResponsiveContainer height={700} width='100%'>
                  <LineChart data={graphData}>
                    <CartesianGrid strokeDasharray="5 5" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="weight" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </Card>
          </Grid>

          <Grid item xs={3.5}>
            <Card sx={cardStyle}
              style={{ maxHeight: '60vh', overflowY: 'scroll' }} >
              <Typography variant='h5'>History</Typography>
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