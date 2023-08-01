import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: 'rgba(50, 50, 93, 0.024) 0px 2px 5px -1px, rgba(0, 0, 0, 0.05) 0px 1px 3px -1px',
        }
      }
    }
  },
  typography: {
    fh1: {
      fontWeight:'500', 
      fontSize: '30px',
      lineHeight: '1.235',
    },
    fh2: {
      fontWeight:'500',
      fontSize: '12px',
      color: 'rgb(177,182,189)',
      textTransform: 'uppercase',
      letterSpacing: '0.6em'
    },
    ch1: {
      fontWeight: '400',
      fontSize: '1rem',
      marginBottom: '12px',
    }
    
  },

  palette: {
    mode: 'light',
    primary: {
      main: '#4169e1',
      opaque: 'rgba(65, 105, 225, 0.1)',
    },
    secondary: {
      main: '#233043',
    },
    opaque: {
      main: 'rgba(0, 0, 0, 0.6)',
      heavy: 'rgba(0, 0, 0, 0.15)',
    },
    light: {
      main: 'rgb(238, 238, 238)',
      grey: 'rgb(177, 182, 189)',
    },
    background: {
      default: 'rgb(248, 249, 253)',
    },
    navbar: {
      main: 'white'
    },
  },
});

export default theme;