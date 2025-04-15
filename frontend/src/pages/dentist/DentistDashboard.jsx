import React, { useState } from 'react'
import { User, Clock, Users, Bell } from 'lucide-react'
import TopNavBar from '@/layouts/topNavBar'
import { TooltipDashboard } from '@/components/charts/TooltipDashboard'
import VisitTypeBreakdown from '@/components/charts/VisitTypeBreakdown'
import useDashboardStat from '@/hooks/other/useDashboardStat'
import { AppointmentsChart } from '@/components/charts/AppointmentChart'

const StatCard = ({ label, value, icon }) => (
  <div className="bg-white hover:shadow-lg transition-shadow duration-200 rounded-2xl shadow-md p-5 flex flex-col justify-between text-[#223354] h-full">
    <div className="flex justify-between items-start">
      <div>{icon}</div>
    </div>
    <div className="mt-4">
      <p className="text-[13px] font-semibold text-gray-600 mb-1">{label}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  </div>
)

const DentistDashboard = () => {
  const [selectedRange, setSelectedRange] = useState('Last 6 Months')
  const { stat, statsLoading, statsError } = useDashboardStat()

  const stats = [
    {
      label: 'Total Patients',
      value: stat?.count?.patientsNumber ?? '—',
      icon: <User className="text-blue-600" size={28} />,
    },
    {
      label: "Today's Appointments",
      value: stat?.count?.appointmentsNumber ?? '—',
      icon: <Clock className="text-blue-600" size={28} />,
    },
    {
      label: 'New Users',
      value: stat?.count?.usersNumber ?? '—',
      icon: <Users className="text-blue-600" size={28} />,
    },
    {
      label: 'Visits',
      value: 'N/A',
      icon: <Bell className="text-blue-600" size={28} />,
    },
  ]

  return (
    <>
      <TopNavBar />
      <div className="w-full px-6 sm:px-8 py-4">
        <div className="grid grid-cols-12 grid-rows-2 gap-4">
          {/* Chart */}
          <div className="col-span-12 row-span-1 lg:col-span-6">
            <AppointmentsChart
              selectedRange={selectedRange}
              setSelectedRange={setSelectedRange}
              lastYearAppointems={stat?.lastYearAppointems}
            />
          </div>

          {/* Stat Cards */}
          <div className="col-span-12 row-span-1 lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>

          {/* TooltipDashboard and VisitTypeBreakdown */}
          <div className="col-span-6 row-span-1">
            <TooltipDashboard appointmentType={stat?.appointmentType} />
          </div>
          <div className="col-span-6 row-span-1">
            <VisitTypeBreakdown />
          </div>
        </div>
      </div>
    </>
  )
}

export default DentistDashboard
