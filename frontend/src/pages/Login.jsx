import React from 'react';
import LoginForm from '../components/login/Login.jsx';
import common from '../assets/login/common.webp';

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-6xl w-full flex flex-col lg:flex-row">
        {/* Left/visual panel */}
        <div className="lg:w-1/2 relative overflow-hidden rounded-3xl min-h-[280px] md:min-h-[420px] lg:min-h-[600px]">
          {/* Background image fills the whole left panel responsively */}
          <img
            src={common}
            alt="Doctor and Patient Illustration"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* overlay to ensure text contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40"></div>

          <div className="relative z-10 flex items-center justify-center w-full p-6 md:p-12">
            <div className="max-w-md w-full text-left text-white">
              <h1 className="text-3xl text-left sm:text-4xl md:text-5xl font-bold mb-2">HealthPredict</h1>
              <p className="text-base sm:text-lg md:text-xl text-white/90 mb-4">
                Efficient Management, Better care
              </p>
              
            </div>
          </div>
        </div>

        {/* Right/form panel */}
        <div className="lg:w-1/2 p-6 sm:p-8 md:p-12 flex items-center justify-center">
          <div className="w-full max-w-md">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;