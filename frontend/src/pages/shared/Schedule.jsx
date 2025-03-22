import { useState, useEffect } from 'react';
import { ScheduleXCalendar, useCalendarApp } from '@schedule-x/react';
import { createEventsServicePlugin } from '@schedule-x/events-service';
import { createViewMonthGrid, createViewDay } from '@schedule-x/calendar';
import '@schedule-x/theme-default/dist/index.css';
import UseSchedule from '@/hooks/UseSchedule';
import EventModel from '@/models/EventModel';
import "../../style/index.css"

function Schedule() {
    const eventsServicePlugin = useState(() => createEventsServicePlugin())[0];
    const { events, start, setStart, end, setEnd } = UseSchedule();
    const [prevEvents, setPrevEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });


    function DateUpdate(newStart, newEnd) {
        setStart(newStart);
        setEnd(newEnd);
        console.log("Setting new date done", newStart, newEnd);
    }

    const calendar = useCalendarApp({
        views: [createViewMonthGrid(), createViewDay()],
        events: events,
        plugins: [eventsServicePlugin],
        callbacks: {
            onRangeUpdate(range) {
                console.log('New calendar range start date', range.start);
                console.log('New calendar range end date', range.end);
                DateUpdate(range.start, range.end);
            },
            beforeRender($app) {
                const range = $app.calendarState.range.value;
                DateUpdate(range.start, range.end);
            },
            onEventClick(calendarEvent) {
                console.log('onEventClick', calendarEvent);
                setModalPosition({ x: event.clientX, y: event.clientY });

                setSelectedEvent(calendarEvent);
            },
            onDoubleClickEvent(calendarEvent) {
                console.log('onDoubleClickEvent', calendarEvent);
                setModalPosition({ x: event.clientX, y: event.clientY });

                setSelectedEvent(calendarEvent);
            },
        },
    });

    useEffect(() => {
        const newEvents = events.filter(event => !prevEvents.some(prev => prev.id === event.id));
        if (newEvents.length > 0) {
            newEvents.forEach(event => eventsServicePlugin.add(event));
            setPrevEvents([...prevEvents, ...newEvents]);
        }
    }, [events, eventsServicePlugin]);

    const handleCloseModal = () => {
        setSelectedEvent(null);
    };

    return (
        <div className='flex flex-col w-full items-center'>
            <ScheduleXCalendar calendarApp={calendar} />
            {selectedEvent &&
                <EventModel modalPosition={modalPosition} selectedEvent={selectedEvent} handleCloseModal={handleCloseModal} />
            }
        </div>
    );
}

export default Schedule;