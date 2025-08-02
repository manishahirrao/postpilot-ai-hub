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

interface RegisterErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

const PersonalRegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<RegisterErrors>({});

  const { register, signInWithLinkedIn, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const newErrors: RegisterErrors = {};
    if (!name) newErrors.name = 'Full name is required';
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid email address';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const result = await register({ name, email, password });
      if (result.success) {
        toast.success('Account created successfully! Redirecting...');
        navigate('/dashboard/personal', { replace: true });
      } else {
        setErrors({ general: result.error || 'Registration failed. Please try again.' });
      }
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ general: 'An unexpected error occurred.' });
    }
  };

  const handleLinkedInLogin = async () => {
    try {
      await signInWithLinkedIn();
      // Auth context will handle navigation
    } catch (error) {
      console.error('LinkedIn login error:', error);
      toast.error('Failed to sign up with LinkedIn.');
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
                Create an Account
              </CardTitle>
              <CardDescription className="text-gray-400 mt-2">
                Join our community of ambitious professionals
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
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <motion.div 
                className="space-y-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Label htmlFor="name" className="text-gray-300">Full Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isLoading}
                  className="bg-white/5 border-white/10 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500/50 focus:border-transparent h-12 px-4"
                  required
                />
                {errors.name && (
                  <p className="text-sm text-red-400 mt-1 flex items-center">
                    <span className="mr-1">•</span> {errors.name}
                  </p>
                )}
              </motion.div>
              
              <motion.div 
                className="space-y-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <Label htmlFor="email" className="text-gray-300">Email</Label>
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
                <Label htmlFor="password" className="text-gray-300">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    className="bg-white/5 border-white/10 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500/50 focus:border-transparent h-12 px-4 pr-10"
                    required
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
                className="space-y-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                <Label htmlFor="confirmPassword" className="text-gray-300">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={isLoading}
                    className="bg-white/5 border-white/10 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500/50 focus:border-transparent h-12 px-4 pr-10"
                    required
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
                {errors.confirmPassword && (
                  <p className="text-sm text-red-400 mt-1 flex items-center">
                    <span className="mr-1">•</span> {errors.confirmPassword}
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
                      Creating account...
                    </>
                  ) : (
                    <>
                      Create Account
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
                  <span>Sign up with LinkedIn</span>
                </Button>
              </motion.div>

              <motion.p 
                className="text-center text-sm text-gray-400 mt-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                Already have an account?{' '}
                <Link 
                  to="/auth/login" 
                  className="text-blue-400 hover:text-blue-300 font-medium transition-colors hover:underline"
                >
                  Sign in
                </Link>
              </motion.p>
            </form>
          </CardContent>
        </Card>
      </GlassCard>
    </div>
  );
};

export default PersonalRegisterPage;
//                                 Click to upload your resume
//                               </p>
//                               <p className="text-xs text-gray-500">
//                                 PDF, DOC, DOCX (Max 5MB)
//                               </p>
//                               <input
//                                 id="resume"
//                                 type="file"
//                                 accept=".pdf,.doc,.docx"
//                                 onChange={handleResumeUpload}
//                                 className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//                                 required
//                               />
//                             </div>
//                           ) : (
//                             <div className="flex items-center justify-between p-3 border border-green-200 bg-green-50 rounded-lg">
//                               <div className="flex items-center space-x-2">
//                                 <FileText className="w-5 h-5 text-green-600" />
//                                 <span className="text-sm font-medium text-green-800">
//                                   {resumeFileName}
//                                 </span>
//                               </div>
//                               <button
//                                 type="button"
//                                 onClick={removeResume}
//                                 className="p-1 text-green-600 hover:text-green-800"
//                               >
//                                 <X className="w-4 h-4" />
//                               </button>
//                             </div>
//                           )}
//                         </div>
//                       </div>

//                       <div className="flex space-x-2">
//                         <Button
//                           onClick={prevStep}
//                           variant="outline"
//                           className="flex-1"
//                           size="lg"
//                         >
//                           <ArrowLeft className="w-4 h-4 mr-2" />
//                           Back
//                         </Button>
//                         <Button
//                           onClick={nextStep}
//                           className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
//                           size="lg"
//                         >
//                           Continue
//                           <ArrowRight className="w-4 h-4 ml-2" />
//                         </Button>
//                       </div>
//                     </div>
//                   )}

//                   {step === 3 && (
//                     <div className="space-y-4">
//                       <div>
//                         <Label>Main Objectives (select at least 1) *</Label>
//                         <div className="mt-1 space-y-2">
//                           <div className="flex space-x-2">
//                             <Select value="" onValueChange={(value) => {
//                               if (value && formData.main_objectives.length < 3 && !formData.main_objectives.includes(value)) {
//                                 setFormData(prev => ({
//                                   ...prev,
//                                   main_objectives: [...prev.main_objectives, value]
//                                 }));
//                               }
//                             }}>
//                               <SelectTrigger>
//                                 <SelectValue placeholder="Select an objective" />
//                               </SelectTrigger>
//                               <SelectContent>
//                                 {objectiveOptions.map(objective => (
//                                   <SelectItem 
//                                     key={objective} 
//                                     value={objective}
//                                     disabled={formData.main_objectives.includes(objective)}
//                                   >
//                                     {objective}
//                                   </SelectItem>
//                                 ))}
//                               </SelectContent>
//                             </Select>
//                           </div>
//                           <div className="flex space-x-2">
//                             <Input
//                               value={currentObjective}
//                               onChange={(e) => setCurrentObjective(e.target.value)}
//                               placeholder="Or type a custom objective"
//                               onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addObjective())}
//                             />
//                             <Button 
//                               type="button" 
//                               onClick={addObjective}
//                               disabled={formData.main_objectives.length >= 3 || !currentObjective.trim()}
//                               size="sm"
//                             >
//                               Add
//                             </Button>
//                           </div>
//                           {formData.main_objectives.length > 0 && (
//                             <div className="flex flex-wrap gap-2">
//                               {formData.main_objectives.map((objective, index) => (
//                                 <span
//                                   key={index}
//                                   className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
//                                 >
//                                   {objective}
//                                   <button
//                                     type="button"
//                                     onClick={() => removeObjective(index)}
//                                     className="ml-1 text-green-600 hover:text-green-800"
//                                   >
//                                     ×
//                                   </button>
//                                 </span>
//                               ))}
//                             </div>
//                           )}
//                         </div>
//                       </div>

//                       <div>
//                         <Label htmlFor="post_frequency">Post Frequency Preference *</Label>
//                         <Select 
//                           value={formData.post_frequency} 
//                           onValueChange={(value) => handleInputChange('post_frequency', value)} 
//                           required
//                         >
//                           <SelectTrigger className="mt-1">
//                             <SelectValue placeholder="Select frequency" />
//                           </SelectTrigger>
//                           <SelectContent>
//                             <SelectItem value="daily">Daily</SelectItem>
//                             <SelectItem value="weekly">Weekly</SelectItem>
//                             <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
//                           </SelectContent>
//                         </Select>
//                       </div>

//                       <div>
//                         <Label htmlFor="core_topics">3-5 Core Topic Areas *</Label>
//                         <Input
//                           id="core_topics"
//                           type="text"
//                           value={formData.core_topics}
//                           onChange={(e) => handleInputChange('core_topics', e.target.value)}
//                           placeholder="e.g. AI in healthcare, remote team management, product strategy"
//                           required
//                           className="mt-1"
//                         />
//                         <p className="text-xs text-gray-500 mt-1">Separate topics with commas</p>
//                       </div>

//                       <div>
//                         <Label htmlFor="top_performing_post">Recent Top-Performing Post Link (Optional)</Label>
//                         <Input
//                           id="top_performing_post"
//                           type="url"
//                           value={formData.top_performing_post}
//                           onChange={(e) => handleInputChange('top_performing_post', e.target.value)}
//                           placeholder="https://linkedin.com/posts/..."
//                           className="mt-1"
//                         />
//                         <p className="text-xs text-gray-500 mt-1">Help us understand your style</p>
//                       </div>

//                       <div className="flex space-x-2">
//                         <Button
//                           onClick={prevStep}
//                           variant="outline"
//                           className="flex-1"
//                           size="lg"
//                         >
//                           <ArrowLeft className="w-4 h-4 mr-2" />
//                           Back
//                         </Button>
//                         <Button
//                           onClick={handleSubmit}
//                           className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
//                           size="lg"
//                           disabled={loading}
//                         >
//                           {loading ? (
//                             'Creating account...'
//                           ) : (
//                             <>
//                               Create Account
//                               <Check className="w-4 h-4 ml-2" />
//                             </>
//                           )}
//                         </Button>
//                       </div>
//                     </div>
//                   )}

//                   {step === 1 && (
//                     <div className="text-center">
//                       <p className="text-sm text-gray-600">
//                         Already have an account?{' '}
//                         <button className="text-indigo-600 hover:text-indigo-500 font-medium">
//                           Sign in
//                         </button>
//                       </p>
//                     </div>
//                   )}
//                 </CardContent>
//               </Card>

//               <div className="mt-6 text-center">
//                 <p className="text-xs text-gray-500">
//                   By creating an account, you agree to our{' '}
//                   <a href="#" className="text-indigo-600 hover:text-indigo-500">
//                     Terms of Service
//                   </a>{' '}
//                   and{' '}
//                   <a href="#" className="text-indigo-600 hover:text-indigo-500">
//                     Privacy Policy
//                   </a>
//                 </p>
//               </div>
//             </motion.div>

//             {/* Right side - Benefits */}
//             <motion.div 
//               className="relative z-10 hidden lg:block" 
//               initial={{ opacity: 0, x: 20 }} 
//               animate={{ opacity: 1, x: 0 }} 
//               transition={{ delay: 0.4 }}
//             >
//               <Card className="border-0 shadow-xl bg-background/80 backdrop-blur-sm h-full">
//                 <CardHeader>
//                   <CardTitle className="text-2xl font-bold">Why Join Us?</CardTitle>
//                   <CardDescription>Unlock the full potential of your professional journey</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-4">
//                     {benefits.map((benefit, index) => (
//                       <motion.div
//                         key={index}
//                         className="flex items-center space-x-3 p-4 rounded-lg bg-background/50 backdrop-blur-sm border border-border/50 hover:shadow-md transition-all"
//                         whileHover={{ x: 5 }}
//                       >
//                         <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-md">
//                           {index === 0 && <Rocket className="w-5 h-5 text-white" />}
//                           {index === 1 && <Award className="w-5 h-5 text-white" />}
//                           {index === 2 && <Users className="w-5 h-5 text-white" />}
//                           {index === 3 && <Heart className="w-5 h-5 text-white" />}
//                           {index === 4 && <Target className="w-5 h-5 text-white" />}
//                         </div>
//                         <span className="font-medium">{benefit}</span>
//                       </motion.div>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default PersonalRegisterPage;