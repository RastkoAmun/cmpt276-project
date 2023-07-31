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
    },
  },

  // Add the dark mode configuration as a separate object
    palette: {
      mode: 'dark',
      primary: {
        main: '#4169e1',
        opaque: 'rgba(144, 202, 249, 0.1)',
      },
      secondary: {
        main: '#90caf9',
      },
      bg: {
        main: 'rgb(48, 48, 48)',
      },
      opaque: {
        main: 'rgba(255, 255, 255, 0.6)',
        heavy: 'rgba(255, 255, 255, 0.15)',
      },
      light: {
        main: 'rgb(62, 62, 62)',
        grey: 'rgb(144, 144, 144)',
      },
    },
});

export default theme;