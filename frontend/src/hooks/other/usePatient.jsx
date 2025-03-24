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

    // Fetch Folders Data (Move this up before fetchPatient)
    const fetchFolders = useCallback(
        _.debounce(async (id, perPage, search, page) => {
            if (!id) return;
            setLoadingFolders(true);
            setLoading(true);
            setErrorFolders(null);
            console.log("Fetching folders:", { id, perPage, search, page });


            try {
                const data = await folderService.getPatientFolders(id, perPage, search, page);
                console.log(data.data);
                setFolders(data?.data?.folders || []);
                setPagination(data?.data.pagination || {});
            } catch (err) {
                setErrorFolders(err.message || "Failed to fetch folders");
            }

            setLoadingFolders(false);
            setLoading(false);
        }, 300), [perPage, search, page] // Now properly updates when filters change
    );

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

                // Fetch folders only after fetching patient
                fetchFolders(id, perPage, search, page);
            } catch (err) {
                setErrorPatient(err.message || "Failed to fetch patient data");
                setLoadingPatient(false);
                setLoading(false);
            }
        }, 300), [patientId]
    );

    useEffect(() => {
        fetchPatient(patientId);
    }, [patientId, fetchPatient]);
    useEffect(() => {
        fetchFolders(patientId,perPage,search,page);
    }, [patientId, perPage, search, page]);

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
