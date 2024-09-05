"use client";
import React, { useState } from 'react';
import { FaFacebook, FaTelegram } from 'react-icons/fa';
import { TiSocialGooglePlus } from 'react-icons/ti';
import { useRouter } from 'next/navigation'; 

type User = {
    id: number;
    name: string;
    email: string;
    status: boolean;
    password: string;
    role: boolean;
    avatar: string;
    phone: string;
    address: string;
    created_at: string;
    updated_at: string;
};

export default function Login() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [messLogin, setMessLogin] = useState<boolean>(false);
    const [messLogin2, setMessLogin2] = useState<boolean>(false);
    const [messLogin3, setMessLogin3] = useState<boolean>(false);
    const [messLogin4, setMessLogin4] = useState<boolean>(false);
    const router = useRouter(); // Hook để điều hướng trong Next.js

    // Lưu dữ liệu người dùng nhập email
    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    // Lưu dữ liệu người dùng nhập password
    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    // Xử lý đăng nhập
    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (email === '' || password === '') {
            setMessLogin2(true); // Hiển thị thông báo nếu email hoặc mật khẩu để trống
            setMessLogin(false);
            setMessLogin3(false);
            setMessLogin4(false);
        } else {
            const user = users.find((user) => user.email === email && user.password === password);
            if (user) {
                if (!user.status) { // Kiểm tra nếu tài khoản bị chặn
                    setMessLogin3(true); // Hiển thị thông báo tài khoản bị chặn
                    setMessLogin(false);
                    setMessLogin2(false);
                    setMessLogin4(false);
                } else {
                    setMessLogin4(true); // Đăng nhập thành công
                    setMessLogin(false);
                    setMessLogin2(false);
                    setMessLogin3(false);
                    if (user.role) { // Kiểm tra vai trò của người dùng
                        router.push('/admin/dashboard'); // Chuyển hướng đến trang quản trị
                    } else {
                        router.push('/'); // Chuyển hướng đến trang người dùng
                    }
                }
            } else {
                setMessLogin(true); // Hiển thị thông báo sai email hoặc mật khẩu
                setMessLogin2(false);
                setMessLogin3(false);
                setMessLogin4(false);
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center p-8 bg-white shadow-lg rounded-lg">
            <form className="flex flex-col items-center w-full max-w-sm" onSubmit={handleLogin}>
                <h1 className="font-bold text-xl mb-4">Đăng nhập</h1>
                <div className="flex space-x-4 mb-4">
                    <a href="https://www.facebook.com/" className="flex items-center justify-center h-10 w-10 bg-white border border-gray-200 rounded-full text-blue-500">
                        <FaFacebook />
                    </a>
                    <a href="https://myaccount.google.com/" className="flex items-center justify-center h-10 w-10 bg-white border border-gray-200 rounded-full text-red-500">
                        <TiSocialGooglePlus />
                    </a>
                    <a href="https://web.telegram.org/" className="flex items-center justify-center h-10 w-10 bg-white border border-gray-200 rounded-full text-blue-400">
                        <FaTelegram />
                    </a>
                </div>
                <input
                    className="mt-4 p-2 border border-gray-300 rounded w-full"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleChangeEmail}
                />
                <input
                    className="mt-2 p-2 border border-gray-300 rounded w-full"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handleChangePassword}
                />
                {messLogin && <div className="text-red-500 text-xs mt-2">Tài khoản hoặc mật khẩu không chính xác</div>}
                {messLogin2 && <div className="text-red-500 text-xs mt-2">Tài khoản và mật khẩu không được để trống</div>}
                {messLogin3 && <div className="text-red-500 text-xs mt-2">Tài khoản đã bị chặn, vui lòng dùng tài khoản khác!</div>}
                <a href="#" className="text-blue-500 text-sm mt-4">Bạn quên mật khẩu?</a>
                <button type="submit" className="mt-4 bg-pink-500 text-white rounded-full px-8 py-2 uppercase font-bold hover:bg-pink-600 transition">Đăng nhập</button>
                {messLogin4 && <div className="text-green-500 text-xs mt-2">Đã đăng nhập tài khoản thành công</div>}
            </form>
        </div>
    );
}
