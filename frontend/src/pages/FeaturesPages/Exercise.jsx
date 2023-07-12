import React, { useState, useEffect, useContext } from 'react';
import { Typography, Select, MenuItem, InputLabel, FormControl, TextField, Button, Box} from '@mui/material';
import { UserContext } from '../../index';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const Exercise = () => {
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState('');
  const [duration, setDuration] = useState(0);
  const [completedExercises, setCompletedExercises] = useState([]);
  const [totalDuration, setTotalDuration] = useState(0);
  const [totalCaloriesBurned, setTotalCaloriesBurned] = useState(0);
  const [error, setError] = useState('');


  const theme = useTheme();
  const { globalUser } = useContext(UserContext);
  const navigate = useNavigate();

  const currentDate = new Date();
  const offset = currentDate.getTimezoneOffset() * 60000; 
  const localDate = new Date(currentDate.getTime() - offset);
  const formattedDate = localDate.toISOString().split('T')[0] 

  useEffect(() => {
    if (globalUser) {
      fetchExercises();
      fetchCompletedExercises();
      fetchExerciseSummary();
    } else {
      navigate('/login');
    }
  }, [globalUser]);

  const fetchExercises = () => {
    const cardioPromise = fetch('https://api.api-ninjas.com/v1/exercises?type=cardio', {
      headers: {
        'X-Api-Key': 'NJCiel+y0Q1KlvCfrUBqag==tJ3D15BZQ8t0HoI4', 
      },
    }).then((response) => response.json());

    const strengthPromise = fetch('https://api.api-ninjas.com/v1/exercises?type=strength', {
      headers: {
        'X-Api-Key': 'NJCiel+y0Q1KlvCfrUBqag==tJ3D15BZQ8t0HoI4', 
      },
    }).then((response) => response.json());

    Promise.all([cardioPromise, strengthPromise])
      .then(([cardioData, strengthData]) => {
        const cardioExercises = cardioData.map((exercise) => exercise.name);
        const strengthExercises = strengthData.map((exercise) => exercise.name);
        const exercisesSet = new Set([...cardioExercises, ...strengthExercises]);
        const exercises = Array.from(exercisesSet);
        setExercises(exercises);
      })
      .catch((error) => console.error('Error fetching exercises:', error));
  };

  const fetchCompletedExercises = () => {
    fetch(`http://localhost:8080/exercise/${globalUser.uid}/${formattedDate}`)
      .then((response) => response.json())
      .then((data) => {
        const completedExercises = data.map((exercise) => ({
          name: exercise.exerciseName,
          duration: exercise.duration,
        }));
        setCompletedExercises(completedExercises);
      })
      .catch((error) => console.error('Error fetching completed exercises:', error));
  };

  const fetchExerciseSummary = () => {
    fetch(`http://localhost:8080/exercisesummary/${globalUser.uid}/${formattedDate}`)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setTotalDuration(data.totalDuration);
          setTotalCaloriesBurned(data.totalCalBurned);
        }
      })
      .catch((error) => console.error('Error fetching exercise summary:', error));
  };

  const addExercise = (caloriesBurned) => {
    const exercise = {
      uid: globalUser.uid,
      exerciseName: selectedExercise,
      duration: duration,
      caloriesBurned: caloriesBurned,
      exerDate: formattedDate,
    };

    fetch('http://localhost:8080/exercise/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(exercise),
    })
      .then((response) => response.json())
      .then((data) => {
      })
      .catch((error) => console.error('Error adding exercise:', error))
      .finally(() => {
        setSelectedExercise('');
        setDuration(0);
      });
  };

  const calculateCaloriesBurned = () => {
    const query = selectedExercise;

    return fetch('https://trackapi.nutritionix.com/v2/natural/exercise', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-app-id': '2e084447',
        'x-app-key': '8007a08963e9035d0b49795c17219796',
      },
      body: JSON.stringify({
        query: query,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const exercises = data.exercises || [];
        if (exercises.length > 0) {
          const exercise = exercises[0];
          const cal = (exercise.nf_calories / exercise.duration_min) || 0;
          const caloriesBurned = parseFloat((cal * duration).toFixed(2));

          const completedExercise = {
            name:selectedExercise,
            duration,
            caloriesBurned,
          };
          setCompletedExercises((prevExercises) => [...prevExercises, completedExercise]);
          return caloriesBurned;
        }
        return 0;
      })
      .catch((error) => {
        console.error('Error calculating calories burned:', error);
        return 0;
      });
  };

  const addExerciseSummary = (totalCaloriesBurned, td) => {
    console.log("aaaaa"+formattedDate.toString())
    const exerciseSummary = {
      uid: globalUser.uid,
      totalDuration: td,
      totalCalBurned: totalCaloriesBurned,
      exerSumDate: formattedDate,
    };

    fetch('http://localhost:8080/exercisesummary/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(exerciseSummary),
    })
      .then((response) => response.json())
      .then((data) => {
      })
      .catch((error) => console.error('Error adding exercise summary:', error));
  };

  const handleAddExercise = () => {
    if (globalUser) {
      if (!selectedExercise) {
        setError('Please select an exercise');
        return;
      }
      
      calculateCaloriesBurned()
        .then((caloriesBurned) => {
          addExercise(caloriesBurned);
          setTotalDuration(totalDuration + duration);
          setTotalCaloriesBurned(totalCaloriesBurned + caloriesBurned);
          addExerciseSummary(totalCaloriesBurned + caloriesBurned, totalDuration + duration);
          setError('');
        })
        .catch((error) => console.error('Error adding exercise:', error));
    } else {
      navigate('/login');
    }
  };

  return (
  <div>
  <Typography variant='h2'>Exercise</Typography>
  <Box mt={2} p={2}>
  <form
    onSubmit={(e) => {
      e.preventDefault();
      handleAddExercise();
    }}
  >
    <Box display="flex" alignItems="center" mb={2}>
      <FormControl style={{ minWidth: '200px', marginRight: '10px' }}>
        <InputLabel>Select an exercise</InputLabel>
        <Select
          value={selectedExercise}
          onChange={(e) => setSelectedExercise(e.target.value)}
        >
          {exercises.map((exercise, index) => (
            <MenuItem key={index} value={exercise}>
              {exercise}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
              type="number"
              label="Duration (minutes)"
              value={duration.toString()}
              onChange={(e) => setDuration(parseInt(e.target.value))}
              inputProps={{ min: 1 }}
              style={{ marginRight: '10px' }}
            />
      <Button type="submit" variant="contained" color="primary" style={{ marginLeft: '10px' }}>
        Add Exercise
      </Button>
    </Box>
    {error && (
            <Typography variant='body1' color="error">
              {error}
            </Typography>
          )}
        </form>
      </Box>

<Box mt={4} p={2} >
  <Typography variant='h4'>Completed Exercises</Typography>
  {completedExercises.length === 0 ? (
    <Typography variant='body1'>No exercises completed yet.</Typography>
  ) : (
    <ul style={{ paddingInlineStart: '20px' }}>
      {completedExercises.map((exercise, index) => (
        <li key={index} style={{ padding: '3px 0' }}>
        <strong>{exercise.name}</strong> - Duration: {exercise.duration} minutes
        </li>
      ))}
    </ul>
  )}
</Box>

<Box mt={4} p={2}>
  <Typography variant='h4'>Summary</Typography>
  <Typography variant='body1' style={{ padding: '3px 0' }}><strong>Total Duration:</strong> {totalDuration} minutes</Typography>
  <Typography variant='body1' style={{ padding: '3px 0' }}><strong>Total Calories Burned:</strong> {totalCaloriesBurned.toFixed(2)}</Typography>
</Box>
    </div>
  );
};

export default Exercise;
