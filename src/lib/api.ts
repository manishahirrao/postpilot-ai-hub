import axios, { AxiosInstance } from 'axios';
import { supabase } from './supabaseClient';

// Define API base URL from environment variable or default to localhost:3001
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// Create axios instance with default config
const api: AxiosInstance = axios.create({
  baseURL: API_BASE,
  withCredentials: true, // Important for sending cookies
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  validateStatus: (status) => status < 500, // Don't throw on 4xx errors
});

// Ensure withCredentials is set for all requests
api.interceptors.request.use(config => {
  config.withCredentials = true;
  return config;
});

// Types

interface UploadResumeResponse {
  fileUrl: string;
}

interface UploadResumeError {
  error: string;
}

type UploadResumeResult = UploadResumeResponse | UploadResumeError;

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
  display_name: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  company?: string;
  job_title?: string;
  user_type?: 'content_creator' | 'job_seeker' | 'employer' | 'hr_agency';
  subscription_tier?: {
    tier_name: string;
    monthly_credits: number;
    max_credits: number;
    features: Record<string, any>;
  };
}

export interface DashboardData {
  user: {
    id: string;
    email: string;
    display_name: string;
    job_title?: string;
    company?: string;
    subscription_tier: string;
  };
  stats: {
    posts: number;
    jobs: number;
    credits: {
      balance: number;
      used: number;
      available: number;
    };
  };
  recent_jobs: Array<{
    job_id: string;
    title: string;
    company: string;
    status: string;
    created_at: string;
  }>;
  last_updated: string;
}

export interface AuthResponse {
  user?: {
    id: string;
    email: string;
    display_name: string;
    isNewUser?: boolean;
    isEmailVerified: boolean;
  };
  id?: string;
  email?: string;
  display_name?: string;
  isNewUser?: boolean;
  isEmailVerified?: boolean;
  token?: string;
  access_token?: string;
  refresh_token?: string;
  refreshToken?: string;
  error?: string;
  success?: boolean;
  redirectTo?: string;
}

// Function to get CSRF token with retry logic
const getCsrfToken = async (forceRefresh = false, retryCount = 0): Promise<string | null> => {
  const MAX_RETRIES = 2;
  
  try {
    // If not forcing refresh, try to get the token from cookies first
    if (!forceRefresh) {
      const cookieToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('XSRF-TOKEN='))
        ?.split('=')[1];
      
      if (cookieToken) {
        const decodedToken = decodeURIComponent(cookieToken);
        console.log('Using existing CSRF token from cookie');
        return decodedToken;
      }
    }
    
    // If forcing refresh or no token in cookies, fetch a new one
    console.log(forceRefresh ? 'Forcing refresh of CSRF token' : 'Fetching new CSRF token from server');
    const response = await axios.get(`${API_BASE}/api/csrf-token`, {
      withCredentials: true,
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
    
    if (response.data?.success && response.data.csrfToken) {
      console.log('Successfully retrieved CSRF token');
      return response.data.csrfToken;
    }
    
    throw new Error('Invalid CSRF token response');
  } catch (error) {
    console.error('Error getting CSRF token (attempt ' + (retryCount + 1) + '):', error);
    
    if (retryCount < MAX_RETRIES) {
      // Wait a bit before retrying
      await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1)));
      return getCsrfToken(forceRefresh, retryCount + 1);
    }
    
    return null;
  }
};

// Request interceptor to add CSRF token and handle headers
api.interceptors.request.use(
  async (config) => {
    // Skip CSRF token for GET requests and CSRF token endpoint
    if (config.method?.toLowerCase() === 'get' || config.url === '/api/csrf-token') {
      return config;
    }

    // Get CSRF token
    try {
      const token = await getCsrfToken();
      if (token) {
        // Set both headers that might be expected by the server
        config.headers['X-CSRF-Token'] = token;
        config.headers['X-XSRF-Token'] = token;
        
        // For FormData, append the CSRF token to the form data
        if (config.data instanceof FormData) {
          config.data.append('_csrf', token);
        } 
        // For regular JSON data, add it to the payload
        else if (config.data && typeof config.data === 'object') {
          config.data._csrf = token;
        }
      }
    } catch (error) {
      console.error('Failed to get CSRF token:', error);
      // Don't block the request, let the server handle missing CSRF
    }

    // Clean up headers that might cause CORS issues
    const headersToRemove = [
      'X-Requested-With',
      'expires',
      'pragma',
      'cache-control',
      'if-modified-since',
      'if-none-match'
    ];
    

    headersToRemove.forEach(header => {
      if (config.headers && header in config.headers) {
        delete config.headers[header];
      }
    });

    // Remove Content-Type for FormData requests
    if (config.data instanceof FormData) {
      delete config.headers?.['Content-Type'];
    }

    // Log request in development
    if (import.meta.env.DEV) {
      console.log('API Request:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        headers: config.headers,
        data: config.data,
      });
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // If we don't have the config or it's not a 403, reject
    if (!originalRequest) {
      return Promise.reject(error);
    }
    
    // Retry once if we get a 403 Forbidden (CSRF token might be invalid)
    if (error.response?.status === 403 && !(originalRequest as any)._retry) {
      (originalRequest as any)._retry = true;
      
      try {
        // Force refresh the CSRF token
        const newToken = await getCsrfToken(true);
        
        if (newToken) {
          // Update the original request headers with the new token
          originalRequest.headers = originalRequest.headers || {};
          originalRequest.headers['X-CSRF-Token'] = newToken;
          
          // Retry the original request with the new CSRF token
          return api(originalRequest);
        } else {
          throw new Error('Failed to get CSRF token');
        }
      } catch (refreshError) {
        console.error('Failed to refresh CSRF token:', refreshError);
        return Promise.reject(error);
      }
    }
    
    return Promise.reject(error);
  }
);

// Debug log environment variables in development
if (import.meta.env.DEV) {
  console.log('Environment variables:', import.meta.env);
  console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);
}

// Auth methods
const auth = {
  async register(userData: Record<string, any>): Promise<AuthResponse> {
    try {
      // Get CSRF token first
      const csrfToken = await getCsrfToken();
      
      // Add CSRF token to the request data
      const requestData = {
        ...userData,
        _csrf: csrfToken
      };
      
      const response = await api.post<AuthResponse>('/api/auth/register', requestData, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        withCredentials: true,
      });
      
      if (response.data.token) {
        localStorage.setItem('access_token', response.data.token);
        if (response.data.refreshToken) {
          localStorage.setItem('refresh_token', response.data.refreshToken);
        }
      }
      
      return response.data;
    } catch (error: any) {
      console.error('Registration error:', error);
      
      let errorMessage = 'Registration failed';
      if (error.response) {
        const errorData = error.response.data || {};
        errorMessage = typeof errorData === 'string' 
          ? errorData 
          : errorData.error || errorData.message || 'Registration failed';
      } else if (error.request) {
        errorMessage = 'No response from server. Please check your connection.';
      } else {
        errorMessage = error.message || 'Registration failed';
      }
      
      return {
        success: false,
        error: errorMessage,
        isNewUser: true
      };
    }
  },
  
  async uploadResume(formData: FormData): Promise<UploadResumeResult> {
    try {
      // Get CSRF token first
      const csrfToken = await getCsrfToken();
      
      // Ensure formData has the CSRF token
      if (csrfToken) {
        formData.append('_csrf', csrfToken);
      }
      
      const response = await api.post('/api/upload/resume', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
        },
        withCredentials: true,
      });
      
      return response.data;
    } catch (error: any) {
      console.error('Resume upload error:', error);
      const errorMessage = error.response?.data?.error || 
                         error.response?.data?.message || 
                         error.message || 
                         'Failed to upload resume';
      return { error: errorMessage };
    }
  },
  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      interface LoginResponse {
        access_token: string;
        refresh_token: string;
        user?: {
          id: string;
          email: string;
          display_name: string;
          isEmailVerified: boolean;
        };
        success?: boolean;
        error?: string;
      }

      const response = await api.post<LoginResponse>('/api/auth/login', { email, password });
      console.log('Login response:', response.data);
      
      if (response.data.access_token) {
        localStorage.setItem('access_token', response.data.access_token);
        if (response.data.refresh_token) {
          localStorage.setItem('refresh_token', response.data.refresh_token);
        }
        
        // Create a safe user object with default values
        const user = response.data.user || {
          id: '',
          email: email,
          display_name: email.split('@')[0],
          isEmailVerified: false
        };
        
        // Return the user data in the expected format
        const userData: AuthResponse = {
          success: true,
          user: {
            id: user.id,
            email: user.email,
            display_name: user.display_name,
            isNewUser: false,
            isEmailVerified: user.isEmailVerified
          },
          token: response.data.access_token,
          refreshToken: response.data.refresh_token
        };
        
        return userData;
      }
      
      // If we don't have an access token but the request was successful, return the data as is
      return {
        ...response.data,
        success: response.data.success || false,
        error: response.data.error
      };
    } catch (error: any) {
      console.error('Login error:', error);
      
      // Handle user not found cases
      const errorData = error.response?.data || {};
      const errorMessage = (typeof errorData === 'string' ? errorData : errorData.error || '').toLowerCase();
      const errorCode = (typeof errorData === 'object' && errorData.code) || error.response?.status;
      
      // For debugging
      console.log('Login error details:', {
        status: error.response?.status,
        code: errorCode,
        message: errorMessage,
        errorData: errorData,
        response: error.response
      });
      
      // Consider it a new user if we get a 401 with an email not found message
      // or if the error message indicates the user doesn't exist
      const isUserNotFound = 
        error.response?.status === 401 ||
        errorCode === 400 ||
        errorMessage.includes('user not found') ||
        errorMessage.includes('no user found') ||
        errorMessage.includes('invalid login') ||
        errorMessage.includes('email or password') ||
        errorMessage.includes('incorrect');
      
      if (isUserNotFound) {
        return {
          success: false,
          error: 'User not found. Please register first.',
          isNewUser: true,
          redirectTo: '/auth/register',
          email: email
        };
      }
      
      // Handle 401 as invalid credentials
      if (error.response?.status === 401) {
        return {
          success: false,
          error: 'Invalid credentials. Please check your email and password.',
          isNewUser: false
        };
      }
      
      // Handle other errors
      return {
        success: false,
        error: error.response?.data?.message || 'Login failed. Please try again.',
        isNewUser: false
      };
    }
  },

  async logout(): Promise<void> {
    try {
      await api.post('/api/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }
  },

  async validateSession(): Promise<AuthResponse> {
    try {
      const response = await api.get<AuthResponse>('/api/auth/session');
      return response.data;
    } catch (error) {
      console.error('Session validation error:', error);
      return { success: false, error: 'Session validation failed' };
    }
  },

  async registerProfile(profileData: {
    first_name: string;
    last_name: string;
    phone?: string;
    company?: string;
    job_title?: string;
  }): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/api/auth/complete-profile', profileData);
      return response.data;
    } catch (error: any) {
      console.error('Profile registration error:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Profile update failed'
      };
    }
  },

  async verifyEmail(token: string): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/api/auth/verify-email', { token });
      return response.data;
    } catch (error: any) {
      console.error('Email verification error:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Email verification failed'
      };
    }
  },

  async signInWithLinkedIn() {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'linkedin',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      return { data, error };
    } catch (error) {
      console.error('LinkedIn sign-in error:', error);
      return { error };
    }
  },

  async getProfile(): Promise<{ data: UserProfile }> {
    const response = await api.get<{ data: UserProfile }>('/api/auth/profile');
    return response.data;
  },
};

// Dashboard methods
const dashboard = {
  async getDashboardData(): Promise<{ data: DashboardData }> {
    const response = await api.get<{ data: DashboardData }>('/dashboard');
    return response.data;
  },

  async getProfile(): Promise<{ data: UserProfile }> {
    const response = await api.get<{ data: UserProfile }>('/profile');
    return response.data;
  },
};

// Export the API client with auth and dashboard methods
const apiClient = {
  ...api,
  auth,
  dashboard,
  supabase // Re-export supabase for backward compatibility
};

export { auth, dashboard, supabase };

export default apiClient;
