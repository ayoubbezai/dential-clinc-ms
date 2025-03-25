import React, { useState, lazy, Suspense } from "react";
import { TableBody, TableCell, TableRow } from "@/components/designSystem/table";
import { Badge } from "@/components/designSystem/badge";
import FolderIcon from "../../../assets/icons/folder2.svg";
import FolderTableSkeleton from "@/Skeletons/FolderTableSkeleton";
import EditAndDelete from "../../small/EditAndDelete";
import { Link } from "react-router-dom";

// Lazy load the EditFolderModel
const EditFolderModel = lazy(() => import("@/models/EditModels/EditFolderModel"));

const statusColors = {
    working_on_it: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    done: "bg-red-100 text-red-800",
    default: "bg-blue-100 text-blue-800"
};

const FolderTableBody = ({ loading, folders, handleDelete, isEditFolderOpen, setIsEditFolderOpen, refetchFolders }) => {
    const [currentFolder, setCurrentFolder] = useState(null);

    const handleEdit = (folder) => {
        setCurrentFolder(folder);
        setIsEditFolderOpen(true);
    };

    return (
        <>
            <TableBody>
                {loading ? (
                    Array.from({ length: 5 }).map((_, index) => <FolderTableSkeleton key={index} />)
                ) : (
                    folders?.map((folder, index) => {
                        const statusClass = statusColors[folder.status] || statusColors.default;
                        return (
                            <TableRow key={index} className="bg-gray-50 hover:bg-gray-200">
                                <TableCell className="flex items-center gap-3">
                                    <Link className="flex items-center gap-2" to={`folder/${folder.id}`}>
                                        <img src={FolderIcon} alt="folder" className="w-10 h-8" />
                                        <span>{folder.folder_name}</span>
                                    </Link>
                                </TableCell>
                                <TableCell>${folder.price}</TableCell>
                                <TableCell>
                                    <Badge className={`${statusClass} px-3 py-1 rounded-md`}>
                                        {folder.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <EditAndDelete
                                        loading={loading}
                                        element={folder}
                                        handleDelete={handleDelete}
                                        handleEdit={() => handleEdit(folder)}
                                    />
                                </TableCell>
                            </TableRow>
                        );
                    })
                )}
            </TableBody>

            {/* Lazy Load Edit Folder Modal */}
            {isEditFolderOpen && currentFolder && (
                <Suspense fallback={<p>Loading...</p>}>
                    <EditFolderModel
                        isOpen={isEditFolderOpen}
                        onClose={() => setIsEditFolderOpen(false)}
                        folder={currentFolder}
                        refetchFolders={refetchFolders}
                    />
                </Suspense>
            )}
        </>
    );
};

export default FolderTableBody;
