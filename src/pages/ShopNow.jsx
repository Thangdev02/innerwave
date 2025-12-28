import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import orderService from '../services/orderService';

const ShopNow = () => {
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    city: '',
    provinceState: '',
    involvement: ''
  });

  const handleOrderClick = () => {
    setShowOrderForm(true);
    setError('');
    setSuccess(false);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await orderService.createOrder(formData);
      console.log('Order created successfully:', response);
      setSuccess(true);
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        address: '',
        city: '',
        provinceState: '',
        involvement: ''
      });

      // Show success message for 3 seconds then go back
      setTimeout(() => {
        setShowOrderForm(false);
        setSuccess(false);
      }, 3000);
      
    } catch (err) {
      console.error('Order submission error:', err);
      setError(err.message || 'Failed to submit order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden pt-32 pb-20">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/backgroundAbout.png"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      <AnimatePresence mode="wait">
        {!showOrderForm ? (
          // Product View
          <motion.div
            key="product"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
          >
            {/* Main Content */}
            <section className="relative z-10 max-w-7xl mx-auto px-8 py-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-pink-100/60 backdrop-blur-2xl rounded-[50px] shadow-2xl p-12 flex flex-col md:flex-row gap-12 items-center"
              >
                {/* Left Side - Image */}
                <motion.div 
                  className="flex-shrink-0"
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-96 h-[500px] rounded-[40px] overflow-hidden border-8 border-white shadow-2xl">
                    <img
                      src="/shopnow.png"
                      alt="InnerWave Board Game"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>

                {/* Right Side - Content */}
                <div className="flex-1 bg-white/90 backdrop-blur-md rounded-[40px] p-10 shadow-lg">
                  <h2 className="text-4xl font-bold text-[#449C65] mb-6 flex items-center gap-2">
                    🌊 InnerWave Board Game
                  </h2>
                  <div className="space-y-4 text-gray-800 leading-relaxed">
                    <p className="text-lg">
                      a mindful companion designed to help you understand your emotions — one small step at a time.
                    </p>
                    <p>
                      innerwave is a therapeutic-inspired board game created for individuals living with bipolar disorder and anyone seeking emotional balance. through daily reflection cards, reward tokens, and simple guided practices, the game helps you build healthier habits, recognize emotional patterns, and stay grounded throughout the ups and downs of everyday life.
                    </p>
                  </div>
                </div>
              </motion.div>
            </section>

            {/* Inside the Box Section */}
            <section className="relative z-10 bg-[#fbafaf] backdrop-blur-md py-20 px-8 mt-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="max-w-5xl mx-auto text-center"
              >
                <h2 className="text-4xl font-bold text-[#449C65] mb-10">
                  Inside the box, you'll find:
                </h2>
                
                <div className="space-y-3 text-gray-800 leading-relaxed text-lg mb-8">
                  <p>• 30 activity & reflection cards</p>
                  <p>• 30 reward tokens</p>
                  <p>• daily progress tracker</p>
                  <p>• guided instruction sheet</p>
                  <p className="mt-6">whether you're on a healing journey or simply exploring mindfulness,</p>
                  <p>innerwave brings a gentle, structured approach to emotional self-care — and</p>
                  <p>turns it into a calming, meaningful daily ritual.</p>
                  <p className="mt-6">bring innerwave into your routine.</p>
                  <p>start building your path to balance today.</p>
                </div>

                <motion.button 
                  onClick={handleOrderClick}
                  whileHover={{ scale: 1.1, rotate: 3 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-12 py-4 bg-[#449C65] hover:bg-[#3a8556] text-white font-bold rounded-full shadow-xl transition-all text-lg"
                >
                  Order now!
                </motion.button>
              </motion.div>
            </section>
          </motion.div>
        ) : (
          // Order Form View
          <motion.div
            key="form"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 max-w-6xl mx-auto px-8"
          >
            <div className="bg-white/80 backdrop-blur-xl rounded-[50px] shadow-2xl p-12">
              {/* Success Message */}
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg text-center"
                >
                  🎉 Order submitted successfully! Thank you for your order.
                </motion.div>
              )}

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg"
                >
                  {error}
                </motion.div>
              )}

              {/* Left Side - Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="bg-[#5cd9aa] text-white px-6 py-3 rounded-full inline-block mb-8 font-bold">
                    Personal Information
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First name*"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      disabled={loading}
                      className="w-full px-6 py-3 rounded-full border-2 border-gray-200 focus:border-[#5cd9aa] outline-none transition bg-white/70 disabled:opacity-50"
                    />
                    
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last name*"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      disabled={loading}
                      className="w-full px-6 py-3 rounded-full border-2 border-gray-200 focus:border-[#5cd9aa] outline-none transition bg-white/70 disabled:opacity-50"
                    />

                    <input
                      type="email"
                      name="email"
                      placeholder="Email*"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      disabled={loading}
                      className="w-full px-6 py-3 rounded-full border-2 border-gray-200 focus:border-[#5cd9aa] outline-none transition bg-white/70 disabled:opacity-50"
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone*"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        disabled={loading}
                        className="px-6 py-3 rounded-full border-2 border-gray-200 focus:border-[#5cd9aa] outline-none transition bg-white/70 disabled:opacity-50"
                      />
                      <input
                        type="date"
                        name="dateOfBirth"
                        placeholder="Date of Birth*"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        required
                        disabled={loading}
                        className="px-6 py-3 rounded-full border-2 border-gray-200 focus:border-[#5cd9aa] outline-none transition bg-white/70 disabled:opacity-50"
                      />
                    </div>

                    <input
                      type="text"
                      name="address"
                      placeholder="Address*"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      disabled={loading}
                      className="w-full px-6 py-3 rounded-full border-2 border-gray-200 focus:border-[#5cd9aa] outline-none transition bg-white/70 disabled:opacity-50"
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="city"
                        placeholder="City*"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        disabled={loading}
                        className="px-6 py-3 rounded-full border-2 border-gray-200 focus:border-[#5cd9aa] outline-none transition bg-white/70 disabled:opacity-50"
                      />
                      <input
                        type="text"
                        name="provinceState"
                        placeholder="Province/State*"
                        value={formData.provinceState}
                        onChange={handleInputChange}
                        required
                        disabled={loading}
                        className="px-6 py-3 rounded-full border-2 border-gray-200 focus:border-[#5cd9aa] outline-none transition bg-white/70 disabled:opacity-50"
                      />
                    </div>

                    <textarea
                      name="involvement"
                      placeholder="In what way are you getting involved?"
                      value={formData.involvement}
                      onChange={handleInputChange}
                      disabled={loading}
                      rows="4"
                      className="w-full px-6 py-3 rounded-3xl border-2 border-gray-200 focus:border-[#5cd9aa] outline-none transition bg-white/70 resize-none disabled:opacity-50"
                    />

                    <div className="flex gap-4 pt-4">
                      <motion.button
                        type="submit"
                        disabled={loading}
                        whileHover={{ scale: loading ? 1 : 1.05 }}
                        whileTap={{ scale: loading ? 1 : 0.95 }}
                        className="flex-1 px-8 py-3 bg-[#5cd9aa] hover:bg-[#4aaee0] text-white font-bold rounded-full shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? 'Submitting...' : 'Submit Order'}
                      </motion.button>
                      <motion.button
                        type="button"
                        onClick={() => setShowOrderForm(false)}
                        disabled={loading}
                        whileHover={{ scale: loading ? 1 : 1.05 }}
                        whileTap={{ scale: loading ? 1 : 0.95 }}
                        className="px-8 py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded-full shadow-lg transition disabled:opacity-50"
                      >
                        Back
                      </motion.button>
                    </div>
                  </form>
                </div>

                {/* Right Side - Empty space with gradient */}
                <div className="hidden md:block bg-gradient-to-br from-pink-100/50 to-blue-100/50 rounded-[40px]"></div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      {!showOrderForm && (
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="relative z-10 mt-20"
        >
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 py-12">
            <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center text-white">
              <div className="mb-6 md:mb-0">
                <h3 className="text-xl font-bold mb-4">Quick Access:</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="/" className="hover:underline">Home</a></li>
                  <li><a href="/journey-tracker" className="hover:underline">Journey Tracker</a></li>
                  <li><a href="/inner-space" className="hover:underline">Inner Space</a></li>
                  <li><a href="/blog" className="hover:underline">Healing Stories</a></li>
                  <li><a href="/about" className="hover:underline">About Me</a></li>
                  <li><a href="/shop" className="hover:underline">Shop Now</a></li>
                </ul>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-white shadow-xl">
                  <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" />
                </div>
                <div className="text-center text-sm">
                  <p>Tel: (+84) 82 340 528</p>
                  <p>Zalo: 0329 489 349</p>
                  <p>Email: thaothuduclc@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </motion.footer>
      )}
    </main>
  );
};

export default ShopNow;