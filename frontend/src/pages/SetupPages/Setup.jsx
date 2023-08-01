import React, { useState, useContext, useEffect } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIcon from '@mui/icons-material/ArrowForwardIos';
import Gender from '../../components/setup/Gender';
import Age from '../../components/setup/Age';
import Weight from '../../components/setup/Weight';
import Height from '../../components/setup/Height';
import ActivityLevel from '../../components/setup/ActivityLevel';
import Climate from '../../components/setup/Climate';
import Final from '../../components/setup/Final';
import Calories from '../../components/setup/Calories';
import { UserContext } from '../../index';
import { useNavigate } from 'react-router-dom';
import { getDate, getCurrentDateInFormat } from '../../../src/services/helperFunctions'
import axios from 'axios';

const Setup = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [frontPage, setFrontPage] = useState(1);
  /* This is here to prevent users from using the ArrowForwardIcon button to move to next card
   when they haven't entered the required info. */
  const { globalUser, setGlobalUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
    console.log(selectedAge + ', ' + selectedGender + ', ' + selectedWeight + currentWeightUnit + ', ' + selectedHeight + currentHeightUnit + ', ' + selectedActivityLevel + ', ' + selectedClimate);
    console.log(currentPage)

    if (frontPage === currentPage) {
      setFrontPage(frontPage + 1);
    }
  };
  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const finishSetup = async () => {
    await axios.patch('/user/profile', {
      "uid": globalUser.uid,
      "age": selectedAge,
      "height": selectedHeight,
      "weight": selectedWeight,
      "sex": selectedGender,
      "activityLevel": selectedActivityLevel,
      "climate": selectedClimate
    })

    await axios.post('/weight/add', {
      "uid": globalUser.uid,
      "date": getCurrentDateInFormat(),
      "weight": selectedWeight
    })

    await axios.post('/data/hydration', {
      "uid": globalUser.uid,
      "goal": estimatedGoal,
      "intake": 0,
      "intakeDate": getDate()
    })

    await axios.patch('/user/updateFirstLogin', {
      "uid": globalUser.uid
    })

    await axios.post('/foodsummary/add', {
      "uid": globalUser.uid,
      "targetCalories": estimatedCals,
      "consumedCalories": 0,
      "date": '2023-08-01',
    })

    globalUser.userProfile.age = selectedAge;
    globalUser.userProfile.height = selectedHeight;
    globalUser.userProfile.weight = selectedWeight;
    globalUser.userProfile.sex = selectedGender;
    globalUser.userProfile.activityLevel = selectedActivityLevel;
    globalUser.userProfile.climate = selectedClimate;
    globalUser.isFirstLogin = false;
    
    setGlobalUser(globalUser);

    navigate('/');


  };

  const checkLogin = () => {
    if (!globalUser) {
      console.log('cond2')
      navigate('/login')
    }
  }

  useEffect(() => {
    checkLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Variables for all the user's input information
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedAge, setSelectedAge] = useState(0);
  const [selectedWeight, setSelectedWeight] = useState(0);
  const [selectedHeight, setSelectedHeight] = useState(0);
  const [selectedActivityLevel, setSelectedActivityLevel] = useState(null);   //sedentary, light, moderate, heavy
  const [selectedClimate, setSelectedClimate] = useState(null);               //hot, temperate, cold

  // User's preference for 'metric' or 'imperial' unit of measurement
  const [currentWeightUnit, setCurrentWeightUnit] = useState('metric');
  const [currentHeightUnit, setCurrentHeightUnit] = useState('metric');

  // Final calculated goal based on user input info 
  const [estimatedGoal, setEstimatedGoal] = useState(null);
  const [estimatedCals, setEstimatedCals] = useState(null);

  function calculateGoal(gender, age, weight, height, activityLevel, climate) {
    const BWF = gender === 'male' ? 35 : 31;

    let ageAdjustment = 0;
    switch (age) {
      case (age >= 4 && age <= 11):
        ageAdjustment = 100;
        break;
      case age <= 18:
        ageAdjustment = 70;
        break;
      case age <= 29:
        ageAdjustment = -35;
        break;
      case age <= 49:
        ageAdjustment = -30;
        break;
      case age >= 50:
        ageAdjustment = -25;
        break;
      default:
        ageAdjustment = 0;
    }

    const BWN = weight * BWF;

    let activityAdjustment = 0;
    switch (activityLevel) {
      case 'sedentary':
        activityAdjustment = 0;
        break;
      case 'light':
        activityAdjustment = 250;
        break;
      case 'moderate':
        activityAdjustment = 500;
        break;
      case 'heavy':
        activityAdjustment = 750;
        break;
      default:
        activityAdjustment = 0;
    }


    let climateAdjustment = 0;
    switch (climate) {
      case 'hot':
        climateAdjustment = 500;
        break;
      case 'temperate':
        climateAdjustment = 0;
        break;
      case 'cold':
        climateAdjustment = -250;
        break;
      default:
        climateAdjustment = 0;
    }

    const totalWaterGoal = (BWN + ageAdjustment + activityAdjustment + climateAdjustment);
    const goalInCups = totalWaterGoal / 250;
    return Math.round(goalInCups);
  }

  function calculateRecommendedCals(gender, age, weight, height, activityLevel, climate) {
    const BMR = 10 * weight + 6.25 * height - 5 * age + 5;

    let activityAdjustment = 0;
    switch (activityLevel) {
      case 'sedentary':
        activityAdjustment = 1.2;
        break;
      case 'light':
        activityAdjustment = 1.375;
        break;
      case 'moderate':
        activityAdjustment = 1.55;
        break;
      case 'heavy':
        activityAdjustment = 1.725;
        break;
      default:
        activityAdjustment = 0;
    }

    return Math.round(BMR * activityAdjustment);
  }


  const handleWeightUnitToggle = () => {
    if (currentWeightUnit === 'metric') {
      setCurrentWeightUnit('imperial');
      console.log('SWITCH TO IMPERIAL');
    }
    else if (currentWeightUnit === 'imperial') {
      setCurrentWeightUnit('metric');
      console.log('SWITCH TO METRIC');
    }
  }
  const handleHeightUnitToggle = () => {
    if (currentHeightUnit === 'metric') {
      setCurrentHeightUnit('imperial');
      console.log('SWITCHING TO IMPERIAL (HEIGHT)');
    }
    else if (currentHeightUnit === 'imperial') {
      setCurrentHeightUnit('metric');
      console.log('SWITCHING TO METRIC (HEIGHT)');
    }
  }

  let cardContent;
  switch (currentPage) {
    case 1:
      cardContent = (
        <Gender selectedGender={selectedGender} setSelectedGender={setSelectedGender} handleNextPage={handleNextPage} />
      );
      break;
    case 2:
      cardContent = (
        <Age selectedAge={selectedAge} setSelectedAge={setSelectedAge} handleNextPage={handleNextPage} />
      );
      break;
    case 3:
      cardContent = (
        <Weight selectedWeight={selectedWeight} setSelectedWeight={setSelectedWeight} handleNextPage={handleNextPage}
          handleWeightUnitToggle={handleWeightUnitToggle} currentWeightUnit={currentWeightUnit} />
      );
      break;
    case 4:
      cardContent = (
        <Height selectedHeight={selectedHeight} setSelectedHeight={setSelectedHeight} handleNextPage={handleNextPage}
          handleHeightUnitToggle={handleHeightUnitToggle} currentHeightUnit={currentHeightUnit} />
      );
      break;
    case 5:
      cardContent = (
        <ActivityLevel selectedActivityLevel={selectedActivityLevel} setSelectedActivityLevel={setSelectedActivityLevel}
          handleNextPage={handleNextPage} />
      );
      break;
    case 6:
      if (estimatedGoal) {
        setEstimatedGoal(null);
      }
      if (estimatedCals) {
        setEstimatedCals(null);
      }
      cardContent = (
        <Climate selectedClimate={selectedClimate} setSelectedClimate={setSelectedClimate} handleNextPage={handleNextPage} />
      );
      break;
    case 7:
      if (!estimatedCals) {
        setEstimatedCals(calculateRecommendedCals(selectedGender, selectedAge, selectedWeight, selectedHeight, selectedActivityLevel, selectedClimate));
      }
      cardContent = (
        <Calories estimatedCals={estimatedCals} handleNextPage={handleNextPage} />
      );
      break;
    case 8:
      if (!estimatedGoal) {
        setEstimatedGoal(calculateGoal(selectedGender, selectedAge, selectedWeight, selectedHeight, selectedActivityLevel, selectedClimate));
      }
      cardContent = (
        <Final estimatedGoal={estimatedGoal} finishSetup={finishSetup} />
      );
      break;
    default:
      cardContent = null;
  };

  const backGroundStyle = {
    backgroundColor: 'white',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };
  const cardBoxStyle = {
    bgcolor: 'white',
    borderRadius: '8px',
    width: '65vw',
    height: '75vh',
    // boxShadow: '0px 0px 50px 0px rgba(0,0,0,0.25)'
  }

  return (
    <div style={backGroundStyle}>
      <Box style={cardBoxStyle}>
        <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Container for the progress bar + forwards and backwards arrow buttons */}
          <IconButton onClick={handlePrevPage} disabled={currentPage === 1} color="primary" aria-label="back">
            <ArrowBackIcon />
          </IconButton>
          <IconButton onClick={handleNextPage} disabled={frontPage === currentPage} color="primary" aria-label="forward">
            <ArrowForwardIcon />
          </IconButton>
        </Box>
        <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '80%' }}>
          {/* This container holds the different card contents */}
          {currentPage <= 6 && (
            <Typography variant="body2" style={{ margin: '10px auto', color: '#4169e1' }}>
              {currentPage} of 6
            </Typography>
          )}
          {cardContent}
        </Box>
      </Box>
    </div>
  );
};

export default Setup;
