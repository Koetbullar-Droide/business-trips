'use client';
import CardComponent from "./(components)/Card";
import Typography from '@mui/joy/Typography';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Add from '@mui/icons-material/Add';
import { useState, useEffect } from 'react';
import CircularProgress from '@mui/joy/CircularProgress';
import ModalForm from "./(components)/ModalForm";
import DarkModeButton from "./(components)/DarkModeButton";
import Navbar from "./(components)/Navbar";






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

    <>
     <Navbar/>
    <main className=" px-24">
      
      
      <div className=" w-full h-[35vh] flex items-center content-center justify-center flex-col">

        <div className=" w-3/5  mb-16  text-center">
          <div className="flex justify-center">
            <Typography className=" mb-3" level="h1">Your workation starts here...</Typography><h1 className=' text-4xl'> 🏝️</h1>
          </div>
          <Typography className="" level="body-md">Are you bored of the same office everyday? Start getting productive outside of your office and book a trip with your team. The cocktails on the beach are waiting for you. </Typography>
        </div>
        
      
      
      <div className="flex flex-row justify-center items-center">
        <Input className=" w-[30vw] rounded-2xl h-10 mr-5" placeholder="Search for a trip" sx={{bgcolor: 'background.level1'}}/>
        <ModalForm />
      </div>
      
      </div>
      <div className=" flex flex-wrap justify-center">
          {trips ? trips.map((trip, index) => (
          <CardComponent
            key={index}
            id={trip.id}
            title={trip.title}
            location={trip.destination}
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
    
    
    
    </>

   
  );
}
