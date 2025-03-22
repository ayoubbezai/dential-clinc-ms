import { EventsService } from "@/services/shared/EventsService";
import { useEffect, useState } from "react";

const UseSchedule = () => {
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchEventsByDate = async (start, end) => {
        if (!start || !end) {
            setError("Start date and end date are required");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const { data } = await EventsService.scheduleEvents(start, end);
            console.log(data)
            setEvents(data);
        } catch (err) {
            setError("Failed to fetch events", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (start && end) {
            fetchEventsByDate(start, end);
        }
    }, [start, end]);

    return { events, start, setStart, end, setEnd, loading, error };
};

export default UseSchedule;
