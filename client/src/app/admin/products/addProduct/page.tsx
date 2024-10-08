"use client";
import React, { useState } from 'react';

interface ProductFormProps {
    onClose: () => void;
    product?: any;
    categories: any[];
    onSubmit: (data: any) => void;
}

export default function ProductForm({ onClose, product, categories, onSubmit }: ProductFormProps) {
    const [productData, setProductData] = useState({
        id: product?.id || '',
        name: product?.name || '',
        price: product?.price || 0,
        stock: product?.stock || 0,
        category: product?.category || '',
        status: product?.status || true,
        image: product?.image || '',
        description: product?.description || '',
        created_at: product?.created_at || new Date().toISOString().split('T')[0],
        updated_at: new Date().toISOString().split('T')[0],
        assess: [],
        comments: []
    });

    // Xử lý thay đổi input
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const newValue = (name === "price" || name === "stock") ? parseFloat(value) || 0 : value;
        setProductData({ ...productData, [name]: newValue });
    };

    // Hàm xử lý submit form
    const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!productData.name || !productData.price || !productData.stock || !productData.category || !productData.image) {
            alert("Vui lòng nhập đầy đủ thông tin sản phẩm");
            return;
        }
        onSubmit(productData);
        onClose();
    }

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg w-full max-w-3xl">
                <button onClick={onClose} className="text-blue-500 mb-4">Back</button>
                <h2 className="text-2xl font-bold mb-4">{product ? 'Edit Product' : 'Add Product'}</h2>
                <form onSubmit={handleSubmitForm} className="grid grid-cols-2 gap-4">
                    <div className="col-span-1">
                        <label htmlFor="name" className="block text-sm font-medium">Tên sản phẩm</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={productData.name}
                            onChange={handleChange}
                            className="mt-1 p-2 border rounded w-full"
                            required
                        />
                    </div>
                    <div className="col-span-1">
                        <label htmlFor="stock" className="block text-sm font-medium">Số lượng</label>
                        <input
                            type="number"
                            id="stock"
                            name="stock"
                            value={productData.stock}
                            onChange={handleChange}
                            className="mt-1 p-2 border rounded w-full"
                            required
                        />
                    </div>
                    <div className="col-span-1">
                        <label htmlFor="price" className="block text-sm font-medium">Giá</label>
                        <input
                            type="text"
                            id="price"
                            name="price"
                            value={productData.price}
                            onChange={handleChange}
                            className="mt-1 p-2 border rounded w-full"
                            required
                        />
                    </div>
                    <div className="col-span-1">
                        <label htmlFor="image" className="block text-sm font-medium">URL Ảnh</label>
                        <input
                            type="text"
                            id="image"
                            name="image"
                            value={productData.image}
                            onChange={handleChange}
                            className="mt-1 p-2 border rounded w-full"
                            required
                        />
                        <div className='flex justify-center text-center'>
                            {productData.image && (
                                <img src={productData.image} alt="Product" className="w-16 h-16 mt-4" />
                            )}
                        </div>
                    </div>
                    <div className="col-span-1">
                        <label htmlFor="category" className="block text-sm font-medium">Phân loại</label>
                        <select
                            id="category"
                            name="category"
                            value={productData.category}
                            onChange={handleChange}
                            className="mt-1 p-2 border rounded w-full"
                            required
                        >
                            <option value="">Phân loại sản phẩm</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.name}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-span-1">
                        <label htmlFor="status" className="block text-sm font-medium">Trạng thái</label>
                        <select
                            id="status"
                            name="status"
                            value={productData.status ? 'Đang bán' : 'Ngừng bán'}
                            onChange={(e) => setProductData({ ...productData, status: e.target.value === 'Đang bán' })}
                            className="mt-1 p-2 border rounded w-full"
                        >
                            <option value="Đang bán">Đang bán</option>
                            <option value="Ngừng bán">Ngừng bán</option>
                        </select>
                    </div>
                    <div className="col-span-2">
                        <label htmlFor="description" className="block text-sm font-medium">Chi tiết sản phẩm</label>
                        <textarea
                            id="description"
                            name="description"
                            value={productData.description}
                            onChange={handleChange}
                            className="mt-1 p-2 border rounded w-full"
                            rows={3}
                            placeholder="Type here"
                        />
                    </div>
                    <div className="col-span-2">
                        <button type="submit" className="w-full bg-purple-500 text-white py-2 rounded mt-4">
                            {product ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}