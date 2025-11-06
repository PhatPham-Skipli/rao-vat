import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { usePost } from "../../contexts/my-posts/PostContext";
import { getCategory } from "../../services/categoryService";

const PostCreateModal = ({ open, onClose }) => {
  const { createPost } = usePost();
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    expireDate: "",
    location: "",
    contact_info: {
      phone: "",
      email: "",
      secondary_phone_number: "",
    },

    images: [],
    status: true,
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [catLoading, setCatLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      setCatLoading(true);
      try {
        const data = await getCategory();
        setCategories(data);
      } catch (err) {
        setCategories([]);
      } finally {
        setCatLoading(false);
      }
    };
    if (open) {
      fetchCategories();
    }
  }, [open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["phone", "email", "secondary_phone_number"].includes(name)) {
      setForm((prev) => ({
        ...prev,
        contact_info: {
          ...prev.contact_info,
          [name]: value,
        },
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit form");
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await createPost(form);
      if (res?.success) {
        setSuccess("Tạo bài viết thành công!");
        setTimeout(() => {
          onClose();
        }, 1000);
      } else {
        setError(res?.message || "Có lỗi xảy ra!");
      }
    } catch (err) {
      setError(err?.message || "Có lỗi xảy ra!");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal container */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl flex flex-col z-10 animate-fadeIn max-h-[90vh] border border-gray-200">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-purple-100 rounded-t-3xl">
          <h2 className="text-2xl font-bold text-gray-800">Tạo bài viết mới</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-purple-500 text-3xl font-light cursor-pointer"
          >
            <X size={28} />
          </button>
        </div>

        {/* Body chỉ phần này scroll + Footer nằm trong form */}
        <form className="flex-1 overflow-y-auto p-6 space-y-5" style={{ maxHeight: "60vh" }} onSubmit={handleSubmit}>
          {error && <div className="text-red-600">{error}</div>}
          {success && <div className="text-green-600">{success}</div>}
          <div>
            <label className="block mb-1 font-medium">Tiêu đề <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="title"
              className="w-full border border-gray-200 rounded-xl px-3 py-2"
              value={form.title}
              onChange={handleChange}
              required
              placeholder="Nhập tiêu đề bài viết"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Mô tả <span className="text-red-500">*</span></label>
            <textarea
              name="description"
              className="w-full border border-gray-200 rounded-xl px-3 py-2"
              value={form.description}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Nhập mô tả chi tiết"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Danh mục <span className="text-red-500">*</span></label>
            <select
              name="category"
              className="w-full border border-gray-200 rounded-xl px-3 py-2"
              value={form.category}
              onChange={handleChange}
              required
              disabled={catLoading}
            >
              <option value="">Chọn danh mục</option>
              {categories.map((cat) => (
                <option key={cat.id || cat._id || cat.name} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">Ngày hết hạn <span className="text-red-500">*</span></label>
            <input
              type="date"
              name="expireDate"
              className="w-full border border-gray-200 rounded-xl px-3 py-2"
              value={form.expireDate}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Địa điểm</label>
            <input
              type="text"
              name="location"
              className="w-full border border-gray-200 rounded-xl px-3 py-2"
              value={form.location}
              onChange={handleChange}
              placeholder="Nhập địa điểm"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Số điện thoại</label>
            <input
              type="text"
              name="phone"
              className="w-full border border-gray-200 rounded-xl px-3 py-2"
              value={form.contact_info.phone}
              onChange={handleChange}
              placeholder="Nhập số điện thoại"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              className="w-full border border-gray-200 rounded-xl px-3 py-2"
              value={form.contact_info
                .email}
              onChange={handleChange}
              placeholder="Nhập email"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Số điện thoại phụ</label>
            <input
              type="text"
              name="secondary_phone_number"
              className="w-full border border-gray-200 rounded-xl px-3 py-2"
              value={form.contact_info.secondary_phone_number}
              onChange={handleChange}
              placeholder="Nhập số điện thoại phụ"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Trạng thái</label>
            <select
              name="status"
              className="w-full border border-gray-200 rounded-xl px-3 py-2"
              value={form.status ? "active" : "inactive"}
              onChange={(e) => setForm({ ...form, status: e.target.value === "active" })}
            >
              <option value="active">Hoạt động</option>
              <option value="inactive">Ẩn</option>
            </select>
          </div>
          {/* Footer nằm trong form */}
          <div className="flex gap-2 justify-end pt-2 p-6 border-t border-gray-100 bg-gray-50 rounded-b-3xl">
            <button
              type="button"
              className="px-5 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 font-medium transition cursor-pointer"
              onClick={onClose}
            >
              Đóng
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg font-medium text-white cursor-pointer shadow-md transition-all duration-200 bg-purple-600 hover:bg-purple-700"
              disabled={loading}
            >
              {loading ? "Đang tạo..." : "Tạo mới"}
            </button>
          </div>
        </form>

        {/* Animation */}
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
    </div>
  );
};

export default PostCreateModal;