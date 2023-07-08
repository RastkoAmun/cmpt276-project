import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#4169e1',
    },
    secondary: {
      main: '#233043',
    },
    bg: {
      main: 'rgb(248, 249, 253)'
    },
    lightText: {
      main: 'rgba(0,0,0,0.6)'
    },
  },
});

export default lightTheme;