import { useCalendarApp } from "@schedule-x/react";
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
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
      createViewMonthGrid(),
      createViewMonthAgenda(),
    ],

    events: events,
    plugins: [eventsService],
    locale: "fr-FR",
    isDark: false, // Enable dark mode


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
