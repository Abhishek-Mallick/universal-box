import React, { useState } from 'react';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const errors = {};

    if (!formData.username.trim()) {
      errors.username = 'Username is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      errors.email = 'Email address is invalid';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password needs to be at least 6 characters';
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      
      console.log('Form Data Submitted:', formData);
     
      setFormData({
        username: '',
        email: '',
        password: '',
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
    <div className="w-full max-w-md p-8 space-y-6 bg-white border-4 border-black-800 rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold text-center">
        Log In
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
       
        <div>
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium"
          >
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleChange}
            className={`w-full px-4 py-2 text-sm border-2 rounded-md focus:outline-none focus:ring-2`}
            placeholder="Enter your username"
          />
          {errors.username && (
            <p className="mt-2 text-sm text-red-500">{errors.username}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium"
          >
            Email Address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-2 text-sm border-2 rounded-md focus:outline-none focus:ring-2`}
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="mt-2 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-4 py-2 text-sm border-2 rounded-md focus:outline-none focus:ring-2`}
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="mt-2 text-sm text-red-500">{errors.password}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-green-400 to-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 "
        >
          Sign In
        </button>
      </form>

      {/* Additional Links */}
      <p className="text-sm text-center text-gray-600">
        Already have an account?{' '}
        <a
          href="/signup"
          className="text-blue-500 hover:underline"
        >
          Sign Up
        </a>
      </p>
    </div>
  </div>
  );
};

export default Signup;
