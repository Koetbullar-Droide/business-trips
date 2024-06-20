'use client';
import CardComponent from "./(components)/Card";
import Typography from '@mui/joy/Typography';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Add from '@mui/icons-material/Add';
import { useState, useEffect } from 'react';
import CircularProgress from '@mui/joy/CircularProgress';




export default function Home() {
  const [trips, setTrips] = useState();

  useEffect(() => {
    fetch('/api')
        .then(response => response.json())
        .then(data => {
            console.log(data.businessTrips);
            setTrips(data.businessTrips);
        })
        .catch(error => console.error(error));
    
}, []);
  return (
    <main className=" px-24">
      <div className=" w-full h-[35vh] flex items-center content-center justify-center flex-col">
      <Typography className="mb-10" level="h1">Your Buisness Trips</Typography>
      <div className="flex flex-row justify-center items-center">
        <Input className=" w-[30vw] rounded-2xl h-10" placeholder="Search for a trip" />
        <Button size="md" className=" rounded-3xl h-10 ml-10" color="primary" startDecorator={<Add />}>
        Add
      </Button>
      </div>
      
      </div>
      <div className=" flex flex-wrap justify-center">
          {trips ? trips.map((trip, index) => (
          <CardComponent
            key={index}
            id={trip.id}
            title={trip.title}
            date={trip.date}
            image={trip.image}
            price={trip.budget}
          />
        )) : (
          <div className=' w-full h-full flex justify-center content-center items-center'>
                    <CircularProgress />
          </div>
        )
      }
      </div>
      
    </main>
  );
}
