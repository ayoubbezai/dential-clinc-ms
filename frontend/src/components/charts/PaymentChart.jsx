import React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import "../../style/chart.css";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/designSystem/card";
import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/designSystem/chart";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/designSystem/select";

const chartConfig = {
    expand: {
        label: "Expand",
        color: "hsl(var(--chart-1))",
    },
    income: {
        label: "Income",
        color: "hsl(var(--chart-2))",
    },
};

export default function PaymentChart({ income_expense_stats, incomeExpenseDate, setIncomeExpenseDate }) {
    const filteredData = income_expense_stats?.filter((item) => {
        const date = new Date(item.date);
        const referenceDate = new Date();
        let daysToSubtract = incomeExpenseDate === "30d" ? 30 : incomeExpenseDate === "7d" ? 7 : 90;
        const startDate = new Date(referenceDate);
        startDate.setDate(startDate.getDate() - daysToSubtract);
        return date >= startDate;
    });

    return (
        <Card className="bg-white shadow-md border-b border-gray-100">
            <CardHeader className="flex items-center gap-3 pb-1 sm:flex-row">
                <div className="flex-1 text-center sm:text-left">
                    <CardTitle className="mb-2">Payment Insights</CardTitle>
                    <CardDescription>Tracking expenses & income trends</CardDescription>
                </div>
                <Select value={incomeExpenseDate} onValueChange={setIncomeExpenseDate}>
                    <SelectTrigger className="w-[140px] rounded-lg border-gray-200 shadow-sm">
                        <SelectValue placeholder="Last 3 months" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-200">
                        <SelectItem value="90d">Last 3 months</SelectItem>
                        <SelectItem value="30d">Last 30 days</SelectItem>
                        <SelectItem value="7d">Last 7 days</SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>

            <CardContent className="px-3 pt-3 sm:px-5">
                <ChartContainer config={chartConfig} className="aspect-auto h-[160px] w-full">
                    <AreaChart data={filteredData}>
                        <defs>
                            <linearGradient id="fillexpand" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-expand)" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="var(--color-expand)" stopOpacity={0.1} />
                            </linearGradient>
                            <linearGradient id="fillincome" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-income)" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="var(--color-income)" stopOpacity={0.1} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} stroke="hsl(var(--border))" />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={6}
                            minTickGap={20}
                            tickFormatter={(value) =>
                                new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                            }
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value) =>
                                        new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                                    }
                                    indicator="dot"
                                />
                            }
                        />
                        <Area dataKey="income" type="natural" fill="url(#fillincome)" stroke="var(--color-income)" stackId="a" />
                        <Area dataKey="expand" type="natural" fill="url(#fillexpand)" stroke="var(--color-expand)" stackId="a" />
                        <ChartLegend content={<ChartLegendContent />} />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
