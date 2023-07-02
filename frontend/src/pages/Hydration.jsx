import React, { useState } from 'react'
import { Box, Button, Fab, Stack, TextField, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';


const Hydration = () => {
  const [goal, setGoal] = useState(0);
  const [goalValidation, setGoalValidation] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [glassesLeft, setGlassesLeft] = useState(goal);
  const [current, setCurrent] = useState(0);

  const theme = useTheme();

  const handleGoal = (event) => {
    setGoal(event.target.value)
  }

  const submitGoal = () => {
    if (goal > 20 || goal < 6) {
      setGoalValidation(true);
    }
    else {
      setGoal(goal)
      setSubmitted(true);
      setGoalValidation(false);
      setGlassesLeft(goal-current)
    }
  }

  const addWater = () => {
    if(current < goal) {
      setCurrent(current + 1);
      setGlassesLeft(glassesLeft - 1)
    }
    else setCurrent(goal);
  }

  let i = goal;
  const height = 320 / i;

  return (
    <>
      <Typography variant='h3'>
        Hydration
      </Typography>
      <Stack direction='row' mt={5}>
        <Box width='50%' p={5}>
          {!submitted
            ?
            <>
              <Box display='flex' alignItems='center' width='80%'>
                <Typography variant='h5' mr={3}> GOAL: </Typography>
                <TextField type='number' variant="outlined" size='small'
                  value={goal} onChange={handleGoal}
                  error={goalValidation ? true : false}
                  sx={{ flexGrow: 1 }}
                />

              </Box>
              <Box display='flex' justifyContent='flex-end' mt={1} width='80%'>
                <Button variant='outlined' onClick={submitGoal}
                  sx={{ justifySelf: 'center' }}>
                  Submit
                </Button>
              </Box>
              {goalValidation && <Typography variant='subtitle2' color='error' width='80%' mt={2}>
                * INVALID: Recommended water intake is at least 6 glasses, up to 20 glasses
              </Typography>}
            </>
            :
            <>
              <Box display='flex' alignItems='center' width='100%'
                justifyContent='center'>
                <>
                  <Typography variant='h5' mr={3}> Goal: </Typography>
                  <Typography variant='h4' mr={3} color='primary'> {goal} </Typography>
                </>
                <Fab color="primary" aria-label="add" size='small'
                  onClick={() => setSubmitted(false)}>
                  <EditIcon />
                </Fab>
              </Box>
            </>}

          {submitted &&
            <Box display='flex' flexDirection='column' mt={8}>
              <Box display='flex' flexDirection='row'
                alignItems='center' justifyContent='center' mt={5}>
                <Fab color="primary" aria-label="add" size='large'
                  onClick={addWater}>
                  <AddIcon />
                </Fab>
                <Typography variant='subtitle1' ml={2}> Add cup of water </Typography>
              </Box>
            </Box>}
        </Box>


        <Box display='flex' flexDirection='column' alignItems='center' width='20%'>
          <Typography variant='body2' mb={3}> {glassesLeft} more glasses to go! </Typography>
          <Box width='100px' height='320px' display='flex' flexDirection='column-reverse'
            sx={{ border: '1px solid black', borderRadius: '5px' }}>
            {(
              Array.from({ length: i }).map((_, index) => {
                const topBorderRadius = index === i - 1 ? '5px' : '0px';
                const bottomBorderRadius = index === 0 ? '5px' : '0px';

                const boxStyle = {
                  bgcolor: `${current > index ? theme.palette.primary.main : 'white'}`,
                  borderBottomLeftRadius: bottomBorderRadius,
                  borderBottomRightRadius: bottomBorderRadius,
                  borderTopLeftRadius: topBorderRadius,
                  borderTopRightRadius: topBorderRadius
                }

                return (
                  <Box width='100%' height={`${height}px`} key={index}
                    sx={boxStyle}>
                  </Box>)
              })
            )}
          </Box>
          <Typography variant='body2' mb={3}> Current: {current} </Typography>
        </Box>

      </Stack>
    </>
  )
}

export default Hydration