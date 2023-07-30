import React, { useState, useContext } from 'react';
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
import { UserContext } from '../../index';

const Setup = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [frontPage, setFrontPage] = useState(1);
  /* This is here to prevent users from using the ArrowForwardIcon button to move to next card
   when they haven't entered the required info. */
  const { globalUser } = useContext(UserContext);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
    console.log(selectedAge + ', ' + selectedGender + ', ' + selectedWeight + currentWeightUnit + ', ' + selectedHeight + currentHeightUnit + ', ' + selectedActivityLevel + ', ' + selectedClimate);

    if (frontPage === currentPage) {
      setFrontPage(frontPage + 1);
    }
  };
  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  // BACKEND NEEDS TO IMPLEMENT
  const finishSetup = () => {
    // 1. SAVE VARIABLES TO DB
    // 2. REDIRECT USER BACK TO MAIN PAGE

    console.log(`HERE: ${globalUser.uid}`);
  };



  // Variables for all the user's input information
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedAge, setSelectedAge] = useState(null);                       //child, teenager, earlyadult, lateadult, elder
  const [selectedWeight, setSelectedWeight] = useState(0);
  const [selectedHeight, setSelectedHeight] = useState(0);
  const [selectedActivityLevel, setSelectedActivityLevel] = useState(null);   //sedentary, light, moderate, heavy
  const [selectedClimate, setSelectedClimate] = useState(null);               //hot, temperate, cold

  // User's preference for 'metric' or 'imperial' unit of measurement
  const [currentWeightUnit, setCurrentWeightUnit] = useState('metric');
  const [currentHeightUnit, setCurrentHeightUnit] = useState('metric');

  // Final calculated goal based on user input info 
  const [estimatedGoal, setEstimatedGoal] = useState(null);

  function calculateGoal(gender, age, weight, height, activityLevel, climate) {
    const BWF = gender === 'male' ? 35 : 31;

    let ageAdjustment = 0;
    switch (age) {
      case 'child':
        ageAdjustment = 100;
        break;
      case 'teenager':
        ageAdjustment = 70;
        break;
      case 'earlyadult':
        ageAdjustment = -35;
        break;
      case 'lateadult':
        ageAdjustment = -30;
        break;
      case 'elderly':
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
    return Math.round(totalWaterGoal);
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
        <Weight selectedWeight={selectedWeight} setSelectedWeight={setSelectedWeight} handleNextPage={handleNextPage} handleWeightUnitToggle={handleWeightUnitToggle} currentWeightUnit={currentWeightUnit} />
      );
      break;
    case 4:
      cardContent = (
        <Height selectedHeight={selectedHeight} setSelectedHeight={setSelectedHeight} handleNextPage={handleNextPage} handleHeightUnitToggle={handleHeightUnitToggle} currentHeightUnit={currentHeightUnit} />
      );
      break;
    case 5:
      cardContent = (
        <ActivityLevel selectedActivityLevel={selectedActivityLevel} setSelectedActivityLevel={setSelectedActivityLevel} handleNextPage={handleNextPage} />
      );
      break;
    case 6:
      if (estimatedGoal) {
        setEstimatedGoal(null);
      }
      cardContent = (
        <Climate selectedClimate={selectedClimate} setSelectedClimate={setSelectedClimate} handleNextPage={handleNextPage} />
      );
      break;
    case 7:
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
          <Box>
            <Typography variant="h4" sx={{ textDecoration: 'underline' }}>First Time Setup</Typography>
          </Box>
          <IconButton onClick={handleNextPage} disabled={frontPage === currentPage} color="primary" aria-label="forward">
            <ArrowForwardIcon />
          </IconButton>
        </Box>
        <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '80%' }}>
          {/* This container holds the different card contents */}
          <Typography variant="body2" style={{ margin: '10px auto', color: '#4169e1' }}>
            {currentPage <= 6 && (
              <Typography>
                {currentPage} of 6
              </Typography>
            )}
          </Typography>
          {cardContent}
        </Box>
      </Box>
    </div>
  );
};

export default Setup;
