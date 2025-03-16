import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react';
import {
    createViewDay,
    createViewMonthAgenda,
    createViewMonthGrid,
    createViewWeek,
} from '@schedule-x/calendar';
import { createEventsServicePlugin } from '@schedule-x/events-service';
import '@schedule-x/theme-default/dist/index.css';
import { useEffect, useState } from 'react';
import { FaClock, FaMapMarkerAlt, FaUsers, FaEdit, FaTrash } from 'react-icons/fa'; // Icons


function CalendarApp() {
    const [events, setEvents] = useState([]);

    const [selectedMonth, setSelectedMonth] = useState(new Date()); // Track the selected month
    const eventsService = useState(() => createEventsServicePlugin())[0];

    const events2 = [

        {
            id: '22',
            title: 'the dentist needs to buy somthing from',
            start: '2025-03-16 09:00',
            end: '2025-03-16 10:00',
            location: "here",
            people: ["ayoub", "bezai"],




        },
        {
            id: '22',
            title: 'Event 1',
            start: '2025-03-16 09:00',
            end: '2025-03-16 10:00',
            location: "here",
            people: ["ayoub", "bezai"]
        },
        {
            id: '22',
            title: 'Event 1',
            start: '2025-03-16 09:00',
            end: '2025-03-16 10:00',
            location: "here",
            people: ["ayoub", "bezai"]
        },
        {
            id: '22',
            title: 'Event 2',
            start: '2025-03-16',
            end: '2025-03-16',
            location: "here",
            people: ["ayoub", "bezai"]
        },
        {
            id: '22',
            title: 'Event 2',
            start: '2025-03-16',
            end: '2025-03-16',
            location: "here",
            people: ["ayoub", "bezai"]
        },
        {
            id: '22',
            title: 'Event 2',
            start: '2025-03-16',
            end: '2025-03-16',
            location: "here",
            people: ["ayoub", "bezai"]
        },
        {
            id: '22',
            title: 'Event 2',
            start: '2025-03-16',
            end: '2025-03-16',
            location: "here",
            people: ["ayoub", "bezai"]
        },
        {
            id: '22',
            title: 'Event 2',
            start: '2025-03-16',
            end: '2025-03-16',
            location: "here",
            people: ["ayoub", "bezai"]
        },
        {
            id: '22',
            title: 'Event 2',
            start: '2025-03-16',
            end: '2025-03-16',
            location: "here",
            people: ["ayoub", "bezai"]
        },
        {
            id: '22',
            title: 'Event 2',
            start: '2025-03-16',
            end: '2025-03-16',
            location: "here",
            people: ["ayoub", "bezai"]
        },
        {
            id: '22',
            title: 'Event 2',
            start: '2025-03-16',
            end: '2025-03-16',
            location: "here",
            people: ["ayoub", "bezai"]
        },


    ]


    const calendar = useCalendarApp({
        views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],

        events: events2,
        plugins: [eventsService],
        locale: 'fr-FR', // Set language to Chinese
        isDark: false, // Enable dark mode

        weekOptions: {
            gridHeight: 2500, // Height of the week grid
            nDays: 7, // Number of days to display in week view
            eventWidth: 95, // Width of events in the week grid
            timeAxisFormatOptions: { hour: '2-digit', minute: '2-digit' }, // Time format
            eventOverlap: false,


        },
        monthGridOptions: {
            nEventsPerDay: 6,
        },


        isResponsive: false,
        // skipValidation: true, // Skip event validation
        callbacks: {
            onRangeUpdate(range) {
                console.log('New calendar range start date:', range.start);
                console.log('New calendar range end date:', range.end);
            },
            onEventUpdate(updatedEvent) {
                console.log('Event updated:', updatedEvent);
            },
            onBeforeEventUpdate(oldEvent, newEvent, $app) {
                console.log('Before event update:', oldEvent, newEvent);
                return true; // Allow the update
            },
            onEventClick(calendarEvent) {
                console.log('Event clicked:', calendarEvent);
            },
            onDoubleClickEvent(calendarEvent) {
                console.log('Event double-clicked:', calendarEvent);
            },
            onClickDate(date) {
                console.log('Date clicked:', date);
            },
            onClickDateTime(dateTime) {
                console.log('Date and time clicked:', dateTime);
            },
            onClickAgendaDate(date) {
                console.log('Agenda date clicked:', date);
            },
            onDoubleClickAgendaDate(date) {
                console.log('Agenda date double-clicked:', date);
            },
            onDoubleClickDate(date) {
                console.log('Date double-clicked:', date);
            },
            onDoubleClickDateTime(dateTime) {
                console.log('Date and time double-clicked:', dateTime);
            },
            onClickPlusEvents(date) {
                console.log('"+ N events" clicked:', date);
            },
            onSelectedDateUpdate(date) {
                console.log('Selected date updated:', date);
            },
            isCalendarSmall($app) {
                return $app.elements.calendarWrapper?.clientWidth < 500;
            },
            beforeRender($app) {
                console.log('Before render:', $app);
            },
            onRender($app) {
                console.log('After render:', $app);
            },
        },
    });

    // Function to fetch events for the selected month
    const fetchEventsForMonth = async (monthDate) => {
        const startOfMonth = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
        const endOfMonth = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0);

        try {
            const response = await fetch(`/api/events?start=${startOfMonth.toISOString()}&end=${endOfMonth.toISOString()}`);
            const data = await response.json();
            setEvents(data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    // Fetch events when the selected month changes
    useEffect(() => {
        fetchEventsForMonth(selectedMonth);

    }, [selectedMonth]);

    // Listen for changes in the calendar's date
    useEffect(() => {
        const handleDateChange = () => {
            const currentDate = calendar.getDate(); // Get the current date from the calendar
            setSelectedMonth(currentDate); // Update the selected month
        };


        // Cleanup the event listener
        return () => {
        };
    }, [calendar]);

    return (
        <div className='flex p-4 bg-gray-100 max-h-screen'>
            {/* Sidebar */}
            <div className='w-52'>
                {/* Add sidebar content here */}
            </div>

            {/* Events List */}
            <div className='w-1/4 bg-white p-4 rounded-lg shadow-md overflow-y-auto'>
                <h2 className='text-lg font-bold mb-4'>Events List</h2>
                {events2.map((event, index) => (
                    <div
                        key={index}
                        className='mb-4 p-3 rounded-lg shadow-sm bg-blue-50 border-l-4 border-blue-500'
                    >
                        <div className='flex flex-row-reverse justify-between items-center'>{/* Edit and Delete Buttons */}
                            <div className='flex justify-end  space-x-2'>
                                <button
                                    className='p-1 text-blue-600 hover:text-blue-800'
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    className='p-1 text-red-600 hover:text-red-800'
                                >
                                    <FaTrash />
                                </button>
                            </div>
                            <h3 className='text-md mb-2 font-semibold text-blue-900'>
                                {event.title}
                            </h3></div>
                        <p className='text-xs flex items-center text-blue-600'>
                            <FaClock className='mr-2' /> {event.start}
                        </p>
                        <p className='text-xs flex items-center text-blue-600'>
                            <FaClock className='mr-2' /> {event.end}
                        </p>
                        <p className='text-xs flex items-center text-blue-600'>
                            <FaMapMarkerAlt className='mr-2' /> {event.location}
                        </p>
                        <p className='text-xs flex items-center text-blue-600'>
                            <FaUsers className='mr-2' /> {event.people.join(', ')}
                        </p>

                    </div>
                ))}
            </div>

            {/* Calendar */}
            <div className='w-3/4 ml-6'>
                <ScheduleXCalendar calendarApp={calendar} />
            </div>
        </div>

    );
}

export default CalendarApp;