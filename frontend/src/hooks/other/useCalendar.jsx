import { useState, useEffect, useMemo, useRef } from 'react';
import { useCalendarApp } from '@schedule-x/react';
import { createEventsServicePlugin } from '@schedule-x/events-service';
import { createViewMonthGrid, createViewDay } from '@schedule-x/calendar';
import '@schedule-x/theme-default/dist/index.css';
import UseSchedule from '@/hooks/other/UseSchedule';
import "../../style/index.css";
import { Eventscolors, COLORS } from '@/constant/EventsColor';
import { syncEvents, DateUpdate } from '@/utils/help/ScheduleHelp';

// Helper function to format date and time for Schedule-X - SAME AS APPOINTMENT CALENDAR
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
const useCalendar = (setSelectedEvent, t, i18n) => {
    const eventsServicePlugin = useState(() => createEventsServicePlugin())[0];
    const [prevEvents, setPrevEvents] = useState([]);
    const { events, setStart, setEnd } = UseSchedule();
    const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });

    // Use ref to track if we're currently updating dates to prevent race conditions
    const isUpdatingDates = useRef(false);
    const lastRangeRef = useRef(null);

    // Transform events to calendar events format - EXACTLY like useAppointmentCalendar
    const processedEvents = useMemo(() => {
        console.log('Raw events from database:', events);

        if (!events || events.length === 0) {
            console.log('No events to process');
            return [];
        }

        return events.map((event) => {
            console.log('Processing event:', event);

            // Check for different possible date field names that might come from the database
            const eventDate = event.date || event.start_date || event.startDate || event.scheduledDate || event.event_date;
            const eventTime = event.time || event.start_time || event.startTime || event.event_time;

            if (!eventDate) {
                console.warn('Event missing date field:', event);
                return null;
            }

            try {
                // Format start date/time for Schedule-X - SAME AS APPOINTMENT CALENDAR
                const start = formatDateTimeForScheduleX(eventDate, eventTime);
                if (!start) {
                    console.warn('Could not format start date/time for event:', event);
                    return null;
                }

                // Calculate end time (default 1 hour duration if not specified) - SAME AS APPOINTMENT CALENDAR
                const duration = event.duration || 60;
                const startDate = new Date(eventDate);
                const endDate = new Date(startDate.getTime() + duration * 60000);
                const end = formatDateTimeForScheduleX(endDate.toISOString(), eventTime);

                if (!end) {
                    console.warn('Could not format end date/time for event:', event);
                    return null;
                }

                // Generate a stable, unique ID for the event
                const eventId = event.id
                    ? `event-${event.id}`
                    : `event-${eventDate}-${eventTime || '00:00'}-${event.title || 'unknown'}`;

                // Map calendar ID to color
                let eventColor = '#1a75ff'; // Default blue color
                if (event.calendarId || event.calendar_id) {
                    const calendarId = event.calendarId || event.calendar_id;
                    const colorConfig = COLORS.find(c => c.id === calendarId);
                    if (colorConfig && Eventscolors[calendarId]) {
                        eventColor = Eventscolors[calendarId].lightColors.main;
                    }
                }

                const processedEvent = {
                    id: eventId,
                    title: event.title || event.name || 'Untitled Event',
                    start: start,
                    end: end,
                    color: eventColor,
                    description: event.description || event.notes || event.content || '',
                    calendarId: event.calendarId || event.calendar_id || 'default',
                };

                console.log('Created processed event:', processedEvent);
                return processedEvent;
            } catch (error) {
                console.error('Error processing event:', event, error);
                return null;
            }
        }).filter(event => event !== null);
    }, [events]); // Only depend on events, not on every render

    // Separate effect for syncing events to prevent unnecessary re-renders
    useEffect(() => {
        console.log('Syncing events with calendar...', {
            processedEventsCount: processedEvents.length,
            eventsCount: events?.length || 0
        });
        syncEvents(processedEvents, prevEvents, setPrevEvents, eventsServicePlugin);
    }, [processedEvents, eventsServicePlugin]); // Remove prevEvents from dependencies

    const calendar = useCalendarApp({
        views: [createViewMonthGrid(), createViewDay()],
        calendars: Eventscolors,
        events: processedEvents,
        // 👇 Localize calendar
        locale: i18n.language === 'fr' ? 'fr-FR' : 'en-US',
        plugins: [eventsServicePlugin],
        callbacks: {
            onRangeUpdate(range) {
                // Prevent race conditions by checking if we're already updating
                if (isUpdatingDates.current) {
                    console.log('Skipping range update - already updating dates');
                    return;
                }

                // Check if the range has actually changed
                const rangeKey = `${range.start}-${range.end}`;
                if (lastRangeRef.current === rangeKey) {
                    console.log('Skipping range update - same range');
                    return;
                }

                isUpdatingDates.current = true;
                lastRangeRef.current = rangeKey;

                console.log('Updating date range:', range.start, range.end);
                DateUpdate(range.start, range.end, setStart, setEnd);

                // Reset the flag after a short delay
                setTimeout(() => {
                    isUpdatingDates.current = false;
                }, 100);
            },
            beforeRender($app) {
                // Only update if we haven't already updated for this range
                const range = $app.calendarState.range.value;
                const rangeKey = `${range.start}-${range.end}`;

                if (lastRangeRef.current !== rangeKey && !isUpdatingDates.current) {
                    console.log('Initial render - setting date range:', range.start, range.end);
                    lastRangeRef.current = rangeKey;
                    DateUpdate(range.start, range.end, setStart, setEnd);
                }
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

export default useCalendar;
