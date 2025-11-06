import HomePage from "../pages/HomePage";
import HomeLayout from "../layouts/HomeLayout";
import PostListPage from "../pages/PostListPage";
import PostDetailPage from "../pages/PostDetailPage";

const HomeRoutes = [
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "posts",
        element: <PostListPage />,
      },
      {
        path: "posts/:id",
        element: <PostDetailPage />,
      },
    ],
  },
];

export default HomeRoutes;