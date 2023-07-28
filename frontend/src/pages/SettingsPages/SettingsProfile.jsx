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
  const [selectedWeight, setSelectedWeight] = useState("");
  const [selectedActivityLevel, setSelectedActivityLevel] = useState("");
  const [selectedClimate, setSelectedClimate] = useState("");
  const [refresh, setRefresh] = useState(0);
  const [open, setOpen] = useState(false);
  const [openAgeError, setOpenAgeError] = useState(false);
  const [openHeightError, setOpenHeightError] = useState(false);
  const [openWeightError, setOpenWeightError] = useState(false);

  const { globalUser } = useContext(UserContext);

  const handleGender = (event) => {
    setSelectedGender(event.target.value);
  }

  const handleActivityLevel = (event) => {
    setSelectedActivityLevel(event.target.value);
  }

  const handleClimate = (event) => {
    setSelectedClimate(event.target.value);
  }

  const handleHeight = (event) => {
    const { value } = event.target;
    setSelectedHeight(value);
  }

  const handleWeight = (event) => {
    const { value } = event.target;
    setSelectedWeight(value);
  }

  const handleAge = (event) => {
    const { value } = event.target;
    setSelectedAge(value);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleCloseAgeError = () => {
    setOpenAgeError(false);
  }

  const handleCloseHeightError = () => {
    setOpenHeightError(false);
  }

  const handleCloseWeightError = () => {
    setOpenWeightError(false);
  }

  const action = (func) => {
    return (
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={func}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    )
  }

  const fetchProfileAndSetState = async () => {
    if (!globalUser) {
      return;
    }

    const res = await axios.post('http://localhost:8080/user/profile', {
      "uid": globalUser.uid
    })

    setSelectedAge(res.data.userProfile.age);
    setSelectedHeight(res.data.userProfile.height);

    if (res.data.userProfile.sex)
      setSelectedGender(res.data.userProfile.sex.toLowerCase())

    if (res.data.userProfile.activityLevel)
      setSelectedActivityLevel(res.data.userProfile.activityLevel.toLowerCase())

    if (res.data.userProfile.climate)
      setSelectedClimate(res.data.userProfile.climate.toLowerCase())

  }

  const validateInputs = () => {
    if (selectedAge < 0 || selectedAge > 100) {
      setOpenAgeError(true);
      return false
    }

    if (selectedHeight < 30 || selectedHeight > 300) {
      setOpenHeightError(true);
      return false;
    }

    if (selectedWeight < 1 || selectedHeight > 2000) {
      setOpenWeightError(true);
      return false;
    }

    return true;
  }

  const submit = async () => {
    if (!globalUser) {
      return;
    }

    if (!validateInputs()) {
      return;
    }

    // Make sure error snackbars are closed
    setOpenAgeError(false);
    setOpenHeightError(false);

    await axios.patch('http://localhost:8080/user/profile', {
      "uid": globalUser.uid,
      "age": selectedAge,
      "height": selectedHeight,
      "weight": selectedWeight,
      "sex": selectedGender || null,
      "activityLevel": selectedActivityLevel || null,
      "climate": selectedClimate || null
    })

    setOpen(true);
    setRefresh(refresh + 1);
  }

  useEffect(() => {
    fetchProfileAndSetState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh])

  return (
    <>
      <Box display="flex" sx={{ flexDirection: 'column', alignItems: 'start' }}>
        <Box display="flex" sx={{ flexDirection: 'column' }}>
          <Box display="flex">
            <Box display='flex' sx={{ alignItems: 'center', justifyContent: 'center', width: 1 / 2 }}>
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
            <Box display='flex' sx={{ alignItems: 'center', justifyContent: 'center', width: 1 / 2 }}>
              <Typography>
                Age
              </Typography>
            </Box>
            <TextField
              type="number"
              value={selectedAge}
              onChange={handleAge}
              inputProps={{ min: 0, max: 100 }}
            />
          </Box>

          <Box display="flex">
            <Box display='flex' sx={{ alignItems: 'center', justifyContent: 'center', width: 1 / 2 }}>
              <Typography>
                Height
              </Typography>
            </Box>
            <TextField
              type="number"
              value={selectedHeight}
              onChange={handleHeight}
              InputProps={{ endAdornment: <InputAdornment position="end">cm</InputAdornment>, min: 1, max: 300 }}
              sx={{ width: 1 / 2 }}
            />
          </Box>

          <Box display="flex">
            <Box display='flex' sx={{ alignItems: 'center', justifyContent: 'center', width: 1 / 2 }}>
              <Typography>
                Weight
              </Typography>
            </Box>
            <TextField
              type="number"
              value={selectedWeight}
              onChange={handleWeight}
              InputProps={{ endAdornment: <InputAdornment position="end">lbs</InputAdornment>, min: 1, max: 2000 }}
              sx={{ width: 1 / 2 }}
            />
          </Box>

          <Box display="flex">
            <Box display='flex' sx={{ alignItems: 'center', justifyContent: 'center', width: 1 / 2 }}>
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
            <Box display='flex' sx={{ alignItems: 'center', justifyContent: 'center', width: 1 / 2 }}>
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

          <Button onClick={submit} sx={{ fontSize: '1.5rem', my: '3vh' }}>
            Save changes
          </Button>
        </Box>
      </Box>
      <Snackbar open={open} autoHideDuration={3000} message="User profile changes saved!" onClose={handleClose} action={action(handleClose)} ContentProps={{ sx: { backgroundColor: 'green' } }} />
      <Snackbar open={openAgeError} autoHideDuration={3000} message="Age must be between 0 and 100." onClose={handleCloseAgeError} action={action(handleCloseAgeError)} ContentProps={{ sx: { backgroundColor: 'red' } }} />
      <Snackbar open={openHeightError} autoHideDuration={3000} message="Height must be between 30 and 300." onClose={handleCloseHeightError} action={action(handleCloseHeightError)} ContentProps={{ sx: { backgroundColor: 'red' } }} />
      <Snackbar open={openWeightError} autoHideDuration={3000} message="Weight must be between 1 and 2000." onClose={handleCloseWeightError} action={action(handleCloseWeightError)} ContentProps={{ sx: { backgroundColor: 'red' } }} />
    </>
  )
}

export default SettingsProfile