import React, { useState, useEffect } from 'react';
import { ArrowRight, Search, Target, TrendingUp, CheckCircle, MapPin, Building, IndianRupee, Sparkles, Users, Clock, Star, Heart, Bookmark, Filter, ChevronDown, Zap, Brain } from 'lucide-react';

const JobMatcherPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [animateCards, setAnimateCards] = useState(false);
  const [hoveredJob, setHoveredJob] = useState(null);

  useEffect(() => {
    setAnimateCards(true);
  }, []);

  const sampleJobs = [
    {
      id: 1,
      title: 'Senior Software Engineer',
      company: 'TechCorp',
      location: 'San Francisco, CA',
      salary: '₹80L - ₹1.2Cr',
      matchScore: 92,
      skills: ['React', 'Node.js', 'AWS'],
      type: 'Full-time',
      posted: '2 days ago',
      applicants: 12,
      featured: true
    },
    {
      id: 2,
      title: 'Full Stack Developer',
      company: 'InnovateLab',
      location: 'New York, NY',
      salary: '₹60L - ₹90L',
      matchScore: 87,
      skills: ['JavaScript', 'Python', 'Docker'],
      type: 'Full-time',
      posted: '1 day ago',
      applicants: 8,
      featured: false
    },
    {
      id: 3,
      title: 'Frontend Engineer',
      company: 'StartupXYZ',
      location: 'Austin, TX',
      salary: '₹55L - ₹80L',
      matchScore: 83,
      skills: ['Vue.js', 'TypeScript', 'CSS'],
      type: 'Contract',
      posted: '3 days ago',
      applicants: 15,
      featured: false
    }
  ];

  const features = [
    { icon: Brain, text: 'AI-powered job matching', color: 'text-purple-600' },
    { icon: Zap, text: 'Real-time job alerts', color: 'text-yellow-600' },
    { icon: TrendingUp, text: 'Skills gap analysis', color: 'text-green-600' },
    { icon: Target, text: 'Resume tailoring for specific jobs', color: 'text-blue-600' },
    { icon: Users, text: 'Company culture insights', color: 'text-pink-600' },
    { icon: IndianRupee, text: 'Salary benchmarking', color: 'text-emerald-600' },
    { icon: Star, text: 'Interview preparation tips', color: 'text-orange-600' },
    { icon: Clock, text: 'Application tracking', color: 'text-indigo-600' }
  ];

  const steps = [
    {
      icon: Search,
      title: 'Profile Analysis',
      description: 'We analyze your resume, skills, and career preferences to understand your professional profile.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Target,
      title: 'AI Matching',
      description: 'Our AI compares your profile with thousands of job postings using semantic similarity algorithms.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: TrendingUp,
      title: 'Ranked Results',
      description: 'Get a ranked list of opportunities with match scores and personalized application tips.',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  const Button = ({ children, className = '', variant = 'primary', size = 'md', ...props }) => {
    const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 transform hover:scale-105 active:scale-95';
    
    const variants = {
      primary: 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl focus:ring-blue-500',
      outline: 'border-2 border-gray-300 hover:border-blue-500 text-gray-700 hover:text-blue-600 hover:bg-blue-50',
      ghost: 'text-gray-600 hover:text-blue-600 hover:bg-blue-50',
      white: 'bg-white text-blue-600 hover:bg-gray-50 shadow-lg hover:shadow-xl'
    };
    
    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg'
    };
    
    return (
      <button className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
        {children}
      </button>
    );
  };

  const Card = ({ children, className = '', hover = true, ...props }) => (
    <div className={`bg-white rounded-2xl border border-gray-200 shadow-sm ${hover ? 'hover:shadow-xl hover:-translate-y-1' : ''} transition-all duration-300 ${className}`} {...props}>
      {children}
    </div>
  );

  const Badge = ({ children, variant = 'default', className = '' }) => {
    const variants = {
      default: 'bg-gray-100 text-gray-800',
      success: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      info: 'bg-blue-100 text-blue-800',
      outline: 'border border-gray-300 text-gray-700 bg-white'
    };
    
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
        {children}
      </span>
    );
  };

  const JobCard = ({ job, index }) => (
    <div 
      className={`transform transition-all duration-500 ${animateCards ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
      onMouseEnter={() => setHoveredJob(job.id)}
      onMouseLeave={() => setHoveredJob(null)}
    >
      <Card className={`p-6 relative overflow-hidden ${hoveredJob === job.id ? 'ring-2 ring-blue-500 shadow-2xl' : ''}`}>
        {job.featured && (
          <div className="absolute top-0 right-0 bg-gradient-to-l from-yellow-400 to-orange-500 text-white px-3 py-1 text-xs font-semibold rounded-bl-lg">
            <Sparkles className="w-3 h-3 inline mr-1" />
            Featured
          </div>
        )}
        
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors">
                {job.title}
              </h3>
              <Badge variant="success" className="animate-pulse">
                {job.matchScore}% match
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
              <span className="flex items-center">
                <Building className="w-4 h-4 mr-1 text-blue-500" />
                {job.company}
              </span>
              <span className="flex items-center">
                <MapPin className="w-4 h-4 mr-1 text-red-500" />
                {job.location}
              </span>
              <span className="flex items-center">
                <IndianRupee className="w-4 h-4 mr-1 text-green-500" />
                {job.salary}
              </span>
              <span className="flex items-center">
                <Clock className="w-4 h-4 mr-1 text-purple-500" />
                {job.posted}
              </span>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {job.skills.map((skill, skillIndex) => (
                <Badge key={skillIndex} variant="outline" className="hover:bg-blue-50 hover:border-blue-300 transition-colors">
                  {skill}
                </Badge>
              ))}
            </div>
            
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>{job.applicants} applicants</span>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{job.type}</span>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-3">
          <Button className="flex-1">
            Apply Now
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button variant="outline" className="px-4">
            <Heart className="w-4 h-4" />
          </Button>
          <Button variant="outline" className="px-4">
            <Bookmark className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-400/20 to-pink-400/20 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-200">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-800">AI-Powered Job Matching</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent leading-tight">
                Find Your Perfect Job Match
              </h1>
              
              <p className="text-xl text-gray-700 leading-relaxed">
                Our AI analyzes your profile and matches you with jobs that fit your skills, 
                experience, and career goals. Stop applying to random jobs – find opportunities 
                where you'll truly excel.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="group">
                  Find Jobs
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline">
                  <Sparkles className="w-5 h-5 mr-2" />
                  See How It Works
                </Button>
              </div>
              
              <div className="flex items-center space-x-8 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <span>10,000+ Jobs</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-blue-600" />
                  </div>
                  <span>5,000+ Companies</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 text-purple-600" />
                  </div>
                  <span>95% Success Rate</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-2xl transform rotate-3"></div>
              <Card className="relative bg-white/90 backdrop-blur-sm border-0 shadow-2xl">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center">
                      <Target className="w-6 h-6 text-blue-600 mr-2" />
                      Top Matches
                    </h3>
                    <div className="flex space-x-2">
                      <Button variant="ghost" className="px-3 py-1 text-xs">
                        <Filter className="w-3 h-3 mr-1" />
                        Filter
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {sampleJobs.slice(0, 2).map((job, index) => (
                      <JobCard key={job.id} job={job} index={index} />
                    ))}
                  </div>
                  
                  <div className="mt-4 text-center">
                    <Button variant="ghost" className="text-sm">
                      View All Matches
                      <ChevronDown className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-100 text-purple-800">
              How It Works
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How Job Matching Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI uses advanced embeddings and machine learning to find the perfect matches between your profile and available opportunities
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {steps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className={`bg-gradient-to-r ${step.color} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                  <step.icon className="w-10 h-10 text-white" />
                </div>
                <div className="bg-white rounded-xl p-2 mb-4 text-sm font-semibold text-gray-500 inline-block">
                  Step {index + 1}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge className="mb-6 bg-blue-100 text-blue-800">
                Features
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                More than just job matching
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3 group hover:bg-white hover:shadow-lg hover:rounded-xl hover:p-3 transition-all duration-300">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <feature.icon className={`w-5 h-5 ${feature.color}`} />
                    </div>
                    <span className="text-gray-700 font-medium">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-6">
              <Card className="p-8 bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Smart Filtering</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Our AI considers salary expectations, location preferences, company size, and culture fit to find opportunities that truly align with your goals.
                </p>
              </Card>
              
              <Card className="p-8 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Skills Gap Analysis</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Identify skills you need to develop for your dream roles and get personalized learning recommendations with curated courses.
                </p>
              </Card>
              
              <Card className="p-8 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Resume Tailoring</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Get AI-powered suggestions to tailor your resume for specific job applications and increase your chances of getting interviews.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Job Board */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-100 text-green-800">
              Personalized Job Board
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              See Your Personalized Job Board
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Jobs ranked by AI-calculated compatibility with your profile, skills, and career preferences
            </p>
          </div>
          
          <Card className="max-w-6xl mx-auto border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50">
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Recommended Jobs for Software Engineer
                  </h3>
                  <p className="text-gray-600">Based on your profile and preferences</p>
                </div>
                <div className="flex space-x-3">
                  <Button variant="outline" className="flex items-center">
                    <Search className="w-4 h-4 mr-2" />
                    Refine Search
                  </Button>
                  <Button variant="outline" className="flex items-center">
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                </div>
              </div>
              
              <div className="space-y-6">
                {sampleJobs.map((job, index) => (
                  <JobCard key={job.id} job={job} index={index} />
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <Button size="lg">
                  View All {sampleJobs.length * 10}+ Matches
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Find your next opportunity today
            </h2>
            <p className="text-xl text-blue-100 mb-12 leading-relaxed">
              Stop applying to random jobs. Let AI find opportunities where you'll excel and build the career you've always wanted.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" variant="white" className="text-lg px-12 py-4">
                Start Job Search
                <ArrowRight className="w-6 h-6 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-12 py-4 text-white border-white hover:bg-white hover:text-blue-600">
                View Pricing
              </Button>
            </div>
            
            <div className="mt-12 flex items-center justify-center space-x-8 text-blue-100">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>Free to start</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>Instant access</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JobMatcherPage;