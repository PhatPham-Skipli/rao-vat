import { PostProvider } from "../../contexts/my-posts/PostContext";
import PostList from "../../components/my-posts/PostList";
import CreateButton from "../../components/ui/CreateButton";
import PostCreateModal from "../../components/my-posts/PostCreateModal";

const MyPostsPage = () => (
  <PostProvider>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          📝 Bài đăng của tôi
        </h1>
        <CreateButton modalContent={({ open, onClose }) => (
          <PostCreateModal open={open} onClose={onClose} />
        )}>
          Tạo bài viết mới
        </CreateButton>
      </div>
      <PostList />
    </div>
  </PostProvider>
);

export default MyPostsPage;