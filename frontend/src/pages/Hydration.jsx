import React, { useState } from 'react'
import { Box, Button, Stack, TextField, Typography } from '@mui/material'


const Hydration = () => {
  const [goal, setGoal] = useState(0);
  // const [goalValidation, setGoalValidation] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleGoal = (event) => {
    setGoal(event.target.value)
  }

  const submitGoal = () => {
    // if (goal > 15 || goal < 5) {
    //   setGoalValidation(true);
    // }
    // setGoal(goal)
    setSubmitted(true);
  }


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
                  // error={goalValidation ? true : false}
                  sx={{ flexGrow: 1 }}
                />

              </Box>
              <Box display='flex' justifyContent='flex-end' mt={1} width='80%'>
                <Button variant='outlined' onClick={submitGoal}
                  sx={{ justifySelf: 'center' }}>
                  Submit
                </Button>
              </Box>
            </>
            :
            <>
              <Box display='flex' alignItems='center' width='80%'>
                <Typography variant='h5' mr={3}> Goal: </Typography>
                <Typography variant='h4' mr={3} color='primary'> {goal} </Typography>
                <Button variant='outlined' onClick={() => setSubmitted(false)}>Edit Goal</Button>
              </Box>
            </>}
          <Box display='flex' alignItems='center' mt={8}>
            <Typography variant='h5' mr={3}> Current: {0}</Typography>
            {/* <Typography */}
          </Box>
        </Box>


        <Box display='flex' flexDirection='column' alignItems='center' width='20%'>
          <Typography variant='body2' mb={3}> {10} more cups to go! </Typography>
          <Box width='100px' height='320px'
            sx={{ border: '1px solid black', borderRadius: 2 }}>
            { }

          </Box>
        </Box>

      </Stack>
    </>
  )
}

export default Hydration