import { useState, useEffect, useMemo } from 'react';
import { useCalendarApp } from '@schedule-x/react';
import { createEventsServicePlugin } from '@schedule-x/events-service';
import { createViewMonthGrid, createViewDay } from '@schedule-x/calendar';
import '@schedule-x/theme-default/dist/index.css';
import UseAppointments from '@/hooks/other/UseAppointments';
import "../../style/index.css";
import { Eventscolors } from '@/constant/EventsColor';
import { syncEvents, DateUpdate } from '@/utils/help/ScheduleHelp';

// Appointment status colors
const APPOINTMENT_COLORS = {
    scheduled: '#1a75ff', // Blue
    completed: '#10b981', // Green
    pending: '#f59e0b',   // Yellow
    cancelled: '#ef4444', // Red
    rescheduled: '#8b5cf6', // Purple
};

// Helper function to format date and time for Schedule-X
const formatDateTimeForScheduleX = (dateString, timeString = null) => {
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            console.warn('Invalid date:', dateString);
            return null;
        }

        // Format date as YYYY-MM-DD
        const formattedDate = date.toISOString().split('T')[0];

        // If time is provided, format it as HH:MM
        if (timeString) {
            // Handle different time formats
            let time;
            if (typeof timeString === 'string') {
                // If it's already in HH:MM format
                if (timeString.includes(':')) {
                    time = timeString.substring(0, 5); // Take only HH:MM
                } else {
                    // If it's a timestamp or other format, convert it
                    const timeDate = new Date(timeString);
                    time = timeDate.toTimeString().substring(0, 5);
                }
            } else {
                // If timeString is a number (minutes from midnight)
                const hours = Math.floor(timeString / 60);
                const minutes = timeString % 60;
                time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
            }
            return `${formattedDate} ${time}`;
        }

        // If no time, return just the date
        return formattedDate;
    } catch (error) {
        console.error('Error formatting date/time:', error);
        return null;
    }
};

// Accept t and i18n as parameters for translation
const useAppointmentCalendar = (setSelectedEvent, t, i18n) => {
    const eventsServicePlugin = useState(() => createEventsServicePlugin())[0];
    const [prevEvents, setPrevEvents] = useState([]);
    const { appointments, setStart, setEnd } = UseAppointments();
    const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });

    // Transform appointments to calendar events format - MEMOIZED to prevent infinite re-renders
    const events = useMemo(() => {
        if (!appointments || appointments.length === 0) return [];

        return appointments.map((appointment) => {
            console.log('Processing appointment:', appointment);

            // Check for different possible date field names
            const appointmentDate = appointment.date || appointment.appointmentDate || appointment.startDate || appointment.scheduledDate;
            const appointmentTime = appointment.time || appointment.appointmentTime || appointment.startTime;

            if (!appointmentDate) {
                console.warn('Appointment missing date field:', appointment);
                return null;
            }

            try {
                // Format start date/time for Schedule-X
                const start = formatDateTimeForScheduleX(appointmentDate, appointmentTime);
                if (!start) {
                    console.warn('Could not format start date/time for appointment:', appointment);
                    return null;
                }

                // Calculate end time (default 1 hour duration if not specified)
                const duration = appointment.duration || appointment.durationMinutes || 60;
                const startDate = new Date(appointmentDate);
                const endDate = new Date(startDate.getTime() + duration * 60000);
                const end = formatDateTimeForScheduleX(endDate.toISOString(), appointmentTime);

                if (!end) {
                    console.warn('Could not format end date/time for appointment:', appointment);
                    return null;
                }

                const event = {
                    id: appointment.id || `appointment-${Date.now()}-${Math.random()}`,
                    title: `${appointment.patientName || appointment.patient?.name || 'Unknown Patient'} - ${appointment.type || appointment.appointmentType || 'Appointment'}`,
                    start: start,
                    end: end,
                    color: APPOINTMENT_COLORS[appointment.status] || '#1a75ff',
                    description: appointment.notes || appointment.description || '',
                    isAppointment: true, // Flag to identify appointments
                };

                console.log('Created event:', event);
                return event;
            } catch (error) {
                console.error('Error processing appointment:', appointment, error);
                return null;
            }
        }).filter(event => event !== null);
    }, [appointments]); // Only depend on appointments, not on every render

    useEffect(() => {
        console.log('Syncing events with calendar...');
        syncEvents(events, prevEvents, setPrevEvents, eventsServicePlugin);
    }, [events, eventsServicePlugin, prevEvents]); // Include prevEvents in dependencies

    const calendar = useCalendarApp({
        views: [createViewMonthGrid(), createViewDay()],
        calendars: Eventscolors,
        events: events,
        // 👇 Localize calendar
        locale: i18n.language === 'fr' ? 'fr-FR' : 'en-US',
        plugins: [eventsServicePlugin],
        callbacks: {
            onRangeUpdate(range) {
                DateUpdate(range.start, range.end, setStart, setEnd);
            },
            beforeRender($app) {
                const range = $app.calendarState.range.value;
                DateUpdate(range.start, range.end, setStart, setEnd);
            },
            onEventClick(calendarEvent, event) {
                if (event) {
                    setModalPosition({ x: event.clientX, y: event.clientY });
                }
                setSelectedEvent(calendarEvent);
            },
        },
    });

    return { calendar, modalPosition, eventsServicePlugin };
};

export default useAppointmentCalendar; 