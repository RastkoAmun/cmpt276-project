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
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { UserContext } from '../../index';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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

  //Handler Functions
  const handleSelectedExercise = useCallback((event) => {
    setSelectedExercise(event.target.value)
  }, [])

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
    <Container>
      <Typography variant='h2'>
        Exercise
      </Typography>
      <Box display="flex" alignItems="center" mt={5}>
        <Box width='200px'>
          <FormControl fullWidth size='small'>
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
        <TextField
          type="number"
          label="Duration (minutes)"
          value={duration.toString()}
          onChange={handleDuration}
          inputProps={{ min: 1 }}
          size='small'
          sx={{ mx: 1.5 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddExercise}
          sx={{ boxShadow: 'none' }}>
          Add Exercise
        </Button>
      </Box>
      {error && (
        <Typography variant='subtitle2' color="error" ml={1}>
          {error}
        </Typography>
      )}

      <Box mt={4} pl={2}>
        <Typography variant='h4'>
          Completed Exercises
        </Typography>
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

      <Box mt={4} p={2}>
        <Typography variant='h4'>Summary</Typography>
        <Typography variant='body1' p={.5}>
          <strong>Total Duration:</strong> {totalDuration} minutes
        </Typography>
        <Typography variant='body1' p={.5}>
          <strong>Total Calories Burned:</strong> {totalCaloriesBurned.toFixed(2)}
        </Typography>
      </Box>
    </Container>
  );
};

export default Exercise;
