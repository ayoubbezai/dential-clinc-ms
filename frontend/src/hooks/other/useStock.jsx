import { useCallback, useEffect, useMemo, useState } from 'react';
import _ from 'lodash';
import { StocksService } from '@/services/shared/StocksService';

const useStock = () => {
    const [stocks, setStocks] = useState();
    const [pagination, setPagination] = useState({});
    const [statistics, setStatistics] = useState();
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [stockStatus, setStockStatus] = useState();
    const [sortBy, setSortBy] = useState("");
    const [sortDirection, setSortDirection] = useState("asc");
    const [perPage, setPerPage] = useState(15);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const debounceFetchStocks = useMemo(() => {
        return _.debounce(async (page) => {
            setLoading(true);
            const { data, error } = await StocksService.getAllStcok(
                perPage,
                search,
                stockStatus,
                sortBy,
                sortDirection,
                page
            );

            console.log(data)

            if (data?.success) {
                setStocks(data.data);
                setPagination(data.pagination);
                setStatistics(data.statistics)
                
            } else {
                setError(error);
            }

            setLoading(false);
        }, 0);
    }, [page, perPage, search, stockStatus, sortBy, sortDirection]);

    const fetchStocks = useCallback((page) => {
        debounceFetchStocks(page);
    }, [debounceFetchStocks]);

    useEffect(() => {
        fetchStocks(page);
    }, [page, fetchStocks]);

    useEffect(() => {
        setPage(1);
    }, [perPage, search, sortBy,stockStatus, sortDirection]);

    return {
        stocks,
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
        stockStatus,
        setStockStatus,
        fetchStocks,
        statistics
    };
};

export default useStock;
