import React, { useCallback, useEffect, useState } from "react";
import _ from "lodash";
import { folderDetailsService } from "@/services/dentist/folderDetailsService";

const useFolder = (folderId) => {
    const [folderDetails, setFolderDetails] = useState();
    const [folderNotes, setFolderNotes] = useState();
    const [folderPayments, setFolderPayments] = useState();
    const [folderAppointments, setFolderAppointments] = useState(); 
    const [loading, setLoading] = useState(false);
    const [folderDetailsError, setFolderDetailsError] = useState(null);
    const [folderNotesError, setFolderNotesError] = useState(null);
    const [folderPaymentsError, setFolderPaymentsError] = useState(null);
    const [folderAppointmentsError, setFolderAppointmentsError] = useState(null); 

    const fetchFolderDetails = useCallback(
        _.debounce(async (folderId) => {
            if (!folderId) return;
            setFolderDetailsError(null);
            setLoading(true);
            try {
                const response = await folderDetailsService.getFolderDetails(folderId);
                console.log("Folder Details:", response);
                setFolderDetails(response.data.folder);
            } catch (error) {
                setFolderDetailsError(error);
            } finally {
                setLoading(false);
            }
        }, 0),
        [folderId]
    );

    useEffect(() => {
        fetchFolderDetails(folderId);
    }, [folderId, fetchFolderDetails]);

    const fetchFolderNotes = useCallback(
        _.debounce(async (folderId) => {
            if (!folderId) return;
            setFolderNotesError(null);
            setLoading(true);
            try {
                const response = await folderDetailsService.getFolderNotes(folderId);
                console.log("Folder Notes:", response);
                setFolderNotes(response.data.data);
            } catch (error) {
                setFolderNotesError(error);
            } finally {
                setLoading(false);
            }
        }, 0),
        [folderId]
    );

    useEffect(() => {
        fetchFolderNotes(folderId);
    }, [folderId, fetchFolderNotes]);

    const fetchFolderPayments = useCallback(
        _.debounce(async (folderId) => {
            if (!folderId) return;
            setFolderPaymentsError(null);
            setLoading(true);
            try {
                const response = await folderDetailsService.getFolderPayments(folderId);
                console.log("Folder Payments:", response);
                setFolderPayments(response.data.data);
            } catch (error) {
                setFolderPaymentsError(error);
            } finally {
                setLoading(false);
            }
        }, 0),
        [folderId]
    );

    useEffect(() => {
        fetchFolderPayments(folderId);
    }, [folderId, fetchFolderPayments]);

    const fetchFolderAppointments = useCallback(
        _.debounce(async (folderId) => {
            if (!folderId) return;
            setFolderAppointmentsError(null);
            setLoading(true);
            try {
                const response = await folderDetailsService.getFolderAppointments(folderId);
                console.log("Folder Appointments:", response);
                setFolderAppointments(response.data.data);
            } catch (error) {
                setFolderAppointmentsError(error);
            } finally {
                setLoading(false);
            }
        }, 0),
        [folderId]
    );

    useEffect(() => {
        fetchFolderAppointments(folderId);
    }, [folderId, fetchFolderAppointments]);

    return {
        loading,
        folderDetails,
        folderNotes,
        folderPayments,
        folderAppointments,
        folderDetailsError,
        folderNotesError,
        folderPaymentsError,
        folderAppointmentsError,
        fetchFolderDetails,
        fetchFolderNotes,
        fetchFolderPayments,
        fetchFolderAppointments
    };
};

export default useFolder;
