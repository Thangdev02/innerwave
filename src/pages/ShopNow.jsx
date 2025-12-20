import React from 'react';
import { motion } from 'framer-motion';

const ShopNow = () => {
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
            whileHover={{ scale: 1.1, rotate: 3 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-4 bg-[#449C65] hover:bg-[#3a8556] text-white font-bold rounded-full shadow-xl transition-all text-lg"
          >
            Order now!
          </motion.button>
        </motion.div>
      </section>
    </main>
  );
};

export default ShopNow;