
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowRight, Building2 } from 'lucide-react';

const LoginCompanyPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Set user type as company for company login
      login('demo-company-token', 'company');
      navigate('/dashboard/company');
    }, 1000);
  };

  const handleLinkedInLogin = () => {
    // Simulate LinkedIn OAuth for company account
    login('demo-linkedin-company-token', 'company');
    navigate('/dashboard/company');
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
              <Building2 className="w-8 h-8 text-indigo-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Company Login</h1>
          <p className="text-gray-600 mt-2">Sign in to access your business tools and hiring features</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">Sign In to Your Company Account</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* LinkedIn Login */}
            <Button
              onClick={handleLinkedInLogin}
              className="w-full bg-blue-600 hover:bg-blue-700"
              size="lg"
            >
              <div className="w-5 h-5 mr-2 bg-white rounded flex items-center justify-center">
                <span className="text-blue-600 font-bold text-xs">in</span>
              </div>
              Continue with LinkedIn Company Page
            </Button>

            <div className="relative">
              <Separator />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-white px-2 text-sm text-gray-500">or</span>
              </div>
            </div>

            {/* Email Login Form */}
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">Company Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your company email"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="mt-1"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <a href="#" className="text-indigo-600 hover:text-indigo-500">
                    Forgot your password?
                  </a>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                size="lg"
                disabled={loading}
              >
                {loading ? (
                  'Signing in...'
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don't have a company account?{' '}
                <Link to="/auth/register" className="text-indigo-600 hover:text-indigo-500 font-medium">
                  Sign up for free
                </Link>
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Looking for personal features?{' '}
                <Link to="/auth/login/personal" className="text-indigo-600 hover:text-indigo-500 font-medium">
                  Personal Login
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginCompanyPage;
