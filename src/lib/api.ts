import axios from 'axios';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key:', supabaseKey ? '***' + supabaseKey.slice(-4) : 'Not set');

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase configuration. Please check your environment variables.');
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  validateStatus: (status) => {
    return status >= 200 && status < 300; // default
  },
});

// Add a request interceptor to add the auth token
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const api = instance;

export const authApi = {
  supabase,
  signIn: async (credentials: { email: string; password: string }) => {
    const { data, error } = await supabase.auth.signInWithPassword(credentials);
    return { data, error };
  },
  signUp: async (userData: {
    email: string;
    password: string;
    account_type: string;
    fullName: string;
    profile: {
      full_name: string;
      headline?: string;
      bio?: string;
      location?: string;
      industry?: string;
      profile_picture?: string | null;
    };
  }) => {
    const { data, error } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
      options: {
        data: {
          account_type: userData.account_type,
          full_name: userData.fullName,
          ...userData.profile
        }
      }
    });
    return { data, error };
  },

  signup: async (data: {
    email: string;
    password: string;
    account_type: string;
    fullName: string;
    profile: {
      full_name: string;
      headline?: string;
      bio?: string;
      location?: string;
      industry?: string;
      profile_picture?: string | null;
    };
  }) => {
    try {
      const response = await api.post('/auth/signup', data);
      if (!response.data.success) {
        throw new Error(response.data.message || 'Registration failed');
      }
      return response.data;
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.message || error.response.data.error || 'Registration failed');
      }
      throw new Error('Failed to connect to server');
    }
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
