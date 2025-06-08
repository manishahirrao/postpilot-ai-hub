import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowRight, Check, ArrowLeft, User, Briefcase, Target, Upload, FileText, X, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const RegisterPage = () => {
  const [formData, setFormData] = useState({
    // Basic Profile & Authentication
    name: '',
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    
    // Role & Industry Context
    jobTitle: '',
    company: '',
    industry: '',
    keySkills: [],
    resume: null,
    
    // Goals & Content Objectives
    mainObjectives: [],
    postFrequency: '',
    coreTopics: '',
    topPerformingPost: ''
  });
  
  const [currentSkill, setCurrentSkill] = useState('');
  const [currentObjective, setCurrentObjective] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [resumeFileName, setResumeFileName] = useState('');
  const [validationError, setValidationError] = useState('');
  const [showValidation, setShowValidation] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file type
      const allowedTypes = ['.pdf', '.doc', '.docx'];
      const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
      
      if (!allowedTypes.includes(fileExtension)) {
        alert('Please upload a PDF, DOC, or DOCX file');
        return;
      }

      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      setFormData(prev => ({ ...prev, resume: file }));
      setResumeFileName(file.name);
    }
  };

  const removeResume = () => {
    setFormData(prev => ({ ...prev, resume: null }));
    setResumeFileName('');
  };

  const addSkill = () => {
    if (currentSkill.trim() && formData.keySkills.length < 5) {
      setFormData(prev => ({
        ...prev,
        keySkills: [...prev.keySkills, currentSkill.trim()]
      }));
      setCurrentSkill('');
    }
  };

  const removeSkill = (index) => {
    setFormData(prev => ({
      ...prev,
      keySkills: prev.keySkills.filter((_, i) => i !== index)
    }));
  };

  const addObjective = () => {
    if (currentObjective.trim() && formData.mainObjectives.length < 3) {
      setFormData(prev => ({
        ...prev,
        mainObjectives: [...prev.mainObjectives, currentObjective.trim()]
      }));
      setCurrentObjective('');
    }
  };

  const removeObjective = (index) => {
    setFormData(prev => ({
      ...prev,
      mainObjectives: prev.mainObjectives.filter((_, i) => i !== index)
    }));
  };

  const validateStep = (stepNumber) => {
    let errors = [];
    
    switch (stepNumber) {
      case 1:
        if (!formData.name.trim()) errors.push('Full Name');
        if (!formData.displayName.trim()) errors.push('Preferred Display Name');
        if (!formData.email.trim()) errors.push('Email');
        if (!formData.password) errors.push('Password');
        if (!formData.confirmPassword) errors.push('Confirm Password');
        if (!formData.role) errors.push('Role selection');
        if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
          errors.push('Password confirmation (passwords must match)');
        }
        break;
      case 2:
        if (!formData.jobTitle.trim()) errors.push('Job Title');
        if (!formData.company.trim()) errors.push('Company');
        if (!formData.industry) errors.push('Industry');
        if (formData.keySkills.length === 0) errors.push('At least one skill');
        if (!formData.resume) errors.push('Resume upload');
        break;
      case 3:
        if (formData.mainObjectives.length === 0) errors.push('At least one objective');
        if (!formData.postFrequency) errors.push('Post frequency');
        if (!formData.coreTopics.trim()) errors.push('Core topics');
        break;
      default:
        return { isValid: false, errors: [] };
    }
    
    return {
      isValid: errors.length === 0,
      errors: errors
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validation = validateStep(3);
    if (!validation.isValid) {
      setValidationError(`Please complete the following required fields: ${validation.errors.join(', ')}`);
      setShowValidation(true);
      setTimeout(() => setShowValidation(false), 5000);
      
      return;
    }
      navigate('/Home/LoginPersonalPage');

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Registration data:', formData);
      alert('Account created successfully!');
      setLoading(false);
    }, 2000);
  };

  const handleLinkedInSignup = () => {
    console.log('LinkedIn OAuth would start here');
    alert('LinkedIn signup initiated!');
  };

  const nextStep = () => {
    // Clear any previous validation messages
    setShowValidation(false);
    
    const validation = validateStep(step);
    if (validation.isValid) {
      setStep(step + 1);
      setValidationError('');
    } else {
      setValidationError(`Please complete the following required fields: ${validation.errors.join(', ')}`);
      setShowValidation(true);
      // Auto-hide validation message after 5 seconds
      setTimeout(() => setShowValidation(false), 5000);
    }
  };

  const prevStep = () => setStep(step - 1);

  const benefits = [
    'Generate unlimited LinkedIn posts',
    'AI-powered resume enhancement',
    'Smart job matching',
    'Career analytics and insights',
    'Priority support'
  ];

  const industryOptions = [
    'Technology', 'Healthcare', 'Finance', 'FinTech', 'Health Tech',
    'Education', 'Marketing', 'Sales', 'Consulting', 'Manufacturing',
    'Retail', 'Real Estate', 'Legal', 'Non-profit', 'Government', 'Other'
  ];

  const objectiveOptions = [
    'Build personal brand',
    'Generate leads',
    'Network with executives',
    'Find new job opportunities',
    'Establish thought leadership',
    'Grow professional network',
    'Share industry insights',
    'Attract clients'
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
                  Complete all required fields in each step. Upload your resume for better AI-powered career recommendations!
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="flex items-center justify-center">
            <div className="max-w-md w-full">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-center space-x-2 mb-4">
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
                  {/* Validation Alert */}
                  {showValidation && (
                    <Alert className="border-red-200 bg-red-50">
                      <AlertCircle className="h-4 w-4 text-red-600" />
                      <AlertDescription className="text-red-800">
                        {validationError}
                      </AlertDescription>
                    </Alert>
                  )}

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
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            type="text"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            placeholder="Enter your full name"
                            required
                            className={`mt-1 ${showValidation && !formData.name.trim() ? 'border-red-300 focus:border-red-500' : ''}`}
                          />
                        </div>

                        <div>
                          <Label htmlFor="displayName">Preferred Display Name *</Label>
                          <Input
                            id="displayName"
                            type="text"
                            value={formData.displayName}
                            onChange={(e) => handleInputChange('displayName', e.target.value)}
                            placeholder="How should we address you?"
                            required
                            className={`mt-1 ${showValidation && !formData.displayName.trim() ? 'border-red-300 focus:border-red-500' : ''}`}
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
                            className={`mt-1 ${showValidation && !formData.email.trim() ? 'border-red-300 focus:border-red-500' : ''}`}
                          />
                        </div>

                        <div>
                          <Label htmlFor="role">I am a *</Label>
                          <Select value={formData.role} onValueChange={(value) => handleInputChange('role', value)} required>
                            <SelectTrigger className={`mt-1 ${showValidation && !formData.role ? 'border-red-300 focus:border-red-500' : ''}`}>
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
                            className={`mt-1 ${showValidation && !formData.password ? 'border-red-300 focus:border-red-500' : ''}`}
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
                            className={`mt-1 ${showValidation && (!formData.confirmPassword || formData.password !== formData.confirmPassword) ? 'border-red-300 focus:border-red-500' : ''}`}
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
                        <Label htmlFor="jobTitle">Current Job Title *</Label>
                        <Input
                          id="jobTitle"
                          type="text"
                          value={formData.jobTitle}
                          onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                          placeholder="e.g. Senior Product Manager"
                          required
                          className={`mt-1 ${showValidation && !formData.jobTitle.trim() ? 'border-red-300 focus:border-red-500' : ''}`}
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
                          className={`mt-1 ${showValidation && !formData.company.trim() ? 'border-red-300 focus:border-red-500' : ''}`}
                        />
                      </div>

                      <div>
                        <Label htmlFor="industry">Primary Industry *</Label>
                        <Select value={formData.industry} onValueChange={(value) => handleInputChange('industry', value)} required>
                          <SelectTrigger className={`mt-1 ${showValidation && !formData.industry ? 'border-red-300 focus:border-red-500' : ''}`}>
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
                              className={showValidation && formData.keySkills.length === 0 ? 'border-red-300 focus:border-red-500' : ''}
                            />
                            <Button 
                              type="button" 
                              onClick={addSkill}
                              disabled={formData.keySkills.length >= 5 || !currentSkill.trim()}
                              size="sm"
                            >
                              Add
                            </Button>
                          </div>
                          {formData.keySkills.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {formData.keySkills.map((skill, index) => (
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
                            <div className={`border-2 border-dashed rounded-lg p-6 text-center hover:border-indigo-400 transition-colors ${showValidation && !formData.resume ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}>
                              <Upload className={`w-8 h-8 mx-auto mb-2 ${showValidation && !formData.resume ? 'text-red-400' : 'text-gray-400'}`} />
                              <p className={`text-sm mb-2 ${showValidation && !formData.resume ? 'text-red-600' : 'text-gray-600'}`}>
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
                              if (value && formData.mainObjectives.length < 3 && !formData.mainObjectives.includes(value)) {
                                setFormData(prev => ({
                                  ...prev,
                                  mainObjectives: [...prev.mainObjectives, value]
                                }));
                              }
                            }}>
                              <SelectTrigger className={showValidation && formData.mainObjectives.length === 0 ? 'border-red-300 focus:border-red-500' : ''}>
                                <SelectValue placeholder="Select an objective" />
                              </SelectTrigger>
                              <SelectContent>
                                {objectiveOptions.map(objective => (
                                  <SelectItem 
                                    key={objective} 
                                    value={objective}
                                    disabled={formData.mainObjectives.includes(objective)}
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
                              className={showValidation && formData.mainObjectives.length === 0 ? 'border-red-300 focus:border-red-500' : ''}
                            />
                            <Button 
                              type="button" 
                              onClick={addObjective}
                              disabled={formData.mainObjectives.length >= 3 || !currentObjective.trim()}
                              size="sm"
                            >
                              Add
                            </Button>
                          </div>
                          {formData.mainObjectives.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {formData.mainObjectives.map((objective, index) => (
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
                        <Label htmlFor="postFrequency">Post Frequency Preference *</Label>
                        <Select value={formData.postFrequency} onValueChange={(value) => handleInputChange('postFrequency', value)} required>
                          <SelectTrigger className={`mt-1 ${showValidation && !formData.postFrequency ? 'border-red-300 focus:border-red-500' : ''}`}>
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
                        <Label htmlFor="coreTopics">3-5 Core Topic Areas *</Label>
                        <Input
                          id="coreTopics"
                          type="text"
                          value={formData.coreTopics}
                          onChange={(e) => handleInputChange('coreTopics', e.target.value)}
                          placeholder="e.g. AI in healthcare, remote team management, product strategy"
                          required
                          className={`mt-1 ${showValidation && !formData.coreTopics.trim() ? 'border-red-300 focus:border-red-500' : ''}`}
                        />
                        <p className="text-xs text-gray-500 mt-1">Separate topics with commas</p>
                      </div>

                      <div>
                        <Label htmlFor="topPerformingPost">Recent Top-Performing Post Link (Optional)</Label>
                        <Input
                          id="topPerformingPost"
                          type="url"
                          value={formData.topPerformingPost}
                          onChange={(e) => handleInputChange('topPerformingPost', e.target.value)}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;