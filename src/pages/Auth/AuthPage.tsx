import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

const AuthPage = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(
        mode === 'login' ? '/auth/login' : '/auth/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            fullName: mode === 'signup' ? formData.fullName : undefined
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      // Store token in localStorage for authentication
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      navigate('/resume-builder');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-3xl font-extrabold text-gray-900">
              {mode === 'login' ? 'Sign in to your account' : 'Create your account'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <Label htmlFor="email-address">Email address</Label>
                  <Input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                {mode === 'signup' && (
                  <div>
                    <Label htmlFor="full-name">Full Name</Label>
                    <Input
                      id="full-name"
                      name="fullName"
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                  </div>
                )}
              </div>

              {error && (
                <div className="text-red-500 text-sm text-center mt-2">
                  {error}
                </div>
              )}

              <div>
                <Button
                  type="submit"
                  className="group w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  disabled={isLoading}
                >
                  {isLoading ? 'Processing...' : mode === 'login' ? 'Sign in' : 'Sign up'}
                </Button>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setMode(prev => prev === 'login' ? 'signup' : 'login')}
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  {mode === 'login' ? 'Create an account' : 'Already have an account? Sign in'}
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthPage;
