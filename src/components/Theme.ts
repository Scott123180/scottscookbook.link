import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#8bc34a',
    },
    secondary: {
      main: '#2979ff',
    },
    background: {
      paper: '#fff'
    }
  },
  contrastThreshold: 3,
  tonalOffset: 0.2,
});