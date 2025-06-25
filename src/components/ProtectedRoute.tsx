import * as React from 'react';
import { ReactElement } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: ReactElement;
  requireEmailVerification?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireEmailVerification = true,
}): ReactElement => {
  const { user, isAuthenticated, isInitialized, isLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Handle unauthenticated users
  if (!isAuthenticated) {
    // If auth is still initializing, show loading state
    if (isLoading || !isInitialized) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      );
    }

    // Redirect to login with the current location to return to after login
    return (
      <Navigate
        to="/auth/login"
        state={{ from: location }}
        replace
      />
    );
  }

  // Handle email verification requirement
  if (requireEmailVerification && !user?.isEmailVerified) {
    // Optionally redirect to a verification page or show a message
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Email Verification Required</h2>
          <p className="mb-4">Please verify your email address to access this page.</p>
          <button
            onClick={() => navigate('/auth/verify-email')}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Resend Verification Email
          </button>
        </div>
      </div>
    );
  }

  // User is authenticated and verified (if required), render the protected content
  return children;
};

export default ProtectedRoute;