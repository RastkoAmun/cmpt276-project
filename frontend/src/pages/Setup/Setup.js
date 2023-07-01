import React, { useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIcon from '@mui/icons-material/ArrowForwardIos';
import Gender from './Gender';
import Age from './Age';
import Weight from './Weight';
import Height from './Height';

const Setup = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [frontPage, setFrontPage] = useState(1);
    /* This is here to prevent users from using the ArrowForwardIcon button to move to next card
     when they haven't entered the required info. */

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
    console.log(selectedAge+', '+selectedGender+', '+selectedWeight+currentWeightUnit+', '+selectedHeight+currentHeightUnit);

    if (frontPage===currentPage) {
      setFrontPage(frontPage + 1);
    }
  };
  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };


  

  // Variables for all the user's input information -- save to db
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedAge, setSelectedAge] = useState(null);
  const [selectedWeight, setSelectedWeight] = useState(0);
  const [selectedHeight, setSelectedHeight] = useState(0);

  // User's preference for 'metric' or 'imperial' unit of measurement -- save to db 
  const [currentWeightUnit, setCurrentWeightUnit] = useState('metric');
  const [currentHeightUnit, setCurrentHeightUnit] = useState('metric');

  const handleWeightUnitToggle = () => {
    if (currentWeightUnit==='metric') {
      setCurrentWeightUnit('imperial');
      console.log('SWITCH TO IMPERIAL');
    }
    else if (currentWeightUnit==='imperial') {
      setCurrentWeightUnit('metric');
      console.log('SWITCH TO METRIC');
    }
  }
  const handleHeightUnitToggle = () => {
    if (currentHeightUnit==='metric') {
      setCurrentHeightUnit('imperial');
      console.log('SWITCHING TO IMPERIAL (HEIGHT)');
    }
    else if (currentHeightUnit==='imperial') {
      setCurrentHeightUnit('metric');
      console.log('SWITCHING TO METRIC (HEIGHT)');
    }
  }

  let cardContent;
  switch (currentPage) {
    case 1:
      cardContent = (
        <Gender selectedGender={selectedGender} setSelectedGender={setSelectedGender} handleNextPage={handleNextPage}/>
      );
      break;
    case 2:
      cardContent = (
        <Age selectedAge={selectedAge} setSelectedAge={setSelectedAge} handleNextPage={handleNextPage}/>
      );
      break;
    case 3:
      cardContent = (
        <Weight selectedWeight={selectedWeight} setSelectedWeight={setSelectedWeight} handleNextPage={handleNextPage} handleWeightUnitToggle={handleWeightUnitToggle} currentWeightUnit={currentWeightUnit}/>
      );
      break;
    case 4:
      cardContent = (
        <Height selectedHeight={selectedHeight} setSelectedHeight={setSelectedHeight} handleNextPage={handleNextPage} handleHeightUnitToggle={handleHeightUnitToggle} currentHeightUnit={currentHeightUnit}/>
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
        <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Container for the progress bar + forwards and backwards arrow buttons */}
          <IconButton onClick={handlePrevPage} disabled={currentPage===1} color="primary" aria-label="back">
            <ArrowBackIcon />
          </IconButton>
          <IconButton onClick={handleNextPage} disabled={frontPage===currentPage} color="primary" aria-label="forward">
            <ArrowForwardIcon />
          </IconButton>
        </Box>
        <Box style={{ display: 'flex', flexDirection:'column', justifyContent:'center', height:'80%' }}>
        {/* This container holds the different card contents */}
          <Typography variant="body2" style={{margin:'10px auto', color:'#4169e1'}}>
            {currentPage} of 8
          </Typography>
          {cardContent}
        </Box>
      </Box>
    </div>
  );
};

export default Setup;
