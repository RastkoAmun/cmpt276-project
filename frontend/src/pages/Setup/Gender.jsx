import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import ManIcon from '../../images/man-thinking-svgrepo-com.svg'
import WomanIcon from '../../images/woman-with-hand-on-chin-svgrepo-com.svg'

const Gender = ({ selectedGender, setSelectedGender, handleNextPage }) => {
    const handleGenderSelection = (gender) => {
        setSelectedGender(gender);
    };

    const handleNextButtonClick = () => {
        if (selectedGender) {
            handleNextPage();
        }
    };
    
    return (
        <Box>
            <Box sx={{ paddingLeft: '10vw', paddingRight: '10vw' }}>
                {/* Container for text */}
                <Typography variant="h5" align="center" mb={2} fontWeight="bold" sx={{ marginBottom: '5px' }}>
                    Choose your gender
                </Typography>
                <Typography variant="body2" align="center" mb={2} sx={{ margin: '0 auto 16px', maxWidth: '250px'}}>
                    Tell us more about you so we can tailor the experience to suit your needs.
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                {/* Container for gender buttons */}
                <Button
                sx={{
                    width: '180px',
                    padding: '25px',
                    paddingBottom: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    border: '2px solid',
                    borderColor: selectedGender === 'male' ? '#4169e1' : '#ebebeb',
                    boxShadow: selectedGender === 'male' ? '0px 0px 10px #4169e1' : 'none',
                    mr: 1,
                    textTransform: 'none',
                    color: 'black'
                }}
                onClick={() => handleGenderSelection('male')}
                >
                <img src={ManIcon} alt="Man Icon" style={{ marginBottom: '15px', height: '100px' }} />
                Male
                </Button>
                <Button
                sx={{
                    width: '180px',
                    padding: '25px',
                    paddingBottom: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    border: '2px solid',
                    borderColor: selectedGender === 'female' ? '#4169e1' : '#ebebeb',
                    boxShadow: selectedGender === 'female' ? '0px 0px 10px #4169e1' : 'none',
                    mr: 1,
                    textTransform: 'none',
                    color: 'black'
                }}
                onClick={() => handleGenderSelection('female')}
                >
                <img src={WomanIcon} alt="Woman Icon" style={{ marginBottom: '15px', height: '100px' }} />
                Female
                </Button>
            </Box>
            <Box sx={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}>
                {/* Container for next button */}
                <Button
                sx={{
                    textTransform: 'none',
                    minWidth: '15em',
                    backgroundColor: selectedGender ? '#4169e1' : '#D3D3D3',
                    color: 'white',
                    mt: 2
                }}
                onClick={handleNextButtonClick}
                disabled={!selectedGender}
                >
                Next
                </Button>
            </Box>
        </Box>
    );
};

export default Gender;
