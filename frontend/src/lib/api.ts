import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for auth token
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { data } = await axios.post(
          `${API_BASE_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        if (data.success) {
          localStorage.setItem('accessToken', data.data.accessToken);
          originalRequest.headers.Authorization = `Bearer ${data.data.accessToken}`;
          return api(originalRequest);
        }
      } catch {
        localStorage.removeItem('accessToken');
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      }
    }

    return Promise.reject(error);
  }
);

// Auth API
export const authApi = {
  sendOtp: (phone: string) => api.post('/auth/send-otp', { phone }),
  verifyOtp: (phone: string, otp: string) => api.post('/auth/verify-otp', { phone, otp }),
  register: (data: { phone: string; otp: string; name: string; email?: string }) =>
    api.post('/auth/register', data),
  refresh: () => api.post('/auth/refresh'),
  logout: () => api.post('/auth/logout'),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (data: any) => api.patch('/auth/profile', data),
  getMe: () => api.get('/auth/me'),
};

// Services API
export const servicesApi = {
  getCategories: () => api.get('/services/categories'),
  getServices: (params?: { category?: string; popular?: string; emergency?: string }) =>
    api.get('/services', { params }),
  getServiceBySlug: (slug: string) => api.get(`/services/${slug}`),
};

// Bookings API
export const bookingsApi = {
  create: (data: any) => api.post('/bookings', data),
  getAll: (params?: { status?: string; page?: number; limit?: number }) =>
    api.get('/bookings', { params }),
  getById: (id: string) => api.get(`/bookings/${id}`),
  cancel: (id: string, reason?: string) => api.post(`/bookings/${id}/cancel`, { reason }),
  updateStatus: (id: string, data: any) => api.put(`/bookings/${id}/status`, data),
  createReview: (data: { bookingId: string; rating: number; comment?: string }) =>
    api.post('/bookings/review', data),
};

// Admin API
export const adminApi = {
  getDashboard: () => api.get('/admin/dashboard'),
  getBookings: (params?: any) => api.get('/admin/bookings', { params }),
  getCustomers: (params?: any) => api.get('/admin/customers', { params }),
  getTechnicians: () => api.get('/admin/technicians'),
  getRevenue: (params?: { from?: string; to?: string }) => api.get('/admin/revenue', { params }),
  getCoupons: () => api.get('/admin/coupons'),
  createCoupon: (data: any) => api.post('/admin/coupons', data),
  updateCoupon: (id: string, data: any) => api.put(`/admin/coupons/${id}`, data),
};

// Public API
export const publicApi = {
  getBlogs: (params?: { page?: number; limit?: number; category?: string }) =>
    api.get('/blogs', { params }),
  getBlogBySlug: (slug: string) => api.get(`/blogs/${slug}`),
  getFaqs: () => api.get('/faqs'),
  getReviews: () => api.get('/reviews'),
  getCities: () => api.get('/cities'),
  checkPincode: (pincode: string) => api.get(`/check-pincode/${pincode}`),
  getBanners: () => api.get('/banners'),
};

export default api;