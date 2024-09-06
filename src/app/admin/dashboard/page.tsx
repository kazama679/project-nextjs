"use client";

import React, { useEffect, useState } from 'react';
import Sidebar from '../../../../components/Sidebar';
import { User } from '../../interface/user';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
    const [admin, setAdmin] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        const storedAdmin = localStorage.getItem('admin');
        if (!storedAdmin) { // Nếu chưa đăng nhập thì điều hướng về trang login
            router.push('/user/login');
        } else {
            const adminData = JSON.parse(storedAdmin);
            fetch(`http://localhost:8080/users/${adminData.id}`)
                .then((response) => response.json())
                .then((data) => setAdmin(data))
                .catch((error) => console.error('Error fetching admin data:', error));
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
                                    <img src={admin.avatar || 'path/to/default-avatar.jpg'} className="w-10 h-10 rounded-full" alt="Admin Avatar" />
                                    <span className="ml-2 text-gray-700">{admin.name}</span>
                                </div>
                            )}
                        </div>
                    </header>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        dashboard
                    </div>
                </main>
            </div>
        </div>
    );
}