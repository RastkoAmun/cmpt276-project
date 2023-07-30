import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, Box, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import { titleContainerStyle } from '../Style';

const list = [
  { title: 'Profile', path: '/settings/profile' },
  { title: 'General', path: '/settings'},
  { title: 'Food', path: '/settings/food'},
  { title: 'Sleep', path: '/settings/sleep'},
  { title: 'Exercise', path: '/settings/exercise'},
  { title: 'Hydration', path: '/settings/hydration'},
]




const SettingsMain = () => {

  const location = useLocation();
  const [currentHeader, setCurrentHeader] = useState(location.pathname);

  const handleHeaderChange = () => {
    switch (location.pathname) {
      case '/settings/profile':
        setCurrentHeader('Profile');
        break;
      case '/settings':
        setCurrentHeader('General');
        break;
      case '/settings/food':
        setCurrentHeader('Food');
        break;
      case '/settings/sleep':
        setCurrentHeader('Sleep');
        break;
      case '/settings/exercise':
        setCurrentHeader('Exercise');
        break;
      case '/settings/hydration':
        setCurrentHeader('Hydration');
        break;
    } 
  }
  useEffect(() => {
    handleHeaderChange();
  })
  




  
  return (
      <>
        <Box display="flex" flexDirection="column">
          <Box display="flex" flexDirection="column" sx={titleContainerStyle}>
            <Typography variant="fh2">
              Settings
            </Typography>
            <Typography variant="fh1"  paddingBottom='20px'>
              {currentHeader} Settings
            </Typography>

            <Box>
              <List sx={{ display: 'flex', flexDirection: 'row', py: 0}}>
                {list.map((item, index) => (
                  <ListItem key={`${item.title}-${index}`} disablePadding>
                    <ListItemButton 
                      onClick = {handleHeaderChange}
                      component={Link} to={item.path}
                      sx={{ /*borderBottom: '1px solid black ',*/ color: 'light.grey', padding: '8px 16px', }}>
                      <ListItemText primary={<Typography variant='body2' sx={{fontWeight: '400'}}>{item.title}</Typography>} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>

          </Box>



          <Box>
            <Outlet />
          </Box>

        </Box>
      </>
  )
}

export default SettingsMain