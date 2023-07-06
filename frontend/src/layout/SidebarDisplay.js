import React, { useContext } from 'react'
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
} from '@mui/material';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import SettingsIcon from '@mui/icons-material/Settings';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as Logo } from '../images/logo.svg';
import { UserContext } from '../index'

const list = [
  { title: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { title: 'Food', icon: <LocalDiningIcon />, path: '/food' },
  { title: 'Sleep', icon: <BedtimeIcon />, path: '/sleep' },
  { title: 'Exercise', icon: <FitnessCenterIcon />, path: '/exercise' },
  { title: 'Hydration', icon: <WaterDropIcon />, path: '/hydration' }
]

const SidebarDisplay = () => {
  const { globalUser, setGlobalUser } = useContext(UserContext);

  const navigate = useNavigate();
  const logout = async () => {
    try {
      await fetch('http://localhost:8080/user/logout', {
        method: "GET",
        credentials: "include"
      })
      setGlobalUser(null);
      navigate('/');
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <Box display='flex' justifyContent='left' py={2}
        sx={{ /*borderBottom: '1px solid black ', */ padding: '30px' }}>
        <Logo width={50} style={{marginRight: '15px',}}/>
        <Typography variant="h5" style={{color: 'rgb(238, 238, 238)', flexDirection: 'column', display: 'flex', justifyContent: 'center'}}>
          HealthTrackr
        </Typography>
      </Box>

      <Divider style={{borderColor: 'rgba(255, 255, 255, 0.1)'}}/>
      <Box sx={{ flexGrow: 0.1}} />

      


      <List sx={{ py: 0 }}>
        {list.map((item, index) => (
          <ListItem key={`${item.title}-${index}`} disablePadding>
            <ListItemButton
              component={Link} to={item.path}
              sx={{ /*borderBottom: '1px solid black ',*/ color: 'rgb(177,182,189)', marginLeft: '10%'}}>
              <ListItemIcon style={{color: 'rgb(156,162,174)'}}> {item.icon} </ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Box sx={{ flexGrow: 1 }} />

      <List>
        <ListItem disablePadding>
          <ListItemButton
            component={Link} to='/settings'
            sx={{
              /*borderBottom: '1px solid red',
              borderTop: '1px solid red'*/
            }}>
            <ListItemIcon> {<SettingsIcon />} </ListItemIcon>
            <ListItemText primary='Settings' />
          </ListItemButton>
        </ListItem>
      </List>
      {
        globalUser ?
          <Box sx={{ display: 'flex', justifyContent: 'center' }} p={4}>
            <Button variant='contained' size='large' color='inherit' onClick={logout}>
              Logout
            </Button>
          </Box>
          : null
      }
    </>
  )
}

export default SidebarDisplay;