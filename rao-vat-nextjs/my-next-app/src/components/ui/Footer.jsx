import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between text-sm text-gray-600">
        <div>© {new Date().getFullYear()} Rao Vặt</div>
      </div>
    </footer>
  );
};

export default Footer;