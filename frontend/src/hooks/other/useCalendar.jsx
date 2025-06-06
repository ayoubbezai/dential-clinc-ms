import { useState, useEffect } from 'react';
import { useCalendarApp } from '@schedule-x/react';
import { createEventsServicePlugin } from '@schedule-x/events-service';
import { createViewMonthGrid, createViewDay } from '@schedule-x/calendar';
import '@schedule-x/theme-default/dist/index.css';
import UseSchedule from '@/hooks/other/UseSchedule';
import "../../style/index.css";
import { Eventscolors } from '@/constant/EventsColor';
import { syncEvents, DateUpdate } from '@/utils/help/ScheduleHelp';

// Accept t and i18n as parameters for translation
const useCalendar = (setSelectedEvent, t, i18n) => {
    const eventsServicePlugin = useState(() => createEventsServicePlugin())[0];
    const [prevEvents, setPrevEvents] = useState([]);
    const { events, setStart, setEnd } = UseSchedule();
    const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        syncEvents(events, prevEvents, setPrevEvents, eventsServicePlugin);
    }, [events, eventsServicePlugin]);

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

export default useCalendar;
