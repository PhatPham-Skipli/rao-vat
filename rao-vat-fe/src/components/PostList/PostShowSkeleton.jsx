import React from 'react';

const PostShowSkeleton = () => (
  <div className="max-w-4xl mx-auto">
    <div className="mb-6 px-4 py-2 bg-gray-200 rounded-lg w-32 h-10 animate-pulse" />
    <div className="bg-white rounded-lg shadow-lg p-6 animate-pulse">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div className="h-8 bg-gray-200 rounded w-2/3" />
        <div className="ml-4 px-4 py-2 bg-gray-200 rounded-full w-24 h-8" />
      </div>
      {/* Image */}
      <div className="mb-6">
        <div className="w-full max-h-96 bg-gray-200 rounded-lg mb-4 h-64" />
        <div className="flex gap-2">
          {[...Array(3)].map((_, idx) => (
            <div key={idx} className="w-20 h-20 bg-gray-200 rounded" />
          ))}
        </div>
      </div>
      {/* Description */}
      <div className="mb-6 pb-6 border-b">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-3" />
        <div className="h-4 bg-gray-200 rounded w-full mb-2" />
        <div className="h-4 bg-gray-200 rounded w-2/3 mb-2" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
      </div>
      {/* Address */}
      <div className="mb-6 pb-6 border-b">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-3" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
      </div>
      {/* Contact Info */}
      <div className="mb-6 pb-6 border-b">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-3" />
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-2" />
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-2" />
        <div className="h-4 bg-gray-200 rounded w-1/3" />
      </div>
      {/* Post Info */}
      <div>
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-3" />
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-2" />
        <div className="h-4 bg-gray-200 rounded w-1/4" />
      </div>
    </div>
  </div>
);

export default PostShowSkeleton;