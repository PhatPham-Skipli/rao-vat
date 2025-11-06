import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useUser } from "../../contexts/user/UserContext";
import { ChevronDown, LogOut, User as UserIcon, FileText } from "lucide-react";

const Header = () => {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" passHref>
          <a className="flex items-center gap-2 hover:opacity-90 transition">
            <span className="text-2xl font-bold text-purple-700 tracking-wide">
              Rao<span className="text-gray-800">Vặt</span>
            </span>
          </a>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" passHref>
            <a className="text-gray-700 font-medium hover:text-purple-700 transition">
              Trang chủ
            </a>
          </Link>
          <Link href="/posts" passHref>
            <a className="text-gray-700 font-medium hover:text-purple-700 transition">
              Bài đăng
            </a>
          </Link>
          <Link href="/contact" passHref>
            <a className="text-gray-700 font-medium hover:text-purple-700 transition">
              Liên hệ
            </a>
          </Link>
        </nav>

        {/* User / Login */}
        <div className="relative" ref={dropdownRef}>
          {user ? (
            <>
              <button
                onClick={() => setOpen((prev) => !prev)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 hover:bg-purple-100 text-purple-800 font-medium transition"
              >
                <UserIcon className="w-5 h-5" />
                <span className="hidden sm:inline">{user.email}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
              </button>

              {/* Dropdown */}
              {open && (
                <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden z-50"
                  style={{ animation: "fadeIn 0.2s" }}>
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm text-gray-500">Đăng nhập với</p>
                    <p className="font-semibold text-purple-800 truncate">{user.email}</p>
                  </div>
                  <Link href="/profile" passHref>
                    <a className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-purple-50 transition">
                      <UserIcon className="w-4 h-4" /> Thông tin cá nhân
                    </a>
                  </Link>
                  <Link href="/my-posts" passHref>
                    <a className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-purple-50 transition">
                      <FileText className="w-4 h-4" /> Bài đăng của tôi
                    </a>
                  </Link>
                  <button
                    className="flex items-center gap-2 w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition"
                    onClick={() => {
                      // TODO: handleLogout();
                      setOpen(false);
                    }}
                  >
                    <LogOut className="w-4 h-4" /> Đăng xuất
                  </button>
                </div>
              )}
            </>
          ) : (
            <Link href="/login" passHref>
              <a className="bg-purple-700 text-white font-semibold px-6 py-2 rounded-full shadow hover:bg-purple-800 transition">
                Đăng nhập
              </a>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;