import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, Box, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import { titleContainerStyle } from '../Style';

const list = [
  { title: 'Profile', path: '/settings/profile' },
  { title: 'General', path: '/settings'},
]




const SettingsMain = () => {

  const location = useLocation();
  const [currentHeader, setCurrentHeader] = useState(location.pathname);
  const [activeButton, setActiveButton] = useState('');

  const handleHeaderChange = () => {
    setActiveButton(location.pathname)

    switch (location.pathname) {
      case '/settings/profile':
        setCurrentHeader('Profile');
        break;
      case '/settings':
        setCurrentHeader('General');
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
                      sx={{
                        borderBottom: activeButton===item.path ? '2px solid' : 'none',
                        borderColor: 'primary.main',
                        color: activeButton===item.path ? 'text.primary' : 'light.grey', 
                        padding: '8px 16px', }}>
                      <ListItemText primary={<Typography variant='body2' sx={{
                        fontWeight: activeButton===item.path ? '500' : '400',
                        }}>{item.title}</Typography>} />
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