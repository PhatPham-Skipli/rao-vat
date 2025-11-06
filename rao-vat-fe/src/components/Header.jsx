import React from "react";

const Header = () => {
  return (
    <header className="bg-[#fcf8f2] border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <a href="/" className="flex items-center gap-2 hover:opacity-90 transition">
            <span className="text-2xl font-bold text-purple-800 tracking-wide cursor-pointer">
              Rao Vặt
            </span>
          </a>
        </div>
        <nav className="flex items-center gap-8">
          <a href="/" className="text-gray-700 font-medium hover:text-purple-700 transition">
            Trang chủ
          </a>
        </nav>
        <div>
          <a
            href="/login"
            className="bg-purple-700 text-white font-semibold px-6 py-2 rounded-full shadow hover:bg-purple-800 transition"
          >
            Đăng nhập
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;