import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

function Header() {
  return (
    <nav className="bg-gradient-to-r from-gray-800 to-black p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <a href="/" className="text-white text-2xl font-bold">
          Universal-Box
        </a>
        <div className="flex items-center space-x-6">
          <a
            href="/signin"
            className="text-white hover:text-gray-300 transition duration-200"
          >
            Sign In
          </a>
          <img
            src="https://via.placeholder.com/40"
            alt="User DP"
            className="w-10 h-10 rounded-full border-2 border-white shadow-md"
          />
        </div>
      </div>
    </nav>
  );
}

export default Header;