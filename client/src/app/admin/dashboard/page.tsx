"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import { User } from "../../interface/user";
import { useRouter } from "next/navigation";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from "recharts";

export default function DashboardPage() {
    const [admin, setAdmin] = useState<User | null>(null);
    const router = useRouter();

    // Dữ liệu cho biểu đồ LineChart và PieChart
    const earningsData = [
        { name: "Jan", earnings: 4000 },
        { name: "Feb", earnings: 3000 },
        { name: "Mar", earnings: 2000 },
        { name: "Apr", earnings: 2780 },
        { name: "May", earnings: 1890 },
        { name: "Jun", earnings: 2390 },
        { name: "Jul", earnings: 3490 },
        { name: "Aug", earnings: 2100 },
        { name: "Sep", earnings: 2500 },
        { name: "Oct", earnings: 2800 },
        { name: "Nov", earnings: 3100 },
        { name: "Dec", earnings: 4000 },
    ];

    const revenueData = [
        { name: "Category A", value: 400 },
        { name: "Category B", value: 300 },
        { name: "Category C", value: 300 },
        { name: "Category D", value: 200 },
    ];

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

    useEffect(() => {
        const storedAdmin = localStorage.getItem("admin");
        if (!storedAdmin) {
            router.push("/user/login");
        } else {
            const adminData = JSON.parse(storedAdmin);
            fetch(`http://localhost:8080/users/${adminData.id}`)
                .then((response) => response.json())
                .then((data) => setAdmin(data))
                .catch((error) => console.error("Error fetching admin data:", error));
        }
    }, [router]);

    return (
        <div>
            <div className="flex">
                <Sidebar />
                <main className="flex-1 p-5 bg-gray-50">
                    <header className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">Dashboard</h1>
                        <div className="flex items-center space-x-6">
                            {admin && (
                                <div className="relative flex items-center justify-end">
                                    <img
                                        src={admin.avatar || "path/to/default-avatar.jpg"}
                                        className="w-10 h-10 rounded-full"
                                        alt="Admin Avatar"
                                    />
                                    <span className="ml-2 text-gray-700">{admin.name}</span>
                                </div>
                            )}
                        </div>
                    </header>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        {/* Earnings Overview */}
                        <div className="grid grid-cols-4 gap-4 mb-6">
                            <div className="p-4 bg-white rounded-lg shadow">
                                <h3 className="text-sm text-gray-500">Earnings (Monthly)</h3>
                                <p className="text-lg font-bold">$40,000</p>
                            </div>
                            <div className="p-4 bg-white rounded-lg shadow">
                                <h3 className="text-sm text-gray-500">Earnings (Annual)</h3>
                                <p className="text-lg font-bold">$215,000</p>
                            </div>
                            <div className="p-4 bg-white rounded-lg shadow">
                                <h3 className="text-sm text-gray-500">Tasks</h3>
                                <p className="text-lg font-bold">50%</p>
                            </div>
                            <div className="p-4 bg-white rounded-lg shadow">
                                <h3 className="text-sm text-gray-500">Pending Requests</h3>
                                <p className="text-lg font-bold">18</p>
                            </div>
                        </div>
                        <div className="flex gap-20">
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold mb-4">Earnings Overview</h3>
                                <LineChart width={600} height={300} data={earningsData}>
                                    <Line type="monotone" dataKey="earnings" stroke="#8884d8" />
                                    <CartesianGrid stroke="#ccc" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                </LineChart>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-4">Revenue Sources</h3>
                                <PieChart width={400} height={400}>
                                    <Pie
                                        data={revenueData}
                                        cx={200}
                                        cy={200}
                                        labelLine={false}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {revenueData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
