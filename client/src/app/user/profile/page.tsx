import React from 'react'

export default function page() {
  return (
    <div>
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
    </div>
  )
}
