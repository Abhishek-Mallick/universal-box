import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const Signin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const validate = () => {
    const errors = {};

    if (!formData.username.trim()) {
      errors.username = 'Username is required';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password needs to be at least 6 characters';
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('http://localhost:3000/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      setLoading(false);

      if (!res.ok) {
        throw new Error('Failed to sign in');
      }

      const data = await res.json();
      if (!data.success) {
        setServerError(data.message);
        return;
      }
      
      setSuccessMessage('Signin successful!');
      setServerError('');
      navigate('/');
    } catch (error) {
      setServerError(error.message || 'An error occurred during signin');
      setSuccessMessage('');
    }
  };

  return (
    <div className='flex justify-center min-h-56 p-[160px]'>
      <div className="relative z-20 w-full max-w-md bg-[#040b18] bg-opacity-90 px-8 py-14 rounded-lg shadow-lg backdrop-blur-md">
        <h2 className="text-center text-3xl font-bold text-white mb-16">Sign In</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Input
              onChange={handleChange}
              placeholder="Username"
              type="text"
              id="username"
              value={formData.username}
              className="w-full p-4 border border-[#C5C6C7] rounded-lg text-[#0B0C10] focus:ring-2 focus:ring-[#45A29E]"
            />
            {errors.username && <p className="text-red-500">{errors.username}</p>}
          </div>

          <div className="mb-6">
            <Input
              onChange={handleChange}
              placeholder="Password"
              type="password"
              id="password"
              value={formData.password}
              className="w-full p-4 border border-[#C5C6C7] rounded-lg text-[#0B0C10] focus:ring-2 focus:ring-[#45A29E]"
            />
            {errors.password && <p className="text-red-500">{errors.password}</p>}
          </div>

          <Button
            name="Sign in"
            type="submit"
            className="w-full bg-[#eeeeee] hover:bg-[#3B82F6] hover:shadow-sm hover:shadow-gray-400 font-semibold p-4 rounded-lg hover:text-white transition duration-400"
          />

          {serverError && <p className="text-red-500 mt-4">{serverError}</p>}
          {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
        </form>

        <div className="mt-6 text-center text-[#C5C6C7]">
          <span>Don't have an account?</span>
          <button
            onClick={() => navigate('/signup')}
            className="text-white hover:underline ml-2"
          >
            <span className='hover:text-blue-400'>Signup Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signin;
