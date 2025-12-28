import api from './api';

const ADMIN_ID = '896697dd-a3a0-452f-b9ce-f82855c331b6';

const chatService = {
  // Gửi tin nhắn cho admin
  sendMessage: async (receiverId, message) => {
    try {
      const payload = {
        ReceiverId: receiverId,  // ← PascalCase
        Message: message,        // ← PascalCase, fix cao khả năng
      };

      // Log để debug
      console.log('Sending payload to /Chat/send:', JSON.stringify(payload, null, 2));

      const response = await api.post('/Chat/send', payload);
      return response.data;
    } catch (error) {
      console.error('Error sending message:', error.response?.data || error);
      throw error;
    }
  },

  // Gửi tin nhắn cho admin (helper function)
  sendMessageToAdmin: async (message) => {
    return chatService.sendMessage(ADMIN_ID, message);
  },

  // Lấy danh sách tin nhắn với một user
  getMessages: async (otherUserId) => {
    try {
      const response = await api.get('/Chat/messages', {
        params: { otherUserId }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw error.response?.data || error.message;
    }
  },

  // Lấy tin nhắn với admin
  getMessagesWithAdmin: async () => {
    return chatService.getMessages(ADMIN_ID);
  },

  // Lấy danh sách conversations
  getConversations: async () => {
    try {
      const response = await api.get('/Chat/conversations');
      return response.data;
    } catch (error) {
      console.error('Error fetching conversations:', error);
      throw error.response?.data || error.message;
    }
  },

  // Đánh dấu tin nhắn đã đọc
  markAsRead: async (messageId) => {
    try {
      const response = await api.post(`/Chat/mark-read/${messageId}`);
      return response.data;
    } catch (error) {
      console.error('Error marking message as read:', error);
      throw error.response?.data || error.message;
    }
  },

  // Lấy số lượng tin nhắn chưa đọc
  getUnreadCount: async () => {
    try {
      const response = await api.get('/Chat/unread-count');
      return response.data;
    } catch (error) {
      console.error('Error fetching unread count:', error);
      throw error.response?.data || error.message;
    }
  },
};

export default chatService;