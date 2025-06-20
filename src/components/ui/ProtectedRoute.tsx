import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import LoadingSpinner from '@/components/common/LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { state } = useAuth();
  const location = useLocation();

  if (state.isLoading) {
    return <LoadingSpinner />;
  }

  if (!state.isAuthenticated || !state.user || state.user.verified === false) {
    // Redirect to login, preserve intended route
    return (
      <Navigate
        to="/auth/login/personal"
        state={{ from: location, message: 'Please log in to access this page.' }}
        replace
      />
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
