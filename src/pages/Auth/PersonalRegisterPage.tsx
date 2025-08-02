import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Eye, EyeOff, Loader2, Linkedin } from 'lucide-react';
import { toast } from 'sonner';

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
    <div className="min-h-screen flex items-center justify-center bg-muted/40 p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold tracking-tight">Create an Account</CardTitle>
            <CardDescription>Join our community of ambitious professionals.</CardDescription>
          </CardHeader>
          <CardContent>
            {errors.general && (
              <div className="mb-4 p-3 bg-destructive/10 text-destructive text-sm rounded-md border border-destructive/20">
                {errors.general}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isLoading}
                  required
                />
                {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  required
                />
                {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && <p className="text-sm text-destructive mt-1">{errors.password}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isLoading}
                  required
                />
                {errors.confirmPassword && <p className="text-sm text-destructive mt-1">{errors.confirmPassword}</p>}
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Create Account'}
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full"
              onClick={handleLinkedInLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <><Linkedin className="mr-2 h-4 w-4" /> Sign Up with LinkedIn</>
              )}
            </Button>

            <div className="mt-6 text-center text-sm">
              Already have an account?{' '}
              <Link to="/auth/login" className="font-medium text-primary hover:underline">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
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