import React, { useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'
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

  const location = useLocation();
  const currentPath = location.pathname;

  const [selectedButton, setSelectedButton] = useState(currentPath);

  const handleButtonClick = (index) => {
    setSelectedButton(index);
  };

  const dividerStyle = {
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: '1px',
  }
  const drawerHeaderStyle = {
    fontWeight: 'bold', 
    color: 'rgba(238, 238, 238, 0.6)', 
    marginTop: '20px', marginBottom: '10px',
    marginLeft: '8px'
  }

  return (
    <>
      <Box display='flex' justifyContent='center' py={2}
        sx={{ /*borderBottom: '1px solid black ', */ padding: '30px', }}>
        <Logo width={50} style={{marginRight: '15px',}}/>
        <Typography variant="h6" style={{color: 'rgb(238, 238, 238)', flexDirection: 'column', display: 'flex', justifyContent: 'center'}}>
          HealthTrackr
        </Typography>
      </Box>

      <Box style={{ minWidth: '90%', margin:'auto'}}>
        <Divider style={dividerStyle}/>
        <Typography style={drawerHeaderStyle}>
          Home
        </Typography>
      </Box>

      <List style={{marginBottom: '10px', minWidth: '90%', marginLeft:'auto', marginRight: 'auto',}}>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => handleButtonClick('/')}
            selected = {selectedButton === '/'}
            component={Link} to='/'
            sx={{
              color: 'rgb(177,182,189)',
              "&.Mui-selected": {color: '#6941e1', backgroundColor: 'rgba(30,30,30,0.25)'}
            }}>
            <ListItemIcon sx={{ color: selectedButton === '/' ? 'rgb(238, 238, 238)' : 'inherit',}}> {<DashboardIcon />} </ListItemIcon>
            <ListItemText primary={<Typography variant='body2' style={{ color: selectedButton === '/' ? 'rgb(238, 238, 238)' : 'inherit',}}>Dashboard</Typography>} />
          </ListItemButton>
        </ListItem>
      </List>
      
      <Box style={{ minWidth: '90%', margin:'auto'}}>
        <Divider style={dividerStyle}/>
        <Typography style={drawerHeaderStyle}>
          Apps
        </Typography>
      </Box>

      <List sx={{ py: 0, marginBottom: '10px', minWidth: '90%', margin: 'auto' }}>
        {list.map((item, index) => (
          <ListItem key={`${item.title}-${index}`} disablePadding>
            <ListItemButton 
              onClick={() => handleButtonClick(item.path)}
              selected = {selectedButton === item.path}
              component={Link} to={item.path}
              sx={{ /*borderBottom: '1px solid black ',*/ "&.Mui-selected": {color: '#6941e1', backgroundColor: 'rgba(30,30,30,0.25)'}, borderRadius:'10px', color: 'rgb(177,182,189)', padding: '8px 16px'}}>
              <ListItemIcon style={{ color: selectedButton === item.path ? 'rgb(238, 238, 238)' : 'inherit',}}> {item.icon} </ListItemIcon>
              <ListItemText primary={<Typography variant='body2' style={{ color: selectedButton === item.path ? 'rgb(238, 238, 238)' : 'inherit', fontWeight: '400'}}>{item.title}</Typography>} />
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