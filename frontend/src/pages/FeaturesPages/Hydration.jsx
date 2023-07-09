import React, { useCallback } from 'react';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../index';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  Fab,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

const Hydration = () => {
  const [goal, setGoal] = useState(0);
  const [glassesLeft, setGlassesLeft] = useState(goal);
  const [current, setCurrent] = useState(0);

  const [invalidGoal, setInvalidGoal] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { globalUser } = useContext(UserContext);

  const theme = useTheme();
  const navigate = useNavigate();

  const handleGoal = useCallback((event) => {
    setGoal(event.target.value)
  }, [])

  useEffect(() => {
    if (globalUser) {
      const fetchGoal = async () => {
        try {
          const response = await fetch(`http://localhost:8080/hydration?uid=${globalUser.uid}`)
          console.log(response)
          if (!response.ok) {
            if (response.status === 404) setInvalidGoal(true);
            else throw new Error(`Error! status: ${response.status}`);
          }
          else {
            const data = await response.json();
            const user = data[0];
            const dif = user.goal - user.intake;

            setGoal(user.goal);
            setCurrent(user.intake);
            setGlassesLeft(dif);
            setInvalidGoal(false);
            setSubmitted(true);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

      fetchGoal();
    } else {
      navigate("/login");
    }
  }, [globalUser, navigate]);




  

  const submitGoal = async () => {
    if (goal > 20 || goal < 6) {
      setInvalidGoal(true);
    } else {
      setGoal(goal);
      setSubmitted(true);
      setInvalidGoal(false);
      setGlassesLeft(goal);

      let date = new Date();
      const options = { month: 'short', day: '2-digit', year: 'numeric' };
      date = date.toLocaleDateString('en-US', options);

      try {
        const myData =
        {
          "uid": globalUser.uid,
          "goal": goal,
          "intake": current,
          "intakeDate": date
        }

        let response;
        if (submitted === true) {
          response = await fetch('http://localhost:8080/hydration', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(myData),
          });
        } else {
          response = await fetch(`http://localhost:8080/hydration/${globalUser.uid}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(myData),
          });
        }

        // if (!response.ok) {
        //   throw new Error(`Error! status: ${response.status}`);
        // }

      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const addWater = async () => {
    if (current < goal) {
      setCurrent(current + 1);
      setGlassesLeft(glassesLeft - 1);

      console.log("useridg", globalUser.uid);

      let date = new Date();
      const options = { month: 'short', day: '2-digit', year: 'numeric' };
      date = date.toLocaleDateString('en-US', options);

      try {
        const myData = {
          uid: globalUser.uid,
          intake: current + 1,
          intakeDate: date
        };

        const response = await fetch('http://localhost:8080/hydration/update', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(myData),
        });

        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      setCurrent(goal);
    }
  };

  let i = goal;
  const height = 320 / i;

  return (
    <>
      <Typography variant='h2'> Hydration </Typography>
      <Stack direction='row' mt={5}>
        <Box width='50%' p={5}>
          {!submitted
            ?
            <>
              <Box display='flex' alignItems='center' width='80%'>
                <Typography variant='h5' mr={3}> GOAL: </Typography>
                <TextField
                  type='number'
                  size='small'
                  value={goal}
                  onChange={handleGoal}
                  error={invalidGoal ? true : false}
                  sx={{ flexGrow: 1 }}
                />
              </Box>
              <Box
                display='flex'
                justifyContent='flex-end'
                mt={1} width='80%'>
                <Button variant='outlined' onClick={submitGoal}
                  sx={{ justifySelf: 'center' }}>
                  Submit
                </Button>
              </Box>
              {invalidGoal && <Typography variant='subtitle2' color='error' width='80%' mt={2}>
                * INVALID: Recommended water intake is at least 6 glasses, up to 20 glasses
              </Typography>}
            </>
            :
            <>
              <Box
                display='flex'
                justifyContent='center'
                alignItems='center'
                width='100%'>
                <>
                  <Typography variant='h5' mr={3}> Goal: </Typography>
                  <Typography variant='h4' mr={3} color='primary'> {goal} </Typography>
                </>
                <Fab
                  color="primary"
                  aria-label="add"
                  size='small'
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