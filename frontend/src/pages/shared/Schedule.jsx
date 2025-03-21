import { useState, useEffect } from 'react';
import { ScheduleXCalendar, useCalendarApp } from '@schedule-x/react';
import { createEventsServicePlugin } from '@schedule-x/events-service';
import { createViewMonthGrid } from '@schedule-x/calendar';
import { v4 as uuidv4 } from 'uuid';
import { createEventModalPlugin } from '@schedule-x/event-modal';
import '@schedule-x/theme-default/dist/index.css';

function Schedule() {
    const eventsServicePlugin = useState(() => createEventsServicePlugin())[0];
    const eventModal = createEventModalPlugin();
    const [events, setEvents] = useState([]); // State to hold events

    useEffect(() => {
        async function fetchEvents() {
            const url = "http://localhost:8000/api/events";
            const token = localStorage.getItem("token");

            try {
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }

                const json = await response.json();
                const fetchedEvents = json.data.map(event => ({
                    id: event.id,
                    title: event.title,
                    start: event.start,
                    end: event.end,
                    location: event.location,
                    people: event.people || [],
                }));

                console.log("Fetched Events:", fetchedEvents);
                setEvents(fetchedEvents); // Update state

                // Add each event to the calendar one by one
                fetchedEvents.forEach(event => {
                    eventsServicePlugin.add(event);
                });

            } catch (error) {
                console.error(error.message);
            }
        }

        fetchEvents(); // Fetch events on mount
    }, [eventsServicePlugin]);

    // Initialize calendar with an empty event list
    const calendar = useCalendarApp({
        views: [createViewMonthGrid()],
        events: [], // Start empty, events will be added dynamically
        selectedDate: '2024-11-18',
        plugins: [eventsServicePlugin],
    });

    eventModal.close();

    const handleAddEvent = () => {
        const newEvent = {
            id: uuidv4(),
            title: 'New Clicked Event',
            start: '2024-11-20 08:00',
            end: '2024-11-20 16:00',
        };

        console.log('Adding Event:', newEvent);
        setEvents(prevEvents => [...prevEvents, newEvent]); // Add to state
        eventsServicePlugin.add(newEvent); // Add event to calendar
    };

    return (
        <div>
            <button
                onClick={handleAddEvent}
                style={{ padding: '10px', marginBottom: '10px' }}
            >
                Add Event
            </button>

            <div style={{ width: '100vw', height: '100vh' }}>
                <ScheduleXCalendar calendarApp={calendar} />
            </div>
        </div>
    );
}

export default Schedule;
