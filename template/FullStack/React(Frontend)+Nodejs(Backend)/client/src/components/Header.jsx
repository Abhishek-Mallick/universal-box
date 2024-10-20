import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import toast, { Toaster } from 'react-hot-toast';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../public/logo.webp';
import Button from './ui/Button'; // Import the custom Button component

const BASE_URL = 'http://localhost:3000';

function Header() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); 
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
    navigate('/signin')
    //send request here
    setIsSignedIn(true);
    localStorage.setItem('isSignedIn', 'true'); 
    toast.success('Sign in successful!');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  return (
    <nav className="bg-black p-2 shadow-lg relative">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link to="/">  
            <img
              src={logo}
              alt="Logo"
              className="w-14 h-14 object-cover rounded-full transform hover:scale-110 transition-transform duration-300"
            />
          </Link>
          <span className="text-white text-3xl font-extrabold tracking-wide">
            Universal-Box
          </span>
        </div>

        <div className="flex items-center space-x-8">
          <Link
            to="/"
            className="text-white text-lg hover:scale-105 font-medium hover:text-gray-300 no-underline transition duration-200"
          >
            Home
          </Link>

          {isSignedIn ? (
            <>
              <Button
                onClick={handleSignOut}
                className=" bg-[#f0f0f0] hover:bg-[#ffffff] font-semibold p-4 rounded-lg transition duration-400"
              >
                Sign Out
              </Button>

              <div className="relative">
                <img
                  src="https://via.placeholder.com/40"
                  alt="User DP"
                  onClick={toggleDropdown}
                  className="w-12 h-12 rounded-full border-2 border-white shadow-lg cursor-pointer transform hover:scale-110 transition-transform duration-300"
                />
                {dropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg z-10"
                    onMouseLeave={closeDropdown} 
                  >
                    <ul className="p-2">
                      <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer">
                        <Link to="/profile" className="no-underline">Profile</Link>
                      </li>
                      <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer">
                        <Link to="/settings" className="no-underline">Settings</Link>
                      </li>
                      <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer">
                        <Link to="/about" className="no-underline">About</Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Button onClick={handleSignIn} className="w-full bg-[#f0f0f0] hover:bg-[#ffffff] font-semibold p-4 rounded-lg transition duration-400">
              Sign In
            </Button>
          )}
        </div>
      </div>
      
      <Toaster />
    </nav>
  );
}

export default Header;