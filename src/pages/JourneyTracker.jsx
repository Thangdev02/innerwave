import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import journeyTaskService from "../services/journeyTaskService";

export default function JourneyTracker() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showRangePicker, setShowRangePicker] = useState(false);
  const [tasks, setTasks] = useState({});
  const [dailyMood, setDailyMood] = useState({});
  const [journalEntry, setJournalEntry] = useState("");
  const [newTaskText, setNewTaskText] = useState("");
  const [showAddTask, setShowAddTask] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);

  const dateKey = selectedDate.toDateString();
  const todayTasks = tasks[dateKey] || [];

  // Load tasks khi component mount hoặc khi đổi ngày
  useEffect(() => {
    loadTasks();
  }, [selectedDate]);

  // Load tasks từ API
  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await journeyTaskService.getUserTasks();
      
      // Group tasks by date
      const groupedTasks = {};
      data.forEach((task) => {
        const taskDate = new Date(task.date).toDateString();
        if (!groupedTasks[taskDate]) {
          groupedTasks[taskDate] = [];
        }
        groupedTasks[taskDate].push({
          id: task.id,
          text: task.title,
          description: task.description,
          completed: task.isCompleted,
          createdAt: task.createdAt,
          completedAt: task.completedAt,
        });
      });

      setTasks(groupedTasks);
    } catch (error) {
      console.error("Failed to load tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle date selection
  const handleDateSelect = (dateStr) => {
    const newDate = new Date(dateStr);
    setSelectedDate(newDate);
    setStartDate(null);
    setEndDate(null);
    setShowDatePicker(false);
  };

  // Handle range selection
  const handleRangeSelect = () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates");
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

    if (diffDays > 6) {
      alert("Maximum 7 days range allowed!");
      return;
    }

    if (diffDays < 0) {
      alert("End date must be after start date!");
      return;
    }

    setSelectedDate(start);
    setShowRangePicker(false);
  };

  // Toggle task completion
  const toggleTask = async (taskId) => {
    try {
      await journeyTaskService.toggleTaskCompletion(taskId);
      
      // Update local state
      setTasks(prev => ({
        ...prev,
        [dateKey]: (prev[dateKey] || []).map(task =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        )
      }));
    } catch (error) {
      console.error("Failed to toggle task:", error);
      alert("Không thể cập nhật task. Vui lòng thử lại.");
    }
  };

  // Add new task
  const addTask = async () => {
    if (!newTaskText.trim()) return;
    if (todayTasks.length >= 3) {
      alert("You can only add 3 tasks per day!");
      return;
    }

    try {
      const newTask = await journeyTaskService.createTask({
        date: selectedDate.toISOString(),
        title: newTaskText,
        description: null,
      });

      // Update local state
      setTasks(prev => ({
        ...prev,
        [dateKey]: [
          ...(prev[dateKey] || []),
          {
            id: newTask.id,
            text: newTask.title,
            description: newTask.description,
            completed: newTask.isCompleted,
            createdAt: newTask.createdAt,
            completedAt: newTask.completedAt,
          }
        ]
      }));

      setNewTaskText("");
      setShowAddTask(false);
    } catch (error) {
      console.error("Failed to create task:", error);
      alert("Không thể tạo task. Vui lòng thử lại.");
    }
  };

  // Delete task
  const deleteTask = async (taskId) => {
    try {
      await journeyTaskService.deleteTask(taskId);
      
      // Update local state
      setTasks(prev => ({
        ...prev,
        [dateKey]: (prev[dateKey] || []).filter(task => task.id !== taskId)
      }));
    } catch (error) {
      console.error("Failed to delete task:", error);
      alert("Không thể xóa task. Vui lòng thử lại.");
    }
  };

  const setMood = (mood) => {
    setDailyMood(prev => ({
      ...prev,
      [dateKey]: mood
    }));
  };

  // Get week days - based on range or selected date
  const getWeekDays = () => {
    if (startDate && endDate) {
      const days = [];
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
      
      for (let i = 0; i < Math.min(diffDays, 7); i++) {
        const day = new Date(start);
        day.setDate(start.getDate() + i);
        days.push(day);
      }
      return days;
    } else {
      const days = [];
      const dayOfWeek = selectedDate.getDay();
      const monday = new Date(selectedDate);
      monday.setDate(selectedDate.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
      
      for (let i = 0; i < 7; i++) {
        const day = new Date(monday);
        day.setDate(monday.getDate() + i);
        days.push(day);
      }
      return days;
    }
  };

  const daysOfWeek = getWeekDays();

  const formatDate = (date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return {
      dayName: days[date.getDay()],
      dayShort: days[date.getDay()].slice(0, 3),
      month: months[date.getMonth()],
      date: date.getDate(),
      fullDate: `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
    };
  };

  const isSameDay = (d1, d2) => {
    return d1.toDateString() === d2.toDateString();
  };

  const completedCount = todayTasks.filter(t => t.completed).length;
  const currentDay = formatDate(selectedDate).dayName;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#fff8f0] to-[#f9eed4]">
        <div className="text-xl text-[#6b5e4e]">Loading your journey...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#fff8f0] to-[#f9eed4]">
      {/* TOP SECTION */}
      <section className="relative w-full pt-24 pb-20 px-8 overflow-hidden" style={{ minHeight: "900px" }}>
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
          className="relative mt-24 z-10 max-w-6xl mx-auto flex gap-12 bg-white/20 backdrop-blur-md rounded-[40px] p-10 shadow-xl border border-white/40"
        >
          {/* Left Panel */}
          <div className="flex-1 space-y-6">
            {/* Category Select */}
            <div>
              <label className="block text-[#6b5e4e] text-sm font-medium mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-[#e1d39a] text-[#3b3426] font-semibold rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2f7041]/50 shadow-sm"
              >
                <option value="">Select Category</option>
                <option>School</option>
                <option>Work</option>
                <option>Personal</option>
              </select>
            </div>

            {/* Date & Mood */}
            <div className="bg-[#faf8f5]/80 rounded-3xl shadow-inner p-6 space-y-4 border border-[#e5decf]/50">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-[#2b261d] font-semibold">
                    {formatDate(selectedDate).fullDate}
                  </p>
                  <button
                    onClick={() => setShowDatePicker(!showDatePicker)}
                    className="text-[#2f7041] text-xs hover:underline"
                  >
                    Change
                  </button>
                </div>

                {/* Single Date Picker */}
                {showDatePicker && (
                  <div className="space-y-2">
                    <input
                      type="date"
                      onChange={(e) => handleDateSelect(e.target.value)}
                      className="w-full bg-white border border-[#e5decf] rounded-lg px-3 py-2 text-sm focus:border-[#2f7041] focus:outline-none"
                    />
                    <button
                      onClick={() => setShowRangePicker(!showRangePicker)}
                      className="text-xs text-[#2f7041] hover:underline"
                    >
                      Or select date range →
                    </button>
                  </div>
                )}

                {/* Range Picker */}
                {showRangePicker && (
                  <div className="space-y-3 p-3 bg-white/50 rounded-lg">
                    <div>
                      <label className="text-xs text-[#6b5e4e]">From:</label>
                      <input
                        type="date"
                        value={startDate || ""}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full bg-white border border-[#e5decf] rounded-lg px-3 py-2 text-sm focus:border-[#2f7041] focus:outline-none mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-[#6b5e4e]">To: (max 7 days)</label>
                      <input
                        type="date"
                        value={endDate || ""}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full bg-white border border-[#e5decf] rounded-lg px-3 py-2 text-sm focus:border-[#2f7041] focus:outline-none mt-1"
                      />
                    </div>
                    <button
                      onClick={handleRangeSelect}
                      className="w-full px-4 py-2 bg-[#2f7041] text-white rounded-full text-sm hover:bg-[#245a32] transition"
                    >
                      Apply Range
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-3 pt-2">
                <p className="text-xs text-[#6b5e4e] font-medium">How are you feeling?</p>
                {[
                  { value: "good", label: "Good", emoji: "😊" },
                  { value: "okay", label: "Okay", emoji: "😐" },
                  { value: "bad", label: "Bad", emoji: "😔" }
                ].map((mood) => (
                  <label key={mood.value} className="flex items-center gap-3 cursor-pointer hover:opacity-80">
                    <input
                      type="radio"
                      name="mood"
                      checked={dailyMood[dateKey] === mood.value}
                      onChange={() => setMood(mood.value)}
                      className="w-4 h-4 accent-[#2f7041] border-[#c7bca3] focus:ring-[#2f7041]"
                    />
                    <span className="text-[#3b3426] text-sm flex items-center gap-2">
                      <span>{mood.emoji}</span> {mood.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Tasks Section */}
            <div className="bg-[#faf8f5]/80 rounded-3xl shadow-inner p-6 space-y-4 border border-[#e5decf]/50">
              <div className="flex items-center justify-between">
                <p className="text-[#2b261d] font-semibold">Today's Tasks ({todayTasks.length}/3)</p>
                {todayTasks.length < 3 && (
                  <button
                    onClick={() => setShowAddTask(!showAddTask)}
                    className="text-[#2f7041] hover:text-[#245a32] text-xl font-bold"
                  >
                    +
                  </button>
                )}
              </div>

              {/* Add Task Input */}
              {showAddTask && (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTaskText}
                    onChange={(e) => setNewTaskText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTask()}
                    placeholder="Enter task..."
                    className="flex-1 px-4 py-2 rounded-full border-2 border-[#e5decf] focus:border-[#2f7041] focus:outline-none text-sm"
                  />
                  <button
                    onClick={addTask}
                    className="px-4 py-2 bg-[#2f7041] text-white rounded-full text-sm hover:bg-[#245a32] transition"
                  >
                    Add
                  </button>
                </div>
              )}

              {/* Task List */}
              <div className="space-y-2">
                {todayTasks.map((task) => (
                  <div
                    key={task.id}
                    className={`flex items-center gap-3 p-3 rounded-2xl transition-all ${
                      task.completed ? 'bg-[#e8f1e6]' : 'bg-white/70'
                    }`}
                  >
                    <button
                      onClick={() => toggleTask(task.id)}
                      className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        task.completed
                          ? 'bg-[#2f7041] border-[#2f7041]'
                          : 'border-[#d1bda0] hover:border-[#2f7041]'
                      }`}
                    >
                      {task.completed && (
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                    <span
                      className={`flex-1 text-sm ${
                        task.completed ? 'text-[#2f7041] line-through opacity-70' : 'text-[#3b3426]'
                      }`}
                    >
                      {task.text}
                    </span>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-red-400 hover:text-red-600 text-xs"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel (Weekly Calendar) */}
          <div className="flex-1 pt-6 relative">
            {/* Header */}
            <div className="mb-4">
              <p className="text-sm text-[#6b5e4e] font-medium">
                {startDate && endDate ? (
                  <>Viewing: {formatDate(new Date(startDate)).fullDate} - {formatDate(new Date(endDate)).fullDate}</>
                ) : (
                  <>This Week</>
                )}
              </p>
            </div>

            {/* Vertical divider */}
            <div
              className="absolute top-16 bottom-6 w-1 rounded-full"
              style={{ background: "#f2e0b9", left: "38%", transform: "translateX(-50%)" }}
            />

            {/* Calendar rows */}
            <div className="flex flex-col justify-between h-[520px] space-y-6 relative">
              {daysOfWeek.map((date) => {
                const { dayName, fullDate } = formatDate(date);
                const isToday = dayName === currentDay;
                const dayKey = date.toDateString();
                const dayTasks = tasks[dayKey] || [];
                const dayCompleted = dayTasks.filter(t => t.completed).length;

                return (
                  <div key={dayName} className="relative flex items-center" style={{ minHeight: "48px" }}>
                    <span
                      className={`w-32 text-sm select-none ${
                        isToday ? "text-[#2f7041] font-semibold" : "text-[#d1c6a8]"
                      }`}
                    >
                      {dayName} ({fullDate})
                    </span>

                    <div className="flex items-center flex-1 ml-4">
                      <div className="w-8" />
                      <div
                        className={`flex-1 h-[6px] rounded-sm relative ${
                          isToday ? "bg-[#e8f1e6]/90" : "bg-[#f1e0b8]"
                        }`}
                        style={{
                          boxShadow: isToday ? "0 2px 0 rgba(47,112,65,0.15) inset" : "none",
                        }}
                      >
                        {/* Progress dots */}
                        {dayTasks.length > 0 && (
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex gap-1.5">
                            {dayTasks.map((task, i) => (
                              <div
                                key={i}
                                className={`w-2 h-2 rounded-full ${
                                  task.completed ? 'bg-[#2f7041]' : 'bg-white border border-[#2f7041]'
                                }`}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {isToday && selectedCategory && todayTasks.length > 0 && (
                      <div className="absolute right-6">
                        <button
                          onClick={() => {
                            const cloudEl = document.querySelector("#cloud-write");
                            if (cloudEl) cloudEl.scrollIntoView({ behavior: "smooth", block: "center" });
                          }}
                          className="px-4 py-2 bg-[#2f7041] text-white rounded-full text-sm shadow-md hover:scale-105 transition-transform"
                        >
                          Write Today's Journal
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

      {/* CLOUD SECTION */}
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
              className="max-w-3xl mx-auto"
            >
              <textarea
                value={journalEntry}
                onChange={(e) => setJournalEntry(e.target.value)}
                placeholder="Write your thoughts here..."
                style={{ width: "580px", height: "300px" }}
                className="p-6 bg-white rounded-3xl shadow-inner border border-[#d4bca8]/30 focus:outline-none focus:ring-2 focus:ring-[#2f7041]/50 resize-none text-[#6b5e4e] placeholder:text-[#d1bda0]/70"
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