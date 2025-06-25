import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const EmailVerificationPage: React.FC = () => {
  const { verifyEmail } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Get the verification token from the URL
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');

  React.useEffect(() => {
    // If token is in URL, verify it automatically
    if (token) {
      handleVerifyEmail(token);
    }
  }, [token]);

  const handleVerifyEmail = async (token: string) => {
    try {
      setLoading(true);
      setError(null);
      const result = await verifyEmail(token);
      
      if (result.success) {
        toast.success('Email verified successfully!');
        // Redirect to login after verification
        navigate('/auth/login', { replace: true });
      } else {
        setError(result.error || 'Failed to verify email');
      }
    } catch (err) {
      setError('An error occurred while verifying email');
    } finally {
      setLoading(false);
    }
  };

  const resendVerificationEmail = async () => {
    try {
      // Implement resend logic using auth service
      const result = await verifyEmail('');
      if (result.success) {
        toast.success('Verification email sent successfully!');
      } else {
        setError(result.error || 'Failed to resend verification email');
      }
    } catch (err) {
      setError('An error occurred while sending verification email');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-6">
        <div className="rounded-lg shadow-lg bg-white p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Verify Your Email</h2>
            <p className="text-gray-600 mb-6">
              Please check your email for the verification link.
            </p>

            {loading ? (
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
            ) : error ? (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
                {error}
              </div>
            ) : token ? (
              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  Verifying your email...
                </p>
              </div>
            ) : (
              <>
                <p className="text-gray-600 mb-4">
                  Didn't receive the email? Click the button below to resend it.
                </p>
                <Button
                  onClick={resendVerificationEmail}
                  className="w-full"
                >
                  Resend Verification Email
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationPage;
