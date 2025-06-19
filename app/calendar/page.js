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
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./calendar.css";

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
  const [events, setEvents] = useState();
  const [view, setView] = useState("month");
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const lastView = localStorage.getItem("calendarView") || "month";
    setView(lastView);
  }, []);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => {
        const ev = data.businessTrips.map((trip) => ({
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
      <Box className="p-10 h-[90%]">
        {events ? (
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
      </Box>
    </Box>
  );
}
