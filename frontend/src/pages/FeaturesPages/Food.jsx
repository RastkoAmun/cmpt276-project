import React, { useState, useEffect, useContext } from 'react';
import {
  Typography,
  FormControl,
  TextField,
  Button,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  IconButton,
  Card,
  Grid,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { UserContext } from '../../index';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { titleContainerStyle } from '../Style';
import EditIcon from '@mui/icons-material/Edit';



const Food = () => {
  const [open, setOpen] = useState(false);
  const [foodQuery, setFoodQuery] = useState('');
  const [foods, setFoods] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [weight, setWeight] = useState(0);
  const [totalCalories, setTotalCalories] = useState(0);
  const [calorieGoal, setCalorieGoal] = useState(0);
  const [editingGoal, setEditingGoal] = useState(false);
  const [error, setError] = useState('');
  const [errorGoal, setGoalError] = useState('');
  const [completedFoods, setCompletedExercises] = useState([]);

  const { globalUser } = useContext(UserContext);
  const navigate = useNavigate();

  const currentDate = new Date();
  const offset = currentDate.getTimezoneOffset() * 60000;
  const localDate = new Date(currentDate.getTime() - offset);
  const formattedDate = localDate.toISOString().split('T')[0]

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const cardStyle = {
    // bgcolor: 'lightgray',
    height: '100%',
    p: 3,
  }

  useEffect(() => {
    if (globalUser) {
      getAddedFoods();
      getFoodSummary();
    } else {
      navigate('/login');
    }
  }, [globalUser, navigate]);

  const handleFoodQueryChange = (event) => {
    const query = event.target.value;
    setFoodQuery(query);

    if (query.length > 0) {
      searchFood(query);
    } else {
      setFoods([]);
    }
  };

  const searchFood = async (query) => {
    try {
      const response = await axios.get('https://api.edamam.com/api/food-database/v2/parser', {
        params: {
          app_id: '9579fcf8',
          app_key: '610db360e44a7b97b1f525de126d4560',
          ingr: query,
        },
      });
      const foodsData = response.data.hints;
      setFoods(foodsData);
      setError('');
    } catch (error) {
      console.error('Error searching food:', error);
      setError('Error searching food. Please try again.');
    }
  };

  const handleFoodSelection = (food) => {
    setSelectedFood(food);
    setFoods([]);
  };

  const handleWeightChange = (event) => {
    setWeight(event.target.value);
  };

  const handleAddFood = async () => {
    if (!selectedFood || weight <= 0) {
      setError('Please select a food and enter a valid weight.');
      return;
    }

    try {
      const response = await axios.post(
        'https://api.edamam.com/api/nutrition-details',
        {
          ingr: [`${weight} g ${selectedFood.food.label}`],
        },
        {
          params: {
            app_id: '70e6149e',
            app_key: 'e734ec161764fa02df208d4847440486',
          },
        }
      );

      const calories = response.data.calories;
      setTotalCalories(totalCalories + calories);
      setError('');

      addFood(calories, selectedFood.food.label, weight);
      updateFoodSummary(totalCalories + calories);
      const addedFood = {
        name: selectedFood.food.label,
        weight: weight,
      };
      //setAddedFoods((prevFoods) => [...prevFoods, addedFood]);

      setSelectedFood(null);
      setWeight(0);
    } catch (error) {
      console.error('Error adding food:', error);
      setError('Error adding food. Please try again.');
    }
  };

  const handleCalorieGoalChange = (event) => {
    setCalorieGoal(event.target.value);
  };

  const handleSaveCalorieGoal = () => {
    if (calorieGoal < 800 || calorieGoal > 3400) {
      setGoalError('Calorie goal must be between 800 and 3400.');
      return;
    } else {
      setGoalError('');

      const foodSummary = {
        uid: globalUser.uid,
        targetCalories: calorieGoal,
        consumedCalories: totalCalories,
        date: formattedDate,
      };

      axios
        .post('/foodsummary/add', foodSummary)
        .then((response) => {
          console.log('Calorie goal added to food summary:', response.data);
          setEditingGoal(false);
        })
        .catch((error) => {
          console.error('Error adding calorie goal to food summary:', error);
        });
    }
  };

  const handleEditGoal = () => {
    setEditingGoal(true);
  };

  const getAddedFoods = () => {
    axios
      .get(`/data/food/${globalUser.uid}/${formattedDate}`)
      .then((response) => {
        const data = response.data;
        const completedFoods = data.map((food) => ({
          id: food.foodId,
          name: food.foodName,
          weight: food.weight,
        }));
        setCompletedExercises(completedFoods);
      })
      .catch((error) => {
        console.error('Error fetching added foods:', error);
      });
  };

  const getFoodSummary = () => {
    axios
      .get(`/foodsummary/${globalUser.uid}/${formattedDate}`)
      .then((response) => {
        const foodSummaryData = response.data;
        if (foodSummaryData) {
          setTotalCalories(foodSummaryData.consumedCalories);
          setCalorieGoal(foodSummaryData.targetCalories);
        } else {
          setTotalCalories(0);
          setCalorieGoal(0);
        }
      })
      .catch((error) => {
        console.error('Error fetching food summary:', error);
      });
  };

  const calculateRemainingCalories = () => {
    return calorieGoal - totalCalories;
  };

  const addFood = (cal, sfood, wt) => {
    const food = {
      uid: globalUser.uid,
      foodName: sfood,
      calorie: cal,
      weight: wt,
      date: formattedDate,
    };
    console.log(food);

    axios.post('/data/food/add', food).then(() => {
      getAddedFoods();
    });
  };

  const updateFoodSummary = (consumedCalories) => {
    const foodSummary = {
      uid: globalUser.uid,
      targetCalories: calorieGoal,
      consumedCalories: consumedCalories,
      date: formattedDate,
    };

    axios
      .post('/foodsummary/add', foodSummary)
      .then((response) => {
        console.log('Food summary updated:', response.data);
      })
      .catch((error) => {
        console.error('Error updating food summary:', error);
      });
  };

  const handleDeleteFood = async (id) => {
    const food = (await axios.get(`/data/food/${id}`)).data;
    await axios.delete(`/data/food/${id}`);

    let newTotalCaloriesConsumed = totalCalories - food.calorie;

    const updateSummary = {
      uid: globalUser.uid,
      targetCalories: calorieGoal,
      consumedCalories: newTotalCaloriesConsumed,
      date: formattedDate,
    };
    await axios.put(`/foodsummary/${globalUser.uid}/${formattedDate}`, updateSummary);

    setTotalCalories(newTotalCaloriesConsumed);
    getAddedFoods();
  };

  return (
    <div>
      <Box display="flex" sx={titleContainerStyle} paddingBottom="30px">
        <Box display="flex" flexDirection="column">
          <Typography variant="fh2">
            Food
          </Typography>
          <Typography variant="fh1">
            Calorie Tracker
          </Typography>
        </Box>
        <Box display="flex" alignItems='center' marginLeft="auto">
          <Fab color="primary" aria-label="add" size="small" onClick={handleOpen} sx={{ zIndex: 1 }} >
            <AddIcon />
          </Fab>
        </Box>
      </Box>  

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Food Entry</DialogTitle>
        <DialogContent>
          <Box mt={2} minWidth="400px">
          <FormControl fullWidth>
            <TextField label="Enter a food item" value={foodQuery} onChange={handleFoodQueryChange} />
          </FormControl>
          </Box>

          <Box mt={2}>
            <Typography variant="body1">Selected Food: {selectedFood?.food.label}</Typography>
            <Box mt={2} minWidth="400px">
              <TextField
                type="number"
                label="Weight (grams)"
                value={weight}
                onChange={handleWeightChange}
                sx={{ marginRight: '10px' }}
                fullWidth
              />
            </Box>
          </Box>

          
      {error && (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      )}

      {foodQuery.length > 0 && (
        <Box mt={2} sx={{ border: '1px solid #ccc', maxHeight: '200px', overflowY: 'scroll' }}>
          <List>
            {foods.slice(0, 5).map((food, index) => (
              <ListItemButton key={index} onClick={() => handleFoodSelection(food)}>
                <ListItemText primary={food.food.label} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      )}

        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleAddFood} sx={{ mt: 2 }}>
                Add Food
          </Button>
        </DialogActions>
      </Dialog>


      <Grid container spacing={4} >

      {/* <Box p={10} pt={5}> */}

      <Grid item xs={4}>
        <Card sx={cardStyle} >
          <Box display="flex" flexDirection="column">
            <Typography fontWeight="400"variant='ch1'>Calorie goal</Typography>

              {editingGoal ? (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <TextField
                    type="number"
                    label="Calorie Goal"
                    value={calorieGoal}
                    onChange={handleCalorieGoalChange}
                    sx={{ marginLeft: '10px', width: '200px', }}
                  />
                  <Button variant="contained" onClick={handleSaveCalorieGoal} sx={{ marginLeft: '10px' }}>
                    Save Goal
                  </Button>
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h5" fontWeight="400">{calorieGoal}.00 calories</Typography>
                  <IconButton  onClick={handleEditGoal} sx={{ marginLeft: '10px', color: 'primary' }}>
                    <EditIcon />
                  </IconButton>
                </div>
              )}

          </Box>

          {errorGoal && (
          <Typography variant="body1" color="error">
            {errorGoal}
          </Typography>
          )}
        </Card>
      </Grid>









      <Grid item xs={4}>
        <Card sx={cardStyle} >
              <Box display="flex" flexDirection="column">
                <Typography variant="ch1" fontWeight="400">Consumed</Typography>
                <Typography variant="h5" fontWeight="400"> {totalCalories}.00 calories</Typography>
              </Box>
        </Card>
      </Grid>

      <Grid item xs={4}>
        <Card sx={cardStyle}>
              <Box display="flex" flexDirection="column">
                <Typography variant="ch1" fontWeight="400">Remaining</Typography>
                <Typography variant="h5" fontWeight="400"> {calculateRemainingCalories()}.00 calories</Typography>
              </Box>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card sx={{px: 7, py: 5}} >
          <Box>
            <Typography fontWeight='500' variant="h5" marginBottom='30px'>
              Food Log
            </Typography>
            <Box>
              {completedFoods.length === 0 ? (
                <Typography variant="body1">No foods added yet.</Typography>
              ) : (
                <ul style={{ paddingInlineStart: '20px' }}>
                  {completedFoods.map((food) => (
                    <li key={food.id} style={{ padding: '3px 0' }}>
                      <strong>{food.name}</strong> - Weight: {food.weight} grams
                      <IconButton
                        aria-label="delete"
                        sx={{ p: 0, ml: 1 }}
                        onClick={() => handleDeleteFood(food.id)}
                      >
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

      {/* </Box> */}

      </Grid>

    </div>
  );
};

export default Food;
