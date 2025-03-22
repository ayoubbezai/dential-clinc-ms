import { useState, useEffect } from 'react';
import { ScheduleXCalendar, useCalendarApp } from '@schedule-x/react';
import { createEventsServicePlugin } from '@schedule-x/events-service';
import { createViewMonthGrid, createViewDay } from '@schedule-x/calendar';
import '@schedule-x/theme-default/dist/index.css';
import UseSchedule from '@/hooks/UseSchedule';
import EventModel from '@/models/EventModel';
import "../../style/index.css"
import { Eventscolors } from '@/utils/EventsColor';
import { Button } from '@/components/ui/button';
import AddEventModel from '@/models/AddEventModel';
function Schedule() {
    const eventsServicePlugin = useState(() => createEventsServicePlugin())[0];
    const { events, setStart, setEnd, start, end } = UseSchedule();
    const [prevEvents, setPrevEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
    const [isModalOpen, setIsModalOpen] = useState(false)




    function DateUpdate(newStart, newEnd) {
        setStart(newStart);
        setEnd(newEnd);
        console.log("Setting new date done", newStart, newEnd);
    }

    const calendar = useCalendarApp({
        views: [createViewMonthGrid(), createViewDay()],
        calendars: Eventscolors,
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

        }

        const deletedEvents = prevEvents.filter(prev => !events.some(event => event.id === prev.id));
        if (deletedEvents.length > 0) {
            deletedEvents.forEach(event => eventsServicePlugin.remove(event.id));
        }

        setPrevEvents(events);
    }, [events, eventsServicePlugin]);

    const handleCloseModal = () => {
        setSelectedEvent(null);
    };

    return (

        <>
            <div className='flex justify-between w-5/6 my-3 mt-5 mx-auto items-center'>

                <Button className={"text-white text-[13px] "} onClick={() => setIsModalOpen(true)}>+ Add Event</Button>
            </div>
            <div className='flex flex-col w-full items-center'>
                <ScheduleXCalendar calendarApp={calendar} />
                {selectedEvent &&
                    <EventModel modalPosition={modalPosition} selectedEvent={selectedEvent} handleCloseModal={handleCloseModal} eventsServicePlugin={eventsServicePlugin} />
                }
            </div>

            <AddEventModel isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>

        </>

    );
}

export default Schedule;