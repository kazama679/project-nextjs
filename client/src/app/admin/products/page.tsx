"use client";
import React, { useEffect, useState } from 'react';
import { IoMdSearch } from 'react-icons/io';
import Sidebar from '../../../components/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProduct, deleteProduct, updateProduct, addProduct } from '../../../../store/reducers/productReducer';
import { getAllCategory } from '../../../../store/reducers/categoryReducer';
import ProductForm from './addProduct/page';

export default function Products() {
    const dispatch = useDispatch();
    const products = useSelector((state: any) => state.productReducer.products);
    const categories = useSelector((state: any) => state.categoryReducer.classify);
    const [search, setSearch] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const productsPerPage = 5;

    useEffect(() => {
        dispatch(getAllProduct());
        dispatch(getAllCategory());
    }, [dispatch]);

    const handleSubmitForm = (productData: any) => {
        const newProductData = {
            ...productData,
            id: productData.id || Date.now(),
            created_at: productData.created_at || new Date().toLocaleDateString('vi-VN'),
            updated_at: new Date().toLocaleDateString('vi-VN')
        };
        if (editingProduct) {
            dispatch(updateProduct(newProductData));
        } else {
            dispatch(addProduct(newProductData));
        }
        setShowForm(false); // Đóng form sau khi thêm/cập nhật
    };


    // Lọc sản phẩm
    const filteredProducts = products
        .filter((product: any) =>
            product.name.toLowerCase().includes(search.toLowerCase()) &&
            (selectedCategory === '' || product.category === selectedCategory)
        )
        .sort((a: any, b: any) => {
            if (sortOrder === 'price-asc') {
                return a.price - b.price;
            } else if (sortOrder === 'price-desc') {
                return b.price - a.price;
            }
            return 0;
        });

    // Lấy sản phẩm theo trang
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    // Xử lý phân trang
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    // Hàm xóa sản phẩm
    const handleDelete = (id: number) => {
        dispatch(deleteProduct(id));
    };

    // format tiền
    const formatVND = (price: number) => {
        return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    };

    return (
        <div className="flex">
            <Sidebar />
            <main className="flex-1 p-5 bg-gray-50">
                <header className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Products</h1>
                    <div className="flex items-center space-x-6">
                        <div className="relative">
                            <IoMdSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                className="pl-8 pr-4 py-2 border rounded-full w-72 bg-gray-100"
                                placeholder="Tìm kiếm theo tên sản phẩm"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>
                </header>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="flex justify-between mb-4">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => { setEditingProduct(null); setShowForm(true); }}>+ Add Product</button>
                        <div className="flex gap-2">
                            <select
                                className="border px-4 py-2 rounded"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                <option value="">Lọc theo danh mục</option>
                                {categories.map((category: any) => (
                                    <option key={category.id} value={category.name}>{category.name}</option>
                                ))}
                            </select>
                            <select
                                className="border px-4 py-2 rounded"
                                value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value)}
                            >
                                <option value="price-asc">Lọc theo giá</option>
                                <option value="price-asc">Giá: Từ thấp đến cao</option>
                                <option value="price-desc">Giá: Từ cao đến thấp</option>
                            </select>
                        </div>
                    </div>
                    <table className="table-auto w-full border-collapse border border-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 border">STT</th>
                                <th className="px-4 py-2 border">Ảnh</th>
                                <th className="px-4 py-2 border">Tên</th>
                                <th className="px-4 py-2 border">Trạng thái</th>
                                <th className="px-4 py-2 border">Danh mục</th>
                                <th className="px-4 py-2 border">Giá</th>
                                <th className="px-4 py-2 border">Ngày tạo</th>
                                <th className="px-4 py-2 border">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentProducts.map((product: any, index: number) => (
                                <tr key={product.id} className="text-center">
                                    <td className="px-4 py-2 border">{indexOfFirstProduct + index + 1}</td>
                                    <td className="px-4 py-2 border">
                                        <div className='flex justify-center'>
                                            <img src={product.image} alt={product.name} className='w-10 h-10' />
                                        </div>
                                    </td>
                                    <td className="px-4 py-2 border truncate max-w-xs">
                                        <p className="truncate overflow-hidden whitespace-nowrap">{product.name}</p>
                                    </td>
                                    <td className="px-4 py-2 border">{product.status ? 'Đang bán' : 'Ngừng bán'}</td>
                                    <td className="px-4 py-2 border">{product.category}</td>
                                    <td className="px-4 py-2 border">{formatVND(product.price)}</td>
                                    <td className="px-4 py-2 border">{product.created_at}</td>
                                    <td className="px-4 py-2 border">
                                        <div className='flex justify-center gap-2'>
                                            <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={() => { setEditingProduct(product); setShowForm(true); }}>Edit</button>
                                            <button onClick={() => handleDelete(product.id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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

                {/* Hiển thị form thêm/sửa sản phẩm */}
                {showForm && (
                    <ProductForm
                        onClose={() => setShowForm(false)}
                        product={editingProduct}
                        categories={categories}
                        onSubmit={handleSubmitForm}
                    />
                )}
            </main>
        </div>
    );
}
