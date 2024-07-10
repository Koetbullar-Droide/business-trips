'use client';
import { useState, useEffect } from 'react';
import React from 'react';
import { Box} from '@mui/material';
import CircularProgress from '@mui/joy/CircularProgress';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import DarkModeButton from '@/app/(components)/DarkModeButton';
import Navbar from '@/app/(components)/Navbar';
import PublicRoundedIcon from '@mui/icons-material/PublicRounded';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Card from '@mui/joy/Card';
import MonetizationOnRoundedIcon from '@mui/icons-material/MonetizationOnRounded';
import { PieChart } from '@mui/x-charts/PieChart';
import Slider from '@mui/joy/Slider';



function valueText(value) {
    return `${value}CHF`;
  }


const pieParams = { height: 300, margin: { right: 5 } };

export default function Trip({ params }) {

    // Assuming you have a trips array in the Home component

    const [trip, setTrip] = useState();
    

    useEffect(() => {
        fetch('/api/'+params.id)
            .then(response => response.json())
            .then(data => {
                console.log(data.businessTrips);
                setTrip(data);
            })
            .catch(error => console.error(error));
        
    }, []);


    return (
        <Box className=" w-full h-screen">
            
            <Navbar/>
            <div className='p-0 m-0 pl-3'>
                <Breadcrumbs aria-label="breadcrumbs" size="md">
                        
                            <Link color="neutral" href="/">
                                Home
                            </Link>
                        
                        <Typography>{trip?.title}</Typography>
                </Breadcrumbs>
            </div>
            
            {trip ? (
                <Box className=' w-full p-24'>
                    <div className='flex justify-evenly'>

                        <div className='w-[30vw]'>
                            <div className='flex mt-10'>
                                <Typography sx={{ 
                                    typography: { 
                                    xs: 'h3',  // style for extra-small screens
                                    md: 'h2',
                                    lg: 'h1'   // style for medium and larger screens
                                    } 
                                }}  variant="soft">{trip.title}</Typography>
                            </div>
                            <div className='flex mt-2 mb-12'>
                                <Typography startDecorator={<MonetizationOnRoundedIcon />} level="title-lg" variant="plain">{trip.budget}</Typography>
                            </div>

                            <div className='flex '>
                                <Typography  variant="plain" sx={{ 
                                    typography: { 
                                    xs: 'body-sm',  // style for extra-small screens
                                    md: 'body-sm',
                                    lg: 'body-lg'   // style for medium and larger screens
                                    } 
                                }}>
                                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                                </Typography>
                            </div>
                        
                        
                        </div>

                        <div className=' flex content-center flex-wrap'>
                            <Card component="li" sx={{ minWidth: 300, flexGrow: 1 }} className=' h-[50vh] w-[35vw] flex content-center'>
                                <CardCover>
                                <img
                                    src={trip.image}
                                    loading="lazy"
                                    alt=""
                                />
                                </CardCover>
                                <CardContent>
                                    <Typography className=' mix-blend-difference' style={{ color: 'white' }}  startDecorator={<PublicRoundedIcon />} level="h4" variant="plain">{trip.destination}</Typography>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    <div className=' mt-14 w-full'>
                        <div className='flex w-full'>
                            <Typography sx={{ 
                                    typography: { 
                                    xs: 'h3',  // style for extra-small screens
                                    md: 'h2',
                                    lg: 'h1'   // style for medium and larger screens
                                    } 
                                }} variant="soft">The Budget in detail</Typography>
                        </div>

                        <div className=' w-full'>
                            <div className=' w-96'>

                                <PieChart
                                series={[
                                    {
                                        data: [ 
                                            { id: 0, value: 10, label: 'series A' },
                                            { id: 1, value: 15, label: 'series B' },
                                            { id: 2, value: 20, label: 'series C' },
                                        ],
                                        highlightScope: { faded: 'global', highlighted: 'item' },
                                        faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                                        innerRadius: 30,
                                        outerRadius: 100,
                                        paddingAngle: 5,
                                        cornerRadius: 5,
                                        startAngle: -90,
                                        endAngle: 180,
                                        cx: 150,
                                        cy: 150,
                                    }
                                ]}
                                {...pieParams}
                                />
                            </div>
                            <div>
                            <Slider
                                aria-label="Small steps"
                                defaultValue={500}
                                getAriaValueText={valueText}
                                step={100}
                                min={0}
                                max={10000}
                                valueLabelDisplay="auto"
                                />
                            </div>
                        </div>
                        
                    </div>
                    
                    
                </Box>
            ) : (
                <div className=' w-full h-screen flex justify-center content-center items-center'>
                    <CircularProgress />
                </div>
                
            )}
        </Box>
    );
}