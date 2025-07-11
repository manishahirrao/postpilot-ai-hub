import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { User, Briefcase, Target, Rocket, ArrowRight, ArrowLeft, Check, X, Upload, FileText, Users, Award, Heart } from 'lucide-react';
import { auth } from '@/lib/api';

// Removed unused AuthResponse interface

interface UploadResponse {
  fileUrl?: string;
  error?: string;
  [key: string]: any;
}

interface FormData {
  full_name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  job_title: string;
  company: string;
  industry: string;
  key_skills: string[];
  resume: File | null;
  main_objectives: string[];
  post_frequency: string;
  core_topics: string;
  top_performing_post: string;
  display_name?: string;
}



const PersonalRegisterPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    full_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
    job_title: '',
    company: '',
    industry: '',
    key_skills: [],
    resume: null,
    main_objectives: [],
    post_frequency: 'weekly',
    core_topics: '',
    top_performing_post: '',
    display_name: ''
  });
  const [currentSkill, setCurrentSkill] = useState('');
  const [currentObjective, setCurrentObjective] = useState('');
  const [loading, setLoading] = useState(false);
  const [resumeFileName, setResumeFileName] = useState('');

  const validateStep = (stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        return formData.full_name && formData.email && formData.password && formData.confirmPassword;
      case 2:
        return formData.job_title && formData.company && formData.industry && formData.key_skills.length > 0;
      case 3:
        return formData.main_objectives.length > 0 && formData.post_frequency && 
               formData.core_topics;
      default:
        return false;
    }
  };


  // Form handlers
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const allowedTypes = ['.pdf', '.doc', '.docx'];
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
      
      if (!fileExtension || !allowedTypes.includes(fileExtension)) {
        alert('Please upload a PDF, DOC, or DOCX file');
        return;
      }

      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      
      setFormData(prev => ({
        ...prev,
        resume: file
      }));
      setResumeFileName(file.name);
    }
  };

  const removeResume = () => {
    setFormData(prev => ({
      ...prev,
      resume: null
    }));
    setResumeFileName('');
  };

  const addSkill = () => {
    if (currentSkill.trim() && formData.key_skills.length < 5) {
      setFormData(prev => ({
        ...prev,
        key_skills: [...prev.key_skills, currentSkill.trim()]
      }));
      setCurrentSkill('');
    }
  };

  const removeSkill = (index: number) => {
    setFormData(prev => ({
      ...prev,
      key_skills: prev.key_skills.filter((_, i) => i !== index)
    }));
  };

  const addObjective = () => {
    if (currentObjective.trim() && formData.main_objectives.length < 3) {
      setFormData(prev => ({
        ...prev,
        main_objectives: [...prev.main_objectives, currentObjective.trim()]
      }));
      setCurrentObjective('');
    }
  };

  const removeObjective = (index: number) => {
    setFormData(prev => ({
      ...prev,
      main_objectives: prev.main_objectives.filter((_, i) => i !== index)
    }));
  };

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (!validateStep(3)) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);
    
    try {
      // Log cookies for debugging
      console.log('Current cookies:', document.cookie);
      
      // Destructure form data
      const { confirmPassword, resume } = formData;
      
      // Prepare the user data for registration in the format expected by the backend
      const userDataToSend = {
        email: formData.email,
        password: formData.password,
        name: formData.full_name,
        company: formData.company,
        jobTitle: formData.job_title, // Map job_title to jobTitle
        industry: formData.industry,
        keySkills: JSON.stringify(formData.key_skills || []), // Convert array to JSON string
        mainObjectives: JSON.stringify(formData.main_objectives || []), // Convert array to JSON string
        postFrequency: formData.post_frequency, // Map post_frequency to postFrequency
        coreTopics: formData.core_topics, // Map core_topics to coreTopics
        role: formData.role || 'user',
        displayName: formData.display_name || formData.full_name.split(' ')[0]
      };

      console.log('Sending registration data:', JSON.stringify(userDataToSend, null, 2));

      // Register the user
      try {
        const response = await auth.register(userDataToSend);
        console.log('Registration response:', response);

        if (response.success) {
          // If there's a resume, upload it after successful registration
          if (resume) {
            await uploadResumeWithRetry(resume);
          }

          // Registration successful
          alert('Account created successfully! You can now log in.');
          window.location.href = '/auth/login';
        } else {
          throw new Error(response.error || 'Registration failed');
        }
      } catch (registerError: any) {
        console.error('Registration API error:', registerError);
        if (registerError.response) {
          console.error('Response data:', registerError.response.data);
          console.error('Response status:', registerError.response.status);
          console.error('Response headers:', registerError.response.headers);
        }
        throw registerError;
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      const errorMessage = error.response?.data?.message || 
                         error.response?.data?.error || 
                         error.message || 
                         'Registration failed. Please try again.';
      alert(`Error: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to handle resume upload with retry logic
  const uploadResumeWithRetry = async (resume: File, retryCount = 0): Promise<UploadResponse> => {
    const MAX_RETRIES = 2;
    
    try {
      console.log('Attempting to upload resume...');
      const resumeFormData = new FormData();
      resumeFormData.append('resume', resume);
      
      // Get CSRF token from cookies
      const csrfToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('XSRF-TOKEN='))
        ?.split('=')[1];
        
      if (csrfToken) {
        const decodedToken = decodeURIComponent(csrfToken);
        resumeFormData.append('_csrf', decodedToken);
        console.log('Added CSRF token to resume upload');
      } else {
        console.warn('No CSRF token found in cookies');
      }

      const uploadResponse = await auth.uploadResume(resumeFormData);
      console.log('Resume upload response:', uploadResponse);
      
      if (uploadResponse && 'fileUrl' in uploadResponse) {
        console.log('Resume uploaded successfully:', uploadResponse.fileUrl);
        return uploadResponse;
      } else {
        throw new Error(uploadResponse?.error || 'Failed to upload resume');
      }
    } catch (error: any) {
      console.error('Resume upload error:', error);
      
      if (retryCount < MAX_RETRIES) {
        console.log(`Retrying resume upload (attempt ${retryCount + 1}/${MAX_RETRIES})...`);
        // Wait for 1 second before retrying
        await new Promise(resolve => setTimeout(resolve, 1000));
        return uploadResumeWithRetry(resume, retryCount + 1);
      }
      
      console.error('Max retries reached for resume upload');
      throw error;
    }
  };

  const handleLinkedInSignup = () => {
    console.log('LinkedIn OAuth would start here');
    alert('LinkedIn signup initiated!');
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    } else {
      alert('Please fill in all required fields before continuing');
    }
  };

  const prevStep = () => setStep(step - 1);

  const benefits = [
    'Generate unlimited LinkedIn posts',
    'AI-powered resume enhancement',
    'Smart job matching',
    'Career analytics and insights',
    'Priority support'
  ] as const;

  const industryOptions = [
    'Technology', 'Healthcare', 'Finance', 'FinTech', 'Health Tech',
    'Education', 'Marketing', 'Sales', 'Consulting', 'Manufacturing',
    'Retail', 'Real Estate', 'Legal', 'Non-profit', 'Government', 'Other'
  ] as const;

  const objectiveOptions = [
    'Build personal brand',
    'Generate leads',
    'Network with executives',
    'Find new job opportunities',
    'Establish thought leadership',
    'Grow professional network',
    'Share industry insights',
    'Attract clients'
  ] as const;

  return (
    <div className="min-h-screen flex flex-col hero-gradient">
      <main className="flex-1 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-96 h-96 opacity-30" />
          </div>
          <motion.div 
            className="absolute top-20 right-32 w-48 h-48"
            animate={{ rotate: -360, x: [0, 30, 0, -30, 0], y: [0, -15, 0, 15, 0] }}
            transition={{ rotate: { duration: 25, repeat: Infinity, ease: "linear" }, x: { duration: 12, repeat: Infinity, ease: "easeInOut" }, y: { duration: 8, repeat: Infinity, ease: "easeInOut" } }}
          >
            <div className="opacity-20" />
          </motion.div>
          <motion.div 
            className="absolute bottom-20 left-20 w-32 h-32"
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" }, scale: { duration: 10, repeat: Infinity, ease: "easeInOut" } }}
          >
            <div className="opacity-25" />
          </motion.div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-full px-4 py-2 border border-cyan-500/20 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <Rocket className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-medium">Start Your Journey</span>
            </motion.div>
            <h1 className="text-5xl font-bold leading-tight mb-6 text-gray-900">
              <span className="block">Join Our Community of</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">Ambitious Professionals</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Create your account and unlock powerful AI tools to accelerate your career growth.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left side - Form */}
            <motion.div 
              className="relative z-10" 
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ delay: 0.2 }}
            >
              <Card className="border-0 shadow-xl bg-background/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center space-x-2 mb-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}>
                      <User className="w-4 h-4" />
                    </div>
                    <div className={`w-8 h-1 ${step >= 2 ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}>
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <div className={`w-8 h-1 ${step >= 3 ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}>
                      <Target className="w-4 h-4" />
                    </div>
                  </div>
                  <CardTitle className="text-center">
                    {step === 1 && "Create your account"}
                    {step === 2 && "Professional details"}
                    {step === 3 && "Content preferences"}
                  </CardTitle>
                  <p className="text-center text-gray-600">
                    Step {step} of 3 - {step === 1 ? "Basic information" : step === 2 ? "Your professional context" : "Goals and content strategy"}
                  </p>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {step === 1 && (
                    <>
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

                      {/* Basic Profile Form */}
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="full_name">Full Name *</Label>
                          <Input
                            id="full_name"
                            type="text"
                            value={formData.full_name}
                            onChange={(e) => handleInputChange('full_name', e.target.value)}
                            placeholder="Enter your full name"
                            required
                            className="mt-1"
                          />
                        </div>

                        <div>
                          <Label htmlFor="display_name">Preferred Display Name *</Label>
                          <Input
                            id="display_name"
                            type="text"
                            value={formData.display_name}
                            onChange={(e) => handleInputChange('display_name', e.target.value)}
                            placeholder="How should we address you?"
                            required
                            className="mt-1"
                          />
                        </div>

                        <div>
                          <Label htmlFor="email">Email *</Label>
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
                          <Label htmlFor="role">I am a *</Label>
                          <Select 
                            value={formData.role} 
                            onValueChange={(value) => handleInputChange('role', value)}
                            required
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Select your role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="professional">Working Professional</SelectItem>
                              <SelectItem value="company">Company/Recruiter</SelectItem>
                              <SelectItem value="guest">Job Seeker</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="password">Password *</Label>
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
                          <Label htmlFor="confirmPassword">Confirm Password *</Label>
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
                          onClick={nextStep}
                          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                          size="lg"
                        >
                          Continue
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </>
                  )}

                  {step === 2 && (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="job_title">Current Job Title *</Label>
                        <Input
                          id="job_title"
                          type="text"
                          value={formData.job_title}
                          onChange={(e) => handleInputChange('job_title', e.target.value)}
                          placeholder="e.g. Senior Product Manager"
                          required
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="company">Company *</Label>
                        <Input
                          id="company"
                          type="text"
                          value={formData.company}
                          onChange={(e) => handleInputChange('company', e.target.value)}
                          placeholder="e.g. Google, Microsoft, Startup Inc."
                          required
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="industry">Primary Industry *</Label>
                        <Select 
                          value={formData.industry} 
                          onValueChange={(value) => handleInputChange('industry', value)} 
                          required
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select your industry" />
                          </SelectTrigger>
                          <SelectContent>
                            {industryOptions.map(industry => (
                              <SelectItem key={industry} value={industry.toLowerCase()}>{industry}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>Key Skills or Specialties (add at least 1) *</Label>
                        <div className="mt-1 space-y-2">
                          <div className="flex space-x-2">
                            <Input
                              value={currentSkill}
                              onChange={(e) => setCurrentSkill(e.target.value)}
                              placeholder="e.g. Product Strategy"
                              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                            />
                            <Button 
                              type="button" 
                              onClick={addSkill}
                              disabled={formData.key_skills.length >= 5 || !currentSkill.trim()}
                              size="sm"
                            >
                              Add
                            </Button>
                          </div>
                          {formData.key_skills.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {formData.key_skills.map((skill, index) => (
                                <span
                                  key={index}
                                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                                >
                                  {skill}
                                  <button
                                    type="button"
                                    onClick={() => removeSkill(index)}
                                    className="ml-1 text-indigo-600 hover:text-indigo-800"
                                  >
                                    ×
                                  </button>
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Resume Upload */}
                      <div>
                        <Label htmlFor="resume">Upload Resume *</Label>
                        <div className="mt-1">
                          {!formData.resume ? (
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-400 transition-colors">
                              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                              <p className="text-sm text-gray-600 mb-2">
                                Click to upload your resume
                              </p>
                              <p className="text-xs text-gray-500">
                                PDF, DOC, DOCX (Max 5MB)
                              </p>
                              <input
                                id="resume"
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={handleResumeUpload}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                required
                              />
                            </div>
                          ) : (
                            <div className="flex items-center justify-between p-3 border border-green-200 bg-green-50 rounded-lg">
                              <div className="flex items-center space-x-2">
                                <FileText className="w-5 h-5 text-green-600" />
                                <span className="text-sm font-medium text-green-800">
                                  {resumeFileName}
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={removeResume}
                                className="p-1 text-green-600 hover:text-green-800"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button
                          onClick={prevStep}
                          variant="outline"
                          className="flex-1"
                          size="lg"
                        >
                          <ArrowLeft className="w-4 h-4 mr-2" />
                          Back
                        </Button>
                        <Button
                          onClick={nextStep}
                          className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                          size="lg"
                        >
                          Continue
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-4">
                      <div>
                        <Label>Main Objectives (select at least 1) *</Label>
                        <div className="mt-1 space-y-2">
                          <div className="flex space-x-2">
                            <Select value="" onValueChange={(value) => {
                              if (value && formData.main_objectives.length < 3 && !formData.main_objectives.includes(value)) {
                                setFormData(prev => ({
                                  ...prev,
                                  main_objectives: [...prev.main_objectives, value]
                                }));
                              }
                            }}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select an objective" />
                              </SelectTrigger>
                              <SelectContent>
                                {objectiveOptions.map(objective => (
                                  <SelectItem 
                                    key={objective} 
                                    value={objective}
                                    disabled={formData.main_objectives.includes(objective)}
                                  >
                                    {objective}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex space-x-2">
                            <Input
                              value={currentObjective}
                              onChange={(e) => setCurrentObjective(e.target.value)}
                              placeholder="Or type a custom objective"
                              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addObjective())}
                            />
                            <Button 
                              type="button" 
                              onClick={addObjective}
                              disabled={formData.main_objectives.length >= 3 || !currentObjective.trim()}
                              size="sm"
                            >
                              Add
                            </Button>
                          </div>
                          {formData.main_objectives.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {formData.main_objectives.map((objective, index) => (
                                <span
                                  key={index}
                                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
                                >
                                  {objective}
                                  <button
                                    type="button"
                                    onClick={() => removeObjective(index)}
                                    className="ml-1 text-green-600 hover:text-green-800"
                                  >
                                    ×
                                  </button>
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="post_frequency">Post Frequency Preference *</Label>
                        <Select 
                          value={formData.post_frequency} 
                          onValueChange={(value) => handleInputChange('post_frequency', value)} 
                          required
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select frequency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="core_topics">3-5 Core Topic Areas *</Label>
                        <Input
                          id="core_topics"
                          type="text"
                          value={formData.core_topics}
                          onChange={(e) => handleInputChange('core_topics', e.target.value)}
                          placeholder="e.g. AI in healthcare, remote team management, product strategy"
                          required
                          className="mt-1"
                        />
                        <p className="text-xs text-gray-500 mt-1">Separate topics with commas</p>
                      </div>

                      <div>
                        <Label htmlFor="top_performing_post">Recent Top-Performing Post Link (Optional)</Label>
                        <Input
                          id="top_performing_post"
                          type="url"
                          value={formData.top_performing_post}
                          onChange={(e) => handleInputChange('top_performing_post', e.target.value)}
                          placeholder="https://linkedin.com/posts/..."
                          className="mt-1"
                        />
                        <p className="text-xs text-gray-500 mt-1">Help us understand your style</p>
                      </div>

                      <div className="flex space-x-2">
                        <Button
                          onClick={prevStep}
                          variant="outline"
                          className="flex-1"
                          size="lg"
                        >
                          <ArrowLeft className="w-4 h-4 mr-2" />
                          Back
                        </Button>
                        <Button
                          onClick={handleSubmit}
                          className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                          size="lg"
                          disabled={loading}
                        >
                          {loading ? (
                            'Creating account...'
                          ) : (
                            <>
                              Create Account
                              <Check className="w-4 h-4 ml-2" />
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  )}

                  {step === 1 && (
                    <div className="text-center">
                      <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <button className="text-indigo-600 hover:text-indigo-500 font-medium">
                          Sign in
                        </button>
                      </p>
                    </div>
                  )}
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
            </motion.div>

            {/* Right side - Benefits */}
            <motion.div 
              className="relative z-10 hidden lg:block" 
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ delay: 0.4 }}
            >
              <Card className="border-0 shadow-xl bg-background/80 backdrop-blur-sm h-full">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">Why Join Us?</CardTitle>
                  <CardDescription>Unlock the full potential of your professional journey</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {benefits.map((benefit, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center space-x-3 p-4 rounded-lg bg-background/50 backdrop-blur-sm border border-border/50 hover:shadow-md transition-all"
                        whileHover={{ x: 5 }}
                      >
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-md">
                          {index === 0 && <Rocket className="w-5 h-5 text-white" />}
                          {index === 1 && <Award className="w-5 h-5 text-white" />}
                          {index === 2 && <Users className="w-5 h-5 text-white" />}
                          {index === 3 && <Heart className="w-5 h-5 text-white" />}
                          {index === 4 && <Target className="w-5 h-5 text-white" />}
                        </div>
                        <span className="font-medium">{benefit}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PersonalRegisterPage;