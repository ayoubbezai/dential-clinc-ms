import { useCallback, useEffect, useMemo, useState } from 'react';
import { medicnesService } from '@/services/shared/medicnesService';
import _ from 'lodash';

const useMedicine = (onLoaded ) => {
    const [medicines, setMedicines] = useState([]);
    const [pagination, setPagination] = useState({});
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("name");
    const [sortDirection, setSortDirection] = useState("asc");
    const [perPage, setPerPage] = useState(15);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const debounceFetchMedicines = useMemo(() => {
        return _.debounce(async (page) => {
            setLoading(true);
            const { data, error } = await medicnesService.getAllMedicines(
                perPage,
                search,
                sortBy,
                sortDirection,
                page
            );
            

            if (data?.success) {
                setMedicines(data.data);
                setPagination(data.pagination);
            } else {
                setError(error);
            }
            onLoaded?.();


            setLoading(false);
        }, 0);
    }, [page, perPage, search, sortBy, sortDirection]);

    const fetchMedicines = useCallback((page) => {
        debounceFetchMedicines(page);
    }, [debounceFetchMedicines]);

    useEffect(()=>{
        fetchMedicines(page);
    }, [page, fetchMedicines]);

    useEffect(() => {
        setPage(1); 
    }, [perPage, search, sortBy, sortDirection]);

    return {
        medicines,
        pagination,
        page,
        setPage,
        search,
        setSearch,
        sortBy,
        setSortBy,
        sortDirection,
        setSortDirection,
        perPage,
        setPerPage,
        loading,
        error,
        fetchMedicines,
    };
};

export default useMedicine;
