import React from 'react';
import { useNavigate } from 'react-router-dom';

const PostCard = ({ post }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/posts/${post.id}`);
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Invalid Date';

    if (timestamp._seconds || timestamp.seconds) {
      const seconds = timestamp._seconds || timestamp.seconds;
      return new Date(seconds * 1000).toLocaleDateString('vi-VN');
    }

    return new Date(timestamp).toLocaleDateString('vi-VN');
  };

  const getSourceBadge = (source) => {
    if (source === 'nguoivietraovat') {
      return (
        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded">
          Rao Vặt
        </span>
      );
    } else if (source === 'congdongmy') {
      return (
        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded">
          Cộng Đồng Mỹ
        </span>
      );
    }
    return null;
  };

  // Hàm format address từ object hoặc string
  const formatAddress = () => {
    if (!post.address_info && !post.city && !post.state) return null;

    // Nếu address_info là object
    if (typeof post.address_info === 'object' && post.address_info !== null) {
      const { city, state } = post.address_info;
      if (city && state) return `${city}, ${state}`;
      if (city) return city;
      if (state) return state;
      return null;
    }

    // Nếu address_info là string
    if (typeof post.address_info === 'string') {
      return post.address_info;
    }

    // Fallback: lấy từ city và state riêng lẻ
    if (post.city && post.state) return `${post.city}, ${post.state}`;
    if (post.city) return post.city;
    if (post.state) return post.state;

    return null;
  };

  const displayAddress = formatAddress();

  return (
    <div
      onClick={handleClick}
      className="bg-white border rounded-lg shadow hover:shadow-xl transition cursor-pointer overflow-hidden flex flex-col"
    >
      {/* Image */}
      <div className="relative w-full h-48 bg-gray-200">
        {post.main_photo ? (
          <img
            src={post.main_photo}
            alt={post.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <svg
              className="w-16 h-16"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}

        {/* Source Badge */}
        <div className="absolute top-2 right-2">
          {getSourceBadge(post.source)}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 hover:text-purple-700">
          {post.title}
        </h3>

        {/* Address */}
        {displayAddress && (
          <div className="flex items-start text-sm text-gray-600 mb-2">
            <svg
              className="w-4 h-4 mr-1 mt-0.5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="line-clamp-1">{displayAddress}</span>
          </div>
        )}

        {/* Description */}
        {post.description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {post.description}
          </p>
        )}

        {/* Footer */}
        <div className="mt-auto pt-3 border-t border-gray-200">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span className="flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {formatDate(post.createdAt)}
            </span>

            {post.category && (
              <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded font-semibold">
                {post.category}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;