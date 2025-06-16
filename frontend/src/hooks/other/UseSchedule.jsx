import { EventsService } from "@/services/shared/EventsService";
import { useCallback, useEffect, useMemo, useState } from "react";
import _ from "lodash";

const UseSchedule = () => {
    // Set initial date range to current month
    const getInitialDateRange = () => {
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

        return {
            start: startOfMonth.toISOString().split('T')[0],
            end: endOfMonth.toISOString().split('T')[0]
        };
    };

    const initialRange = getInitialDateRange();
    const [start, setStart] = useState(initialRange.start);
    const [end, setEnd] = useState(initialRange.end);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const dbounceFetchEvents = useMemo(() => {
        return _.debounce(async (start, end) => {
            if (!start || !end) {
                setError("Start date and end date are required");
                return;
            }

            setLoading(true);
            setError(null);

            try {
                console.log('Fetching events for date range:', start, 'to', end);
                const { data, error } = await EventsService.scheduleEvents(start, end);

                if (error) {
                    console.error('API returned error:', error);
                    setError(error);
                    setEvents([]);
                } else {
                    console.log('API response data:', data);
                    console.log('Setting events:', data || []);
                    setEvents(data || []);
                }
            } catch (err) {
                console.error('Error fetching events:', err);
                setError("Failed to fetch events");
                setEvents([]);
            } finally {
                setLoading(false);
            }

        }, 300) // Add 300ms debounce to prevent rapid API calls
    }, []); // Remove start, end from dependencies to prevent recreation

    const fetchEventsByDate = useCallback((startDate, endDate) => {
        console.log('Fetching events for range:', startDate, 'to', endDate);
        dbounceFetchEvents(startDate, endDate);
    }, [dbounceFetchEvents]);

    useEffect(() => {
        if (start && end) {
            fetchEventsByDate(start, end);
        }
    }, [start, end, fetchEventsByDate]);

    return { events, start, setStart, end, setEnd, loading, error };
};

export default UseSchedule;
