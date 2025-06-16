import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowRight, User, Eye, EyeOff, Mail, Lock, Loader2, Star } from 'lucide-react';

const LoginPersonalPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const { login } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setErrors({});
    
    // Simulate API call
    setTimeout(() => {
      // Set user type as professional for personal login
      login('demo-personal-token', 'professional');
      navigate('/dashboard/personal');
      setLoading(false);
    }, 1000);
  };

  const handleLinkedInLogin = () => {
    // Simulate LinkedIn OAuth for personal account
    login('demo-linkedin-personal-token', 'professional');
    navigate('/dashboard/personal');
  };

  const handleGoogleLogin = () => {
    // Simulate Google OAuth for personal account
    login('demo-google-personal-token', 'professional');
    navigate('/dashboard/personal');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg transform -rotate-3">
                <User className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                <Star className="w-3 h-3 text-white fill-current" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-gray-600 mt-3 text-lg">
            Continue your career journey with us
          </p>
        </div>

        {/* Login Card */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-6">
            <CardTitle className="text-center text-2xl font-semibold text-gray-800">
              Personal Login
            </CardTitle>
            <p className="text-center text-sm text-gray-600 mt-2">
              Access your personal career tools
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Social Login Options */}
            <div className="space-y-3">
              <Button
                onClick={handleLinkedInLogin}
                className="w-full bg-[#0A66C2] hover:bg-[#004182] text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
                size="lg"
              >
                <div className="w-5 h-5 mr-3 bg-white rounded flex items-center justify-center">
                  <span className="text-[#0A66C2] font-bold text-xs">in</span>
                </div>
                Continue with LinkedIn
              </Button>

              <Button
                onClick={handleGoogleLogin}
                variant="outline"
                className="w-full border-2 border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50 text-gray-700 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
                size="lg"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </Button>
            </div>

            {/* Divider */}
            <div className="relative">
              <Separator className="bg-gray-200" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-white px-4 text-sm text-gray-500 font-medium">
                  or sign in with email
                </span>
              </div>
            </div>

            {/* Email Login Form */}
            <form onSubmit={handleEmailLogin} className="space-y-5">
              <div className="space-y-2">
                <Label 
                  htmlFor="email" 
                  className="text-sm font-medium text-gray-700 flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Email Address
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors(prev => ({ ...prev, email: undefined }));
                    }}
                    placeholder="you@example.com"
                    className={`pl-4 pr-4 py-3 border-2 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-200'
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <span className="w-3 h-3 rounded-full bg-red-500 flex items-center justify-center">
                      <span className="text-white text-xs">!</span>
                    </span>
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label 
                  htmlFor="password" 
                  className="text-sm font-medium text-gray-700 flex items-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors(prev => ({ ...prev, password: undefined }));
                    }}
                    placeholder="Enter your password"
                    className={`pl-4 pr-12 py-3 border-2 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.password ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-200'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <span className="w-3 h-3 rounded-full bg-red-500 flex items-center justify-center">
                      <span className="text-white text-xs">!</span>
                    </span>
                    {errors.password}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <Link 
                  to="/auth/forgot-password" 
                  className="text-sm text-blue-600 hover:text-blue-500 transition-colors font-medium"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
                size="lg"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In to Your Account
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>

            {/* Footer Links */}
            <div className="text-center space-y-3 pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/auth/register" className="text-blue-600 hover:text-blue-500 font-semibold transition-colors">
                  Sign up for free
                </Link>
              </p>
              <p className="text-sm text-gray-600">
                Looking for business features?{' '}
                <Link to="/auth/login/companies" className="text-indigo-600 hover:text-indigo-500 font-semibold transition-colors">
                  Company Login
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Features Preview */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500 mb-4">Join thousands of professionals advancing their careers</p>
          <div className="grid grid-cols-3 gap-4 max-w-xs mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-xs text-gray-600">Profile Builder</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Star className="w-6 h-6 text-indigo-600" />
              </div>
              <p className="text-xs text-gray-600">Skill Tracking</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <ArrowRight className="w-6 h-6 text-purple-600" />
              </div>
              <p className="text-xs text-gray-600">Job Matching</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPersonalPage;