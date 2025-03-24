import { useState, useEffect, useCallback } from "react";
import { patientService } from "@/services/dentist/patientService";
import { folderSevice } from "@/services/dentist/foldersService";
import _ from "lodash";

const usePatient = (patientId) => {
    const [patient, setPatient] = useState(null);
    const [folders, setFolders] = useState(null);
    const [loadingPatient, setLoadingPatient] = useState(true);
    const [loadingFolders, setLoadingFolders] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorPatient, setErrorPatient] = useState(null);
    const [errorFolders, setErrorFolders] = useState(null);

    // Fetch Patient Data
    const fetchPatient = useCallback(
        _.debounce(async (id) => {
            if (!id) return;
            setLoadingPatient(true);
            setLoading(true);
            setErrorPatient(null);

            try {
                const { data } = await patientService.getPatientDetails(id);
                setPatient(data);
                setLoadingPatient(false);

                // After fetching the patient successfully, fetch folders
                fetchFolders(id);
            } catch (err) {
                setErrorPatient(err.message || "Failed to fetch patient data");
                setLoadingPatient(false);
            }
        }, 300), [patientId]
    );

    // Fetch Folders Data only if patient did
    const fetchFolders = useCallback(
        _.debounce(async (id) => {
            if (!id) return;
            setLoadingFolders(true);
            setErrorFolders(null);

            try {
                const { folders } = await folderSevice.getPatientFolders(id);
                setFolders(folders);
            } catch (err) {
                setErrorFolders(err.message || "Failed to fetch folders");
            }
            setLoadingFolders(false);
            setLoading(false);
        }, 300), []
    );

    useEffect(() => {
        fetchPatient(patientId);
    }, [patientId, fetchPatient]);

    return {
        patient,
        folders,
        loading,
        loadingPatient,
        loadingFolders,
        errorPatient,
        errorFolders,
        refetchPatient: () => fetchPatient(patientId),
        refetchFolders: () => fetchFolders(patientId),
    };
};

export default usePatient;
