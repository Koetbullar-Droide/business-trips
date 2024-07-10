
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import DarkModeButton from './DarkModeButton';

export default function Navbar () {

    return (
        <Box className=' w-full py-5 px-10 flex justify-between' sx={{ borderBottom: 1, borderColor: 'background.level2'}}>
                <div className="flex">
                    <h1 className=' text-2xl mr-2'> ✈️</h1><Typography level="h3">BusinessTrips</Typography>
                </div>

                <DarkModeButton/>

        </Box>
    );
}