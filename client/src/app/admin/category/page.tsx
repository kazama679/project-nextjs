"use client";

import React, { useEffect, useState } from 'react';
import { IoMdSearch } from 'react-icons/io';
import Sidebar from '../../../components/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategory, deleteCategory } from '../../../../store/reducers/categoryReducer';
import AddCategoryForm from '../category/addCategory/page'

export default function DashboardPage() {
    const dispatch = useDispatch();
    const categories = useSelector((state: any) => state.categoryReducer.classify);
    const [search, setSearch] = useState<string>(''); // Trạng thái tìm kiếm
    const [filterStatus, setFilterStatus] = useState<string>(''); // Trạng thái lọc
    const [sortOrder, setSortOrder] = useState<string>(''); // Trạng thái sắp xếp
    const [showForm, setShowForm] = useState(false); // Hiển thị form thêm/chỉnh sửa
    const [selectedCategory, setSelectedCategory] = useState(null); // Lưu danh mục được chọn để chỉnh sửa
    const [currentPage, setCurrentPage] = useState<number>(1); // Trang hiện tại
    const categoriesPerPage = 5; // Số danh mục hiển thị mỗi trang

    // Lấy dữ liệu khi trang được tải
    useEffect(() => {
        dispatch(getAllCategory()); // Gọi API lấy danh mục và cập nhật vào Redux store
    }, [dispatch]);

    // Hàm lọc và sắp xếp danh mục
    const filteredCategories = categories
        .filter((category: any) =>
            category.name.toLowerCase().includes(search.toLowerCase()) && // Tìm kiếm theo tên
            (filterStatus === '' || String(category.status) === filterStatus) // Lọc theo trạng thái
        )
        .sort((a: any, b: any) => {
            if (sortOrder === 'az') {
                return a.name.localeCompare(b.name); // Sắp xếp từ A đến Z
            } else if (sortOrder === 'za') {
                return b.name.localeCompare(a.name); // Sắp xếp từ Z đến A
            }
            return 0;
        });

    // Lấy danh mục theo trang
    const indexOfLastCategory = currentPage * categoriesPerPage;
    const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
    const currentCategories = filteredCategories.slice(indexOfFirstCategory, indexOfLastCategory);

    // Xử lý phân trang
    const totalPages = Math.ceil(filteredCategories.length / categoriesPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    // Hàm xóa danh mục
    const handleDelete = (id: number) => {
        dispatch(deleteCategory(id));
    };

    // Hàm hiển thị form chỉnh sửa
    const handleEdit = (category: any) => {
        setSelectedCategory(category);
        setShowForm(true);
    };

    // Hàm hiển thị form thêm mới
    const handleAdd = () => {
        setSelectedCategory(null);
        setShowForm(true);
    };

    // Hàm đóng form
    const handleCloseForm = () => {
        setShowForm(false);
    };

    return (
        <div className="flex">
            <Sidebar />
            <main className="flex-1 p-5 bg-gray-50">
                <header className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Category</h1>
                    <div className="flex items-center space-x-6">
                        {/* Tìm kiếm theo tên */}
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
                    </div>
                </header>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    {/* Tìm kiếm và lọc */}
                    <div className="flex justify-between mb-4">
                        <button onClick={handleAdd} className="bg-blue-500 text-white px-4 py-2 rounded">+ Add Category</button>
                        <div className='flex gap-4'>
                            {/* Lọc theo trạng thái */}
                            <select
                                className="border px-4 py-2 rounded"
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                            >
                                <option value="">Lọc theo trạng thái</option>
                                <option value="true">Mở</option>
                                <option value="false">Đóng</option>
                            </select>

                            {/* Sắp xếp theo tên */}
                            <select
                                className="border px-4 py-2 rounded"
                                value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value)}
                            >
                                <option value="">Sắp xếp theo tên</option>
                                <option value="az">Sắp xếp từ A đến Z</option>
                                <option value="za">Sắp xếp từ Z đến A</option>
                            </select>
                        </div>
                    </div>

                    {/* Hiển thị danh mục */}
                    <table className="table-auto w-full border-collapse border border-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 border text-center">STT</th>
                                <th className="px-4 py-2 border text-center">Name</th>
                                <th className="px-4 py-2 border text-center">Trạng thái</th>
                                <th className="px-4 py-2 border text-center">Mô tả</th>
                                <th className="px-4 py-2 border text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentCategories.map((category: any, index: number) => (
                                <tr key={category.id}>
                                    <td className="px-4 py-2 border text-center">{indexOfFirstCategory + index + 1}</td>
                                    <td className="px-4 py-2 border text-center">{category.name}</td>
                                    <td className="px-4 py-2 border text-center">{category.status ? 'Mở' : 'Đóng'}</td>
                                    <td className="px-4 py-2 border max-w-xs text-center">
                                        <p className="truncate overflow-hidden whitespace-nowrap">{category.description}</p>
                                    </td>
                                    <td className="px-4 py-2 border text-center">
                                        <div className='flex text-center justify-center gap-2'>
                                            <button onClick={() => handleEdit(category)} className="bg-blue-500 text-white px-3 py-1 rounded">Edit</button>
                                            <button onClick={() => handleDelete(category.id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Phân trang */}
                    <div className="flex justify-center space-x-2 mt-4">
                        {pageNumbers.map((page) => (
                            <button
                                key={page}
                                className={`px-3 py-1 border rounded ${page === currentPage ? 'bg-blue-500 text-white' : ''}`}
                                onClick={() => setCurrentPage(page)}
                            >
                                {page}
                            </button>
                        ))}
                    </div>
                </div>
            </main>

            {/* Hiển thị form thêm/chỉnh sửa */}
            {showForm && <AddCategoryForm onClose={handleCloseForm} category={selectedCategory} />}
        </div>
    );
}