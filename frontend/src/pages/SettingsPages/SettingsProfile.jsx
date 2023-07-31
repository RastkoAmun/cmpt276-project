import React, { useState, useContext, useEffect } from 'react'
import { Typography, Box, FormControl, Button, Select, MenuItem, TextField, InputAdornment, Snackbar, IconButton, Card } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { UserContext } from '../../index'
import { useTheme } from '@mui/material/styles'

const SettingsProfile = () => {

  const theme = useTheme();

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

  const { globalUser, setGlobalUser } = useContext(UserContext);

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
    setSelectedWeight(res.data.userProfile.weight);

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

    if (selectedHeight < 9 || selectedHeight > 227) {
      setOpenHeightError(true);
      return false;
    }

    if (selectedWeight < 1 || selectedWeight > 227) {
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
    }, { withCredentials: true })

    // Trigger refresh of mainpage to reflect changes
    globalUser.userProfile.age = selectedAge;
    globalUser.userProfile.height = selectedHeight;
    globalUser.userProfile.weight = selectedWeight;
    globalUser.userProfile.sex = selectedGender;
    globalUser.userProfile.activityLevel = selectedActivityLevel;
    globalUser.userProfile.climate = selectedClimate;
    console.log(globalUser)
    setGlobalUser(globalUser);

    setOpen(true);
    setRefresh(refresh + 1);
  }

  useEffect(() => {
    fetchProfileAndSetState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh])

  return (
    <>
    <Card sx={{p: 5}}>
      <Box display="flex" justifyContent="center">
      
        <Box display="flex" sx={{ flexDirection: 'column', width: '40%', marginRight: '50px'}}>

          <Box display='flex' flexDirection='column'>
            <Typography variant='body2' component='div' p={1.5} pl={0} pb={1}
              >
              Gender
            </Typography>
            <FormControl>
              <Select
                size="small"
                id="dropdown-input"
                value={selectedGender}
                onChange={handleGender}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
            </FormControl>

          </Box>

          <Box display='flex' flexDirection='column' >
            <Typography variant='body2' component='div' p={1.5} pl={0} pb={1}
              >
              Age
            </Typography>
            <TextField
              size="small"
              type="number"
              value={selectedAge}
              onChange={handleAge}
              inputProps={{ min: 0, max: 100 }}
            />
          </Box>

          <Box display='flex' flexDirection='column'>
              <Typography variant='body2' component='div' p={1.5} pb={1} pl={0}
                >
                Height
              </Typography>
            <TextField
              size="small"
              type="number"
              value={selectedHeight}
              onChange={handleHeight}
              InputProps={{ endAdornment: <InputAdornment position="end">cm</InputAdornment>, min: 9, max: 227 }}
            />
          </Box>
          <Button variant='contained' color='primary' onClick={submit} sx={{ fontSize: '1rem', mb: '2vh',mt: '7vh', width: '150px',textTransform: 'none', padding: '10px' }}>
            Save
          </Button>
        </Box>

        <Box display="flex" sx={{ flexDirection: 'column', width: '40%', marginLeft:'50px' }}>

          <Box display='flex' flexDirection='column'>
            <Typography variant='body2' component='div' p={1.5} pl={0} pb={1}
              >
              Weight
            </Typography>
            <TextField
              size="small"
              type="number"
              value={selectedWeight}
              onChange={handleWeight}
              InputProps={{ endAdornment: <InputAdornment position="end">kg</InputAdornment>, min: 1, max: 227 }}
            />
          </Box>

          <Box display='flex' flexDirection='column'>
            <Typography variant='body2' component='div' p={1.5} pl={0} pb={1}
              >
              Activity Level
            </Typography>
            <FormControl>
              <Select
                size="small"
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

          <Box display='flex' flexDirection='column'>
            <Typography variant='body2' component='div' p={1.5} pl={0} pb={1}
              >
              Climate
            </Typography>
            <FormControl>
              <Select
                size="small"
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


        </Box>

    
      </Box>
    

      <Snackbar open={open} autoHideDuration={3000} message="User profile changes saved!" onClose={handleClose} action={action(handleClose)} ContentProps={{ sx: { backgroundColor: 'green' } }} />
      <Snackbar open={openAgeError} autoHideDuration={3000} message="Age must be between 0 and 100." onClose={handleCloseAgeError} action={action(handleCloseAgeError)} ContentProps={{ sx: { backgroundColor: 'red' } }} />
      <Snackbar open={openHeightError} autoHideDuration={3000} message="Height must be between 30 and 300." onClose={handleCloseHeightError} action={action(handleCloseHeightError)} ContentProps={{ sx: { backgroundColor: 'red' } }} />
      <Snackbar open={openWeightError} autoHideDuration={3000} message="Weight must be between 1 and 2000." onClose={handleCloseWeightError} action={action(handleCloseWeightError)} ContentProps={{ sx: { backgroundColor: 'red' } }} />
    </Card>
    </>
  )
}

export default SettingsProfile