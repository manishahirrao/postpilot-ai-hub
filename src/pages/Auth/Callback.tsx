import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/api';
import { toast } from 'sonner';

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuth = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          throw error;
        }

        if (data.session) {
          // The Supabase auth state change handler in AuthProvider will handle the rest
          return;
        }

        throw new Error('No session found');
      } catch (error) {
        console.error('Auth callback error:', error);
        toast.error('Failed to authenticate. Please try again.');
        navigate('/auth/login');
      }
    };

    handleAuth();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-gray-600">Completing sign in...</p>
      </div>
    </div>
  );
};

export default Callback;
