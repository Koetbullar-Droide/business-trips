"use client";
import {
  Modal,
  ModalDialog,
  FormControl,
  FormLabel,
  Input,
  Typography,
  Button,
  Box,
} from "@mui/joy";

export default function Form({ open, onClose, onSave, form, setForm }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog>
        <Typography level="h5" mb={2}>
          Ereignis erstellen
        </Typography>
        <FormControl>
          <FormLabel>Titel</FormLabel>
          <Input name="title" value={form.title} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Datum</FormLabel>
          <Input type="date" name="date" value={form.date} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Dauer (Tage)</FormLabel>
          <Input type="number" name="duration" value={form.duration} onChange={handleChange} />
        </FormControl>
        <Box className="flex justify-end gap-2 mt-4">
          <Button variant="plain" onClick={onClose}>
            Verwerfen
          </Button>
          <Button onClick={onSave}>Speichern</Button>
        </Box>
      </ModalDialog>
    </Modal>
  );
}
