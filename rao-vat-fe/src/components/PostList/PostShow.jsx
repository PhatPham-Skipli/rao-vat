import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostById } from '../../services/postService';
import { revealContact, getRevealedPosts } from '../../services/revealService';
import useDeviceId from '../../hooks/useDeviceId';
import PostShowSkeleton from './PostShowSkeleton';

const PostShow = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const deviceId = useDeviceId();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [revealed, setRevealed] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [canReveal, setCanReveal] = useState(true);

  const formatAddress = () => {
    if (!post.address_info && !post.city && !post.state) return null;

    if (typeof post.address_info === 'object' && post.address_info !== null) {
      const { city, state } = post.address_info;
      if (city && state) return `${city}, ${state}`;
      if (city) return city;
      if (state) return state;
      return null;
    }

    if (typeof post.address_info === 'string') {
      return post.address_info;
    }

    // Fallback
    if (post.city && post.state) return `${post.city}, ${post.state}`;
    if (post.city) return post.city;
    if (post.state) return post.state;

    return null;
  };

  useEffect(() => {
    fetchPostDetail();
  }, [id]);

  useEffect(() => {
    if (deviceId) {
      checkRevealedStatus();
    }
  }, [deviceId, id]);

  const checkRevealedStatus = async () => {
    try {
      const response = await getRevealedPosts(deviceId);
      if (response?.success) {
        const isRevealed = response.data.posts.includes(id);
        setRevealed(isRevealed);
        setCanReveal(response.data.canReveal);

        if (!response.data.canReveal) {
          setCooldown(response.data.timeToReset);
          if (response.data.timeToReset > 0) {
            const interval = setInterval(() => {
              setCooldown((prev) => {
                if (prev <= 1) {
                  clearInterval(interval);
                  setCanReveal(true);
                  return 0;
                }
                return prev - 1;
              });
            }, 1000);
          }
        }
      }
    } catch (err) {
      console.error('Error checking revealed status:', err);
    }
  };

  const handleReveal = async () => {
    if (revealed || !canReveal) return;

    try {
      const response = await revealContact(deviceId, id);
      if (response?.success) {
        setRevealed(true);
        setCanReveal(response.data.canReveal);

        if (!response.data.canReveal) {
          setCooldown(response.data.timeToReset);
          const interval = setInterval(() => {
            setCooldown((prev) => {
              if (prev <= 1) {
                clearInterval(interval);
                setCanReveal(true);
                return 0;
              }
              return prev - 1;
            });
          }, 1000);
        }
      }
    } catch (err) {
      console.error('Error revealing contact:', err);
    }
  };

  const fetchPostDetail = async () => {
    setLoading(true);
    try {
      const response = await getPostById(id);
      if (response?.success) {
        setPost(response.data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Invalid Date';

    if (timestamp._seconds || timestamp.seconds) {
      const seconds = timestamp._seconds || timestamp.seconds;
      return new Date(seconds * 1000).toLocaleDateString('vi-VN');
    }

    return new Date(timestamp).toLocaleDateString('vi-VN');
  };

  if (loading) {
    return <PostShowSkeleton />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-lg text-red-600">Lỗi: {error}</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-lg text-gray-600">Không tìm thấy bài đăng</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition"
      >
        ← Quay lại
      </button>

      <div className="bg-white rounded-lg shadow-lg p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-3xl font-bold text-gray-800 flex-1">{post.title}</h1>
          <span className="ml-4 px-4 py-2 bg-purple-700 text-white rounded-full text-sm">
            {post.category}
          </span>
        </div>

        {/* Image Gallery */}
        {post.photos && post.photos.length > 0 && (
          <div className="mb-6">
            <img
              src={post.photos[currentImageIndex]}
              alt={`${post.title} - ${currentImageIndex + 1}`}
              className="w-full max-h-96 object-contain rounded-lg mb-4"
            />
            {post.photos.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {post.photos.map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt={`Thumbnail ${index + 1}`}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-20 h-20 object-cover rounded cursor-pointer border-2 transition ${index === currentImageIndex
                        ? 'border-purple-700'
                        : 'border-gray-300 hover:border-purple-400'
                      }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Description */}
        <div className="mb-6 pb-6 border-b">
          <h2 className="text-xl font-semibold text-purple-800 mb-3">Mô tả</h2>
          <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
            {post.description}
          </p>
        </div>

        {/* Address */}
        {formatAddress() && (
          <div className="mb-6 pb-6 border-b">
            <h2 className="text-xl font-semibold text-purple-800 mb-3">Địa chỉ</h2>
            <p className="text-gray-700">📍 {formatAddress()}</p>
          </div>
        )}

        {/* Contact Info */}
        <div className="mb-6 pb-6 border-b">
          <h2 className="text-xl font-semibold text-purple-800 mb-3">Thông tin liên hệ</h2>
          <div className="space-y-2">
            {(post.contact_info?.phone || post.contact_info?.secondary_phone_number || post.contact_info?.email) ? (
              <>
                {!revealed ? (
                  <div>
                    <div
                      className="inline-block px-4 py-2 bg-gray-200 text-gray-500 rounded select-none"
                      style={{ filter: 'blur(6px)' }}
                    >
                      {post.contact_info?.phone || '***-***-****'} {post.contact_info?.secondary_phone_number ? `- ${post.contact_info.secondary_phone_number}` : ''} {post.contact_info?.email ? `- ${post.contact_info.email}` : ''}
                    </div>
                    <button
                      onClick={handleReveal}
                      disabled={!canReveal}
                      className="ml-4 px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {cooldown > 0 ? `Vui lòng chờ ${cooldown}s` : 'Nhấn để xem thông tin'}
                    </button>
                    {cooldown > 0 && (
                      <div className="text-red-500 mt-2 text-sm">
                        Đã vượt quá 3 lần xem liên tiếp. Vui lòng chờ {cooldown}s để tiếp tục.
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    {post.contact_info?.phone && (
                      <p className="text-gray-700">
                        📞 Điện thoại:{' '}
                        <a
                          href={`tel:${post.contact_info.phone}`}
                          className="text-purple-700 hover:underline font-semibold"
                        >
                          {post.contact_info.phone}
                        </a>
                      </p>
                    )}
                    {post.contact_info?.secondary_phone_number && (
                      <p className="text-gray-700">
                        📞 Điện thoại phụ:{' '}
                        <a
                          href={`tel:${post.contact_info.secondary_phone_number}`}
                          className="text-purple-700 hover:underline font-semibold"
                        >
                          {post.contact_info.secondary_phone_number}
                        </a>
                      </p>
                    )}
                    {post.contact_info?.email && (
                      <p className="text-gray-700">
                        ✉️ Email:{' '}
                        <a
                          href={`mailto:${post.contact_info.email}`}
                          className="text-purple-700 hover:underline font-semibold"
                        >
                          {post.contact_info.email}
                        </a>
                      </p>
                    )}
                  </div>
                )}
              </>
            ) : (
              <p className="text-gray-500">Không có thông tin liên hệ</p>
            )}
          </div>
        </div>

        {/* Post Info */}
        <div>
          <h2 className="text-xl font-semibold text-purple-800 mb-3">Thông tin đăng tin</h2>
          <div className="space-y-1 text-gray-600">
            <p>Ngày đăng: {formatDate(post.createdAt)}</p>
            <p>ID: {post.id}</p>
            {post.postUrl && (
              <p>
                <a
                  href={post.postUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-700 hover:underline"
                >
                  Xem bài gốc →
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostShow;