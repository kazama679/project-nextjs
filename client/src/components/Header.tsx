'use client'
import { useEffect, useState } from 'react';
import { FaFacebook, FaGoogle, FaInstagram, FaMapMarkerAlt, FaPhoneAlt, FaTwitch } from 'react-icons/fa';
import { MdOutlineWorkHistory } from 'react-icons/md';
import { RiShoppingCart2Fill } from 'react-icons/ri';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUser } from '../../store/reducers/userReducer';
import { useRouter } from 'next/navigation';
import { User } from '@/app/interface/user';

export default function Header() {
  const [isHovered, setIsHovered] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(true); // Trạng thái cho biết có hiển thị navbar hay không
  const [lastScrollY, setLastScrollY] = useState(0); // Vị trí lăn cuối cùng
  const [user, setUser] = useState(null);
  const [avatar, setAvatar] = useState(''); // Để lưu trữ avatar người dùng
  const [cartItemsCount, setCartItemsCount] = useState(0); // Số lượng sản phẩm trong giỏ hàng

  const router = useRouter(); 
  const dispatch = useDispatch();
  const users = useSelector((state: any) => state.userReducer.users); // Lấy danh sách người dùng từ reducer
  
  // Lấy dữ liệu người dùng từ db.json thông qua Redux
  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);

  // Kiểm tra người dùng trong localStorage và lấy avatar từ db.json
  useEffect(() => {
    const checkUser = localStorage.getItem('user');
    if (!checkUser) {
      router.push('/user/login'); // Chuyển đến trang đăng nhập nếu không có người dùng
    } else {
      const userData = JSON.parse(checkUser); // Lấy thông tin người dùng từ localStorage
      setUser(userData);

      // So sánh id của người dùng trong localStorage với danh sách từ db.json
      const matchedUser = users.find((user: User) => user.id === userData.id);
      if (matchedUser) {
        setAvatar(matchedUser.avatar); // Lấy avatar từ db.json
        setCartItemsCount(matchedUser.cart.length); // Lấy số lượng sản phẩm trong giỏ hàng
      }
    }
  }, [router, users]);

  // Hiển thị form khi hover vào user
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Chuyển đến trang profile
  const handleProfile = () => {
    router.push('/user/profile');
  };

  // Chuyển đến trang đơn mua
  const handleMyOrder = () => {
    router.push('/user/myOrder');
  };

  // Xử lý đăng xuất
  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/user/login');
  };

  // Chuyển hướng đến giỏ hàng
  const nextCart = () => {
    router.push('/user/cart');
  };

  // Xử lý khi người dùng lăn chuột
  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      // Nếu lăn xuống, ẩn thanh điều hướng
      setIsScrollingUp(false);
    } else {
      // Nếu lăn lên, hiển thị thanh điều hướng
      setIsScrollingUp(true);
    }
    // Cập nhật vị trí lăn hiện tại
    setLastScrollY(window.scrollY);
  };

  // chuyển về home
  const nextHome=()=>{
    router.push('/');
  }

  // Thêm sự kiện lăn chuột
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll); // Gỡ sự kiện khi component bị unmount
    };
  }, [lastScrollY]);

  return (
    <div className="bg-slate-950 flex justify-center items-center h-12 text-sm text-gray-400 gap-12">
      <div className="flex items-center gap-2">
        <FaPhoneAlt /> +83 349 199 812
      </div>
      <div className="flex items-center gap-2">
        <FaMapMarkerAlt /> 27 Tân Triều, Hà Đông, Hà Nội
      </div>
      <div className="flex items-center gap-2">
        <MdOutlineWorkHistory /> Work Hours
      </div>
      <div className="ml-24 flex gap-6">
        <FaFacebook />
        <FaInstagram />
        <FaTwitch />
        <FaGoogle />
      </div>
      <div className="relative inline-block hover:text-gray-500">
        {user && (
          <div
            className="flex gap-2 items-center cursor-pointer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img
              className="w-8 h-8 rounded-full bg-black p-1"
              src={avatar || 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png'}
              alt="User Avatar"
            />
            <div className="">{user.name || 'User'}</div>
          </div>
        )}

        {/* Phần menu hiển thị khi hover */}
        {isHovered && (
          <div
            className="absolute bg-gray-100 min-w-[140px] shadow-lg top-12 left-0 z-20 text-gray-600 p-4 mt-[-15px]"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <p className="py-2 hover:text-teal-500 cursor-pointer" onClick={handleProfile}>
              Tài khoản của tôi
            </p>
            <p className="py-2 hover:text-teal-500 cursor-pointer" onClick={handleMyOrder}>
              Đơn mua
            </p>
            <p className="py-2 hover:text-teal-500 cursor-pointer" onClick={handleLogout}>
              Đăng xuất
            </p>
          </div>
        )}
      </div>
      <div
        className={`bg-gray-500 bg-opacity-50 fixed top-0 z-10 w-full flex justify-around items-center mt-12 text-white py-3 transition-transform duration-700 ease-in-out ${
          isScrollingUp ? 'translate-y-0' : '-translate-y-[120px]'
        }`}
      >
        <div className='italic text-4xl'>Laptops</div>
        <div className='flex gap-5'>
          <div className='hover:border-b-2 border-blue-400 cursor-pointer' onClick={nextHome}>TRANG CHỦ</div>
          <div className='hover:border-b-2 border-blue-400 cursor-pointer'>DANH MỤC</div>
          <div className='hover:border-b-2 border-blue-400 cursor-pointer'>DỊCH VỤ CỦA CHÚNG TÔI</div>
          <div className='hover:border-b-2 border-blue-400 cursor-pointer'>BLOG</div>
          <div className='hover:border-b-2 border-blue-400 cursor-pointer'>MEGA MENU</div>
          <div className='hover:border-b-2 border-blue-400 cursor-pointer'>CỬA HÀNG</div>
          <div className='hover:border-b-2 border-blue-400 cursor-pointer'>TRANG</div>
        </div>
        <div className='relative text-4xl text-blue-500 cursor-pointer' onClick={nextCart}>
          <div className='absolute text-xs text-white bg-black rounded-full w-5 h-5 flex items-center justify-center -top-2 -right-2'>
            {cartItemsCount}
          </div>
          <RiShoppingCart2Fill />
        </div>
      </div>
    </div>
  );
}
