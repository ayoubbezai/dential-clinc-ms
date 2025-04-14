import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent } from "@/components/designSystem/card";

const data = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
];

const COLORS = [
    "#1a75ff", // Primary - strong vibrant blue
    "#007c8f", // Supporting 2 - deep teal
    "#66c9d9", // Supporting 1 - soft cyan
    "#3b486b",
];
const VisitTypeBreakdown = () => {
    return (
        <Card className="py-4 px-1 border-gray-50 bg-white shadow-xl rounded-2xl h-full  mx-auto">
            <CardContent>
                <h2 className="text-lg font-semibold mb-4 text-center text-gray-800">Visit Type Breakdown</h2>
                <div className="h-60">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                outerRadius={80}
                                fill="#6366f1"
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};

export default VisitTypeBreakdown;
