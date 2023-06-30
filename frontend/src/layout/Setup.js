import React, { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIcon from '@mui/icons-material/ArrowForwardIos';
import Gender from '../pages/Setup/Gender';
import Age from '../pages/Setup/Age';
import Weight from '../pages/Setup/Weight';
import Height from '../pages/Setup/Height';

const Setup = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [frontPage, setFrontPage] = useState(1);
    /* This is here to prevent users from using the ArrowForwardIcon button to move to next card
     when they haven't entered the required info. */

    const handleNextPage = () => {
      setCurrentPage(currentPage + 1);
      if (frontPage===currentPage) {
        setFrontPage(frontPage + 1);
      }
    };
    const handlePrevPage = () => {
      setCurrentPage(currentPage - 1);
    };
  

  // Keeps track of all the user's input information, passed to cardContent
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedAge, setSelectedAge] = useState(null);



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
          <Weight />
        );
        break;
    case 4:
      cardContent = (
        <Height />
      );
      break;
    default:
      cardContent = null;
  }



/*
    const [selectedGender, setSelectedGender] = useState(null);
    const [isNextButtonActive, setIsNextButtonActive] = useState(false);

    const handleGenderSelection = (gender) => {
        // Handles gender selection, activates next button
        setSelectedGender(gender);
        setIsNextButtonActive(true);
    };

    const handleNextButtonClick = () => {
        // Handle next button click logic here
        console.log('Next button clicked');
    };
*/

    return (
        <div style={{ backgroundColor: 'white', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ bgcolor: 'white', p: 3, borderRadius: '8px', width: '65vw', height: '75vh', padding: '0px', boxShadow: '0px 0px 50px 0px rgba(0,0,0,0.25)'}}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                {/* Container for the progress bar + forwards and backwards arrow buttons */}
                    <IconButton onClick={handlePrevPage} disabled={currentPage===1} color="primary" aria-label="back">
                        <ArrowBackIcon />
                    </IconButton>
                    <IconButton onClick={handleNextPage} disabled={frontPage===currentPage} color="primary" aria-label="forward">
                        <ArrowForwardIcon />
                    </IconButton>
                </Box>
                <Box sx={{ display: 'flex', flexDirection:'column', justifyContent:'center', height:'80%' }}>
                {/* This container holds the different card contents */}
                  {cardContent}
                </Box>
            </Box>
        </div>
    );
};

export default Setup;
