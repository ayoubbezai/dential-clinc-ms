import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
    AreaChart,
    Area,
    XAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts'

const MONTHS = [
    'Jan', 'Feb', 'Mar', 'Apr',
    'May', 'Jun', 'Jul', 'Aug',
    'Sep', 'Oct', 'Nov', 'Dec'
]

// Shift months starting from current month
const getShiftedMonths = () => {
    const currentMonthIndex = new Date().getMonth()
    const months = []

    for (let i = 12; i >= 0; i--) {
        const index = (currentMonthIndex - i + 12) % 12
        months.push(MONTHS[index])
    }

    return months
}

export const AppointmentsChart = ({ lastYearAppointems = [] }) => {
    const { t } = useTranslation('overview')

    // Dropdown options with translation keys as values
    const chartOptions = [
        { value: 'last_6', label: t('appointments_chart.last_6') },
        { value: 'this_year', label: t('appointments_chart.this_year') },
    ]

    const [selectedRange, setSelectedRange] = useState('last_6')

    // Map lastYearAppointems into a lookup object { month: count }
    const countMap = lastYearAppointems.reduce((acc, { month, count }) => {
        acc[month] = count
        return acc
    }, {})

    // Fill in all 12 months starting from current
    const shiftedMonths = getShiftedMonths()
    const fullData = shiftedMonths.map((month) => ({
        month,
        appointments: countMap[month] || 0,
    }))

    // Pick data slice based on selectedRange key
    const data = selectedRange === 'last_6' ? fullData.slice(6, 13) : fullData.slice(1, 13)

    return (
        <div className="bg-white rounded-2xl shadow-md p-6 h-full flex flex-col justify-between">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-lg font-bold text-[#223354]">{t('appointments_chart.title')}</h2>
                    <p className="text-sm text-gray-500">
                        {t('appointments_chart.subtitle', {
                            range: chartOptions.find((opt) => opt.value === selectedRange)?.label,
                        })}
                    </p>
                </div>
                <div className="relative">
                    <select
                        className="text-sm bg-gray-100 rounded-lg px-3 py-1 outline-none cursor-pointer text-gray-700"
                        value={selectedRange}
                        onChange={(e) => setSelectedRange(e.target.value)}
                    >
                        {chartOptions.map(({ value, label }) => (
                            <option key={value} value={value}>
                                {label}
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
                        formatter={(value) => [t('appointments_chart.tooltip', { count: value }), '']}
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
