import { useState, useEffect, useCallback, useMemo } from "react";
import { patientService } from "@/services/dentist/patientService";
import { folderService } from "@/services/dentist/foldersService";
import _ from "lodash";

const usePatient = (patientId) => {
    const [patient, setPatient] = useState(null);
    const [folders, setFolders] = useState([]);
    const [pagination, setPagination] = useState({});

    const [loadingPatient, setLoadingPatient] = useState(true);
    const [loadingFolders, setLoadingFolders] = useState(false);

    const [errorPatient, setErrorPatient] = useState(null);
    const [errorFolders, setErrorFolders] = useState(null);

    const [perPage, setPerPage] = useState(15);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const debouncedFetchPatient = useMemo(() => {
        return _.debounce(async (id) => {
            if (!id) return;
            setLoadingPatient(true);
            setErrorPatient(null);
            try {
                const { data } = await patientService.getPatientDetails(id);
                console.log(data)
                setPatient(data);
            } catch (err) {
                setErrorPatient(err.message || "Failed to fetch patient data");
            } finally {
                setLoadingPatient(false);
            }
        }, 0);
    }, []);

    const debouncedFetchFolders = useMemo(() => {
        return _.debounce(async (id, perPage, search, page) => {
            if (!id) return;
            setLoadingFolders(true);
            setErrorFolders(null);
            try {
                const data = await folderService.getPatientFolders(id, perPage, search, page);
                setFolders(data?.data?.folders || []);
                setPagination(data?.data?.pagination || {});
            } catch (err) {
                setErrorFolders(err.message || "Failed to fetch folders");
            } finally {
                setLoadingFolders(false);
            }
        }, 0); 
    }, []);

    const fetchPatient = useCallback((id) => {
        debouncedFetchPatient(id);
    }, [debouncedFetchPatient]);

    const fetchFolders = useCallback((id, perPage, search, page) => {
        debouncedFetchFolders(id, perPage, search, page);
    }, [debouncedFetchFolders]);

    useEffect(() => {
        fetchPatient(patientId);
    }, [patientId, fetchPatient]);

    useEffect(() => {
        fetchFolders(patientId, perPage, search, page);
    }, [patientId, perPage, search, page, fetchFolders]);

    useEffect(() => {
        setPage(1);
    }, [perPage, search]);

    return {
        patient,
        folders,
        pagination,
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
