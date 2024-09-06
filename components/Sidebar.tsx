"use client"; 

import React from 'react';
import { FaProductHunt } from 'react-icons/fa';
import { IoIosLogOut } from 'react-icons/io';
import { MdCategory, MdDashboard, MdOutlineSettingsSuggest } from 'react-icons/md';
import { PiUsersFill } from 'react-icons/pi';
import { RiBillFill } from 'react-icons/ri';
import { useRouter } from 'next/navigation';

const Sidebar: React.FC = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('admin');
    router.push('/user/login');
  };

  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen p-5">
      <h2 className="text-2xl mb-6">Rikkei Academy</h2>
      <nav>
        <ul className="space-y-4">
          <li>
            <a href="/admin/dashboard" className="flex items-center px-4 text-gray-400 hover:text-white">
              <MdDashboard className="mr-2 flex-shrink-0" />
              <span className="flex-grow">Dashboard</span>
            </a>
          </li>
          <li>
            <a href="/admin/products" className="flex items-center hover:text-white px-4 text-gray-400">
              <FaProductHunt className="mr-2 flex-shrink-0" />
              <span className="flex-grow">Products</span>
            </a>
          </li>
          <li>
            <a href="/admin/orders" className="flex items-center text-gray-400 hover:text-white px-4">
              <RiBillFill className="mr-2 flex-shrink-0" />
              <span className="flex-grow">Orders</span>
            </a>
          </li>
          <li>
            <a href="/admin/customers" className="flex items-center text-gray-400 hover:text-white px-4">
              <PiUsersFill className="mr-2 flex-shrink-0" />
              <span className="flex-grow">Customers</span>
            </a>
          </li>
          <li>
            <a href="/admin/category" className="flex items-center text-gray-400 hover:text-white px-4">
              <MdCategory className="mr-2 flex-shrink-0" />
              <span className="flex-grow">Category</span>
            </a>
          </li>
          <li>
            <a href="/admin/setting" className="flex items-center text-gray-400 hover:text-white px-4">
              <MdOutlineSettingsSuggest className="mr-2 flex-shrink-0" />
              <span className="flex-grow">Settings</span>
            </a>
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