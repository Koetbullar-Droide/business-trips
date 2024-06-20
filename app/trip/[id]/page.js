'use client';
import { useState, useEffect } from 'react';
import React from 'react';
import { Box, Typography } from '@mui/material';
import CircularProgress from '@mui/joy/CircularProgress';



export default function Trip({ params }) {

    // Assuming you have a trips array in the Home component

    const [trip, setTrip] = useState();

    useEffect(() => {
        fetch('/api')
            .then(response => response.json())
            .then(data => {
                console.log(data.businessTrips);
                setTrip(data.businessTrips.find(trip => trip.id == params.id));
            })
            .catch(error => console.error(error));
        
    }, []);


    return (
        <Box className=" w-full h-screen">
            
            {trip ? (
                <Box>
                    <Typography variant="h4">Trip Details</Typography>
                    <Typography variant="h6">Destination: {trip.destination}</Typography>
                    <Typography variant="h6">Duration: {trip.duration}</Typography>
                </Box>
            ) : (
                <div className=' w-full h-screen flex justify-center content-center items-center'>
                    <CircularProgress />
                </div>
                
            )}
        </Box>
    );
}