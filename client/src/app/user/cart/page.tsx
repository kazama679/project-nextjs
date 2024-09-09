import React from 'react'

export default function page() {
  return (
    <div>
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
    </div>
  )
}