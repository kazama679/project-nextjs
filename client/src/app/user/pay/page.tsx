import React from 'react'

export default function page() {
  return (
    <div>
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
    </div>
  )
}
