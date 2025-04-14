"use client"

import { Bar, BarChart, XAxis, Tooltip, ResponsiveContainer } from "recharts"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/designSystem/card"
import { TrendingUp } from "lucide-react"

const appointmentData = [
    { day: "Mon", appointments: 12 },
    { day: "Tue", appointments: 19 },
    { day: "Wed", appointments: 15 },
    { day: "Thu", appointments: 22 },
    { day: "Fri", appointments: 18 },
    { day: "Sat", appointments: 8 },
]

export function TooltipDashboard() {
    const totalAppointments = appointmentData.reduce((sum, d) => sum + d.appointments, 0)
    const changePercentage = "+12.5%"

    return (
        <Card className="w-full h-full rounded-2xl border border-border bg-white border-gray-100  shadow-lg ">
            <CardHeader className=" py-1 px-5">
                <div className="flex justify-between items-center">
                    <CardTitle className="text-base font-semibold text-foreground">
                        Week Appointments
                    </CardTitle>
                    <div className="flex items-center gap-1 text-sm font-medium text-emerald-500">
                        <TrendingUp size={16} />
                        {changePercentage}
                    </div>
                </div>
            </CardHeader>

            <CardContent className="p- pb-2">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">


                    <div className="h-[200px] w-full ">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={appointmentData} barGap={4}>
                                <XAxis
                                    dataKey="day"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{
                                        fontSize: 12,
                                        fill: "hsl(215 20% 50%)",
                                    }}
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
                                />
                                <Bar
                                    dataKey="appointments"
                                    fill="hsl(221.2 83.2% 53.3%)"
                                    radius={[4, 4, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
