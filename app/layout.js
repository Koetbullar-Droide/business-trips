// app/layout.js
'use client';


import { darkTheme } from './theme';
import { PaletteMode } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import './globals.css';
import { useState } from 'react';
import { useColorScheme } from '@mui/joy/styles';
import Button from '@mui/joy/Button';


export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <head>
        <title>My Next.js App with Joy UI</title>
      </head>
      <body>

      
        <CssVarsProvider defaultMode="dark">
          <CssBaseline />
          {children}
        </CssVarsProvider>
      </body>
    </html>
  );
}