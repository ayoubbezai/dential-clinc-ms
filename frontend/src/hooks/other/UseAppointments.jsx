import { AppointmentService } from "@/services/shared/AppointmentService";
import { useCallback, useEffect, useMemo, useState } from "react";
import _ from "lodash";

const UseAppointments = () => {
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const dbounceFetchAppointments = useMemo(() => {
        return _.debounce(async (start, end) => {
            if (!start || !end) {
                setError("Start date and end date are required");
                return;
            }

            setLoading(true);
            setError(null);

            try {
                const { data } = await AppointmentService.scheduleAppointments(start, end);
                console.log(data)
                setAppointments(data);
            } catch (err) {
                setError("Failed to fetch appointments", err);
            } finally {
                setLoading(false);
            }

        }, 0)
    }, [start, end])

    const fetchAppointmentsByDate = useCallback(() => {
        dbounceFetchAppointments(start, end)
    }, [dbounceFetchAppointments])

    useEffect(() => {
        if (start && end) {
            fetchAppointmentsByDate(start, end);
        }
    }, [start, end]);

    return { appointments, start, setStart, end, setEnd, loading, error };
};

export default UseAppointments; 