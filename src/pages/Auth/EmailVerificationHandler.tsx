import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import { AuthService } from '@/services/authService';

const EmailVerificationHandler: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [message, setMessage] = useState('Verifying your email...');
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');
    const emailParam = searchParams.get('email');
    setEmail(emailParam);
    if (!token || !emailParam) {
      setStatus('error');
      setMessage('Invalid verification link.');
      return;
    }
    verifyEmail(token, emailParam);
    // eslint-disable-next-line
  }, [location.search]);

  const verifyEmail = async (token: string, email: string) => {
    setStatus('verifying');
    setMessage('Verifying your email...');
    try {
      const authService = new AuthService();
      // Backend API call to verify token and mark user as verified
      const { error } = await authService.verifyEmailToken(token, email);
      if (error) {
        setStatus('error');
        setMessage(error.message || 'Verification failed. Token may be expired or invalid.');
        toast.error(error.message || 'Verification failed.');
        return;
      }
      setStatus('success');
      setMessage('Your email has been verified! You can now log in.');
      toast.success('Email verified successfully!');
      
      // Navigate to login page after a short delay
      const redirectTo = '/auth/login/personal';
      console.log('Navigating to:', redirectTo, 'with state:', { email, from: 'verification' });
      
      setTimeout(() => {
        navigate(redirectTo, { 
          state: { email, from: 'verification' },
          replace: true 
        });
      }, 1500);
    } catch (err: any) {
      setStatus('error');
      setMessage(err.message || 'An unexpected error occurred during verification.');
      toast.error('Verification failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        {status === 'verifying' && (
          <>
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{message}</h2>
            <p className="text-gray-600">Please wait while we verify your email address.</p>
          </>
        )}
        {status === 'success' && (
          <>
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-green-700 mb-2">{message}</h2>
            <p className="text-gray-600">Redirecting to login...</p>
          </>
        )}
        {status === 'error' && (
          <>
            <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-red-700 mb-2">Verification Failed</h2>
            <p className="text-gray-600 mb-2">{message}</p>
            <button
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              onClick={() => navigate('/auth/login/personal')}
            >
              Go to Login
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default EmailVerificationHandler;
