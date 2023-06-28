import React from 'react';
import { Outlet } from 'react-router-dom';
import { 
  Box, 
  Button, 
  CssBaseline, 
  Divider, 
  Drawer, 
  IconButton, 
  Toolbar, 
  Typography 
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import SidebarDisplay from './SidebarDisplay';
import { drawerWidth } from '../utils/constants'

const Sidebar = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box >
      <CssBaseline />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, }}
        aria-label="mailbox folders">
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {<SidebarDisplay />}
        </Drawer>

        {/* MOBILE */}
        <Drawer
          container={container} variant="temporary"
          open={mobileOpen} onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },

          }}
        >
          {<SidebarDisplay />}
        </Drawer>
      </Box>

      {/* Navigation bar */}
      <Box
        sx={{ flexGrow: 1, 
              width: { md: `calc(100% - ${drawerWidth}px)`},
              marginLeft: {sm: 0, md: `${drawerWidth}px`}
            }}
      >
        <Toolbar >
          <IconButton aria-label="open drawer"
            edge="start" onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }} >
            <MenuIcon />
          </IconButton>
          <Typography variant='h4' p={2}>
            HealthTrackr
          </Typography>

          <Box sx={{ flexGrow: '1' }} />

          <Button variant='contained' color='inherit' 
            sx={{ marginX: 3 }}>LogIn</Button>
          <IconButton aria-label="open drawer"
            edge="start" onClick={handleDrawerToggle}
            >
            <AccountCircleIcon fontSize='large' />
          </IconButton>
        </Toolbar>
        <Divider />
      </Box>
      <Box ml={`${drawerWidth}px`} p={3}>
        <Outlet />
      </Box>
    </Box>
  );
}

export default Sidebar;