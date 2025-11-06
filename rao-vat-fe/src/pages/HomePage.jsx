import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCategory } from '../services/categoryService';
import { useDebounce } from '../hooks/useDebounce';
import CategorySkeleton from '../components/home/CategorySkeleton';

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);
  const debouncedSearch = useDebounce(searchQuery, 500);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, [debouncedSearch]);

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getCategory(debouncedSearch || null);
      // Lấy từ res.data thay vì res?.data
      setCategories(Array.isArray(res?.data) ? res.data : []);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (categoryName) => {
    navigate(`/posts?category=${categoryName}`);
  };

  if (loading) {
    return (
      <div className="w-full">
        <h1 className="text-3xl font-bold text-purple-800 mb-6">Danh mục</h1>
        <CategorySkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-lg text-red-600">Lỗi: {error}</div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold text-purple-800 mb-6">Danh mục</h1>

      {/* Search Bar */}
      <div className="mb-6 relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Tìm kiếm danh mục..."
          className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
        />
        <svg
          className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {categories.length === 0 ? (
        <div className="flex justify-center items-center py-20">
          <div className="text-lg text-gray-600">
            {searchQuery ? 'Không tìm thấy danh mục nào' : 'Chưa có danh mục nào'}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.name)}
              className="bg-white rounded-lg shadow hover:shadow-xl transition cursor-pointer p-6 border-l-4 border-purple-700"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {category.name}
              </h3>
              
              {/* Hiển thị thông tin từ cả 2 nguồn */}
              {/* <div className="space-y-2 text-sm">
                {category.nguoivietraovat && (
                  <div className="text-gray-600">
                    <span className="font-medium">Rao Vặt:</span>
                    <p className="ml-2">{category.nguoivietraovat.vnName}</p>
                    <p className="ml-2 text-xs text-gray-500">
                      ({category.nguoivietraovat.count} bài)
                    </p>
                  </div>
                )}
                
                {category.congdongmy && (
                  <div className="text-gray-600">
                    <span className="font-medium">Cộng Đồng Mỹ:</span>
                    <p className="ml-2">{category.congdongmy.vnName}</p>
                    <p className="ml-2 text-xs text-gray-500">
                      ({category.congdongmy.count} bài)
                    </p>
                  </div>
                )}
              </div> */}

              <div className="mt-4 text-purple-700 font-semibold flex items-center">
                Xem bài đăng
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;