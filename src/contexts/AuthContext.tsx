
import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../lib/api';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'professional' | 'company' | 'guest';
  profilePicUrl?: string;
  headline?: string;
  plan?: string;
  credits?: number;
  maxCredits?: number;
  renewalDate?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  userType: 'professional' | 'company' | null;
  login: (email: string, password: string, userType?: 'professional' | 'company') => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  signup: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [userType, setUserType] = useState<'professional' | 'company' | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUserType = localStorage.getItem('userType') as 'professional' | 'company' | null;
    
    if (storedToken && storedUserType) {
      setToken(storedToken);
      setUserType(storedUserType);
      // Fetch user data from backend
      fetchUserData().catch(error => {
        console.error('Error fetching user data on mount:', error);
      });
    }
  }, []);

  const fetchUserData = async () => {
    try {
      // TODO: Implement profile fetching from backend
      // For now, using mock data
      if (userType === 'professional') {
        setUser({
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          role: 'professional',
          headline: 'Software Engineer at TechCorp'
        });
      } else {
        setUser({
          id: '2',
          name: 'TechCorp Admin',
          email: 'admin@techcorp.com',
          role: 'company',
          headline: 'Company Administrator'
        });
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  };

  const login = async (email: string, password: string, userType?: 'professional' | 'company') => {
    try {
      const response = await authApi.login(email, password);
      const token = response.token;
      setToken(token);
      setUserType(userType || 'professional');
      localStorage.setItem('token', token);
      localStorage.setItem('userType', userType || 'professional');
      
      // Fetch user data from backend
      await fetchUserData();
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const signup = async (email: string, password: string) => {
    try {
      await authApi.signup(email, password);
      // After signup, you might want to redirect to login page
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setUserType(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      userType,
      login,
      logout,
      signup,
      isAuthenticated: !!token
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
