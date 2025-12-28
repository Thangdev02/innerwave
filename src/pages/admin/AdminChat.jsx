import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import chatService from "../../services/chatService";

const AdminChat = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load conversations khi component mount
  useEffect(() => {
    loadConversations();
    loadUnreadCount();

    // Polling mỗi 5 giây
    const interval = setInterval(() => {
      loadConversations();
      loadUnreadCount();
      if (selectedUser) {
        loadMessages(selectedUser.userId);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [selectedUser]);

  // Load danh sách conversations
  const loadConversations = async () => {
    try {
      const data = await chatService.getConversations();
      console.log("Conversations data:", data); // Debug
      
      // Kiểm tra nếu data là array
      if (Array.isArray(data)) {
        setConversations(data);
      } else {
        console.error("Conversations data is not an array:", data);
        setConversations([]);
      }
    } catch (error) {
      console.error("Failed to load conversations:", error);
      setConversations([]);
    } finally {
      setLoading(false);
    }
  };

  // Load số tin nhắn chưa đọc
  const loadUnreadCount = async () => {
    try {
      const data = await chatService.getUnreadCount();
      console.log("Unread count data:", data); // Debug
      
      // API trả về object {count: number}
      const count = data?.count || 0;
      setUnreadCount(count);
    } catch (error) {
      console.error("Failed to load unread count:", error);
      setUnreadCount(0);
    }
  };

  // Load tin nhắn với user cụ thể
  const loadMessages = async (userId) => {
    try {
      const data = await chatService.getMessages(userId);
      console.log("Messages data:", data); // Debug
      
      // Kiểm tra nếu data là array
      if (!Array.isArray(data)) {
        console.error("Messages data is not an array:", data);
        setMessages([]);
        return;
      }
      
      // Map theo ChatMessageDto structure
      const formattedMessages = data.map((msg) => ({
        id: msg.id,
        text: msg.message, // message field từ DTO
        sender: msg.isFromAdmin ? "admin" : "user",
        timestamp: msg.sentAt,
        isRead: msg.isRead,
        senderName: msg.senderName,
        receiverName: msg.receiverName,
      }));

      setMessages(formattedMessages);
    } catch (error) {
      console.error("Failed to load messages:", error);
      setMessages([]);
    }
  };

  // Chọn user để chat
  const handleSelectUser = (user) => {
    setSelectedUser(user);
    loadMessages(user.userId);
    
    // Đánh dấu đã đọc tin nhắn của user này
    if (user.lastMessageId) {
      chatService.markAsRead(user.lastMessageId).catch(console.error);
    }
  };

  // Gửi tin nhắn
  const handleSendMessage = async () => {
    if (inputValue.trim() === "" || sending || !selectedUser) return;

    const tempMessage = {
      id: Date.now(),
      text: inputValue,
      sender: "admin",
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, tempMessage]);
    setInputValue("");
    setSending(true);

    try {
      await chatService.sendMessage(selectedUser.userId, inputValue);
      
      setTimeout(() => {
        loadMessages(selectedUser.userId);
        loadConversations();
      }, 500);
    } catch (error) {
      console.error("Failed to send message:", error);
      alert("Không thể gửi tin nhắn. Vui lòng thử lại.");
      setMessages((prev) => prev.filter((msg) => msg.id !== tempMessage.id));
    } finally {
      setSending(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Format thời gian
  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
    }
    return date.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Admin Chat Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-red-100 px-4 py-2 rounded-full">
              <span className="text-red-600 font-semibold">Unread:</span>
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                {unreadCount}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-12 gap-6 h-[calc(100vh-140px)]">
          {/* Sidebar - Danh sách conversations */}
          <div className="col-span-4 bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col">
            <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-500">
              <h2 className="text-white font-bold text-lg">
                Conversations ({conversations.length})
              </h2>
            </div>

            <div className="flex-1 overflow-y-auto">
              {conversations.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <p>Chưa có cuộc trò chuyện nào</p>
                </div>
              ) : (
                conversations.map((conv, index) => {
                  // Extract properties from conversation DTO
                  const userId = conv.userId;
                  const userName = conv.userName || "Unknown User";
                  // lastMessage là object, cần lấy message property
                  const lastMsg = conv.lastMessage?.message || "No messages yet";
                  const lastTime = conv.lastMessageAt;
                  const unread = conv.unreadCount || 0;
                  const lastMessageId = conv.lastMessage?.id;
                  
                  return (
                    <motion.div
                      key={userId}
                      onClick={() => handleSelectUser({
                        userId,
                        otherUserName: userName,
                        lastMessageId
                      })}
                      whileHover={{ scale: 1.02 }}
                      className={`p-4 border-b border-gray-100 cursor-pointer transition-all ${
                        selectedUser?.userId === userId
                          ? "bg-blue-50 border-l-4 border-l-blue-500"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {/* Avatar */}
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center text-white font-bold flex-shrink-0">
                          {userName?.charAt(0).toUpperCase() || "U"}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-semibold text-gray-800 truncate">
                              {userName}
                            </h3>
                            <span className="text-xs text-gray-500">
                              {formatTime(lastTime)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-600 truncate">
                              {lastMsg}
                            </p>
                            {unread > 0 && (
                              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold ml-2">
                                {unread}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className="col-span-8 bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col">
            {selectedUser ? (
              <>
                {/* Chat Header */}
                <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-500 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold">
                    {selectedUser.otherUserName?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <div>
                    <h3 className="text-white font-bold">
                      {selectedUser.otherUserName || "Unknown User"}
                    </h3>
                    <p className="text-white/80 text-sm">Active now</p>
                  </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${
                        message.sender === "admin" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-md px-4 py-3 rounded-2xl ${
                          message.sender === "admin"
                            ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                            : "bg-white text-gray-800 shadow-md"
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{message.text}</p>
                        <span
                          className={`text-xs mt-1 block ${
                            message.sender === "admin" ? "text-white/70" : "text-gray-500"
                          }`}
                        >
                          {formatTime(message.timestamp)}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-gray-200">
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      disabled={sending}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-full outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:opacity-50"
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={sending || inputValue.trim() === ""}
                      className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition flex items-center justify-center shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {sending ? (
                        <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                      ) : (
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center bg-gray-50">
                <div className="text-center">
                  <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    Chọn một cuộc trò chuyện
                  </h3>
                  <p className="text-gray-500">
                    Chọn người dùng từ danh sách bên trái để bắt đầu chat
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminChat;