import React, { useState, useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import {
  Box,
  Button,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  Toolbar,
  Menu,
  MenuItem,
  Typography,
  AppBar
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SidebarDisplay from './SidebarDisplay';
import { drawerWidth } from '../utils/constants'
import { UserContext } from '../index'
import { ThemeProvider } from '@emotion/react';
import lightTheme from '../utils/lightTheme';

const Sidebar = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const { globalUser } = useContext(UserContext);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <ThemeProvider theme={lightTheme}>
    <Box bgcolor="bg.main">
      <CssBaseline />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, }}
        aria-label="mailbox folders">
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: 'secondary.main', borderRight: 'none'},
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
      <AppBar position="static" elevation={0}
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          marginLeft: { sm: 0, md: `${drawerWidth}px` },
          backgroundColor: 'white',
        }}
      >
        <Toolbar >
          <IconButton aria-label="open drawer"
            edge="start" onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' }, border: '0' }} >
            <MenuIcon />
          </IconButton>
          {/* <Typography variant='h4' p={2}>
            HealthTrackr
          </Typography> */}

          <Box sx={{ flexGrow: '1' }} />

          {
            !globalUser ?
              <Button variant='contained' color='inherit'
                component={Link} to={'/login'}
                sx={{ marginX: 3 }}>
                LogIn
              </Button>
              :
              null
          }

          <IconButton aria-label="open drawer"
            edge="start" onClick={handleProfileClick}
          >
            <AccountCircleIcon fontSize='large' />
          </IconButton>

          <Menu
            anchorEl = {anchorEl}
            open = {Boolean(anchorEl)}
            onClose = {handleMenuClose}
            PaperProps = {{
              elevation: 0,
              sx: {boxShadow: 'none', backgroundColor:'secondary.main', color: 'rgb(238, 238, 238)',},
            }}
          >
            <Typography>USERNAME</Typography>
            <MenuItem component={Link} to='/settings/profile' onClick={handleMenuClose}>Edit Profile</MenuItem>
            <MenuItem component={Link} to='/settings' onClick={handleMenuClose}>Settings</MenuItem>
            <MenuItem component={Link} to='' onClick={handleMenuClose}>Help</MenuItem>
            <MenuItem onClick={handleMenuClose}>Log out</MenuItem>

          </Menu>
          
        </Toolbar>
      </AppBar>


      <Box ml={`${drawerWidth}px`} p={8}>
        <Outlet />
      </Box>
    </Box>
  </ThemeProvider>
  );
}

export default Sidebar;