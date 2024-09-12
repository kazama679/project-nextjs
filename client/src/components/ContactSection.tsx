import { FaPhoneAlt } from 'react-icons/fa';
import { MdMailOutline } from 'react-icons/md';

export default function ContactSection() {
  return (
    <div className="bg-yellow-400 text-blue-900 p-8 text-center mt-20 flex justify-center gap-44">
      <div className="text-2xl font-bold">NẾU CÓ THẮC MẮC GÌ ĐỪNG NGẦN NGẠI HỎI...</div>
      <div className="flex justify-center items-center gap-10">
        <div className="flex items-center text-2xl">
          <FaPhoneAlt className="mr-2 text-white" />
          <span className="text-blue-900">+83 349 199 812</span>
        </div>
        <button className="flex items-center bg-transparent border border-white text-blue-900 py-2 px-6 rounded-md hover:bg-white hover:text-blue-900 transition duration-300">
          <MdMailOutline className="mr-2" />
          FEEDBACK
        </button>
      </div>
    </div>
  );
}