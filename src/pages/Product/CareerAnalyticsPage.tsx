import React, { useState, useEffect } from 'react';
import { 
  BarChart2,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Star,
  CheckCircle,
  BookOpen,
  Briefcase,
  TrendingUp,
  Target,
  Clock,
  Award,
  DollarSign,
  Users,
  Zap,
  Sparkles,
  Brain,
  Rocket,
  Eye
} from 'lucide-react';

// 3D Card Component with glass morphism
const GlassCard = ({ children, className = "", delay = 0, hover3D = true }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`
        relative group cursor-pointer
        transform-gpu transition-all duration-700 ease-out
        ${hover3D && isHovered ? 'scale-[1.02] -translate-y-1' : 'scale-100 translate-y-0'}
        ${className}
      `}
      style={{
        perspective: '1000px',
        animationDelay: `${delay}ms`
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`
        relative w-full h-full
        bg-gradient-to-br from-white/10 via-white/5 to-transparent
        backdrop-blur-xl border border-white/20
        rounded-3xl overflow-hidden
        transform-gpu transition-all duration-700
        ${hover3D && isHovered ? 'rotateX-1 rotateY-1' : 'rotateX-0 rotateY-0'}
        shadow-2xl shadow-black/20
      `}>
        {/* Animated gradient border */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Shimmer effect */}
        <div className={`
          absolute -top-4 left-0 w-full h-4 
          bg-gradient-to-r from-transparent via-white/20 to-transparent
          transform skew-x-45 transition-transform duration-1000
          ${isHovered ? 'translate-x-full' : '-translate-x-full'}
        `} />
        
        {/* Content */}
        <div className="relative z-10 p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

// Animated metric component
const AnimatedMetric = ({ value, label, suffix = "", prefix = "", color = "blue" }) => {
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    const numericValue = parseInt(value.toString().replace(/[^0-9]/g, ''));
    const timer = setTimeout(() => {
      let current = 0;
      const increment = numericValue / 30;
      const counter = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
          setDisplayValue(numericValue);
          clearInterval(counter);
        } else {
          setDisplayValue(Math.floor(current));
        }
      }, 50);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [value]);
  
  const colorClasses = {
    blue: 'from-blue-400 to-cyan-400',
    purple: 'from-purple-400 to-pink-400',
    green: 'from-green-400 to-teal-400',
    orange: 'from-orange-400 to-red-400'
  };
  
  return (
    <div className="text-center">
      <div className={`text-4xl font-bold bg-gradient-to-r ${colorClasses[color]} bg-clip-text text-transparent mb-2`}>
        {prefix}{displayValue}{suffix}
      </div>
      <div className="text-white/60 text-sm">{label}</div>
    </div>
  );
};

// Skill progress bar
const SkillBar = ({ skill, level, delay = 0 }) => {
  const [animated, setAnimated] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-white/90">{skill}</span>
        <span className="text-white/60">{level}%</span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000 ease-out"
          style={{ width: animated ? `${level}%` : '0%' }}
        />
      </div>
    </div>
  );
};

const CareerAnalyticsPage = () => {
  const [activeTab, setActiveTab] = useState('currentJob');
  const [expandedSection, setExpandedSection] = useState('roleSnapshot');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const currentJobData = {
    roleSnapshot: {
      title: "Senior Product Designer",
      experience: "5",
      industry: "Tech/SaaS"
    },
    performance: {
      score: 87,
      percentile: "85th",
      trend: "+12%"
    },
    compensation: {
      current: "1,800,000",
      range: ["1,200,000", "2,500,000"],
      percentile: "70th"
    },
    skills: {
      strengths: [
        { name: "UX Research", level: 92 },
        { name: "Prototyping", level: 88 },
        { name: "Design Systems", level: 85 }
      ],
      gaps: [
        { name: "AI/ML Basics", level: 45 },
        { name: "Data Visualization", level: 52 },
        { name: "Accessibility", level: 38 }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-10 right-10 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
          style={{ 
            transform: `translate(${scrollY * 0.1}px, ${scrollY * 0.05}px) rotate(${scrollY * 0.1}deg)`,
            animation: 'pulse 8s ease-in-out infinite' 
          }}
        />
        <div 
          className="absolute bottom-10 left-10 w-80 h-80 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 rounded-full blur-3xl"
          style={{ 
            transform: `translate(${scrollY * -0.1}px, ${scrollY * -0.03}px) rotate(${scrollY * -0.1}deg)`,
            animation: 'pulse 6s ease-in-out infinite reverse' 
          }}
        />
        
        {/* Data flow particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `dataFlow ${4 + Math.random() * 3}s linear infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          {/* Agent Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-full mb-8">
            <Brain className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-medium bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Career Analytics Agent
            </span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-8">
            <span className="block bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent">
              Data-Driven
            </span>
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Career Intelligence
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/70 max-w-4xl mx-auto mb-12">
            AI-powered insights to track, analyze, and optimize every aspect of your professional growth with precision analytics.
          </p>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-16">
            <div className="inline-flex bg-white/5 backdrop-blur-xl rounded-2xl p-2 border border-white/20">
              <button
                onClick={() => setActiveTab('currentJob')}
                className={`px-8 py-4 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === 'currentJob' 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2">
                  <BarChart2 className="w-5 h-5" />
                  Current Role Deep Dive
                </div>
              </button>
              <button
                onClick={() => setActiveTab('careerSwitch')}
                className={`px-8 py-4 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === 'careerSwitch' 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Rocket className="w-5 h-5" />
                  Career Switch Navigator
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {activeTab === 'currentJob' ? (
            <div className="space-y-8">
              {/* AI Introduction */}
              <GlassCard delay={0}>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">Career Analytics Agent</h3>
                    <p className="text-white/80 leading-relaxed">
                      👋 Hi there! I'm analyzing your career data to provide personalized insights. Let's see where you stand today and identify growth opportunities.
                    </p>
                  </div>
                </div>
              </GlassCard>

              {/* Performance Metrics Dashboard */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <GlassCard delay={100}>
                  <AnimatedMetric 
                    value={currentJobData.performance.score} 
                    label="Performance Score" 
                    suffix="/100"
                    color="blue" 
                  />
                </GlassCard>
                <GlassCard delay={200}>
                  <AnimatedMetric 
                    value={85} 
                    label="Industry Percentile" 
                    suffix="th"
                    color="purple" 
                  />
                </GlassCard>
                <GlassCard delay={300}>
                  <AnimatedMetric 
                    value={12} 
                    label="Growth This Quarter" 
                    prefix="+"
                    suffix="%"
                    color="green" 
                  />
                </GlassCard>
              </div>

              {/* Role Snapshot */}
              <GlassCard delay={100}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl">
                      <Briefcase className="w-6 h-6 text-blue-400" />
                    </div>
                    Role Analysis
                  </h3>
                  <button 
                    onClick={() => toggleSection('roleSnapshot')}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    {expandedSection === 'roleSnapshot' ? 
                      <ChevronUp className="w-5 h-5 text-white/70" /> : 
                      <ChevronDown className="w-5 h-5 text-white/70" />
                    }
                  </button>
                </div>
                
                {expandedSection === 'roleSnapshot' && (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="text-center p-4 bg-white/5 rounded-2xl">
                        <div className="text-2xl font-bold text-white mb-1">{currentJobData.roleSnapshot.title}</div>
                        <div className="text-white/60">Current Role</div>
                      </div>
                      <div className="text-center p-4 bg-white/5 rounded-2xl">
                        <div className="text-2xl font-bold text-white mb-1">{currentJobData.roleSnapshot.experience} Years</div>
                        <div className="text-white/60">Experience</div>
                      </div>
                      <div className="text-center p-4 bg-white/5 rounded-2xl">
                        <div className="text-2xl font-bold text-white mb-1">{currentJobData.roleSnapshot.industry}</div>
                        <div className="text-white/60">Industry</div>
                      </div>
                    </div>
                    
                    <div className="p-6 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl border border-blue-500/20">
                      <div className="flex items-center gap-3 mb-3">
                        <Eye className="w-5 h-5 text-blue-400" />
                        <span className="font-semibold text-white">AI Insight</span>
                      </div>
                      <p className="text-white/90">
                        Your profile shows strong technical expertise with room for leadership development. Consider focusing on strategic thinking and team management skills to reach the next level.
                      </p>
                    </div>
                  </div>
                )}
              </GlassCard>

              {/* Skills Analysis */}
              <GlassCard delay={200}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-xl">
                      <Zap className="w-6 h-6 text-green-400" />
                    </div>
                    Skills Portfolio
                  </h3>
                  <button 
                    onClick={() => toggleSection('skills')}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    {expandedSection === 'skills' ? 
                      <ChevronUp className="w-5 h-5 text-white/70" /> : 
                      <ChevronDown className="w-5 h-5 text-white/70" />
                    }
                  </button>
                </div>
                
                {expandedSection === 'skills' && (
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <Star className="w-5 h-5 text-yellow-400" />
                        Your Strengths
                      </h4>
                      <div className="space-y-4">
                        {currentJobData.skills.strengths.map((skill, index) => (
                          <SkillBar 
                            key={skill.name} 
                            skill={skill.name} 
                            level={skill.level} 
                            delay={index * 200}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <Target className="w-5 h-5 text-purple-400" />
                        Growth Opportunities
                      </h4>
                      <div className="space-y-4">
                        {currentJobData.skills.gaps.map((skill, index) => (
                          <SkillBar 
                            key={skill.name} 
                            skill={skill.name} 
                            level={skill.level} 
                            delay={index * 200 + 600}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </GlassCard>

              {/* Compensation Analysis */}
              <GlassCard delay={300}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl">
                      <DollarSign className="w-6 h-6 text-yellow-400" />
                    </div>
                    Market Position
                  </h3>
                  <button 
                    onClick={() => toggleSection('compensation')}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    {expandedSection === 'compensation' ? 
                      <ChevronUp className="w-5 h-5 text-white/70" /> : 
                      <ChevronDown className="w-5 h-5 text-white/70" />
                    }
                  </button>
                </div>
                
                {expandedSection === 'compensation' && (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="text-center p-4 bg-gradient-to-r from-green-900/30 to-teal-900/30 rounded-2xl border border-green-500/20">
                        <div className="text-xl font-bold text-white mb-1">₹{currentJobData.compensation.current}</div>
                        <div className="text-white/60">Current Salary</div>
                      </div>
                      <div className="text-center p-4 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl border border-blue-500/20">
                        <div className="text-xl font-bold text-white mb-1">{currentJobData.compensation.percentile}</div>
                        <div className="text-white/60">Market Percentile</div>
                      </div>
                      <div className="text-center p-4 bg-gradient-to-r from-orange-900/30 to-red-900/30 rounded-2xl border border-orange-500/20">
                        <div className="text-xl font-bold text-white mb-1">₹2.5L</div>
                        <div className="text-white/60">Growth Potential</div>
                      </div>
                    </div>
                    
                    <div className="p-6 bg-gradient-to-r from-yellow-900/20 to-orange-900/20 rounded-2xl border border-yellow-500/20">
                      <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                        <Award className="w-5 h-5 text-yellow-400" />
                        Negotiation Strategy
                      </h4>
                      <div className="space-y-3 text-white/90">
                        <p>• "Based on my contributions to [Project], I'd like to discuss market-rate alignment"</p>
                        <p>• "Given my UX expertise and current market rates, let's review compensation"</p>
                        <p>• "I've consistently exceeded targets - let's discuss growth opportunities"</p>
                      </div>
                    </div>
                  </div>
                )}
              </GlassCard>

              {/* Action Input */}
              <GlassCard delay={400}>
                <h3 className="text-xl font-bold text-white mb-4">Help me personalize your analysis</h3>
                <p className="text-white/70 mb-6">
                  Share your current role, key responsibilities, and career goals for more targeted insights.
                </p>
                <div className="flex gap-3">
                  <input 
                    type="text" 
                    placeholder="Tell me about your current role and aspirations..." 
                    className="flex-1 bg-white/5 border border-white/20 rounded-xl px-6 py-4 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent backdrop-blur-sm"
                  />
                  <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Analyze
                  </button>
                </div>
              </GlassCard>

              {/* Primary CTA */}
              <div className="text-center pt-8">
                <button className="group bg-gradient-to-r from-blue-500 to-purple-600 text-white px-12 py-6 text-xl font-bold rounded-2xl hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105">
                  <span className="flex items-center gap-3">
                    Generate Complete Analysis
                    <ArrowRight className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </div>
            </div>
          ) : (
            /* Career Switch Tab Content */
            <div className="space-y-8">
              {/* AI Introduction for Career Switch */}
              <GlassCard delay={0}>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Rocket className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">Career Transition Specialist</h3>
                    <p className="text-white/80 leading-relaxed">
                      🚀 Ready for a change? I'll analyze your transferable skills and map the perfect career transition path based on market trends and your strengths.
                    </p>
                  </div>
                </div>
              </GlassCard>

              {/* Transition Metrics */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <GlassCard delay={100}>
                  <AnimatedMetric 
                    value={78} 
                    label="Skill Transferability" 
                    suffix="%"
                    color="purple" 
                  />
                </GlassCard>
                <GlassCard delay={200}>
                  <AnimatedMetric 
                    value={24} 
                    label="Matching Career Paths" 
                    color="blue" 
                  />
                </GlassCard>
                <GlassCard delay={300}>
                  <AnimatedMetric 
                    value={6} 
                    label="Months to Transition" 
                    color="green" 
                  />
                </GlassCard>
              </div>

              {/* Transferable Skills */}
              <GlassCard delay={100}>
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl">
                    <Users className="w-6 h-6 text-purple-400" />
                  </div>
                  Skills Translation Matrix
                </h3>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-bold text-white mb-4">Your Transferable Assets</h4>
                    <div className="space-y-3">
                      {['User Research', 'Stakeholder Management', 'Visual Storytelling'].map((skill, index) => (
                        <div key={skill} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                          <CheckCircle className="w-5 h-5 text-green-400" />
                          <span className="text-white/90">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-bold text-white mb-4">Matching Career Paths</h4>
                    <div className="space-y-3">
                      {['UX Researcher', 'Product Manager', 'Design Educator'].map((role, index) => (
                        <div key={role} className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-xl border border-purple-500/20">
                          <Target className="w-5 h-5 text-purple-400" />
                          <span className="text-white/90">{role}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </GlassCard>

              {/* Industry Trends */}
              <GlassCard delay={200}>
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-xl">
                    <TrendingUp className="w-6 h-6 text-green-400" />
                  </div>
                  High-Growth Opportunities
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-2xl border border-blue-500/20">
                    <h4 className="text-xl font-bold text-white mb-3">AI/ML Design</h4>
                    <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent mb-2">
                      +22% YoY
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {['AI Ethics', 'Prompt Engineering', 'Data Viz'].map((skill) => (
                        <span key={skill} className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-6 bg-gradient-to-r from-green-900/30 to-teal-900/30 rounded-2xl border border-green-500/20">
                    <h4 className="text-xl font-bold text-white mb-3">Sustainability Consulting</h4>
                    <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent mb-2">
                      +18% YoY
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {['Circular Design', 'ESG Analysis', 'Policy'].map((skill) => (
                        <span key={skill} className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </GlassCard>

              {/* Transition Roadmap */}
              <GlassCard delay={300}>
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-xl">
                    <Target className="w-6 h-6 text-orange-400" />
                  </div>
                  90-Day Transition Plan
                </h3>
                
                <div className="space-y-6">
                  {[
                    { 
                      phase: "Month 1", 
                      title: "Foundation Building", 
                      actions: ["Complete PM Fundamentals Course", "Join Product Communities", "Start Industry Newsletter"],
                      color: "blue"
                    },
                    { 
                      phase: "Month 2", 
                      title: "Portfolio Development", 
                      actions: ["Build Case Study Portfolio", "Network with PMs", "Attend Industry Events"],
                      color: "purple"
                    },
                    { 
                      phase: "Month 3", 
                      title: "Market Entry", 
                      actions: ["Apply to Target Roles", "Practice PM Interviews", "Leverage Network"],
                      color: "green"
                    }
                  ].map((phase, index) => (
                    <div key={phase.phase} className="relative">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 bg-gradient-to-r from-${phase.color}-500 to-${phase.color}-600 rounded-2xl flex items-center justify-center shadow-lg text-white font-bold`}>
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-xl font-bold text-white">{phase.title}</h4>
                            <span className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/70">{phase.phase}</span>
                          </div>
                          <div className="space-y-2">
                            {phase.actions.map((action, actionIndex) => (
                              <div key={actionIndex} className="flex items-center gap-2 text-white/80">
                                <CheckCircle className="w-4 h-4 text-green-400" />
                                <span>{action}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      {index < 2 && (
                        <div className="absolute left-6 top-12 w-px h-8 bg-gradient-to-b from-white/20 to-transparent" />
                      )}
                    </div>
                  ))}
                </div>
              </GlassCard>

              {/* Action Input */}
              <GlassCard delay={400}>
                <h3 className="text-xl font-bold text-white mb-4">Tell me about your dream transition</h3>
                <p className="text-white/70 mb-6">
                  Share your interests, target industries, and any specific roles you're considering.
                </p>
                <div className="flex gap-3">
                  <input 
                    type="text" 
                    placeholder="I'm interested in transitioning to..." 
                    className="flex-1 bg-white/5 border border-white/20 rounded-xl px-6 py-4 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent backdrop-blur-sm"
                  />
                  <button className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-8 py-4 rounded-xl font-medium hover:shadow-lg hover:shadow-pink-500/25 transition-all duration-300 flex items-center gap-2">
                    <Rocket className="w-5 h-5" />
                    Explore
                  </button>
                </div>
              </GlassCard>

              {/* Primary CTA */}
              <div className="text-center pt-8">
                <button className="group bg-gradient-to-r from-purple-500 to-pink-600 text-white px-12 py-6 text-xl font-bold rounded-2xl hover:shadow-2xl hover:shadow-pink-500/25 transition-all duration-300 transform hover:scale-105">
                  <span className="flex items-center gap-3">
                    Build My Transition Plan
                    <ArrowRight className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        
        @keyframes dataFlow {
          0% { transform: translateY(100vh) translateX(0px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) translateX(50px); opacity: 0; }
        }
        
        .rotateX-1 { transform: rotateX(1deg); }
        .rotateY-1 { transform: rotateY(1deg); }
        .rotateX-2 { transform: rotateX(2deg); }
        .rotateY-2 { transform: rotateY(2deg); }
        .rotateX-0 { transform: rotateX(0deg); }
        .rotateY-0 { transform: rotateY(0deg); }
      `}</style>
    </div>
  );
};

export default CareerAnalyticsPage;