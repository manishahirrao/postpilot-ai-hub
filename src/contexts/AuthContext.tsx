import * as React from 'react';
import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { auth } from '@/lib/api';

// Types
type UserProfile = {
  id: string;
  email: string;
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
};

// Types
type User = {
  id: string;
  email: string;
  display_name: string;
  isNewUser?: boolean;
  isEmailVerified?: boolean;
  profile?: UserProfile;
};

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<{ 
    success: boolean; 
    error?: string;
    isNewUser?: boolean;
  }>;
  logout: () => Promise<void>;
  signInWithLinkedIn: () => Promise<void>;
  registerProfile: (profileData: {
    first_name: string;
    last_name: string;
    phone?: string;
    company?: string;
    job_title?: string;
  }) => Promise<{ success: boolean; error?: string }>;
  verifyEmail: (token: string) => Promise<{ success: boolean; error?: string }>;
  refreshUser: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Initialize auth state on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem('access_token');
        
        if (!token) {
          setIsAuthenticated(false);
          setIsInitialized(true);
          setIsLoading(false);
          return;
        }
        
        // Use the validateSession function from our API service
        const result = await auth.validateSession();
        
        if (result?.user && result.user.id && result.user.email) {
          setUser({
            id: result.user.id,
            email: result.user.email,
            display_name: result.user.display_name || '',
            isNewUser: result.user.isNewUser ?? false,
            isEmailVerified: result.user.isEmailVerified ?? false,
          });
          setIsAuthenticated(true);
          
          // Redirect to onboarding for new users
          if ((result.user.isNewUser ?? false) && !location.pathname.startsWith('/auth/register')) {
            navigate('/auth/register', { replace: true });
          }
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        setIsAuthenticated(false);
      } finally {
        setIsInitialized(true);
        setIsLoading(false);
      }
    };
    
    initializeAuth();
  }, [navigate, location.pathname]);

  const login = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true);
      setError(null);

      try {
        console.log('Attempting login with:', { email });
        const result = await auth.login(email, password);
        console.log('Login result:', result);
        
        // Handle new user case (401/404 or error suggesting user doesn't exist)
        const shouldRedirectToRegister = 
          (result.isNewUser || 
           !result.success || 
           (result.error && (
             result.error.includes('not found') || 
             result.error.includes('incorrect') ||
             result.error.includes('invalid login'))));
        
        if (shouldRedirectToRegister) {
          const redirectTo = '/auth/register';
          console.log('New user detected, redirecting to:', redirectTo);
          toast.info('New user detected. Please complete your registration.');
          
          // Store the email in sessionStorage temporarily in case the page refreshes
          if (email) {
            sessionStorage.setItem('pendingRegistrationEmail', email);
          }
          
          navigate(redirectTo, { 
            state: { 
              email: result.email || email, 
              isNewUser: true 
            },
            replace: true 
          });
          return { success: false, error: 'New user', isNewUser: true };
        }
        
        // Handle successful login
        if (result?.token) {
          console.log('Login successful, getting user profile...');
          // Get user profile if needed
          const profile = await auth.getProfile().catch((err) => {
            console.error('Error getting profile:', err);
            return null;
          });
          
          const userData = {
            id: result.user?.id || '',
            email: result.user?.email || email,
            display_name: result.user?.display_name || email.split('@')[0],
            isNewUser: false,
            isEmailVerified: result.user?.isEmailVerified ?? false,
            profile: profile?.data
          };
          
          console.log('Setting user data:', userData);
          setUser(userData);
          setIsAuthenticated(true);
          toast.success('Login successful!');
          
          // Redirect based on role or default dashboard
          const redirectTo = location.state?.from?.pathname || '/dashboard';
          console.log('Redirecting to:', redirectTo);
          navigate(redirectTo, { replace: true });
          
          return { success: true };
        }
        
        // If we get here, login failed
        const errorMessage = result?.error || 'Login failed';
        console.error('Login failed:', errorMessage);
        setError(errorMessage);
        toast.error('Login failed', { description: errorMessage });
        return { 
          success: false, 
          error: errorMessage,
          isNewUser: result?.isNewUser
        };
      } catch (error: any) {
        console.error('Login error:', error);
        const errorMessage = error.response?.data?.error || error.message || 'Login failed';
        setError(errorMessage);
        toast.error('Login failed', { description: errorMessage });
        return { success: false, error: errorMessage };
      } finally {
        setIsLoading(false);
      }
    },
    [navigate, location.state]
  );

  const registerProfile = useCallback(
    async (profileData: {
      first_name: string;
      last_name: string;
      phone?: string;
      company?: string;
      job_title?: string;
    }) => {
      if (!user) {
        return { success: false, error: 'Not authenticated' };
      }
      
      setIsLoading(true);
      setError(null);
      
      try {
        const result = await auth.registerProfile(profileData);
        
        if (result?.success) {
          setUser(prev => ({
            ...prev!,
            display_name: `${profileData.first_name} ${profileData.last_name}`,
            isNewUser: false,
          }));
          
          // Redirect to dashboard after profile registration
          navigate('/dashboard', { replace: true });
          return { success: true };
        }
        
        return { success: false, error: result?.error || 'Failed to register profile' };
      } catch (error: any) {
        console.error('Profile registration error:', error);
        const errorMessage = error.response?.data?.error || error.message || 'Registration failed';
        setError(errorMessage);
        return { success: false, error: errorMessage };
      } finally {
        setIsLoading(false);
      }
    },
    [user, navigate]
  );

  const verifyEmail = useCallback(
    async (token: string) => {
      setIsLoading(true);
      setError(null);
      
      try {
        const result = await auth.verifyEmail(token);
        
        if (result?.success) {
          setUser(prev => ({
            ...prev!,
            isEmailVerified: true,
          }));
          
          toast.success('Email verified successfully');
          return { success: true };
        }
        
        return { success: false, error: result?.error || 'Email verification failed' };
      } catch (error: any) {
        console.error('Email verification error:', error);
        const errorMessage = error.response?.data?.error || error.message || 'Verification failed';
        setError(errorMessage);
        return { success: false, error: errorMessage };
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const logout = useCallback(async () => {
    try {
      await auth.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      navigate('/auth/login');
    }
  }, [navigate]);

  const refreshUser = useCallback(async () => {
    if (!user) return;
    
    try {
      const result = await auth.validateSession();
      
      if (result?.user?.id && result.user?.email) {
        setUser({
          id: result.user.id,
          email: result.user.email,
          display_name: result.user.display_name || '',
          isNewUser: result.user.isNewUser ?? false,
          isEmailVerified: result.user.isEmailVerified ?? false,
        });
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Error refreshing user:', error);
      setUser(null);
      setIsAuthenticated(false);
      throw error;
    }
  }, [user]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const signInWithLinkedIn = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      await auth.signInWithLinkedIn();
      // The actual redirect will be handled by the OAuth flow
    } catch (error: any) {
      console.error('LinkedIn sign in error:', error);
      const errorMessage = error.response?.data?.error || error.message || 'Failed to sign in with LinkedIn';
      setError(errorMessage);
      toast.error('LinkedIn sign in failed', { description: errorMessage });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const value = {
    user,
    isAuthenticated,
    isLoading,
    isInitialized,
    error,
    login,
    logout,
    signInWithLinkedIn,
    registerProfile,
    verifyEmail,
    refreshUser,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
