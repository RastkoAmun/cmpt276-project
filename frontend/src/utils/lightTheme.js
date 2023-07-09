import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',

    // blue
    primary: {
      main: '#4169e1',
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
      main: 'rgba(0,0,0,0.6)'
    },
    
    // white-ish
    light: {
      main: 'rgb(238,238,238)',
      grey: 'rgb(177,182,189)',
    },
  },
});

export default lightTheme;