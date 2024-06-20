// theme.js
import { extendTheme } from '@mui/joy/styles';

const darkTheme = extendTheme({
  colorSchemes: {
    dark: {
      palette: {
        primary: {
          main: '#90caf9',
        },
      },
    },
  },
});

export { darkTheme };
