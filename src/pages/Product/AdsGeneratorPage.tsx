import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles, ArrowRight, Play, CheckCircle, Rocket,
  TrendingUp, Users, Clock, Lightbulb, Palette,
  Video, Target, BarChart3,Shield
} from 'lucide-react';

// Import your existing form components
import GoogleAdsForm from '../Ads/GoogleAds';
import MetaAdsGenerator from '../Ads/MetaAds';
import LinkedInAdsForm from '../Ads/LinkedInAds';
import YouTubeAdsForm from '../Ads/YouTubeAds';
const AdsGeneratorPage = () => {
  const [activeTab, setActiveTab] = useState('Google Ads');
  const [hoveredFeature, setHoveredFeature] = useState(null);

  // Tab configuration with your form components
  const tabs = [
    { name: 'Google Ads', component: <GoogleAdsForm /> },
    { name: 'Meta Ads', component: <MetaAdsGenerator/> },
    { name: 'LinkedIn Ads', component: <LinkedInAdsForm /> },
    { name: 'YouTube Ads', component: <YouTubeAdsForm /> },
  ];

  const features = [
    {
      icon: Sparkles,
      title: "Personalized Ad Copy",
      description: "Generate high-converting headlines and descriptions in 5 clicks. Create 3-5 variants per audience segment with tone and style controls.",
      color: "from-purple-500 to-pink-500",
      delay: 0.1
    },
    {
      icon: Palette,
      title: "Dynamic Banner Generation",
      description: "Auto-layout designs for Facebook, Instagram, LinkedIn with brand overlay. Social-media specs automatically optimized for each platform.",
      color: "from-blue-500 to-cyan-500",
      delay: 0.2
    },
    {
      icon: Video,
      title: "Automated Video Ads",
      description: "Template-driven 15-30s ads with music, transitions, and text overlays. Professional scenes and animations included.",
      color: "from-green-500 to-emerald-500",
      delay: 0.3
    },
    {
      icon: Target,
      title: "A/B Testing Assets",
      description: "Create and preview variants side-by-side. Auto-split tests with performance tracking and optimization suggestions.",
      color: "from-orange-500 to-red-500",
      delay: 0.4
    },
    {
      icon: BarChart3,
      title: "Performance Analytics",
      description: "Real-time insights on ad performance, engagement metrics, and conversion tracking across all platforms and campaigns.",
      color: "from-indigo-500 to-purple-500",
      delay: 0.5
    },
  ];

  const stats = [
    { label: "Ads Generated", value: "50K+", icon: Rocket },
    { label: "Average ROI Increase", value: "245%", icon: TrendingUp },
    { label: "Active Users", value: "2.5K+", icon: Users },
    { label: "Time Saved Weekly", value: "15hrs", icon: Clock },
  ];

  // Function to render active tab content
  const renderActiveTab = () => {
    const activeTabData = tabs.find(tab => tab.name === activeTab);
    return activeTabData ? activeTabData.component : (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Lightbulb className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Select a Platform</h3>
        <p className="text-gray-600">Choose an advertising platform to generate optimized ads</p>
      </div>
    );
  };

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
              AI-Powered Marketing Revolution
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600  bg-clip-text text-transparent mb-6 leading-tight">
              Create Stunning Ads
              <br />
              <span className="text-4xl md:text-6xl">in Minutes, Not Hours</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform your marketing with AI that generates high-converting ad copy, stunning visuals, and optimized campaigns across all major platforms.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600  text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center group"
              >
                Start Creating Now
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
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600  rounded-xl mb-3">
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
              Powerful Features for
              <span className="bg-gradient-to-r from-blue-600 to-purple-600  bg-clip-text text-transparent"> Modern Marketers</span>
          </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to create, test, and optimize high-performing ads across all major platforms
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
              Generate Ads for Every Platform
            </h2>
            <p className="text-xl text-gray-600">
              Optimized templates and AI generation for all major advertising platforms
            </p>
          </motion.div>

          <div className="bg-gray-50 rounded-2xl p-8">
            {/* Tab Navigation */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {tabs.map((tab) => (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeTab === tab.name
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>

            {/* Active Tab Content */}
            <div className="bg-white rounded-xl p-8 min-h-96">
              {renderActiveTab()}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600  relative overflow-hidden">
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
              Ready to Transform Your
              <br />
              <span className="bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
                Advertising Strategy?
              </span>
            </h2>
            
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Join hundreds of marketers creating better ads faster with AI. Start your free trial today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-purple-900 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center group"
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

            <div className="mt-8 flex items-center justify-center text-purple-200 text-sm">
              <CheckCircle className="w-4 h-4 mr-2" />
              Free 14-day trial • Cancel anytime • Setup in under 5 minutes
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AdsGeneratorPage;