import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCategory, updateCategory } from '../../../../../store/reducers/categoryReducer';

interface AddCategoryFormProps {
    onClose: () => void;
    category?: any; // Dữ liệu danh mục để chỉnh sửa (nếu có)
}

export default function AddCategoryForm({ onClose, category }: AddCategoryFormProps) {
    const dispatch = useDispatch();
    const [categoryData, setCategoryData] = useState({
        id: category?.id || '',
        name: category?.name || '',
        description: category?.description || '',
        status: category?.status !== undefined ? category.status : true, // Xử lý kiểu boolean cho status
    });

    // Xử lý thay đổi input
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        
        // Nếu là status thì chuyển đổi giá trị từ string sang boolean
        if (name === "status") {
            setCategoryData({ ...categoryData, [name]: JSON.parse(value) });
        } else {
            setCategoryData({ ...categoryData, [name]: value });
        }
    };

    // Xử lý submit form
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (category) {
            dispatch(updateCategory(categoryData)); // Gửi dữ liệu cập nhật
        } else {
            dispatch(addCategory(categoryData)); // Gửi dữ liệu thêm mới
        }
        onClose(); // Đóng form sau khi gửi
    };

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-4">{category ? 'Edit Category' : 'Add New Category'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={categoryData.name}
                            onChange={handleChange}
                            className="mt-1 p-2 border rounded w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={categoryData.description}
                            onChange={handleChange}
                            className="mt-1 p-2 border rounded w-full"
                            rows={3}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="status" className="block text-sm font-medium">Status</label>
                        <select
                            id="status"
                            name="status"
                            value={String(categoryData.status)} // Chuyển đổi thành string để xử lý trong select
                            onChange={handleChange}
                            className="mt-1 p-2 border rounded w-full"
                        >
                            <option value="true">Mở</option>
                            <option value="false">Đóng</option>
                        </select>
                    </div>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                        {category ? 'Update Category' : 'Add Category'}
                    </button>
                    <button type="button" onClick={onClose} className="ml-2 bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
                </form>
            </div>
        </div>
    );
}
