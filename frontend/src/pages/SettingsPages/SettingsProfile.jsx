import React, { useState, useContext, useEffect } from 'react'
import { Typography, Box, FormControl, Button, Select, MenuItem, TextField, InputAdornment, Snackbar, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { UserContext } from '../../index'

const SettingsProfile = () => {
  // Obtain default values from user !!
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedAge, setSelectedAge] = useState("");
  const [selectedHeight, setSelectedHeight] = useState("");
  const [selectedActivityLevel, setSelectedActivityLevel] = useState("");
  const [selectedClimate, setSelectedClimate] = useState("");
  const [open, setOpen] = useState(false);

  const { globalUser } = useContext(UserContext);

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
    const { value } = event.target;
    setSelectedHeight(value);
  }
  const handleAge = (event) => {
    const { value } = event.target;
    setSelectedAge(value);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  )

  const fetchProfileAndSetState = async () => {
    if (!globalUser) {
      return;
    }

    const res = await axios.post('http://localhost:8080/user/profile', {
      "uid": globalUser.uid
    })

    setSelectedAge(res.data.userProfile.age);
    setSelectedHeight(res.data.userProfile.height);
    setSelectedGender(res.data.userProfile.sex.toLowerCase());
    setSelectedClimate(res.data.userProfile.climate.toLowerCase());
    setSelectedActivityLevel(res.data.userProfile.activityLevel.toLowerCase());
  }

  const submit = async () => {
    if (!globalUser) {
      return;
    }

    await axios.patch('http://localhost:8080/user/profile', {
      "uid": globalUser.uid,
      "age": selectedAge,
      "height": selectedHeight,
      "sex": selectedGender,
      "activityLevel": selectedActivityLevel,
      "climate": selectedClimate
    })

    setOpen(true);
  }

  useEffect(() => {
    fetchProfileAndSetState();
  })

  return (
    <>
      <Box>
        <Box sx={{ backgroundColor: 'red', height: '300px' }}>
          <Typography variant="h1">
            PLACEHOLDER
          </Typography>

        </Box>
        <Box>

          <Box display="flex">
            <Box display='flex' sx={{ alignItems: 'center', justifyContent: 'center', width: 1 / 5 }}>
              <Typography>
                Gender
              </Typography>
            </Box>
            <FormControl>
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

          <Box display='flex'>
            <Box display='flex' sx={{ alignItems: 'center', justifyContent: 'center', width: 1 / 5 }}>
              <Typography>
                Age
              </Typography>
            </Box>
            <TextField
              type="number"
              value={selectedAge}
              onChange={handleAge}
            />
          </Box>

          <Box display="flex">
            <Box display='flex' sx={{ alignItems: 'center', justifyContent: 'center', width: 1 / 5 }}>
              <Typography>
                Height
              </Typography>
            </Box>
            <TextField
              type="number"
              value={selectedHeight}
              onChange={handleHeight}
              InputProps={{ endAdornment: <InputAdornment position="end">cm</InputAdornment>, }}
            />
          </Box>

          <Box display="flex">
            <Box display='flex' sx={{ alignItems: 'center', justifyContent: 'center', width: 1 / 5 }}>
              <Typography>
                Activity Level
              </Typography>
            </Box>
            <FormControl>
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

          <Box display="flex">
            <Box display='flex' sx={{ alignItems: 'center', justifyContent: 'center', width: 1 / 5 }}>
              <Typography>
                Climate
              </Typography>
            </Box>
            <FormControl>
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

          <Button onClick={submit}>
            Save changes
          </Button>

          <Typography>
            *Whenever user changes any of their info, we should recalculate their recommended water intake
          </Typography>
          <Typography>
            *Weight must be changed in the Weight Progress page, not here
          </Typography>



        </Box>
      </Box>
      <Snackbar open={open} autoHideDuration={6000} message="User profile changes saved!" onClose={handleClose} action={action} ContentProps={{ sx: { backgroundColor: 'green' } }} />
    </>
  )
}

export default SettingsProfile