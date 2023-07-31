import { createTheme } from '@mui/material/styles';

const theme = createTheme({
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
    bg: {
      main: 'rgb(248, 249, 253)',
    },
    opaque: {
      main: 'rgba(0, 0, 0, 0.6)',
      heavy: 'rgba(0, 0, 0, 0.15)',
    },
    light: {
      main: 'rgb(238, 238, 238)',
      grey: 'rgb(177, 182, 189)',
    },
  },
});

export default theme;