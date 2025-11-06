import React from "react";
import { X } from "lucide-react";

const PostDetailModal = ({ open, onClose, post }) => {
  if (!open || !post) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl flex flex-col z-10 animate-fadeIn border border-gray-200">
        <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-purple-100 rounded-t-2xl">
          <h2 className="text-xl font-bold text-gray-800">Chi tiết bài viết</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-purple-500 text-2xl font-light cursor-pointer"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <span className="font-semibold">Tiêu đề:</span> {post.title}
          </div>
          <div>
            <span className="font-semibold">Mô tả:</span> {post.description}
          </div>
          <div>
            <span className="font-semibold">Danh mục:</span> {post.category}
          </div>
          <div>
            <span className="font-semibold">Ngày hết hạn:</span>{" "}
            {post.expireDate && post.expireDate._seconds
              ? new Date(post.expireDate._seconds * 1000).toLocaleDateString()
              : "-"}
          </div>
          <div>
            <span className="font-semibold">Ngày tạo:</span>{" "}
            {post.createdAt && post.createdAt._seconds
              ? new Date(post.createdAt._seconds * 1000).toLocaleDateString()
              : "-"}
          </div>
          <div>
            <span className="font-semibold">Địa điểm:</span> {post.location}
          </div>
          <div>
            <span className="font-semibold">Số điện thoại:</span> {post.phone}
          </div>
          <div>
            <span className="font-semibold">Email:</span> {post.email}
          </div>
          <div>
            <span className="font-semibold">Số điện thoại phụ:</span> {post.secondary_phone_number}
          </div>
          <div>
            <span className="font-semibold">Trạng thái:</span> {post.status ? "Hoạt động" : "Ẩn"}
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.96) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default PostDetailModal;