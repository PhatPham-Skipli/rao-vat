import React from "react";
import { Eye } from "lucide-react";

const PostShow = ({ post, onView }) => (
  <tr className="border-b border-gray-100 hover:bg-purple-50/40 transition-colors">
    <td className="py-3 px-4 font-medium">{post.title}</td>
    <td className="py-3 px-4">{post.category}</td>
    <td className="py-3 px-4">{post.status ? "Hoạt động" : "Ẩn"}</td>
    <td className="py-3 px-4">
      {post.expireDate && post.expireDate._seconds
        ? new Date(post.expireDate._seconds * 1000).toLocaleDateString()
        : "-"}
    </td>
    <td className="py-3 px-4">
      {post.createdAt && post.createdAt._seconds
        ? new Date(post.createdAt._seconds * 1000).toLocaleDateString()
        : "-"}
    </td>
    <td className="py-3 px-4 flex items-center justify-center">
      <button
        onClick={onView}
        className="text-purple-600 hover:text-purple-800 flex items-center justify-center gap-1 font-medium transition cursor-pointer"
        style={{ width: "32px", height: "32px" }}
      >
        <Eye size={18} />
      </button>
    </td>
  </tr>
);

export default PostShow;