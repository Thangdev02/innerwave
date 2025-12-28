import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import authService from '../services/authService';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  
  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: ''
  });

  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleRegisterChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authService.login(loginData);
      console.log('Login successful:', response);
      
      // Kiểm tra role và redirect
      if (response.roles && response.roles.includes('Admin')) {
        // Nếu là Admin, chuyển đến trang admin
        navigate('/admin');
      } else {
        // Nếu là User hoặc role khác, chuyển về home
        navigate('/');
      }
      
      // Reload lại header để cập nhật UI
      window.location.reload();
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (registerData.password !== registerData.confirmPassword) {
      setError('Mật khẩu không khớp!');
      return;
    }

    if (registerData.password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự.');
      return;
    }

    if (!registerData.firstName || !registerData.lastName || !registerData.email) {
      setError('Vui lòng điền đầy đủ thông tin bắt buộc.');
      return;
    }

    setLoading(true);

    try {
      const response = await authService.register(registerData);
      console.log('Registration successful:', response);
      
      // Sau khi đăng ký thành công, redirect về home (user mặc định)
      navigate('/');
      
      // Reload lại header để cập nhật UI
      window.location.reload();
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message || 'Đăng ký thất bại. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden flex items-center justify-center py-32 px-6">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/backgroundAbout.png"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Auth Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-5xl"
      >
        <div className="bg-white/80 backdrop-blur-xl rounded-[50px] shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left Side - Form */}
            <div className="p-12">
              {/* Toggle Tabs */}
              <div className="flex gap-4 mb-8">
                <button
                  onClick={() => {
                    setIsLogin(true);
                    setError('');
                  }}
                  className={`flex-1 px-6 py-3 rounded-full font-bold transition-all ${
                    isLogin
                      ? 'bg-[#5cd9aa] text-white shadow-lg'
                      : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setIsLogin(false);
                    setError('');
                  }}
                  className={`flex-1 px-6 py-3 rounded-full font-bold transition-all ${
                    !isLogin
                      ? 'bg-[#5cd9aa] text-white shadow-lg'
                      : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                  }`}
                >
                  Register
                </button>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm"
                >
                  {error}
                </motion.div>
              )}

              <AnimatePresence mode="wait">
                {isLogin ? (
                  // Login Form
                  <motion.form
                    key="login"
                    onSubmit={handleLoginSubmit}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-3xl font-bold text-[#449C65] mb-6">
                      Welcome Back! 👋
                    </h2>
                    <p className="text-gray-600 mb-8">
                      Sign in to continue your healing journey
                    </p>

                    <div className="space-y-4">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email*"
                        value={loginData.email}
                        onChange={handleLoginChange}
                        required
                        disabled={loading}
                        className="w-full px-6 py-3 rounded-full border-2 border-gray-200 focus:border-[#5cd9aa] outline-none transition bg-white/70 disabled:opacity-50"
                      />

                      <input
                        type="password"
                        name="password"
                        placeholder="Password*"
                        value={loginData.password}
                        onChange={handleLoginChange}
                        required
                        disabled={loading}
                        className="w-full px-6 py-3 rounded-full border-2 border-gray-200 focus:border-[#5cd9aa] outline-none transition bg-white/70 disabled:opacity-50"
                      />

                      <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" className="w-4 h-4 accent-[#5cd9aa]" />
                          <span className="text-gray-600">Remember me</span>
                        </label>
                        <a href="#" className="text-[#5cd9aa] hover:underline">
                          Forgot password?
                        </a>
                      </div>

                      <motion.button
                        type="submit"
                        disabled={loading}
                        whileHover={{ scale: loading ? 1 : 1.05 }}
                        whileTap={{ scale: loading ? 1 : 0.95 }}
                        className="w-full px-8 py-4 bg-gradient-to-r from-[#5cd9aa] to-[#4aaee0] text-white font-bold rounded-full shadow-lg transition mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? 'Signing in...' : 'Sign In'}
                      </motion.button>

                      <div className="text-center mt-6">
                        <p className="text-gray-600">
                          Don't have an account?{' '}
                          <button
                            type="button"
                            onClick={() => setIsLogin(false)}
                            className="text-[#5cd9aa] font-bold hover:underline"
                          >
                            Sign up here
                          </button>
                        </p>
                      </div>
                    </div>
                  </motion.form>
                ) : (
                  // Register Form
                  <motion.form
                    key="register"
                    onSubmit={handleRegisterSubmit}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-3xl font-bold text-[#449C65] mb-6">
                      Join Us! 🌱
                    </h2>
                    <p className="text-gray-600 mb-8">
                      Create your account and start your journey
                    </p>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          name="firstName"
                          placeholder="First name*"
                          value={registerData.firstName}
                          onChange={handleRegisterChange}
                          required
                          disabled={loading}
                          className="px-6 py-3 rounded-full border-2 border-gray-200 focus:border-[#5cd9aa] outline-none transition bg-white/70 disabled:opacity-50"
                        />
                        <input
                          type="text"
                          name="lastName"
                          placeholder="Last name*"
                          value={registerData.lastName}
                          onChange={handleRegisterChange}
                          required
                          disabled={loading}
                          className="px-6 py-3 rounded-full border-2 border-gray-200 focus:border-[#5cd9aa] outline-none transition bg-white/70 disabled:opacity-50"
                        />
                      </div>

                      <input
                        type="email"
                        name="email"
                        placeholder="Email*"
                        value={registerData.email}
                        onChange={handleRegisterChange}
                        required
                        disabled={loading}
                        className="w-full px-6 py-3 rounded-full border-2 border-gray-200 focus:border-[#5cd9aa] outline-none transition bg-white/70 disabled:opacity-50"
                      />

                      <input
                        type="tel"
                        name="phoneNumber"
                        placeholder="Phone number"
                        value={registerData.phoneNumber}
                        onChange={handleRegisterChange}
                        disabled={loading}
                        className="w-full px-6 py-3 rounded-full border-2 border-gray-200 focus:border-[#5cd9aa] outline-none transition bg-white/70 disabled:opacity-50"
                      />

                      <input
                        type="password"
                        name="password"
                        placeholder="Password*"
                        value={registerData.password}
                        onChange={handleRegisterChange}
                        required
                        minLength={6}
                        disabled={loading}
                        className="w-full px-6 py-3 rounded-full border-2 border-gray-200 focus:border-[#5cd9aa] outline-none transition bg-white/70 disabled:opacity-50"
                      />

                      <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password*"
                        value={registerData.confirmPassword}
                        onChange={handleRegisterChange}
                        required
                        disabled={loading}
                        className="w-full px-6 py-3 rounded-full border-2 border-gray-200 focus:border-[#5cd9aa] outline-none transition bg-white/70 disabled:opacity-50"
                      />

                      <label className="flex items-start gap-2 cursor-pointer text-sm text-gray-600">
                        <input 
                          type="checkbox" 
                          className="w-4 h-4 accent-[#5cd9aa] mt-1" 
                          required 
                          disabled={loading}
                        />
                        <span>
                          I agree to the{' '}
                          <a href="#" className="text-[#5cd9aa] hover:underline">
                            Terms & Conditions
                          </a>{' '}
                          and{' '}
                          <a href="#" className="text-[#5cd9aa] hover:underline">
                            Privacy Policy
                          </a>
                        </span>
                      </label>

                      <motion.button
                        type="submit"
                        disabled={loading}
                        whileHover={{ scale: loading ? 1 : 1.05 }}
                        whileTap={{ scale: loading ? 1 : 0.95 }}
                        className="w-full px-8 py-4 bg-gradient-to-r from-[#5cd9aa] to-[#4aaee0] text-white font-bold rounded-full shadow-lg transition mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? 'Creating Account...' : 'Create Account'}
                      </motion.button>

                      <div className="text-center mt-6">
                        <p className="text-gray-600">
                          Already have an account?{' '}
                          <button
                            type="button"
                            onClick={() => setIsLogin(true)}
                            className="text-[#5cd9aa] font-bold hover:underline"
                          >
                            Sign in here
                          </button>
                        </p>
                      </div>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {/* Right Side - Decorative */}
            <div className="hidden md:block relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-200/60 via-purple-200/60 to-blue-200/60">
                {/* Decorative circles */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute top-10 right-10 w-32 h-32 rounded-full bg-gradient-to-br from-[#5cd9aa]/30 to-[#4aaee0]/30 blur-2xl"
                />
                <motion.div
                  animate={{
                    scale: [1.2, 1, 1.2],
                    rotate: [360, 180, 0],
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute bottom-20 left-10 w-40 h-40 rounded-full bg-gradient-to-br from-purple-300/30 to-pink-300/30 blur-2xl"
                />
              </div>

              <div className="relative z-10 h-full flex flex-col items-center justify-center p-12 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="w-32 h-32 rounded-full overflow-hidden mb-8 border-4 border-white shadow-2xl"
                >
                  <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" />
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-3xl font-bold text-gray-800 mb-4"
                >
                  Welcome to InnerWave 🌊
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-gray-600 leading-relaxed"
                >
                  Your journey to emotional balance and mindfulness starts here. 
                  Join our community and discover tools for healing and growth.
                </motion.p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </main>
  );
};

export default AuthPage;