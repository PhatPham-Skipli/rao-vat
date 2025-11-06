import React, { useState } from "react";
import { usePost } from "../../contexts/my-posts/PostContext";
import PostTableSkeleton from "./PostTableSkeleton";
import PostShow from "./PostShow";
import PostDetailModal from "./PostDetailModal";

const PostList = () => {
  const { posts, loading, fetchPostDetail, postDetail } = usePost();
  const [openDetail, setOpenDetail] = useState(false);

  const handleView = async (id) => {
    await fetchPostDetail(id);
    setOpenDetail(true);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-gray-800">
          <thead className="bg-gray-50 text-gray-700 uppercase text-xs font-semibold">
            <tr>
              <th className="py-3 px-4 text-left">Tiêu đề</th>
              <th className="py-3 px-4 text-left">Danh mục</th>
              <th className="py-3 px-4 text-left">Trạng thái</th>
              <th className="py-3 px-4 text-left">Ngày hết hạn</th>
              <th className="py-3 px-4 text-left">Ngày tạo</th>
              <th className="py-3 px-4 text-right">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 6 }).map((_, idx) => (
                <PostTableSkeleton key={idx} />
              ))
            ) : posts.length > 0 ? (
              posts.map((post) => (
                <PostShow key={post.id} post={post} onView={() => handleView(post.id)} />
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-8 text-gray-400">
                  Không có bài viết nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <PostDetailModal
        open={openDetail}
        onClose={() => setOpenDetail(false)}
        post={postDetail}
      />
    </div>
  );
};

export default PostList;