import { EventsService } from "@/services/shared/EventsService";
import { useCallback, useEffect, useMemo, useState } from "react";
import _ from "lodash";

const UseSchedule = () => {
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const dbounceFetchEvents = useMemo(()=>{
        return _.debounce(async(start,end)=>{
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

        },0)
    },[start,end])

    const fetchEventsByDate = useCallback(()=>{
        dbounceFetchEvents(start,end)
    }, [dbounceFetchEvents])

    useEffect(() => {
        if (start && end) {
            fetchEventsByDate(start, end);
        }
    }, [start, end]);

    return { events, start, setStart, end, setEnd, loading, error };
};

export default UseSchedule;
