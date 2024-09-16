"use client";
import React, { useEffect, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { getAllUser, updateUser } from "../../../../store/reducers/userReducer";
import { useRouter } from "next/navigation";

export default function Profile() {
  const [userLocal, setUserLocal] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    oldPassword: "", 
    password: "", 
  });

  const dispatch = useDispatch();
  const router = useRouter();
  const users = useSelector((state: any) => state.userReducer.users);

  useEffect(() => {
    dispatch(getAllUser());
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserLocal(user);
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        oldPassword: "", 
        password: "",
      });
    }
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    if (!userLocal) return;
    if (formData.password && formData.oldPassword !== userLocal.password) {
      alert("Mật khẩu cũ không đúng");
      return;
    }
    const updatedUser = {
      ...userLocal,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      ...(formData.password && { password: formData.password }),
    };

    dispatch(updateUser(updatedUser)).then(() => {
      alert("Thông tin đã được cập nhật thành công");

      if (formData.password) {
        localStorage.removeItem("user");
        router.push("/login");
      } else {
        localStorage.setItem("user", JSON.stringify(updatedUser));
        router.push("/");
      }
    });
  };

  return (
    <div>
      <div className="profile-container mx-auto mt-12 p-6 bg-white border border-gray-300 rounded-lg max-w-lg">
        <div className="profile-container-out flex justify-between mb-4">
          <h1 className="text-3xl font-bold">Hồ Sơ Của Tôi</h1>
          <div className="profile-container-out-icon cursor-pointer">
            <IoIosCloseCircleOutline />
          </div>
        </div>
        <p className="mb-6 text-gray-600">
          Quản lý thông tin hồ sơ để bảo mật tài khoản
        </p>

        <div className="form-group flex flex-col mb-4">
          <label htmlFor="name" className="text-sm font-semibold">Tên</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md h-10"
          />
        </div>

        <div className="form-group flex flex-col mb-4">
          <label htmlFor="email" className="text-sm font-semibold">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md h-10"
          />
        </div>

        <div className="form-group flex flex-col mb-4">
          <label htmlFor="phone" className="text-sm font-semibold">Số điện thoại</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md h-10"
          />
        </div>

        <div className="form-group flex flex-col mb-4">
          <label htmlFor="oldPassword" className="text-sm font-semibold">Mật khẩu cũ</label>
          <input
            type="password"
            id="oldPassword"
            name="oldPassword"
            value={formData.oldPassword}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md h-10"
            placeholder="Nhập mật khẩu cũ"
          />
        </div>

        <div className="form-group flex flex-col mb-4">
          <label htmlFor="password" className="text-sm font-semibold">Mật khẩu mới</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md h-10"
            placeholder="Nhập mật khẩu mới (nếu muốn thay đổi)"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="save-button w-full py-3 bg-sky-500 text-white rounded-md hover:bg-orange-600 transition-colors duration-300 flex items-center justify-center h-10"
        >
          Lưu
        </button>
      </div>
    </div>
  );
}