import React, { createContext, useContext, useState, useEffect } from 'react';
import { getPosts } from '../services/postService';
import { useDebounce } from '../hooks/useDebounce';
import { useRouter } from 'next/router';

const PostListContext = createContext();

export const usePostList = () => {
    const context = useContext(PostListContext);
    if (!context) {
        throw new Error('usePostList must be used within PostListProvider');
    }
    return context;
};

export const PostListProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('newest');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedState, setSelectedState] = useState(null);
    const debouncedSearch = useDebounce(searchQuery, 500);
    const router = useRouter();

    const limit = 12;

    useEffect(() => {
        if (selectedCategory) {
            fetchPosts();
        }
    }, [selectedCategory, currentPage, debouncedSearch, sortBy, selectedState]);
    const fetchPosts = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getPosts({
                category: selectedCategory,
                page: currentPage,
                limit: limit,
                query: debouncedSearch || null,
                sortBy: sortBy,
                state: selectedState
            });

            setPosts(Array.isArray(response?.data) ? response.data : []);
            setTotalPages(response?.totalPages || 1);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching posts:', err);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSearchChange = (query) => {
        setSearchQuery(query);
        setCurrentPage(1);
    };

    const handleSortChange = (sort) => {
        setSortBy(sort);
        setCurrentPage(1);
        router.replace({
            pathname: router.pathname,
            query: { ...router.query, sortBy: sort }
        }, undefined, { shallow: true });
    };

    const handleStateChange = (state) => {
        setSelectedState(state);
        setCurrentPage(1);
        router.replace({
            pathname: router.pathname,
            query: {
                ...router.query,
                state: state || undefined,
                page: 1
            }
        }, undefined, { shallow: true });
    };


    return (
        <PostListContext.Provider
            value={{
                posts,
                loading,
                error,
                currentPage,
                totalPages,
                searchQuery,
                sortBy,
                selectedCategory,
                setSelectedCategory,
                selectedState,
                setSelectedState,
                handlePageChange,
                handleSearchChange,
                handleSortChange,
                handleStateChange
            }}
        >
            {children}
        </PostListContext.Provider>
    );
};