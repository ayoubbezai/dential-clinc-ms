import React from 'react'
import { TableBody, TableCell, TableRow } from '@/components/designSystem/table';
import { Badge } from '@/components/designSystem/badge';
import FolderIcon from "../../../assets/icons/folder2.svg";

import FolderTableSkeleton from '@/Skeletons/FolderTableSkeleton';
import EditAndDelete from '../../small/EditAndDelete';
const FolderTableBody = ({ loading, folders }) => {
    return (
        <TableBody>
            {loading ? (
                Array.from({ length: 5 }).map((_, index) => (
                    <FolderTableSkeleton index={index} />

                ))) : folders?.data?.folders?.map((folder, index) => (
                    <TableRow key={index} className={"bg-gray-50 hover:bg-gray-200"}>
                        <TableCell className="flex items-center gap-3">
                            <img src={FolderIcon} alt="folder" className='w-10 h-8' />
                            <span>{folder.folder_name}</span>
                        </TableCell>
                        <TableCell>${folder.price}</TableCell>
                        <TableCell><Badge variant="default">{folder.status}</Badge></TableCell>
                        <TableCell >
                            <EditAndDelete />


                        </TableCell>
                    </TableRow>
                ))}
        </TableBody>
    )
}

export default FolderTableBody
