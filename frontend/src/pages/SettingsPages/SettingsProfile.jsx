import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Typography, Box, FormControl, Button, Select, MenuItem, TextField, InputAdornment, Input } from '@mui/material'

const SettingsProfile = () => {
  // Obtain default values from user !!
  const [selectedGender, setSelectedGender] = useState('male');
  const [selectedWeight, setSelectedWeight] = useState('500');
  const [selectedAge, setSelectedAge] = useState('32');
  const [selectedHeight, setSelectedHeight] = useState('100'); 
  const [selectedActivityLevel, setSelectedActivityLevel] = useState('sedentary');
  const [selectedClimate, setSelectedClimate] = useState('temperate');

  const handleGender = (event) => {
    setSelectedGender(event.target.value);
  };
  const handleActivityLevel = (event) => {
    setSelectedActivityLevel(event.target.value);
  };
  const handleClimate = (event) => {
    setSelectedClimate(event.target.value);
  }
  const handleHeight = (event) => {
    const { value} = event.target;
    setSelectedHeight(value);
  }
  const handleAge = (event) => {
    const {value} = event.target;
    setSelectedAge(value);
  }


  const navigate = useNavigate();
  const handleEditClick = () => {
    navigate('/weight');
  };



  return (
    <Box>
      <Box style={{backgroundColor: 'red', height:'300px'}}>
        <Typography variant="h1">
          PLACEHOLDER
        </Typography>

      </Box>
      <Box>

        <Box style={{display: 'flex'}}>
          <Typography>
            Gender
          </Typography>
          <FormControl style={{width:'100%'}}>
            <Select
              id="dropdown-input"
              value={selectedGender}
              onChange={handleGender}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
          </FormControl>
        </Box>

{/*  
        <Box style={{display: 'flex'}}>
          <Typography>
            Weight
          </Typography>
          <TextField
            type="text"
            value={selectedWeight}
            variant="standard"
            sx={{
              '& .MuiOutlinedInput-root': {
                border: 'none',
              },
              '& .MuiInputBase-input': {
                borderBottom: 'none',
              },
            }}
            InputProps={{disableUnderline: true, readOnly: true, endAdornment: <InputAdornment position="end">kg</InputAdornment>,}}
          />
          <Button onClick={handleEditClick}>
            Edit
          </Button>
        </Box>
*/}

        <Box style={{display: 'flex'}}>
          <Typography>
            Age
          </Typography>
          <TextField
            type="number"
            value={selectedAge}
            onChange={handleAge}
          />
        </Box>

        <Box style={{display: 'flex'}}>
          <Typography>
            Height
          </Typography>
          <TextField
            type="number"
            value={selectedHeight}
            onChange={handleHeight}
            InputProps={{endAdornment: <InputAdornment position="end">cm</InputAdornment>,}}
          />
        </Box>

        <Box style={{display: 'flex'}}>
          <Typography>
            Activity Level
          </Typography>
          <FormControl style={{width:'100%'}}>
            <Select
              id="dropdown-input"
              value={selectedActivityLevel}
              onChange={handleActivityLevel}
            >
              <MenuItem value="sedentary">Sedentary</MenuItem>
              <MenuItem value="light">Light</MenuItem>
              <MenuItem value="moderate">Moderate</MenuItem>
              <MenuItem value="heavy">Heavy</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box style={{display: 'flex'}}>
          <Typography>
            Climate
          </Typography>
          <FormControl style={{width:'100%'}}>
            <Select
              id="dropdown-input"
              value={selectedClimate}
              onChange={handleClimate}
            >
              <MenuItem value="hot">Hot</MenuItem>
              <MenuItem value="temperate">Temperate</MenuItem>
              <MenuItem value="cold">Cold</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Button>
          Save changes
        </Button>

        <Typography>
          Whenever user changes any of their info, we should recalculate their recommended water intake
        </Typography>

      </Box>
    </Box>
  )
}

export default SettingsProfile