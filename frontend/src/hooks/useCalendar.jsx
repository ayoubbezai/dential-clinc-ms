import { useCalendarApp } from "@schedule-x/react";
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  viewMonthGrid
} from "@schedule-x/calendar";
import { createEventsServicePlugin } from '@schedule-x/events-service';
import '@schedule-x/theme-default/dist/index.css';
import { useEffect, useState } from 'react';
import { EventsService } from "@/services/shared/EventsService";

const useCalendar = () => {
  const eventsService = useState(() => createEventsServicePlugin())[0];
  const [events, setEvents] = useState([]);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("created_at");
  const [sortDirection, setSortDirection] = useState("asc");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [perPage, setPerPage] = useState(15);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPatients = async (page = 1, search = "", start = "", end = "") => {
    setLoading(true);
    const { data, error } = await EventsService.getEvents(perPage, search, start, end, sortBy, sortDirection, page);

    if (data?.success) {
      const filteredEvents = data.data.map(event => ({
        id: event.id,
        title: event.title,
        start: event.start,
        end: event.end,
        location: event.location,
        people: event.people || []
      }));

      setEvents(filteredEvents);
      setPagination(data.pagination);
      console.log("Mapped events:", filteredEvents);
    } else {
      setError(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    console.log("Events in state:", events);
  }, [events]);

  useEffect(() => {
    fetchPatients(page, search, start, end);
  }, [page, perPage, search, sortBy, sortDirection, start, end]);

  useEffect(() => {
    setPage(1);
  }, [perPage, search, sortBy, sortDirection, start, end]);

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
    isDark: false,
    weekOptions: {
      gridHeight: 2000,
      nDays: 5,
      eventWidth: 95,
      timeAxisFormatOptions: { hour: '2-digit', minute: '2-digit' },
      eventOverlap: true,
    },
    monthGridOptions: {
      nEventsPerDay: 6,
    },
    isResponsive: true,
    callbacks: {
      onRangeUpdate(range) {
        setStart(range.start);
        setEnd(range.end);
        console.log("New calendar range start date:", range.start);
        console.log("New calendar range end date:", range.end);
      },
      beforeRender($app) {
        const range = $app.calendarState.range.value;
        fetchPatients(page, search, range.start, range.end);
      },
    },
  });

  return {
    events,
    calander,
    pagination,
    page,
    setPage,
    search,
    setSearch,
    sortBy,
    setSortBy,
    sortDirection,
    setSortDirection,
    start,
    setStart,
    end,
    setEnd,
    perPage,
    setPerPage,
    loading,
    error,
    fetchPatients
  };
};

export default useCalendar;