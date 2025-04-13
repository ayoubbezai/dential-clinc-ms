"use client"

import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell } from "recharts"
import { TrendingUp } from "lucide-react"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/designSystem/card"

// Dummy data: visit types
const visitData = [
    { type: "Cleaning", visits: 220, color: "hsl(221.2 83.2% 53.3%)" },
    { type: "Extraction", visits: 140, color: "hsl(174 70% 45%)" },
    { type: "Whitening", visits: 110, color: "hsl(48 100% 67%)" },
    { type: "Braces", visits: 80, color: "hsl(291 70% 60%)" },
    { type: "Check-up", visits: 160, color: "hsl(12 85% 60%)" },
]

export function VisitTypeBreakdown() {
    const totalVisits = visitData.reduce((sum, item) => sum + item.visits, 0)
    const changePercentage = "+7.8%"

    return (
        <Card className="w-full rounded-2xl border border-border bg-white shadow-lg">
            <CardHeader className="py-2 px-5">
                <div className="flex justify-between items-center">
                    <CardTitle className="text-base font-semibold text-foreground">
                        Visit Type Breakdown
                    </CardTitle>
                    <div className="flex items-center gap-1 text-sm font-medium text-emerald-500">
                        <TrendingUp size={16} />
                        {changePercentage}
                    </div>
                </div>
            </CardHeader>

            <CardContent className="p-5 pb-4">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                    <div className="space-y-1">
                        <p className="text-2xl font-bold">{totalVisits}</p>
                        <p className="text-xs text-muted-foreground">Total visits (last 6 months)</p>
                    </div>

                    <div className="h-[140px] w-full sm:w-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={visitData}
                                    dataKey="visits"
                                    nameKey="type"
                                    innerRadius={40}
                                    outerRadius={60}
                                    paddingAngle={3}
                                    cornerRadius={4}
                                >
                                    {visitData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
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
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
