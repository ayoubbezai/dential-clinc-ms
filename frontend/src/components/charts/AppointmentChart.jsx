import { useState } from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts'

const chartOptions = ['Last 6 Months', 'This Year']

const MONTHS = [
    'Jan', 'Feb', 'Mar', 'Apr',
    'May', 'Jun', 'Jul', 'Aug',
    'Sep', 'Oct', 'Nov', 'Dec'
]

// Shift months starting from current month
const getShiftedMonths = () => {
    const currentMonthIndex = new Date().getMonth();
    const months = [];

    for (let i = 12; i >= 0; i--) {
        const index = (currentMonthIndex - i + 12) % 12;
        months.push(MONTHS[index]);
    }

    return months;
};

export const AppointmentsChart = ({lastYearAppointems = [] }) => {
    const shiftedMonths = getShiftedMonths()
    const [selectedRange, setSelectedRange] = useState('Last 6 Months')


    // Map lastYearAppointems into a lookup
    const countMap = lastYearAppointems.reduce((acc, { month, count }) => {
        acc[month] = count
        return acc
    }, {})

    // Fill in all 12 months starting from current
    const fullData = shiftedMonths.map((month) => ({
        month,
        appointments: countMap[month] || 0,
    }))

    // Filter to last 6 if needed
    const data =
        selectedRange === 'Last 6 Months' ? fullData.slice(6, 13) : fullData.slice(1,13)

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
