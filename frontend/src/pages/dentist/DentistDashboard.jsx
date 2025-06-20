import React, { useState } from 'react'
import { User, Clock, Users, Bell } from 'lucide-react'
import TopNavBar from '@/layouts/topNavBar'
import { TooltipDashboard } from '@/components/charts/TooltipDashboard'
import VisitTypeBreakdown from '@/components/charts/VisitTypeBreakdown'
import useDashboardStat from '@/hooks/other/useDashboardStat'
import { AppointmentsChart } from '@/components/charts/AppointmentChart'
import StatCards from '@/components/pagesComp/overview/StatCards'



const DentistDashboard = () => {
  const [selectedRange, setSelectedRange] = useState('Last 6 Months')
  const { stat } = useDashboardStat()



  return (
    <>
      <TopNavBar />
      <div className="w-full px-6 sm:px-8 py-4">
        <div className="grid grid-cols-12 gap-4">
          {/* Chart */}
          <div className="col-span-12 lg:col-span-6">
            <AppointmentsChart
              selectedRange={selectedRange}
              setSelectedRange={setSelectedRange}
              lastYearAppointems={stat?.lastYearAppointems}
            />
          </div>

          {/* Stat Cards */}
          <div className="col-span-12 lg:col-span-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <StatCards stat={stat} />
            </div>
          </div>

          {/* TooltipDashboard and VisitTypeBreakdown */}
          <div className="col-span-12 lg:col-span-6">
            <TooltipDashboard appointmentType={stat?.appointmentType} />
          </div>
          <div className="col-span-12 lg:col-span-6">
            <VisitTypeBreakdown stat={stat?.count?.folderVisitReasons} />
          </div>
        </div>
      </div>
    </>
  )
}

export default DentistDashboard
