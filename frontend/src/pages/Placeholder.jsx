import React, { useState } from 'react';
import { Box, Button, Typography, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIcon from '@mui/icons-material/ArrowForwardIos';
import ManIcon from '../images/man-thinking-svgrepo-com.svg'
import WomanIcon from '../images/woman-with-hand-on-chin-svgrepo-com.svg'


const Placeholder = () => {
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


    return (
        <div style={{ backgroundColor: 'white', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ bgcolor: 'white', p: 3, borderRadius: '8px', width: '65vw', height: '75vh', padding: '0px', boxShadow: '0px 0px 50px 0px rgba(0,0,0,0.25)'}}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <IconButton color="primary" aria-label="back">
                        <ArrowBackIcon />
                    </IconButton>
                    <IconButton color="primary" aria-label="forward">
                        <ArrowForwardIcon />
                    </IconButton>
                </Box>
                <Box sx={{ display: 'flex', flexDirection:'column', justifyContent:'center', height:'80%' }}>
                {/* This container holds all the elements EXCEPT the progress bar at the top */}
                    <Box sx={{ paddingLeft: '10vw', paddingRight: '10vw'}}>
                    {/* Container for text */}
                        <Typography variant="h5" align="center" mb={2} fontWeight = "bold" sx={{ marginBottom: '5px' }}>
                        Choose your gender
                        </Typography>
                        <Typography variant="body2" align="center" mb={2}>
                        Tell us more about you so we can tailor the experience to suit your needs.
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    {/* Container for gender buttons */}
                        <Button sx={{ width: '180px', padding: '25px', paddingBottom: '10px', display: 'flex', flexDirection: 'column', border: '2px solid',borderColor: selectedGender === 'male' ? '#4169e1' : '#ebebeb',boxShadow: selectedGender === 'male' ? '0px 0px 10px #4169e1' : 'none',mr: 1, textTransform: 'none', color: 'black'}}onClick={() => handleGenderSelection('male')}>
                            <img src={ManIcon} alt="Man Icon" style={{ marginBottom: '15px', height: '100px' }} /> 
                            Male
                        </Button>
                        <Button sx={{ width: '180px', padding: '25px', paddingBottom: '10px', display: 'flex', flexDirection: 'column', border: '2px solid',borderColor: selectedGender === 'female' ? '#4169e1' : '#ebebeb',boxShadow: selectedGender === 'female' ? '0px 0px 10px #4169e1' : 'none',mr: 1, textTransform: 'none', color: 'black'}}onClick={() => handleGenderSelection('female')}>
                            <img src={WomanIcon} alt="Woman Icon" style={{ marginBottom: '15px', height: '100px' }} />
                            Female
                        </Button>
                    </Box>
                    <Box sx={{ marginTop:'10px', display: 'flex', justifyContent: 'center' }}>
                    {/* Container for next button */}
                        <Button sx={{textTransform: 'none', minWidth: '15em', backgroundColor: isNextButtonActive ? '#4169e1' : '#D3D3D3',color: 'white',mt: 2,}}onClick={handleNextButtonClick}disabled={!isNextButtonActive}>
                            Next
                        </Button>
                    </Box>
                </Box>
            </Box>
        </div>
    );
};

export default Placeholder;
