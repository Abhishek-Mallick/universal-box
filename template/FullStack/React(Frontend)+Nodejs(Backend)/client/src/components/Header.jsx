import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../public/logo.webp';

const BASE_URL = 'http://localhost:3000';

function Header() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const signedInStatus = localStorage.getItem('isSignedIn');
    if (signedInStatus === 'true') {
      setIsSignedIn(true);
    }
  }, []);

  const handleSignOut = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/user/signout`, {
        method: 'POST',
      });

      if (!res.ok) {
        const errorData = await res.json();
        toast.error(`Error: ${errorData.message}`);
        return;
      }

      toast.success('Sign out successful!');
      setIsSignedIn(false);
      localStorage.removeItem('isSignedIn');
      navigate('/signin');
    } catch (error) {
      toast.error(`Sign out error: ${error.message}`);
    }
  };

  const handleSignIn = () => {
    setIsSignedIn(true);
    localStorage.setItem('isSignedIn', 'true');
    toast.success('Sign in successful!');
  };

  return (
    <nav className="bg-gradient-to-r from-gray-800 to-black p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img
            src={logo}
            alt="Logo"
            className="w-12 h-12 object-cover rounded-full"
          />
          <span className="text-white text-2xl font-bold">Universal-Box</span>
        </div>
        <div className="flex items-center space-x-6">
          {isSignedIn ? (
            <>
              <button
                onClick={handleSignOut}
                className="text-white hover:text-gray-300 transition duration-200 border-1  border-white px-3 py-1 rounded-md"
              >
                Sign Out
              </button>
              <img
                src="https://via.placeholder.com/40"
                alt="User DP"
                className="w-10 h-10 rounded-full border-2 border-white shadow-md"
              />
            </>
          ) : (
            <a
              href="/signin"
              className="text-white hover:text-gray-300 transition duration-200 border-1 border-white px-3 py-1 rounded-md"
              onClick={handleSignIn}
            >
              Sign In
            </a>
          )}
        </div>
      </div>
      <Toaster />
    </nav>
  );
}

export default Header;
