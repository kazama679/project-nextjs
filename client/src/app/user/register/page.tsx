"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { addUser, getAllUser } from "../../../../store/reducers/userReducer";
import { User } from "@/app/interface/user";

export default function Register() {
  const dispatch = useDispatch();
  const router = useRouter();
  const users = useSelector((state: any) => state.userReducer.users); 

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    checkEmail: false,
    password: false,
    confirmPassword: false,
    phone: false,
    address: false,
  });

  useEffect(() => {
    dispatch(getAllUser()); 
  }, [dispatch]);

  // Hàm kiểm tra tính hợp lệ của form
  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: false,
      email: false,
      checkEmail: false,
      password: false,
      confirmPassword: false,
      phone: false,
      address: false,
    };

    if (!name) {
      newErrors.name = true;
      isValid = false;
    }

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = true;
      isValid = false;
    } else {
      // Kiểm tra xem email có bị trùng không
      const ischeckEmail = users.some((user: User) => user.email === email);
      if (ischeckEmail) {
        newErrors.checkEmail = true;
        isValid = false;
      }
    }

    if (!password || password.length < 6) {
      newErrors.password = true;
      isValid = false;
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = true;
      isValid = false;
    }

    if (!phone || !/^[0-9]{10}$/.test(phone)) {
      newErrors.phone = true;
      isValid = false;
    }

    if (!address) {
      newErrors.address = true;
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Hàm xử lý khi submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    const newUser: User = {
      id: Math.floor(Math.random() * 99999999),
      name,
      email,
      password,
      phone,
      address,
      avatar:
        "https://firebasestorage.googleapis.com/v0/b/xuanquang-14d06.appspot.com/o/ptit-image%2Fdell-xps-15-9530-1.jpg?alt=media&token=89835850-f560-460f-b9aa-a17da3a1d83a", // Mặc định avatar
      status: true, 
      role: false, 
      created_at: new Date().toLocaleDateString("vi-VN"),
      updated_at: new Date().toLocaleDateString("vi-VN"),
      cart: [],
      like: []
    };

    dispatch(addUser(newUser))
      .then(() => {
        router.push("/user/login");
      })
      .catch(() => {
        console.log("Đăng ký không thành công");
      });
  };

  const nextLogin=()=>{
    router.push("/user/login");
  }
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white shadow-lg rounded-lg">
      <form className="flex flex-col items-center w-full max-w-sm" onSubmit={handleSubmit}>
        <h1 className="font-bold text-xl mb-4">Tạo tài khoản</h1>

        <input
          className="input mt-4 p-2 border border-gray-300 rounded w-full"
          type="text"
          placeholder="Tên đăng nhập"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <div className="text-red-500 text-xs mt-2">Tên không được để trống</div>}

        <input
          className="input mt-4 p-2 border border-gray-300 rounded w-full"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <div className="text-red-500 text-xs mt-2">Email không hợp lệ</div>}
        {errors.checkEmail && <div className="text-red-500 text-xs mt-2">Email đã tồn tại</div>}

        <input
          className="input mt-4 p-2 border border-gray-300 rounded w-full"
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <div className="text-red-500 text-xs mt-2">Mật khẩu phải có ít nhất 6 ký tự</div>}

        <input
          className="input mt-4 p-2 border border-gray-300 rounded w-full"
          type="password"
          placeholder="Nhập lại mật khẩu"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {errors.confirmPassword && <div className="text-red-500 text-xs mt-2">Mật khẩu không khớp</div>}

        <input
          className="input mt-4 p-2 border border-gray-300 rounded w-full"
          type="text"
          placeholder="Số điện thoại"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        {errors.phone && <div className="text-red-500 text-xs mt-2">Số điện thoại không hợp lệ</div>}

        <input
          className="input mt-4 p-2 border border-gray-300 rounded w-full"
          type="text"
          placeholder="Địa chỉ"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        {errors.address && <div className="text-red-500 text-xs mt-2">Địa chỉ không được để trống</div>}

        <button
          type="submit"
          className="mt-4 bg-pink-500 text-white rounded-full px-8 py-2 uppercase font-bold hover:bg-pink-600 transition"
        >
          Đăng ký
        </button>
        <div onClick={nextLogin}>bạn có tài khoản rồi?</div>
      </form>
    </div>
  );
}