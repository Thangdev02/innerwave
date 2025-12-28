import api from './api';

const orderService = {
  // Tạo order mới
  createOrder: async (orderData) => {
    try {
      const response = await api.post('/Orders', {
        firstName: orderData.firstName,
        lastName: orderData.lastName,
        email: orderData.email,
        phone: orderData.phone,
        address: orderData.address,
        city: orderData.city,
        province: orderData.provinceState, // Map từ provinceState sang province
        dateOfBirth: orderData.dateOfBirth,
        involvement: orderData.involvement || '',
      });
      return response.data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error.response?.data || error.message;
    }
  },

  // Lấy tất cả orders (cần authentication - admin only)
  getAllOrders: async () => {
    try {
      const response = await api.get('/Orders');
      return response.data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error.response?.data || error.message;
    }
  },

  // Lấy order theo ID (cần authentication)
  getOrderById: async (id) => {
    try {
      const response = await api.get(`/Orders/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching order:', error);
      throw error.response?.data || error.message;
    }
  },

  // Cập nhật order (cần authentication)
  updateOrder: async (id, orderData) => {
    try {
      const response = await api.put(`/Orders/${id}`, orderData);
      return response.data;
    } catch (error) {
      console.error('Error updating order:', error);
      throw error.response?.data || error.message;
    }
  },

  // Xóa order (cần authentication)
  deleteOrder: async (id) => {
    try {
      const response = await api.delete(`/Orders/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting order:', error);
      throw error.response?.data || error.message;
    }
  },
};

export default orderService;