import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({});

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const validate = () => {
    const errors = {};

    if (!formData.username.trim()) {
      errors.username = "Username is required";
    }

    if (!formData.emailid.trim()) {
      errors.emailid = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.emailid)
    ) {
      errors.emailid = "Email address is invalid";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password needs to be at least 6 characters";
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

    try {
      const res = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate("/signin");
      }
      // Check if the response is not successful
      if (!res.ok) {
        throw new Error("Failed to sign up");
      }
      setSuccessMessage("Signup successful!");
      setServerError("");
    } catch (error) {
      setServerError(error.message || "An error occurred during signup");
      setSuccessMessage("");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-white border-4 border-black-800 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-center">Create an Account</h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Username */}
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
              className={`w-full px-4 py-2 text-sm border-2 rounded-md focus:outline-none focus:ring-2 ${
                errors.username ? "border-red-500" : ""
              }`}
              placeholder="Enter your username"
            />
            {errors.username && (
              <p className="mt-2 text-sm text-red-500">{errors.username}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="emailid" className="block mb-2 text-sm font-medium">
              Email Address
            </label>
            <input
              type="email"
              name="emailid"
              id="emailid"
              value={formData.emailid}
              onChange={handleChange}
              className={`w-full px-4 py-2 text-sm border-2 rounded-md focus:outline-none focus:ring-2 ${
                errors.emailid ? "border-red-500" : ""
              }`}
              placeholder="Enter your email"
            />
            {errors.emailid && (
              <p className="mt-2 text-sm text-red-500">{errors.emailid}</p>
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
              className={`w-full px-4 py-2 text-sm border-2 rounded-md focus:outline-none focus:ring-2 ${
                errors.password ? "border-red-500" : ""
              }`}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="mt-2 text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          {/* Server Error */}
          {serverError && (
            <p className="mt-2 text-sm text-red-500">{serverError}</p>
          )}

          {/* Success Message */}
          {successMessage && (
            <p className="mt-2 text-sm text-green-500">{successMessage}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-green-400 to-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2"
          >
            Sign Up
          </button>
        </form>

        {/* Additional Links */}
        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <a href="/signin" className="text-blue-500 hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
