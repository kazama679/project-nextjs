"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from "../../store/reducers/productReducer";
import { getAllCategory } from "../../store/reducers/categoryReducer";
import Header from "../components/Header";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import { GiCheckMark } from "react-icons/gi";
import { FaHeartCircleCheck, FaHeartCircleXmark, FaPlugCircleCheck } from "react-icons/fa6";
import { FaHeart, FaRedo, FaSearch } from "react-icons/fa";
import { Product } from "./interface/product";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useRouter } from "next/navigation";
import { CiHeart } from "react-icons/ci";
import { getAllUser, updateUserCart } from "../../store/reducers/userReducer";
import { Category } from "./interface/category";

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  const products = useSelector((state: any) => state.productReducer.products);
  const categori = useSelector((state: any) => state.categoryReducer.classify);
  const users = useSelector((state: any) => state.userReducer.users);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [notificationType, setNotificationType] = useState<string | null>(null);

  const [year, setYear] = useState("");
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); 
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1); 
  const [itemsPerPage] = useState(6); 
  const [sortOrder, setSortOrder] = useState<string>("");

  useEffect(() => {
    dispatch(getAllProduct());
    dispatch(getAllUser());
    dispatch(getAllCategory());
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, [dispatch]);

  useEffect(() => {
    let filtered = [...products]; 
    if (searchTerm) {
      filtered = filtered.filter((product: Product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (year) {
      filtered = filtered.filter(
        (product: Product) => product.created_at.slice(-4) === year
      );
    }
    if (category) {
      filtered = filtered.filter(
        (product: Product) => product.category === category
      );
    }
    if (priceRange) {
      filtered = filtered.filter((product: Product) => {
        if (priceRange === "15") return product.price <= 15000000;
        if (priceRange === "1530")
          return product.price > 15000000 && product.price <= 30000000;
        if (priceRange === "30") return product.price > 30000000;
        return true;
      });
    }
    if (sortOrder === "up") {
      filtered = [...filtered].sort((a: Product, b: Product) => a.price - b.price); 
    } else if (sortOrder === "down") {
      filtered = [...filtered].sort((a: Product, b: Product) => b.price - a.price);
    }
  
    setFilteredProducts(filtered);
  }, [year, category, priceRange, searchTerm, sortOrder, products]);

  const formatVND = (price: number) =>
    price.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  const handleReset = () => {
    setYear("");
    setCategory("");
    setPriceRange("");
    setSearchTerm(""); 
    setFilteredProducts(products);
  };

  const handleCard = (item: Product) => {
    router.push(`/user/card/${item.id}`);
  };

  // Lấy 3 sản phẩm có số lượng sales lớn nhất
  const topSellingProducts = products
    .filter((product: Product) => product.sales)
    .sort((a: Product, b: Product) => b.sales - a.sales)
    .slice(0, 3);

  // Tính tổng số trang
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Lấy các sản phẩm cho trang hiện tại
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Hàm chuyển trang
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // thêm vào yêu thích
  const addToLike = (product: Product) => {
    if (!currentUser) {
      alert("Vui lòng đăng nhập để thêm sản phẩm vào yêu thích.");
      return;
    }

    const userToUpdate = users.find((user: any) => user.id === currentUser.id);

    if (userToUpdate) {
      let newLikes = [...(userToUpdate.like || [])];
      const isProductLiked = newLikes.some((item: Product) => item.id === product.id);
      if (isProductLiked) {
        newLikes = newLikes.filter((item: Product) => item.id !== product.id);
        setNotificationType('remove');  
      } else {
        newLikes = [...newLikes, product];
        setNotificationType('add'); 
      }
      const updatedUser = { ...userToUpdate, like: newLikes };
      dispatch(updateUserCart(updatedUser))
        .then(() => {
          setCurrentUser(updatedUser);
          localStorage.setItem('user', JSON.stringify(updatedUser));
          setTimeout(() => setNotificationType(null), 2000);
        })
        .catch(() => {
          alert("Có lỗi xảy ra khi cập nhật sản phẩm yêu thích.");
        });
    }
  };

  // Hàm kiểm tra xem sản phẩm đã có trong danh sách yêu thích chưa
  const checkProductDb = (productId: number) => {
    return currentUser && currentUser.like && currentUser.like.some((item: Product) => item.id === productId);
  };

  return (
    <>
      <Header />
      {/* Banner */}
      <div className="bg-black w-full">
        <Swiper rewind={true} navigation={true} modules={[Navigation]} className="mySwiper">
          <SwiperSlide>
            <img
              className="w-full h-[673px]"
              src="https://www.homepaylater.vn/static/ba8cdabb9f818bc4cdf2fd35013e7c82/51924/7_laptop_msi_titan_gt77_hx_13vi_077vn_chinh_la_ke_thong_tri_tuyet_doi_nha_msi_voi_suc_manh_chan_dong_thien_ha_vuot_qua_moi_gioi_han_truoc_kia_d7170b82c9.webp"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="w-full h-[673px]"
              src="https://www.homepaylater.vn/static/28d4233b7a91cc5d6de756a085de0b70/2f4b3/1_cac_dong_laptop_gaming_msi_luon_duoc_nhieu_tin_do_cong_nghe_va_game_thu_san_don_vi_suc_manh_vuot_troi_5f475a6a5c.webp"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="w-full h-[673px]"
              src="https://www.homepaylater.vn/static/72f3958a866b47d52c740d44cbd7b955/7ca15/2_cac_dong_laptop_gaming_msi_trai_dai_o_moi_phan_khuc_phuc_vu_toi_da_nhu_cau_choi_game_cua_nguoi_dung_9214abb976.webp"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="w-full h-[673px]"
              src="https://www.homepaylater.vn/static/3adc22d69d4703a25930308499e223bb/91c60/5_chiec_laptop_gaming_msi_katana_gf66_11ue_836vn_duoc_trau_chuot_ti_mi_tua_nhung_luoi_kiem_sac_ben_san_sang_nghenh_chien_bat_cu_doi_thu_nao_ad17c919dd.webp"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="w-full h-[673px]"
              src="https://www.homepaylater.vn/static/4e8ee94623b9e79287260f6facd66686/f723b/6_man_hinh_laptop_gaming_msi_cyborg_15_a12ve_412vn_se_khong_de_ban_bo_lo_bat_cu_mot_khoanh_khac_chuyen_dong_nao_1565bbdb81.webp"
              alt=""
            />
          </SwiperSlide>
        </Swiper>
      </div>
      {/* end-ảnh banner */}

      {/* hiển thị sản phẩm bán chạy */}
      <div className="bg-gray-100 py-20">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold">Sản phẩm bán chạy</h2>
            <p className="text-gray-500">Khám phá các lựa chọn hàng đầu hiện tại</p>
          </div>
          <div className="container mx-auto py-10">
            <div className="flex justify-center space-x-5 w-full h-[250px]">
              {topSellingProducts.map((product: Product) => (
                <div onClick={() => handleCard(product)} key={product.id} className="relative w-1/4 cursor-pointer bg-white group border border-gray-300">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-56 h-56 object-cover ml-36 mt-6"
                  />
                  <div className="absolute inset-0 flex flex-col justify-start p-5 bg-white bg-opacity-10">
                    <h3 className="text-2xl font-bold">
                      {product.name.split(' ').slice(1, 2).join(' ')}
                      <br />
                      {product.name.split(' ').slice(2, 3).join(' ')}
                    </h3>
                    <p className="text-gray-600">{product.category}</p>
                  </div>
                  {/* Hiệu ứng đường kẻ khi hover */}
                  <div className="absolute inset-0 flex justify-center items-center">
                    <div className="absolute top-0 left-0 w-0 h-[2px] bg-black group-hover:w-full transition-all duration-500"></div>
                    <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-black group-hover:w-full transition-all duration-500"></div>
                    <div className="absolute top-0 left-0 h-0 w-[2px] bg-black group-hover:h-full transition-all duration-500"></div>
                    <div className="absolute top-0 right-0 h-0 w-[2px] bg-black group-hover:h-full transition-all duration-500"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* end-hiển thị sản phẩm bán chạy */}

      {/* hiển thị theo danh mục */}
      {categori?.map((category: Category) => {
        // Lọc sản phẩm theo danh mục
        const filteredProducts = products.filter(
          (product: Product) => product.category === category.name
        );
        return (
          <div key={category.id} className="py-10 mt-10 cursor-pointer">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-2">{category.name}</h2>
              <p className="text-gray-500 mb-6">{category.description}</p>
            </div>
            {/* hiển thị sản phẩm có danh mục */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {/* Hiển thị tối đa 4 sản phẩm */}
              {filteredProducts.slice(0, 4).map((product: Product) => (
                <div
                  onClick={() => handleCard(product)}
                  key={product.id}
                  className="bg-white rounded-lg shadow-md p-4 relative hover:border-black transition-all duration-300 hover:shadow-2xl"
                >
                  {/* stopPropagation giúp ngăn chặn nhận onclick từ phần tử con sang cha */}
                  <div onClick={(e) => { e.stopPropagation(); addToLike(product); }}>
                    {checkProductDb(product.id) ? (
                      <FaHeart className="hover:text-red-600 text-xl text-red-600" />
                    ) : (
                      <CiHeart className="hover:text-red-600 text-xl" />
                    )}
                  </div>
                  <div className="bg-red-500 text-white text-sm px-2 py-1 rounded-full absolute top-2 right-2">
                    New
                  </div>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-56 object-cover rounded"
                  />
                  <h3 className="mt-4 text-gray-800 text-lg font-semibold truncate">
                    {product.name}
                  </h3>
                  <p className="text-orange-500 font-semibold mt-2">
                    {product.price.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </p>
                  <div className="flex items-center mt-2">
                    {[...Array(5)].map((_, index) => (
                      <svg
                        key={index}
                        className="w-5 h-5 text-yellow-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927C9.27 2.451 9.97 2.451 10.192 2.927L12.017 6.961L16.365 7.601C16.9 7.676 17.104 8.389 16.702 8.75L13.646 11.478L14.324 15.71C14.432 16.299 13.824 16.76 13.311 16.512L10 14.811L6.689 16.512C6.176 16.76 5.568 16.299 5.676 15.71L6.354 11.478L3.298 8.75C2.896 8.389 3.1 7.676 3.635 7.601L7.983 6.961L9.808 2.927H9.049Z" />
                      </svg>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {/* end-hiển thị sản phẩm có danh mục */}
          </div>
        );
      })}
      {/* end-hiển thị theo danh mục */}

      {/* hiển thị tìm kiếm */}
      <div className="w-full flex justify-center mt-32 mb-[-50px]">
        <div className="w-[70%] bg-gray-900 p-12 rounded text-white shadow-lg">
          <div className="flex items-center mb-4">
            <FaSearch className="mr-2 text-2xl" />
            <input
              className="w-64 rounded h-8 text-black p-2"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Cập nhật giá trị tìm kiếm
              placeholder="Tìm kiếm sản phẩm..."
            />
          </div>
          <div className="flex gap-4 items-center">
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-1/3 p-3 bg-gray-200 text-black rounded"
            >
              <option value="">Lọc theo năm</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
            </select>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-1/3 p-3 bg-gray-200 text-black rounded"
            >
              <option value="">Lọc theo danh mục</option>
              {categori?.map((item: Product) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>

            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-1/3 p-3 bg-gray-200 text-black rounded"
            >
              <option value="">Lọc theo giá</option>
              <option value="15">Dưới 15 tr</option>
              <option value="1530">15-30tr</option>
              <option value="30">Trên 30tr</option>
            </select>

            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-1/3 p-3 bg-gray-200 text-black rounded"
            >
              <option value="">Sắp xếp theo giá</option>
              <option value="up">Tăng dần</option>
              <option value="down">Giảm dần</option>
            </select>

            <button
              onClick={handleReset}
              className="flex items-center gap-2 p-3 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              <FaRedo className="text-xl" /> RESET
            </button>
          </div>
        </div>
      </div>
      {/* end-hiển thị tìm kiếm */}

      {filteredProducts.length === 0 ? (
        <div className="text-center mt-40">
          <h1 className="text-4xl font-bold">Không tìm thấy sản phẩm</h1>
          <p className="text-gray-500">Vui lòng tìm kiếm sản phẩm khác!</p>
        </div>
      ) : (
        <div className="text-center mt-40">
          <h1 className="text-4xl font-bold">
            RECENT <span className="text-yellow-500">Laptop</span>
          </h1>
          <p className="text-gray-500">
            Curabitur tellus leo, euismod sit amet gravida at, egestas sed
            commodo.
          </p>
        </div>
      )}

      {/* Hiển thị tất cả danh sách sản phẩm */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center mt-10 p-60 py-0">
        {currentProducts.map((item: Product) => (
          <div
            key={item.id}
            className="bg-gray-800 text-white shadow-lg border-2 border-gray hover:border-black transition-all duration-300 hover:shadow-2xl"
          >
            <img src={item.image} className="w-full h-[340px]" />
            <div className="p-4">
              <h2 className="text-lg truncate">{item.name}</h2>
              <div className="flex justify-between mt-2 mb-4 border-b pb-2">
                <button
                  onClick={() => handleCard(item)}
                  className="bg-blue-500 text-white py-1 px-3"
                >
                  Xem sản phẩm
                </button>
                <div className="text-blue-400 text-lg">{formatVND(item.price)}</div>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>
                  <GiCheckMark className="ml-8" /> Chính hãng
                </span>
                <span
                  onClick={() => addToLike(item)}
                  className="cursor-pointer hover:text-white"
                >
                  {checkProductDb(item.id) ? <><FaHeart className="ml-5 text-red-600" />Yêu thích</> : <><CiHeart className="ml-5 text-xl mt-[-5px]" />Yêu thích</>}
                </span>
                <span>
                  <FaPlugCircleCheck className="ml-8" /> Sạc nhanh!
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* end-hiển thị tất cả danh sách sản phẩm */}

      {/* Phân trang */}
      <div className="flex justify-center space-x-2 mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`px-3 py-1 border rounded ${currentPage === index + 1 ? "bg-blue-500 text-white" : ""
              }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      {/* end-Phân trang */}

      {/* hiển thị form yêu thích */}
      {notificationType === 'add' ? (
        <div className="fixed inset-0 flex items-center justify-center z-50 border border-black">
          <div className="bg-white p-6 shadow-2xl rounded-lg z-50 flex flex-col items-center justify-center text-center">
            <FaHeartCircleCheck className="text-red-500 text-4xl mb-2" />
            <p className="text-lg font-bold text-red-500">Sản phẩm đã được thêm vào yêu thích</p>
          </div>
        </div>
      ) : notificationType === 'remove' ? <div className="fixed inset-0 flex items-center justify-center z-50 border border-black">
        <div className="bg-white p-6 shadow-2xl rounded-lg z-50 flex flex-col items-center justify-center text-center">
          <FaHeartCircleXmark className="text-black text-4xl mb-2" />
          <p className="text-lg font-bold">Đã bỏ yêu thích sản phẩm</p>
        </div>
      </div> : <></>}

      <ContactSection />
      <Footer />
    </>
  );
}