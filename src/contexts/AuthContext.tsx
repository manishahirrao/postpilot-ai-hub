import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const API_BASE_URL = 'http://localhost:5000';

interface UserProfile {
  id: string;
  user_id: string;
  full_name: string;
  headline: string;
  bio: string;
  account_type: 'personal' | 'company';
  subscription_plan: string;
  credits: number;
  max_credits: number;
  created_at: string;
  updated_at: string;
}

interface User {
  id: string;
  email: string;
  account_type: 'personal' | 'company';
  email_verified: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  profile: UserProfile;
}

interface Session {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  token_type: string;
}

interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

interface LoginResponseData {
  success: boolean;
  user: User;
  session: Session;
}

interface ProfileResponse {
  user: User;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string, accountType?: 'personal' | 'company') => Promise<boolean>;
  logout: () => void;
  refreshToken: () => Promise<boolean>;
  clearError: () => void;
  fetchUserProfile: (token: string) => Promise<User | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const createDefaultProfile = (userId: string): UserProfile => ({
  id: '',
  user_id: userId,
  full_name: '',
  headline: '',
  bio: '',
  account_type: 'personal',
  subscription_plan: 'free',
  credits: 0,
  max_credits: 100,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const logout = useCallback((): void => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('token_expires_at');
    setUser(null);
    setIsAuthenticated(false);
    setError(null);
    navigate('/login');
    console.log('User logged out');
  }, [navigate]);

  const fetchUserProfile = useCallback(async (token: string): Promise<User | null> => {
    try {
      setIsLoading(true);
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
          logout();
          throw new Error('Session expired. Please login again.');
        } else if (response.status === 500) {
          throw new Error('Server error. Please try again later.');
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      }


      const responseData: ApiResponse<ProfileResponse> = await response.json();
      
      if (responseData.status !== 200 || !responseData.data?.user) {
        throw new Error('Invalid user data received');
      }

      const userData = responseData.data.user;
      
      // Create a complete user object with default values
      const userProfile: User = {
        id: userData.id,
        email: userData.email,
        account_type: userData.account_type || 'personal',
        email_verified: userData.email_verified || false,
        is_active: userData.is_active ?? true,
        created_at: userData.created_at || new Date().toISOString(),
        updated_at: userData.updated_at || new Date().toISOString(),
        profile: userData.profile ? {
          ...userData.profile,
          id: userData.profile.id || '',
          user_id: userData.profile.user_id || userData.id,
          full_name: userData.profile.full_name || '',
          headline: userData.profile.headline || '',
          bio: userData.profile.bio || '',
          account_type: userData.profile.account_type || 'personal',
          subscription_plan: userData.profile.subscription_plan || 'free',
          credits: userData.profile.credits ?? 0,
          max_credits: userData.profile.max_credits ?? 100,
          created_at: userData.profile.created_at || new Date().toISOString(),
          updated_at: userData.profile.updated_at || new Date().toISOString(),
        } : createDefaultProfile(userData.id)
      };

      return userProfile;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setError(error instanceof Error ? error.message : 'Failed to load user profile');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading, setError, logout]);

  const refreshToken = useCallback(async (): Promise<boolean> => {
    try {
      const refreshTokenValue = localStorage.getItem('refresh_token');
      
      if (!refreshTokenValue) {
        console.log('No refresh token available');
        return false;
      }

      const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh_token: refreshTokenValue }),
      });

      if (!response.ok) {
        console.log('Refresh token request failed:', response.status);
        return false;
      }

      const responseData: ApiResponse<{ session: Session }> = await response.json();
      
      if (responseData.status === 200 && responseData.data?.session) {
        const { session } = responseData.data;
        localStorage.setItem('access_token', session.access_token);
        localStorage.setItem('refresh_token', session.refresh_token);
        localStorage.setItem('token_expires_at', session.expires_at.toString());
        console.log('Token refresh successful');
        return true;
      }
      
      console.log('Invalid refresh token response:', responseData);
      return false;
    } catch (error) {
      console.error('Token refresh failed:', error);
      return false;
    }
  }, []);

  const login = async (email: string, password: string, accountType: 'personal' | 'company' = 'personal'): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);
      
      console.log('Attempting login to:', `${API_BASE_URL}/auth/login`);

      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email, 
          password,
          account_type: accountType
        }),
      });

      const responseData = await response.json();
      console.log('Login response:', responseData);

      if (!response.ok) {
        const errorMsg = responseData.message || responseData.error || `Login failed with status: ${response.status}`;
        throw new Error(errorMsg);
      }

      // Handle the response format: { success, user: { profile, session } }
      const { success, user: responseUser } = responseData;
      
      if (!success) {
        throw new Error(responseData.message || 'Login was not successful');
      }

      // Extract user and session from the response
      const userData = responseUser;
      const session = responseUser?.session;

      // Validate required data
      if (!userData || !session?.access_token) {
        console.error('Missing user or session in response:', { user: userData, session });
        throw new Error('Invalid response data: missing user or token');
      }

      // Check if email is verified
      if (userData.email_verified === false) {
        setError('Please verify your email before logging in');
        return false;
      }

      // Calculate token expiration (current time + expires_in seconds)
      const expiresAt = Math.floor(Date.now() / 1000) + (session.expires_in || 3600);

      // Store tokens
      localStorage.setItem('access_token', session.access_token);
      localStorage.setItem('refresh_token', session.refresh_token || '');
      localStorage.setItem('token_expires_at', expiresAt.toString());

      // Create complete user object with profile
      const userProfile: User = {
        id: userData.id,
        email: userData.email,
        account_type: userData.account_type || accountType,
        email_verified: userData.email_verified || false,
        is_active: userData.is_active !== false, // default to true if not specified
        created_at: userData.created_at || new Date().toISOString(),
        updated_at: userData.updated_at || new Date().toISOString(),
        profile: userData.profile ? {
          id: userData.profile.id || '',
          user_id: userData.profile.user_id || userData.id,
          full_name: userData.profile.full_name || '',
          headline: userData.profile.headline || '',
          bio: userData.profile.bio || '',
          account_type: userData.profile.account_type || accountType,
          subscription_plan: userData.profile.subscription_plan || 'free',
          credits: userData.profile.credits ?? 0,
          max_credits: userData.profile.max_credits ?? 100,
          created_at: userData.profile.created_at || new Date().toISOString(),
          updated_at: userData.profile.updated_at || new Date().toISOString(),
        } : createDefaultProfile(userData.id)
      };

      setUser(userProfile);
      setIsAuthenticated(true);
      
      console.log('Login successful, user set:', userProfile);
      
      // Return true on success - navigation will be handled by the component
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      console.error('Login error:', errorMessage);
      setError(errorMessage);
      setIsAuthenticated(false);
      setUser(null);
      
      // Clear any stored tokens on error
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('token_expires_at');
      
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize auth state on app load
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const expiresAt = localStorage.getItem('token_expires_at');
        
        if (token && expiresAt) {
          // Check if token is still valid (with 5 minute buffer)
          const now = Math.floor(Date.now() / 1000);
          const tokenExpiresAt = parseInt(expiresAt);
          const buffer = 5 * 60; // 5 minutes in seconds
          
          if (now < tokenExpiresAt - buffer) {
            // Token is still valid, fetch user profile
            const userProfile = await fetchUserProfile(token);
            if (userProfile) {
              setUser(userProfile);
              setIsAuthenticated(true);
            }
          } else {
            // Token expired or about to expire, try to refresh it
            console.log('Token expired or about to expire, attempting refresh...');
            const refreshed = await refreshToken();
            
            if (refreshed) {
              // Successfully refreshed, fetch user profile with new token
              const newToken = localStorage.getItem('access_token');
              if (newToken) {
                const userProfile = await fetchUserProfile(newToken);
                if (userProfile) {
                  setUser(userProfile);
                  setIsAuthenticated(true);
                }
              }
            } else {
              console.log('Token refresh failed, logging out...');
              logout();
            }
          }
        } else {
          console.log('No valid token found, user not authenticated');
        }
      } catch (error) {
        console.error('Failed to initialize auth:', error);
        // Don't log out here, just set loading to false
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, [refreshToken, logout, fetchUserProfile]);

  const clearError = useCallback(() => setError(null), []);

  const value: AuthContextType = useMemo(() => ({
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    refreshToken,
    clearError,
    fetchUserProfile
  }), [
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    refreshToken,
    clearError,
    fetchUserProfile
  ]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
