import React from 'react'
import useStatistic from '@/hooks/other/useStatistic';
import GenderChart from '@/components/charts/GenderChart';
import AgeChart from '@/components/charts/AgeChart';

const StatisticsPage = () => {
    const { stat, statsLoading, statsError, fetchStat } = useStatistic();
    console.log(stat);
    return (
        <div className='p-4 grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='col-span-1'>
                <GenderChart total={stat?.patients?.total} male={stat?.patients?.gender?.male} female={stat?.patients?.gender?.female} />
            </div>
            <div className='col-span-1'>
                <AgeChart total={stat?.patients?.total} ageGroups={stat?.patients?.ageGroups} />
            </div>

        </div>
    )
}

export default StatisticsPage
