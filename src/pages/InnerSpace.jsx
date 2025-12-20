import React, { useState } from "react";
import { motion } from "framer-motion";

const InnerSpace = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "hey, i'm glad you're here.", sender: "bot" },
    { id: 2, text: "you can share whatever's on your mind — no pressure, no judgment.", sender: "bot" },
    { id: 3, text: "this space is private, just between us.", sender: "bot" },
    { id: 4, text: "let's get started by how was your day?", sender: "bot", hasAvatar: true },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [showSharePrompt, setShowSharePrompt] = useState(false);

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    const newMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
    };

    setMessages([...messages, newMessage]);
    setInputValue("");

    // Simulate bot response after user message
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: "thank you for sharing. i'm here to listen.",
        sender: "bot",
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden pt-48 ">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/backgroundInner.png"
          alt="Inner Space Background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 px-6">
        {/* Chat Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative bg-white/40 backdrop-blur-xl rounded-[40px] border border-white/50 shadow-2xl p-8 md:p-12 min-h-[600px] flex flex-col max-w-5xl mx-auto"
        >
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto space-y-4 mb-6">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, x: message.sender === "bot" ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className={`flex items-start gap-3 ${
                  message.sender === "user" ? "flex-row-reverse" : ""
                }`}
              >
                {/* Avatar only for last bot message */}
                {message.hasAvatar && message.sender === "bot" && (
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100"
                      alt="Bot Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                {/* Message Bubble */}
                <div
                  className={`max-w-md px-6 py-3 rounded-3xl ${
                    message.sender === "bot"
                      ? "bg-white/90 text-gray-800"
                      : "bg-gradient-to-r from-blue-100 to-cyan-100 text-gray-800 ml-auto"
                  } shadow-md`}
                >
                  <p className="text-sm md:text-base leading-relaxed">{message.text}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Input Area */}
          <div className="flex items-center gap-3 bg-white/60 backdrop-blur-md rounded-full p-3 border border-white/60 shadow-lg">
            {/* Voice Button */}
            <button className="w-12 h-12 rounded-full bg-white/80 hover:bg-white transition flex items-center justify-center shadow-md">
              <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M7 4a3 3 0 016 0v6a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" />
              </svg>
            </button>

            {/* Image Upload Button */}
            <button className="w-12 h-12 rounded-full bg-white/80 hover:bg-white transition flex items-center justify-center shadow-md">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </button>

            {/* Text Input */}
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 bg-transparent border-none outline-none text-gray-800 placeholder-gray-500 text-sm md:text-base px-2"
            />

            {/* Send Button */}
            <button
              onClick={handleSendMessage}
              className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 hover:from-purple-500 hover:to-blue-500 transition flex items-center justify-center shadow-md"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Share Stories Section - Full Width */}
      <div className="relative z-10 mt-12" style={{background:'#9fc9f5'}}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="py-12 text-center max-w-5xl mx-auto px-6"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#449C65] mb-4">
            IS IT OKAY FOR ME TO SHARE YOUR STORIES?
          </h2>
          <div className="space-y-2 text-gray-700 text-sm md:text-base mb-8 max-w-3xl mx-auto">
            <p className="font-medium">only if you feel comfortable.</p>
            <p>
              some players choose to turn their conversations into short reflections — anonymous, gentle, and
            </p>
            <p>
              shared only with permission — so others can feel a little less alone on their own journey.
            </p>
            <p>if you'd like to add your voice to that collection, you're welcome to.</p>
            <p>and if not, that's completely okay too. 🌱</p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="px-8 py-3 bg-white/80 hover:bg-white backdrop-blur-md rounded-full text-gray-800 font-medium shadow-lg transition-all hover:scale-105">
              yes, go ahead!
            </button>
            <button className="px-8 py-3 bg-white/80 hover:bg-white backdrop-blur-md rounded-full text-gray-800 font-medium shadow-lg transition-all hover:scale-105">
              no, i prefer to keep it private
            </button>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default InnerSpace;