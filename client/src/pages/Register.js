import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import "./animations.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault(); // Prevent default form submission
  //   setError(null); // Clear any previous errors
  //   console.log(e);
  //   console.log(formData);

  //   try {
  //     const res = await axios.post("/api/v1/user/register", formData);
  //     if (res.data.success) {
  //       alert("Registration successful! You can now log in.");
  //       setFormData({
  //         // Clear form data
  //         name: "",
  //         email: "",
  //         mobile: "",
  //         password: "",
  //         confirmPassword: "",
  //       });
  //       navigate("/login");
  //     } else {
  //       setError(res.message);
  //     }
  //   } catch (error) {
  //     console.error("Error during registration:", error);
  //     setError(
  //       error.response?.data?.message ||
  //         "Registration failed. Please try again."
  //     );
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    console.log(e);
    console.log(formData);

    try {
      const res = await axios.post("/api/v1/user/register", formData);
      if (res.data.success) {
        setMessage("Registration successful! You can now log in.");
        setFormData({
          name: "",
          email: "",
          mobile: "",
          password: "",
          confirmPassword: "",
        });
        setTimeout(() => {
          navigate("/login");
        }, 3000); // Redirect after 3 seconds
      } else {
        setError(res.message);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setError(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}
      {message && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline"> {message}</span>
        </div>
      )}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-indigo-900 animate-fade-in-down">
          Create your Pizza Store Account
        </h2>
        <p className="mt-2 text-center text-sm text-purple-600 animate-fade-in-up">
          Join us for delicious pizzas delivered to your door!
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md animate-slide-in-up">
        <div className="bg-white py-8 px-4 shadow-lg rounded-lg sm:px-10 border-t-4 border-indigo-600">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Form fields (name, email, mobile, password, confirmPassword) */}
            {/* ... (keep the existing form fields) ... */}

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-indigo-700"
              >
                Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-indigo-300 rounded-md shadow-sm placeholder-indigo-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Email field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-indigo-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-indigo-300 rounded-md shadow-sm placeholder-indigo-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Mobile field */}
            <div>
              <label
                htmlFor="mobile"
                className="block text-sm font-medium text-indigo-700"
              >
                Mobile number
              </label>
              <div className="mt-1">
                <input
                  id="mobile"
                  name="mobile"
                  type="tel"
                  autoComplete="tel"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-indigo-300 rounded-md shadow-sm placeholder-indigo-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={formData.mobile}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Password field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-indigo-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-indigo-300 rounded-md shadow-sm placeholder-indigo-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Confirm Password field */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-indigo-700"
              >
                Confirm Password
              </label>
              <div className="mt-1">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-indigo-300 rounded-md shadow-sm placeholder-indigo-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="animate-pulse-button">
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                Sign up
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-indigo-500">
                  Already have an account?
                </span>
              </div>
            </div>

            <div className="mt-6 animate-bounce-subtle">
              <Link
                to="/login"
                className="w-full flex justify-center py-2 px-4 border border-indigo-600 rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-indigo-50 transition-all duration-300 ease-in-out"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
