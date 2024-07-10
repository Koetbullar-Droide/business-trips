'use client'

import { useColorScheme } from '@mui/joy/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Button from '@mui/joy/Button';

export default function DarkModeButton() {

    const { mode, setMode } = useColorScheme();
    return (
        <Button onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')} color="inherit">
          {mode === 'dark' ? <Brightness7Icon sx={{ fontSize: 28 }}/> : <Brightness4Icon sx={{ fontSize: 28 }}/>}
        </Button>
    );
}