import { statService } from '@/services/dentist/statService';
import React, { useState, useCallback, useEffect } from 'react';
import _ from 'lodash';

const useDashboardStat = () => {
    const [stat, setStat] = useState(null);
    const [statsLoading, setStatsLoading] = useState(false);
    const [statsError, setStatsError] = useState(null);

    const fetchStat = useCallback(
        _.debounce(async () => {
            setStatsLoading(true);
            setStatsError(null);
            try {
                const { data, error } = await statService.getDashboardData();
                if (error) throw new Error(error);
                setStat(data);
            } catch (err) {
                setStatsError(err.message);
            } finally {
                setStatsLoading(false);
            }
        }, 0), 
        []
    );

    
        useEffect(() => {
            fetchStat();
        }, [fetchStat]);

    return {
        stat,
        statsLoading,
        statsError,
        fetchStat
    };
};

export default useDashboardStat;
