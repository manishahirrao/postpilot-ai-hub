import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, Mic, Globe, BarChart, Zap, Target, Star, Users, Clock, Shield,
  Play, ChevronDown, Rocket, Lightbulb, ArrowRight, CheckCircle, TrendingUp,
  Calendar, MessageSquare, Headphones, Bot, Sparkles, Award
} from 'lucide-react';

const VoiceAgentPage = () => {
  const [activeTab, setActiveTab] = useState('Sales Calls');
  const [hoveredFeature, setHoveredFeature] = useState(null);

  const features = [
    {
      icon: Phone,
      title: "Lifelike Voice Technology",
      description: "Ultra-realistic AI voices with emotional intelligence. 11+ premium voices with natural conversation flow and background noise filtering.",
      color: "from-blue-500 to-cyan-500",
      delay: 0.1
    },
    {
      icon: Globe,
      title: "Multi-Language Support", 
      description: "Conduct conversations in 29+ languages with native pronunciation and cultural awareness. Real-time translation capabilities included.",
      color: "from-green-500 to-emerald-500",
      delay: 0.2
    },
    {
      icon: Mic,
      title: "Smart Call Routing",
      description: "Handle outbound sales and inbound inquiries with intelligent routing. Appointment scheduling and lead qualification automated.",
      color: "from-purple-500 to-pink-500",
      delay: 0.3
    },
    {
      icon: BarChart,
      title: "Real-Time Analytics",
      description: "Monitor call performance, conversion rates, and sentiment analysis. Live call monitoring with performance insights dashboard.",
      color: "from-orange-500 to-red-500",
      delay: 0.4
    },
    {
      icon: Bot,
      title: "Contextual AI",
      description: "Advanced natural language processing that understands intent, context, and emotional cues for human-like interactions.",
      color: "from-indigo-500 to-purple-500",
      delay: 0.5
    },
  ];

  const stats = [
    { label: "Calls Handled", value: "100K+", icon: Phone },
    { label: "Average Cost Reduction", value: "75%", icon: TrendingUp },
    { label: "Active Businesses", value: "500+", icon: Users },
    { label: "Uptime Guarantee", value: "99.9%", icon: Shield },
  ];

  const useCases = [
    {
      title: "Voice-Based Sales Outreach",
      description: "AI agents conduct initial sales calls and qualify leads automatically",
      industry: "Sales",
      challenge: "Sales team overwhelmed with unqualified cold calls",
      solution: "AI voice agents handle initial outreach and qualification",
      results: ["3x increase in qualified leads", "60% reduction in sales workload", "24/7 prospect engagement"],
      gradient: "from-blue-600 to-purple-600"
    },
    {
      title: "Automated Recruitment Screening",
      description: "Conduct initial candidate interviews and technical screenings",
      industry: "HR Tech",
      challenge: "Slow hiring process due to manual candidate screening",
      solution: "AI voice agents conduct structured interviews and assessments",
      results: ["80% faster screening", "50% reduction in hiring time", "Consistent interview process"],
      gradient: "from-green-600 to-blue-600"
    },
    {
      title: "Customer Support Calls",
      description: "Handle common inquiries and route complex issues to humans",
      industry: "Support",
      challenge: "High support ticket volume overwhelming human agents",
      solution: "AI handles routine queries and escalates complex issues",
      results: ["90% first-call resolution", "40% cost reduction", "24/7 availability"],
      gradient: "from-purple-600 to-pink-600"
    },
  ];

  const reviews = [
    {
      name: "Rajesh K.",
      role: "Sales Director",
      company: "TechFlow Solutions",
      content: "Our AI voice agents book 40% more qualified meetings than our human SDRs. Game changer!",
      rating: 5,
      avatar: "RK",
      color: "bg-blue-500"
    },
    {
      name: "Meera P.",
      role: "HR Manager",
      company: "StartupHub",
      content: "Cut our hiring time in half. The AI conducts better initial screenings than most humans.",
      rating: 5,
      avatar: "MP",
      color: "bg-green-500"
    },
    {
      name: "David L.",
      role: "Operations Head",
      company: "CustomerFirst",
      content: "Handles 80% of our support calls flawlessly. Customers can't tell it's AI.",
      rating: 5,
      avatar: "DL",
      color: "bg-purple-500"
    },
    {
      name: "Anita S.",
      role: "Founder",
      company: "ScaleUp Inc",
      content: "The ROI is incredible. Paying for itself within the first month of deployment.",
      rating: 5,
      avatar: "AS",
      color: "bg-pink-500"
    },
  ];

  const tabs = ['Sales Calls', 'Customer Support', 'Recruitment', 'Appointments'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
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
              <Phone className="w-4 h-4 mr-2" />
              AI Voice Technology Revolution
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6 leading-tight">
              Intelligent Voice Agents
              <br />
              <span className="text-4xl md:text-6xl">That Sound Human</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Deploy AI voice agents that handle sales calls, customer support, and recruitment screening with the nuance and empathy of your best human representatives.
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
                Listen to Demo
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
              Voice AI That Feels
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Completely Human</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced voice technology that handles complex conversations with emotional intelligence and cultural awareness
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

      {/* Tabs Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Voice Agents for Every Use Case
            </h2>
            <p className="text-xl text-gray-600">
              Specialized AI agents trained for different industries and conversation types
            </p>
          </motion.div>

          <div className="bg-gray-50 rounded-2xl p-8">
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

            <div className="bg-white rounded-xl p-8 min-h-96 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  {activeTab === 'Sales Calls' && <Phone className="w-8 h-8 text-white" />}
                  {activeTab === 'Customer Support' && <Headphones className="w-8 h-8 text-white" />}
                  {activeTab === 'Recruitment' && <Users className="w-8 h-8 text-white" />}
                  {activeTab === 'Appointments' && <Calendar className="w-8 h-8 text-white" />}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{activeTab} Agent</h3>
                <p className="text-gray-600">
                  {activeTab === 'Sales Calls' && "AI agents that conduct outbound sales calls, qualify leads, and book meetings"}
                  {activeTab === 'Customer Support' && "Handle customer inquiries, troubleshooting, and escalation with empathy"}
                  {activeTab === 'Recruitment' && "Screen candidates, conduct initial interviews, and assess qualifications"}
                  {activeTab === 'Appointments' && "Manage scheduling, confirmations, and rescheduling across multiple calendars"}
                </p>
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
              Voice AI Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              See how companies are scaling their voice operations while improving customer experiences
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
              Trusted by Forward-Thinking Companies
            </h2>
            <p className="text-xl text-gray-600">
              Join hundreds of businesses that have transformed their phone operations with AI
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
      <section className="py-20 px-4 bg-gradient-to-br from-blue-900 via-purple-800 to-indigo-900 relative overflow-hidden">
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
              Ready to Deploy Your
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                AI Voice Agents?
              </span>
            </h2>
            
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join hundreds of companies automating their phone operations with intelligent voice AI. Start your free trial today.
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
                <Phone className="mr-2 w-5 h-5" />
                Schedule Demo Call
              </motion.button>
            </div>
            
            <div className="mt-8 flex items-center justify-center text-blue-200 text-sm">
              <CheckCircle className="w-4 h-4 mr-2" />
              Free 14-day trial • No setup fees • 5-minute deployment
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default VoiceAgentPage;