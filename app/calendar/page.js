"use client";
import { useEffect, useState } from "react";
import Box from "@mui/joy/Box";
import CircularProgress from "@mui/joy/CircularProgress";
import Navbar from "../(components)/Navbar";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import addDays from "date-fns/addDays";
import enUS from "date-fns/locale/en-US";
import IconButton from "@mui/joy/IconButton";
import ButtonGroup from "@mui/joy/ButtonGroup";
import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";
import Snackbar from "@mui/joy/Snackbar";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./calendar.css";
import Form from "./Form";

const locales = { "en-US": enUS };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

function CustomToolbar({ label, onNavigate, onView, views, view }) {
  return (
    <Box className="flex justify-between items-center mb-2">
      <Box>
        <IconButton variant="plain" onClick={() => onNavigate("PREV")}>
          <ArrowBackIosNewIcon />
        </IconButton>
        <IconButton variant="plain" onClick={() => onNavigate("TODAY")}>
          <CalendarTodayIcon />
        </IconButton>
        <IconButton variant="plain" onClick={() => onNavigate("NEXT")}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
      <Typography level="title-lg">{label}</Typography>
      <ButtonGroup size="sm">
        {views.map((v) => (
          <Button
            key={v}
            variant={v === view ? "solid" : "outlined"}
            onClick={() => onView(v)}
          >
            {v.charAt(0).toUpperCase() + v.slice(1)}
          </Button>
        ))}
      </ButtonGroup>
    </Box>
  );
}

export default function CalendarPage() {
  const [events, setEvents] = useState([]);
  const [view, setView] = useState("month");
  const [date, setDate] = useState(new Date());
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ title: "", date: "", duration: 1 });
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    const lastView = localStorage.getItem("calendarView") || "month";
    setView(lastView);
  }, []);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => {
        const ev = data.businessTrips.map((trip) => ({
          id: trip.id || crypto.randomUUID(),
          title: trip.title,
          start: new Date(trip.date),
          end: addDays(new Date(trip.date), (trip.duration || 1) - 1),
          allDay: true,
        }));
        setEvents(ev);
      });
  }, []);

  const handleViewChange = (v) => {
    setView(v);
    localStorage.setItem("calendarView", v);
  };

  const handleNavigate = (newDate) => {
    setDate(newDate);
  };

  const handleAddClick = () => {
    setForm({ title: "", date: "", duration: 1 });
    setModalOpen(true);
  };

  const handleSave = () => {
    const newEvent = {
      id: crypto.randomUUID(),
      title: form.title,
      start: new Date(form.date),
      end: addDays(new Date(form.date), form.duration - 1),
      allDay: true,
    };

    setEvents((prev) => [...prev, newEvent]);
    setModalOpen(false);
    setSnackbarMessage("Ereignis erfolgreich erstellt");
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  const eventPropGetter = () => ({
    style: {
      borderRadius: 4,
      backgroundColor: "var(--joy-palette-primary-solidBg)",
      color: "var(--joy-palette-primary-solidColor)",
      border: "none",
    },
  });

  return (
    <Box className="w-full h-screen">
      <Navbar />
      <Box className="p-10 h-[90%] relative">
        {events.length ? (
          <Calendar
            localizer={localizer}
            events={events}
            view={view}
            onView={handleViewChange}
            date={date}
            onNavigate={handleNavigate}
            views={["month", "week", "day"]}
            components={{ toolbar: CustomToolbar }}
            eventPropGetter={eventPropGetter}
            style={{ height: "100%" }}
          />
        ) : (
          <Box className="w-full h-full flex items-center justify-center">
            <CircularProgress />
          </Box>
        )}

        <IconButton
          onClick={handleAddClick}
          color="primary"
          variant="solid"
          size="lg"
          sx={{
            position: "absolute",
            bottom: 24,
            right: 24,
            borderRadius: "50%",
          }}
        >
          <AddIcon />
        </IconButton>

        <Form
          open={modalOpen}
          onClose={handleCancel}
          onSave={handleSave}
          form={form}
          setForm={setForm}
        />

        <Snackbar
          open={!!snackbarMessage}
          onClose={() => setSnackbarMessage("")}
          autoHideDuration={3000}
        >
          {snackbarMessage}
        </Snackbar>
      </Box>
    </Box>
  );
}
