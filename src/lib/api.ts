import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add the auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  signup: async (email: string, password: string) => {
    const response = await api.post('/auth/signup', { email, password });
    return response.data;
  },
};

export const profileApi = {
  getProfile: async (userId: string) => {
    const response = await api.get(`/profiles/${userId}`);
    return response.data;
  },
  updateProfile: async (userId: string, data: any) => {
    const response = await api.put(`/profiles/${userId}`, data);
    return response.data;
  },
};

export const postApi = {
  getPosts: async () => {
    const response = await api.get('/posts');
    return response.data;
  },
  createPost: async (data: any) => {
    const response = await api.post('/posts', data);
    return response.data;
  },
  likePost: async (postId: string) => {
    const response = await api.post(`/posts/${postId}/like`);
    return response.data;
  },
};

export const connectionApi = {
  getConnection: async () => {
    const response = await api.get('/connections');
    return response.data;
  },
  createConnection: async (targetUserId: string) => {
    const response = await api.post('/connections', { targetUserId });
    return response.data;
  },
};
