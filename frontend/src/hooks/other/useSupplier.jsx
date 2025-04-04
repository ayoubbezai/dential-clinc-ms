import { useCallback, useEffect, useMemo, useState } from 'react';
import _ from 'lodash';
import { suppliersService } from '@/services/shared/supplierService';
const useSupplier = () => {
    const [suppliers, setSuppliers] = useState();
    const [pagination, setPagination] = useState({});
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [sortDirection, setSortDirection] = useState("asc");
    const [perPage, setPerPage] = useState(15);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);


    const debounceFetchSuppliers = useMemo(() => {
        return _.debounce(async (page) => {
            setLoading(true);
            const { data, error } = await suppliersService.getAllSuppliers(
                perPage,
                search,
                sortBy,
                sortDirection,
                page
            );

            console.log(data)

            if (data?.success) {
                setSuppliers(data.data);
                setPagination(data.pagination);
            } else {
                setError(error);
            }

            setLoading(false);
        }, 0);
    }, [page, perPage, search, sortBy, sortDirection]);

    const fetchSuppliers = useCallback((page) => {
        debounceFetchSuppliers(page); 

    }, [debounceFetchSuppliers]);

    useEffect(() => {
        fetchSuppliers(page);
    }, [page, fetchSuppliers]);

    useEffect(() => {
        setPage(1);
    }, [perPage, search, sortBy, sortDirection]);

    return {
        suppliers,
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
        fetchSuppliers,
    };
};

export default useSupplier;
