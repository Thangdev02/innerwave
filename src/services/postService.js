import api from './api';

const postService = {
  // Lấy tất cả posts
  getAllPosts: async (includeUnpublished = false) => {
    try {
      const response = await api.get('/Posts', {
        params: { includeUnpublished }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error.response?.data || error.message;
    }
  },

  // Lấy post theo ID
  getPostById: async (id) => {
    try {
      const response = await api.get(`/Posts/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching post:', error);
      throw error.response?.data || error.message;
    }
  },

  // Tạo post mới (cần authentication)
  createPost: async (postData) => {
    try {
      const response = await api.post('/Posts', postData);
      return response.data;
    } catch (error) {
      console.error('Error creating post:', error);
      throw error.response?.data || error.message;
    }
  },

  // Cập nhật post (cần authentication)
  updatePost: async (id, postData) => {
    try {
      const response = await api.put(`/Posts/${id}`, postData);
      return response.data;
    } catch (error) {
      console.error('Error updating post:', error);
      throw error.response?.data || error.message;
    }
  },

  // Xóa post (cần authentication)
  deletePost: async (id) => {
    try {
      const response = await api.delete(`/Posts/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting post:', error);
      throw error.response?.data || error.message;
    }
  },

  // Tăng view count
  // TODO: Kiểm tra endpoint chính xác từ API documentation
  incrementViewCount: async (id) => {
    try {
      // Thử các endpoint có thể có:
      // Option 1: const response = await api.post(`/Posts/${id}/view`);
      // Option 2: const response = await api.patch(`/Posts/${id}/view`);
      // Option 3: const response = await api.put(`/Posts/${id}/increment-view`);
      
      // Tạm thời skip nếu không có endpoint
      console.warn('View count increment skipped - endpoint not configured');
      return null;
    } catch (error) {
      console.error('Error incrementing view count:', error);
      // Không throw error để không block việc load post
      return null;
    }
  },

  // Publish/unpublish post (cần authentication)
  togglePublishStatus: async (id, isPublished) => {
    try {
      const response = await api.patch(`/Posts/${id}/publish`, { isPublished });
      return response.data;
    } catch (error) {
      console.error('Error toggling publish status:', error);
      throw error.response?.data || error.message;
    }
  }
};

export default postService;