import React, { useContext } from 'react'
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import SettingsIcon from '@mui/icons-material/Settings';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Link } from 'react-router-dom';
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
  const { globalUser } = useContext(UserContext);

  return (
    <>
      <Box display='flex' justifyContent='center' py={2}
        sx={{ borderBottom: '1px solid black ' }}>
        <Logo width={150} />
      </Box>
      <List sx={{ py: 0 }}>
        {list.map((item, index) => (
          <ListItem key={`${item.title}-${index}`} disablePadding>
            <ListItemButton
              component={Link} to={item.path}
              sx={{ borderBottom: '1px solid black ' }}>
              <ListItemIcon> {item.icon} </ListItemIcon>
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
              borderBottom: '1px solid black',
              borderTop: '1px solid black'
            }}>
            <ListItemIcon> {<SettingsIcon />} </ListItemIcon>
            <ListItemText primary='Settings' />
          </ListItemButton>
        </ListItem>
      </List>
      {
        globalUser ?
          <Box sx={{ display: 'flex', justifyContent: 'center' }} p={4}>
            <Button variant='contained' size='large' color='inherit'>
              Logout
            </Button>
          </Box>
          : null
      }
    </>
  )
}

export default SidebarDisplay;