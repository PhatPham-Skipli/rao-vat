import React, { createContext, useContext, useState, useEffect } from "react";
import { getMyPosts, createRecruitmentPost, getPostDetail } from "../../services/post/postService";

const PostContext = createContext();

export const usePost = () => {
    const context = useContext(PostContext);
    if (!context) {
        throw new Error("usePost must be used within PostProvider");
    }
    return context;
};

export const PostProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState();
    const [category, setCategory] = useState();
    const [postDetail, setPostDetail] = useState(null);

    const fetchPosts = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getMyPosts({
                page: currentPage,
                limit: 10,
                search,
                status,
                category,
            });
            setPosts(Array.isArray(response?.posts) ? response.posts : []);
            setTotal(response?.total || 0);
        } catch (err) {
            setError(err.message || "Lỗi lấy bài viết");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, [currentPage, search, status, category]);

    const createPost = async (postData) => {
        setLoading(true);
        setError(null);
        try {
            const {
                title,
                description,
                category,
                expireDate,
                location,
                contact,
                phone,
                email,
                secondary_phone_number,
                images,
                status,
            } = postData;

            const response = await createRecruitmentPost({
                title,
                description,
                category,
                expireDate,
                location,
                contact,
                phone,
                email,
                secondary_phone_number,
                images,
                status,
            });

            if (response?.success) {
                fetchPosts();
            }
            return response;
        } catch (err) {
            setError(err.message || "Lỗi tạo bài viết");
            return { success: false, message: err.message };
        } finally {
            setLoading(false);
        }
    };

    const fetchPostDetail = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const response = await getPostDetail(id);
            setPostDetail(response?.post || null);
            return response;
        } catch (err) {
            setError(err.message || "Lỗi lấy chi tiết bài viết");
            return { success: false, message: err.message };
        } finally {
            setLoading(false);
        }
    };

    return (
        <PostContext.Provider
            value={{
                posts,
                loading,
                error,
                currentPage,
                total,
                search,
                status,
                category,
                setCurrentPage,
                setSearch,
                setStatus,
                setCategory,
                fetchPosts,
                createPost,
                postDetail,
                fetchPostDetail,
            }}
        >
            {children}
        </PostContext.Provider>
    );
};