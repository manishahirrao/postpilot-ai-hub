import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Workflow, Zap, Shield, BarChart, Star, ArrowRight, Play, CheckCircle, 
  Users, Clock, TrendingUp, Sparkles, Target, Lightbulb, Rocket 
} from 'lucide-react';

const AutomationsPage = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [activeUseCase, setActiveUseCase] = useState(0);
  const [hoveredFeature, setHoveredFeature] = useState(null);

  const features = [
    {
      icon: Workflow,
      title: "Visual Workflow Builder",
      description: "Drag-and-drop interface to create complex automations without coding. Connect any app to any other app with ease.",
      color: "from-purple-500 to-pink-500",
      delay: 0.1
    },
    {
      icon: Zap,
      title: "Lightning-Fast Execution",
      description: "Execute thousands of workflows simultaneously with sub-second response times.",
      color: "from-yellow-500 to-orange-500",
      delay: 0.2
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "SOC 2 compliant with end-to-end encryption. Your data is safe and secure at all times.",
      color: "from-green-500 to-emerald-500",
      delay: 0.3
    },
    {
      icon: BarChart,
      title: "Analytics & Insights",
      description: "Track automation performance and optimize workflows with detailed analytics.",
      color: "from-blue-500 to-cyan-500",
      delay: 0.4
    },
    {
      icon: Sparkles,
      title: "AI-Powered Optimization",
      description: "AI suggests improvements to your workflows and automates repetitive tasks.",
      color: "from-indigo-500 to-purple-500",
      delay: 0.5
    }
  ];

  const useCases = [
    {
      title: "Automated LinkedIn Publishing",
      description: "Schedule and publish content across multiple LinkedIn profiles automatically.",
      industry: "Marketing",
      challenge: "Marketing team spends 10+ hours weekly manually posting content across different LinkedIn accounts and tracking engagement.",
      solution: "AI-powered automation handles content scheduling, posting, and analytics collection across multiple profiles.",
      results: [
        "90% reduction in manual posting time",
        "3x increase in content consistency",
        "40% improvement in engagement rates",
        "Real-time analytics and reporting"
      ],
      icon: "📱",
      gradient: "from-purple-600 to-blue-600"
    },
    {
      title: "CRM Lead Synchronization",
      description: "Automatically sync leads between multiple platforms and trigger personalized email campaigns.",
      industry: "Sales",
      challenge: "Sales team loses potential leads due to manual data entry delays and inconsistent follow-up processes.",
      solution: "Real-time lead sync between CRM, email platforms, and lead generation tools with automated nurturing sequences.",
      results: [
        "50% faster lead response time",
        "95% reduction in data entry errors",
        "30% increase in conversion rates",
        "Automated lead scoring and routing"
      ],
      icon: "🎯",
      gradient: "from-pink-600 to-purple-600"
    },
    {
      title: "Job Posting Automation",
      description: "Automatically post job openings across 20+ job boards from a single form submission.",
      industry: "HR Tech",
      challenge: "HR teams spend hours manually posting jobs across different platforms, leading to delayed recruitment and missed opportunities.",
      solution: "Automated job distribution system that formats and posts to multiple job boards, tracks applications, and sends notifications.",
      results: [
        "80% reduction in posting time",
        "3x increase in application volume",
        "Consistent job descriptions across platforms",
        "Automated candidate tracking"
      ],
      icon: "💼",
      gradient: "from-blue-600 to-indigo-600"
    },
    {
      title: "E-commerce Order Processing",
      description: "Streamline order fulfillment from payment to shipping with multi-platform integration.",
      industry: "E-commerce",
      challenge: "Manual order processing leads to shipping delays, inventory discrepancies, and customer service issues.",
      solution: "End-to-end automation connecting payment processing, inventory management, shipping, and customer notifications.",
      results: [
        "70% faster order processing",
        "99% inventory accuracy",
        "50% reduction in customer inquiries",
        "Automated shipping and tracking"
      ],
      icon: "🛒",
      gradient: "from-orange-600 to-red-600"
    }
  ];

  const reviews = [
    {
      name: "Sarah Johnson",
      role: "Marketing Director",
      company: "TechGrowth Inc.",
      content: "This automation platform transformed our marketing operations. What used to take 15 hours per week now happens automatically, and we've seen a 40% increase in engagement.",
      rating: 5,
      date: "May 2024",
      avatar: "SJ",
      color: "bg-purple-500"
    },
    {
      name: "Michael Chen",
      role: "Operations Manager",
      company: "Global Logistics Co.",
      content: "The visual workflow builder is incredibly intuitive. We automated our entire order fulfillment process in just 2 days, reducing errors by 95%.",
      rating: 5,
      date: "April 2024",
      avatar: "MC",
      color: "bg-blue-500"
    },
    {
      name: "Emily Rodriguez",
      role: "HR Director",
      company: "TalentFirst Solutions",
      content: "Automating our job postings saved us 80% of the time we used to spend. The multi-platform posting feature alone was worth the investment.",
      rating: 4,
      date: "March 2024",
      avatar: "ER",
      color: "bg-pink-500"
    },
    {
      name: "David Wilson",
      role: "Sales VP",
      company: "RevenueBoost LLC",
      content: "Our lead response time improved dramatically thanks to the CRM automation. The real-time sync between platforms is flawless.",
      rating: 5,
      date: "February 2024",
      avatar: "DW",
      color: "bg-green-500"
    }
  ];

  const stats = [
    { label: "Active Workflows", value: "50K+", icon: Workflow },
    { label: "Hours Saved Daily", value: "100K+", icon: Clock },
    { label: "Happy Customers", value: "2,500+", icon: Users },
    { label: "Success Rate", value: "99.9%", icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full text-purple-700 text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4 mr-2" />
              Trusted by 2,500+ companies worldwide
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent mb-6 leading-tight">
              Automate Every
              <br />
              <span className="text-4xl md:text-6xl">Workflow</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Drag-and-drop integrations, 400+ connectors, infinite possibilities
            </p>
            
            <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
              Transform your business operations with powerful automation workflows that connect your favorite tools and eliminate manual tasks forever.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center group"
              >
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl shadow-lg hover:shadow-xl border border-gray-200 transition-all duration-300 flex items-center"
              >
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </motion.button>
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl mb-3">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Everything You Need to
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> Automate</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Build sophisticated workflows without writing a single line of code. Our platform handles the complexity so you can focus on results.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: feature.delay }}
                onHoverStart={() => setHoveredFeature(index)}
                onHoverEnd={() => setHoveredFeature(null)}
                className="group"
              >
                <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-gray-200 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center text-purple-600 font-medium">
                      Learn more <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Integration Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Connect Every Tool in Your Stack
            </h2>
            <p className="text-xl text-gray-600">
              400+ integrations with your favorite apps and services
            </p>
          </motion.div>

          <div className="bg-gray-50 rounded-2xl p-8">
            <div className="bg-white rounded-xl p-8 min-h-96 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Workflow className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Visual Workflow Builder</h3>
                <p className="text-gray-600">Drag, drop, and connect your favorite tools with our intuitive interface</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Real-World Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              See how companies are saving time, reducing errors, and scaling their operations with PostPilot Automation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
              >
                <div className={`h-2 bg-gradient-to-r ${useCase.gradient}`}></div>
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="text-3xl mr-4">{useCase.icon}</div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{useCase.title}</h3>
                      <span className="text-sm text-purple-600 font-medium bg-purple-50 px-3 py-1 rounded-full">
                        {useCase.industry}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">{useCase.description}</p>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-red-600 mb-2">Challenge:</h4>
                      <p className="text-sm text-gray-600">{useCase.challenge}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-blue-600 mb-2">Solution:</h4>
                      <p className="text-sm text-gray-600">{useCase.solution}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-green-600 mb-2">Results:</h4>
                      <div className="space-y-2">
                        {useCase.results.map((result, i) => (
                          <div key={i} className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                            <span className="text-sm text-gray-600">{result}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted by Thousands of Teams
            </h2>
            <p className="text-xl text-gray-600">
              See what our customers say about automating their workflows
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 ${review.color} rounded-full flex items-center justify-center text-white font-bold mr-4`}>
                    {review.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{review.name}</h4>
                    <p className="text-sm text-gray-600">{review.role}</p>
                    <p className="text-xs text-gray-500">{review.company}</p>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4 leading-relaxed">
                  "{review.content}"
                </p>
                
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                
                <p className="text-xs text-gray-400">{review.date}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20"></div>
        </div>
        
        <div className="container mx-auto max-w-4xl relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Automate Your
              <br />
              <span className="bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
                Workflows?
              </span>
            </h2>
            
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Join thousands of companies saving 20+ hours per week with intelligent automation.
            </p>
            
            <div className="max-w-md mx-auto space-y-4 mb-8">
              <input 
                type="email" 
                placeholder="Enter your email address"
                className="w-full px-6 py-4 rounded-xl text-gray-900 bg-white/95 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-white/50 transition-all duration-300"
              />
              <textarea 
                placeholder="Describe your current manual processes and what you'd like to automate..."
                className="w-full px-6 py-4 rounded-xl text-gray-900 bg-white/95 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-white/50 transition-all duration-300 resize-none"
                rows={4}
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-purple-900 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center group"
              >
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-8 py-4 bg-transparent text-white font-semibold rounded-xl border-2 border-white/30 hover:border-white/50 hover:bg-white/10 transition-all duration-300 flex items-center"
              >
                <Shield className="mr-2 w-5 h-5" />
                No Credit Card Required
              </motion.button>
            </div>
            
            <div className="mt-8 flex items-center justify-center text-purple-200 text-sm">
              <CheckCircle className="w-4 h-4 mr-2" />
              Free 14-day trial • Cancel anytime • Setup in under 5 minutes
            </div>
          </motion.div>
        </div>
      </section>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default AutomationsPage;