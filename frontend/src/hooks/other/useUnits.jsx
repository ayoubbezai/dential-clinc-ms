import { useCallback, useEffect, useMemo, useState } from 'react';
import _ from 'lodash';
import { UnitsService } from '@/services/shared/UnitsService';

const useUnits = () => {
    const [units, setUnits] = useState();
    const [pagination, setPagination] = useState({});
    const [page, setPage] = useState(1);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const debounceFetchUnits = useMemo(() => {
        return _.debounce(async (page) => {
            setLoading(true);
            const { data, error } = await UnitsService.getAllUnits(
                page
            );

            console.log(data)

            if (data?.success) {
                setUnits(data.data);
                setPagination(data.pagination);
            } else {
                setError(error);
            }

            setLoading(false);
        }, 0);
    }, [page]);

    const fetchUnits = useCallback((page) => {
        debounceFetchUnits(page);
    }, [debounceFetchUnits]);

    useEffect(() => {
        fetchUnits(page);
    }, [page, fetchUnits]);


    return {
        units,
        pagination,
        page,
        setPage,
        loading,
        error,
        fetchUnits,
    };
};


export default useUnits
