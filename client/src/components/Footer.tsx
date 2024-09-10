import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGoogle, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  return (
    <>
      <div className="bg-gray-900 text-white p-10 flex flex-wrap justify-between gap-10 py-20 px-40">
        <div className="flex-1 min-w-[200px]">
          <h4 className="text-lg font-bold mb-4 text-purple-500">MOTORS <span className="text-white">WORDPRESS THEME</span></h4>
          <p className="text-gray-400">
            Fusce interdum ipsum egestas urna amet fringilla, et placerat ex venenatis. Aliquet luctus pharetra.
            Proin sed fringilla lectus... Proin nec egestas nibh, eget egestas urna.
          </p>
        </div>
        <div className="flex-1 min-w-[200px]">
          <h4 className="text-lg font-bold mb-4">PHOTO GALLERY</h4>
          <div className="grid grid-cols-3 gap-2">
            <img src="https://hoanghamobile.com/Uploads/2024/04/25/laptop-gaming-11.jpg" alt="Gallery 1" className="w-16 h-16 object-cover" />
            <img src="https://laptopaz.vn/media/news/2109_co-su-dung-laptop-choi-game-de-lam-do-hoa-duoc-khong-4.jpg" alt="Gallery 2" className="w-16 h-16 object-cover" />
            <img src="https://file.hstatic.net/1000026716/file/laptop-gaming-1_ab19abe37d5540cf8e40c0dd5839923a.jpg" alt="Gallery 3" className="w-16 h-16 object-cover" />
          </div>
        </div>
        <div className="flex-1 min-w-[200px]">
          <h4 className="text-lg font-bold mb-4">LATEST BLOG POSTS</h4>
          <p className="text-gray-400">
            Cras condimentum a elit eget sagittis. Ut dignissim sapien feugiat purus tristique, vitae...
          </p>
          <p className="text-purple-400 mt-2">NO COMMENTS</p>
        </div>
        <div className="flex-1 min-w-[200px]">
          <h4 className="text-lg font-bold mb-4">SOCIAL NETWORK</h4>
          <div className="flex gap-4">
            <FaFacebook className="text-gray-400 hover:text-white" />
            <FaTwitter className="text-gray-400 hover:text-white" />
            <FaInstagram className="text-gray-400 hover:text-white" />
            <FaGoogle className="text-gray-400 hover:text-white" />
            <FaYoutube className="text-gray-400 hover:text-white" />
          </div>
        </div>
      </div>
      <div className="bg-gray-800 text-gray-400 p-5 flex justify-between items-center px-40">
        <p>Copyright © 2021. Motors - WordPress Theme by StylemixThemes</p>
        <div className="flex gap-4">
          <FaFacebook className="hover:text-purple-500" />
          <FaTwitter className="hover:text-purple-500" />
          <FaInstagram className="hover:text-purple-500" />
          <FaLinkedin className="hover:text-purple-500" />
        </div>
      </div>
    </>
  );
}