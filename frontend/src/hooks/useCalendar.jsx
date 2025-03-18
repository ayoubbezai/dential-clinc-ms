import { useCalendarApp } from "@schedule-x/react";
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  viewMonthGrid
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
      defaultView: viewMonthGrid.name,


    events: events,
    plugins: [eventsService],
    locale: "fr-FR",
    isDark: false, // Enable dark mode

    weekOptions: {
      /**
       * The total height in px of the week grid (week- and day views)
       * */
      gridHeight: 2000,

      /**
       * The number of days to display in week view
       */
      nDays: 5,

      /**
       * The width in percentage of the event element in the week grid
       * Defaults to 100, but can be used to leave a small margin to the right of the event
       */
      eventWidth: 95,

      /**
       * Intl.DateTimeFormatOptions used to format the hour labels on the time axis
       * Default: { hour: 'numeric' }
       */
      timeAxisFormatOptions: { hour: '2-digit', minute: '2-digit' },

      /**
       * Determines whether concurrent events can overlap.
       * Defaults to true. Set to false to disable overlapping.
       */
      eventOverlap: true,
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
