import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',

    // blue
    primary: {
      main: '#4169e1',
      opaque: 'rgba(65, 105, 225, 0.1)'
    },

    // dark blue
    secondary: { 
      main: '#233043',
    },

    // light grey -- use for background
    bg: {
      main: 'rgb(248, 249, 253)'
    },

    lightText: {
      main: 'rgba(0,0,0,0.6)',
      heavy: 'rgba(0,0,0,0.25)'
      // main: '#696969'
    },
    
    // white-ish
    light: {
      main: 'rgb(238,238,238)',
      grey: 'rgb(177,182,189)',
    },
  },
});

export default theme;