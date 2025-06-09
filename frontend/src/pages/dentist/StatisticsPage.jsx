import React from 'react'
import useStatistic from '@/hooks/other/useStatistic';
import GenderChart from '@/components/charts/GenderChart';
import AgeChart from '@/components/charts/AgeChart';
import DiseaseChart from '@/components/charts/DiseaseChart';
import PatientGrowthChart from '@/components/charts/PatientGrowthChart';
import FolderStatusChart from '@/components/charts/FolderStatusChart';
import FolderPaymentChart from '@/components/charts/FolderPaymentChart';
import MostVisitedToothChart from '@/components/charts/MostVisitedToothChart';
import { WeekDayAppointmentsChart } from '@/components/charts/WeekDayAppointmentsChart';
import UserRolesChart from '@/components/charts/UserRolesChart';
import StockChart from '@/components/charts/StockChart';


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
            <div className='col-span-1'>
                <DiseaseChart total={stat?.patients?.total} withDiseases={stat?.patients?.diseases?.with} withoutDiseases={stat?.patients?.diseases?.without} />
            </div>
            <div className='col-span-1'>
                <PatientGrowthChart growthOfPatientsByMonths={stat?.patients?.growthOfPatientsByMonths} />
            </div>
            <div className='col-span-1'>
                <FolderStatusChart total={stat?.folders?.total} status={stat?.folders?.status} />
            </div>
            <div className='col-span-1'>
                <FolderPaymentChart total={stat?.folders?.total} paid={stat?.folders?.paid} />
            </div>
            <div className='col-span-1'>
                <MostVisitedToothChart mostVisitedTooth={stat?.appointments?.mostVisitedTooth} />
            </div>
            <div className='col-span-1'>
                <WeekDayAppointmentsChart byWeekDay={stat?.appointments?.byWeekDay} />
            </div>
            <div className='col-span-1'>
                <UserRolesChart total={stat?.users?.total} byRole={stat?.users?.byRole} />
            </div>
            <div className='col-span-1'>
                <StockChart stock={stat?.stock} />
            </div>
        </div>
    )
}

export default StatisticsPage
