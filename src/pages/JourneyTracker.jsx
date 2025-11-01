"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { format, startOfWeek, addDays, parseISO } from "date-fns";

export default function JourneyTracker() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [journalEntry, setJournalEntry] = useState("");

  // Lấy danh sách ngày trong tuần từ selectedDate
  const start = startOfWeek(selectedDate, { weekStartsOn: 1 }); // Monday
  const daysOfWeek = Array.from({ length: 7 }, (_, i) => addDays(start, i));

  const currentDay = format(selectedDate, "EEEE");
  const todayStr = format(selectedDate, "MM/dd/yyyy");

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#fff8f0] to-[#f9eed4]">
      {/* ===================== TOP SECTION ===================== */}
      <section className="relative w-full pt-24 pb-20 px-8 overflow-hidden" style={{ height: "1024px" }}>
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-no-repeat bg-center"
          style={{
            backgroundImage: "url('./sunbg.png')",
            backgroundSize: "cover",
          }}
        />
        <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]"/>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ height:'70vh' }}
          className="relative mt-24 z-10 max-w-6xl mx-auto flex gap-12 bg-white/20 backdrop-blur-md rounded-[40px] p-10 shadow-xl border border-white/40"
        >
          {/* ========== Left Panel ========== */}
          <div className="flex-1 space-y-6">
            {/* Category Select */}
            <div>
              <label className="block text-[#6b5e4e] text-sm font-medium mb-2">Select</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-[#e1d39a] text-[#3b3426] font-semibold rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2f7041]/50 shadow-sm"
              >
                <option value="">Select</option>
                <option>School</option>
                <option>Work</option>
                <option>Personal</option>
              </select>
            </div>

            {/* Date & Mood */}
            <div className="bg-[#faf8f5]/80 rounded-3xl shadow-inner p-6 space-y-4 border border-[#e5decf]/50">
              <p
                className="text-[#2b261d] font-semibold cursor-pointer hover:text-[#2f7041]"
                onClick={() => setShowPicker(!showPicker)}
              >
                Today, {todayStr}
              </p>

              {showPicker && (
                <input
                  type="date"
                  className="mt-2 bg-white border border-[#ccc] rounded-lg px-3 py-2 text-sm"
                  value={format(selectedDate, "yyyy-MM-dd")}
                  onChange={(e) => {
                    setSelectedDate(parseISO(e.target.value));
                    setShowPicker(false);
                  }}
                />
              )}

              <div className="space-y-3">
                {["Good", "Okay", "Bad"].map((mood) => (
                  <label key={mood} className="flex items-center gap-3 cursor-pointer hover:opacity-80">
                    <input
                      type="radio"
                      name="mood"
                      className="w-4 h-4 accent-[#2f7041] border-[#c7bca3] focus:ring-[#2f7041]"
                    />
                    <span className="text-[#3b3426] text-sm">{mood}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* ========== Right Panel (Weekly Calendar) ========== */}
          <div className="flex-1 pt-6 relative">
            {/* 🟥 Vertical divider - tô đỏ cho bạn dễ tìm */}
            <div
              className="absolute  top-6 bottom-6 w-1 rounded-full"
              style={{ background: "#f2e0b9", left: "38%", transform: "translateX(-50%)" }}
              aria-hidden
            />

            {/* Calendar rows */}
            <div className="flex flex-col justify-between h-[420px] space-y-6 relative">
              {daysOfWeek.map((date) => {
                const day = format(date, "EEEE");
                const isToday = day === currentDay;
                return (
                  <div key={day} className="relative flex items-center" style={{ minHeight: "48px" }}>
                    <span
                      className={`w-24 text-sm select-none ${
                        isToday ? "text-[#2f7041] font-semibold" : "text-[#d1c6a8]"
                      }`}
                    >
                      {day} ({format(date, "MM/dd")})
                    </span>

                    <div className="flex items-center flex-1 ml-4">
                      <div className="w-8" />
                      <div
                        className={`flex-1 h-[6px] rounded-sm ${
                          isToday ? "bg-[#e8f1e6]/90" : "bg-[#f1e0b8]"
                        }`}
                        style={{
                          boxShadow: isToday ? "0 2px 0 rgba(47,112,65,0.15) inset" : "none",
                          height: "6px",
                        }}
                      />
                    </div>

                    {isToday && selectedCategory && (
                      <div className="absolute right-6">
                        <button
                          onClick={() => {
                            const cloudEl = document.querySelector("#cloud-write");
                            if (cloudEl) cloudEl.scrollIntoView({ behavior: "smooth", block: "center" });
                          }}
                          className="px-4 py-2 bg-[#2f7041] text-white rounded-full text-sm shadow-md hover:scale-105 transition-transform"
                           style={{marginTop: "40%"}}
                        >
                          Write Today’s Journal
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </section>

      {/* CLOUD SECTION giữ nguyên */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        viewport={{ once: true }}
        className="relative mt-20 flex justify-center pb-24"
      >
        <div className="relative">
          <img src="./cloud.png" alt="Cloud" className="w-full h-full object-cover" />
          <div
            id="cloud-write"
            className="absolute inset-0 flex flex-col items-center justify-center px-16 text-center"
            style={{ top: "30%" }}
          >
            <h2 className="text-[#2f7041] text-2xl font-bold mb-3">HOW WAS YOUR DAY?</h2>
            <p className="text-[#6b5e4e] text-sm italic mb-4 leading-relaxed">
              write anonymous letters or have a private chat with the project's founder.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              className=" max-w-3xl mx-auto"
            >
              <textarea
                value={journalEntry}
                onChange={(e) => setJournalEntry(e.target.value)}
                placeholder="Write your thoughts here..."
                style={{ width: "580px", height: "300px" }}
                className=" p-6 bg-white rounded-3xl shadow-inner border border-[#d4bca8]/30 focus:outline-none focus:ring-2 focus:ring-[#2f7041]/50 resize-none text-[#6b5e4e] placeholder:text-[#d1bda0]/70"
              />
            </motion.div>

            <button className="mt-6 px-8 py-3 bg-[#2f7041] text-white font-medium rounded-full shadow-md hover:shadow-lg transition-all hover:scale-105">
              Open up
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
