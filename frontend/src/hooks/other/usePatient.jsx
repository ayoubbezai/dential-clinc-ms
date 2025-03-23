import { useState, useEffect } from "react";
import { patientService } from "@/services/dentist/patientService";

const usePatient = (patientId) => {
    const [patient, setPatient] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPatient = async (id) => {
        try {
            setLoading(true);
            const { data } = await patientService.getPatientDetails(id);
            setPatient(data);
        } catch (err) {
            setError(err.message || "Failed to fetch patient data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (patientId) {
            fetchPatient(patientId);
        }
    }, [patientId]);

    return { patient, loading, error };
};

export default usePatient;
