"use client"
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getAllUser } from '../../../../store/reducers/userReducer'
import { User } from '@/app/interface/user'
import { useRouter } from 'next/navigation'
import { addOrder } from '../../../../store/reducers/orderReducer'
import axios from 'axios';
import { getAllProduct } from '../../../../store/reducers/productReducer';

export default function Pay() {
  const router = useRouter();
  const [userLocal, setUserLocal] = useState<any>(null);
  const dispatch = useDispatch();
  const users = useSelector((state: any) => state.userReducer.users);
  const products = useSelector((state: any) => state.productReducer.products);

  // State để lưu giá trị người dùng nhập
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [province, setProvince] = useState<string>("");
  const [payTo, setPayTo] = useState<string>("");

  // State để kiểm tra lỗi
  const [errName, setErrName] = useState<boolean>(false);
  const [errPhone, setErrPhone] = useState<boolean>(false);
  const [errAddress, setErrAddress] = useState<boolean>(false);
  const [errProvince, setErrProvince] = useState<boolean>(false);
  const [errPay, setErrPay] = useState<boolean>(false);

  const [formMess, setFormMess] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getAllUser());
    dispatch(getAllProduct());
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUserLocal(JSON.parse(storedUser));
    }
  }, [dispatch]);

  // Tìm vị trí người dùng trong db
  const userIndex = users.findIndex((user: User) => user.id === userLocal?.id);

  // Lấy giỏ hàng của người dùng
  const userCart = users[userIndex]?.cart;

  // chuyển về home
  const nextHome = () => {
    router.push('/');
  }

  // Định dạng tiền VND
  const formatVND = (price: number) => price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

  // Hàm tạo mã đơn hàng ngẫu nhiên
  const generateOrderId = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomLetters = Array.from({ length: 5 }, () => letters[Math.floor(Math.random() * letters.length)]).join('');
    const randomNumbers = Math.floor(1000 + Math.random() * 9000);
    return `${randomLetters}-${randomNumbers}`;
  };

  // Hàm tính tổng tiền sản phẩm
  const calculateTotalProductPrice = () => {
    if (userCart && userCart.length > 0) {
      return userCart.reduce((total: number, item: any) => total + item.price * item.quantity, 0);
    }
    return 0;
  };

  // Hàm tính phí vận chuyển
  const calculateShippingFee = () => {
    if (province === 'HaNoi') {
      return 30000;
    } else if (province === 'unHaNoi') {
      return 50000;
    }
    return 0;
  };

  // Hàm tính tổng tiền (sản phẩm + phí vận chuyển)
  const calculateGrandTotal = () => {
    return calculateTotalProductPrice() + calculateShippingFee();
  };

  // Hàm cập nhật stock của sản phẩm và cập nhật sales
  const updateProductStock = async () => {
    try {
      for (const item of userCart) {
        // Tìm sản phẩm trong danh sách sản phẩm
        const product = products.find((product: any) => product.id === item.id);

        if (product) {
          // Trừ stock
          const updatedStock = product.stock - item.quantity;

          // Kiểm tra xem đã có thuộc tính sales chưa
          const updatedSales = product.sales ? product.sales + item.quantity : item.quantity;

          // Tạo đối tượng sản phẩm cập nhật
          const updatedProduct = {
            ...product,
            stock: updatedStock,      // Cập nhật stock
            sales: updatedSales,      // Cập nhật sales
          };

          // Gửi yêu cầu cập nhật sản phẩm
          await axios.put(`http://localhost:8080/products/${item.id}`, updatedProduct);
        }
      }
    } catch (error) {
      console.error("Có lỗi xảy ra khi cập nhật stock sản phẩm:", error);
    }
  };

  // Hàm xóa giỏ hàng của người dùng
  const clearUserCart = async () => {
    const updatedUser = {
      ...users[userIndex],
      cart: [],
    };

    // Cập nhật lại user trong db.json
    try {
      await axios.put(`http://localhost:8080/users/${users[userIndex].id}`, updatedUser);
    } catch (error) {
      console.error("Có lỗi xảy ra khi xóa giỏ hàng:", error);
    }
  };

  // Hàm xử lý khi bấm nút Thanh toán
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset lỗi
    setErrName(false);
    setErrPhone(false);
    setErrAddress(false);
    setErrProvince(false);
    setErrPay(false);

    // Kiểm tra từng trường
    if (!name) setErrName(true);
    if (!phone) setErrPhone(true);
    if (!address) setErrAddress(true);
    if (!province) setErrProvince(true);
    if (!payTo) setErrPay(true);

    // Nếu có lỗi, không tiếp tục
    if (!name || !phone || !address || !province || !payTo) {
      return;
    }

    // Lấy cart từ người dùng đang đăng nhập
    const userCart = users[userIndex]?.cart;

    if (!userCart || userCart.length === 0) {
      console.log("Giỏ hàng trống!");
      return;
    }

    // Tính phí ship
    const shipFee = province === 'HaNoi' ? 30000 : 50000;

    // Tạo đơn hàng
    const newOrder = {
      id: generateOrderId(),
      name,
      phone,
      address,
      status: "choDuyet",
      cart: userCart,
      note: "",
      ship: shipFee,
      payTo,
      idUser: users[userIndex].id,
      created_at: new Date().toLocaleDateString('vi-VN'),
      updated_at: new Date().toLocaleDateString('vi-VN'),
    };

    // Thêm order mới vào db.json
    dispatch(addOrder(newOrder))
      .then(async () => {
        setFormMess(true);

        // Cập nhật stock của sản phẩm
        await updateProductStock();

        // Xóa giỏ hàng của người dùng
        await clearUserCart();

        // Hiển thị thông báo trong 2 giây và chuyển về trang chủ
        setTimeout(() => {
          setFormMess(false);
          router.push('/');
        }, 2000);
      })
      .catch(() => {
        console.log("Có lỗi xảy ra khi thêm đơn hàng.");
      });
  };

  return (
    <div>
      <Header />
      {/* pay */}
      <div className="shipping-form flex justify-center items-center p-5 w-full h-screen mt-20">
        <div className="shipping-form-child w-[40%] mr-[-65px]">
          {userCart && userCart.length > 0 ? <>
            <h1 className="text-2xl flex">Thanh toán</h1>
            <h3 className="flex">Thông tin giao hàng</h3></> : <></>}
          <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-[80%]">
            {userCart && userCart.length > 0 ? (
              <>
                <input
                  type="text"
                  placeholder="Họ và tên"
                  className="w-full p-2 border border-gray-300 h-10 text-center"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errName && (
                  <div className="text-red-500 text-sm">
                    Vui lòng nhập tên người nhận hàng!
                  </div>
                )}
                <input
                  type="tel"
                  placeholder="Số điện thoại"
                  className="w-full p-2 border border-gray-300 h-10 text-center"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                {errPhone && (
                  <div className="text-red-500 text-sm">
                    Vui lòng nhập số điện thoại người nhận hàng!
                  </div>
                )}
                <input
                  type="text"
                  placeholder="Địa chỉ"
                  className="w-full p-2 border border-gray-300 h-10 text-center"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                {errAddress && (
                  <div className="text-red-500 text-sm">Vui lòng nhập địa chỉ nhận hàng!</div>
                )}
                <select
                  className="w-full p-2 border border-gray-300 cursor-pointer h-10 text-center"
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                >
                  <option value="">Chọn tỉnh / thành</option>
                  <option value="HaNoi">Hà Nội</option>
                  <option value="unHaNoi">Ngoại thành</option>
                </select>
                {errProvince && <div className="text-red-500 text-sm">Vui lòng chọn tỉnh / thành!</div>}
                <select
                  className="w-full p-2 border border-gray-300 cursor-pointer h-10 text-center"
                  value={payTo}
                  onChange={(e) => setPayTo(e.target.value)}
                >
                  <option value="">Chọn phương thức thanh toán</option>
                  <option value="NhanHang">Thanh toán khi nhận hàng</option>
                  <option value="ChuyenKhoan">Thanh toán qua ngân hàng</option>
                </select>
                {errPay && <div className="text-red-500 text-sm">Vui lòng chọn phương thức thanh toán!</div>}
                <input
                  type="text"
                  placeholder="Ghi chú"
                  className="w-full p-2 border border-gray-300 h-10 text-center"
                />
              </>) : (<div className='text-rose-500'>Bạn đang không có sản phẩm nào để thanh toán!</div>)}
            {userCart && userCart.length > 0 ? (
              <button
                type="submit"
                className="w-full p-2 bg-blue-500 text-white cursor-pointer h-10 flex justify-center items-center text-center"
              >
                Thanh toán
              </button>
            ) : (
              <button
                type="button"
                className="w-full p-2 bg-blue-500 text-white cursor-pointer h-10 flex justify-center items-center text-center"
                onClick={nextHome}
              >
                Quay lại để mua hàng
              </button>
            )}
            <div
              style={{ display: `${formMess ? 'block' : 'none'}` }}
              className="flex items-center justify-center p-12 bg-green-100 border border-green-200 rounded shadow-md max-w-[300px] mx-auto fixed top-[35%] left-1/2 transform -translate-x-1/2 z-[1002]"
            >
              <div className="text-green-500 text-2xl mr-2 flex justify-center">✔</div>
              <div className="text-gray-600 text-lg">Đã đặt hàng thành công</div>
            </div>
          </form>
        </div>
        <div className="shipping-form-2 h-screen border-l border-gray-300 pl-12 flex items-center">
          <div className="cart-summary w-full">
            {/* Hiển thị số lượng sản phẩm mua */}
            {userCart?.map((item: any) => {
              return (<div key={item.id} className="item flex justify-between items-center py-2">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-[65px] h-[65px] shadow-md"
                />
                <div className="item-div bg-gray-500 text-white text-sm w-[20px] h-[20px] flex justify-center items-center mt-[-65px] ml-[-10px]">
                  {item.quantity}
                </div>
                <span className="item-span1 w-[200px] mr-10 truncate overflow-hidden text-ellipsis">{item.name}</span>
                <span className="item-span2 text-lg">{formatVND(item.price)}</span>
              </div>)
            })}
            {/* end-hiển thị số lượng sản phẩm mua */}
            <div className="down flex justify-between items-center border-b border-gray-300 pb-5 mb-2">
              <input
                type="text"
                className="w-[calc(90%-57px)] h-[35px] border border-gray-300 pl-2"
                placeholder="Mã giảm giá"
              />
              <button className="h-[35px] w-[100px] bg-gray-500 text-white flex justify-center items-center">
                Sử dụng
              </button>
            </div>
            <div className="total flex justify-between py-2">
              <span>Tạm tính</span>
              <span>{formatVND(calculateTotalProductPrice())}</span>
            </div>
            <div className="shipping-fee flex justify-between py-2">
              <span>Phí vận chuyển</span>
              <span>{formatVND(calculateShippingFee())}</span>
            </div>
            <div className="grand-total flex justify-between py-2 border-t border-gray-300 mt-3 pt-3">
              <b>Tổng cộng</b>
              <span className="text-red-600 text-2xl">{formatVND(calculateGrandTotal())}</span>
            </div>
          </div>
        </div>
      </div>
      {/* end-pay */}

      {/* Phần liên hệ */}
      <ContactSection />
      {/* Footer */}
      <Footer />
    </div>
  )
}
