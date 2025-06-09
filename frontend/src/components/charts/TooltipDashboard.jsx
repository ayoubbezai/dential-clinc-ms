import { Bar, BarChart, XAxis, Tooltip, ResponsiveContainer, YAxis } from "recharts"
import {
    Card,
    CardContent,
} from "@/components/designSystem/card"
import { useTranslation } from "react-i18next"

export function TooltipDashboard({ appointmentType = [] }) {
    const { t } = useTranslation("overview")

    // Map for translating appointment types
    const typeLabels = {
        scheduled: t('appointments.scheduled', 'Scheduled'),
        completed: t('appointments.completed', 'Completed'),
        pending: t('appointments.pending', 'Pending'),
        cancelled: t('appointments.cancelled', 'Cancelled'),
        rescheduled: t('appointments.rescheduled', 'Rescheduled'),
    }

    // Transform data to use translated labels
    const translatedData = appointmentType.map(({ type, count }) => ({
        type: typeLabels[type] || type,
        count,
    }))

    const totalAppointments = translatedData.reduce((sum, item) => sum + item.count, 0);

    if (!appointmentType.length) {
        return (
            <Card className="py-3 px-4 border-gray-50 bg-gradient-to-br from-white to-blue-50 shadow-xl rounded-2xl h-full mx-auto">
                <CardContent>
                    <h2 className="text-lg font-bold text-gray-800 mb-4">
                        {t('appointments.type_title', 'Appointments Type')}
                    </h2>
                    <div className="flex items-center justify-center h-64 text-gray-500">
                        <p>{t('appointments.no_data', 'No appointment data available.')}</p>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="py-3 px-4 border-gray-50 bg-gradient-to-br from-white to-blue-50 shadow-xl rounded-2xl h-full mx-auto">
            <CardContent>
                <h2 className="text-lg font-bold text-gray-800 mb-4">
                    {t('appointments.type_title', 'Appointments Type')}
                </h2>

                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={translatedData} barGap={8}>
                            <XAxis
                                dataKey="type"
                                axisLine={false}
                                tickLine={false}
                                tick={{
                                    fontSize: 12,
                                    fill: "#6b7280",
                                }}
                                interval={0}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{
                                    fontSize: 12,
                                    fill: "#6b7280",
                                }}
                            />
                            <Tooltip
                                wrapperStyle={{ outline: "none" }}
                                contentStyle={{
                                    backgroundColor: '#ffffff',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                    fontSize: '12px',
                                }}
                                cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
                                formatter={(value, name, props) => [
                                    `${value} (${totalAppointments > 0 ? ((value / totalAppointments) * 100).toFixed(1) : 0}%)`,
                                    props.payload.type
                                ]}
                            />
                            <Bar
                                dataKey="count"
                                radius={[4, 4, 0, 0]}
                                fill="#1a75ff"
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}
