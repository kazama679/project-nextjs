import React from 'react'
import { FaProductHunt } from 'react-icons/fa';
import { IoIosLogOut } from 'react-icons/io';
import { MdCategory, MdDashboard, MdOutlineSettingsSuggest } from 'react-icons/md';
import { PiUsersFill } from 'react-icons/pi';
import { RiBillFill } from 'react-icons/ri';
import Sidebar from '../../../components/Sidebar';

export default function page() {
    return (
        <div>
            {/* admin */}
            <div className="flex">
                <Sidebar/>
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