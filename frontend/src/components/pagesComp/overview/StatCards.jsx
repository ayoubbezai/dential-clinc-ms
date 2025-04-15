import React from 'react'
import { User, Clock, Users, Bell } from 'lucide-react'

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

const StatCards = ({ stat }) => {

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
          {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
          ))}
      
    </>
  )
}

export default StatCards
