"use client";
import React, { useEffect, useState } from 'react';
import { FaCartPlus, FaShippingFast } from 'react-icons/fa';
import { GiReturnArrow } from 'react-icons/gi';
import { getAllProduct } from '../../../../../store/reducers/productReducer';
import { useDispatch, useSelector } from 'react-redux';
import { Product } from '@/app/interface/product';
import Header from '@/components/Header';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { getAllUser, updateUserCart } from '../../../../../store/reducers/userReducer';
import { AiOutlineCheckCircle } from 'react-icons/ai'; // Biểu tượng check

export default function Card(props: any) {
    const dispatch = useDispatch();
    const products = useSelector((state: any) => state.productReducer.products);
    const users = useSelector((state: any) => state.userReducer.users);
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [showNotification, setShowNotification] = useState(false); // Trạng thái hiển thị thông báo

    useEffect(() => {
        dispatch(getAllProduct());
        dispatch(getAllUser());

        // Lấy thông tin người dùng từ localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setCurrentUser(JSON.parse(storedUser));
        }
    }, [dispatch]);

    // Định dạng tiền VND
    const formatVND = (price: number) => {
        return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    };

    // Tìm sản phẩm có id trùng với props.id
    const product = products.find((product: Product) => product.id === +props.params.id);

    // Kiểm tra người dùng hiện tại và cập nhật giỏ hàng
    const handleAddToCart = () => {
        if (!currentUser) {
            alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.");
            return;
        }

        // Tìm người dùng trong danh sách users
        const userToUpdate = users.find((user: any) => user.id === currentUser.id);

        if (userToUpdate) {
            let newCart;
            const checkProduct = userToUpdate.cart.find((item: Product) => item.id === product.id);

            if (checkProduct) {
                // Nếu đã có sản phẩm, tăng quantity bằng cách sử dụng map để cập nhật giỏ hàng
                newCart = userToUpdate.cart.map((item: any) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // Nếu chưa có sản phẩm, thêm sản phẩm mới với quantity: 1
                newCart = [
                    ...userToUpdate.cart,
                    { ...product, quantity: 1 }
                ];
            }

            // Cập nhật giỏ hàng của user
            const updatedUser = {
                ...userToUpdate,
                cart: newCart,
            };

            // Cập nhật user trong db.json
            dispatch(updateUserCart(updatedUser))
                .then(() => {
                    setShowNotification(true); // Hiển thị thông báo khi thêm thành công
                    setTimeout(() => {
                        setShowNotification(false); // Ẩn thông báo sau 2 giây
                    }, 2000);
                })
                .catch(() => {
                    alert("Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng.");
                });
        }
    };

    // Nếu không tìm thấy sản phẩm, trả về thông báo lỗi
    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <>
            <Header />
            <div className="flex justify-center items-center mt-32">
                <div className="w-3/4 flex p-6 border border-gray-300 rounded-lg bg-white">
                    <div className="w-1/2">
                        <img className="w-full h-full rounded-lg shadow-md" src={product.image} alt={product.name} />
                    </div>
                    <div className="w-1/2 flex flex-col justify-between ml-10 text-left">
                        <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
                        <div className="flex items-center mb-2">
                            <span className="mr-2">5</span>
                            <div className="flex text-yellow-500">
                                {[...Array(5)].map((_, index) => (
                                    <span key={index} className="mr-1">★</span>
                                ))}
                            </div>
                            <span className="ml-2">chính hãng</span>
                        </div>
                        <div className="text-lg text-gray-500 mb-2">
                            <span>chính sách trả hàng:</span>
                            <span className="flex items-center ml-2 text-red-500">
                                <GiReturnArrow className="text-red-500" /> Đổi trả 15 ngày
                            </span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-lg">Giá sản phẩm:</span>
                            <span className="text-xl text-red-500 font-bold">{formatVND(product.price)}</span>
                        </div>
                        <div className="text-sm text-gray-600 mb-2">
                            <b>Chi tiết sản phẩm:</b> {product.description}
                        </div>
                        <div className="flex items-center text-blue-500 text-sm mb-2">
                            <FaShippingFast className="mr-2" />
                            <span>Miễn phí vận chuyển</span>
                        </div>
                        <div className="flex space-x-4">
                            <button
                                onClick={handleAddToCart}
                                className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                                <FaCartPlus /> Thêm Vào Giỏ Hàng
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Form thông báo khi thêm sản phẩm vào giỏ hàng thành công */}
            {showNotification && (
                <div className="fixed inset-0 flex items-center justify-center z-50 border border-black">
                    <div className="bg-white p-6 shadow-2xl rounded-lg z-50 flex flex-col items-center justify-center text-center">
                        <AiOutlineCheckCircle className="text-green-500 text-5xl mb-2" />
                        <p className="text-lg font-bold">Sản phẩm đã được thêm vào Giỏ hàng</p>
                    </div>
                </div>
            )}

            <ContactSection />
            <Footer />
        </>
    );
}
