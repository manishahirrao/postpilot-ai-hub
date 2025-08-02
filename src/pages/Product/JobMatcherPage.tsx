import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  FileText,
  Star,
  TrendingUp,
  Users,
  Target,
  Sparkles,
  ArrowRight,
  Play
} from 'lucide-react';

const JobMatcherPage = () => {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('search');
  const [expandedJob, setExpandedJob] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!mounted) return null;
  
  // Mock job data with enhanced properties
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
      description: "We're looking for an experienced frontend developer to lead our UI team building cutting-edge web applications.",
      companyLogo: "🚀",
      trending: true,
      urgent: false
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
      description: "Join our design team to create beautiful, intuitive interfaces for our global client base.",
      companyLogo: "🎨",
      trending: false,
      urgent: true
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
      description: "Early-stage startup looking for passionate full-stack developers to help build our MVP.",
      companyLogo: "💡",
      trending: true,
      urgent: false
    }
  ];

  const features = [
    {
      icon: <Search className="w-6 h-6" />,
      title: "AI-Powered Search",
      description: "Intelligent job matching using advanced algorithms",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Precision Matching",
      description: "Get matched with jobs that fit your exact requirements",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Auto-Apply",
      description: "Apply to multiple jobs instantly with AI assistance",
      color: "from-emerald-500 to-teal-500"
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: "Real-time Alerts",
      description: "Never miss a perfect job opportunity again",
      color: "from-orange-500 to-red-500"
    }
  ];

  const stats = [
    { label: "Jobs Matched", value: "50K+", icon: <Briefcase className="w-5 h-5" /> },
    { label: "Success Rate", value: "94%", icon: <TrendingUp className="w-5 h-5" /> },
    { label: "Companies", value: "2.5K+", icon: <Building className="w-5 h-5" /> },
    { label: "Happy Users", value: "15K+", icon: <Users className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br pt-20 from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute w-96 h-96 rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)",
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Floating Elements */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-10"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              rotate: 360
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 2
            }}
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + i * 10}%`
            }}
          />
        ))}

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}
          />
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 mb-8">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm font-medium">AI Job Matcher & Applier Agent</span>
            </div>
            
            <h1 className="text-6xl lg:text-8xl font-bold leading-tight mb-8">
              <span className="block">Find Your</span>
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                Dream Job
              </span>
              <span className="block">with AI Precision</span> 
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              🚀 Discover opportunities tailored to your skills. Our AI finds, ranks, and applies to jobs for you automatically.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto mb-12"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl p-2">
                <div className="flex items-center">
                  <div className="flex-1 relative">
                    <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Enter job title, skills, or company..."
                      className="w-full bg-transparent pl-16 pr-6 py-6 text-lg text-white placeholder-gray-400 focus:outline-none"
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-6 rounded-xl font-semibold flex items-center gap-2"
                  >
                    <Sparkles className="w-5 h-5" />
                    Find Jobs
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-6 mb-16"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-3 shadow-xl shadow-cyan-500/25"
            >
              <Play className="w-5 h-5" />
              Start Job Search
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-3 hover:bg-white/20 transition-all"
            >
              <Zap className="w-5 h-5" />
              Auto-Apply Mode
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-center group hover:bg-white/10 transition-all"
              >
                <div className="text-cyan-400 mb-2 flex justify-center group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* 3D Floating Cards */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${20 + i * 30}%`,
                top: `${30 + i * 15}%`
              }}
              animate={{
                y: [0, -20, 0],
                rotateY: [0, 15, 0],
                rotateX: [0, 5, 0]
              }}
              transition={{
                duration: 6 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 2
              }}
            >
              <div className="w-64 h-40 bg-gradient-to-br from-white/10 opacity-40 to-white/5 backdrop-blur-md border border-white/20 rounded-2xl p-6 transform-gpu perspective-1000">
                <div className="text-2xl mb-2">{jobs[i]?.companyLogo}</div>
                <div className="text-lg font-semibold mb-1">{jobs[i]?.title}</div>
                <div className="text-gray-400 text-sm">{jobs[i]?.company}</div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-cyan-400 font-semibold">{jobs[i]?.match}% Match</span>
                  <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Powered by AI
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience the future of job hunting with our intelligent matching system
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  z: 50
                }}
                className="group relative"
              >
                <div className="absolute -inset-1 bg-gradient-to-r opacity-0 group-hover:opacity-25 transition duration-500 rounded-2xl blur"
                     style={{ backgroundImage: `linear-gradient(135deg, ${feature.color.split(' ')[1]}, ${feature.color.split(' ')[3]})` }} />
                
                <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 h-full transform-gpu">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <div className="text-white">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Listings Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-4xl font-bold mb-6">Perfect Matches for You</h2>
            <div className="flex items-center justify-between">
              <p className="text-gray-400">Showing {jobs.length} high-match opportunities</p>
              <div className="flex items-center gap-4">
                <select className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-cyan-500">
                  <option>Best Match</option>
                  <option>Newest First</option>
                  <option>Salary High to Low</option>
                </select>
              </div>
            </div>
          </motion.div>

          <div className="space-y-6">
            {jobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, z: 10 }}
                className="group relative cursor-pointer"
                onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
                
                <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 transform-gpu">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{job.companyLogo}</div>
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-2xl font-bold">{job.title}</h3>
                          {job.trending && (
                            <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                              <TrendingUp className="w-3 h-3" />
                              Trending
                            </div>
                          )}
                          {job.urgent && (
                            <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold animate-pulse">
                              Urgent
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-gray-400 mb-4">
                          <span className="flex items-center gap-1">
                            <Building className="w-4 h-4" />
                            {job.company}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            {job.salary}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {job.posted}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {job.skills.map((skill, skillIndex) => (
                            <span
                              key={skillIndex}
                              className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-cyan-400 px-3 py-1 rounded-lg text-sm font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <motion.div
                        whileHover={{ scale: 1.1, rotateY: 10 }}
                        className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-2 text-2xl font-bold shadow-lg transform-gpu ${
                          job.match >= 90 
                            ? 'bg-gradient-to-br from-green-400 to-emerald-600 shadow-green-500/25' 
                            : job.match >= 80 
                            ? 'bg-gradient-to-br from-cyan-400 to-blue-600 shadow-cyan-500/25' 
                            : 'bg-gradient-to-br from-purple-400 to-pink-600 shadow-purple-500/25'
                        }`}
                      >
                        {job.match}%
                      </motion.div>
                      <div className="text-sm text-gray-400">Match Score</div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {expandedJob === job.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-t border-white/10 pt-6"
                      >
                        <p className="text-gray-300 mb-6 leading-relaxed">{job.description}</p>
                        
                        <div className="flex flex-wrap gap-4">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-lg shadow-cyan-500/25"
                          >
                            <Send className="w-4 h-4" />
                            Apply Now
                          </motion.button>
                          
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-white/20 transition-all"
                          >
                            <Star className="w-4 h-4" />
                            Save Job
                          </motion.button>
                          
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-white/20 transition-all"
                          >
                            <Info className="w-4 h-4" />
                            Company Info
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl" />
            <div className="relative bg-white/5 backdrop-blur-md border border-white/20 rounded-3xl p-12">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Ready to Find Your
                <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent block">
                  Perfect Job?
                </span>
              </h2>
              
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of job seekers who found their dream careers with our AI-powered platform
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-10 py-5 text-lg font-semibold rounded-xl flex items-center justify-center gap-3 shadow-xl shadow-cyan-500/25"
                >
                  <Sparkles className="w-5 h-5" />
                  Start Free Search
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group bg-gradient-to-r from-purple-500 to-pink-600 text-white px-10 py-5 text-lg font-semibold rounded-xl flex items-center justify-center gap-3 shadow-xl shadow-purple-500/25"
                >
                  <Zap className="w-5 h-5" />
                  Enable Auto-Apply
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default JobMatcherPage;