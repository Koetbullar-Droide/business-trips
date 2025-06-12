'use client'
import * as React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';
import Add from '@mui/icons-material/Add';
import Slider from '@mui/joy/Slider';
import { useState } from 'react';
import Textarea from '@mui/joy/Textarea';




export default function ModalForm() {


    const [formData, setFormData] = useState({
        title: '',
        description: '',
        destination: '',
        date: '',
        duration: 1,
        budget: 0,
        image: ''
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await fetch('http://localhost:3000/api', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          });
    
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
    
          const result = await response.json();
          console.log('Success:', result);
          window.location.reload()
        } catch (error) {
          console.error('Error:', error);
        }
      };


    const marks = [
        {
          value: 500,
          label: '500CHF',
        },
        {
            value: 1000,
            label: '1000CHF',
          },
        {
          value: 100000,
          label: '100,000CHF',
        },
      ];
      
      function valueText(value) {
        return `${value}CHF`;
      }
  const [open, setOpen] = React.useState(false);
  return (
    <form onSubmit={handleSubmit}>
    <React.Fragment>
        <Button
            startDecorator={<Add />}
            onClick={() => setOpen(true)}
        >
            New Trip <h1 className=' text-xl ml-2'> 🍹</h1>
        </Button>
        <Modal open={open} onClose={() => setOpen(false)}>
            <ModalDialog>
            <DialogTitle>Create a new Trip</DialogTitle>
            <DialogContent>Fill in the information of the trip.</DialogContent>
            <form
                onSubmit={(event) => {
                event.preventDefault();
                setOpen(false);
                }}
            >
                <Stack spacing={2}>
                <FormControl>
                    <FormLabel>Title</FormLabel>
                    <Input name="title" value={formData.title} onChange={handleChange} autoFocus required />
                </FormControl>
                <FormControl>
                    <FormLabel>Description</FormLabel>
                    <Textarea
                        color="neutral"
                        disabled={false}
                        minRows={2}
                        size="md"
                        name="description" value={formData.description} onChange={handleChange} required
                        variant="outlined"
                        />
                </FormControl>
                <FormControl>
                    <FormLabel>Destination</FormLabel>
                    <Input name="destination" value={formData.destination} onChange={handleChange} required />
                </FormControl>
                <FormControl>
                    <FormLabel>Date</FormLabel>
                    <Input type="date" name="date" value={formData.date} onChange={handleChange} required />
                </FormControl>
                <FormControl>
                    <FormLabel>Duration (days)</FormLabel>
                    <Input type="number" name="duration" min="1" value={formData.duration} onChange={handleChange} required />
                </FormControl>
                <FormControl>
                    <FormLabel>Budget(CHF)</FormLabel>
                    <Slider
                        name="budget" value={formData.budget} onChange={handleChange}
                        aria-label="Custom marks"
                        defaultValue={20000}
                        step={2000}
                        getAriaValueText={valueText}
                        valueLabelDisplay="auto"
                        min={1000}
                        max={100000}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>ImageURL</FormLabel>
                    <Input name="image" value={formData.image} onChange={handleChange} required />
                </FormControl>
                <Button type="submit">Submit</Button>
                </Stack>
            </form>
            </ModalDialog>
        </Modal>
        </React.Fragment>

    </form>
    
  );
}