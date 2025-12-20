import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const About = () => {
  const [showCollaborate, setShowCollaborate] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    city: '',
    province: '',
    involvement: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    alert('Thank you for your interest in collaborating!');
  };

  return (
    <main className="min-h-screen relative overflow-hidden pt-48">
      <div className="absolute inset-0 z-0">
        <img
          src="/backgroundAbout.png"
          alt="About Background"
          className="w-full h-full object-cover"
        />
      </div>

      <AnimatePresence mode="wait">
        {!showCollaborate ? (
          // Original About Page
          <motion.div
            key="about"
            initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: -100, rotateY: 15 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <section className="relative z-10 max-w-7xl mx-auto px-8 py-12">
              <motion.div
                className="bg-white/10 backdrop-blur-2xl rounded-[50px] shadow-2xl p-16 flex flex-col md:flex-row gap-16 items-center"
              >
                <motion.div 
                  className="flex-shrink-0"
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-72 h-96 rounded-[30px] overflow-hidden border-8 border-white/80 shadow-xl bg-pink-100">
                    <img
                      src="/avatar.png"
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>

                <div className="flex-1 bg-white/95 backdrop-blur-md rounded-[40px] p-10 shadow-lg">
                  <h2 className="text-4xl font-bold text-[#449C65] mb-8">WHO AM I?</h2>
                  <div className="space-y-5 text-gray-800 leading-relaxed text-base">
                    <p>
                      i am a girl who believes in the quiet power of understanding.<br/>
                      after spending years walking alongside individuals living with bipolar disorder, i've learned that every emotion — whether rising high or falling low — carries a story that deserves to be heard with kindness.
                    </p>
                    <p className="mt-6">
                      i created this project to become a gentle space:<br/>
                      a place where people with bipolar disorder can slow down, build small stabilizing habits, and feel held instead of alone.
                    </p>
                    <p className="mt-6">
                      i'm not here to "fix" anyone.<br/>
                      i'm here to walk with them — with warmth, patience, and a deep belief that everyone can find their own rhythm of balance.
                    </p>
                  </div>
                </div>
              </motion.div>
            </section>

            <section className="relative z-10 bg-[#fbafaf] backdrop-blur-md py-20 px-8 mt-16">
              <motion.div className="max-w-5xl mx-auto text-center">
                <h2 className="text-4xl font-bold text-[#449C65] mb-10 flex items-center justify-center gap-3">
                  ✨ InnerWave – Where Your Healing Journey Begins
                </h2>
                
                <div className="space-y-3 text-gray-800 leading-relaxed mb-10" style={{fontSize:'18px'}}>
                  <p>
                    innerwave is a mindful board game designed to support individuals living <br /> with bipolar disorder and anyone seeking emotional balance. expanding <br /> beyond the card experience, innerwave's website becomes a safe digital <br /> space where players can track their progress, reflect on their emotions, and <br /> share personal stories without fear of judgment.
                  </p>
                  this platform is more than a companion to the game — it's a community.
                  <br/>here, you can:
                  <p>• journal your feelings and mark your daily progress with reward tokens</p>
                  <p>• share your story through personal blog entries</p>
                  <p>• open up anonymously via a safe, private chatbox</p>
                  <p className="mt-6">
                    innerwave reminds you that emotional waves are natural — and you never <br /> have to face them alone.
                  </p>
                </div>

                <motion.button 
                  onClick={() => setShowCollaborate(true)}
                  whileHover={{ scale: 1.1, rotate: 3 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-12 py-4 bg-[#449C65] hover:bg-teal-500 text-[#FFC07C] font-bold rounded-full shadow-xl transition-all text-lg"
                >
                  Collaborate with me
                </motion.button>
              </motion.div>
            </section>
          </motion.div>
        ) : (
          // Collaborate Form Page
          <motion.div
            key="collaborate"
            initial={{ opacity: 0, scale: 0.9, rotateY: 15, x: 100 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, rotateY: -15 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <section className="relative z-10 max-w-7xl mx-auto px-8 py-12">
              <motion.div className="bg-pink-100/60 backdrop-blur-2xl rounded-[50px] shadow-2xl p-12 flex flex-col md:flex-row gap-8">
                {/* Left Side - Content */}
                <motion.div 
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="flex-1 bg-white/90 backdrop-blur-md rounded-[40px] p-10 shadow-lg overflow-y-auto max-h-[700px]"
                >
                  <h2 className="text-4xl font-bold text-[#449C65] mb-6 flex items-center gap-2">
                    🌿 Collaborate With Me
                  </h2>
                  <div className="space-y-6 text-gray-800 leading-relaxed">
                    <p>
                      let's build a kinder, more supportive world for mental well-being — together.
                    </p>
                    <p>
                      innerwave was created with a simple belief: healing becomes lighter when we have someone to walk with. if you share the same passion for mental health, emotional wellness, and community impact, i would love to collaborate with you.
                    </p>

                    <div className="mt-8">
                      <h3 className="text-2xl font-bold text-[#449C65] mb-4 flex items-center gap-2">
                        🤝 Who I'm Looking to Partner With
                      </h3>
                      <ul className="space-y-2 text-gray-800">
                        <li>• mental health organizations & ngos</li>
                        <li>• educators, counselors, and wellness coaches</li>
                        <li>• content creators and advocates for emotional wellbeing</li>
                        <li>• schools, youth programs, and community groups</li>
                        <li>• brands or projects promoting mindfulness & self-care</li>
                      </ul>
                    </div>

                    <div className="mt-8">
                      <h3 className="text-2xl font-bold text-[#449C65] mb-4 flex items-center gap-2">
                        ✨ Ways We Can Work Together
                      </h3>
                      <ul className="space-y-2 text-gray-800">
                        <li>• workshops & awareness sessions using the innerwave boardgame</li>
                        <li>• co-creating digital tools to support emotional tracking and reflection</li>
                        <li>• storytelling collaborations that highlight real journeys of healing</li>
                        <li>• community events focused on connection and peer support</li>
                        <li>• research or pilot programs on mental-health engagement through gamified tools</li>
                      </ul>
                    </div>

                    <div className="mt-8">
                      <h3 className="text-2xl font-bold text-[#449C65] mb-4 flex items-center gap-2">
                        💬 Why Collaborate?
                      </h3>
                      <p className="mb-2">because together, we can:</p>
                      <ul className="space-y-2 text-gray-800">
                        <li>• create safe spaces for honest conversations</li>
                        <li>• empower individuals to understand their emotions</li>
                        <li>• reduce stigma around bipolar disorder and mental health conditions</li>
                        <li>• build a community grounded in empathy and growth</li>
                      </ul>
                    </div>

                    <div className="mt-8">
                      <h3 className="text-2xl font-bold text-[#449C65] mb-4 flex items-center gap-2">
                        📬 Let's Connect
                      </h3>
                      <p>
                        if you feel aligned with innerwave's mission, i'd love to hear from you. reach out, share your ideas, and let's create meaningful impact — wave by wave.
                      </p>
                    </div>

                    <motion.button 
                      onClick={() => setShowCollaborate(false)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-6 px-8 py-3 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded-full shadow-lg transition-all"
                    >
                      ← Back to About
                    </motion.button>
                  </div>
                </motion.div>

                {/* Right Side - Form */}
                <motion.div 
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="w-full md:w-[480px] flex-shrink-0 overflow-y-auto max-h-[700px]"
                >
                  <div className="bg-white/90 backdrop-blur-md rounded-[40px] p-8 shadow-lg">
                    <div className="bg-[#449C65] text-white text-center py-3 rounded-full mb-6 font-bold">
                      Personal Information
                    </div>
                    
                    <div className="space-y-4">
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        type="text"
                        name="firstName"
                        placeholder="First name*"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-full border-2 border-[#FFC07C] bg-white/80 placeholder-[#FFC07C] outline-none focus:border-[#449C65] transition"
                      />
                      
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        type="text"
                        name="lastName"
                        placeholder="Last name*"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-full border-2 border-[#FFC07C] bg-white/80 placeholder-[#FFC07C] outline-none focus:border-[#449C65] transition"
                      />
                      
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        type="email"
                        name="email"
                        placeholder="Email*"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-full border-2 border-[#FFC07C] bg-white/80 placeholder-[#FFC07C] outline-none focus:border-[#449C65] transition"
                      />
                      
                      <div className="flex gap-3">
                        <motion.input
                          whileFocus={{ scale: 1.02 }}
                          type="tel"
                          name="phone"
                          placeholder="Phone*"
                          value={formData.phone}
                          onChange={handleChange}
                          className="flex-1 px-4 py-3 rounded-full border-2 border-[#FFC07C] bg-white/80 placeholder-[#FFC07C] outline-none focus:border-[#449C65] transition"
                        />
                        <motion.input
                          whileFocus={{ scale: 1.02 }}
                          type="date"
                          name="dateOfBirth"
                          value={formData.dateOfBirth}
                          onChange={handleChange}
                          className="flex-1 px-4 py-3 rounded-full border-2 border-[#FFC07C] bg-white/80 placeholder-[#FFC07C] outline-none focus:border-[#449C65] transition text-[#FFC07C]"
                        />
                      </div>
                      
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        type="text"
                        name="address"
                        placeholder="Address*"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-full border-2 border-[#FFC07C] bg-white/80 placeholder-[#FFC07C] outline-none focus:border-[#449C65] transition"
                      />
                      
                      <div className="flex gap-3">
                        <motion.input
                          whileFocus={{ scale: 1.02 }}
                          type="text"
                          name="city"
                          placeholder="City"
                          value={formData.city}
                          onChange={handleChange}
                          className="flex-1 px-4 py-3 rounded-full border-2 border-[#FFC07C] bg-white/80 placeholder-[#FFC07C] outline-none focus:border-[#449C65] transition"
                        />
                        <motion.input
                          whileFocus={{ scale: 1.02 }}
                          type="text"
                          name="province"
                          placeholder="Province/State"
                          value={formData.province}
                          onChange={handleChange}
                          className="flex-1 px-4 py-3 rounded-full border-2 border-[#FFC07C] bg-white/80 placeholder-[#FFC07C] outline-none focus:border-[#449C65] transition"
                        />
                      </div>
                      
                      <motion.textarea
                        whileFocus={{ scale: 1.02 }}
                        name="involvement"
                        placeholder="In what way are you getting involved?*"
                        value={formData.involvement}
                        onChange={handleChange}
                        rows="4"
                        className="w-full px-4 py-3 rounded-3xl border-2 border-[#FFC07C] bg-white/80 placeholder-[#FFC07C] outline-none focus:border-[#449C65] transition resize-none"
                      ></motion.textarea>
                      
                      <motion.button
                        onClick={handleSubmit}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full py-3 bg-[#449C65] hover:bg-[#3a8556] text-[#FFC07C] font-bold rounded-full shadow-lg transition-all"
                      >
                        Submit
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default About;