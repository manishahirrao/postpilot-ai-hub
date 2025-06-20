import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface User {
  id: string;
  email: string;
  account_type: 'personal' | 'company';
  is_active: boolean;
  created_at: string;
  updated_at: string;
  email_verified: boolean;
}

interface Profile {
  id: string;
  user_id: string;
  full_name?: string;
  subscription_plan: string;
  credits: number;
  max_credits: number;
  account_type: 'personal' | 'company';
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string, accountType: 'personal' | 'company') => Promise<void>;
  register: (email: string, password: string, accountType: 'personal' | 'company', profileData: any) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE_URL = 'http://localhost:5000';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const userProfile = await fetchUserProfile(token);
          if (userProfile) {
            setUser(userProfile);
            setIsAuthenticated(true);
          }
        } catch (error) {
          console.error('Failed to initialize auth:', error);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };
    initializeAuth();
  }, []);

  // Robust login function with proper error handling and profile fetch
  const fetchUserProfile = async (token: string): Promise<User | null> => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('token');
          setUser(null);
          throw new Error('Session expired. Please login again.');
        } else if (response.status === 500) {
          throw new Error('Server error. Please try again later.');
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      }
      const userData = await response.json();
      if (!userData || !userData.data || !userData.data.user) {
        throw new Error('Invalid user data received');
      }
      setUser(userData.data.user);
      setProfile(userData.data.profile || null);
      return userData.data.user;
    } catch (error: any) {
      console.error('Failed to fetch user profile:', error);
      setError(error.message || 'Failed to fetch user profile');
      localStorage.removeItem('token');
      setUser(null);
      setProfile(null);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string, accountType: 'personal' | 'company' = 'personal') => {
    try {
      setError(null);
      // Always use the base login URL - the account type is now sent in the request body
      const loginUrl = `${API_BASE_URL}/auth/login`;
      
      console.log('Attempting login to:', loginUrl, 'with account type:', accountType);
      
      const response = await fetch(loginUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies if using sessions
        body: JSON.stringify({ 
          email, 
          password
        }),
      }).catch(err => {
        console.error('Network error during login:', err);
        throw new Error('Unable to connect to the server. Please check your internet connection.');
      });
      
      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        console.error('Error parsing JSON response:', jsonError);
        throw new Error('Invalid response from server');
      }
      
      console.log('Login response:', { status: response.status, data });
      
      if (!response.ok) {
        // Handle redirects first
        if (data.redirect) {
          navigate(data.redirect);
          return;
        }

        // Handle different error types
        if (response.status === 404) {
          throw new Error(data.message || 'No account exists with this email. Please sign up first.');
        }
        if (response.status === 401) {
          if (data.error === 'Email not confirmed') {
            throw new Error('Please check your email and confirm your account before logging in.');
          }
          if (data.message?.includes('Invalid login credentials')) {
            throw new Error('No account exists with this email. Please sign up first.');
          }
          throw new Error(data.message || 'Invalid credentials. Please check your email and password.');
        }
        if (response.status === 500 && data.message?.includes('Supabase is not configured')) {
          throw new Error('Server error. Please try again later.');
        }
        throw new Error(data.message || 'Login failed. Please try again.');
      }

      if (data.token) {
        localStorage.setItem('token', data.token);
        // Fetch user profile with the token
        const userProfile = await fetchUserProfile(data.token);
        if (userProfile) {
          setUser(userProfile);
          setIsAuthenticated(true);
          // Show success message
          toast.success('Login successful!', {
            description: 'Welcome back!',
          });
          // Navigate to personal dashboard after successful login
          navigate('/dashboard/personal');
        } else {
          localStorage.removeItem('token');
          setIsAuthenticated(false);
          setUser(null);
          setProfile(null);
          throw new Error('Failed to load user profile after login');
        }
      } else {
        throw new Error(data.message || 'Login failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      throw err;
    }
  };

   const register = async (email: string, password: string, accountType: 'personal' | 'company', profileData: any) => {
    setLoading(true);
    setError(null);
    console.log('Starting registration with:', { email, accountType, password: '***', profileData });

    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.toLowerCase().trim(),
          password,
          account_type: accountType,
          profile: {
            full_name: profileData.full_name,
            headline: profileData.headline || '',
            bio: profileData.bio || '',
            location: profileData.location || '',
            industry: profileData.industry || '',
            profile_picture: profileData.profile_picture || null
          }
        }),
      });

      const data = await response.json();
      console.log('Registration response:', { status: response.status, data });

      if (!response.ok) {
        console.error('Registration failed:', { status: response.status, error: data });
        
        // Handle different error types
        if (response.status === 500 && data.message?.includes('Supabase is not configured')) {
          throw new Error('Authentication service is not properly configured. Please contact support.');
        }
        
        if (response.status === 400) {
          throw new Error(data.message || 'Invalid registration data');
        }
        
        if (response.status === 409) {
          throw new Error('User already exists');
        }
        
        throw new Error(data.message || data.error || 'Registration failed');
      }

      if (data.success) {
        console.log('Registration successful, attempting login...');
        // Registration successful, now login the user
        await login(email, password, accountType);
        if (data.errors && Array.isArray(data.errors)) {
          throw new Error(data.errors[0]?.msg || 'Validation failed');
        }
      } else {
        throw new Error(data.message || 'Registration failed');
      }
    } catch (err) {
      console.error('Registration error:', err);
      const errorMessage = err instanceof Error ? err.message : (err as any)?.toString() || 'Registration failed';
      setError(errorMessage);
      setLoading(false);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem('token');
      setUser(null);
      setProfile(null);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Logout failed');
    }
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      loading,
      error,
      login,
      register,
      logout,
      clearError,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
