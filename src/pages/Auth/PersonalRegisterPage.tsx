import { useState, useEffect, useRef } from "react";
import { Eye, EyeOff, User, Mail, Lock, Briefcase, MapPin, Globe, Search, ChevronDown } from "lucide-react";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AuthService, type AuthCredentials } from '@/services/authService';

interface FormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  linkedinUrl: string;
  profession: string;
  industry: string;
  experienceLevel: string;
  location: string;
}

interface FormErrors {
  [key: string]: string;
}

interface LocationSuggestion {
  display_name: string;
  lat: string;
  lon: string;
  place_id: number;
}

interface JobTitle {
  title: string;
  category: string;
}

const jobTitles: JobTitle[] = [
  // Technology
  { title: "Software Engineer", category: "Technology" },
  { title: "Frontend Developer", category: "Technology" },
  { title: "Backend Developer", category: "Technology" },
  { title: "Full Stack Developer", category: "Technology" },
  { title: "DevOps Engineer", category: "Technology" },
  { title: "Data Scientist", category: "Technology" },
  { title: "Data Analyst", category: "Technology" },
  { title: "Machine Learning Engineer", category: "Technology" },
  { title: "AI Engineer", category: "Technology" },
  { title: "Mobile App Developer", category: "Technology" },
  { title: "iOS Developer", category: "Technology" },
  { title: "Android Developer", category: "Technology" },
  { title: "UI/UX Designer", category: "Technology" },
  { title: "Product Manager", category: "Technology" },
  { title: "Technical Lead", category: "Technology" },
  { title: "System Administrator", category: "Technology" },
  { title: "Database Administrator", category: "Technology" },
  { title: "Cybersecurity Specialist", category: "Technology" },
  { title: "Cloud Architect", category: "Technology" },
  { title: "QA Engineer", category: "Technology" },
  
  // Business & Management
  { title: "Business Analyst", category: "Business" },
  { title: "Project Manager", category: "Business" },
  { title: "Operations Manager", category: "Business" },
  { title: "General Manager", category: "Business" },
  { title: "CEO", category: "Business" },
  { title: "CTO", category: "Business" },
  { title: "CFO", category: "Business" },
  { title: "COO", category: "Business" },
  { title: "Business Development Manager", category: "Business" },
  { title: "Strategy Consultant", category: "Business" },
  { title: "Management Consultant", category: "Business" },
  
  // Marketing & Sales
  { title: "Marketing Manager", category: "Marketing" },
  { title: "Digital Marketing Specialist", category: "Marketing" },
  { title: "Content Marketing Manager", category: "Marketing" },
  { title: "Social Media Manager", category: "Marketing" },
  { title: "SEO Specialist", category: "Marketing" },
  { title: "Brand Manager", category: "Marketing" },
  { title: "Sales Manager", category: "Sales" },
  { title: "Sales Representative", category: "Sales" },
  { title: "Account Manager", category: "Sales" },
  { title: "Business Development Representative", category: "Sales" },
  { title: "Customer Success Manager", category: "Sales" },
  
  // Finance & Accounting
  { title: "Financial Analyst", category: "Finance" },
  { title: "Accountant", category: "Finance" },
  { title: "Investment Banker", category: "Finance" },
  { title: "Financial Advisor", category: "Finance" },
  { title: "Auditor", category: "Finance" },
  { title: "Tax Consultant", category: "Finance" },
  { title: "Risk Analyst", category: "Finance" },
  { title: "Credit Analyst", category: "Finance" },
  
  // Healthcare
  { title: "Doctor", category: "Healthcare" },
  { title: "Nurse", category: "Healthcare" },
  { title: "Pharmacist", category: "Healthcare" },
  { title: "Physical Therapist", category: "Healthcare" },
  { title: "Medical Technician", category: "Healthcare" },
  { title: "Healthcare Administrator", category: "Healthcare" },
  { title: "Dentist", category: "Healthcare" },
  { title: "Veterinarian", category: "Healthcare" },
  
  // Education
  { title: "Teacher", category: "Education" },
  { title: "Professor", category: "Education" },
  { title: "Training Specialist", category: "Education" },
  { title: "Academic Advisor", category: "Education" },
  { title: "Curriculum Developer", category: "Education" },
  { title: "Educational Consultant", category: "Education" },
  
  // Human Resources
  { title: "HR Manager", category: "Human Resources" },
  { title: "HR Generalist", category: "Human Resources" },
  { title: "Recruiter", category: "Human Resources" },
  { title: "Talent Acquisition Specialist", category: "Human Resources" },
  { title: "HR Business Partner", category: "Human Resources" },
  { title: "Compensation Analyst", category: "Human Resources" },
  
  // Engineering
  { title: "Mechanical Engineer", category: "Engineering" },
  { title: "Civil Engineer", category: "Engineering" },
  { title: "Electrical Engineer", category: "Engineering" },
  { title: "Chemical Engineer", category: "Engineering" },
  { title: "Aerospace Engineer", category: "Engineering" },
  { title: "Environmental Engineer", category: "Engineering" },
  { title: "Industrial Engineer", category: "Engineering" },
  
  // Creative & Design
  { title: "Graphic Designer", category: "Creative" },
  { title: "Web Designer", category: "Creative" },
  { title: "Art Director", category: "Creative" },
  { title: "Creative Director", category: "Creative" },
  { title: "Video Editor", category: "Creative" },
  { title: "Photographer", category: "Creative" },
  { title: "Copywriter", category: "Creative" },
  { title: "Content Writer", category: "Creative" },
  
  // Legal
  { title: "Lawyer", category: "Legal" },
  { title: "Legal Counsel", category: "Legal" },
  { title: "Paralegal", category: "Legal" },
  { title: "Legal Assistant", category: "Legal" },
  { title: "Compliance Officer", category: "Legal" },
  
  // Operations & Logistics
  { title: "Supply Chain Manager", category: "Operations" },
  { title: "Logistics Coordinator", category: "Operations" },
  { title: "Warehouse Manager", category: "Operations" },
  { title: "Operations Analyst", category: "Operations" },
  { title: "Process Improvement Specialist", category: "Operations" },
  
  // Customer Service
  { title: "Customer Service Representative", category: "Customer Service" },
  { title: "Customer Support Specialist", category: "Customer Service" },
  { title: "Call Center Agent", category: "Customer Service" },
  { title: "Technical Support Specialist", category: "Customer Service" },
  
  // Real Estate
  { title: "Real Estate Agent", category: "Real Estate" },
  { title: "Property Manager", category: "Real Estate" },
  { title: "Real Estate Analyst", category: "Real Estate" },
  { title: "Mortgage Broker", category: "Real Estate" }
];

const industries = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Marketing",
  "Sales",
  "Engineering",
  "Design",
  "Human Resources",
  "Consulting",
  "Real Estate",
  "Manufacturing",
  "Retail",
  "Media & Communications",
  "Legal",
  "Non-profit",
  "Government",
  "Other"
];

const experienceLevels = [
  "Fresher",
  "Mid",
  "Senior"
];

const PersonalRegisterPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    linkedinUrl: "",
    profession: "",
    industry: "",
    experienceLevel: "",
    location: ""
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Location autocomplete states
  const [locationSuggestions, setLocationSuggestions] = useState<LocationSuggestion[]>([]);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  
  // Job title dropdown states
  const [filteredJobTitles, setFilteredJobTitles] = useState<JobTitle[]>(jobTitles);
  const [showJobTitles, setShowJobTitles] = useState(false);
  const [jobSearchTerm, setJobSearchTerm] = useState("");
  
  // Refs for click outside detection
  const locationRef = useRef<HTMLDivElement>(null);
  const jobTitleRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (locationRef.current && !locationRef.current.contains(event.target as Node)) {
        setShowLocationSuggestions(false);
      }
      if (jobTitleRef.current && !jobTitleRef.current.contains(event.target as Node)) {
        setShowJobTitles(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch location suggestions from OpenStreetMap Nominatim API
  const fetchLocationSuggestions = async (query: string) => {
    if (query.length < 3) {
      setLocationSuggestions([]);
      return;
    }

    setLocationLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&addressdetails=1`
      );
      const data = await response.json();
      setLocationSuggestions(data);
    } catch (error) {
      console.error('Error fetching location suggestions:', error);
      setLocationSuggestions([]);
    } finally {
      setLocationLoading(false);
    }
  };

  // Debounced location search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (formData.location) {
        fetchLocationSuggestions(formData.location);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [formData.location]);

  // Filter job titles based on search
  useEffect(() => {
    if (jobSearchTerm) {
      const filtered = jobTitles.filter(job =>
        job.title.toLowerCase().includes(jobSearchTerm.toLowerCase()) ||
        job.category.toLowerCase().includes(jobSearchTerm.toLowerCase())
      );
      setFilteredJobTitles(filtered);
    } else {
      setFilteredJobTitles(jobTitles);
    }
  }, [jobSearchTerm]);

  const validateForm = () => {
    const newErrors: FormErrors = {};

    // Full Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    // Confirm Password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // LinkedIn URL validation
    const linkedinRegex = /^https:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/;
    if (!formData.linkedinUrl) {
      newErrors.linkedinUrl = "LinkedIn profile URL is required";
    } else if (!linkedinRegex.test(formData.linkedinUrl)) {
      newErrors.linkedinUrl = "Please enter a valid LinkedIn profile URL";
    }

    // Profession validation
    if (!formData.profession.trim()) {
      newErrors.profession = "Profession/Job title is required";
    }

    // Industry validation
    if (!formData.industry) {
      newErrors.industry = "Please select an industry";
    }

    // Experience Level validation
    if (!formData.experienceLevel) {
      newErrors.experienceLevel = "Please select your experience level";
    }

    // Location validation
    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLocationSelect = (location: LocationSuggestion) => {
    setFormData(prev => ({
      ...prev,
      location: location.display_name
    }));
    setShowLocationSuggestions(false);
    
    // Clear location error if exists
    if (errors.location) {
      setErrors(prev => ({
        ...prev,
        location: ""
      }));
    }
  };

  const handleJobTitleSelect = (jobTitle: string) => {
    setFormData(prev => ({
      ...prev,
      profession: jobTitle
    }));
    setJobSearchTerm("");
    setShowJobTitles(false);
    
    // Clear profession error if exists
    if (errors.profession) {
      setErrors(prev => ({
        ...prev,
        profession: ""
      }));
    }
  };

  const handleLocationInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      location: value
    }));
    setShowLocationSuggestions(true);
    
    // Clear error when user starts typing
    if (errors.location) {
      setErrors(prev => ({
        ...prev,
        location: ""
      }));
    }
  };

  const handleJobTitleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      profession: value
    }));
    setJobSearchTerm(value);
    setShowJobTitles(true);
    
    // Clear error when user starts typing
    if (errors.profession) {
      setErrors(prev => ({
        ...prev,
        profession: ""
      }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const authService = new AuthService();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      const response = await authService.register({
        email: formData.email,
        password: formData.password,
        account_type: 'personal' as const,
        profile: {
          full_name: formData.fullName,
          headline: formData.profession,
          industry: formData.industry,
          location: formData.location,
          profile_picture: null,
          linkedin_url: formData.linkedinUrl
        }
      });

      // Handle different response statuses
      if (response.status === 'success') {
        // Show verification email sent popup
        toast.success(
          <div className="flex flex-col gap-2 p-2">
            <div className="font-bold text-lg">🎉 Registration Successful!</div>
            <div>We've sent a verification email to <span className="font-semibold">{formData.email}</span></div>
            <div>Please check your inbox and verify your email to continue.</div>
            <button 
              className="mt-2 text-blue-600 hover:text-blue-800 font-medium text-left"
              onClick={() => {
                // Open email client in a new tab
                window.open('https://mail.google.com', '_blank');
              }}
            >
              Open Email
            </button>
          </div>,
          {
            position: 'top-center',
            autoClose: 10000, // Auto close after 10 seconds
            closeOnClick: false,
            draggable: true,
            closeButton: true,
            className: 'w-full max-w-md',
          }
        );
        
        // Navigate to verify email page with the email as a query parameter
        const verifyUrl = `/auth/verify-email?email=${encodeURIComponent(formData.email)}`;
        navigate(verifyUrl, { 
          state: { 
            email: formData.email,
            from: 'registration',
            resendEmail: formData.email
          },
          replace: true
        });
      } else if (response.status === 'error') {
        // Show error message
        toast.error(response.message || 'Registration failed. Please try again.');
      } else if (response.status === 'registered') {
        // User is already registered but not verified
        if (response.redirect) {
          // If there's a redirect URL (e.g., to login page with email prefilled)
          navigate(response.redirect, { 
            state: { 
              email: formData.email,
              from: 'registration',
              message: response.message
            },
            replace: true
          });
        } else {
          // If no redirect URL but user is registered, show message and redirect to login
          toast.info(response.message || 'Please check your email for the verification link.');
          navigate('/auth/login/personal', { 
            state: { 
              email: formData.email,
              from: 'registration',
              message: response.message
            },
            replace: true
          });
        }
      } else {
        // Fallback for any other response status
        toast.error('An unexpected response was received. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('An error occurred during registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-12 text-center">
            <h1 className="text-3xl font-bold text-white mb-2">
              Create Your Professional Account
            </h1>
            <p className="text-blue-100 text-lg">
              Join our platform to enhance your career journey
            </p>
          </div>

          {/* Form */}
          <div className="p-8 space-y-6">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.fullName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your full name"
                />
              </div>
              {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="your.email@example.com"
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>

            {/* Password Fields */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full pl-12 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      errors.password ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Create a secure password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full pl-12 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
              </div>
            </div>

            {/* LinkedIn Profile URL */}
            <div>
              <label htmlFor="linkedinUrl" className="block text-sm font-semibold text-gray-700 mb-2">
                LinkedIn Profile URL <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="url"
                  id="linkedinUrl"
                  name="linkedinUrl"
                  value={formData.linkedinUrl}
                  onChange={handleInputChange}
                  className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.linkedinUrl ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="https://www.linkedin.com/in/your-profile"
                />
              </div>
              {errors.linkedinUrl && <p className="mt-1 text-sm text-red-500">{errors.linkedinUrl}</p>}
            </div>

            {/* Profession with Job Title Dropdown */}
            <div ref={jobTitleRef}>
              <label htmlFor="profession" className="block text-sm font-semibold text-gray-700 mb-2">
                Profession / Job Title <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
                <input
                  type="text"
                  id="profession"
                  name="profession"
                  value={formData.profession}
                  onChange={handleJobTitleInputChange}
                  onFocus={() => setShowJobTitles(true)}
                  className={`w-full pl-12 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.profession ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Search for your job title..."
                  autoComplete="off"
                />
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                
                {/* Job Title Dropdown */}
                {showJobTitles && (
                  <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {filteredJobTitles.length > 0 ? (
                      <>
                        {/* Group by category */}
                        {Array.from(new Set(filteredJobTitles.map(job => job.category))).map(category => (
                          <div key={category}>
                            <div className="px-4 py-2 bg-gray-50 text-sm font-semibold text-gray-600 border-b">
                              {category}
                            </div>
                            {filteredJobTitles
                              .filter(job => job.category === category)
                              .map((job, index) => (
                                <button
                                  key={`${category}-${index}`}
                                  type="button"
                                  onClick={() => handleJobTitleSelect(job.title)}
                                  className="w-full text-left px-4 py-2 hover:bg-blue-50 hover:text-blue-700 transition-colors border-b border-gray-100 last:border-b-0"
                                >
                                  {job.title}
                                </button>
                              ))}
                          </div>
                        ))}
                      </>
                    ) : (
                      <div className="px-4 py-3 text-gray-500 text-center">
                        No job titles found. You can still type your custom job title.
                      </div>
                    )}
                  </div>
                )}
              </div>
              {errors.profession && <p className="mt-1 text-sm text-red-500">{errors.profession}</p>}
            </div>

            {/* Industry and Experience Level */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="industry" className="block text-sm font-semibold text-gray-700 mb-2">
                  Industry <span className="text-red-500">*</span>
                </label>
                <select
                  id="industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.industry ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select your industry</option>
                  {industries.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
                {errors.industry && <p className="mt-1 text-sm text-red-500">{errors.industry}</p>}
              </div>

              <div>
                <label htmlFor="experienceLevel" className="block text-sm font-semibold text-gray-700 mb-2">
                  Experience Level <span className="text-red-500">*</span>
                </label>
                <select
                  id="experienceLevel"
                  name="experienceLevel"
                  value={formData.experienceLevel}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.experienceLevel ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select experience level</option>
                  {experienceLevels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
                {errors.experienceLevel && <p className="mt-1 text-sm text-red-500">{errors.experienceLevel}</p>}
              </div>
            </div>

            {/* Location with Real-time Autocomplete */}
            <div ref={locationRef}>
              <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-2">
                Location <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleLocationInputChange}
                  className={`w-full pl-12 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.location ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Start typing your location..."
                  autoComplete="off"
                />
                {locationLoading && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <svg className="animate-spin h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                )}
                
                {/* Location Suggestions Dropdown */}
                {showLocationSuggestions && locationSuggestions.length > 0 && (
                  <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {locationSuggestions.map((location) => (
                      <button
                        key={location.place_id}
                        type="button"
                        onClick={() => handleLocationSelect(location)}
                        className="w-full text-left px-4 py-3 hover:bg-blue-50 hover:text-blue-700 transition-colors border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex items-start">
                          <MapPin className="w-4 h-4 text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-sm">{location.display_name}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
                
                {/* No suggestions found */}
                {showLocationSuggestions && locationSuggestions.length === 0 && formData.location.length >= 3 && !locationLoading && (
                  <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                    <div className="px-4 py-3 text-gray-500 text-center text-sm">
                      No locations found. Please try a different search term.
                    </div>
                  </div>
                )}
              </div>
              {errors.location && <p className="mt-1 text-sm text-red-500">{errors.location}</p>}
              <p className="mt-1 text-xs text-gray-500">
                Start typing to get location suggestions from around the world
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`w-full py-4 px-6 rounded-lg text-white font-semibold text-lg transition-all duration-200 ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:ring-4 focus:ring-blue-300'
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </span>
              ) : (
                'Create Professional Account'
              )}
            </button>

            {/* Terms and Privacy */}
            <p className="text-center text-sm text-gray-600">
              By creating an account, you agree to our{' '}
              <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                Privacy Policy
              </a>
            </p>

            {/* Login Link */}
            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-gray-600">
                Already have an account?{' '}
                <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold">
                  Sign in here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalRegisterPage;