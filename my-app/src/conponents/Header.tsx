import React from "react";

const Header = () => {
  return (
    <header className="bg-white shadow-md py-4  max-w-6xl mx-auto px-6">
      <div className="container mx-auto flex justify-between items-center px-6 max-w-6xl">
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
          <span className="text-2xl font-bold text-[#8976FD]"></span>
        </div>

        <nav className="flex space-x-6">
          <div className="relative group">
            <a href="#" className="text-gray-700 hover:text-[#8976FD]">Home</a>
            <div className="absolute left-0 hidden group-hover:block bg-white shadow-lg rounded-lg mt-2 w-40">
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Submenu 1</a>
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Submenu 2</a>
            </div>
          </div>

          <a href="#" className="text-gray-700 hover:text-[#8976FD]">Services</a>

          <div className="relative group">
            <a href="#" className="text-gray-700 hover:text-[#8976FD]">Download</a>
            <div className="absolute left-0 hidden group-hover:block bg-white shadow-lg rounded-lg mt-2 w-40">
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Windows</a>
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">MacOS</a>
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Linux</a>
            </div>
          </div>

          <div className="relative group">
            <a href="#" className="text-gray-700 hover:text-[#8976FD]">Blog</a>
            <div className="absolute left-0 hidden group-hover:block bg-white shadow-lg rounded-lg mt-2 w-40">
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Tech</a>
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Design</a>
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Marketing</a>
            </div>
          </div>

          <a href="#" className="text-gray-700 hover:text-[#8976FD]">Contact us</a>
        </nav>

        <div className="space-x-4">
          <a href="#" className="px-4 py-2 text-[#8976FD] border-[#8976FD] rounded-lg hover:bg-[#8976FD] hover:text-white">Login</a>
          <a href="#" className="px-4 py-2 bg-[#8976FD] text-white rounded-lg hover:bg-[#7058E3]">Register</a>
        </div>
      </div>
    </header>
  );
};

export default Header;
