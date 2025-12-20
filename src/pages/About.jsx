import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <main className="min-h-screen relative overflow-hidden pt-48">
      <div className="absolute inset-0 z-0">
        <img
          src="/backgroundAbout.png"
          alt="About Background"
          className="w-full h-full object-cover"
        />
      </div>

     

      <section className="relative z-10 max-w-7xl mx-auto px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/10 backdrop-blur-2xl rounded-[50px] shadow-2xl p-16 flex flex-col md:flex-row gap-16 items-center"
        >
          {/* Avatar Image */}
          <div className="flex-shrink-0">
            <div className="w-72 h-96 rounded-[30px] overflow-hidden border-8 border-white/80 shadow-xl bg-pink-100">
              <img
                src="/avatar.png"
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Text Content */}
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

      {/* InnerWave Section */}
      <section className="relative z-10 bg-[#fbafaf] backdrop-blur-md py-20 px-8 mt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-5xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold text-[#449C65] mb-10 flex items-center justify-center gap-3">
            ✨ InnerWave – Where Your Healing Journey Begins
          </h2>
          
          <div className="space-y-5 text-gray-800 leading-relaxed text-base mb-10">
            <p>
              innerwave is a mindful board game designed to support individuals living with bipolar disorder and anyone seeking emotional balance. expanding beyond the card experience, innerwave's website becomes a safe digital space where players can track their progress, reflect on their emotions, and share personal stories without fear of judgment.
            </p>
            <p className="font-semibold">
              this platform is more than a companion to the game — it's a community.
            </p>
            <p>here, you can:</p>
            <p>• journal your feelings and mark your daily progress with reward tokens</p>
            <p>• share your story through personal blog entries</p>
            <p>• open up anonymously via a safe, private chatbox</p>
            <p className="mt-6">
              innerwave reminds you that emotional waves are natural — and you never have to face them alone.
            </p>
          </div>

          <button className="px-12 py-4 bg-teal-400 hover:bg-teal-500 text-white font-bold rounded-full shadow-xl transition-all hover:scale-105 text-lg">
            Collaborate with me
          </button>
        </motion.div>
      </section>
    </main>
  );
};

export default About;