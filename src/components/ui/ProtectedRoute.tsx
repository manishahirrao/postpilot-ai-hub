import { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // In a real app, you would check for authentication here
  // For this demo, we'll just render the children directly
  return <>{children}</>;
};

export default ProtectedRoute;
