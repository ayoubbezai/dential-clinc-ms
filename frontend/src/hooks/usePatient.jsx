import { useState, useEffect, useCallback } from 'react';
import { PatientsService } from '@/services/shared/PatientsService';

const usePatient = (
    perPage = 15,
    search = "",
    gender = "",
    startDate = "",
    endDate = "",
    sortBy = "created_at",
    sortDirection = "asc",
    page = 1
) => {
    const [patients, setPatients] = useState([]);
    const [pagination, setPagination] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Memoize fetchPatients with useCallback
    const fetchPatients = useCallback(async () => {
        setLoading(true);
        try {
            const data = await PatientsService.getPatients(perPage, search, gender, startDate, endDate, sortBy, sortDirection, page);
            console.log("API Response:", data); // Log the API response
            if (data.success) {
                setPatients(data.data);
                setPagination(data.pagination);
            }
        } catch (err) {
            console.error("API Error:", err); // Log the error
            setError(err.message || "An error occurred while fetching patients.");
        } finally {
            setLoading(false);
        }
    }, [perPage, search, gender, startDate, endDate, sortBy, sortDirection, page]);

    // Fetch patients when the component mounts or dependencies change
    useEffect(() => {
        fetchPatients();
    }, [fetchPatients]);

    // Log patients state updates
    useEffect(() => {
        console.log("Patients state updated:", patients);
    }, [patients]);

    return { patients, pagination, loading, error, fetchPatients };
};

export default usePatient;