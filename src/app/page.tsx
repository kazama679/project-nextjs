import React from 'react'
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { RiDeleteBin6Line } from 'react-icons/ri';

export default function page() {
  return (
    <>
      {/* cart */}
      <div className="shopping-cart p-5 font-sans border-gray-200 mb-4">
        <div className="shopping-cart__header mt-16 text-center mb-5">
          <h2 className="shopping-cart__header-h2 inline-block relative text-2xl font-bold pb-2">
            Giỏ hàng của bạn
            <span className="absolute bottom-[-5px] left-1/2 transform -translate-x-1/2 w-12 h-[2px] bg-gray-500"></span>
          </h2>
        </div>
        <div className="shopping-cart-child flex justify-center gap-6">
          {true ? (
            <div className="shopping-cart__items mt-5 w-[650px] p-2 bg-white">
              <div className="shopping-cart__items-p bg-gray-100 flex gap-1 py-4 px-5 -mt-2">
                <p className="text-lg mb-2">
                  Bạn đang có <b>0 sản phẩm</b> trong giỏ hàng
                </p>
              </div>
              <div>
                {/* {data.userReducer.users[indexUser]?.cart?.map((item) => ( */}
                <div className="item py-2 flex justify-between items-center">
                  <div className="item-card flex items-center">
                    <img
                      className="shopping-cart__item-img w-20 h-20 mb-5 mr-5 shadow-md"
                      src="https://product.hstatic.net/200000580329/product/skaa7570_2dbd969863d8472794ddecaef54194b9_master.jpg"
                      alt="T1 hoodie 2023"
                    />
                    <div className="shopping-cart__details flex flex-col items-start text-left">
                      <b className="shopping-cart__name font-serif">hhhh</b>
                      <div className="counter mt-2 mb-2 flex justify-center">
                        <button
                          className="w-6 h-6 flex items-center justify-center bg-gray-200 border-none"
                        // onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <input
                          type="text"
                          className="w-9 h-6 text-center border border-gray-200"
                        // value={item.quantity}
                        // onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                        />
                        <button
                          className="w-6 h-6 flex items-center justify-center bg-gray-200 border-none"
                        // onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      <b>0000</b>
                    </div>
                  </div>
                  <div>
                    <RiDeleteBin6Line
                      className="icon-delete w-6 text-xl text-gray-500 cursor-pointer"
                    />
                  </div>
                </div>
                {/* ))} */}
                <div className="shopping-cart__price flex justify-between items-center border-b border-gray-300 pb-2">
                  <b>Thành tiền:</b>
                  <b className="shopping-cart__price-number text-red-600">55555</b>
                </div>
              </div>
              <div className="shopping-cart__notes mt-5">
                <textarea
                  className="w-full h-24 p-2 border border-gray-300"
                  // onChange={handleNote}
                  // value={note}
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
              <div className="shopping-cart__summary__child2 text-2xl text-red-600">12345</div>
            </div>
            <div className="shopping-cart__summary-t text-gray-500 text-xs mb-2">Bạn có thể nhập mã giảm giá ở trang thanh toán</div>
            <button
              // onClick={handlePay}
              className="shopping-cart__checkout w-full py-2 bg-red-600 text-white text-center border-none cursor-pointer"
            >
              Thanh toán
            </button>
          </div>
        </div>

        {/* Đoạn này đã căn giữa 2 nút */}
        <div className="shopping-cart__actions flex flex-col items-center mt-2">
          {true ? (
            <button
              // onClick={deleteAll}
              className="shopping-cart-delete-all text-white bg-red-600 border-none py-2 rounded cursor-pointer px-4 w-[17%] border-b mb-6"
            >
              Xóa tất cả sản phẩm trong giỏ
            </button>
          ) : null}
          <hr className="w-[102.7%] border-gray-300 py-2 mt-6" />
          <button
            // onClick={nextToHome}
            className="shopping-cart__continue w-[50%] py-2 bg-white border border-gray-300 rounded-md text-center cursor-pointer mt-5 font-serif text-xl font-bold hover:bg-gray-100 transition-all"
          >
            Tiếp tục mua hàng
          </button>
        </div>
      </div>
      {/* end-cart */}

      {/* pay */}
      <div className="shipping-form flex justify-center items-center p-5 w-full h-screen">
        <div className="shipping-form-child w-[40%] mr-[-65px]">
          <h1 className="text-2xl flex">Thanh toán</h1>
          <h3 className="flex">Thông tin giao hàng</h3>
          <form className="flex flex-col gap-2 w-[80%]">
            <input
              type="text"
              placeholder="Họ và tên"
              className="w-full p-2 border border-gray-300 h-10 text-center"
            />
            {true && (
              <div className="text-red-500 text-sm">
                Vui lòng nhập tên người nhận hàng!
              </div>
            )}
            <input
              type="tel"
              placeholder="Số điện thoại"
              className="w-full p-2 border border-gray-300 h-10 text-center"
            />
            {true && (
              <div className="text-red-500 text-sm">
                Vui lòng nhập số điện thoại người nhận hàng!
              </div>
            )}
            <input
              type="text"
              placeholder="Địa chỉ"
              className="w-full p-2 border border-gray-300 h-10 text-center"
            />
            {true && (
              <div className="text-red-500 text-sm">Vui lòng nhập địa chỉ nhận hàng!</div>
            )}
            <select
              className="w-full p-2 border border-gray-300 cursor-pointer h-10 text-center"
            >
              <option>Chọn tỉnh / thành</option>
              <option value="HaNoi">Hà Nội</option>
              <option value="unHaNoi">Ngoại thành</option>
            </select>
            {true && <div className="text-red-500 text-sm">Vui lòng chọn địa chỉ!</div>}
            <select
              className="w-full p-2 border border-gray-300 cursor-pointer h-10 text-center"
            >
              <option>Chọn phương thức thanh toán</option>
              <option value="NhanHang">Thanh toán khi nhận hàng</option>
              <option value="ChuyenKhoan">Thanh toán qua ngân hàng</option>
            </select>
            {true && <div className="text-red-500 text-sm">Vui lòng chọn phương thức thanh toán!</div>}
            <button
              type="submit"
              className="w-full p-2 bg-blue-500 text-white cursor-pointer h-10 flex justify-center items-center text-center"
            >
              Thanh toán
            </button>
            <div
              style={{ display: `${false ? 'block' : 'none'}` }}
              className="flex items-center justify-center p-12 bg-green-100 border border-green-200 rounded shadow-md max-w-[300px] mx-auto fixed top-[35%] left-1/2 transform -translate-x-1/2 z-[1002]"
            >
              <div className="text-green-500 text-2xl mr-2 flex justify-center">✔</div>
              <div className="text-gray-600 text-lg">Đã đặt hàng thành công</div>
            </div>
          </form>
        </div>
        <div className="shipping-form-2 h-screen border-l border-gray-300 pl-12 flex items-center">
          <div className="cart-summary w-full">
            <div className="item flex justify-between items-center py-2">
              <img
                src="https://images2.thanhnien.vn/528068263637045248/2024/1/25/e093e9cfc9027d6a142358d24d2ee350-65a11ac2af785880-17061562929701875684912.jpg"
                alt="aa"
                className="w-[65px] h-[65px] shadow-md"
              />
              <div className="item-div bg-gray-500 text-white text-sm w-[20px] h-[20px] flex justify-center items-center mt-[-65px] ml-[-10px]">
                1
              </div>
              <span className="item-span1 w-[300px]">aaaa</span>
              <span className="item-span2 text-lg">0000</span>
            </div>
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
              <span>0000</span>
            </div>
            <div className="shipping-fee flex justify-between py-2">
              <span>Phí vận chuyển</span>
              <span>0000</span>
            </div>
            <div className="grand-total flex justify-between py-2 border-t border-gray-300 mt-3 pt-3">
              <b>Tổng cộng</b>
              <span className="text-red-600 text-2xl">000</span>
            </div>
          </div>
        </div>
      </div>
      {/* end-pay */}

      {/* profile */}
      <div className="profile-container mx-auto mt-12 p-6 bg-white border border-gray-300 rounded-lg max-w-lg">
        <div className="profile-container-out flex justify-between mb-4">
          <h1 className="text-3xl font-bold">Hồ Sơ Của Tôi</h1>
          <div className="profile-container-out-icon cursor-pointer">
            <IoIosCloseCircleOutline />
          </div>
        </div>
        <p className="mb-6 text-gray-600">Quản lý thông tin hồ sơ để bảo mật tài khoản</p>

        {/* Form group with input fields */}
        <div className="form-group flex flex-col mb-4">
          <label htmlFor="name" className="text-sm font-semibold">Tên</label>
          <input
            type="text"
            id="name"
            className="w-full p-3 border border-gray-300 rounded-md h-10"
          />
        </div>

        <div className="form-group flex flex-col mb-4">
          <label htmlFor="email" className="text-sm font-semibold">Email</label>
          <input
            type="email"
            id="email"
            className="w-full p-3 border border-gray-300 rounded-md h-10"
          />
        </div>

        <div className="form-group flex flex-col mb-4">
          <label htmlFor="phone" className="text-sm font-semibold">Số điện thoại</label>
          <input
            type="text"
            id="phone"
            className="w-full p-3 border border-gray-300 rounded-md h-10"
          />
        </div>

        <div className="form-group flex flex-col mb-6">
          <label htmlFor="address" className="text-sm font-semibold">Địa chỉ</label>
          <input
            type="text"
            id="address"
            className="w-full p-3 border border-gray-300 rounded-md h-10"
          />
        </div>

        {/* Button */}
        <button className="save-button w-full py-3 bg-sky-500 text-white rounded-md hover:bg-orange-600 transition-colors duration-300 flex items-center justify-center h-10">
          Lưu
        </button>

        {/* Success message */}
        <div
          style={{ display: `${true ? "block" : "none"}` }}
          className="messAddProduct text-green-500 mt-4 text-center"
        >
          Đã thay đổi thông tin thành công
        </div>
      </div>
      {/* end-profile */}

      {/* myOrder */}
      <div className="profile-container-bot">
        {/* myOrder */}
        {/* {data.orderReducer.orders.some(order => order.idUser === loggedInUser?.id) ? ( */}
        {/* data.orderReducer.orders.filter(order => order.idUser === loggedInUser?.id).map((order: any) => ( */}
        <div className="order-item-all flex justify-center items-center mt-12 mb-[-9]">
          <div className="order-item w-4/5 bg-gray-100 border border-gray-300 rounded-lg p-5 mb-5">
            <div className="order-details flex justify-center items-center mb-5">
              <img src="https://cdn-media.sforum.vn/storage/app/media/wp-content/uploads/2018/11/2-10.png" alt="Product" className="product-image w-[100px] h-[100px] object-cover mr-5 border border-gray-300" />
              <div className="product-info flex-grow">
                <p className="product-name text-lg mb-2">aaaa</p>
                <p className="product-quantity text-gray-600 mb-1">x213</p>
              </div>
              <div className="price-info text-right">
                <span className="discounted-price text-gray-800 text-lg ml-10">0000</span>
              </div>
            </div>

            <div className="order-summary flex items-center justify-end mb-5">
              <span className="total-label font-bold mr-2">Thành tiền:</span>
              <span className="total-price text-orange-500 text-lg">0000</span>
            </div>

            <div className="order-actions flex justify-around items-center mb-[-3]">
              <p className={
                // order.status === 'choDuyet' ? 'text-red-500' :
                //   order.status === 'daDuyet' ? 'text-yellow-500' :
                'text-green-500'
              }>
                {
                  // order.status === 'choDuyet'
                  // ? 'Đơn hàng của bạn đang chờ được duyệt'
                  // : order.status === 'daDuyet'
                  //   ? 'Đơn hàng của bạn đã được duyệt' : 
                  'Đơn hàng đã được giao thành công'}
              </p>
              <button className="contact-seller-button flex py-2 px-4 rounded-md bg-green-500 text-white">Liên Hệ Người Bán</button>
            </div>
          </div>
        </div>
        {/* )) */}
        {/* ) : ( */}
        <div className="order-item-all-not-order mt-20 mb-12 text-red-500">Bạn chưa có đơn đặt hàng nào</div>
        {/* )} */}
      </div>
      <div className='shopping-cart-end'>
        <button className="shopping-cart__continue font-bold py-2 px-4 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors duration-300"
        // onClick={nextToHome} 
        >Tiếp tục mua hàng</button>
      </div>
      {/* end-myOrder */}

      

    </>
  )
}