
import React, { useCallback, useEffect, useState } from "react";
import _ from "lodash";
import { folderDetailsService } from "@/services/dentist/folderDetailsService";
import { attachmentService } from "@/services/dentist/attachmentService";
import { folderService } from "@/services/dentist/foldersService";

const useFolder = (folderId) => {
    const [folderDetails, setFolderDetails] = useState();
    const [folderNotes, setFolderNotes] = useState();
    const [folderPayments, setFolderPayments] = useState();
    const [folderAppointments, setFolderAppointments] = useState();
    const [folderAttachments, setFolderAttachments] = useState();
    const [loading, setLoading] = useState(false);

    const [folderDetailsError, setFolderDetailsError] = useState(null);
    const [folderNotesError, setFolderNotesError] = useState(null);
    const [folderPaymentsError, setFolderPaymentsError] = useState(null);
    const [folderAppointmentsError, setFolderAppointmentsError] = useState(null);
    const [folderAttachmentsError, setFolderAttachmentsError] = useState(null);

    // Fetch all folder details (fetching everything except appointments)
    const fetchAllFolderDetails = useCallback(
        _.debounce(async (folderId) => {
            if (!folderId) return;
            setFolderDetailsError(null);
            setLoading(true);
            try {
                const response = await folderService.getAllFolderDetails(folderId);
                console.log("All Folder Details:", response);
                console.log("All Folder Details:", response.data.data);
                setFolderDetails(response.data.data);
                setFolderNotes(response.data.data.notes); // Set folder notes from response
                setFolderPayments(response?.data?.data?.payments); // Set folder payments
                setFolderAttachments(response.data.data.attachments); // Set folder attachments
                await fetchFolderAppointments(folderId)
            } catch (error) {
                setFolderDetailsError(error);
            } finally {
                setLoading(false);
            }
        }, 0),
        [folderId]
    );

    // Initial fetch using the fetchAllFolderDetails method (with useEffect)
    useEffect(() => {
        fetchAllFolderDetails(folderId);
    }, [folderId, fetchAllFolderDetails]);

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

    // Function to fetch folder notes
    const fetchFolderNotes = async (folderId) => {
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
    };

    // Function to fetch folder payments
    const fetchFolderPayments = async (folderId) => {
        if (!folderId) return;
        setFolderPaymentsError(null);
        setLoading(true);
        try {
            const response = await folderDetailsService.getFolderPayments(folderId);
            console.log("Folder Payments:", response.data.data);
            setFolderPayments(response.data.data);
        } catch (error) {
            setFolderPaymentsError(error);
        } finally {
            setLoading(false);
        }
    };

    // Function to fetch folder attachments
    const fetchFolderAttachments = async (folderId) => {
        if (!folderId) return;
        setFolderAttachmentsError(null);
        setLoading(true);
        try {
            const response = await attachmentService.getAllAttchments(folderId);
            console.log("Folder Attachments:", response);
            setFolderAttachments(response?.data?.attachments);
        } catch (error) {
            setFolderAttachmentsError(error);
        } finally {
            setLoading(false);
        }
    };

    // Function to fetch folder appointments (if needed, can be manually triggered)
    const fetchFolderAppointments = async (folderId) => {
        if (!folderId) return;
        setFolderAppointmentsError(null);
        setLoading(true);
        try {
            const response = await folderDetailsService.getFolderAppointments(folderId);
            console.log("Folder Appointments:", response);
            setFolderAppointments(response.data.data.appointments);
        } catch (error) {
            setFolderAppointmentsError(error);
        } finally {
            setLoading(false);
        }
    };



    return {
        loading,
        folderDetails,
        folderNotes,
        folderPayments,
        folderAppointments,
        folderAttachments,
        folderDetailsError,
        folderNotesError,
        folderPaymentsError,
        folderAppointmentsError,
        folderAttachmentsError,
        fetchAllFolderDetails,//fetch all details
        fetchFolderDetails,//fetch only fodler details
        fetchFolderNotes,
        fetchFolderPayments,
        fetchFolderAppointments,
        fetchFolderAttachments,
    };
};

export default useFolder;
