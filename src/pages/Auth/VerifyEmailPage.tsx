import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Loader2, Mail, ArrowLeft, RefreshCw } from 'lucide-react';
import { toast } from 'react-toastify';
import { AuthService } from '@/services/authService';
import { authApi } from '@/lib/api';

const VerifyEmailPage: React.FC = () => {
  const pollingRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [countdown, setCountdown] = useState(0);
  const authService = new AuthService();
  const [error, setError] = useState<string | null>(null);

  // Get email from location state or query params
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');
    const accountType = searchParams.get('account_type') as 'personal' | 'company';
    
    // Set email from location state or query params
    const stateEmail = (location.state as any)?.email || searchParams.get('email');
    if (stateEmail) {
      setEmail(stateEmail);
    }

    if (token && accountType) {
      handleVerification(token, accountType);
    }
  }, [location]);

  // Handle countdown for resend email
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Poll for verification status every 30 seconds
  useEffect(() => {
    if (!email) return;
    
    const checkStatus = async () => {
      try {
        const { data, error } = await authService.checkVerificationStatus(email);
        if (data?.verified) {
          toast.success('Email verified! Please log in.');
          navigate('/auth/login/personal', {
            state: { email, from: 'verification' },
            replace: true
          });
        }
      } catch (err) {
        // Optionally handle polling errors
      }
    };

    pollingRef.current = setInterval(checkStatus, 30000); // 30 seconds
    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, [email, navigate]);

  const handleResendEmail = async () => {
    if (!email || countdown > 0) return;
    
    setResendLoading(true);
    try {
      const { error } = await authService.resendVerificationEmail(email);
      
      if (error) {
        toast.error(error.message || 'Failed to resend verification email');
        return;
      }
      
      setCountdown(60); // 60 seconds cooldown
      toast.success('Verification email resent successfully!');
    } catch (error) {
      console.error('Failed to resend verification email:', error);
      toast.error('Failed to resend verification email. Please try again.');
    } finally {
      setResendLoading(false);
    }
  };

  const handleVerification = async (token: string, accountType: 'personal' | 'company') => {
    setLoading(true);
    setError(null);

    try {
      // Verify the email with the token
      const { data, error } = await authApi.supabase.auth.verifyOtp({
        email,
        token,
        type: 'signup'
      });
      
      if (error) {
        throw error;
      }

      // Update the user's email_confirmed status in the profiles table
      const { error: updateError } = await authApi.supabase
        .from('profiles')
        .update({ email_confirmed: true })
        .eq('email', email);

      if (updateError) {
        console.error('Failed to update email confirmation status:', updateError);
        // Continue with the flow even if the update fails
      }
      
      toast.success('Email verified successfully!');
      navigate('/auth/login/personal', { 
        state: { email, from: 'verification' },
        replace: true 
      });
    } catch (error) {
      console.error('Verification error:', error);
      const errorMessage = error instanceof Error ? error.message : 'An error occurred during verification';
      setError(errorMessage);
      toast.error('Failed to verify email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-800">Verifying your email...</h2>
          <p className="text-gray-600 mt-2">Please wait while we verify your email address.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <Button
          variant="ghost"
          className="mb-4 text-gray-600 hover:bg-transparent hover:text-gray-800"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-10 h-10 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Verify Your Email
            </h1>
          </div>

          <div className="text-center py-4">
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 mb-6">
              <Mail className="w-10 h-10 text-blue-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-800 mb-3">Verify Your Email</h2>
              <p className="text-gray-600 mb-6">
                We've sent a verification link to <span className="font-semibold text-blue-600">{email || 'your email'}</span>.
                Please check your inbox and click the link to verify your account.
              </p>
              
              <div className="space-y-4">
                <Button 
                  onClick={handleResendEmail}
                  disabled={countdown > 0 || resendLoading}
                  className="bg-blue-600 hover:bg-blue-700 text-white w-full max-w-xs mx-auto"
                >
                  {resendLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <RefreshCw className={`mr-2 h-4 w-4 ${countdown > 0 ? 'opacity-50' : ''}`} />
                      {countdown > 0 ? `Resend in ${countdown}s` : 'Resend Verification Email'}
                    </>
                  )}
                </Button>
                
                {error && (
                  <div className="text-red-600 text-sm">
                    {error}
                  </div>
                )}
                
                <div className="pt-4 border-t border-gray-100 mt-4">
                  <p className="text-sm text-gray-500">
                    Already verified?{' '}
                    <button 
                      onClick={() => navigate('/auth/login/personal')}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Go to Login
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
