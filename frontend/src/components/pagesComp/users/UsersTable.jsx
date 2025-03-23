import { Table, TableHeader, TableBody, TableHead, TableCell, TableRow } from '@/components/designSystem/table';
import { Badge } from '../../designSystem/badge';
import EditIcon from "../../../assets/icons/edit.svg";
import DeleteIcon from "../../../assets/icons/delete.svg";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { getRoleClasses } from '@/utils/classes/getRoleClasses';
import { UsersService } from '@/services/shared/UsersService';
import { useState } from 'react';
import toast from 'react-hot-toast';
import EditUserModel from '@/models/EditModels/EditUserModel';

const UsersTable = ({ users, fetchUsers, userLoading }) => {


    const [loading, setLoading] = useState(false);
    const [isEditModelOpen, setIsEditModelOpen] = useState(false)
    const [currentUser, setCurrentUser] = useState(null);




    async function handleDelete(userId) {
        setLoading(true);
        const { data, error } = await UsersService.deleteUser(userId);
        if (data?.success) {
            toast.success('Success! Patient deleted successfully');
            fetchUsers(); // Refresh the list after deletion
        } else {
            toast.error(error?.message || 'Error! Something went wrong.');
        }

        setLoading(false);
    }
    function handleEdit(user) {
        setCurrentUser(user);
        setIsEditModelOpen(true);
    }
    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>NAME</TableHead>
                        <TableHead>EMAIL</TableHead>
                        <TableHead>ROLE</TableHead>
                        <TableHead>CREATED DATE</TableHead>
                        <TableHead>ACTIONS</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {userLoading ? (
                        // Skeleton loading state
                        Array.from({ length: 5 }).map((_, index) => (
                            <TableRow key={index}>
                                <TableCell><Skeleton height={20} width={'80%'} /></TableCell>
                                <TableCell><Skeleton height={20} width={'70%'} /></TableCell>
                                <TableCell><Skeleton height={20} width={'50%'} /></TableCell>
                                <TableCell><Skeleton height={20} width={'60%'} /></TableCell>
                                <TableCell><Skeleton height={20} width={'30%'} /></TableCell>
                            </TableRow>
                        ))
                    ) : (
                        users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <Badge
                                        variant="default"
                                        className={getRoleClasses(user.role_name)

                                        }
                                    >
                                        {user.role_name}
                                    </Badge>
                                </TableCell>
                                <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                        <button className="cursor-pointer" onClick={() => handleEdit(user)} disabled={loading}
                                        >
                                            <img src={EditIcon} alt="edit" className="w-5" />
                                        </button>
                                        <button className="cursor-pointer" disabled={loading}
                                            onClick={() => handleDelete(user.id)}>
                                            <img src={DeleteIcon} alt="delete" className="w-5" />
                                        </button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>

            {isEditModelOpen && (
                <EditUserModel
                    isOpen={isEditModelOpen}
                    onClose={() => setIsEditModelOpen(false)}
                    currentUser={currentUser}
                    refreshUsers={fetchUsers}
                />
            )}
        </>
    );
};

export default UsersTable;