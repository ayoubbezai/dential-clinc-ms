import { AppointmentService } from "@/services/shared/AppointmentService";
import { useCallback, useEffect, useMemo, useState } from "react";
import _ from "lodash";

const UseAppointments = () => {
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
                console.log('Fetching appointments for date range:', start, 'to', end);
                const { data } = await AppointmentService.scheduleAppointments(start, end);
                console.log('API response data:', data);
                console.log('Setting appointments:', data || []);
                setAppointments(data || []);
            } catch (err) {
                console.error('Error fetching appointments:', err);
                setError("Failed to fetch appointments");
                setAppointments([]);
            } finally {
                setLoading(false);
            }

        }, 300) // Add 300ms debounce to prevent rapid API calls
    }, []); // Remove start, end from dependencies to prevent recreation

    const fetchAppointmentsByDate = useCallback((startDate, endDate) => {
        console.log('Fetching appointments for range:', startDate, 'to', endDate);
        dbounceFetchAppointments(startDate, endDate);
    }, [dbounceFetchAppointments]);

    useEffect(() => {
        if (start && end) {
            fetchAppointmentsByDate(start, end);
        }
    }, [start, end, fetchAppointmentsByDate]);

    return { appointments, start, setStart, end, setEnd, loading, error };
};

export default UseAppointments; 