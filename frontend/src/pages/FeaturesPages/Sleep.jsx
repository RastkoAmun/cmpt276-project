import React, { useState, useEffect, useContext } from 'react';
import { Typography, TextField, Button, Grid, Select, MenuItem, Box, Card } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { UserContext } from '../../index';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { titleContainerStyle } from '../Style';

const Sleep = () => {
  const [sleepData, setSleepData] = useState([]);
  const [bedTime, setBedTime] = useState('');
  const [wakeUpTime, setWakeUpTime] = useState('');
  const [satisfactionLevel, setSatisfactionLevel] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  const theme = useTheme();

  const { globalUser } = useContext(UserContext);

  const navigate = useNavigate();
   const uid=globalUser?.uid;

  const handleAddSleepData = async () => {
    if (!uid) {
      navigate("/login"); 
    }
    else{

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); 

    const newSleepData = {
      uid,
      date: currentDate.toISOString(), 
      bedTime,
      wakeUpTime,
      satisfactionLevel
    };

    try {
      const response = await fetch('/sleep/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newSleepData)
      });

      if (response.ok) {
        console.log('Sleep data added successfully');
        setBedTime('');
        setWakeUpTime('');
        setSatisfactionLevel('');

        // Refetch sleep data
        fetchSleepData();
      } else if (response.status === 409) {
        setErrorMessage('Entry already exists');
      } else {
        console.error('Failed to add sleep data');
      }
    } catch (error) {
      console.error('Failed to add sleep data:', error);
    }
  }};

  const fetchSleepData = async () => {
    try {
      const response = await fetch(`/sleep/sleep-data?uid=${globalUser.uid}`);

      const data = await response.json();
      setSleepData(data);
    } catch (error) {
      console.error('Failed to fetch sleep data:', error);
    }
  };

  useEffect(() => {
    if (globalUser) {
    fetchSleepData();
  }else {
    navigate("/login");
  }
}, [globalUser]);

  const calculateSleepDuration = (bedTime, wakeUpTime) => {
    const bedTimeDate = new Date(`1970-01-01T${bedTime}`);
    const wakeUpTimeDate = new Date(`1970-01-01T${wakeUpTime}`);
    let timeDiffMs = wakeUpTimeDate.getTime() - bedTimeDate.getTime();
    if (timeDiffMs < 0) {
      timeDiffMs += 24 * 60 * 60 * 1000; // Add 24 hours in milliseconds
    }
    const sleepDuration = timeDiffMs / (1000 * 60 * 60);    
    return sleepDuration.toFixed(2);
  };

  
  const sleepDurationData = sleepData.map((data) => ({
    date: data.date,
    sleepDuration: calculateSleepDuration(data.bedTime, data.wakeUpTime)
  }));



  const handleSatisfactionChange = (e) => {
    setSatisfactionLevel(e.target.value);
  };

  return (
    <>
      <Box display="flex" sx={titleContainerStyle} paddingBottom="30px">
        <Box display="flex" flexDirection="column">
          <Typography variant="fh2">
            Sleep
          </Typography>
          <Typography variant="fh1">
            Sleep Tracker
          </Typography>
        </Box>
      </Box> 
      <Card sx={{padding:"50px"}}>

      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12} sm={3}>
          <Typography variant="subtitle1">Bed Time</Typography>
          <TextField
            type="time"
            value={bedTime}
            onChange={(e) => setBedTime(e.target.value)}
            fullWidth
            sx={{ maxWidth: '100%' }}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Typography variant="subtitle1">Wake Up Time</Typography>
          <TextField
            type="time"
            value={wakeUpTime}
            onChange={(e) => setWakeUpTime(e.target.value)}
            fullWidth
            sx={{ maxWidth: '100%' }}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Typography variant="subtitle1">Sleep Satisfaction</Typography>
          <Select
            value={satisfactionLevel}
            onChange={handleSatisfactionChange}
            fullWidth
            sx={{ maxWidth: '100%' }}
          >
            {[...Array(11)].map((_, index) => (
              <MenuItem key={index} value={index}>{index}</MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12} sm={3} container alignItems="flex-end" justifyContent="flex-end">
          <Button variant="contained" onClick={handleAddSleepData}>
            Add Sleep Data
          </Button>
        </Grid>
      </Grid>
      {errorMessage && (
      <Typography variant="subtitle1" color="error">
        {errorMessage}
      </Typography>
    )}

      <Grid container spacing={2} alignItems="center" justifyContent="center" style={{ marginTop: '4rem' }}>
        <Grid item xs={12} sm={8}>
          <div>
            <LineChart width={600} height={300} data={sleepDurationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis ticks={[0, 3, 6, 9, 12, 15]} />
               <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sleepDuration" stroke="#8884d8" />
            </LineChart>
          </div>
        </Grid>
      </Grid>

      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12} sm={8}>
          <div>
            <LineChart width={600} height={300} data={sleepData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis ticks={[0, 2, 4, 6, 8, 10,12]} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="satisfactionLevel" stroke="#82ca9d" />
            </LineChart>
          </div>
        </Grid>
      </Grid>
      </Card>
    </>
  );
};

export default Sleep;
