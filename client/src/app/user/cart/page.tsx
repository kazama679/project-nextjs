"use client"
import Header from '@/components/Header'
import React, { useEffect, useState } from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux';
import { getAllUser, updateUserCart } from '../../../../store/reducers/userReducer';
import { Product } from '@/app/interface/product';
import { User } from '@/app/interface/user';
import { useRouter } from 'next/navigation';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function Cart() {
  const [userLocal, setUserLocal] = useState<any>(null);
  const dispatch = useDispatch();
  const users = useSelector((state: any) => state.userReducer.users);
  const router = useRouter();

  useEffect(() => {
    dispatch(getAllUser());

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUserLocal(JSON.parse(storedUser));
    }
  }, [dispatch]);

  // Tìm vị trí người dùng trong db
  const userIndex = users.findIndex((user: User) => user.id === userLocal?.id);

  // Định dạng tiền VND
  const formatVND = (price: number) => {
    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  };

  // Hàm tính tổng tiền
  const calculateTotalPrice = () => {
    if (userIndex !== -1 && users[userIndex]?.cart?.length > 0) {
      return users[userIndex].cart.reduce(
        (total: number, item: Product) => total + item.price * item.quantity,
        0
      );
    }
    return 0;
  };

  // Tăng/giảm số lượng và cập nhật giỏ hàng
  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (!userLocal) {
      alert("Vui lòng đăng nhập để thay đổi số lượng sản phẩm.");
      return;
    }
    const userToUpdate = users[userIndex];

    if (userToUpdate) {
      const newCart = userToUpdate.cart.map((item: Product) =>
        item.id === productId
          ? { ...item, quantity: Math.max(newQuantity, 1) } // Đảm bảo số lượng không nhỏ hơn 1
          : item
      );

      const updatedUser = {
        ...userToUpdate,
        cart: newCart,
      };

      // Cập nhật giỏ hàng trong db.json
      dispatch(updateUserCart(updatedUser))
        .then(() => {
          console.log("Cập nhật số lượng thành công");
        })
        .catch(() => {
          alert("Có lỗi xảy ra khi cập nhật số lượng.");
        });
    }
  };

  // Hàm xóa sản phẩm khỏi giỏ hàng
  const handleDeleteProduct = (productId: number) => {
    if (!userLocal) {
      alert("Vui lòng đăng nhập để xóa sản phẩm.");
      return;
    }
    const userToUpdate = users[userIndex];

    if (userToUpdate) {
      const newCart = userToUpdate.cart.filter((item: Product) => item.id !== productId);

      const updatedUser = {
        ...userToUpdate,
        cart: newCart,
      };

      // Cập nhật giỏ hàng trong db.json
      dispatch(updateUserCart(updatedUser))
        .then(() => {
          console.log("Xóa sản phẩm thành công");
        })
        .catch(() => {
          alert("Có lỗi xảy ra khi xóa sản phẩm.");
        });
    }
  };
  // end-Hàm xóa sản phẩm khỏi giỏ hàng

  // Chuyển hướng khi bấm Thanh toán
  const handlePay = () => {
    router.push('/user/pay');
  };

  // về home
  const nextHome = () => {
    router.push('/');
  }

  return (
    <div>
      <Header></Header>
      {/* cart */}
      <div className="shopping-cart p-5 font-sans border-gray-200 mb-4">
        <div className="shopping-cart__header mt-16 text-center mb-5">
          <h2 className="shopping-cart__header-h2 inline-block relative text-2xl font-bold pb-2">
            Giỏ hàng của bạn
            <span className="absolute bottom-[-5px] left-1/2 transform -translate-x-1/2 w-12 h-[2px] bg-gray-500"></span>
          </h2>
        </div>
        <div className="shopping-cart-child flex justify-center gap-6">
          {users[userIndex]?.cart?.length > 0 ? (
            <div className="shopping-cart__items mt-5 w-[650px] p-2 bg-white">
              <div className="shopping-cart__items-p bg-gray-100 flex gap-1 py-4 px-5 -mt-2">
                <p className="text-lg mb-2">
                  Bạn đang có <b>{users[userIndex]?.cart?.length} sản phẩm</b> trong giỏ hàng
                </p>
              </div>
              <div>
                {users[userIndex]?.cart?.map((item: Product) => (
                  <div key={item.id} className="item py-2 flex justify-between items-center">
                    <div className="item-card flex items-center">
                      <img
                        className="shopping-cart__item-img w-20 h-20 mb-5 mr-5 shadow-md"
                        src={item.image}
                        alt={item.name}
                      />
                      <div className="shopping-cart__details flex flex-col items-start text-left">
                        <b className="shopping-cart__name font-serif">{item.name}</b>
                        <div className="counter mt-2 mb-2 flex justify-center">
                          <button
                            className="w-6 h-6 flex items-center justify-center bg-gray-200 border-none"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          >
                            -
                          </button>
                          <input
                            type="text"
                            className="w-9 h-6 text-center border border-gray-200"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                          />
                          <button
                            className="w-6 h-6 flex items-center justify-center bg-gray-200 border-none"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                        <b>{formatVND(item.price * item.quantity)}</b>
                      </div>
                    </div>
                    <div>
                      <RiDeleteBin6Line
                        className="icon-delete w-6 text-xl text-gray-500 cursor-pointer"
                        onClick={() => handleDeleteProduct(item.id)}
                      />
                    </div>
                  </div>
                ))}
                <div className="shopping-cart__price flex justify-between items-center border-b border-gray-300 pb-2">
                  <b>Thành tiền:</b>
                  <b className="shopping-cart__price-number text-red-600">{formatVND(calculateTotalPrice())}</b>
                </div>
              </div>
              <div className="shopping-cart__notes mt-5">
                <textarea
                  className="w-full h-24 p-2 border border-gray-300"
                  placeholder="Ghi chú đơn hàng"
                ></textarea>
              </div>
            </div>
          ) : (
            <div className="shopping-cart-zero mt-12 text-lg text-black w-[45%] pr-[200px]">
              Giỏ hàng của bạn đang trống
            </div>
          )}
          <div className="shopping-cart__summary mt-5 border border-gray-300 w-[20%] h-[217px] p-4">
            <b className="shopping-cart__summary-b border-b border-gray-300 pb-4 pt-2 block">
              Thông tin đơn hàng
            </b>
            <div className="shopping-cart__summary__child flex justify-between items-center border-b border-gray-300 pb-2 mt-4 mb-2">
              <b>Tổng tiền: </b>
              <div className="shopping-cart__summary__child2 text-2xl text-red-600">{formatVND(calculateTotalPrice())}</div>
            </div>
            <div className="shopping-cart__summary-t text-gray-500 text-xs mb-2">
              Bạn có thể nhập mã giảm giá ở trang thanh toán
            </div>

            {users[userIndex]?.cart?.length > 0 ? (
              <button
                onClick={handlePay}
                className="shopping-cart__checkout w-full py-2 bg-red-600 text-white text-center border-none cursor-pointer"
              >
                Thanh toán
              </button>
            ) : (
              <div className="text-center text-red-600 font-bold mt-4">
                Bạn không có sản phẩm nào!
              </div>
            )}
          </div>
        </div>

        {/* Đoạn này đã căn giữa 2 nút */}
        <div className="shopping-cart__actions flex flex-col items-center mt-2">
          <button
            className="shopping-cart__continue w-[50%] py-2 bg-white border border-gray-300 rounded-md text-center cursor-pointer mt-5 font-serif text-xl font-bold hover:bg-gray-100 transition-all"
            onClick={nextHome}
          >
            Quay lại Trang chủ
          </button>
        </div>
      </div>
      {/* Phần liên hệ */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
