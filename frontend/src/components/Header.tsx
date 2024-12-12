import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {
  const { isLoggedIn, userRole, userId } = useAppContext();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: any) => {
    e.preventDefault();
    if (searchQuery) {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  return (
    <nav className="bg-gray-800 shadow-md relative z-10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-white text-2xl font-bold">
          <Link to="/">ShopLogo</Link>
        </div>

        {/* Tìm kiếm sản phẩm */}
        <form onSubmit={handleSearch} className="flex items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm sản phẩm..."
            className="px-4 py-2 rounded-l-md text-gray-700"
          />
          <button
            type="submit"
            className="bg-green-400 text-white px-4 py-2 rounded-r-md hover:bg-green-500"
          >
            Tìm kiếm
          </button>
        </form>

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-8 text-gray-300 font-medium">
          <li>
            <Link to="/" className="hover:text-green-400">
              Trang Chủ
            </Link>
          </li>
          {/* Conditional Rendering for different user roles */}
          {isLoggedIn && userRole == "1" ? (
            <>
              <Link to="/sanpham" className="hover:text-green-400">
                Sản Phẩm
              </Link>
              <li>
                <Link to="/categories" className="hover:text-green-400">
                  Danh Mục
                </Link>
              </li>
              <li>
                <Link to="/quanlydonhang" className="hover:text-green-400">
                  Hóa Đơn
                </Link>
              </li>
              <li>
                <Link to="/store" className="hover:text-green-400">
                  Cửa hàng
                </Link>
              </li>
              <li>
                <SignOutButton />
              </li>
            </>
          ) : isLoggedIn && userRole == "2" ? (
            <>
              <li>
                <Link to="/product" className="hover:text-green-400">
                  Sản Phẩm
                </Link>
              </li>
              <li>
                <Link to="/mydonhang" className="hover:text-green-400">
                  Đơn Hàng Của Tôi
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-green-400">
                  Giỏ Hàng
                </Link>
              </li>
              <li>
                <SignOutButton />
              </li>
            </>
          ) : (
            <li>
              <Link to="/login" className="hover:text-green-400">
                Đăng nhập
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
