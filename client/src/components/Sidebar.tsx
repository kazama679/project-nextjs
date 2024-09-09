"use client"; 

import React from 'react';
import { FaProductHunt } from 'react-icons/fa';
import { IoIosLogOut } from 'react-icons/io';
import { MdCategory, MdDashboard, MdOutlineSettingsSuggest } from 'react-icons/md';
import { PiUsersFill } from 'react-icons/pi';
import { RiBillFill } from 'react-icons/ri';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const Sidebar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname(); // Lấy đường dẫn hiện tại

  const handleLogout = () => {
    localStorage.removeItem('admin');
    router.push('/user/login');
  };

  // Hàm để kiểm tra trang hiện tại có được chọn không
  const isActive = (path: string) => pathname === path ? 'text-white' : 'text-gray-400';

  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen p-5">
      <h2 className="text-2xl mb-6">Rikkei Academy</h2>
      <nav>
        <ul className="space-y-4">
          <li>
            <Link href="/admin/dashboard" className={`flex items-center px-4 hover:text-white ${isActive('/admin/dashboard')}`}>
              <MdDashboard className="mr-2 flex-shrink-0" />
              <span className="flex-grow">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link href="/admin/products" className={`flex items-center hover:text-white px-4 ${isActive('/admin/products')}`}>
              <FaProductHunt className="mr-2 flex-shrink-0" />
              <span className="flex-grow">Products</span>
            </Link>
          </li>
          <li>
            <Link href="/admin/orders" className={`flex items-center hover:text-white px-4 ${isActive('/admin/orders')}`}>
              <RiBillFill className="mr-2 flex-shrink-0" />
              <span className="flex-grow">Orders</span>
            </Link>
          </li>
          <li>
            <Link href="/admin/customers" className={`flex items-center hover:text-white px-4 ${isActive('/admin/customers')}`}>
              <PiUsersFill className="mr-2 flex-shrink-0" />
              <span className="flex-grow">Customers</span>
            </Link>
          </li>
          <li>
            <Link href="/admin/category" className={`flex items-center hover:text-white px-4 ${isActive('/admin/category')}`}>
              <MdCategory className="mr-2 flex-shrink-0" />
              <span className="flex-grow">Category</span>
            </Link>
          </li>
          <li>
            <Link href="/admin/setting" className={`flex items-center hover:text-white px-4 ${isActive('/admin/setting')}`}>
              <MdOutlineSettingsSuggest className="mr-2 flex-shrink-0" />
              <span className="flex-grow">Settings</span>
            </Link>
          </li>
          <li className="mt-auto">
            <button
              onClick={handleLogout}
              className="flex items-center text-red-400 hover:text-red-600 px-4"
            >
              <IoIosLogOut className="mr-2 flex-shrink-0" />
              <span className="flex-grow">Log out</span>
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;