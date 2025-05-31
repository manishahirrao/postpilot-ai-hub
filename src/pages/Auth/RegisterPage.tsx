
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowRight, Check } from 'lucide-react';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'professional'
  });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      login('demo-token');
      navigate('/dashboard');
    }, 1000);
  };

  const handleLinkedInSignup = () => {
    // In a real app, this would redirect to LinkedIn OAuth
    console.log('LinkedIn OAuth would start here');
    login('demo-linkedin-token');
    navigate('/dashboard');
  };

  const benefits = [
    'Generate unlimited LinkedIn posts',
    'AI-powered resume enhancement',
    'Smart job matching',
    'Career analytics and insights',
    'Priority support'
  ];

  return (
    <div className="min-h-screen pt-16 bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left side - Benefits */}
          <div className="flex items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-6">
                Start your career transformation today
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Join thousands of professionals who are accelerating their careers with PostPilot's AI-powered tools.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="bg-green-100 p-1 rounded-full">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                <p className="text-blue-900 font-semibold mb-2">💡 Pro Tip</p>
                <p className="text-blue-800">
                  Start with our free plan and upgrade when you're ready. No credit card required!
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="flex items-center justify-center">
            <div className="max-w-md w-full">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Create your account</CardTitle>
                  <p className="text-center text-gray-600">Get started in less than 2 minutes</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* LinkedIn Signup */}
                  <Button
                    onClick={handleLinkedInSignup}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    size="lg"
                  >
                    <div className="w-5 h-5 mr-2 bg-white rounded flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-xs">in</span>
                    </div>
                    Sign up with LinkedIn
                  </Button>

                  <div className="relative">
                    <Separator />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="bg-white px-2 text-sm text-gray-500">or</span>
                    </div>
                  </div>

                  {/* Email Signup Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Enter your full name"
                        required
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="Enter your email"
                        required
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="role">I am a</Label>
                      <Select value={formData.role} onValueChange={(value) => handleInputChange('role', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="professional">Working Professional</SelectItem>
                          <SelectItem value="company">Company/Recruiter</SelectItem>
                          <SelectItem value="guest">Job Seeker</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        placeholder="Create a password"
                        required
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        placeholder="Confirm your password"
                        required
                        className="mt-1"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                      size="lg"
                      disabled={loading}
                    >
                      {loading ? (
                        'Creating account...'
                      ) : (
                        <>
                          Create Account
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </form>

                  <div className="text-center">
                    <p className="text-sm text-gray-600">
                      Already have an account?{' '}
                      <Link to="/auth/login" className="text-indigo-600 hover:text-indigo-500 font-medium">
                        Sign in
                      </Link>
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500">
                  By creating an account, you agree to our{' '}
                  <a href="#" className="text-indigo-600 hover:text-indigo-500">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-indigo-600 hover:text-indigo-500">
                    Privacy Policy
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
