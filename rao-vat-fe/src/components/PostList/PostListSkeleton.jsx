import React from 'react';

const PostListSkeleton = ({ count = 12 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="bg-white border rounded-lg shadow animate-pulse overflow-hidden"
        >
          <div className="w-full h-48 bg-gray-200" />
          <div className="p-4">
            <div className="h-6 bg-gray-200 rounded mb-2 w-3/4" />
            <div className="h-4 bg-gray-200 rounded mb-1 w-1/2" />
            <div className="h-4 bg-gray-200 rounded mb-2 w-2/3" />
            <div className="h-3 bg-gray-200 rounded w-1/4" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostListSkeleton;