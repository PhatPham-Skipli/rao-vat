import React from 'react';

const CategorySkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {[...Array(6)].map((_, idx) => (
        <div
          key={idx}
          className="bg-gray-200 animate-pulse rounded-lg shadow p-4 h-32 flex flex-col"
        >
          <div className="h-6 bg-gray-300 rounded w-2/3 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
          <div className="h-3 bg-gray-300 rounded w-1/4"></div>
        </div>
      ))}
    </div>
  );
};

export default CategorySkeleton;