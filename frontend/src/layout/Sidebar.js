import React, { useState, useContext, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
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
  Typography
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import SidebarDisplay from './SidebarDisplay';
import { drawerWidth } from '../utils/constants'
import { UserContext, ThemeContext } from '../index'
import { ThemeProvider } from '@emotion/react';
import lightTheme from '../utils/lightTheme';
import darkTheme from '../utils/darkTheme'

const Sidebar = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const { globalUser, setGlobalUser } = useContext(UserContext);
  const [refresh, setRefresh] = useState(0);


  const {darkMode, setDarkMode} = useContext(ThemeContext)

  const fetchUser = async () => {
    if (!globalUser) {
      return;
    }
    setDarkMode(globalUser.darkMode);
  }


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

  const navigate = useNavigate();

  const logout = async () => {
    try {
      await fetch('/user/logout', {
        method: "GET",
        credentials: "include"
      })
      setGlobalUser(null);
      navigate('/');
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchUser();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh])



  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Box>
        <CssBaseline />
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, }}
          aria-label="mailbox folders">
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', md: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: 'secondary.main', borderRight: 'none' },
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
          sx={{
            flexGrow: 1,
            width: { md: `calc(100% - ${drawerWidth}px)` },
            marginLeft: { sm: 0, md: `${drawerWidth}px` },
            backgroundColor: 'navbar.main',
            position: 'fixed',
            zIndex: 999,
          }}
        >
          <Toolbar >
            <IconButton aria-label="open drawer"
              edge="start" onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: 'none' } }} >
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
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              PaperProps={{
                elevation: 0,
                sx: { boxShadow: 'none', backgroundColor: 'secondary.main', color: 'rgb(238, 238, 238)', padding: '0 1vw' },
              }}
            >
              <Typography p={1}>{globalUser ? <>{globalUser.username} </> : <></>}</Typography>
              <MenuItem sx={{fontSize: 'small'}} component={Link} to='/settings/profile' onClick={handleMenuClose}><EditIcon fontSize="small" sx={{marginRight: '10px'}} />Edit Profile</MenuItem>
              <MenuItem sx={{fontSize: 'small'}} component={Link} to='/settings' onClick={handleMenuClose}><SettingsIcon fontSize="small" sx={{marginRight: '10px'}}/>Settings</MenuItem>
              <MenuItem sx={{fontSize: 'small'}} onClick={logout}><LogoutIcon fontSize="small" sx={{marginRight: '10px'}}/>Log out</MenuItem>

            </Menu>

          </Toolbar>
        </Box>
        <Box ml={`${drawerWidth}px`} p={8} pt={14}>
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Sidebar;