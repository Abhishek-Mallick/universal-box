import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../public/logo.webp'; // Ensure this path is correct

function Header() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const navigate = useNavigate();

  // Check sign-in status on component mount
  useEffect(() => {
    const signedInStatus = localStorage.getItem('isSignedIn');
    if (signedInStatus === 'true') {
      setIsSignedIn(true);
    }
  }, []);

  const handleSignOut = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/user/signout', {
        method: 'POST',
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.log('Error:', errorData.message);
        return;
      }

      const data = await res.json();
      console.log('Sign out successful:', data.message);
      setIsSignedIn(false);
      localStorage.removeItem('isSignedIn');
      navigate('/signin'); // Redirect to sign-in page
    } catch (error) {
      console.error('Sign out error:', error.message);
    }
  };

  const handleSignIn = () => {
    // Simulate a sign-in process
    setIsSignedIn(true);
    localStorage.setItem('isSignedIn', 'true');
  };

  return (
    <nav className="bg-gradient-to-r from-gray-800 to-black p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img
            src={logo} // Use the imported logo here
            alt="Logo"
            className="w-12 h-12 object-cover rounded-full" // Adjust size as needed
          />
          <span className="text-white text-2xl font-bold">Universal-Box</span>
        </div>
        <div className="flex items-center space-x-6">
          {isSignedIn ? (
            <>
              <button
                onClick={handleSignOut}
                className="text-white hover:text-gray-300 transition duration-200"
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
              className="text-white hover:text-gray-300 transition duration-200"
              onClick={handleSignIn}
            >
              Sign In
            </a>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
