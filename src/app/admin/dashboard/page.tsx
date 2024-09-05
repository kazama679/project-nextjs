"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaProductHunt } from 'react-icons/fa';
import { IoIosLogOut } from 'react-icons/io';
import { MdCategory, MdDashboard, MdOutlineSettingsSuggest } from 'react-icons/md';
import { PiUsersFill } from 'react-icons/pi';
import { RiBillFill } from 'react-icons/ri';

type Admin = {
    id: number;
    name: string;
    email: string;
    status: boolean;
    role: boolean;
    avatar: string;
    phone: string;
    address: string;
    created_at: string;
    updated_at: string;
};

export default function DashboardPage() {
    const [admin, setAdmin] = useState<Admin | null>(null);
    const router = useRouter();

    useEffect(() => {
        const storedAdmin = localStorage.getItem('admin');
        if (!storedAdmin) { // nếu chx đăng nhập thì đẩy về login
            router.push('/user/login');
        } else {
            const adminData = JSON.parse(storedAdmin);
            fetch(`http://localhost:8080/users/${adminData.id}`)
                .then((response) => response.json())
                .then((data) => setAdmin(data))
                .catch((error) => console.error('Error fetching admin data:', error));
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('admin');
        router.push('/user/login')
    };

    return (
        <div>
            {/* admin */}
            <div className="flex">
                <aside className="w-64 bg-gray-800 text-white min-h-screen p-5">
                    <h2 className="text-2xl mb-6">Rikkei Academy</h2>
                    <nav>
                        <ul className="space-y-4">
                            <li>
                                <a href="#" className="flex items-center bg-gray-700 rounded-full py-2 px-4 text-white">
                                    <MdDashboard className="mr-2 flex-shrink-0" />
                                    <span className="flex-grow">Dashboard</span>
                                </a>
                            </li>
                            <li>
                                <a href="/admin/products" className="flex items-center text-gray-400 hover:text-white px-4">
                                    <FaProductHunt className="mr-2 flex-shrink-0" />
                                    <span className="flex-grow">Products</span>
                                </a>
                            </li>
                            <li>
                                <a href="/admin/orders" className="flex items-center text-gray-400 hover:text-white px-4">
                                    <RiBillFill className="mr-2 flex-shrink-0" />
                                    <span className="flex-grow">Orders</span>
                                </a>
                            </li>
                            <li>
                                <a href="/admin/customers" className="flex items-center text-gray-400 hover:text-white px-4">
                                    <PiUsersFill className="mr-2 flex-shrink-0" />
                                    <span className="flex-grow">Customers</span>
                                </a>
                            </li>
                            <li>
                                <a href="/admin/category" className="flex items-center text-gray-400 hover:text-white px-4">
                                    <MdCategory className="mr-2 flex-shrink-0" />
                                    <span className="flex-grow">Category</span>
                                </a>
                            </li>
                            <li>
                                <a href="/admin/setting" className="flex items-center text-gray-400 hover:text-white px-4">
                                    <MdOutlineSettingsSuggest className="mr-2 flex-shrink-0" />
                                    <span className="flex-grow">Settings</span>
                                </a>
                            </li>
                            <li className="mt-auto">
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center text-red-400 hover:text-red-600 px-4"
                                >
                                    <IoIosLogOut className="mr-2 flex-shrink-0" />
                                    <span className="flex-grow">Log out</span>
                                </button>
                            </li>
                        </ul>
                    </nav>
                </aside>

                {/* Main */}
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
            {/* end-admin */}
        </div>
    );
}