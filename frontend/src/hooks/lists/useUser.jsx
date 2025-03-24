import { useCallback, useEffect, useState } from 'react';
import { UsersService } from '@/services/shared/UsersService';
import _ from "lodash"; // Import Lodash for debouncing

const useUser = () => {
    const [users, setUsers] = useState([]);
    const [pagination, setPagination] = useState({});
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [role, setRole] = useState("");
    const [sortBy, setSortBy] = useState("created_at");
    const [sortDirection, setSortDirection] = useState("asc");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [perPage, setPerPage] = useState(15);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchUsers = useCallback(
        _.debounce(async (page = 1) => {
            setLoading(true);
            const { data, error } = await UsersService.getUsers(perPage, search, role, startDate, endDate, sortBy, sortDirection, page);

            if (data?.success) {
                setUsers(data.data);
                setPagination(data.pagination);
            } else {
                setError(error);
            }
            setLoading(false);


        }

            , 0), [page, perPage, search, role, sortBy, sortDirection, startDate, endDate])


    useEffect(() => {
        fetchUsers(page);
    }, [page, fetchUsers]);

    useEffect(() => {
        setPage(1);
    }, [perPage, search, role, sortBy, sortDirection, startDate, endDate]);

    return {
        users,
        pagination,
        page,
        setPage,
        search,
        setSearch,
        role,
        setRole,
        sortBy,
        setSortBy,
        sortDirection,
        setSortDirection,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        perPage,
        setPerPage,
        loading,
        error,
        fetchUsers
    };
};

export default useUser;