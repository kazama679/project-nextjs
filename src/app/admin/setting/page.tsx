import React from 'react'
import { FaProductHunt } from 'react-icons/fa';
import { IoIosLogOut } from 'react-icons/io';
import { MdCategory, MdDashboard, MdOutlineSettingsSuggest } from 'react-icons/md';
import { PiUsersFill } from 'react-icons/pi';
import { RiBillFill } from 'react-icons/ri';

export default function page() {
    return (
        <div>
            {/* admin */}
            <div className="flex">
                {/* Sidebar */}
                <aside className="w-64 bg-gray-800 text-white min-h-screen p-5">
                    <h2 className="text-2xl mb-6">Rikkei Academy</h2>
                    <nav>
                    <ul className="space-y-4">
                            <li>
                                <a href="/admin/dashboard" className="flex items-center px-4 text-gray-400 hover:text-white">
                                    <MdDashboard className="mr-2 flex-shrink-0" />
                                    <span className="flex-grow">Dashboard</span>
                                </a>
                            </li>
                            <li>
                                <a href="/admin/products" className="flex items-center hover:text-white px-4 text-gray-400">
                                    <FaProductHunt className="mr-2 flex-shrink-0" />
                                    <span className="flex-grow">Products</span>
                                </a>
                            </li>
                            <li>
                                <a href="/admin/orders" className="flex items-center hover:text-white px-4 text-gray-400">
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
                                <a href="/admin/setting" className="flex items-center hover:text-white px-4 text-white bg-gray-700 rounded-full py-2">
                                    <MdOutlineSettingsSuggest className="mr-2 flex-shrink-0" />
                                    <span className="flex-grow">Setting</span>
                                </a>
                            </li>
                            <li className="mt-auto">
                                <a href="/admin/" className="flex items-center text-red-400 hover:text-red-600 px-4">
                                    <IoIosLogOut className="mr-2 flex-shrink-0" />
                                    <span className="flex-grow">Log out</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </aside>

                {/* Main */}
                <main className="flex-1 p-5 bg-gray-50">
                    <header className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">Settings</h1>
                        <div className="flex items-center space-x-6">
                            <div className="relative">
                                <img src="path/to/avatar.jpg" className="w-10 h-10 rounded-full" alt="Admin Avatar" />
                            </div>
                        </div>
                    </header>
                    <div className="bg-white p-6 rounded-lg shadow-lg">

                    </div>
                </main>
            </div>
            {/* end-admin */}
        </div>
    )
}   