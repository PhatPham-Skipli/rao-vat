import React from 'react';
import { usePostList } from '../../contexts/PostListContext';
import PostCard from './PostCard';
import PostListSkeleton from './PostListSkeleton';
import Pagination from '../Pagination';
import US_STATES from '../../constants/usStates';

const Postlist = () => {
    const {
        posts,
        loading,
        error,
        currentPage,
        totalPages,
        searchQuery,
        sortBy,
        selectedState,
        handlePageChange,
        handleSearchChange,
        handleSortChange,
        handleStateChange,
    } = usePostList();

    if (error) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="text-lg text-red-600">Lỗi: {error}</div>
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
                {/* Search Bar */}
                <div className="flex-1 relative">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        placeholder="Tìm kiếm bài đăng..."
                        className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    />
                    <svg
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>

                {/* State Filter Dropdown */}
                <div className="sm:w-48">
                    <select
                        value={selectedState || 'all'}
                        onChange={(e) => handleStateChange(e.target.value === 'all' ? null : e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-white cursor-pointer"
                    >
                        {US_STATES.map((state) => (
                            <option key={state.code} value={state.code}>
                                {state.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Sort Dropdown */}
                <div className="sm:w-48">
                    <select
                        value={sortBy}
                        onChange={(e) => handleSortChange(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-white cursor-pointer"
                    >
                        <option value="newest">Mới nhất</option>
                        <option value="oldest">Cũ nhất</option>
                    </select>
                </div>
            </div>

            {/* Posts Grid */}
            {loading ? (
                <PostListSkeleton count={12} />
            ) : posts.length === 0 ? (
                <div className="flex justify-center items-center py-20">
                    <div className="text-lg text-gray-600">
                        {searchQuery ? 'Không tìm thấy bài đăng nào' : 'Chưa có bài đăng nào'}
                    </div>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {posts.map((post) => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default Postlist;