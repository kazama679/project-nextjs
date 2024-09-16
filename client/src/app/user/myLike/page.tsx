"use client";
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import React, { useEffect, useState } from 'react';
import { getAllUser, updateUser, updateUserCart } from '../../../../store/reducers/userReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

export default function MyLike() {
  const dispatch = useDispatch();
  const [userLocal, setUserLocal] = useState<any>(null); 
  const users = useSelector((state: any) => state.userReducer.users);
  const router = useRouter();

  useEffect(() => {
    dispatch(getAllUser()); 
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUserLocal(JSON.parse(storedUser)); 
    }
  }, [dispatch]);
  if (!userLocal) {
    return <div className='text-center pt-20 text-red-500'>Vui lòng đăng nhập để xem sản phẩm yêu thích</div>;
  }
  // Lọc người dùng hiện tại dựa trên userLocal
  const currentUser = users.find((user: any) => user.id === userLocal.id);

  // Nếu người dùng không có sản phẩm yêu thích
  if (!currentUser?.like || currentUser.like.length === 0) {
    return <div className='text-center pt-20 text-red-500'>Bạn chưa có sản phẩm yêu thích nào</div>;
  }

  const nextCard = (id: number) => {
    router.push(`/user/card/${id}`);
  }

  // xóa like
  const deleteLike = async (item: any) => {
    
    const updatedLikes = currentUser.like.filter((product: any) => product.id !== item.id);
    const updatedUser = { ...currentUser, like: updatedLikes };
    await dispatch(updateUserCart(updatedUser));
  };

  return (
    <div>
      <Header />
      <div className='flex justify-center text-center pt-28 text-3xl font-bold'>Sản phẩm yêu thích của bạn</div>

      {/* Hiển thị danh sách sản phẩm yêu thích */}
      <div className="profile-container-bot">
        {currentUser.like.map((product: any) => (
          <div key={product.id} className="order-item-all flex justify-center items-center mt-12 mb-5">
            <div className="order-item w-4/5 bg-gray-100 border border-gray-300 rounded-lg p-5 mb-5">
              <div className="order-header flex justify-between items-center mb-5">
                <div>
                  <span className="text-lg font-bold">
                    {product.name.split(' ').slice(0, 5).join(' ')}
                  </span>
                </div>
                <div className="price-info text-right">
                  <span className="text-red-500 text-lg">{product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                </div>
              </div>
              <div className="order-details flex justify-between items-center mb-5">
                <img src={product.image} alt={product.name} className="w-[100px] h-[100px] object-cover mr-5 border border-gray-300" />
                <div className="product-info flex-grow">
                  <p className="product-description text-gray-600 mb-1">{product.description}</p>
                </div>
              </div>
              <div className="order-actions flex justify-end items-center mt-[-50px] gap-3">
                <button onClick={() => deleteLike(product)} className="contact-seller-button flex py-2 px-4 rounded-md bg-red-500 text-white">Xóa</button>
                <button className="contact-seller-button flex py-2 px-4 rounded-md bg-orange-500 text-white">Liên hệ người bán</button>
                <button onClick={() => nextCard(product.id)} className="contact-seller-button flex py-2 px-4 rounded-md bg-green-500 text-white">Xem chi tiết sản phẩm</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ContactSection />
      <Footer />
    </div>
  );
}
