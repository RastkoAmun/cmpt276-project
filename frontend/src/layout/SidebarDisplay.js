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
import WeightIcon from '@mui/icons-material/MonitorWeight'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as Logo } from '../images/logo.svg';
import { UserContext } from '../index'
import { ThemeProvider } from '@emotion/react';
import lightTheme from '../utils/lightTheme'

const list = [
  { title: 'Admin', icon: <AdminPanelSettingsIcon />, path: '/admin' },
  { title: 'Food', icon: <LocalDiningIcon />, path: '/food' },
  { title: 'Sleep', icon: <BedtimeIcon />, path: '/sleep' },
  { title: 'Exercise', icon: <FitnessCenterIcon />, path: '/exercise' },
  { title: 'Hydration', icon: <WaterDropIcon />, path: '/hydration' },
  { title: 'Weight', icon: <WeightIcon />, path: '/weight' },
  { title: 'Settings', icon: <SettingsIcon />, path: '/settings' },
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
    fontWeight: '500',
    color: 'rgba(238, 238, 238, 0.8)',
    marginTop: '20px', marginBottom: '10px',
    marginLeft: '8px'
  }

  return (
    <ThemeProvider theme={lightTheme}>
      <>
        {/* Header logo section */}
        <Box display='flex' justifyContent='center' py={2}
          sx={{ /*borderBottom: '1px solid black ', */ padding: '30px', }}>
          <Logo width={50} style={{ marginRight: '15px', }} />
          <Typography variant="h6" color='light.main' style={{ flexDirection: 'column', display: 'flex', justifyContent: 'center' }}>
            HealthTrackr
          </Typography>
        </Box>

        {/* Home - dashboard section */}
        <Box style={{ minWidth: '90%', margin: 'auto' }}>
          <Divider style={dividerStyle} />
          <Typography style={drawerHeaderStyle}>
            Home
          </Typography>
        </Box>
        <List style={{ marginBottom: '10px', minWidth: '90%', marginLeft: '5%', }}>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => handleButtonClick('/')}
              selected={selectedButton === '/'}
              component={Link} to='/'
              sx={{
                color: 'light.grey',
                "&.Mui-selected": { color: 'light.main', backgroundColor: 'rgba(30,30,30,0.25)', borderRight: '4px solid', borderColor: 'light.main' }
              }}>
              <ListItemIcon sx={{ color: selectedButton === '/' ? 'light.main' : 'inherit', }}> {<DashboardIcon />} </ListItemIcon>
              <ListItemText primary={<Typography variant='body2' style={{ color: selectedButton === '/' ? 'light.main' : 'inherit', }}>Dashboard</Typography>} />
            </ListItemButton>
          </ListItem>
        </List>

        {/* Apps section */}
        <Box style={{ minWidth: '90%', margin: 'auto' }}>
          <Divider style={dividerStyle} />
          <Typography style={drawerHeaderStyle}>
            Apps
          </Typography>
        </Box>
        <List sx={{ py: 0, marginBottom: '10px', minWidth: '90%', marginLeft: '5%' }}>
          {list.map((item, index) => {
            if ((item.title === 'Admin' && (globalUser == null || (globalUser && globalUser.isAdmin === false)))) {
              return null;
            }

            return (<ListItem key={`${item.title}-${index}`} disablePadding>
              <ListItemButton
                onClick={() => handleButtonClick(item.path)}
                selected={selectedButton === item.path}
                component={Link} to={item.path}
                sx={{ /*borderBottom: '1px solid black ',*/ "&.Mui-selected": { backgroundColor: 'rgba(30,30,30,0.25)', borderRight: '4px solid', borderColor: 'light.main' }, color: 'light.grey', padding: '8px 16px', }}>
                <ListItemIcon sx={{ color: selectedButton === item.path ? 'light.main' : 'inherit', }}> {item.icon} </ListItemIcon>
                <ListItemText primary={<Typography variant='body2' sx={{ color: selectedButton === item.path ? 'light.main' : 'inherit', fontWeight: '400' }}>{item.title}</Typography>} />
              </ListItemButton>
            </ListItem>)
          })}
        </List>

        <Box sx={{ flexGrow: 1 }} />
      </>
    </ThemeProvider>
  )
}

export default SidebarDisplay;