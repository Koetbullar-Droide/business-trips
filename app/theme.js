// theme.js
import { extendTheme } from '@mui/joy/styles';

import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const basetheme = createTheme({
  typography: {
    h1: {
      fontSize: '2rem',
    },
    h2: {
      fontSize: '1.75rem',
    },
    h3: {
      fontSize: '1.5rem',
    },
    // Weitere Typografiestile nach Bedarf
  },
});
let theme = responsiveFontSizes(basetheme);

theme = extendTheme(theme)
export { theme };
