import React from 'react'
import { Typography, Box, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import { ThemeProvider } from '@emotion/react'
import lightTheme from '../../utils/lightTheme'
import { Link, Outlet } from 'react-router-dom';

const list = [
  { title: 'Profile', path: '/settings/profile' },
  { title: 'General', path: '/settings'},
  { title: 'Food', path: '/settings/food'},
  { title: 'Sleep', path: '/settings/sleep'},
  { title: 'Exercise', path: '/settings/exercise'},
  { title: 'Hydration', path: '/settings/hydration'},
]

const headerSecondaryFont = {
  fontWeight:'500',
  fontSize: '12px'
}
const headerPrimaryFont = {
  fontWeight:'500', 
  fontSize: '30px',
}

const SettingsMain = () => {
  
  return (
    <ThemeProvider theme={lightTheme}>
      <>
        <Box display="flex" flexDirection="column">
          <Box width="100%" borderBottom="1px solid" borderColor="lightText.heavy">
            <Typography color="light.grey" variant="h7" sx={headerSecondaryFont}>
              S E T T I N G S
            </Typography>
            <Typography variant="h4"  paddingBottom='20px' sx={headerPrimaryFont}>
              General Settings
            </Typography>

            <Box>
              <List sx={{ display: 'flex', flexDirection: 'row', py: 0}}>
                {list.map((item, index) => (
                  <ListItem key={`${item.title}-${index}`} disablePadding>
                    <ListItemButton 
                      component={Link} to={item.path}
                      sx={{ /*borderBottom: '1px solid black ',*/ "&.Mui-selected": { backgroundColor: 'rgba(30,30,30,0.25)', borderRight: '4px solid', borderColor: 'light.main'}, color: 'light.grey', padding: '8px 16px', }}>
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
    </ThemeProvider>
  )
}

export default SettingsMain