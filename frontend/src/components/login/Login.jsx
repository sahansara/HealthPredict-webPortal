import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const LoginForm = () => {
  const navigate = useNavigate();
  const { login, loading, errors } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData.email, formData.password, navigate);
  };

  return (
    <div className="w-full max-w-md mx-auto px-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-[#3B69D4] mb-2">
          Welcome back Doctor
        </h2>
        <h1 className="text-3xl font-bold text-gray-800">
          Login to your Account
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Input */}
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-6 py-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#3B69D4] transition-all ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            disabled={loading}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-2 ml-4">{errors.email}</p>
          )}
        </div>

        {/* Password Input */}
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-6 py-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#3B69D4] transition-all ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            }`}
            disabled={loading}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-2 ml-4">{errors.password}</p>
          )}
        </div>

        {/* General Error Message */}
        {errors.general && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
            {errors.general}
          </div>
        )}

        {/* Remember Me & Forget Password */}
        <div className="flex items-center justify-between">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="w-4 h-4 text-[#3B69D4] border-gray-300 rounded focus:ring-[#3B69D4] cursor-pointer"
              disabled={loading}
            />
            <span className="ml-2 text-gray-700 text-sm">Remember me</span>
          </label>

          <a
            href="/forgot-password"
            className="text-sm text-gray-600 hover:text-[#3B69D4] transition-colors"
          >
            Forget Password?
          </a>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-[#3B69D4] text-white py-4 rounded-full font-semibold transition-all ${
            loading
              ? 'opacity-70 cursor-not-allowed'
              : 'hover:bg-[#2d54b8] hover:shadow-lg'
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin h-5 w-5 mr-3 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Logging in...
            </span>
          ) : (
            'Login'
          )}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;