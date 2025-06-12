'use client';
import { useEffect, useState } from 'react';
import Box from '@mui/joy/Box';
import CircularProgress from '@mui/joy/CircularProgress';
import Navbar from '../(components)/Navbar';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = { 'en-US': enUS };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });

export default function CalendarPage() {
  const [events, setEvents] = useState();
  const [view, setView] = useState('month');

  useEffect(() => {
    const lastView = localStorage.getItem('calendarView') || 'month';
    setView(lastView);
  }, []);

  useEffect(() => {
    fetch('/api')
      .then(res => res.json())
      .then(data => {
        const ev = data.businessTrips.map(trip => ({
          title: trip.title,
          start: new Date(trip.date),
          end: new Date(trip.date),
          allDay: true,
        }));
        setEvents(ev);
      });
  }, []);

  const handleViewChange = v => {
    setView(v);
    localStorage.setItem('calendarView', v);
  };

  return (
    <Box className='w-full h-screen'>
      <Navbar />
      <Box className='p-10 h-[90%]'>
        {events ? (
          <Calendar
            localizer={localizer}
            events={events}
            view={view}
            onView={handleViewChange}
            style={{ height: '100%' }}
          />
        ) : (
          <Box className='w-full h-full flex items-center justify-center'>
            <CircularProgress />
          </Box>
        )}
      </Box>
    </Box>
  );
}
