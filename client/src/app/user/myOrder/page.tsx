"use client"
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import React, { useEffect, useState } from 'react'
import { getAllUser } from '../../../../store/reducers/userReducer';
import { getAllOrder } from '../../../../store/reducers/orderReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation'
import { Product } from '@/app/interface/product'

export default function MyOrder() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [userLocal, setUserLocal] = useState<any>(null);  // Lưu thông tin người dùng từ localStorage
  const orders = useSelector((state: any) => state.orderReducer.orders);  // Lấy danh sách orders từ store

  useEffect(() => {
    dispatch(getAllUser());
    dispatch(getAllOrder());

    // Lấy thông tin người dùng từ localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUserLocal(JSON.parse(storedUser));
    }
  }, [dispatch]);

  // Kiểm tra xem có user nào đăng nhập hay không
  if (!userLocal) {
    return <div className='text-center pt-20 text-red-500'>Vui lòng đăng nhập để xem đơn hàng</div>;
  }

  // Lọc các đơn hàng thuộc về người dùng hiện tại
  const userOrders = orders.filter((order: any) => order.idUser === userLocal.id);

  // về home
  const nextHome = () => {
    router.push('/');
  };

  const nextCard = (id: number) => {
    router.push(`/user/card/${id}`);
  }

  return (
    <div>
      <Header />
      <div className='flex justify-center text-center pt-28 text-3xl font-bold'>Đơn hàng đã mua</div>

      {/* Kiểm tra nếu người dùng có đơn hàng */}
      {userOrders.length > 0 ? (
        <div className="profile-container-bot">
          {userOrders.map((order: any) => (
            <div key={order.id} className="order-item-all flex justify-center items-center mt-12 mb-5">
              <div className="order-item w-4/5 bg-gray-100 border border-gray-300 rounded-lg p-5 mb-5">
                <div className="order-header flex justify-between items-center mb-5">
                  <div>
                    <span className="text-lg font-bold">Mã đơn hàng: </span>{order.id}
                  </div>
                  <div className="order-status text-right">
                    <span className={
                      order.status === 'choDuyet' ? 'text-red-500' :
                        order.status === 'daDuyet' ? 'text-yellow-500' :
                          'text-green-500'
                    }>
                      {order.status === 'choDuyet'
                        ? 'Đang chờ duyệt'
                        : order.status === 'daDuyet'
                          ? 'Đã duyệt'
                          : 'Đã giao thành công'}
                    </span>
                  </div>
                </div>

                {/* Hiển thị từng sản phẩm trong đơn hàng */}
                {order.cart.map((product: Product) => (
                  <div onClick={() => nextCard(product.id)} key={product.id} className="order-details flex justify-between items-center mb-5 hover:text-red-500 cursor-pointer">
                    <img src={product.image} alt={product.name} className="w-[100px] h-[100px] object-cover mr-5 border border-gray-300" />
                    <div className="product-info flex-grow">
                      <p className="product-name text-lg mb-2">{product.name}</p>
                      <p className="product-quantity text-gray-600 mb-1">Số lượng: {product.quantity}</p>
                    </div>
                    <div className="price-info text-right">
                      <span className="product-price text-gray-800 text-lg ml-10">{product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                    </div>
                  </div>
                ))}

                {/* Tổng tiền và phí ship */}
                <div className="order-summary flex justify-between items-center my-5 mt-10 border-t border-gray-300 pt-5">
                  <div className='flex gap-1'>
                    <span className="total-label font-bold">Phí ship:</span>
                    <span className="total-price text-gray-800">{order.ship.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                  </div>
                </div>
                <div className='flex justify-between text-center mb-[-20px]'>
                  <div className="order-summary flex justify-between items-center mb-5">
                    <div className='flex gap-1'>
                      <span className="total-label font-bold">Tổng tiền:</span>
                      <span className="total-price text-red-500 text-lg">{(order.cart.reduce((total: number, item: any) => total + (item.price * item.quantity), 0) + order.ship).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                    </div>
                  </div>
                  {/* Hành động liên hệ người bán */}
                  <div className="order-actions flex justify-end items-center mt-[-50px] gap-3">
                    <button className="contact-seller-button flex py-2 px-4 rounded-md bg-orange-500 text-white">Liên Hệ Người Bán</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center mt-20 mb-12 text-red-500">Bạn chưa có đơn đặt hàng nào</div>
      )}

      <div className="shopping-cart__actions flex flex-col items-center mt-2">
        <button
          className="shopping-cart__continue w-[50%] py-2 bg-white border border-gray-300 rounded-md text-center cursor-pointer mt-5 font-serif text-xl font-bold hover:bg-gray-100 transition-all"
          onClick={nextHome}
        >
          Quay lại Trang chủ
        </button>
      </div>

      <ContactSection />
      <Footer />
    </div>
  );
}
