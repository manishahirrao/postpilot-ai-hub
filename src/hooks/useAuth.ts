import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../lib/api';
import { useToast } from './use-toast';

type User = {
  id: string;
  email: string;
  display_name: string;
  isNewUser?: boolean;
  isEmailVerified?: boolean;
};

type AuthState = {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
};

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    error: null,
    isAuthenticated: false,
    isInitialized: false,
  });

  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  // Initialize auth state
  const initialize = useCallback(async () => {
    try {
      const token = localStorage.getItem('access_token');
      
      if (!token) {
        setState(prev => ({
          ...prev,
          isLoading: false,
          isInitialized: true,
          isAuthenticated: false,
        }));
        return;
      }

      const { data } = await auth.validateSession();
      
      // Handle new user flow
      if (data?.code === 'NEW_USER') {
        setState(prev => ({
          ...prev,
          user: { ...data.user, isNewUser: true },
          isLoading: false,
          isInitialized: true,
          isAuthenticated: true,
        });
        return;
      }

      // Handle unverified email
      if (data?.code === 'EMAIL_NOT_VERIFIED') {
        setState(prev => ({
          ...prev,
          user: { ...data.user, isEmailVerified: false },
          isLoading: false,
          isInitialized: true,
          isAuthenticated: false,
        }));
        return;
      }

      // Regular authenticated user
      setState(prev => ({
        ...prev,
        user: data.user,
        isLoading: false,
        isInitialized: true,
        isAuthenticated: true,
      }));

    } catch (error) {
      console.error('Auth initialization error:', error);
      setState(prev => ({
        ...prev,
        isLoading: false,
        isInitialized: true,
        isAuthenticated: false,
        error: 'Failed to initialize authentication',
      }));
    }
  }, []);

  // Initialize on mount
  useEffect(() => {
    initialize();
  }, [initialize]);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const data = await auth.login(email, password);
      
      setState(prev => ({
        ...prev,
        user: data.user,
        isLoading: false,
        isAuthenticated: true,
      }));

      // Redirect to intended URL or home
      const redirectTo = location.state?.from?.pathname || '/';
      navigate(redirectTo);
      
      return { success: true };
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Login failed';
      setState(prev => ({ ...prev, isLoading: false, error: errorMessage }));
      toast({
        title: 'Login Failed',
        description: errorMessage,
        variant: 'destructive',
      });
      return { success: false, error: errorMessage };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await auth.logout();
      setState({
        user: null,
        isLoading: false,
        error: null,
        isAuthenticated: false,
        isInitialized: true,
      });
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: 'Logout Failed',
        description: 'There was an error logging out',
        variant: 'destructive',
      });
    }
  };

  // Register profile (for new users)
  const registerProfile = async (profileData: {
    first_name: string;
    last_name: string;
    phone?: string;
    company?: string;
    job_title?: string;
  }) => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      const data = await auth.registerProfile(profileData);
      
      setState(prev => ({
        ...prev,
        user: { ...prev.user, ...data.user, isNewUser: false },
        isLoading: false,
      }));

      toast({
        title: 'Profile Updated',
        description: 'Your profile has been updated successfully',
      });

      return { success: true };
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Failed to update profile';
      setState(prev => ({ ...prev, isLoading: false, error: errorMessage }));
      toast({
        title: 'Update Failed',
        description: errorMessage,
        variant: 'destructive',
      });
      return { success: false, error: errorMessage };
    }
  };

  // Verify email
  const verifyEmail = async (token: string) => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      await auth.verifyEmail(token);
      
      setState(prev => ({
        ...prev,
        user: prev.user ? { ...prev.user, isEmailVerified: true } : null,
        isLoading: false,
      }));

      toast({
        title: 'Email Verified',
        description: 'Your email has been verified successfully',
      });

      return { success: true };
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Email verification failed';
      setState(prev => ({ ...prev, isLoading: false, error: errorMessage }));
      toast({
        title: 'Verification Failed',
        description: errorMessage,
        variant: 'destructive',
      });
      return { success: false, error: errorMessage };
    }
  };

  return {
    ...state,
    login,
    logout,
    registerProfile,
    verifyEmail,
  };
}

// Auth provider component
type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const auth = useAuth();

  // Show loading state while initializing
  if (auth.isLoading && !auth.isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

// Create auth context
export const AuthContext = React.createContext<ReturnType<typeof useAuth> | null>(null);

// Custom hook to use auth context
export const useAuthContext = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
