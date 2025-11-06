import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Postlist from '../components/PostList/Postlist';
import { PostListProvider, usePostList } from '../contexts/PostListContext';

const PostListPageContent = () => {
  const [searchParams] = useSearchParams();
  const { setSelectedCategory, selectedCategory } = usePostList();

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setSelectedCategory(category);
    }
  }, [searchParams]);

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold text-purple-800 mb-6">
        {selectedCategory ? `Danh mục: ${selectedCategory}` : 'Danh sách bài đăng'}
      </h1>
      {selectedCategory ? (
        <Postlist />
      ) : (
        <div className="text-center text-gray-500 py-20">
          Vui lòng chọn danh mục từ trang chủ.
        </div>
      )}
    </div>
  );
};

const PostListPage = () => {
  return (
    <PostListProvider>
      <PostListPageContent />
    </PostListProvider>
  );
};

export default PostListPage;