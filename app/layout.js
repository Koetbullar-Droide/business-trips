// app/layout.js
'use client';


import { CssVarsProvider } from '@mui/joy/styles';
import { darkTheme } from './theme';
import { PaletteMode } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>My Next.js App with Joy UI</title>
      </head>
      <body>
        <CssVarsProvider theme={darkTheme}>
          <CssBaseline />
          {children}
        </CssVarsProvider>
      </body>
    </html>
  );
}