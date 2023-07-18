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
  withTheme,
} from '@mui/material';
import { UserContext } from '../../index';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Food = () => {
  const [foodQuery, setFoodQuery] = useState('');
  const [foods, setFoods] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [weight, setWeight] = useState(0);
  const [addedFoods, setAddedFoods] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);
  const [calorieGoal, setCalorieGoal] = useState(0);
  const [editingGoal, setEditingGoal] = useState(false);
  const [error, setError] = useState('');

  const { globalUser } = useContext(UserContext);
  const navigate = useNavigate();

  const currentDate = new Date();
  const offset = currentDate.getTimezoneOffset() * 60000;
  const localDate = new Date(currentDate.getTime() - offset);
  const formattedDate = localDate.toISOString().split('T')[0]

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
      setAddedFoods((prevFoods) => [...prevFoods, addedFood]);

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
    const foodSummary = {
      uid: 79,
      targetCalories: calorieGoal,
      consumedCalories: totalCalories,
      date: formattedDate,
    };

    axios
      .post('http://localhost:8080/foodsummary/add', foodSummary)
      .then((response) => {
        console.log('Calorie goal added to food summary:', response.data);
        setEditingGoal(false);
      })
      .catch((error) => {
        console.error('Error adding calorie goal to food summary:', error);
      });
  };

  const handleEditGoal = () => {
    setEditingGoal(true);
  };

  const getAddedFoods = () => {
    axios
      .get(`http://localhost:8080/data/food/${globalUser.uid}/${formattedDate}`)
      .then((response) => {
        const data = response.data;
        const addedFoodsData = data.map((food) => ({
          name: food.foodName,
          weight: food.weight,
        }));
        setAddedFoods(addedFoodsData);
      })
      .catch((error) => {
        console.error('Error fetching added foods:', error);
      });
  };

  const getFoodSummary = () => {
    axios
      .get(`http://localhost:8080/foodsummary/${globalUser.uid}/${formattedDate}`)
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

    axios.post('http://localhost:8080/data/food/add', food);
  };

  const updateFoodSummary = (consumedCalories) => {
    const foodSummary = {
      uid: globalUser.uid,
      targetCalories: calorieGoal,
      consumedCalories: consumedCalories,
      date: formattedDate,
    };

    axios
      .post('http://localhost:8080/foodsummary/add', foodSummary)
      .then((response) => {
        console.log('Food summary updated:', response.data);
      })
      .catch((error) => {
        console.error('Error updating food summary:', error);
      });
  };

  return (
    <div>
      <Typography variant="h2">Food</Typography>

      <Box mt={4} display="flex" alignItems="center">
        <label style={{ marginRight: '10px', fontWeight: 'bold', fontSize: '1.2rem' }}>Calorie Goal:</label>
        {editingGoal ? (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              type="number"
              label="Calorie Goal"
              value={calorieGoal}
              onChange={handleCalorieGoalChange}
              sx={{ marginLeft: '10px', width: '200px' }}
            />
            <Button variant="contained" onClick={handleSaveCalorieGoal} sx={{ marginLeft: '10px' }}>
              Save Goal
            </Button>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: '1.2rem' }}>{calorieGoal}</span>
            <Button variant="outlined" onClick={handleEditGoal} sx={{ marginLeft: '10px', color: 'blue' }}>
              Edit Goal
            </Button>
          </div>
        )}
      </Box>

      <Box mt={2}>
        <FormControl>
          <TextField label="Enter a food item" value={foodQuery} onChange={handleFoodQueryChange} />
        </FormControl>
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
              <ListItem button key={index} onClick={() => handleFoodSelection(food)}>
                <ListItemText primary={food.food.label} />
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      <Box mt={2}>
        <Typography variant="body1">Selected Food: {selectedFood?.food.label}</Typography>
        <Box mt={2}>
          <TextField
            type="number"
            label="Weight (grams)"
            value={weight}
            onChange={handleWeightChange}
            sx={{ marginRight: '10px' }}
          />
          <Button variant="contained" onClick={handleAddFood} sx={{ mt: 2 }}>
            Add Food
          </Button>
        </Box>
      </Box>

      <Box mt={4}>
        <Typography variant="h4">
          <strong>Food List</strong>
        </Typography>
        {addedFoods.length === 0 ? (
          <Typography variant="body1">No foods added yet.</Typography>
        ) : (
          <ul style={{ paddingInlineStart: '20px' }}>
            {addedFoods.map((food, index) => (
              <li key={index} style={{ padding: '3px 0' }}>
                <strong>{food.name}</strong> - Weight: {food.weight} grams
              </li>
            ))}
          </ul>
        )}
      </Box>

      <Box mt={4}>
        <Typography variant="h4">
          <strong>Energy Summary</strong>
        </Typography>
        <Box display="flex" alignItems="center" mt={2}>
          <Box flex="1" mr={2}>
            <Typography variant="body1">Consumed: {totalCalories} calories</Typography>
          </Box>

          <Box flex="1">
            <Typography variant="body1">Remaining: {calculateRemainingCalories()} calories</Typography>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Food;
