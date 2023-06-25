import React from 'react'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import SettingsIcon from '@mui/icons-material/Settings';
import { Button } from '@mui/material';

const list = [
  { title: 'Food', icon: <LocalDiningIcon /> },
  { title: 'Sleep', icon: <BedtimeIcon /> },
  { title: 'Exercise', icon: <FitnessCenterIcon /> },
  { title: 'Hydration', icon: <WaterDropIcon /> }
]

const SidebarDisplay = () => {
  return (
    <>
      <Box sx={{ borderBottom: '1px solid black ' }}>
        <Typography variant='h2' my={8} sx={{ textAlign: 'center' }}>
          LOGO
        </Typography>
      </Box>
      <List sx={{ py: 0 }}>
        {list.map((item, index) => (
          <ListItem key={`${item.title}-${index}`} disablePadding>
            <ListItemButton sx={{ borderBottom: '1px solid black ' }}>
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
            sx={{
              borderBottom: '1px solid black',
              borderTop: '1px solid black'
            }}>
            <ListItemIcon> {<SettingsIcon />} </ListItemIcon>
            <ListItemText primary='Settings' />
          </ListItemButton>
        </ListItem>
      </List>
      <Box sx={{ display: 'flex', justifyContent: 'center' }} p={6}>
        <Button variant='contained' size='large' color='info'
          sx={{ backgroundColor: 'black' }}> Logout </Button>
      </Box>
    </>
  )
}

export default SidebarDisplay;