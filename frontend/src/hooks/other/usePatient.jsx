import { useState, useEffect } from "react";
import { patientService } from "@/services/dentist/patientService";
import { folderSevice } from "@/services/dentist/foldersService";

const usePatient = (patientId) => {
    const [patient, setPatient] = useState(null);
    const [folders, setFolders] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPatient = async (id) => {
        try {
            setLoading(true);
            const { data } = await patientService.getPatientDetails(id);
            const { folders } = await folderSevice.getPatientFolders(id);
            setPatient(data);
            setFolders(folders);

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

    return { patient, loading, error, folders };
};

export default usePatient;
