import React from 'react';
import { useState, useEffect, useContext, useCallback } from 'react';
import {
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
  Button,
  Box,
  Container,
  IconButton,
  Card,
  Grid,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { UserContext } from '../../index';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { titleContainerStyle } from '../Style';
import AddIcon from '@mui/icons-material/Add';



const Exercise = () => {
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState('');
  const [duration, setDuration] = useState(0);
  const [completedExercises, setCompletedExercises] = useState([]);
  const [totalDuration, setTotalDuration] = useState(0);
  const [totalCaloriesBurned, setTotalCaloriesBurned] = useState(0);
  const [error, setError] = useState('');

  const { globalUser } = useContext(UserContext);
  const navigate = useNavigate();

  const currentDate = new Date();
  const offset = currentDate.getTimezoneOffset() * 60000;
  const localDate = new Date(currentDate.getTime() - offset);
  const formattedDate = localDate.toISOString().split('T')[0]

  const [open, setOpen] = useState(false);


  //Handler Functions
  const handleSelectedExercise = useCallback((event) => {
    setSelectedExercise(event.target.value)
  }, [])

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleDuration = useCallback((event) => {
    setDuration(parseInt(event.target.value))
  }, [])

  useEffect(() => {
    if (globalUser) {
      getExercises();
      getCompletedExercises();
      getExerciseSummary();
    } else {
      navigate('/login');
    }
  }, [globalUser, navigate]);

  const cardStyle = {
    // bgcolor: 'lightgray',
    height: '100%',
    p: 3,
  }

  const getExercises = async () => {
    const cardioData = await axios
      .get('https://api.api-ninjas.com/v1/exercises?type=cardio', {
        headers: {
          'X-Api-Key': 'NJCiel+y0Q1KlvCfrUBqag==tJ3D15BZQ8t0HoI4'
        }
      })
      .then((response) => response.data);

    const strengthData = await axios
      .get('https://api.api-ninjas.com/v1/exercises?type=strength', {
        headers: {
          'X-Api-Key': 'NJCiel+y0Q1KlvCfrUBqag==tJ3D15BZQ8t0HoI4'
        }
      })
      .then((response) => response.data);

    const cardioExercises = cardioData.map((exercise) => exercise.name);
    const strengthExercises = strengthData.map((exercise) => exercise.name);
    const allExercises = [...cardioExercises, ...strengthExercises]
    setExercises(allExercises);
  };

  const getCompletedExercises = () => {
    axios.get(`/data/exercise/${globalUser.uid}/${formattedDate}`)
      .then((response) => {
        const data = response.data;
        const completedExercises = data.map((exercise) => ({
          id: exercise.exerciseId,
          name: exercise.exerciseName,
          duration: exercise.duration,
        }));
        setCompletedExercises(completedExercises);
      })
  };

  const getExerciseSummary = async () => {
    let data;
    await axios
      .get(`/exercisesummary/${globalUser.uid}/${formattedDate}`)
      .then((response) => {
        data = response.data;
        if (data) {
          setTotalDuration(data.totalDuration);
          setTotalCaloriesBurned(data.totalCalBurned);
        }
      })
    return data;
  };

  const addExercise = (caloriesBurned) => {
    const exercise = {
      uid: globalUser.uid,
      exerciseName: selectedExercise,
      duration: duration,
      caloriesBurned: caloriesBurned,
      exerDate: formattedDate,
    };

    axios
      .post('/data/exercise/add', exercise)
      .then(() => {
        getCompletedExercises();
        setSelectedExercise('');
        setDuration(0);
      })
  };

  const calculateCaloriesBurned = async () => {
    const query = selectedExercise;
    const response = await axios
      .post('https://trackapi.nutritionix.com/v2/natural/exercise', {
        query: query
      }, {
        headers: {
          'Content-Type': 'application/json',
          'x-app-id': '2e084447',
          'x-app-key': '8007a08963e9035d0b49795c17219796',
        }
      });

    const data = response.data;
    const exercise = data.exercises[0] || [];

    if (exercises.length > 0) {
      const cal = (exercise.nf_calories / exercise.duration_min) || 0;
      const caloriesBurned = parseFloat((cal * duration).toFixed(2));
      return caloriesBurned;
    } else return 0;
  };

  const addExerciseSummary = async (totalCaloriesBurned, totalDuration) => {
    const exerciseSummary = {
      uid: globalUser.uid,
      totalDuration: totalDuration,
      totalCalBurned: totalCaloriesBurned,
      exerSumDate: formattedDate,
    };

    axios.post('/exercisesummary/add', exerciseSummary);
  };

  const handleAddExercise = async (event) => {
    event.preventDefault();
    if (globalUser) {
      if (!selectedExercise) {
        setError('Please select an exercise');
        return;
      }

      const caloriesBurned = await calculateCaloriesBurned();
      addExercise(caloriesBurned);
      setTotalDuration(totalDuration + duration);
      setTotalCaloriesBurned(totalCaloriesBurned + caloriesBurned);
      addExerciseSummary(totalCaloriesBurned + caloriesBurned, totalDuration + duration);
      setError('');
    } else {
      navigate('/login');
    }
  };

  const handleDeleteExercise = async (id) => {
    const exercise = (await axios.get(`/data/exercise/${id}`)).data;
    await axios.delete(`/data/exercise/${id}`)

    let newTotalCaloriesBurned = totalCaloriesBurned - exercise.caloriesBurned;
    let newTotalDuration = totalDuration - exercise.duration;
    
    const updateSummary = {
      uid: globalUser.uid,
      totalDuration: newTotalDuration,
      totalCalBurned: newTotalCaloriesBurned,
      exerSumDate: formattedDate,
    };
    await axios.put(`/exercisesummary/${globalUser.uid}/${formattedDate}`, updateSummary);

    setTotalCaloriesBurned(newTotalCaloriesBurned);
    setTotalDuration(newTotalDuration);
    getCompletedExercises();
    // getExerciseSummary();
  }

  return (
    <Box>
      <Box display="flex" sx={titleContainerStyle} paddingBottom="30px">
        <Box display="flex" flexDirection="column">
          <Typography variant="fh2">
            Exercise
          </Typography>
          <Typography variant="fh1">
            Exercise Tracker
          </Typography>
        </Box>
        <Box display="flex" alignItems='center' marginLeft="auto">
          <Fab color="primary" aria-label="add" size="small" onClick={handleOpen} sx={{ zIndex: 1 }} >
            <AddIcon />
          </Fab>
        </Box>
      </Box> 

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Exercise Entry</DialogTitle>
        <DialogContent>
          <Box mt={2} minWidth="400px">
            <FormControl fullWidth margin="normal">
              <InputLabel id="exercise-select">Exercise</InputLabel>
              <Select id="exercise-select"
                value={selectedExercise}
                onChange={handleSelectedExercise}
                label="Exercise"
              >
                {exercises.map((exercise, index) => (
                  <MenuItem key={index} value={exercise}>
                    {exercise}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box mt={2} minWidth="400px">
            <TextField
              margin="normal"
              fullWidth
              type="number"
              label="Duration (minutes)"
              value={duration.toString()}
              onChange={handleDuration}
              inputProps={{ min: 1 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddExercise}
            sx={{ boxShadow: 'none' }}>
            Add Exercise
          </Button>
          {error && (
          <Typography variant='subtitle2' color="error" ml={1}>
            {error}
          </Typography>
          )}
        </DialogActions>
      </Dialog>

    <Grid container spacing={4} >
        <Box display="flex" alignItems="center" mt={5}>
          

        </Box>




      <Grid item xs={6}>
        <Card sx={cardStyle}>
        <Box display="flex" flexDirection="column">
          <Typography variant="ch1" fontWeight="400">Total duration</Typography>
          <Typography variant="h5" fontWeight="400"> {totalDuration} minutes</Typography>
        </Box>
        </Card>
      </Grid>

      <Grid item xs={6}>
        <Card sx={cardStyle}>
        <Box display="flex" flexDirection="column">
          <Typography variant="ch1" fontWeight="400">Total calories burned</Typography>
          <Typography variant="h5" fontWeight="400"> {totalCaloriesBurned.toFixed(2)} calories</Typography>
        </Box>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card sx={{px: 7, py: 5}}>
        <Box>
          <Typography variant='h5' fontWeight="500" marginBottom="20px">
            Exercise Log
          </Typography>
          <Box>
            {completedExercises.length === 0
              ?
              (
                <Typography variant='body1'>
                  No exercises completed yet.
                </Typography>
              )
              :
              (
                <ul style={{ paddingInlineStart: '20px' }}>
                  {completedExercises.map((exercise) => (
                    <li key={exercise.id} style={{ padding: '3px 0' }}>
                      <strong>{exercise.name}</strong> - Duration: {exercise.duration} minutes
                      <IconButton aria-label="delete" sx={{ p: 0, ml: 1 }}
                        onClick={() => handleDeleteExercise(exercise.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </li>
                  ))}
                </ul>
              )}
          </Box>
        </Box>
        </Card>
      </Grid>
    </Grid>
    </Box>
  );
};

export default Exercise;
