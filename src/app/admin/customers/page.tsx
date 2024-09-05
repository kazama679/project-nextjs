"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaProductHunt } from 'react-icons/fa';
import { IoIosLogOut, IoMdSearch } from 'react-icons/io';
import { MdCategory, MdDashboard, MdOutlineSettingsSuggest } from 'react-icons/md';
import { PiUsersFill } from 'react-icons/pi';
import { RiBillFill } from 'react-icons/ri';

type User = {
    id: number;
    name: string;
    email: string;
    status: boolean;
    password: string;
    role: boolean;
    avatar: string;
    phone: string;
    address: string;
    created_at: string;
    updated_at: string;
    cart: Array<any>;
};

export default function DashboardPage() {
    const [admin, setAdmin] = useState<User | null>(null);
    const [users, setUsers] = useState<User[]>([]);
    const [search, setSearch] = useState<string>('');
    const [filterRole, setFilterRole] = useState<string>(''); // Trạng thái cho lọc theo vai trò
    const [sortOrder, setSortOrder] = useState<string>('az'); // Trạng thái cho sắp xếp
    const [currentPage, setCurrentPage] = useState<number>(1); // Trang hiện tại
    const pageNumber = 5; // Số lượng người mỗi trang
    const router = useRouter();

    useEffect(() => {
        const checkLocal = localStorage.getItem('admin');
        if (!checkLocal) {
            router.push('/user/login');
        } else {
            const adminData = JSON.parse(checkLocal);
            fetch(`http://localhost:8080/users/${adminData.id}`)
                .then((response) => response.json())
                .then((data) => setAdmin(data))
                .catch((error) => console.error('Error fetching admin data:', error));
        }

        // Lấy dữ liệu của users
        fetch(`http://localhost:8080/users`)
            .then((response) => response.json())
            .then((data) => setUsers(data))
            .catch((error) => console.error('Error fetching users data:', error));
    }, [router]);

    // Lọc và sắp xếp người dùng
    const filteredUsers = users
        .filter(user => 
            user.name.toLowerCase().includes(search.toLowerCase()) && // Lọc theo tìm kiếm
            (filterRole === '' || (filterRole === 'admin' ? user.role : !user.role)) // Lọc theo vai trò
        )
        .sort((a, b) => {
            if (sortOrder === 'az') {
                return a.name.localeCompare(b.name);
            } else {
                return b.name.localeCompare(a.name);
            }
        });

    // Phân trang người dùng
    const indexOfLastUser = currentPage * pageNumber;
    const indexOfFirstUser = indexOfLastUser - pageNumber;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    // Chuyển trang
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const handleLogout = () => {
        localStorage.removeItem('admin');
        router.push('/user/login');
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
                                <a href="/admin/orders" className="flex items-center text-gray-400 hover:text-white px-4">
                                    <RiBillFill className="mr-2 flex-shrink-0" />
                                    <span className="flex-grow">Orders</span>
                                </a>
                            </li>
                            <li>
                                <a href="/admin/customers" className="flex items-center hover:text-white px-4 text-white bg-gray-700 rounded-full py-2">
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
                                <a href="/admin/" className="flex items-center text-red-400 hover:text-red-600 px-4">
                                    <IoIosLogOut className="mr-2 flex-shrink-0" />
                                    <span className="flex-grow" onClick={handleLogout}>Log out</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </aside>

                {/* main */}
                <main className="flex-1 p-5 bg-gray-50">
                    <header className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">Customers</h1>
                        <div className="flex items-center space-x-6">
                            <div className="relative">
                                <IoMdSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    className="pl-8 pr-4 py-2 border rounded-full w-72 bg-gray-100"
                                    placeholder="Tìm kiếm theo tên"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)} // Tìm kiếm theo tên
                                />
                            </div>
                            <div className="relative">
                                {admin && (
                                    <div className="relative flex items-center justify-end">
                                        <img src={admin.avatar || 'path/to/default-avatar.jpg'} className="w-10 h-10 rounded-full" alt="Admin Avatar" />
                                        <span className="ml-2 text-gray-700">{admin.name}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </header>
                    <div className="bg-white p-6 rounded-lg shadow-lg">

                        {/* tìm kiếm và sắp xếp */}
                        <div className="flex justify-between mb-4">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded">+ Add Customers</button>
                            <div className='flex gap-4'>
                                <select className="border px-4 py-2 rounded" value={filterRole} onChange={(e) => setFilterRole(e.target.value)}>
                                    <option value="">Lọc theo vai trò</option>
                                    <option value="admin">Admin</option>
                                    <option value="users">Users</option>
                                </select>
                                <select className="border px-4 py-2 rounded" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                                    <option value="az">Sắp xếp A - Z</option>
                                    <option value="za">Sắp xếp Z - A</option>
                                </select>
                            </div>
                        </div>
                        {/* end-tìm kiếm và sắp xếp */}

                        <table className="table-auto w-full border-collapse border border-gray-200 text-center">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 border">STT</th>
                                    <th className="px-4 py-2 border">Tên</th>
                                    <th className="px-4 py-2 border">Email</th>
                                    <th className="px-4 py-2 border">Role</th>
                                    <th className="px-4 py-2 border">Date</th>
                                    <th className="px-4 py-2 border">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentUsers.map((item: User, index: number) => (
                                    <tr key={item.id}>
                                        <td className="px-4 py-2 border">{indexOfFirstUser + index + 1}</td>
                                        <td className="px-4 py-2 border">{item.name}</td>
                                        <td className="px-4 py-2 border">{item.email}</td>
                                        <td className="px-4 py-2 border">{item.role ? 'Admin' : 'User'}</td>
                                        <td className="px-4 py-2 border">{item.created_at}</td>
                                        <td className="px-4 py-2 border">
                                            <div className="flex justify-center gap-2">
                                                <button className="bg-blue-500 text-white px-3 py-1 rounded">View</button>
                                                <button className={`${item.status ? "bg-green-500" : "bg-red-500"} text-white px-3 py-1 rounded`}>{item.status ? "Đang mở" : "Đang khóa"}</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* phân trang */}
                        <div className="flex justify-center space-x-2 mt-4">
                            {Array.from({ length: Math.ceil(filteredUsers.length / pageNumber) }, (_, index) => (
                                <button
                                    key={index}
                                    onClick={() => paginate(index + 1)}
                                    className={`px-3 py-1 border rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : ''}`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                </main>
                {/* end-main */}
            </div>
            {/* end-admin */}
        </div>
    );
}
