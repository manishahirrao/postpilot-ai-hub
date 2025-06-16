import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageCircle, Brain, ArrowUpDown, BarChart3, Clock, Globe, Star, Sparkles, 
  ArrowRight, CheckCircle, TrendingUp, Users, Shield, Play, Lightbulb,
  Headphones, Zap, Target, Award, Heart, Rocket, Bot, Phone
} from 'lucide-react';

const SupportPage = () => {
  const [activeTab, setActiveTab] = useState('Chat Support');
  const [hoveredFeature, setHoveredFeature] = useState(null);

  const features = [
    {
      icon: MessageCircle,
      title: "24/7 AI Support",
      description: "Automatically answer common questions and reduce support ticket volume by 70%. Never leave customers waiting with intelligent responses.",
      color: "from-blue-500 to-cyan-500",
      delay: 0.1
    },
    {
      icon: Brain,
      title: "Smart Routing",
      description: "AI analyzes customer intent and routes complex issues to the right specialist agent. Context-aware routing for maximum efficiency.",
      color: "from-purple-500 to-pink-500",
      delay: 0.2
    },
    {
      icon: ArrowUpDown,
      title: "Seamless Escalation",
      description: "Escalates complex issues to human agents when needed, maintaining full context and conversation history for smooth handoffs.",
      color: "from-green-500 to-emerald-500",
      delay: 0.3
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Track AI performance, customer satisfaction metrics, and support trends in real-time with comprehensive reporting.",
      color: "from-orange-500 to-red-500",
      delay: 0.4
    },
    {
      icon: Clock,
      title: "Instant Responses",
      description: "AI provides immediate answers 24/7, reducing average response time by 90% and improving customer satisfaction scores.",
      color: "from-indigo-500 to-purple-500",
      delay: 0.5
    },
    {
      icon: Globe,
      title: "Multi-language Support",
      description: "Supports 50+ languages with natural conversation flow. Break down language barriers for global customer service.",
      color: "from-pink-500 to-rose-500",
      delay: 0.6
    }
  ];

  const stats = [
    { label: "Support Tickets Resolved", value: "1M+", icon: Headphones },
    { label: "Average Response Time", value: "< 2s", icon: Zap },
    { label: "Customer Satisfaction", value: "98%", icon: Heart },
    { label: "Cost Reduction", value: "75%", icon: TrendingUp },
  ];

  const useCases = [
    {
      title: "E-commerce Excellence",
      description: "Automated order tracking, returns, and product inquiries with 24/7 availability",
      industry: "E-commerce",
      challenge: "High volume of repetitive inquiries overwhelming support team",
      solution: "AI handles 80% of common queries with instant, accurate responses",
      results: ["70% reduction in support tickets", "95% customer satisfaction", "24/7 availability achieved"],
      gradient: "from-blue-600 to-purple-600"
    },
    {
      title: "SaaS Support Revolution",
      description: "Technical troubleshooting and user onboarding at scale",
      industry: "Software",
      challenge: "Complex technical issues requiring instant expert-level support",
      solution: "AI provides step-by-step troubleshooting with smart escalation",
      results: ["60% faster resolution", "40% fewer escalations", "Improved user retention"],
      gradient: "from-purple-600 to-pink-600"
    },
    {
      title: "Healthcare Communication",
      description: "Patient scheduling, information, and non-emergency guidance",
      industry: "Healthcare",
      challenge: "Managing patient inquiries while maintaining care quality",
      solution: "AI handles scheduling and basic inquiries, prioritizes urgent cases",
      results: ["85% appointment automation", "50% staff time saved", "Better patient experience"],
      gradient: "from-green-600 to-blue-600"
    },
  ];

  const reviews = [
    {
      name: "Sarah J.",
      role: "Support Manager",
      company: "TechSolutions",
      content: "Response times improved by 70% and customer satisfaction is at an all-time high. The AI handover is seamless!",
      rating: 5,
      avatar: "SJ",
      color: "bg-blue-500"
    },
    {
      name: "Michael C.",
      role: "Operations Director",
      company: "GlobalEcom",
      content: "Multilingual support has been a game-changer. We're supporting 12 languages with the same team size.",
      rating: 5,
      avatar: "MC",
      color: "bg-purple-500"
    },
    {
      name: "Emma R.",
      role: "VP Customer Experience",
      company: "SaaSStartup",
      content: "Analytics dashboard gives incredible visibility. We've reduced handle time by 40% with data insights.",
      rating: 5,
      avatar: "ER",
      color: "bg-green-500"
    },
    {
      name: "David L.",
      role: "Customer Success Lead",
      company: "FinanceApp",
      content: "The proactive support feature catches issues before customers even report them. Absolutely revolutionary!",
      rating: 5,
      avatar: "DL",
      color: "bg-orange-500"
    },
  ];

  const tabs = ['Chat Support', 'Email Support', 'Voice Support', 'Social Media'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
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
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-blue-700 text-sm font-medium mb-8">
              <Bot className="w-4 h-4 mr-2" />
              AI-Powered Customer Support Revolution
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6 leading-tight">
              24/7 AI Customer
              <br />
              <span className="text-4xl md:text-6xl">Support That Scales</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform your customer support with AI that understands, responds, and learns from every interaction to deliver exceptional experiences around the clock.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center group"
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
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl mb-3">
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
              Intelligent Support That
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Never Sleeps</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to deliver exceptional customer support while reducing costs and improving satisfaction
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
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center text-blue-600 font-medium">
                      Learn more <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      <video
        controls
        autoPlay
        muted
        loop
        className="w-full rounded-lg shadow-lg"
      >
        <source src="/chat.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Support Channels Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Support Across Every Channel
            </h2>
            <p className="text-xl text-gray-600">
              Unified AI support across chat, email, voice, and social media platforms
            </p>
          </motion.div>

          <div className="bg-gray-50 rounded-2xl p-8">
            {/* Tab Navigation */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeTab === tab
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-xl p-8 min-h-96 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  {activeTab === 'Chat Support' && <MessageCircle className="w-8 h-8 text-white" />}
                  {activeTab === 'Email Support' && <Target className="w-8 h-8 text-white" />}
                  {activeTab === 'Voice Support' && <Phone className="w-8 h-8 text-white" />}
                  {activeTab === 'Social Media' && <Globe className="w-8 h-8 text-white" />}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{activeTab} AI</h3>
                <p className="text-gray-600">Deliver exceptional {activeTab.toLowerCase()} experiences with intelligent automation</p>
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
              Success Stories Across Industries
            </h2>
            <p className="text-xl text-gray-600">
              See how businesses are transforming their customer support with AI
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                  <div className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full mb-4">
                    {useCase.industry}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {useCase.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {useCase.description}
                  </p>
                  
                  <div className="space-y-3">
                    {useCase.results.map((result, idx) => (
                      <div key={idx} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                        <span className="text-gray-700">{result}</span>
                      </div>
                    ))}
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
              Trusted by Support Teams Worldwide
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of companies delivering exceptional customer experiences
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
                
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        </div>
        
        <div className="container mx-auto max-w-4xl relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Customer Support?
              </span>
            </h2>
            
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join hundreds of companies delivering better support while reducing costs with AI. Start your free trial today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-blue-900 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center group"
              >
                Start Free Trial
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
            
            <div className="mt-8 flex items-center justify-center text-blue-200 text-sm">
              <CheckCircle className="w-4 h-4 mr-2" />
              Free 14-day trial • Cancel anytime • Setup in under 5 minutes
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default SupportPage;