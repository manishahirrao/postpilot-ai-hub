import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Eye, EyeOff, Loader2, Linkedin, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

// Background Gradient Component
const BackgroundGradient = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden">
    <div className="absolute top-0 left-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
    <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-full filter blur-3xl translate-x-1/3 translate-y-1/3"></div>
  </div>
);

// Glass Card Component
const GlassCard = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <motion.div 
    className={`bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden ${className}`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.div>
);

interface LoginErrors {
  email?: string;
  password?: string;
  general?: string;
}

const LoginPersonalPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<LoginErrors>({});
  
  const { login, signInWithLinkedIn, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const newErrors: LoginErrors = {};
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid email address';
    if (!password) newErrors.password = 'Password is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const result = await login(email, password);
      if (result.success) {
        toast.success('Login successful! Redirecting...');
        navigate('/dashboard/personal', { replace: true });
      } else {
        setErrors({ general: result.error || 'Invalid credentials. Please try again.' });
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ general: 'An unexpected error occurred.' });
    }
  };

  const handleLinkedInLogin = async () => {
    try {
      await signInWithLinkedIn();
      // Auth context will handle navigation
    } catch (error) {
      console.error('LinkedIn login error:', error);
      toast.error('Failed to sign in with LinkedIn.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4 relative overflow-hidden">
      <BackgroundGradient />
      
      <GlassCard className="w-full max-w-md mx-4">
        <Card className="bg-transparent border-0 shadow-none">
          <CardHeader className="text-center">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                Welcome Back
              </CardTitle>
              <CardDescription className="text-gray-400 mt-2">
                Sign in to access your dashboard and supercharge your career
              </CardDescription>
            </motion.div>
          </CardHeader>
          
          <CardContent className="pt-2">
            {errors.general && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-3 bg-red-500/10 text-red-300 text-sm rounded-lg border border-red-500/20"
              >
                {errors.general}
              </motion.div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <motion.div 
                className="space-y-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Label htmlFor="email" className="text-gray-300">Email</Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    className="bg-white/5 border-white/10 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500/50 focus:border-transparent h-12 px-4"
                    required
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-400 mt-1 flex items-center">
                    <span className="mr-1">•</span> {errors.email}
                  </p>
                )}
              </motion.div>

              <motion.div 
                className="space-y-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-gray-300">Password</Label>
                  <Link 
                    to="/auth/forgot-password" 
                    className="text-sm text-blue-400 hover:text-blue-300 transition-colors hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    required
                    className="bg-white/5 border-white/10 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500/50 focus:border-transparent h-12 px-4 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-400 mt-1 flex items-center">
                    <span className="mr-1">•</span> {errors.password}
                  </p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Button 
                  type="submit" 
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </motion.div>

              <motion.div 
                className="relative my-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-transparent px-3 text-gray-500">
                    OR CONTINUE WITH
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-12 bg-white/5 border-white/10 hover:bg-white/10 text-white hover:text-white font-medium rounded-lg transition-colors duration-300 group"
                  onClick={handleLinkedInLogin}
                  disabled={isLoading}
                >
                  <Linkedin className="mr-2 h-5 w-5 text-blue-400 group-hover:text-blue-300 transition-colors" />
                  <span>Sign in with LinkedIn</span>
                </Button>
              </motion.div>

              <motion.p 
                className="text-center text-sm text-gray-400 mt-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                Don't have an account?{' '}
                <Link 
                  to="/auth/register" 
                  className="text-blue-400 hover:text-blue-300 font-medium transition-colors hover:underline"
                >
                  Create an account
                </Link>
              </motion.p>
            </form>
          </CardContent>
        </Card>
      </GlassCard>
    </div>
  );
};

export default LoginPersonalPage;
