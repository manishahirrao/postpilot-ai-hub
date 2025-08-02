import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
  Zap
} from 'lucide-react';
import { useThemeStyles } from '@/lib/theme-utils';
import ProductLayout from '@/components/Layout/ProductLayout';

const CareerAnalyticsPage = () => {
  const themeStyles = useThemeStyles();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('currentJob');
  const [expandedSection, setExpandedSection] = useState(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

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
      kpis: [
        { month: "Jan", value: 82 },
        { month: "Feb", value: 85 },
        { month: "Mar", value: 88 },
        { month: "Apr", value: 86 },
        { month: "May", value: 87 },
        { month: "Jun", value: 89 }
      ]
    },
    compensation: {
      current: "1,800,000",
      range: ["1,200,000", "2,500,000"],
      percentile: "70th"
    },
    skills: {
      strengths: ["UX Research", "Prototyping", "Design Systems"],
      gaps: ["AI/ML Basics", "Advanced Data Visualization", "Accessibility Certification"]
    },
    growth: [
      {
        action: "Enroll in AI for Designers course",
        time: "2-4 hours/week",
        platform: "Interaction Design Foundation"
      },
      {
        action: "Join Design Leadership Forum",
        platform: "ADPList"
      },
      {
        action: "Complete WCAG 2.1 Certification",
        time: "6 weeks",
        platform: "Deque University"
      }
    ]
  };

  const careerSwitchData = {
    transferableSkills: {
      current: ["User Research", "Stakeholder Management", "Visual Storytelling"],
      matchingRoles: ["UX Researcher", "Product Manager", "Design Educator"]
    },
    industryTrends: [
      {
        field: "AI/ML Design",
        growth: "22% annual",
        skills: ["AI Ethics", "Prompt Engineering", "Data Visualization"]
      },
      {
        field: "Sustainability Consulting",
        growth: "18% annual",
        skills: ["Circular Design", "Lifecycle Analysis", "Regulatory Knowledge"]
      }
    ],
    actionPlan: [
      {
        step: 1,
        action: "Complete Product Management Fundamentals",
        duration: "4 weeks",
        resource: "Coursera"
      },
      {
        step: 2,
        action: "Build product strategy case study",
        details: "Document full product lifecycle from research to launch"
      },
      {
        step: 3,
        action: "Network with PM community",
        platform: "Lenny's Slack group"
      }
    ]
  };

  return (
    <ProductLayout 
      title="Career Analytics Dashboard"
      description="Track your career progress, skills development, and job market insights"
      className={`${themeStyles.bgGradient} text-gray-900 dark:text-gray-100`}
    >
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
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
          <div className="text-center mb-12">
            <h1 className={`text-4xl font-bold mb-4 ${themeStyles.textPrimary}`}>
              Career Analytics Dashboard
            </h1>
            <p className={`text-xl ${themeStyles.textSecondary} max-w-3xl mx-auto`}>
              AI-powered insights to track and optimize your career growth.
            </p>
          </div>

          <div className="text-center">
            <motion.div 
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-full px-4 py-2 border border-cyan-500/20 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <BarChart2 className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-medium text-white/90">Career Analytics Agent</span>
            </motion.div>

            <motion.h1
              className="text-5xl lg:text-6xl font-bold leading-tight text-white mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <span className="block">Data-Driven</span>
              <span className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Career Insights
              </span>
            </motion.h1>

            <motion.p 
              className="text-xl text-gray-700 dark:text-white/80 max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Track your career growth, skill development, and market value with data-driven insights
            </motion.p>
          </div>

          {/* Tab Navigation */}
          <motion.div 
            className="flex justify-center mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="inline-flex bg-white/10 backdrop-blur-sm rounded-xl p-1 border border-white/20">
              <button
                onClick={() => setActiveTab('currentJob')}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${activeTab === 'currentJob' ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white' : 'text-white/70 hover:text-white'}`}
              >
                Current Job Deep Dive
              </button>
              <button
                onClick={() => setActiveTab('careerSwitch')}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${activeTab === 'careerSwitch' ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white' : 'text-white/70 hover:text-white'}`}
              >
                Career Switch Navigator
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeTab === 'currentJob' ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Chat Introduction */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 mb-8">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                    <BarChart2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">Career Analytics Agent</h3>
                    <p className="text-white/80">
                      👋 Hi [User Name], I'm your Career Analytics Agent. Let's assess where you stand today!
                    </p>
                  </div>
                </div>
              </div>

              {/* Role Snapshot */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white flex items-center">
                    <Briefcase className="w-5 h-5 mr-2 text-cyan-400" />
                    Role Snapshot
                  </h3>
                  <button 
                    onClick={() => toggleSection('roleSnapshot')}
                    className="text-white/70 hover:text-white"
                  >
                    {expandedSection === 'roleSnapshot' ? <ChevronUp /> : <ChevronDown />}
                  </button>
                </div>
                
                <div className={`${expandedSection === 'roleSnapshot' ? 'block' : 'hidden'} space-y-4`}>
                  <p className="text-white/80">
                    You're currently a <span className="font-bold text-white">{currentJobData.roleSnapshot.title}</span> with{' '}
                    <span className="font-bold text-white">{currentJobData.roleSnapshot.experience}</span> years of experience in{' '}
                    <span className="font-bold text-white">{currentJobData.roleSnapshot.industry}</span>.
                  </p>
                </div>
              </div>

              {/* Performance Score */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-purple-400" />
                    Performance Score & Benchmark
                  </h3>
                  <button 
                    onClick={() => toggleSection('performance')}
                    className="text-white/70 hover:text-white"
                  >
                    {expandedSection === 'performance' ? <ChevronUp /> : <ChevronDown />}
                  </button>
                </div>
                
                <div className={`${expandedSection === 'performance' ? 'block' : 'hidden'} space-y-4`}>
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl font-bold bg-gradient-to-r from-green-400 to-cyan-500 bg-clip-text text-transparent">
                      {currentJobData.performance.score}%
                    </div>
                    <div className="text-white/80">
                      Landing you in the <span className="font-bold text-white">{currentJobData.performance.percentile}</span> among peers
                    </div>
                  </div>
                  
                  <div className="mt-4 bg-slate-800/50 rounded-lg p-4">
                    <div className="flex justify-between text-xs text-white/60 mb-2">
                      {currentJobData.performance.kpis.map((kpi) => (
                        <span key={kpi.month}>{kpi.month}</span>
                      ))}
                    </div>
                    <div className="flex items-end h-12 space-x-1">
                      {currentJobData.performance.kpis.map((kpi) => (
                        <div 
                          key={kpi.month} 
                          className="flex-1 bg-gradient-to-t from-purple-500 to-purple-300 rounded-t-sm"
                          style={{ height: `${kpi.value * 0.5}%` }}
                        />
                      ))}
                    </div>
                    <div className="text-sm text-gray-700 dark:text-white/70">
                      Better than {currentJobData.performance.percentile} of peers
                    </div>
                  </div>
                </div>
              </div>

              {/* Compensation Analysis */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white flex items-center">
                    <DollarSign className="w-5 h-5 mr-2 text-yellow-400" />
                    Compensation Analysis
                  </h3>
                  <button 
                    onClick={() => toggleSection('compensation')}
                    className="text-white/70 hover:text-white"
                  >
                    {expandedSection === 'compensation' ? <ChevronUp /> : <ChevronDown />}
                  </button>
                </div>
                
                <div className={`${expandedSection === 'compensation' ? 'block' : 'hidden'} space-y-4`}>
                  <p className="text-white/80">
                    Market salary for similar roles ranges from{' '}
                    <span className="font-bold text-white">₹{currentJobData.compensation.range[0]}</span> to{' '}
                    <span className="font-bold text-white">₹{currentJobData.compensation.range[1]}</span>. You're currently at{' '}
                    <span className="font-bold text-white">₹{currentJobData.compensation.current}</span>, placing you in the{' '}
                    <span className="font-bold text-white">{currentJobData.compensation.percentile}</span>.
                  </p>
                  
                  <div className="mt-4 bg-slate-800/50 rounded-lg p-4">
                    <h4 className="text-sm font-bold text-white mb-2">Negotiation Tips</h4>
                    <p className="text-white/80 mb-3">
                      "Based on my contributions to [Project], I'd like to discuss adjusting my compensation to the market median."
                    </p>
                    <p className="text-white/80">
                      "Given my [Skill] expertise and the current market rates, could we review my compensation package?"
                    </p>
                  </div>
                  <div className="text-4xl font-bold text-gray-900 dark:text-white">
                    {currentJobData.performance.score}
                    <span className="text-xl text-gray-700 dark:text-white/70">/100</span>
                  </div>
                </div>
              </div>

              {/* Skill Gap Analysis */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-orange-400" />
                    Skill Gap & Growth Roadmap
                  </h3>
                  <button 
                    onClick={() => toggleSection('skills')}
                    className="text-white/70 hover:text-white"
                  >
                    {expandedSection === 'skills' ? <ChevronUp /> : <ChevronDown />}
                  </button>
                </div>
                
                <div className={`${expandedSection === 'skills' ? 'block' : 'hidden'} space-y-6`}>
                  <div>
                    <h4 className="text-md font-bold text-white mb-2">Your Strengths</h4>
                    <div className="flex flex-wrap gap-2">
                      {currentJobData.skills.strengths.map((skill) => (
                        <span key={skill} className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-md font-bold text-white mb-2">Key Skills to Develop</h4>
                    <div className="flex flex-wrap gap-2">
                      {currentJobData.skills.gaps.map((skill) => (
                        <span key={skill} className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-md font-bold text-white mb-3">Action Plan</h4>
                    <div className="space-y-3">
                      {currentJobData.growth.map((item, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-white">{item.action}</p>
                            <p className="text-white/60 text-sm">
                              {item.time && <span>{item.time} • </span>}
                              {item.platform}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Input Prompt */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 mb-8">
                <h3 className="text-lg font-bold text-white mb-3">Help me refine your analysis</h3>
                <p className="text-white/80 mb-4">
                  Please share or confirm: your current role, years of experience, top 3 responsibilities.
                </p>
                <div className="flex space-x-3">
                  <input 
                    type="text" 
                    placeholder="Type your response..." 
                    className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <button className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium">
                    Submit
                  </button>
                </div>
              </div>

              {/* Primary CTA */}
              <div className="text-center">
                <button className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-4 text-lg font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 inline-flex items-center">
                  Generate My Role Analysis
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Chat Introduction */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 mb-8">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                    <BarChart2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">Career Analytics Agent</h3>
                    <p className="text-white/80">
                      🤔 Dreaming of a change? Share your passions, and I'll recommend fitting career paths.
                    </p>
                  </div>
                </div>
              </div>

              {/* Transferable Skills */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white flex items-center">
                    <Users className="w-5 h-5 mr-2 text-pink-400" />
                    Transferable Skills Matcher
                  </h3>
                  <button 
                    onClick={() => toggleSection('transferableSkills')}
                    className="text-white/70 hover:text-white"
                  >
                    {expandedSection === 'transferableSkills' ? <ChevronUp /> : <ChevronDown />}
                  </button>
                </div>
                
                <div className={`${expandedSection === 'transferableSkills' ? 'block' : 'hidden'} space-y-4`}>
                  <p className="text-white/80">
                    Your top transferable skills—{' '}
                    {careerSwitchData.transferableSkills.current.map((skill, index) => (
                      <React.Fragment key={skill}>
                        <span className="font-bold text-white">{skill}</span>
                        {index < careerSwitchData.transferableSkills.current.length - 1 ? ', ' : ''}
                      </React.Fragment>
                    ))}—align with roles like{' '}
                    {careerSwitchData.transferableSkills.matchingRoles.map((role, index) => (
                      <React.Fragment key={role}>
                        <span className="font-bold text-white">{role}</span>
                        {index < careerSwitchData.transferableSkills.matchingRoles.length - 1 ? ', ' : ''}
                      </React.Fragment>
                    ))}.
                  </p>
                </div>
              </div>

              {/* Industry Trends */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
                    Industry Trend Insights
                  </h3>
                  <button 
                    onClick={() => toggleSection('industryTrends')}
                    className="text-white/70 hover:text-white"
                  >
                    {expandedSection === 'industryTrends' ? <ChevronUp /> : <ChevronDown />}
                  </button>
                </div>
                
                <div className={`${expandedSection === 'industryTrends' ? 'block' : 'hidden'} space-y-6`}>
                  <p className="text-white/80">
                    Fields with fastest growth: AI/ML, Digital Marketing, Sustainability Consulting.
                  </p>
                  
                  <div className="space-y-4">
                    {careerSwitchData.industryTrends.map((trend, index) => (
                      <div key={index} className="bg-slate-800/50 rounded-lg p-4">
                        <h4 className="text-lg font-bold text-white mb-2">{trend.field}</h4>
                        <p className="text-white/80 mb-3">
                          Projected <span className="font-bold text-green-400">{trend.growth}</span> through 2028
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {trend.skills.map((skill) => (
                            <span key={skill} className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Plan */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white flex items-center">
                    <Target className="w-5 h-5 mr-2 text-cyan-400" />
                    Action-Plan Blueprint
                  </h3>
                  <button 
                    onClick={() => toggleSection('actionPlan')}
                    className="text-white/70 hover:text-white"
                  >
                    {expandedSection === 'actionPlan' ? <ChevronUp /> : <ChevronDown />}
                  </button>
                </div>
                
                <div className={`${expandedSection === 'actionPlan' ? 'block' : 'hidden'} space-y-6`}>
                  <div className="space-y-4">
                    {careerSwitchData.actionPlan.map((step) => (
                      <div key={step.step} className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {step.step}
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-white mb-1">{step.action}</h4>
                          {step.duration && (
                            <p className="text-white/60 text-sm flex items-center mb-1">
                              <Clock className="w-4 h-4 mr-1" /> {step.duration}
                            </p>
                          )}
                          {step.resource && (
                            <p className="text-white/60 text-sm flex items-center">
                              <BookOpen className="w-4 h-4 mr-1" /> {step.resource}
                            </p>
                          )}
                          {step.platform && (
                            <p className="text-white/60 text-sm flex items-center">
                              <Users className="w-4 h-4 mr-1" /> {step.platform}
                            </p>
                          )}
                          {step.details && (
                            <p className="text-white/60 text-sm mt-1">{step.details}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Input Prompt */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 mb-8">
                <h3 className="text-lg font-bold text-white mb-3">Help me refine your recommendations</h3>
                <p className="text-white/80 mb-4">
                  Tell me your interests and strengths, and any industries you're curious about.
                </p>
                <div className="flex space-x-3">
                  <input 
                    type="text" 
                    placeholder="Type your response..." 
                    className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <button className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-lg font-medium">
                    Submit
                  </button>
                </div>
              </div>

              {/* Primary CTA */}
              <div className="text-center">
                <button className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-8 py-4 text-lg font-semibold rounded-lg hover:shadow-lg hover:shadow-pink-500/25 transition-all duration-300 inline-flex items-center">
                  Show Me Switch Plans
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </ProductLayout>
  );
};

export default CareerAnalyticsPage;