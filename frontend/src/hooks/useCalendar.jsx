import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from "@schedule-x/calendar";
import { createEventsServicePlugin } from '@schedule-x/events-service';
import '@schedule-x/theme-default/dist/index.css';
import { useState } from 'react';
import { events } from "@/constant/events";




const useCalendar = () => {
      const eventsService = useState(() => createEventsServicePlugin())[0];
  
  const calander = useCalendarApp({
    views: [
      createViewDay(),
      createViewWeek(),
      createViewMonthGrid(),
      createViewMonthAgenda(),
    ],

    events: events,
    plugins: [eventsService],
    locale: "fr-FR",
    isDark: false, // Enable dark mode

    weekOptions: {
      gridHeight: 2500, // Height of the week grid
      nDays: 7, // Number of days to display in week view
      eventWidth: 95, // Width of events in the week grid
      timeAxisFormatOptions: { hour: "2-digit", minute: "2-digit" },
      eventOverlap: false,
    },
    monthGridOptions: {
      nEventsPerDay: 6,
    },

    isResponsive: true,
    callbacks: {
      onRangeUpdate(range) {
        console.log("New calendar range start date:", range.start);
        console.log("New calendar range end date:", range.end);
      },
    },
  });
  return { events, calander };
}

export default useCalendar
