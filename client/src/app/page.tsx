'use client'
import { FaFacebook, FaGoogle, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaPhoneAlt, FaRedo, FaSearch, FaTwitch, FaTwitter, FaYoutube } from 'react-icons/fa'
import { MdMailOutline, MdOutlineWorkHistory } from 'react-icons/md'
import { RiShoppingCart2Fill } from 'react-icons/ri'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllProduct } from '../../store/reducers/productReducer';
import { getAllCategory } from '../../store/reducers/categoryReducer';
import { GiCheckMark } from 'react-icons/gi';
import { CgCalendarDates } from 'react-icons/cg';
import { FaPlugCircleCheck } from 'react-icons/fa6';

export default function Home() {
  const dispatch = useDispatch();
  const products = useSelector((state: any) => state.productReducer.products);
  const categori = useSelector((state: any) => state.categoryReducer.classify);
  const [year, setYear] = useState('');
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  useEffect(() => {
    dispatch(getAllProduct());
    dispatch(getAllCategory());
  }, [dispatch]);
  console.log(22222222, products, 555555555555, categori);

  useEffect(() => {
    let filtered = products;

    if (year) {
      filtered = filtered.filter((product: any) => new Date(product.created_at).getFullYear().toString() === year);
    }
    if (category) {
      filtered = filtered.filter((product: any) => product.category === category);
    }
    if (priceRange) {
      filtered = filtered.filter((product: any) => {
        if (priceRange === "15") return product.price <= 15000000;
        if (priceRange === "1530") return product.price > 15000000 && product.price <= 30000000;
        if (priceRange === "30") return product.price > 30000000;
        return true;
      });
    }

    setFilteredProducts(filtered);
  }, [year, category, priceRange, products]);

  // reset tìm kiếm
  const handleReset = () => {
    setYear('');
    setCategory('');
    setPriceRange('');
    setFilteredProducts(products);
  };

  // Product display logic
  const handleShowProduct = (item: any) => {
    // Logic for viewing product details
  };

  // format tiền
  const formatVND = (price: number) => {
    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  };

  return (
    <>
      <div className='w-full'>

        {/* phần đầu */}
        <div className='bg-slate-950 flex justify-center items-center h-12 text-sm text-gray-400 gap-12'>
          <div className='flex items-center gap-2'><FaPhoneAlt /> +83 349 199 812</div>
          <div className='flex items-center gap-2'><FaMapMarkerAlt /> 27 Tân Triều, Hà Đông, Hà Nội</div>
          <div className='flex items-center gap-2'><MdOutlineWorkHistory /> Work Hours</div>
          <div className='ml-24 flex gap-6'>
            <FaFacebook />
            <FaInstagram />
            <FaTwitch />
            <FaGoogle />
          </div>
          <div className="relative inline-block">
            <div className="flex gap-2 items-center cursor-pointer">
              <img className="w-8 h-8 rounded-full bg-black p-1" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png" alt="" />
              <div className="hover:text-gray-500">
                {/* {loggedInUser ? loggedInUser.name : 'Chưa đăng nhập'} */}
              </div>
            </div>
            <div className="hidden absolute bg-gray-100 min-w-[140px] shadow-lg top-8 left-0 z-10 text-gray-600 hover-content">
              <p className="py-2 hover:text-teal-500 cursor-pointer"
              // onClick={myAccount}
              >Tài khoản của tôi</p>
              <p className="py-2 hover:text-teal-500 cursor-pointer"
              // onClick={myPay}
              >Đơn mua</p>
              <p className="py-2 hover:text-teal-500 cursor-pointer"
              // onClick={logOut}
              >Đăng xuất</p>
            </div>
          </div>
        </div>
        {/* end-phần đầu */}

        {/* thanh điều hướng */}
        <div className={`bg-gray-500 bg-opacity-50 fixed top-0 z-50 w-full flex justify-around items-center text-white py-3 transition-transform mt-12`}>
          <div className='italic text-4xl'>Laptops</div>
          <div className='flex gap-5'>
            <div
              // onClick={nextToHome} 
              className='hover:border-b-2 border-blue-400 cursor-pointer'>TRANG CHỦ</div>
            <div
              // onClick={nextToCategory} 
              className='hover:border-b-2 border-blue-400 cursor-pointer'>DANH MỤC</div>
            <div className='hover:border-b-2 border-blue-400 cursor-pointer'>DỊCH VỤ CỦA CHÚNG TÔI</div>
            <div className='hover:border-b-2 border-blue-400 cursor-pointer'>BLOG</div>
            <div className='hover:border-b-2 border-blue-400 cursor-pointer'>MEGA MENU</div>
            <div className='hover:border-b-2 border-blue-400 cursor-pointer'>CỬA HÀNG</div>
            <div className='hover:border-b-2 border-blue-400 cursor-pointer'>TRANG</div>
          </div>
          <div
            // onClick={nextToCart} 
            className='relative text-4xl text-blue-500 cursor-pointer'>
            <div className='absolute text-xs text-white bg-black rounded-full w-5 h-5 flex items-center justify-center -top-2 -right-2'>3</div>
            <RiShoppingCart2Fill />
          </div>
        </div>
        {/* end-thanh điều hướng */}

        {/* ảnh banner */}
        <div className='bg-black w-full h-[screen-25px]'>
          <Swiper
            rewind={true}
            navigation={true}
            modules={[Navigation]}
            className="mySwiper"
          >
            <SwiperSlide>
              <img className='w-full h-[673px]' src="https://motors.stylemixthemes.com/dealer-two/wp-content/uploads/sites/9/revslider/home_slider/slide_1.jpg" alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img className='w-full h-[673px]' src="https://cms-i.autodaily.vn/du-lieu/2021/06/22/nguoi-dung-vinfast-lux-01.jpg" alt="" />
            </SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide>
            <SwiperSlide>Slide 5</SwiperSlide>
            <SwiperSlide>Slide 6</SwiperSlide>
            <SwiperSlide>Slide 7</SwiperSlide>
            <SwiperSlide>Slide 8</SwiperSlide>
            <SwiperSlide>Slide 9</SwiperSlide>
          </Swiper>
        </div>
        {/* end-ảnh banner */}

        {/* phần tìm kiếm */}
        <div className="w-full flex justify-center">
          <div className="w-[70%] bg-gray-900 p-12 rounded text-white shadow-lg">
            <div className="flex items-center mb-4">
              <FaSearch className="mr-2 text-2xl" />
              <h2 className="text-xl">Lọc sản phẩm</h2>
            </div>
            <div className="flex gap-4 items-center">
              <select value={year} onChange={(e) => setYear(e.target.value)} className="w-1/3 p-3 bg-gray-200 text-black rounded">
                <option value="">Chọn năm</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
              </select>

              <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-1/3 p-3 bg-gray-200 text-black rounded">
                <option value="">Chọn danh mục</option>
                {categori?.map((item: any) => (
                  <option key={item.id} value={item.name}>{item.name}</option>
                ))}
              </select>

              <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)} className="w-1/3 p-3 bg-gray-200 text-black rounded">
                <option value="">Chọn giá</option>
                <option value="15">Dưới 15 tr</option>
                <option value="1530">15-30tr</option>
                <option value="30">Trên 30tr</option>
              </select>

              <button onClick={handleReset} className="flex items-center gap-2 p-3 bg-purple-600 text-white rounded hover:bg-purple-700">
                <FaRedo className="text-xl" /> RESET
              </button>
            </div>
          </div>
        </div>
        {/* end-phần tìm kiếm */}

        {filteredProducts.length === 0 ? (
          <div className="text-center mt-40">
            <h1 className="text-4xl font-bold">Không tìm thấy sản phẩm</h1>
            <p className="text-gray-500">Vui lòng tìm kiếm sản phẩm khác!</p>
          </div>
        ) : (
          <div className="text-center mt-40">
            <h1 className="text-4xl font-bold">RECENT <span className="text-yellow-500">Laptop</span></h1>
            <p className="text-gray-500">Curabitur tellus leo, euismod sit amet gravida at, egestas sed commodo.</p>
          </div>
        )}

        {/* hiển thị tất cả danh sách sản phẩm */}
        <div className="flex flex-wrap gap-4 justify-center mt-10">
          {filteredProducts.map((item: any) => (
            <div key={item.id} className="bg-gray-800 text-white w-[340px] shadow-lg">
              <img src={item.image} className="w-full h-[340px]" />
              <div className="p-4">
                <h2 className="text-lg truncate">{item.name}</h2>
                <div className="flex justify-between mt-2 mb-4 border-b pb-2">
                  <button
                    onClick={() => handleShowProduct(item)}
                    className="bg-blue-500 text-white py-1 px-3">Xem sản phẩm</button>
                  <div className="text-blue-400 text-lg">{formatVND(item.price)}</div>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span><GiCheckMark /> Chính hãng</span>
                  <span><CgCalendarDates /> 2023</span>
                  <span><FaPlugCircleCheck /> Sạc nhanh!</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* end-hiển thị tất cả danh sách sản phẩm */}

        {/* phần liên hệ */}
        <div className="bg-yellow-400 text-blue-900 p-8 text-center mt-20 flex justify-center gap-44">
          <div className="text-2xl font-bold">HAVE A QUESTION? FEEL FREE TO ASK...</div>
          <div className="flex justify-center items-center gap-10">
            <div className="flex items-center text-2xl">
              <FaPhoneAlt className="mr-2 text-white" />
              <span className="text-blue-900">+1 878-9674-4455</span>
            </div>
            <button className="flex items-center bg-transparent border border-white text-blue-900 py-2 px-6 rounded-md hover:bg-white hover:text-blue-900 transition duration-300">
              <MdMailOutline className="mr-2" />
              FEEDBACK
            </button>
          </div>
        </div>
        {/* end-phần liên hệ */}

        {/* phần cuối */}
        <div className="bg-gray-900 text-white p-10 flex flex-wrap justify-between gap-10 py-20 px-40">
          <div className="flex-1 min-w-[200px]">
            <h4 className="text-lg font-bold mb-4 text-purple-500">MOTORS <span className="text-white">WORDPRESS THEME</span></h4>
            <p className="text-gray-400">
              Fusce interdum ipsum egestas urna amet fringilla, et placerat ex venenatis. Aliquet luctus pharetra.
              Proin sed fringilla lectus...
            </p>
          </div>
          <div className="flex-1 min-w-[200px]">
            <h4 className="text-lg font-bold mb-4">PHOTO GALLERY</h4>
            <div className="flex gap-2">
              <img src="https://hoanghamobile.com/Uploads/2024/04/25/laptop-gaming-11.jpg" className="w-12 h-12" alt="Gallery 1" />
              <img src="https://laptopaz.vn/media/news/2109_co-su-dung-laptop-choi-game-de-lam-do-hoa-duoc-khong-4.jpg" className="w-12 h-12" alt="Gallery 2" />
              <img src="https://file.hstatic.net/1000026716/file/laptop-gaming-1_ab19abe37d5540cf8e40c0dd5839923a.jpg" className="w-12 h-12" alt="Gallery 3" />
            </div>
          </div>
          <div className="flex-1 min-w-[200px]">
            <h4 className="text-lg font-bold mb-4">LATEST BLOG POSTS</h4>
            <p className="text-gray-400">
              Cras condimentum a elit eget sagittis. Ut dignissim sapien feugiat purus tristique, vitae...
            </p>
            <p className="text-purple-400 mt-2">NO COMMENTS</p>
          </div>
          <div className="flex-1 min-w-[200px]">
            <h4 className="text-lg font-bold mb-4">SOCIAL NETWORK</h4>
            <div className="flex gap-4">
              <FaFacebook className="text-gray-400 hover:text-white" />
              <FaTwitter className="text-gray-400 hover:text-white" />
              <FaInstagram className="text-gray-400 hover:text-white" />
              <FaGoogle className="text-gray-400 hover:text-white" />
              <FaYoutube className="text-gray-400 hover:text-white" />
            </div>
          </div>
          <div className="flex-1 min-w-[200px]">
            <h4 className="text-lg font-bold mb-4">SUBSCRIBE</h4>
            <div className="flex">
              <input type="email" placeholder="Enter your email..." className="p-2 flex-grow bg-gray-800 text-white border border-gray-700" />
              <button className="bg-yellow-500 p-2">
                <i className="fas fa-rss text-white"></i>
              </button>
            </div>
            <p className="text-gray-400 mt-2">Get latest updates and offers.</p>
          </div>
        </div>
        <div className="bg-gray-800 text-gray-400 p-5 flex justify-between items-center px-40 ">
          <p>Copyright © 2021. Motors - WordPress Theme by StylemixThemes</p>
          <div className="flex gap-4">
            <FaFacebook className="hover:text-purple-500" />
            <FaTwitter className="hover:text-purple-500" />
            <FaInstagram className="hover:text-purple-500" />
            <FaLinkedin className="hover:text-purple-500" />
          </div>
        </div>
        {/* end-phần cuối */}
      </div>
    </>
  )
}