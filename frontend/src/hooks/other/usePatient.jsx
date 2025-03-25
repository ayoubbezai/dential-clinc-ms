import { useState, useEffect, useCallback } from "react";
import { patientService } from "@/services/dentist/patientService";
import { folderService } from "@/services/dentist/foldersService";
import _ from "lodash";

const usePatient = (patientId) => {
    const [patient, setPatient] = useState(null);
    const [folders, setFolders] = useState(null);
    const [loadingPatient, setLoadingPatient] = useState(true);
    const [loadingFolders, setLoadingFolders] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorPatient, setErrorPatient] = useState(null);
    const [errorFolders, setErrorFolders] = useState(null);

    const [perPage, setPerPage] = useState(15);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState(null);

    // Fetch Patient Data (only patient, no folders)
    const fetchPatient = useCallback(
        _.debounce(async (id) => {
            if (!id) return;
            setLoadingPatient(true);
            setErrorPatient(null);

            try {
                const { data } = await patientService.getPatientDetails(id);
                setPatient(data);
            } catch (err) {
                setErrorPatient(err.message || "Failed to fetch patient data");
            } finally {
                setLoadingPatient(false);
            }
        },0),
        [patientId]
    );

    // Fetch Folders Data (separate from patient)
    const fetchFolders = useCallback(
        _.debounce(async (id, perPage, search, page) => {
            if (!id) return;
            setLoadingFolders(true);
            setLoading(true);
            setErrorFolders(null);

            try {
                const data = await folderService.getPatientFolders(id, perPage, search, page);
                setFolders(data?.data?.folders || []);
                setPagination(data?.data?.pagination || {});
            } catch (err) {
                setErrorFolders(err.message || "Failed to fetch folders");
            } finally {
                setLoadingFolders(false);
                setLoading(false);
            }
        }, 0),
        [perPage, search, page]
    );

    useEffect(() => {
        fetchPatient(patientId);
    }, [patientId, fetchPatient]);

    useEffect(() => {
        if (patientId) {
            fetchFolders(patientId, perPage, search, page);
        }
    }, [patientId, perPage, search, page, fetchFolders]);

    return {
        patient,
        folders,
        pagination,
        loading,
        loadingPatient,
        loadingFolders,
        errorPatient,
        errorFolders,
        perPage,
        search,
        page,
        setPerPage,
        setSearch,
        setPage,
        refetchPatient: () => fetchPatient(patientId),
        refetchFolders: () => fetchFolders(patientId, perPage, search, page),
    };
};

export default usePatient;
