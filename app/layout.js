// app/layout.js
'use client';


import { theme } from './theme';
import { PaletteMode } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './globals.css';
import Box from '@mui/joy/Box';
import { useState } from 'react';
import { useColorScheme } from '@mui/joy/styles';
import Button from '@mui/joy/Button';
import {
  experimental_extendTheme as materialExtendTheme,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  THEME_ID as MATERIAL_THEME_ID,
} from '@mui/material/styles';
import { CssVarsProvider as JoyCssVarsProvider } from '@mui/joy/styles';

import InitColorSchemeScript from '@mui/joy/InitColorSchemeScript';

const materialTheme = materialExtendTheme();


export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <head>
        <title>My Next.js App with Joy UI</title>
      </head>
      <body >
      
        <InitColorSchemeScript defaultMode="dark"/>
        <MaterialCssVarsProvider defaultMode="dark">
          <JoyCssVarsProvider defaultMode="dark">
            <CssBaseline enableColorScheme />
            {children}
          </JoyCssVarsProvider>
      </MaterialCssVarsProvider>

     
        
      </body>
    </html>
  );
}