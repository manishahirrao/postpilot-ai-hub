import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Briefcase, 
  MapPin, 
  Clock, 
  DollarSign, 
  Star, 
  ChevronRight, 
  ChevronLeft, 
  X, 
  Check, 
  ArrowRight, 
  ExternalLink, 
  Zap, 
  BarChart2, 
  Users, 
  Code, 
  Settings, 
  Mail, 
  Bell, 
  User as UserIcon, 
  ChevronDown, 
  Menu, 
  X as Close, 
  Plus, 
  Bookmark, 
  Share2, 
  MoreHorizontal, 
  Calendar, 
  Clock as ClockIcon, 
  Sparkles,
  Target,
  CheckCircle,
  TrendingUp,
  Brain,
  Home, 
  Info, 
  Phone, 
  Globe, 
  Shield, 
  Award, 
  ShieldCheck, 
  ShieldAlert, 
  ShieldQuestion, 
  ShieldX, 
  ShieldCheck2, 
  ShieldAlert2, 
  ShieldQuestion2, 
  ShieldX2 
} from 'lucide-react';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';

// Types
interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  posted: string;
  matchScore: number;
  skills: string[];
  featured: boolean;
  applicants: number;
  logo?: string;
}

// Component interfaces
interface PageSectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
}

type ValidMotionComponent = keyof JSX.IntrinsicElements | React.ComponentType<unknown>;

interface AnimatedProps extends React.HTMLAttributes<HTMLElement> {
  as?: ValidMotionComponent;
  delay?: number;
}

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children?: React.ReactNode;
}

interface CustomCardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
}

interface JobCardProps {
  job: Job;
  className?: string;
  index?: number;
}

// Sample job data
const sampleJobs: Job[] = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    company: 'TechCorp',
    location: 'San Francisco, CA',
    salary: '₹1.2L - ₹2.5L',
    type: 'Full-time',
    posted: '2 days ago',
    matchScore: 92,
    skills: ['React', 'TypeScript', 'Next.js'],
    featured: true,
    applicants: 15,
    logo: '/logos/techcorp.png'
  },
  {
    id: 2,
    title: 'Backend Engineer',
    company: 'DataSystems',
    location: 'Remote',
    salary: '₹1.5L - ₹3L',
    type: 'Full-time',
    posted: '1 week ago',
    matchScore: 87,
    skills: ['Node.js', 'Python', 'AWS'],
    featured: false,
    applicants: 8,
    logo: '/logos/datasystems.png'
  },
  {
    id: 3,
    title: 'UI/UX Designer',
    company: 'CreativeMinds',
    location: 'Bangalore, India',
    salary: '₹80K - ₹1.5L',
    type: 'Full-time',
    posted: '3 days ago',
    matchScore: 78,
    skills: ['Figma', 'Sketch', 'UI/UX', 'Prototyping'],
    featured: true,
    applicants: 12,
    logo: '/logos/creativeminds.png'
  },
  {
    id: 4,
    title: 'DevOps Engineer',
    company: 'CloudScale',
    location: 'Hyderabad, India',
    salary: '₹1.8L - ₹3.5L',
    type: 'Full-time',
    posted: '5 days ago',
    matchScore: 91,
    skills: ['Docker', 'Kubernetes', 'AWS'],
    featured: true,
    applicants: 6,
    logo: '/logos/cloudscale.png'
  },
  {
    id: 5,
    title: 'Product Manager',
    company: 'ProductLabs',
    location: 'Mumbai, India',
    salary: '₹2L - ₹4L',
    type: 'Full-time',
    posted: '1 day ago',
    matchScore: 85,
    skills: ['Product Strategy', 'Agile', 'JIRA'],
    featured: false,
    applicants: 20,
    logo: '/logos/productlabs.png'
  },
  {
    id: 6,
    title: 'Data Scientist',
    company: 'AI Insights',
    location: 'Remote',
    salary: '₹1.5L - ₹3L',
    type: 'Full-time',
    posted: '1 week ago',
    matchScore: 89,
    skills: ['Python', 'Machine Learning', 'TensorFlow'],
    featured: true,
    applicants: 10,
    logo: '/logos/aiinsights.png'
  },
  {
    id: 7,
    title: 'Senior Product Designer',
    company: 'DesignHub',
    location: 'Mumbai, India',
    salary: '₹20L - ₹35L',
    type: 'Full-time',
    posted: '5 days ago',
    matchScore: 90,
    skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
    featured: false,
    applicants: 7,
    logo: '/logos/designhub.png'
  }
];

const features = [
  {
    title: "AI-Powered Matching",
    description: "Our advanced algorithm analyzes thousands of jobs to find the best matches based on your skills and preferences.",
    icon: <Target className="w-6 h-6" />,
    gradient: "from-blue-500 to-indigo-500"
  },
  {
    title: "Real-time Insights",
    description: "Get instant feedback on how your profile compares to other applicants and what you can improve.",
    icon: <BarChart2 className="w-6 h-6" />,
    gradient: "from-purple-500 to-pink-500"
  },
  {
    title: "Personalized Recommendations",
    description: "Receive tailored suggestions for skills to learn and jobs to apply for based on your career goals.",
    icon: <Users className="w-6 h-6" />,
    gradient: "from-rose-500 to-orange-500"
  }
];

// Design system components
const PageSection = ({ children, className = '', ...props }: PageSectionProps) => (
  <section className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`} {...props}>
    {children}
  </section>
);

const Animated: React.FC<AnimatedProps> = ({
  as: Component = 'div',
  delay = 0,
  className = '',
  children,
  ...props
}) => {
  const MotionComponent = motion(Component as React.ElementType<any>);
  
  return (
    <MotionComponent
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={className}
      {...props}
    >
      {children}
    </MotionComponent>
  );
};

const CustomButton: React.FC<CustomButtonProps> = ({ 
  variant = 'default', 
  size = 'md', 
  className = '', 
  children, 
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background';
  
  const variants = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    outline: 'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    link: 'underline-offset-4 hover:underline text-primary'
  };
  
  const sizes = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-10 py-2 px-4',
    lg: 'h-11 px-8 text-lg'
  };
  
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const CustomCard: React.FC<CustomCardProps> = ({ children, className = '', ...props }) => {
  return (
    <div 
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100 dark:border-gray-700 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

const ComplexOrbitalSystem: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent" />
      <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_center,_#6366f1_0px,_transparent_70%)]" />
    </div>
  );
};

const JobCard: React.FC<JobCardProps> = ({ job, className = '' }) => {
  return (
    <Animated
      as="article"
      className={`relative group ${
        job.featured 
          ? 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/5' 
          : 'bg-white dark:bg-gray-800'
      } rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700/50 ${className}`}
    >
      {job.featured && (
        <div className="absolute top-4 right-4 bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-200">
          Featured
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-3 mb-3">
              {job.logo ? (
                <img 
                  src={job.logo} 
                  alt={`${job.company} logo`} 
                  className="w-10 h-10 rounded-lg object-cover border border-gray-200 dark:border-gray-700"
                />
              ) : (
                <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-400">
                  <Briefcase className="w-5 h-5" />
                </div>
              )}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {job.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{job.company}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 mt-4 mb-5">
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <MapPin className="w-4 h-4 mr-1" />
                {job.location}
              </div>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Clock className="w-4 h-4 mr-1" />
                {job.type}
              </div>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <DollarSign className="w-4 h-4 mr-1" />
                {job.salary}
              </div>
            </div>

            <div className="flex items-center justify-between mt-6">
              <div className="flex items-center">
                <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500" 
                    style={{ width: `${job.matchScore}%` }}
                  />
                </div>
                <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  {job.matchScore}% match
                </span>
              </div>

              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Clock className="w-4 h-4 mr-1" />
                {job.posted}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700/50">
          <div className="flex flex-wrap gap-2 mb-4">
            {job.skills.map((skill, index) => (
              <span 
                key={index}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200"
              >
                {skill}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <span className="font-medium text-gray-700 dark:text-gray-300">{job.applicants}</span> applicants
            </div>
            <div className="flex space-x-3">
              <button className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                <Bookmark className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                <Share2 className="w-5 h-5" />
              </button>
              <CustomButton className="px-4 py-2 text-sm">
                Apply Now
              </CustomButton>
            </div>
          </div>
        </div>
      </div>
    </Animated>
  );
};

const JobMatcherPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('matches');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      {/* Hero Section */}
      <PageSection className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <ComplexOrbitalSystem className="opacity-10" />
        </div>
        
        <div className="relative z-10">
          <Animated delay={0.1} className="text-center mb-16">
            <motion.div 
              className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200 px-5 py-2.5 rounded-full border border-blue-200 dark:border-blue-900/30 mb-6"
              whileHover={{ scale: 1.02 }}
            >
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-semibold">AI-Powered Job Matching</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Find Your <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Dream Job</span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Our advanced AI matches you with the perfect jobs based on your skills, experience, and career goals.
            </p>
          </Animated>
          
          <Animated delay={0.2} className="max-w-3xl mx-auto">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Job title, skills, or company..."
                className="w-full pl-12 pr-6 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <CustomButton className="absolute right-2 top-1/2 -translate-y-1/2 px-6">
                Search
              </CustomButton>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
              <span className="text-sm text-gray-500 dark:text-gray-400">Popular:</span>
              {['Software Engineer', 'Product Manager', 'Data Scientist', 'UX Designer'].map((item, index) => (
                <button
                  key={index}
                  className="text-sm px-3 py-1 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </Animated>
        </div>
      </PageSection>

      {/* Main Content */}
      <PageSection className="pb-24">
        <Animated delay={0.3} className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Animated delay={0.4}>
                <CustomCard className="sticky top-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Your Profile</h2>
                    <button className="text-blue-600 dark:text-blue-400 text-sm font-medium">
                      Edit
                    </button>
                  </div>
                  
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-400">
                      <UserIcon className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">John Doe</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Software Engineer</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4 mb-8">
                    <div>
                      <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Match Settings</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-700 dark:text-gray-300">Job Type</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">Full-time</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-700 dark:text-gray-300">Location</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">Remote</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-700 dark:text-gray-300">Salary Range</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">₹1L+</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <button
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left ${activeTab === 'matches' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                      onClick={() => setActiveTab('matches')}
                    >
                      <span className="flex items-center">
                        <Star className="w-5 h-5 mr-3" />
                        Top Matches
                      </span>
                      <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        24
                      </span>
                    </button>
                    
                    <button
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left ${activeTab === 'saved' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                      onClick={() => setActiveTab('saved')}
                    >
                      <span className="flex items-center">
                        <Bookmark className="w-5 h-5 mr-3" />
                        Saved Jobs
                      </span>
                      <span className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        8
                      </span>
                    </button>
                    
                    <button
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left ${activeTab === 'applications' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                      onClick={() => setActiveTab('applications')}
                    >
                      <span className="flex items-center">
                        <Check className="w-5 h-5 mr-3" />
                        Applications
                      </span>
                      <span className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        5
                      </span>
                    </button>
                  </div>
                </CustomCard>
              </Animated>
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Animated delay={0.5}>
                <CustomCard>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      Top Matches
                    </h3>
                    <div className="flex space-x-2">
                      <CustomButton variant="ghost" className="px-3 py-1 text-xs">
                        <Filter className="w-3 h-3 mr-1" />
                        Filter
                      </CustomButton>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {sampleJobs.slice(0, 2).map((job, index) => (
                      <JobCard key={job.id} job={job} index={index} />
                    ))}
                  </div>
                  
                  <div className="mt-4 text-center">
                    <CustomButton variant="ghost" className="text-sm">
                      View All Matches
                      <ChevronDown className="w-4 h-4 ml-1" />
                    </CustomButton>
                  </div>
                </CustomCard>
              </Animated>
            </div>
          </div>
        </Animated>
      </PageSection>

      {/* Features Section */}
      <section className="relative py-28 overflow-hidden bg-gradient-to-b from-background to-gray-50 dark:to-gray-900/30">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background to-transparent z-10"></div>
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-10"></div>
          
          {/* Animated background elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl opacity-5">
            <ComplexOrbitalSystem className="w-full h-full" />
          </div>
          
          <motion.div 
            className="absolute top-1/4 right-1/4 w-96 h-96 opacity-10"
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <ComplexOrbitalSystem />
          </motion.div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/10 rounded-full px-5 py-2.5 border border-blue-100 dark:border-blue-900/30 mb-6 group cursor-pointer"
              whileHover={{ 
                scale: 1.02, 
                boxShadow: '0 10px 25px -5px rgba(99, 102, 241, 0.15)',
                transition: { duration: 0.3 }
              }}
            >
              <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                Why Choose Us
              </span>
            </motion.div>
            
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Find Your Perfect <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">Career Match</span>
            </motion.h2>
            
            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              We combine cutting-edge AI with deep industry knowledge to help you find your perfect career match.
            </motion.p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="group relative"
              >
                {/* Glow effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 rounded-3xl opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500 group-hover:duration-300" />
                
                <div className="relative h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-100 dark:border-gray-700/50 shadow-sm hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1 overflow-hidden">
                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent dark:from-gray-900/20 dark:to-transparent pointer-events-none" />
                  
                  {/* Animated background element */}
                  <motion.div 
                    className="absolute -right-10 -top-10 w-40 h-40 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle, ${feature.gradient.split(' ')[1]} 0%, transparent 70%)`
                    }}
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, 0],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  <div className="relative z-10">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-0.5`}>
                      {React.cloneElement(feature.icon, { 
                        className: 'w-7 h-7 text-white transform group-hover:scale-110 transition-transform duration-300' 
                      })}
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-600 dark:group-hover:from-blue-400 dark:group-hover:to-indigo-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                      {feature.description}
                    </p>
                    
                    <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700/50">
                      <button className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                        <span>Learn more</span>
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="mt-24 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-sm uppercase tracking-wider font-medium text-gray-500 dark:text-gray-400 mb-8">Trusted by professionals at top companies worldwide</p>
            
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 max-w-4xl mx-auto opacity-70 hover:opacity-100 transition-opacity duration-300">
              {[
                { name: 'Google', logo: 'text-2xl font-bold text-gray-300 dark:text-gray-600 hover:text-gray-900 dark:hover:text-gray-200 transition-colors' },
                { name: 'Microsoft', logo: 'text-2xl font-bold text-gray-300 dark:text-gray-600 hover:text-gray-900 dark:hover:text-gray-200 transition-colors' },
                { name: 'Amazon', logo: 'text-2xl font-bold text-gray-300 dark:text-gray-600 hover:text-gray-900 dark:hover:text-gray-200 transition-colors' },
                { name: 'Apple', logo: 'text-2xl font-bold text-gray-300 dark:text-gray-600 hover:text-gray-900 dark:hover:text-gray-200 transition-colors' },
                { name: 'Facebook', logo: 'text-2xl font-bold text-gray-300 dark:text-gray-600 hover:text-gray-900 dark:hover:text-gray-200 transition-colors' },
              ].map((company, i) => (
                <motion.div 
                  key={i}
                  className={company.logo}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                >
                  {company.name}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="relative py-24 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white dark:from-gray-800 to-transparent z-10"></div>
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white dark:from-gray-800 to-transparent z-10"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl opacity-5 rotate-180">
            <ComplexOrbitalSystem className="w-full h-full" />
          </div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/10 rounded-full px-4 py-2 border border-blue-100 dark:border-blue-900/30 mb-6"
              whileHover={{ scale: 1.03, boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.1)' }}
            >
              <Zap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-800 dark:text-blue-200">Simple & Effective</span>
            </motion.div>
            
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Get matched with your dream job in just a few simple steps
            </p>
          </motion.div>
          
          <div className="relative">
            {/* Vertical line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 to-purple-200 dark:from-blue-800/30 dark:to-purple-800/30"></div>
            
            {/* Steps */}
            <div className="space-y-16 md:space-y-24">
              {[
                {
                  number: '01',
                  title: 'Create Your Profile',
                  description: 'Tell us about your skills, experience, and career goals to help us understand what you\'re looking for in your next role.',
                  icon: <UserIcon className="w-7 h-7 text-white" />,
                  color: 'from-blue-500 to-indigo-500',
                  delay: 0.1
                },
                {
                  number: '02',
                  title: 'Get Matched',
                  description: 'Our advanced AI scans thousands of job postings to find the ones that best match your profile and preferences.',
                  icon: <Zap className="w-7 h-7 text-white" />,
                  color: 'from-purple-500 to-pink-500',
                  delay: 0.2
                },
                {
                  number: '03',
                  title: 'Apply & Get Hired',
                  description: 'Effortlessly apply to your favorite positions with one click and kickstart your dream career journey.',
                  icon: <Check className="w-7 h-7 text-white" />,
                  color: 'from-rose-500 to-orange-500',
                  delay: 0.3
                }
              ].map((step, index) => (
                <motion.div 
                  key={index}
                  className={`relative flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: step.delay }}
                >
                  {/* Step number */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 bg-white dark:bg-gray-800 rounded-full border-4 border-white dark:border-gray-800 shadow-lg z-10 items-center justify-center">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold`}>
                      {index + 1}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="md:w-1/2 px-4 md:px-8 mb-8 md:mb-0">
                    <div className="flex items-center space-x-3 mb-4 md:hidden">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold text-xl`}>
                        {index + 1}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{step.title}</h3>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 hidden md:block">{step.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{step.description}</p>
                  </div>
                  
                  {/* Visual */}
                  <div className="md:w-1/2 px-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 h-full flex items-center justify-center">
                      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center shadow-lg`}>
                        {step.icon}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <motion.div 
            className="mt-20 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 flex items-center justify-center mx-auto"
            >
              Get Started for Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Job Board */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-background to-gray-50 dark:to-gray-900/30">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background to-transparent z-10"></div>
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-10"></div>
          
          {/* Animated background elements */}
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl opacity-5"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <ComplexOrbitalSystem className="w-full h-full" />
          </motion.div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/10 rounded-full px-5 py-2.5 border border-blue-100 dark:border-blue-900/30 mb-6 group"
              whileHover={{ 
                scale: 1.02, 
                boxShadow: '0 10px 25px -5px rgba(99, 102, 241, 0.15)',
                transition: { duration: 0.3 }
              }}
            >
              <Briefcase className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                Job Board
              </span>
            </motion.div>
            
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Latest <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">Job Matches</span>
            </motion.h2>
            
            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Browse through our curated selection of jobs that perfectly match your profile and preferences.
            </motion.p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters */}
            <motion.div 
              className="lg:col-span-1"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-sm hover:shadow-lg transition-all duration-300 sticky top-6">
                <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-6">Filters</h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Job Type</label>
                    <div className="relative">
                      <select className="w-full px-4 py-2.5 text-sm bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer">
                        <option>All Types</option>
                        <option>Full-time</option>
                        <option>Part-time</option>
                        <option>Contract</option>
                        <option>Internship</option>
                        <option>Remote</option>
                      </select>
                      <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Experience Level</label>
                    <div className="relative">
                      <select className="w-full px-4 py-2.5 text-sm bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer">
                        <option>All Levels</option>
                        <option>Entry Level</option>
                        <option>Mid Level</option>
                        <option>Senior Level</option>
                        <option>Executive</option>
                      </select>
                      <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Salary Range</label>
                    <div className="relative">
                      <select className="w-full px-4 py-2.5 text-sm bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer">
                        <option>All Ranges</option>
                        <option>₹30L - ₹50L</option>
                        <option>₹50L - ₹80L</option>
                        <option>₹80L - ₹1.2Cr</option>
                        <option>₹1.2Cr+</option>
                      </select>
                      <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <button className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
                      Apply Filters
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Job Listings */}
            <div className="lg:col-span-3">
              {/* Search and Sort */}
              <motion.div 
                className="mb-8 flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="relative flex-1">
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input 
                    type="text" 
                    placeholder="Search jobs, companies, or keywords..." 
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="relative w-full sm:w-auto">
                  <select className="w-full sm:w-48 px-4 py-2.5 pr-8 text-sm bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer">
                    <option>Most Relevant</option>
                    <option>Newest</option>
                    <option>Highest Salary</option>
                    <option>Best Match</option>
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </motion.div>
              
              {/* Job Cards */}
              <div className="space-y-6">
                {sampleJobs.map((job, index) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ 
                      duration: 0.5, 
                      delay: index * 0.05,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    className="group"
                  >
                    <JobCard job={job} index={index} />
                  </motion.div>
                ))}
              </div>
              
              {/* Pagination */}
              <motion.div 
                className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Showing <span className="font-medium text-gray-900 dark:text-white">1-{sampleJobs.length}</span> of <span className="font-medium text-gray-900 dark:text-white">124</span> jobs
                </p>
                
                <nav className="flex items-center space-x-1">
                  <button className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  
                  <button className="w-10 h-10 rounded-lg bg-blue-600 text-white font-medium">
                    1
                  </button>
                  
                  <button className="w-10 h-10 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    2
                  </button>
                  
                  <button className="w-10 h-10 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    3
                  </button>
                  
                  <span className="px-2 text-gray-400">...</span>
                  
                  <button className="w-10 h-10 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    8
                  </button>
                  
                  <button className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </nav>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <PageSection className="py-24 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Animated delay={0.2}>
              <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200 px-4 py-2 rounded-full mb-6">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-semibold">Features</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
                More than just job matching
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { icon: Target, text: "AI-Powered Matching", color: "text-blue-600" },
                  { icon: TrendingUp, text: "Career Growth Tracking", color: "text-green-600" },
                  { icon: Users, text: "Company Insights", color: "text-purple-600" },
                  { icon: CheckCircle, text: "Interview Prep", color: "text-yellow-600" }
                ].map((feature, index) => (
                  <Animated 
                    key={index} 
                    delay={0.3 + (index * 0.1)}
                    className="flex items-center space-x-3 group hover:bg-white dark:hover:bg-gray-800 hover:shadow-lg hover:rounded-xl hover:p-3 transition-all duration-300"
                  >
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <feature.icon className={`w-5 h-5 ${feature.color}`} />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 font-medium">{feature.text}</span>
                  </Animated>
                ))}
              </div>
            </Animated>
            
            <Animated delay={0.3} className="space-y-6">
              <CustomCard className="p-8 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 border-blue-200 dark:border-blue-900/30">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Smart Filtering</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Our AI considers salary expectations, location preferences, company size, and culture fit to find opportunities that truly align with your goals.
                </p>
              </CustomCard>
              
              <CustomCard className="p-8 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 border-green-200 dark:border-green-900/30">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Skills Gap Analysis</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Get AI-powered suggestions to tailor your resume for specific job applications and increase your chances of getting interviews.
                </p>
              </CustomCard>
            </Animated>
          </div>
        </div>
      </PageSection>

      {/* Job Board */}
      <PageSection className="py-24 bg-white dark:bg-gray-900">
        <Animated delay={0.2} className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200 px-4 py-2 rounded-full mb-6">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm font-semibold">Personalized Job Board</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              See Your Personalized Job Board
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Jobs ranked by AI-calculated compatibility with your profile, skills, and career preferences
            </p>
          </div>
          
          <CustomCard className="max-w-6xl mx-auto border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900/50">
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Recommended Jobs for Software Engineer
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">Based on your profile and preferences</p>
                </div>
                <div className="flex space-x-3">
                  <CustomButton variant="outline" className="flex items-center">
                    <Search className="w-4 h-4 mr-2" />
                    Refine Search
                  </CustomButton>
                  <CustomButton variant="outline" className="flex items-center">
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                  </CustomButton>
                </div>
              </div>
              
              <div className="space-y-6">
                {sampleJobs.map((job, index) => (
                  <JobCard key={job.id} job={job} index={index} />
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <CustomButton variant="outline" className="px-6">
                  Load More Jobs
                </CustomButton>
              </div>
            </div>
          </CustomCard>
        </Animated>
      </PageSection>

      {/* CTA Section */}
      <PageSection className="py-24 bg-gradient-to-r from-blue-600 to-purple-700">
        <Animated delay={0.2} className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Find your next opportunity today
          </h2>
          <p className="text-xl text-blue-100 mb-12 leading-relaxed">
            Stop applying to random jobs. Let AI find opportunities where you'll excel and build the career you've always wanted.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <CustomButton size="lg" className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-4 text-lg">
              Start Job Search
              <ArrowRight className="w-6 h-6 ml-2" />
            </CustomButton>
            <CustomButton size="lg" variant="outline" className="text-lg px-8 py-4 text-white border-white hover:bg-white/10">
              View Pricing
            </CustomButton>
          </div>
          
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-blue-100">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>Free to start</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>No credit card required</span>
            </div>
          </div>
        </Animated>
      </PageSection>
    </div>
  );
};

export default JobMatcherPage;