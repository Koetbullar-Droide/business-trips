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



export default function ModalForm() {
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
    <React.Fragment>
      <Button
        variant="outlined"
        color="neutral"
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
                <Input autoFocus required />
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input required />
              </FormControl>
              <FormControl>
                <FormLabel>Destination</FormLabel>
                <Input required />
              </FormControl>
              <FormControl>
                <FormLabel>Budget(CHF)</FormLabel>
                <Slider
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
                <Input required />
              </FormControl>
              <Button type="submit">Submit</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}