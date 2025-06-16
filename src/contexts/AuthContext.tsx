import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  email: string;
  fullName: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, fullName: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await fetch('http://localhost:5000/auth/me', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (response.ok) {
            const userData = await response.json();
            setUser(userData.user);
          } else {
            localStorage.removeItem('token');
          }
        }
      } catch (err) {
        console.error('Auth check failed:', err);
      } finally {
        setLoading(false);
    }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      localStorage.setItem('token', data.token);
      setUser(data.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      throw err;
    }
  };

  const register = async (email: string, password: string, fullName: string) => {
    try {
      setError(null);
      const response = await fetch('http://localhost:5000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, fullName }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      // After successful registration, log the user in
      await login(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
      throw err;
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem('token');
      setUser(null);
      navigate('/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Logout failed');
    }
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider value={{
      user,
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
