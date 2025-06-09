import React from "react"
import { Bar, BarChart, XAxis, Tooltip, ResponsiveContainer } from "recharts"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/designSystem/card"
import { useTranslation } from "react-i18next"

export function WeekDayAppointmentsChart({ byWeekDay = [] }) {
    const { t } = useTranslation("statistics")

    // Define all 7 days of the week
    const allDays = [
        { day: "Monday", label: t("weekdays.monday", "Monday") },
        { day: "Tuesday", label: t("weekdays.tuesday", "Tuesday") },
        { day: "Wednesday", label: t("weekdays.wednesday", "Wednesday") },
        { day: "Thursday", label: t("weekdays.thursday", "Thursday") },
        { day: "Friday", label: t("weekdays.friday", "Friday") },
        { day: "Saturday", label: t("weekdays.saturday", "Saturday") },
        { day: "Sunday", label: t("weekdays.sunday", "Sunday") },
    ]

    // Create complete data with all days, filling in 0 for missing days
    const completeData = allDays.map(({ day, label }) => {
        const existingData = byWeekDay.find(item => item.day_of_week === day)
        return {
            day: label,
            count: existingData ? existingData.count : 0,
            originalDay: day
        }
    })

    // Calculate total appointments
    const totalAppointments = completeData.reduce((sum, item) => sum + item.count, 0)

    // Find the busiest day
    const busiestDay = completeData.reduce((max, item) =>
        item.count > max.count ? item : max, completeData[0]
    )

    if (!byWeekDay.length) {
        return (
            <Card className="w-full h-full rounded-2xl border border-border bg-white border-gray-100 shadow-lg flex items-center justify-center">
                <p className="text-gray-500">{t("weekday_appointments.no_data", "No appointment data available.")}</p>
            </Card>
        )
    }

    return (
        <Card className="w-full h-full rounded-2xl border border-border bg-white border-gray-100 shadow-lg">
            <CardHeader className="py-1 px-6">
                <div className="flex justify-between items-center">
                    <CardTitle className="text-base font-semibold text-foreground">
                        {t("weekday_appointments.title", "Appointments by Day")}
                    </CardTitle>
                    <div className="text-sm font-medium text-blue-500">
                        {totalAppointments} {t("common.total", "Total")}
                    </div>
                </div>
            </CardHeader>

            <CardContent className="p-4 pb-2">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                    <div className="h-[200px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={completeData} barGap={2}>
                                <XAxis
                                    dataKey="day"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{
                                        fontSize: 11,
                                        fill: "hsl(215 20% 50%)",
                                    }}
                                    angle={-45}
                                    textAnchor="end"
                                    height={60}
                                />
                                <Tooltip
                                    wrapperStyle={{ outline: "none" }}
                                    contentStyle={{
                                        background: "hsl(0 0% 100%)",
                                        border: "1px solid hsl(240 5.9% 90%)",
                                        borderRadius: "0.5rem",
                                        padding: "0.5rem 0.75rem",
                                        fontSize: "12px",
                                        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                                    }}
                                    labelStyle={{ display: "none" }}
                                    cursor={{ fill: "hsl(210 20% 95%)" }}
                                    formatter={(value, name, props) => [
                                        `${value}`,
                                        t("weekday_appointments.appointments", "appointments")
                                    ]}
                                />
                                <Bar
                                    dataKey="count"
                                    fill="hsl(221.2 83.2% 53.3%)"
                                    radius={[4, 4, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Summary Stats */}
                <div className="mt-4 pt-3 border-t border-gray-100">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                            <div className="text-lg font-bold text-blue-600">
                                {busiestDay.count}
                            </div>
                            <div className="text-xs text-gray-600">
                                {t("weekday_appointments.busiest_day", "Busiest Day")}
                            </div>
                            <div className="text-xs text-gray-500">
                                {busiestDay.day}
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-lg font-bold text-gray-600">
                                {Math.round(totalAppointments / 7 * 10) / 10}
                            </div>
                            <div className="text-xs text-gray-600">
                                {t("weekday_appointments.average_per_day", "Avg/Day")}
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
} 