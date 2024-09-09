import React from 'react'
import { FaProductHunt } from 'react-icons/fa';
import { IoIosLogOut, IoMdSearch } from 'react-icons/io';
import { MdCategory, MdDashboard, MdOutlineSettingsSuggest } from 'react-icons/md';
import { PiUsersFill } from 'react-icons/pi';
import { RiBillFill } from 'react-icons/ri';
import Sidebar from '../../../../components/Sidebar';

export default function page() {
    return (
        <div>
            {/* admin */}
            <div className="flex">
                <Sidebar/>
                {/* Main */}
                <main className="flex-1 p-5 bg-gray-50">
                    <header className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">Orders</h1>
                        <div className="flex items-center space-x-6">
                            <div className="relative">
                                <IoMdSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    className="pl-8 pr-4 py-2 border rounded-full w-72 bg-gray-100"
                                    placeholder="Search by product name"
                                />
                            </div>
                            <div className="relative">
                                <img src="path/to/avatar.jpg" className="w-10 h-10 rounded-full" alt="Admin Avatar" />
                            </div>
                        </div>
                    </header>
                    <div className="bg-white p-6 rounded-lg shadow-lg">

                        {/* tìm kiếm */}
                        <div className="flex justify-between mb-4">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded">+ Add Order</button>
                            <select className="border px-4 py-2 rounded">
                                <option>Sort by</option>
                                <option value="name">Name</option>
                                <option value="price">Price</option>
                                <option value="created_at">Date</option>
                            </select>
                        </div>
                        {/* end-tìm kiếm */}

                        <table className="table-auto w-full border-collapse border border-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 border">ID</th>
                                    <th className="px-4 py-2 border">Name</th>
                                    <th className="px-4 py-2 border">Status</th>
                                    <th className="px-4 py-2 border">Category</th>
                                    <th className="px-4 py-2 border">Price</th>
                                    <th className="px-4 py-2 border">Date</th>
                                    <th className="px-4 py-2 border">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* sản phẩm chi tiết */}
                                <tr>
                                    <td className="px-4 py-2 border">39842-231</td>
                                    <td className="px-4 py-2 border truncate">Macbook Pro 15</td>
                                    <td className="px-4 py-2 border">Available</td>
                                    <td className="px-4 py-2 border">Laptops</td>
                                    <td className="px-4 py-2 border">$2,999.00</td>
                                    <td className="px-4 py-2 border">20 Jan, 2022</td>
                                    <td className="px-4 py-2 border">
                                        <button className="bg-blue-500 text-white px-3 py-1 rounded">View</button>
                                        <button className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
                                        <button className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        {/* phân trang */}
                        <div className="flex justify-center space-x-2 mt-4">
                            <button className="px-3 py-1 border rounded">1</button>
                            <button className="px-3 py-1 border rounded bg-blue-500 text-white">2</button>
                            <button className="px-3 py-1 border rounded">3</button>
                        </div>
                    </div>
                </main>
            </div>
            {/* end-admin */}
        </div>
    )
}   