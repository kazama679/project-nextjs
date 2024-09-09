import React from 'react'

export default function page() {
    return (
        <div className="flex flex-col items-center justify-center p-8 bg-white shadow-lg rounded-lg">
            <form className="flex flex-col items-center w-full max-w-sm"
            //   onSubmit={handleClickSave}
            >
                <h1 className="font-bold text-xl mb-4">Tạo tài khoản</h1>
                <input
                    className="input mt-4 p-2 border border-gray-300 rounded w-full"
                    type="text"
                    placeholder="Tên đăng nhập"
                //   value={name}
                //   onChange={handleChangeName}
                />
                {/* {messName && <div className="text-red-500 text-xs mt-2">Tên đăng nhập không được để trống</div>}
        {messCheckName && <div className="text-red-500 text-xs mt-2">Tên đăng nhập không được phép trùng</div>} */}
                <input
                    className="input mt-4 p-2 border border-gray-300 rounded w-full"
                    type="email"
                    placeholder="Email"
                //   value={email}
                //   onChange={handleChangeEmail}
                />
                {/* {messEmail && <div className="text-red-500 text-xs mt-2">Email không được để trống</div>}
        {messEmailFormat && <div className="text-red-500 text-xs mt-2">Định dạng Email không đúng</div>}
        {messEmailDuplicate && <div className="text-red-500 text-xs mt-2">Email bị trùng</div>} */}
                <input
                    className="input mt-4 p-2 border border-gray-300 rounded w-full"
                    type="password"
                    placeholder="Mật khẩu"
                //   value={pass}
                //   onChange={handleChangePassword}
                />
                <input
                    className="input mt-4 p-2 border border-gray-300 rounded w-full"
                    type="password"
                    placeholder="Nhập lại mật khẩu"
                //   value={pass2}
                //   onChange={handleChangePasswordx2}
                />
                {/* {messPass && <div className="text-red-500 text-xs mt-2">Mật khẩu phải đủ mạnh và không trùng nhau</div>} */}
                <input
                    className="input mt-4 p-2 border border-gray-300 rounded w-full"
                    type="text"
                    placeholder="Số điện thoại"
                //   value={phone}
                //   onChange={handleChangePhone}
                />
                {/* {messPhone && <div className="text-red-500 text-xs mt-2">Số điện thoại không được để trống</div>} */}
                <input
                    className="input mt-4 p-2 border border-gray-300 rounded w-full"
                    type="text"
                    placeholder="Địa chỉ"
                //   value={address}
                //   onChange={handleChangeAddress}
                />
                {/* {messAddress && <div className="text-red-500 text-xs mt-2">Địa chỉ không được để trống</div>} */}
                <button
                    type="submit"
                    className="mt-4 bg-pink-500 text-white rounded-full px-8 py-2 uppercase font-bold hover:bg-pink-600 transition"
                >
                    Đăng ký
                </button>
            </form>
        </div>
    )
}