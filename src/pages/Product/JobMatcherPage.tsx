import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search,
  Briefcase,
  Clock,
  Zap,
  Bell,
  CheckCircle,
  MapPin,
  DollarSign,
  Building,
  Filter,
  Send,
  RefreshCw,
  BarChart2,
  Info,
  FileText
} from 'lucide-react';
import { useThemeStyles } from '@/lib/theme-utils';
import ProductLayout from '@/components/Layout/ProductLayout';

const JobMatcherPage = () => {
  const themeStyles = useThemeStyles();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('search');
  const [expandedJob, setExpandedJob] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  
  // Mock job data
  const jobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechNova Solutions",
      location: "Bangalore (Hybrid)",
      salary: "₹18L - ₹25L",
      match: 92,
      skills: ["React", "TypeScript", "Redux", "Next.js"],
      posted: "2 days ago",
      description: "We're looking for an experienced frontend developer to lead our UI team building cutting-edge web applications."
    },
    {
      id: 2,
      title: "UX/UI Designer",
      company: "DesignHub",
      location: "Remote",
      salary: "₹12L - ₹18L",
      match: 87,
      skills: ["Figma", "User Research", "Prototyping", "CSS"],
      posted: "1 week ago",
      description: "Join our design team to create beautiful, intuitive interfaces for our global client base."
    },
    {
      id: 3,
      title: "Full Stack Engineer",
      company: "StartUp Ventures",
      location: "Mumbai",
      salary: "₹15L - ₹20L",
      match: 78,
      skills: ["Node.js", "React", "MongoDB", "AWS"],
      posted: "3 days ago",
      description: "Early-stage startup looking for passionate full-stack developers to help build our MVP."
    }
  ];

  const toggleJobExpand = (id: number | null) => {
    setExpandedJob(expandedJob === id ? null : id);
  };

  return (
    <ProductLayout 
      title="AI Job Matcher"
      description="Find the perfect job match with our AI-powered job matching technology"
      className={`${themeStyles.bgGradient} text-gray-900 dark:text-gray-100`}
    >
      {/* Hero Section */}
      <section className="relative  flex items-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border-2 border-cyan-500/10 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute top-20 right-32 w-48 h-48 border border-purple-500/20 rounded-full"
            animate={{
              rotate: -360,
              x: [0, 30, 0, -30, 0],
              y: [0, -15, 0, 15, 0],
            }}
            transition={{
              rotate: { duration: 25, repeat: Infinity, ease: "linear" },
              x: { duration: 12, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 8, repeat: Infinity, ease: "easeInOut" },
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div 
              className="inline-flex items-center space-x-2 bg-white/80 dark:bg-gradient-to-r dark:from-cyan-500/10 dark:to-purple-500/10 rounded-full px-4 py-2 border border-gray-200 dark:border-cyan-500/20 mb-6 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Briefcase className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-white/90">Job Matcher & Applier Agent</span>
            </motion.div>

            <motion.h1 
              className="text-5xl lg:text-6xl font-bold leading-tight text-gray-900 dark:text-white mb-6 drop-shadow-md"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="block">Discover Your</span>
              <span className="block bg-gradient-to-r from-cyan-600 via-purple-500 to-pink-500 dark:from-cyan-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                Dream Job
              </span>
              <span className="block">with AI Precision</span>
            </motion.h1>

            <motion.p 
              className="text-xl text-gray-800 dark:text-white/90 max-w-2xl mx-auto mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              🔍 Ready to uncover your next opportunity? I'll find, rank, and even apply on your behalf!
            </motion.p>

            <motion.div 
              className="max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter desired keywords, locations, and must-have benefits..."
                  className="w-full bg-white/80 dark:bg-white/20 backdrop-blur-sm border border-gray-300 dark:border-white/30 rounded-lg py-4 pl-12 pr-6 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-cyan-600 dark:focus:ring-cyan-400 focus:border-transparent text-base"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-white/70" />
              </div>
            </motion.div>

            <motion.div 
              className="flex flex-wrap justify-center gap-4 mt-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 font-medium rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                Start My Job Search
              </button>
              <button className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 font-medium rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 flex items-center">
                <Send className="w-5 h-5 mr-2" />
                Auto-Apply Top 5 Matches
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 dark:border-white/10 mb-12">
            <button
              onClick={() => setActiveTab('search')}
              className={`px-6 py-3 font-medium text-lg ${activeTab === 'search' 
                ? 'text-cyan-600 dark:text-cyan-400 border-b-2 border-cyan-600 dark:border-cyan-400' 
                : 'text-gray-600 hover:text-gray-900 dark:text-white/70 dark:hover:text-white'}`}
            >
              Smart Search & Filters
            </button>
            <button
              onClick={() => setActiveTab('match')}
              className={`px-6 py-3 font-medium text-lg ${activeTab === 'match' 
                ? 'text-cyan-600 dark:text-cyan-400 border-b-2 border-cyan-600 dark:border-cyan-400' 
                : 'text-gray-600 hover:text-gray-900 dark:text-white/70 dark:hover:text-white'}`}
            >
              Match Scoring & Insights
            </button>
            <button
              onClick={() => setActiveTab('apply')}
              className={`px-6 py-3 font-medium text-lg ${activeTab === 'apply' 
                ? 'text-cyan-600 dark:text-cyan-400 border-b-2 border-cyan-600 dark:border-cyan-400' 
                : 'text-gray-600 hover:text-gray-900 dark:text-white/70 dark:hover:text-white'}`}
            >
              Auto-Apply Wizard
            </button>
            <button
              onClick={() => setActiveTab('alerts')}
              className={`px-6 py-3 font-medium text-lg ${activeTab === 'alerts' 
                ? 'text-cyan-600 dark:text-cyan-400 border-b-2 border-cyan-600 dark:border-cyan-400' 
                : 'text-gray-600 hover:text-gray-900 dark:text-white/70 dark:hover:text-white'}`}
            >
              Real-Time Alerts
            </button>
          </div>

          {/* Tab Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Features */}
            <div className="lg:col-span-1 space-y-8">
              {activeTab === 'search' && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Smart Search & Filters</h3>
                  <p className="text-gray-700 dark:text-white/80 mb-6">"Search by title, location, salary range, company size, and remote/hybrid options."</p>
                  
                  <div className="space-y-4">
                    <div className="bg-white/90 dark:bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-white/10 shadow-sm">
                      <div className="flex items-center mb-2">
                        <Search className="w-5 h-5 text-cyan-400 mr-2" />
                        <h4 className="font-medium text-gray-900 dark:text-white">Keyword Search</h4>
                      </div>
                      <p className="text-gray-600 dark:text-white/70 text-sm">Find jobs by specific technologies, roles, or requirements</p>
                    </div>
                    
                    <div className="bg-white/90 dark:bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-white/10 shadow-sm">
                      <div className="flex items-center mb-2">
                        <MapPin className="w-5 h-5 text-purple-400 mr-2" />
                        <h4 className="font-medium text-gray-900 dark:text-white">Location Filters</h4>
                      </div>
                      <p className="text-gray-600 dark:text-white/70 text-sm">Search by city, country, or remote work options</p>
                    </div>
                    
                    <div className="bg-white/90 dark:bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-white/10 shadow-sm">
                      <div className="flex items-center mb-2">
                        <DollarSign className="w-5 h-5 text-green-400 mr-2" />
                        <h4 className="font-medium text-gray-900 dark:text-white">Salary Range</h4>
                      </div>
                      <p className="text-gray-600 dark:text-white/70 text-sm">Set minimum salary expectations</p>
                    </div>
                    
                    <div className="bg-white/90 dark:bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-white/10 shadow-sm">
                      <div className="flex items-center mb-2">
                        <Building className="w-5 h-5 text-blue-400 mr-2" />
                        <h4 className="font-medium text-gray-900 dark:text-white">Company Size</h4>
                      </div>
                      <p className="text-gray-600 dark:text-white/70 text-sm">Startups to enterprise companies</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'match' && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Match Scoring & Insights</h3>
                  <p className="text-gray-700 dark:text-white/80 mb-6">"Each job receives a fit score out of 100 based on skills, experience, and preferences."</p>
                  
                  <div className="bg-white dark:bg-gradient-to-br dark:from-purple-500/10 dark:to-cyan-500/10 border border-gray-200 dark:border-white/10 rounded-xl p-6 mb-6 shadow-sm">
                    <div className="flex items-center mb-4">
                      <BarChart2 className="w-6 h-6 text-cyan-400 mr-2" />
                      <h4 className="font-bold text-gray-900 dark:text-white">Match Breakdown</h4>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-700 dark:text-white/90 font-medium">Skills Match</span>
                        <span className="text-gray-900 dark:text-white">92%</span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" style={{ width: '92%' }} />
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-gray-700 dark:text-white/90 font-medium">Experience Level</span>
                        <span className="text-white">85%</span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-purple-400 to-pink-500 rounded-full" style={{ width: '85%' }} />
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-gray-700 dark:text-white/90 font-medium">Salary Match</span>
                        <span className="text-white">78%</span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-green-400 to-teal-500 rounded-full" style={{ width: '78%' }} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-700 dark:text-white/80 bg-white/80 dark:bg-white/10 p-3 rounded-lg shadow-sm">
                    <Info className="w-4 h-4 mr-2" />
                    <span>Hover over score to see matching skills and missing requirements.</span>
                  </div>
                </motion.div>
              )}

              {activeTab === 'apply' && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Auto-Apply Wizard</h3>
                  <p className="text-gray-700 dark:text-white/80 mb-6">"Pre-fill applications using your profile, resume, and cover letter templates."</p>
                  
                  <div className="space-y-4">
                    <div className="bg-white/90 dark:bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-white/10 shadow-sm">
                      <div className="flex items-center mb-2">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                        <h4 className="font-medium text-gray-900 dark:text-white">Profile Import</h4>
                      </div>
                      <p className="text-gray-600 dark:text-white/70 text-sm">Automatically fill forms with your saved profile</p>
                    </div>
                    
                    <div className="bg-white/90 dark:bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-white/10 shadow-sm">
                      <div className="flex items-center mb-2">
                        <FileText className="w-5 h-5 text-blue-400 mr-2" />
                        <h4 className="font-medium text-gray-900 dark:text-white">Resume Matching</h4>
                      </div>
                      <p className="text-gray-600 dark:text-white/70 text-sm">Tailor your resume for each application</p>
                    </div>
                    
                    <div className="bg-white/90 dark:bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-white/10 shadow-sm">
                      <div className="flex items-center mb-2">
                        <Send className="w-5 h-5 text-purple-400 mr-2" />
                        <h4 className="font-medium text-gray-900 dark:text-white">Cover Letter Generator</h4>
                      </div>
                      <p className="text-gray-600 dark:text-white/70 text-sm">Personalized cover letters for each job</p>
                    </div>
                    
                    <div className="bg-white/90 dark:bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-white/10 shadow-sm">
                      <div className="flex items-center mb-2">
                        <RefreshCw className="w-5 h-5 text-cyan-400 mr-2" />
                        <h4 className="font-medium text-gray-900 dark:text-white">Application Review</h4>
                      </div>
                      <p className="text-gray-600 dark:text-white/70 text-sm">Option: Review each auto-filled form before submission.</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'alerts' && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Real-Time Alerts & Follow-Up</h3>
                  <p className="text-gray-700 dark:text-white/80 mb-6">"Get notified when a new high-match job appears and receive follow-up reminders post-application."</p>
                  
                  <div className="space-y-4">
                    <div className="bg-white/90 dark:bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-white/10 shadow-sm">
                      <div className="flex items-center mb-2">
                        <Bell className="w-5 h-5 text-yellow-400 mr-2" />
                        <h4 className="font-medium text-gray-900 dark:text-white">Instant Notifications</h4>
                      </div>
                      <p className="text-gray-600 dark:text-white/70 text-sm">Get alerts for new matching jobs</p>
                    </div>
                    
                    <div className="bg-white/90 dark:bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-white/10 shadow-sm">
                      <div className="flex items-center mb-2">
                        <Clock className="w-5 h-5 text-pink-400 mr-2" />
                        <h4 className="font-medium text-gray-900 dark:text-white">Follow-Up Reminders</h4>
                      </div>
                      <p className="text-gray-600 dark:text-white/70 text-sm">Never forget to follow up on applications</p>
                    </div>
                    
                    <div className="bg-white/90 dark:bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-white/10 shadow-sm">
                      <div className="flex items-center mb-2">
                        <Zap className="w-5 h-5 text-cyan-400 mr-2" />
                        <h4 className="font-medium text-gray-900 dark:text-white">Priority Alerts</h4>
                      </div>
                      <p className="text-gray-600 dark:text-white/70 text-sm">Highlight jobs with 90%+ match scores</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Right Column - Job Listings */}
            <div className="lg:col-span-2">
              <div className="bg-white/90 dark:bg-white/10 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-white/20 overflow-hidden shadow-xl">
                {/* Filters */}
                <div className="p-6 border-b border-white/10">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center space-x-2">
                      <Filter className="w-5 h-5 text-white/70" />
                      <span className="text-white/80">Sort by:</span>
                      <select className="bg-white/10 border border-white/20 rounded-lg px-3 py-1 text-white focus:outline-none focus:ring-1 focus:ring-cyan-500">
                        <option>Best Match</option>
                        <option>Newest</option>
                        <option>Salary (High to Low)</option>
                      </select>
                    </div>
                    <div className="text-white/70">
                      Showing {jobs.length} matching jobs
                    </div>
                  </div>
                </div>

                {/* Job List */}
                <div className="divide-y divide-white/10">
                  {jobs.map((job) => (
                    <motion.div 
                      key={job.id}
                      className={`p-6 hover:bg-white/5 transition-colors cursor-pointer ${expandedJob === job.id ? 'bg-white/10' : ''}`}
                      whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.03)' }}
                      onClick={() => toggleJobExpand(job.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{job.title}</h3>
                          <div className="flex items-center text-gray-700 dark:text-white/90 mb-2">
                            <span>{job.company}</span>
                            <span className="mx-2">•</span>
                            <span>{job.location}</span>
                            <span className="mx-2">•</span>
                            <span>{job.salary}</span>
                          </div>
                          
                          {/* Skills */}
                          <div className="flex flex-wrap gap-2 mt-3 text-gray-700 dark:text-gray-100">
                            {job.skills.map((skill, index) => (
                              <span key={index} className="text-xs bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 px-2 py-1 rounded">
                                {skill}
                              </span>
                            ))}
                          </div>
                          
                          {/* Posted */}
                          <div className="flex items-center text-sm text-white/50">
                            <Clock className="w-4 h-4 mr-1" />
                            <span>Posted {job.posted}</span>
                          </div>
                        </div>
                        
                        {/* Match Score */}
                        <div className="flex flex-col items-center">
                          <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-1 
                            ${job.match >= 90 ? 'bg-gradient-to-br from-green-500 to-teal-600' : 
                              job.match >= 80 ? 'bg-gradient-to-br from-cyan-500 to-blue-600' : 
                              'bg-gradient-to-br from-purple-500 to-pink-600'}`}>
                            <span className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">{job.match}%</span>
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-300">Match</span>
                        </div>
                      </div>
                      
                      {/* Expanded Content */}
                      {expandedJob === job.id && (
                        <motion.div 
                          className="mt-4 pt-4 border-t border-white/10"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          <h4 className="font-medium text-white mb-2">Job Description</h4>
                          <div className="text-sm text-gray-500 dark:text-gray-300">{job.posted}</div>
                          <p className="text-white/80 mb-4">{job.description}</p>
                          
                          <div className="flex flex-wrap gap-3">
                            <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 text-sm font-medium rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 flex items-center">
                              <Send className="w-4 h-4 mr-2" />
                              Apply Now
                            </button>
                            <button className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 text-sm font-medium rounded-lg border border-white/20 hover:bg-white/20 transition-all flex items-center">
                              <Briefcase className="w-4 h-4 mr-2" />
                              Save Job
                            </button>
                            <button className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 text-sm font-medium rounded-lg border border-white/20 hover:bg-white/20 transition-all flex items-center">
                              <Info className="w-4 h-4 mr-2" />
                              View Company
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/0 via-purple-900/30 to-slate-900/90" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-white">
              Ready to Find Your <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Perfect Job</span>?
            </h2>
            
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Let our AI-powered Job Finder do the heavy lifting for you.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button 
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 text-lg font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Zap className="w-5 h-5 mr-2" />
                Start Free Job Search
              </motion.button>
              
              <motion.button 
                className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 text-lg font-semibold rounded-lg border border-white/20 hover:bg-white/20 transition-all flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Send className="w-5 h-5 mr-2" />
                Auto-Apply to Matches
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </ProductLayout>
  );
};

export default JobMatcherPage;