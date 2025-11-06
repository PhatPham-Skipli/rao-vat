import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import ChatBox from '../components/ChatBox';
import { getCategory } from '../services/categoryService';
import { useDebounce } from '../hooks/useDebounce';
import { getCategoryServer } from '../services/categoryService';

const CategorySkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {[...Array(6)].map((_, idx) => (
      <div key={idx} className="bg-white rounded shadow p-4">
        <div className="h-8 w-3/5 bg-gray-200 animate-pulse mb-2 rounded"></div>
        <div className="h-6 w-2/5 bg-gray-200 animate-pulse rounded"></div>
      </div>
    ))}
  </div>
);

export default function HomePage({ initialCategories, title, description }) {
  const [categories, setCategories] = useState(initialCategories);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);
  const debouncedSearch = useDebounce(searchQuery, 500);
  const router = useRouter();

  useEffect(() => {
    if (debouncedSearch) {
      fetchCategories();
    } else {
      setCategories(initialCategories);
    }
    // eslint-disable-next-line
  }, [debouncedSearch]);

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getCategory(debouncedSearch || null);
      setCategories(Array.isArray(res?.data) ? res.data : (Array.isArray(res) ? res : []));
    } catch (err) {
      setError(err.message);
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (categoryName) => {
    router.push(`/posts?category=${categoryName}`);
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Danh mục</h1>
        <CategorySkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto py-8 px-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Lỗi: {error}
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="max-w-6xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Danh mục</h1>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Tìm kiếm danh mục..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
          </div>
        </div>

        {categories.length === 0 ? (
          <div className="flex justify-center items-center py-20">
            <span className="text-lg text-gray-500">
              {searchQuery ? 'Không tìm thấy danh mục nào' : 'Chưa có danh mục nào'}
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <div
                key={category.id}
                className="bg-white rounded-lg shadow border-l-8 border-blue-500 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer h-full flex flex-col"
                onClick={() => handleCategoryClick(category.name)}
              >
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                  <div className="flex items-center text-blue-600 font-semibold mt-4">
                    Xem bài đăng
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <ChatBox />
    </>
  );
}

export async function getServerSideProps() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';
    const data = await getCategoryServer(baseUrl);

    return {
      props: {
        initialCategories: Array.isArray(data) ? data : [],
        title: 'Danh mục Rao Vặt',
        description: 'Khám phá các danh mục rao vặt từ cộng đồng người Việt tại Mỹ',
      },
    };
  } catch (error) {
    return {
      props: {
        initialCategories: [],
        title: 'Danh mục Rao Vặt',
        description: 'Khám phá các danh mục rao vặt từ cộng đồng người Việt tại Mỹ',
      },
    };
  }
}