
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'professional' | 'company' | 'guest';
  profilePicUrl?: string;
  headline?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  userType: 'professional' | 'company' | null;
  login: (token: string, userType?: 'professional' | 'company') => void;
  logout: () => void;
  isAuthenticated: boolean;
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
      
      // Simulate user data based on user type
      if (storedUserType === 'professional') {
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
    }
  }, []);

  const login = (newToken: string, newUserType: 'professional' | 'company' = 'professional') => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('userType', newUserType);
    setToken(newToken);
    setUserType(newUserType);
    
    // Set user data based on user type
    if (newUserType === 'professional') {
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
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    setToken(null);
    setUser(null);
    setUserType(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      userType,
      login,
      logout,
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
