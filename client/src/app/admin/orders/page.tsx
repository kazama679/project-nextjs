"use client"
import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import { IoMdSearch } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "../../../../store/reducers/userReducer";
import { getAllOrder } from "../../../../store/reducers/orderReducer";
import { useRouter } from "next/navigation";

export default function Orders() {
    const router = useRouter();
    const [userLocal, setUserLocal] = useState<any>(null);
    const [searchName, setSearchName] = useState<string>("");
    const [sortOrder, setSortOrder] = useState<string>("");
    const [filterStatus, setFilterStatus] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [ordersPerPage] = useState<number>(5);

    const dispatch = useDispatch();
    const users = useSelector((state: any) => state.userReducer.users);
    const orders = useSelector((state: any) => state.orderReducer.orders);

    useEffect(() => {
        dispatch(getAllUser());
        dispatch(getAllOrder());
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUserLocal(JSON.parse(storedUser));
        }
    }, [dispatch]);

    const formatVND = (price: number) => price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

    // Tính tổng tiền cho mỗi đơn hàng
    const calculateTotal = (cart: any[], ship: number) => {
        const totalProducts = cart.reduce((total, item) => total + item.price * item.quantity, 0);
        return totalProducts + ship;
    };

    // Lọc đơn hàng theo tên và trạng thái
    const filteredOrders = orders
        .filter((item: any) => item.name.toLowerCase().includes(searchName.toLowerCase()))
        .filter((item: any) => !filterStatus || item.status === filterStatus);

    // Sắp xếp đơn hàng theo ngày
    const sortedOrders = filteredOrders.sort((a: any, b: any) => {
        if (sortOrder === "moi") {
            return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        } else if (sortOrder === "cu") {
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        }
        return 0;
    });

    // Tính toán số trang
    const totalPages = Math.ceil(sortedOrders.length / ordersPerPage);

    // Lấy dữ liệu đơn hàng cho trang hiện tại
    const currentOrders = sortedOrders.slice(
        (currentPage - 1) * ordersPerPage,
        currentPage * ordersPerPage
    );

    // Chuyển trang
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            <div className="flex">
                <Sidebar />
                <main className="flex-1 p-5 bg-gray-50">
                    <header className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">Orders</h1>
                        <div className="flex items-center space-x-6">
                            <div className="relative">
                                <IoMdSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    className="pl-8 pr-4 py-2 border rounded-full w-72 bg-gray-100"
                                    placeholder="Tìm kiếm theo tên"
                                    value={searchName}
                                    onChange={(e) => setSearchName(e.target.value)}
                                />
                            </div>
                            <div className="relative">
                                <img
                                    src="path/to/avatar.jpg"
                                    className="w-10 h-10 rounded-full"
                                    alt="Admin Avatar"
                                />
                            </div>
                        </div>
                    </header>

                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <div className="flex justify-between mb-4">
                            <div className="flex gap-4">
                                <select className="border px-4 py-2 rounded" onChange={(e) => setSortOrder(e.target.value)}>
                                    <option value="">Sắp xếp theo ngày</option>
                                    <option value="moi">Sắp xếp từ cũ đến mới</option>
                                    <option value="cu">Sắp xếp từ mới đến cũ</option>
                                </select>
                                <select className="border px-4 py-2 rounded" onChange={(e) => setFilterStatus(e.target.value)}>
                                    <option value="">Lọc theo trạng thái</option>
                                    <option value="choDuyet">Chờ duyệt</option>
                                    <option value="daDuyet">Đã duyệt</option>
                                    <option value="daGui">Giao hàng thành công</option>
                                </select>
                            </div>
                        </div>

                        <table className="table-auto w-full border-collapse border border-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 border">Mã đơn hàng</th>
                                    <th className="px-4 py-2 border">Tên người nhận</th>
                                    <th className="px-4 py-2 border">Địa chỉ nhận</th>
                                    <th className="px-4 py-2 border">Số người nhận</th>
                                    <th className="px-4 py-2 border">Trạng thái</th>
                                    <th className="px-4 py-2 border">Tổng tiền</th>
                                    <th className="px-4 py-2 border">Ngày tạo</th>
                                    <th className="px-4 py-2 border">Note</th>
                                    <th className="px-4 py-2 border">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentOrders.map((item: any) => (
                                    <tr key={item.idUser}>
                                        <td className="px-4 py-2 border">{item.id}</td>
                                        <td className="px-4 py-2 border">{item.name}</td>
                                        <td className="px-4 py-2 border">{item.address}</td>
                                        <td className="px-4 py-2 border">{item.phone}</td>
                                        <td className="px-4 py-2 border">
                                            {item.status === "choDuyet" ? "Chưa duyệt" : item.status === "daDuyet" ? "Đã duyệt" : "Đã gửi"}
                                        </td>
                                        <td className="px-4 py-2 border">{formatVND(calculateTotal(item.cart, item.ship))}</td>
                                        <td className="px-4 py-2 border">{item.created_at}</td>
                                        <td className="px-4 py-2 border">{item.note}</td>
                                        <td className="px-4 py-2 border">
                                            <button
                                                className="bg-green-500 text-white px-3 py-1 rounded"
                                                onClick={() => router.push(`/admin/orders/${item.id}`)}
                                            >
                                                Chi tiết
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* phân trang */}
                        <div className="flex justify-center space-x-2 mt-4">
                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index}
                                    className={`px-3 py-1 border rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : ''}`}
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                        {/* end-phân trang */}
                    </div>
                </main>
            </div>
        </div>
    );
}