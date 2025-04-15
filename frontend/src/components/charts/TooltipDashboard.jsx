"use client"

import { Bar, BarChart, XAxis, Tooltip, ResponsiveContainer } from "recharts"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/designSystem/card"
import { TrendingUp } from "lucide-react"
import { Link } from "react-router-dom"



export function TooltipDashboard({ appointmentType }) {

    console.log(appointmentType)


    return (
        <Card className="w-full h-full rounded-2xl border border-border bg-white border-gray-100  shadow-lg ">
            <CardHeader className=" py-1 px-6">
                <div className="flex justify-between items-center">
                    <CardTitle className="text-base font-semibold text-foreground">
                         Appointments Type
                    </CardTitle>
                    <div className="flex items-center gap-1 text-sm font-medium text-blue-500">
                        <Link to={"/appointments_list"}>See All</Link>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="p- pb-2">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">


                    <div className="h-[200px] w-full ">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={appointmentType} barGap={4}>
                                <XAxis
                                    dataKey="type"
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
                                    dataKey="count"
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
