import api from './api';
import Cookies from 'js-cookie';

const authService = {
  // Đăng ký
  register: async (userData) => {
    try {
      const response = await api.post('/Auth/register', {
        email: userData.email,
        password: userData.password,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phoneNumber: userData.phoneNumber || '',
      });
      
      // Lưu token và thông tin user vào cookies (hết hạn sau 7 ngày)
      if (response.data.token) {
        Cookies.set('token', response.data.token, { expires: 7, secure: true, sameSite: 'strict' });
        Cookies.set('user', JSON.stringify({
          userId: response.data.userId,
          email: response.data.email,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          roles: response.data.roles,
        }), { expires: 7, secure: true, sameSite: 'strict' });
      }
      
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Đăng nhập
  login: async (credentials) => {
    try {
      const response = await api.post('/Auth/login', {
        email: credentials.email,
        password: credentials.password,
      });
      
      // Lưu token và thông tin user vào cookies (hết hạn sau 7 ngày)
      if (response.data.token) {
        Cookies.set('token', response.data.token, { expires: 7, secure: true, sameSite: 'strict' });
        Cookies.set('user', JSON.stringify({
          userId: response.data.userId,
          email: response.data.email,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          roles: response.data.roles,
        }), { expires: 7, secure: true, sameSite: 'strict' });
      }
      
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Đăng xuất
  logout: () => {
    Cookies.remove('token');
    Cookies.remove('user');
  },

  // Lấy thông tin user từ cookies
  getCurrentUser: () => {
    const userStr = Cookies.get('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Kiểm tra đã đăng nhập chưa
  isAuthenticated: () => {
    return !!Cookies.get('token');
  },
};

export default authService;