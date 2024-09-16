"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import { User } from "../../interface/user";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getAllProduct } from "../../../../store/reducers/productReducer";
import { getAllCategory } from "../../../../store/reducers/categoryReducer";
import { getAllOrder } from "../../../../store/reducers/orderReducer";

export default function DashboardPage() {
    const dispatch = useDispatch();
    const products = useSelector((state: any) => state.productReducer.products);
    const categori = useSelector((state: any) => state.categoryReducer.classify);
    const orders = useSelector((state: any) => state.orderReducer.orders);
    const [admin, setAdmin] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        dispatch(getAllProduct());
        dispatch(getAllCategory());
        dispatch(getAllOrder());
    }, [dispatch]);

    // Hàm tính tổng doanh thu
    const total = () => {
        let totalRevenue = 0;
        orders.forEach((order: any) => {
            order.cart.forEach((item: any) => {
                totalRevenue += item.price * item.quantity;
            });
        });
        return totalRevenue;
    };

    // Hàm tính tổng số sản phẩm đã bán
    const totalProduct = () => {
        let totalSold = 0;
        orders.forEach((order: any) => {
            order.cart.forEach((item: any) => {
                totalSold += item.quantity;
            });
        });
        return totalSold;
    };

    // Hàm tính tổng số sản phẩm tồn kho
    const totalStock = () => {
        let totalStock = 0;
        products.forEach((product: any) => {
            totalStock += product.stock;
        });
        return totalStock;
    };

    // Hàm tính tổng số danh mục
    const totalCategory = () => {
        return categori.length;
    };
    // Định dạng tiền tệ
    const formatVND = (price: number) => price.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

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
                        <div className="grid grid-cols-4 gap-4 mb-6">
                            <div className="p-4 bg-white rounded-lg shadow">
                                <h3 className="text-sm text-gray-500">Doanh thu</h3>
                                <p className="text-lg font-bold">{formatVND(total())}</p>
                            </div>
                            <div className="p-4 bg-white rounded-lg shadow">
                                <h3 className="text-sm text-gray-500">Số sản phẩm đã bán</h3>
                                <p className="text-lg font-bold">{totalProduct()}</p>
                            </div>
                            <div className="p-4 bg-white rounded-lg shadow">
                                <h3 className="text-sm text-gray-500">Sản phẩm trong kho</h3>
                                <p className="text-lg font-bold">{totalStock()}</p>
                            </div>
                            <div className="p-4 bg-white rounded-lg shadow">
                                <h3 className="text-sm text-gray-500">Số danh mục</h3>
                                <p className="text-lg font-bold">{totalCategory()}</p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
