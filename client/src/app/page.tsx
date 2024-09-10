'use client'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProduct } from '../../store/reducers/productReducer';
import { getAllCategory } from '../../store/reducers/categoryReducer';
import Header from '../components/Header';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer'; 
import { GiCheckMark } from 'react-icons/gi';
import { CgCalendarDates } from 'react-icons/cg';
import { FaPlugCircleCheck } from 'react-icons/fa6';
import { FaRedo, FaSearch } from 'react-icons/fa';
import { Product } from './interface/product';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useRouter } from 'next/navigation';

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter(); 
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

  useEffect(() => {
    let filtered = products;
    if (year) filtered = filtered.filter((product: Product) => product.created_at.slice(-4) === year);
    if (category) filtered = filtered.filter((product: Product) => product.category === category);
    if (priceRange) {
      filtered = filtered.filter((product: Product) => {
        if (priceRange === "15") return product.price <= 15000000;
        if (priceRange === "1530") return product.price > 15000000 && product.price <= 30000000;
        if (priceRange === "30") return product.price > 30000000;
        return true;
      });
    }
    setFilteredProducts(filtered);
  }, [year, category, priceRange, products]);

  const formatVND = (price: number) => price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

  const handleReset = () => {
    setYear('');
    setCategory('');
    setPriceRange('');
    setFilteredProducts(products);
  };

  const handleCard = (item: Product) => {
    router.push(`/user/card/${item.id}`);
  };

  return (
    <>
      <Header />
      {/* Banner */}
      <div className='bg-black w-full'>
        <Swiper rewind={true} navigation={true} modules={[Navigation]} className="mySwiper">
          <SwiperSlide>
            <img className='w-full h-[673px]' src="https://motors.stylemixthemes.com/dealer-two/wp-content/uploads/sites/9/revslider/home_slider/slide_1.jpg" alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img className='w-full h-[673px]' src="https://cms-i.autodaily.vn/du-lieu/2021/06/22/nguoi-dung-vinfast-lux-01.jpg" alt="" />
          </SwiperSlide>
        </Swiper>
      </div>
      {/* end-ảnh banner */}

      {/* Nội dung */}
      <div className="w-full flex justify-center mt-10">
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
              {categori?.map((item: Product) => (
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center mt-10 p-60 py-0">
        {filteredProducts.map((item: Product) => (
          <div
            key={item.id}
            className="bg-gray-800 text-white shadow-lg border-2 border-gray hover:border-black transition-all duration-300 hover:shadow-2xl" 
          >
            <img src={item.image} className="w-full h-[340px]"/>
            <div className="p-4">
              <h2 className="text-lg truncate">{item.name}</h2>
              <div className="flex justify-between mt-2 mb-4 border-b pb-2">
                <button onClick={() => handleCard(item)} className="bg-blue-500 text-white py-1 px-3">Xem sản phẩm</button>
                <div className="text-blue-400 text-lg">{formatVND(item.price)}</div>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>
                  <GiCheckMark /> Chính hãng
                </span>
                <span>
                  <CgCalendarDates /> 2023
                </span>
                <span>
                  <FaPlugCircleCheck /> Sạc nhanh!
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* end-hiển thị tất cả danh sách sản phẩm */}

      {/* Phần liên hệ */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </>
  );
}