"use client";
import React, { useEffect, useState } from 'react';
import { FaCartPlus, FaClock, FaShippingFast, FaStar } from 'react-icons/fa';
import { GiReturnArrow } from 'react-icons/gi';
import { getAllProduct, updateProduct } from '../../../../../store/reducers/productReducer';
import { useDispatch, useSelector } from 'react-redux';
import { Product } from '@/app/interface/product';
import Header from '@/components/Header';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { getAllUser, updateUserCart } from '../../../../../store/reducers/userReducer';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { useRouter } from 'next/navigation';

export default function Card(props: any) {
    const router = useRouter();
    const dispatch = useDispatch();
    const products = useSelector((state: any) => state.productReducer.products);
    const users = useSelector((state: any) => state.userReducer.users);
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [showNotification, setShowNotification] = useState(false);
    const [comment, setComment] = useState(true);
    const [formComment1, setFormComment1] = useState(false);
    const [formComment2, setFormComment2] = useState(false);


    const [commentText, setCommentText] = useState("");
    const [reviewComment, setReviewComment] = useState("");
    const [selectedStar, setSelectedStar] = useState(0);

    const [selectedStarFilter, setSelectedStarFilter] = useState<number | null>(null);

    useEffect(() => {
        dispatch(getAllProduct());
        dispatch(getAllUser());

        // Lấy thông tin người dùng từ localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setCurrentUser(JSON.parse(storedUser));
        }
    }, [dispatch]);

    // Hàm tính trung bình sao
    const calculateAverageRating = () => {
        if (product.assess.length === 0) return 0; 

        const totalStars = product.assess.reduce((total: number, review: any) => total + review.star, 0); 
        return parseFloat((totalStars / product.assess.length).toFixed(1)); 
    };

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
        const userToUpdate = users.find((user: any) => user.id === currentUser.id);
        if (userToUpdate) {
            let newCart;
            const checkProduct = userToUpdate.cart.find((item: Product) => item.id === product.id);
            if (checkProduct) {
                newCart = userToUpdate.cart.map((item: any) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                newCart = [
                    ...userToUpdate.cart,
                    { ...product, quantity: 1 }
                ];
            }
            const updatedUser = {
                ...userToUpdate,
                cart: newCart,
            };
            dispatch(updateUserCart(updatedUser))
                .then(() => {
                    setShowNotification(true); 
                    setTimeout(() => {
                        setShowNotification(false);
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

    // Hàm để điều hướng tới chi tiết sản phẩm
    const handleCard = (item: Product) => {
        router.push(`/user/card/${item.id}`);
    };

    // tìm sản phẩm liên quan
    const filterProduct = products.filter((item: any) => {
        return item.category === product.category && item.id !== product.id
    });
    const displayProduct = filterProduct.slice(0, 5);

    const showForm1 = () => {
        setFormComment1(true)
    }

    const showForm2 = () => {
        setFormComment2(true)
    }

    const build = () => {
        setFormComment1(false)
        setFormComment2(false)
    }

    // Hàm tạo ID ngẫu nhiên
    const generateRandomId = () => Math.floor(Math.random() * 1000000);

    // Hàm lấy ngày tháng hiện tại
    const getCurrentDate = () => {
        const today = new Date();
        return `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
    };

    const handleSubmitReview = (starRating: number, comment: string) => {
        if (!currentUser || comment.length < 15) {
            alert("Vui lòng đăng nhập và nhập ít nhất 15 ký tự.");
            return;
        }

        const newReview = {
            id: generateRandomId(),
            idUser: currentUser.id,
            name: currentUser.name,
            star: starRating,
            comment,
            created_at: getCurrentDate(),
            feedback: []
        };

        // Cập nhật sản phẩm với đánh giá mới
        const updatedProduct = {
            ...product,
            assess: [...product.assess, newReview]
        };

        // Gửi yêu cầu cập nhật
        dispatch(updateProduct(updatedProduct));
        setFormComment1(false);
    };

    const handleSubmitComment = (comment: string) => {
        if (!currentUser || comment.length < 15) {
            alert("Vui lòng đăng nhập và nhập ít nhất 15 ký tự.");
            return;
        }

        const newComment = {
            id: generateRandomId(),
            idUser: currentUser.id,
            name: currentUser.name,
            comment,
            created_at: getCurrentDate(),
            feedback: []
        };

        // Cập nhật sản phẩm với bình luận mới
        const updatedProduct = {
            ...product,
            comments: [...product.comments, newComment]
        };

        // Gửi yêu cầu cập nhật
        dispatch(updateProduct(updatedProduct));
        setFormComment2(false);
    };

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
                            <span className="mr-2">{calculateAverageRating()}</span> {/* Hiển thị giá trị trung bình */}
                            <div className="flex text-yellow-500">
                                {[...Array(Math.round(calculateAverageRating()))].map((_, index) => (
                                    <span key={index} className="mr-1">★</span>
                                ))}
                                {[...Array(5 - Math.round(calculateAverageRating()))].map((_, index) => (
                                    <span key={index} className="mr-1">☆</span> // Hiển thị sao trống cho phần còn lại
                                ))}
                            </div>
                            <span className="ml-2">chính hãng</span>
                        </div>

                        <div className="flex text-lg text-gray-500 mb-2">
                            <span>chính sách trả hàng:</span>
                            <span className="flex items-center ml-2 text-red-500">
                                <GiReturnArrow className="text-red-500" /> <p>Đổi trả 15 ngày</p>
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

            {/* Sản phẩm liên quan */}
            <div className="container mx-auto my-10 px-40 py-20 bg-gray-50">
                <h2 className="text-lg font-bold text-left">Sản phẩm liên quan</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 justify-center mt-5">
                    {displayProduct.map((product: any) => (
                        <div onClick={() => handleCard(product)} key={product.id} className="bg-white rounded-lg overflow-hidden hover:shadow-lg cursor-pointer">
                            <img className="w-full h-40 object-cover" src={product.image} alt={product.name} />
                            <div className="p-4">
                                <h3 className="text-sm font-semibold truncate">{product.name}</h3>
                                <p className="text-red-500 mt-2 font-bold">₫{product.price.toLocaleString('vi-VN')}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* end-Sản phẩm liên quan */}

            {/* bình luận */}
            <div className="container mx-auto mt-8 px-40">
                {/* Nút đánh giá */}
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-bold">Lọc theo</h2>
                    {comment ? <button onClick={showForm1} className="bg-red-500 text-white px-4 py-2 rounded-md">
                        Đánh giá ngay
                    </button> : <button onClick={showForm2} className="bg-red-500 text-white px-4 py-2 rounded-md">
                        Bình luận ngay
                    </button>}
                </div>
                {/* Bộ lọc */}
                <div className="flex items-center space-x-4 my-4">
                    <button onClick={() => setComment(true)} className={`${comment ? 'border border-red-500 px-4 py-2 rounded-full text-red-500' : 'border border-gray-300 px-4 py-2 rounded-full'}`}>
                        Đã mua hàng
                    </button>
                    <button onClick={() => setComment(false)} className={`${!comment ? 'border border-red-500 px-4 py-2 rounded-full text-red-500' : 'border border-gray-300 px-4 py-2 rounded-full'}`}>
                        Hỏi đáp
                    </button>
                    {comment ? <div className="flex space-x-2">
                        {[5, 4, 3, 2, 1].map((star) => (
                            <button
                                key={star}
                                onClick={() => setSelectedStarFilter(star)}
                                className={`border px-4 py-2 rounded-full ${selectedStarFilter === star ? 'border-red-500 text-red-500' : 'border-gray-300'}`}
                            >
                                {star} sao
                            </button>
                        ))}
                    </div>
                        : <></>}
                </div>
                {/* Danh sách đánh giá */}
                {comment ? (
                    product.assess.length > 0 ? (
                        product.assess
                            .filter((review: any) => selectedStarFilter === null || review.star === selectedStarFilter)
                            .map((review: any) => (
                                <div key={review.id} className="border-b border-gray-300 py-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                                            {review.name[0].toUpperCase()} {/* Chữ cái đầu của tên người dùng */}
                                        </div>
                                        <div>
                                            <p className="font-bold">{review.name}</p>
                                            <div className="flex items-center text-gray-500">
                                                <FaClock className="mr-2" />
                                                <span>{review.created_at}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center mt-2">
                                        {[...Array(review.star)].map((_, i) => (
                                            <FaStar key={i} className="text-yellow-500 mr-1" />
                                        ))}
                                        {[...Array(5 - review.star)].map((_, i) => (
                                            <FaStar key={i} className="text-gray-300 mr-1" />
                                        ))}
                                    </div>
                                    <p className="mt-2 text-gray-600">{review.comment}</p>
                                </div>
                            ))
                    ) : (
                        <div className="text-black">Chưa có đánh giá nào.</div>
                    )
                ) : (
                    // hỏi đáp
                    product.comments.length > 0 ? (
                        product.comments.map((review: any) => (
                            <div key={review.id} className="w-full bg-white p-4 rounded-lg shadow-lg">
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-full bg-purple-500 text-white flex justify-center items-center text-xl font-bold">
                                        {review.name[0].toUpperCase()}
                                    </div>
                                    <div className="w-full">
                                        <div className="flex justify-between">
                                            <span className="font-semibold">{review.name}</span>
                                        </div>
                                        <p className="bg-gray-100 p-3 rounded-lg mt-2">
                                            {review.comment}
                                        </p>
                                        <div className="flex justify-end mt-2">
                                            <button className="flex items-center text-red-500 hover:text-red-700 text-sm">
                                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M18 10c0 .55-.45 1-1 1H6.41l3.3 3.29a1.003 1.003 0 01-1.42 1.42l-5-5a.999.999 0 010-1.42l5-5a1.003 1.003 0 011.42 1.42L6.41 9H17c.55 0 1 .45 1 1z" clipRule="evenodd" />
                                                </svg>
                                                Trả lời
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {/* Hiển thị feedback cho từng comment */}
                                {review.feedback?.map((item: any) => (
                                    <div key={item.id} className="flex items-start gap-4 mb-6 ml-16">
                                        <div className="w-12 h-12 rounded-full bg-red-500 text-white flex justify-center items-center text-xl font-bold">
                                            {item.name[0].toUpperCase()}
                                        </div>
                                        <div className="w-full">
                                            <div className="flex justify-between">
                                                <span className="font-semibold text-red-500">{item.name}</span>
                                            </div>
                                            <p className="bg-gray-100 p-3 rounded-lg mt-2">
                                                {item.comment}
                                            </p>
                                            <div className="flex justify-end mt-2">
                                                <button className="flex items-center text-red-500 hover:text-red-700 text-sm">
                                                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M18 10c0 .55-.45 1-1 1H6.41l3.3 3.29a1.003 1.003 0 01-1.42 1.42l-5-5a.999.999 0 010-1.42l5-5a1.003 1.003 0 011.42 1.42L6.41 9H17c.55 0 1 .45 1 1z" clipRule="evenodd" />
                                                    </svg>
                                                    Trả lời
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">Chưa có đánh giá nào.</p>
                    )
                )}
            </div>
            {/* end-bình luận */}

            {/* comment 1 */}
            {formComment1 ? (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-[600px] max-w-full p-6 relative">
                        <button onClick={build} className="absolute top-4 right-4 text-gray-400 hover:text-black">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                        <h2 className="text-xl font-bold mb-4">Đánh giá & nhận xét</h2>
                        {/* Lựa chọn đánh giá */}
                        <div className="flex justify-between mb-4">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <div key={star} onClick={() => setSelectedStar(star)} className="text-center cursor-pointer">
                                    <span className={`text-3xl ${selectedStar >= star ? 'text-yellow-500' : 'text-gray-300'}`}>★</span>
                                    <p className="text-sm mt-1">{star === 5 ? "Tuyệt vời" : star === 1 ? "Rất tệ" : ""}</p>
                                </div>
                            ))}
                        </div>
                        <textarea
                            className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                            placeholder="Xin mời chia sẻ một số cảm nhận về sản phẩm (nhập tối thiểu 15 kí tự)"
                            rows="4"
                            onChange={(e) => setReviewComment(e.target.value)}
                        />
                        <button onClick={() => handleSubmitReview(selectedStar, reviewComment)} className="w-full mt-6 bg-red-500 text-white text-lg font-bold py-3 rounded-md hover:bg-red-600">
                            Gửi Đánh Giá
                        </button>
                    </div>
                </div>
            ) : null}

            {/* end-comment 1 */}

            {/* comment 2 */}
            {formComment2 ? (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-[600px] max-w-full p-6 relative">
                        <button onClick={build} className="absolute top-4 right-4 text-gray-400 hover:text-black">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                        <h2 className="text-xl font-bold mb-4">Bình luận và Hỏi đáp</h2>
                        <textarea
                            className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                            placeholder="Xin mời chia sẻ một số cảm nhận về sản phẩm (nhập tối thiểu 15 kí tự)"
                            rows="4"
                            onChange={(e) => setCommentText(e.target.value)}
                        />
                        <button onClick={() => handleSubmitComment(commentText)} className="w-full mt-6 bg-red-500 text-white text-lg font-bold py-3 rounded-md hover:bg-red-600">
                            Gửi Bình luận
                        </button>
                    </div>
                </div>
            ) : null}
            {/* end-comment 2 */}

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
