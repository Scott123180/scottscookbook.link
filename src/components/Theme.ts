import { createTheme } from '@mui/material/styles';

const headingFont = "'Playfair Display', georgia, serif";
const bodyFont = "'Public Sans', -apple-system, BlinkMacSystemFont, sans-serif";

const theme = createTheme({
  palette: {
    primary: {
      main: '#4a7c3f',
    },
    secondary: {
      main: '#b8552f',
    },
    background: {
      default: '#fffdf9',
      paper: '#ffffff',
    },
    text: {
      primary: '#1f2a1f',
    },
  },
  contrastThreshold: 3,
  tonalOffset: 0.2,
  typography: {
    fontFamily: bodyFont,
    h1: { fontFamily: headingFont, fontWeight: 700 },
    h2: { fontFamily: headingFont, fontWeight: 700 },
    h3: { fontFamily: headingFont, fontWeight: 700 },
    h4: { fontFamily: headingFont, fontWeight: 700 },
    h5: { fontFamily: headingFont, fontWeight: 700 },
    h6: { fontFamily: headingFont, fontWeight: 700 },
  },
});

export default theme;
