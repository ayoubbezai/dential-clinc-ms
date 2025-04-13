import React, { useState } from 'react'
import { User, Clock, Users, Bell, TrendingUp, ChevronDown } from 'lucide-react'
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import TopNavBar from '@/layouts/topNavBar'

const chartOptions = ['Last 6 Months', 'This Year']
const stats = [
  {
    label: 'Total Patients',
    value: '3,781',
    icon: <User className="text-blue-600" size={28} />,
    growth: '+11.01%',
  },
  {
    label: "Today's Appointments",
    value: '3,781',
    icon: <Clock className="text-blue-600" size={28} />,
    growth: '+11.01%',
  },
  {
    label: 'New Users',
    value: '3,781',
    icon: <Users className="text-blue-600" size={28} />,
    growth: '+11.01%',
  },
  {
    label: 'Visits',
    value: '3,781',
    icon: <Bell className="text-blue-600" size={28} />,
    growth: '+11.01%',
  },
]

const chartDataSets = {
  'Last 6 Months': [
    { month: 'Jan', appointments: 300 },
    { month: 'Feb', appointments: 450 },
    { month: 'Mar', appointments: 320 },
    { month: 'Apr', appointments: 500 },
    { month: 'May', appointments: 420 },
    { month: 'Jun', appointments: 480 },
  ],
  'This Year': [
    { month: 'Jan', appointments: 200 },
    { month: 'Feb', appointments: 300 },
    { month: 'Mar', appointments: 400 },
    { month: 'Apr', appointments: 600 },
    { month: 'May', appointments: 500 },
    { month: 'Jun', appointments: 650 },
    { month: 'Jul', appointments: 720 },
    { month: 'Aug', appointments: 690 },
    { month: 'Sep', appointments: 800 },
    { month: 'Oct', appointments: 850 },
    { month: 'Nov', appointments: 750 },
    { month: 'Dec', appointments: 900 },
  ],
}

const StatCard = ({ label, value, icon, growth }) => (
  <div className="bg-white hover:shadow-lg transition-shadow duration-200 rounded-2xl shadow-md p-5 flex flex-col justify-between text-[#223354] h-full">
    <div className="flex justify-between items-start">
      <div>{icon}</div>
      {growth && (
        <div className="text-xs font-medium flex items-center gap-1 text-green-500">
          {growth}
          <TrendingUp size={14} />
        </div>
      )}
    </div>
    <div className="mt-4">
      <p className="text-[13px] font-semibold text-gray-600 mb-1">{label}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  </div>
)

const AppointmentsChart = ({ selectedRange, setSelectedRange }) => {
  const data = chartDataSets[selectedRange]

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 h-full flex flex-col justify-between">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-bold text-[#223354]">All Appointments</h2>
          <p className="text-sm text-gray-500">Overview of {selectedRange.toLowerCase()}</p>
        </div>
        <div className="relative">
          <select
            className="text-sm bg-gray-100 rounded-lg px-3 py-1 outline-none cursor-pointer text-gray-700"
            value={selectedRange}
            onChange={(e) => setSelectedRange(e.target.value)}
          >
            {chartOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={150}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorAppointments" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12, fill: '#6b7280' }}
          />
          <Tooltip
            contentStyle={{
              borderRadius: '10px',
              border: 'none',
              backgroundColor: '#fff',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              padding: '10px',
            }}
            formatter={(value) => [`${value} appointments`, '']}
          />
          <Area
            type="monotone"
            dataKey="appointments"
            stroke="#3b82f6"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorAppointments)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

const DentistDashboard = () => {
  const [selectedRange, setSelectedRange] = useState('Last 6 Months')

  return (
    <>
      <TopNavBar />

    <div className="w-full px-6 sm:px-8 py-4">
      
      <div className="grid grid-cols-12 gap-4">
        {/* Chart */}
        <div className="col-span-12 lg:col-span-6">
          <AppointmentsChart selectedRange={selectedRange} setSelectedRange={setSelectedRange} />
        </div>

        {/* Stat Cards */}
        <div className="col-span-12 lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </div>
    </div>
    </>
  )
}

export default DentistDashboard
