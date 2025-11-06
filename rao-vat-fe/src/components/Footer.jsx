import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-[#fcf8f2] border-t border-gray-200 py-6 mt-12 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
        <div className="text-sm text-gray-600 text-center">
          © {new Date().getFullYear()} Rao Vặt. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer