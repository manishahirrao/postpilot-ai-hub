import React, { useState, useEffect } from 'react';
import { 
  Sparkles,
  Hash,
  Image as ImageIcon,
  Calendar,
  BarChart2,
  Send,
  Clock,
  MessageSquare,
  Award,
  TrendingUp,
  Mic2,
  Shield,
  Zap,
  Target,
  Eye,
  Users,
  Linkedin,
  ChevronRight,
  Play,
  RefreshCw,
  Copy,
  Download
} from 'lucide-react';

// 3D Glass Card Component
const GlassCard = ({ children, className = "", delay = 0, hover3D = true }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`
        relative group cursor-pointer
        transform-gpu transition-all duration-700 ease-out
        ${hover3D && isHovered ? 'scale-[1.02] -translate-y-2' : 'scale-100 translate-y-0'}
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

// Floating animation component
const FloatingElement = ({ children, delay = 0, amplitude = 20 }) => {
  return (
    <div 
      className="transform-gpu"
      style={{
        animation: `float 6s ease-in-out infinite`,
        animationDelay: `${delay}s`,
        '--amplitude': `${amplitude}px`
      }}
    >
      {children}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotateZ(0deg); }
          50% { transform: translateY(var(--amplitude)) rotateZ(2deg); }
        }
      `}</style>
    </div>
  );
};

// Typing animation component
const TypingText = ({ texts, speed = 100 }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const text = texts[currentTextIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setCurrentText(text.substring(0, currentText.length + 1));
        if (currentText === text) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setCurrentText(text.substring(0, currentText.length - 1));
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? speed / 2 : speed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentTextIndex, texts, speed]);

  return (
    <span className="inline-block">
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

const LinkedInContentPage = () => {
  const [activeTab, setActiveTab] = useState('composer');
  const [isGenerating, setIsGenerating] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setPostContent("🚀 Just discovered how AI is revolutionizing career development!\n\nAfter analyzing 10,000+ success stories, here's what separates top performers:\n\n✅ They leverage data-driven insights\n✅ They continuously upskill with AI tools\n✅ They build authentic professional networks\n\nThe future belongs to those who adapt. What's your next move?\n\n#CareerGrowth #AI #ProfessionalDevelopment #LinkedIn");
      setCharacterCount(380);
    }, 2000);
  };

  const features = [
    {
      icon: <Sparkles className="w-8 h-8 text-blue-500" />,
      title: "AI-Powered Writing",
      description: "Generate engaging LinkedIn posts in seconds with advanced AI that understands your voice.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Hash className="w-8 h-8 text-purple-500" />,
      title: "Trending Hashtags",
      description: "Get real-time hashtag suggestions to maximize your post reach and engagement.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <ImageIcon className="w-8 h-8 text-green-500" />,
      title: "Visual Suggestions",
      description: "AI-powered image recommendations that perfectly complement your content.",
      gradient: "from-green-500 to-teal-500"
    },
    {
      icon: <BarChart2 className="w-8 h-8 text-orange-500" />,
      title: "Performance Analytics",
      description: "Track engagement metrics and optimize your content strategy with data insights.",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  const trendingHashtags = [
    "#CareerGrowth", "#AIInnovation", "#TechJobs", "#DigitalTransformation", 
    "#ProfessionalDevelopment", "#Leadership", "#Entrepreneurship", "#Innovation"
  ];

  const samplePosts = [
    "Just completed my first AI-powered project review. The insights were mind-blowing! 🤖✨",
    "5 key lessons from transitioning to a remote-first career in 2024 📍",
    "Why every professional needs an AI strategy (and how to build one) 🚀"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
          style={{ 
            transform: `translate(${scrollY * 0.1}px, ${scrollY * 0.05}px) rotate(${scrollY * 0.1}deg)`,
            animation: 'pulse 8s ease-in-out infinite' 
          }}
        />
        <div 
          className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
          style={{ 
            transform: `translate(${scrollY * -0.1}px, ${scrollY * -0.03}px) rotate(${scrollY * -0.1}deg)`,
            animation: 'pulse 6s ease-in-out infinite reverse' 
          }}
        />
        
        {/* Social media icons floating */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute text-blue-400/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `socialFloat ${4 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          >
            <Linkedin className="w-6 h-6" />
          </div>
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          {/* Agent Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-full mb-8">
            <Linkedin className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-medium bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              LinkedIn Content Generator
            </span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-8">
            <span className="block bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent">
              Create Content That
            </span>
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Goes Viral
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/70 max-w-4xl mx-auto mb-12">
            AI-powered LinkedIn content that drives engagement, builds your personal brand, and amplifies your professional presence.
          </p>

          {/* Demo typing animation */}
          <div className="max-w-2xl mx-auto mb-12">
            <GlassCard hover3D={false}>
              <div className="text-left p-4">
                <div className="text-white/90 text-lg leading-relaxed">
                  <TypingText 
                    texts={samplePosts}
                    speed={50}
                  />
                </div>
              </div>
            </GlassCard>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl font-semibold text-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              <span className="relative flex items-center gap-2">
                Start Creating
                <Sparkles className="w-5 h-5 transform group-hover:rotate-12 transition-transform" />
              </span>
            </button>
            
            <button className="group px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl font-semibold text-lg transform transition-all duration-300 hover:scale-105 hover:bg-white/20">
              <span className="flex items-center gap-2">
                <Play className="w-5 h-5" />
                Watch Demo
              </span>
            </button>
          </div>

          {/* Success Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            {[
              { number: "300%", label: "Avg. Engagement Boost" },
              { number: "50K+", label: "Posts Generated" },
              { number: "2.4M", label: "Total Impressions" }
            ].map((stat, index) => (
              <FloatingElement key={index} delay={index * 0.2} amplitude={10}>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-sm text-white/60 mt-1">{stat.label}</div>
                </div>
              </FloatingElement>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-full mb-6">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium">Powerful Features</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Everything You Need for
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                LinkedIn Success
              </span>
            </h2>
            
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Professional-grade tools powered by AI to create content that resonates with your audience.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {features.map((feature, index) => (
              <GlassCard key={feature.title} delay={index * 100}>
                <div className="text-center space-y-4">
                  <div className={`mx-auto w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                  <p className="text-white/70 leading-relaxed">{feature.description}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Content Generator Interface */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Create Your Next
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Viral Post
              </span>
            </h2>
          </div>

          <GlassCard className="p-8">
            {/* Tab Navigation */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {[
                { id: 'composer', label: 'Content Creator', icon: Sparkles },
                { id: 'hashtags', label: 'Hashtag Research', icon: Hash },
                { id: 'analytics', label: 'Performance Insights', icon: BarChart2 },
                { id: 'scheduler', label: 'Post Scheduler', icon: Calendar }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeTab === tab.id 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                      : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <tab.icon className="w-5 h-5" />
                    {tab.label}
                  </div>
                </button>
              ))}
            </div>

            {/* Content Creator Tab */}
            {activeTab === 'composer' && (
              <div className="space-y-8">
                {/* Input Section */}
                <div className="space-y-4">
                  <label className="block text-xl font-bold text-white mb-2">
                    What's on your mind?
                  </label>
                  <div className="relative">
                    <textarea
                      placeholder="Describe your post idea, topic, or key message..."
                      className="w-full h-32 bg-white/5 border border-white/20 rounded-2xl px-6 py-4 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent backdrop-blur-sm resize-none"
                      defaultValue="I want to share insights about AI in career development"
                    />
                    <button 
                      onClick={handleGenerate}
                      disabled={isGenerating}
                      className="absolute bottom-4 right-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 disabled:opacity-50 flex items-center gap-2"
                    >
                      {isGenerating ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          Generate
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Generated Content */}
                {(postContent || isGenerating) && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-white">Generated Post</h3>
                      {postContent && (
                        <div className="flex gap-2">
                          <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                            <Copy className="w-4 h-4 text-white" />
                          </button>
                          <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                            <RefreshCw className="w-4 h-4 text-white" />
                          </button>
                        </div>
                      )}
                    </div>
                    
                    <div className="relative">
                      <div className="bg-gradient-to-r from-slate-900/50 to-slate-800/50 border border-white/10 rounded-2xl p-6 min-h-[200px]">
                        {isGenerating ? (
                          <div className="flex items-center justify-center h-full">
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                              <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                              <span className="ml-3 text-white/70">AI is crafting your content...</span>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <div className="text-white/90 whitespace-pre-line leading-relaxed">
                              {postContent}
                            </div>
                            
                            {/* Post Stats */}
                            <div className="flex items-center justify-between pt-4 border-t border-white/10">
                              <div className="flex items-center gap-6 text-sm text-white/60">
                                <div className="flex items-center gap-2">
                                  <MessageSquare className="w-4 h-4" />
                                  <span>{characterCount} characters</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Eye className="w-4 h-4" />
                                  <span>Est. 2.5K views</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <TrendingUp className="w-4 h-4" />
                                  <span>High engagement potential</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Hashtag Suggestions */}
                {postContent && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white">Recommended Hashtags</h3>
                    <div className="flex flex-wrap gap-2">
                      {trendingHashtags.slice(0, 6).map((hashtag, index) => (
                        <button
                          key={hashtag}
                          className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 border border-blue-500/30 rounded-full text-blue-300 hover:text-blue-200 transition-all duration-300 text-sm"
                        >
                          {hashtag}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Publishing Options */}
                {postContent && (
                  <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-white/10">
                    <button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 flex items-center justify-center gap-2">
                      <Send className="w-5 h-5" />
                      Publish Now
                    </button>
                    <button className="flex-1 bg-white/10 backdrop-blur-xl border border-white/20 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Schedule Post
                    </button>
                    <button className="bg-white/10 backdrop-blur-xl border border-white/20 text-white px-6 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2">
                      <Download className="w-5 h-5" />
                      Export
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Other tabs content placeholder */}
            {activeTab !== 'composer' && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🚧</div>
                <h3 className="text-2xl font-bold text-white mb-2">Coming Soon</h3>
                <p className="text-white/70">This feature is under development and will be available soon!</p>
              </div>
            )}
          </GlassCard>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Proven Results from
              </span>
              <br />
              <span className="bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
                AI-Generated Content
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                metric: "2.4x", 
                label: "More Profile Views", 
                description: "Users who post AI-generated content weekly",
                color: "from-blue-500 to-cyan-500" 
              },
              { 
                metric: "68%", 
                label: "Higher Engagement", 
                description: "On AI-optimized posts vs manual posts",
                color: "from-purple-500 to-pink-500" 
              },
              { 
                metric: "5.7x", 
                label: "More Connections", 
                description: "For active AI content creators",
                color: "from-green-500 to-teal-500" 
              }
            ].map((stat, index) => (
              <GlassCard key={stat.label} delay={index * 200}>
                <div className="text-center space-y-4">
                  <div className={`text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                    {stat.metric}
                  </div>
                  <h3 className="text-xl font-bold text-white">{stat.label}</h3>
                  <p className="text-white/70">{stat.description}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        
        @keyframes socialFloat {
          0%, 100% { transform: translateY(0px) rotateZ(0deg); }
          50% { transform: translateY(-30px) rotateZ(5deg); }
        }
        
      `}</style>
    </div>
  );
};

export default LinkedInContentPage;