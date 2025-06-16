import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowRight, User, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validate form data
      if (!formData.email || !formData.password || !formData.name) {
        throw new Error('Please fill in all required fields');
      }

      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      try {
        const response = await fetch('http://localhost:5000/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            fullName: formData.name
          }),
        });

        // Get response text first to handle any errors
        const responseText = await response.text();
        
        if (!response.ok) {
          // Try to parse error response as JSON first
          try {
            const errorData = JSON.parse(responseText);
            throw new Error(`Server error: ${errorData.error || errorData.message || 'Unknown error'}`);
          } catch {
            throw new Error(`Server error: ${responseText}`);
          }
        }

        // Parse successful response
        const data = JSON.parse(responseText);
        
        // Store token and user data
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        // Redirect to resume builder
        navigate('/resume-builder');
      } catch (parseError) {
        throw new Error(`Failed to parse server response: ${parseError instanceof Error ? parseError.message : 'Invalid JSON format'}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <Card>
          <CardHeader className="text-center">
            <User className="mx-auto h-12 w-12 text-gray-400" />
            <CardTitle className="text-3xl font-bold text-gray-900">
              Create an account
            </CardTitle>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                />
              </div>
              
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                />
              </div>
              
              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                />
              </div>
              
              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Creating account...' : (
                  <>
                    Register <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
            
            <div className="mt-4 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <button 
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500"
                onClick={() => navigate('/login')}
              >
                Sign in
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;