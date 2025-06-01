import { FaFacebook, FaHome, FaInstagram, FaLocationArrow, FaYoutubeSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-purple-100 py-10 px-6 md:px-12 lg:px-24 text-gray-800 text-sm">
      <div className="container grid grid-cols-1 md:grid-cols-4 gap-8 text-left max-w-6xl mx-auto px-6">
        <div className="space-y-4">
          <img src="/logo2.png" alt="MMOLogin Logo" className="w-40" />
          <p className="text-gray-700">MMOLogin Solutions Company Limited</p>
          <p className="text-gray-600">
            <FaHome/> SAV5, 28 Mai Chí Thọ, P. An Phú, TP. Thủ Đức, Hồ Chí Minh, Việt Nam 700000.
          </p>
          <p className="text-gray-600">MST: 0317710018</p>
          <div className="flex space-x-3">
            <a href="#" className="text-gray-600 hover:text-gray-900">
              <FaFacebook/>
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
            <FaYoutubeSquare/>
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
            <FaInstagram/>
            </a>
          </div>
          <p className="text-gray-600"> English</p>
        </div>

        <div className="text-left">
          <h3 className="font-semibold text-gray-900">Ecosystem</h3>
          <ul className="mt-4 space-y-2 text-gray-700">
            <li><a href="#">Social Software</a></li>
            <li><a href="#">Anti-Detect Platform</a></li>
            <li><a href="#">Social Marketing Media</a></li>
            <li><a href="#">Omni Channel Ecommerce</a></li>
            <li><a href="#">Payment Platform</a></li>
          </ul>
        </div>

        <div className="text-left">
          <h3 className="font-semibold text-gray-900">Company</h3>
          <ul className="mt-4 space-y-2 text-gray-700">
            <li><a href="#">About Us</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">User Guide</a></li>
            <li><a href="#">Terms Of Services</a></li>
            <li><a href="#">Legal Policy</a></li>
          </ul>
        </div>

        <div className="text-left">
          <h3 className="font-semibold text-gray-900">SUBSCRIBE OUR NEWSLETTER</h3>
          <div className="mt-4 flex items-center border-b border-gray-400">
            <input
              type="email"
              placeholder="Email Address"
              className="w-full py-2 bg-transparent focus:outline-none text-gray-700"
            />
            <button className="text-gray-700 hover:text-gray-900">
            <FaLocationArrow/>
            </button>
          </div>
          <p className="mt-4 font-semibold text-gray-900 text-xl" >MMOLogin Solutions Company Limited</p>
          <p className="text-gray-600 ">© 2021-2023 MMOLogin Solution Co., LTD. All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
