"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '../../interface/user';
import Sidebar from '../../../../components/Sidebar';
import { IoMdSearch } from 'react-icons/io';
import axios from 'axios';

export default function DashboardPage() {
    const [admin, setAdmin] = useState<User | null>(null); // Trạng thái cho quản trị viên đăng nhập
    const [users, setUsers] = useState<User[]>([]); // Trạng thái cho danh sách người dùng
    const [search, setSearch] = useState<string>(''); // Trạng thái cho tìm kiếm người dùng
    const [filterRole, setFilterRole] = useState<string>(''); // Trạng thái cho lọc theo vai trò
    const [sortOrder, setSortOrder] = useState<string>('az'); // Trạng thái cho sắp xếp tên
    const [currentPage, setCurrentPage] = useState<number>(1); // Trạng thái cho trang hiện tại
    const pageNumber = 5; // Số lượng người dùng mỗi trang
    const router = useRouter();

    useEffect(() => {
        // Kiểm tra quản trị viên từ localStorage và lấy thông tin
        const checkLocal = localStorage.getItem('admin');
        if (!checkLocal) {
            router.push('/user/login');
        } else {
            const adminData = JSON.parse(checkLocal);
            fetch(`http://localhost:8080/users/${adminData.id}`)
                .then((response) => response.json())
                .then((data) => setAdmin(data))
                .catch((error) => console.error('Lỗi lấy thông tin admin:', error));
        }

        // Lấy danh sách người dùng từ API
        fetch(`http://localhost:8080/users`)
            .then((response) => response.json())
            .then((data) => setUsers(data))
            .catch((error) => console.error('Lỗi lấy danh sách người dùng:', error));
    }, [router]);

    // Lọc và sắp xếp người dùng theo tên
    const filteredUsers = users
        .filter(user =>
            user.name.toLowerCase().includes(search.toLowerCase()) &&
            (filterRole === '' || (filterRole === 'admin' ? user.role : !user.role)) // Lọc theo vai trò
        )
        .sort((a, b) => sortOrder === 'az' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));

    // Phân trang người dùng
    const indexOfLastUser = currentPage * pageNumber;
    const indexOfFirstUser = indexOfLastUser - pageNumber;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    // Hàm chuyển trang
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    // Hàm thay đổi trạng thái (mở/khóa) của người dùng
    const changeStatus = (user: User) => {
        const updatedUser = { ...user, status: !user.status };
        axios.put(`http://localhost:8080/users/${user.id}`, updatedUser)
            .then((response) => {
                setUsers((prevUsers) => prevUsers.map((u) => (u.id === user.id ? response.data : u)));
            })
            .catch((error) => console.error('Lỗi cập nhật trạng thái:', error));
    };

    return (
        <div className="flex">
            {/* Sidebar */}
            <Sidebar />
            {/* Nội dung chính */}
            <main className="flex-1 p-5 bg-gray-50">
                <header className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Customers</h1>
                    <div className="flex items-center space-x-6">
                        {/* Tìm kiếm người dùng */}
                        <div className="relative">
                            <IoMdSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                className="pl-8 pr-4 py-2 border rounded-full w-72 bg-gray-100"
                                placeholder="Tìm kiếm theo tên"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        {/* Hiển thị avatar admin */}
                        {admin && (
                            <div className="relative flex items-center justify-end">
                                <img src={admin.avatar || 'path/to/default-avatar.jpg'} className="w-10 h-10 rounded-full" alt="Admin Avatar" />
                                <span className="ml-2 text-gray-700">{admin.name}</span>
                            </div>
                        )}
                    </div>
                </header>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="flex justify-between mb-4">
                        <div className='flex gap-4'>
                            {/* Lọc theo vai trò */}
                            <select className="border px-4 py-2 rounded" value={filterRole} onChange={(e) => setFilterRole(e.target.value)}>
                                <option value="">Lọc theo vai trò</option>
                                <option value="admin">Admin</option>
                                <option value="users">Users</option>
                            </select>
                            {/* Sắp xếp theo tên */}
                            <select className="border px-4 py-2 rounded" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                                <option value="">Sắp xếp theo tên</option>
                                <option value="az">Sắp xếp A - Z</option>
                                <option value="za">Sắp xếp Z - A</option>
                            </select>
                        </div>
                    </div>

                    {/* Hiển thị danh sách người dùng */}
                    <table className="table-auto w-full border-collapse border border-gray-200 text-center">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 border">STT</th>
                                <th className="px-4 py-2 border">Avatar</th>
                                <th className="px-4 py-2 border">Tên</th>
                                <th className="px-4 py-2 border">Email</th>
                                <th className="px-4 py-2 border">Phone</th>
                                <th className="px-4 py-2 border">Role</th>
                                <th className="px-4 py-2 border">Date</th>
                                <th className="px-4 py-2 border">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentUsers.map((user: User, index: number) => (
                                <tr key={user.id}>
                                    <td className="px-4 py-2 border">{indexOfFirstUser + index + 1}</td>
                                    <td className="px-4 py-2 border">
                                        <div className="flex justify-center items-center">
                                            <img className="h-10 w-10 rounded-full" src={user.avatar} alt={user.name} />
                                        </div>
                                    </td>
                                    <td className="px-4 py-2 border">{user.name}</td>
                                    <td className="px-4 py-2 border">{user.email}</td>
                                    <td className="px-4 py-2 border">{user.phone}</td>
                                    <td className="px-4 py-2 border">
                                        <button className={`text-black px-3 py-1 rounded`}>{user.role ? "Admin" : "User"}</button>
                                    </td>
                                    <td className="px-4 py-2 border">{user.created_at}</td>
                                    <td className="px-4 py-2 border">
                                        <div className="flex justify-center gap-2">
                                            <button className="bg-blue-500 text-white px-3 py-1 rounded">View</button>
                                            {/* Nếu là admin thì không có nút thay đổi trạng thái */}
                                            {user.role ? '' : (
                                                <button onClick={() => changeStatus(user)} className={`${user.status ? "bg-green-500" : "bg-red-500"} text-white px-3 py-1 rounded`}>
                                                    {user.status ? "Đang mở" : "Đang khóa"}
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Phân trang */}
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
        </div>
    );
}