import React, { useState, useEffect } from 'react';
import AnimatedAgentIcon from '@/components/Logo/logo';
import { 
  ChevronRight,
  Rocket, 
  FileText, 
  Mic, 
  Linkedin, 
  BarChart3,
  Target,
  Play,
  Star,
  CheckCircle,
  Sparkles,
  ArrowRight,
  Zap,
  Shield,
  TrendingUp
} from 'lucide-react';

const AgentOSLogo = ({ size = 'md' }) => {
  const sizeMap = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <svg 
      viewBox="0 0 110 110" 
      xmlns="http://www.w3.org/2000/svg"
      className={sizeMap[size]}
    >
      <defs>
        <linearGradient id="primaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#0066ff', stopOpacity: 1 }} />
          <stop offset="35%" style={{ stopColor: '#00d4ff', stopOpacity: 1 }} />
          <stop offset="65%" style={{ stopColor: '#7c3aed', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#ec4899', stopOpacity: 1 }} />
        </linearGradient>
        <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 0.9 }} />
          <stop offset="70%" style={{ stopColor: '#00d4ff', stopOpacity: 0.6 }} />
          <stop offset="100%" style={{ stopColor: '#0066ff', stopOpacity: 0.3 }} />
        </radialGradient>
        <filter id="advancedGlow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <circle cx="55" cy="55" r="45" fill="none" stroke="url(#primaryGradient)" strokeWidth="3" opacity="0.4"/>
      <circle cx="55" cy="55" r="35" fill="none" stroke="url(#primaryGradient)" strokeWidth="2" opacity="0.6"/>
      <circle cx="55" cy="55" r="20" fill="url(#coreGlow)" filter="url(#advancedGlow)"/>
      <g opacity="0.9">
        <circle cx="35" cy="35" r="6" fill="url(#primaryGradient)">
          <animate attributeName="r" values="6;8;6" dur="3s" repeatCount="indefinite"/>
        </circle>
        <circle cx="75" cy="35" r="6" fill="url(#primaryGradient)">
          <animate attributeName="r" values="6;8;6" dur="3s" begin="1s" repeatCount="indefinite"/>
        </circle>
        <circle cx="35" cy="75" r="6" fill="url(#primaryGradient)">
          <animate attributeName="r" values="6;8;6" dur="3s" begin="2s" repeatCount="indefinite"/>
        </circle>
        <circle cx="75" cy="75" r="6" fill="url(#primaryGradient)">
          <animate attributeName="r" values="6;8;6" dur="3s" begin="0.5s" repeatCount="indefinite"/>
        </circle>
      </g>
      <circle cx="55" cy="55" r="8" fill="white" opacity="0.9"/>
      <circle cx="55" cy="55" r="4" fill="url(#primaryGradient)">
        <animate attributeName="r" values="4;6;4" dur="1.5s" repeatCount="indefinite"/>
      </circle>
    </svg>
  );
};

// 3D Card Component
const Card3D = ({ children, className = "", delay = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`
        relative group cursor-pointer
        transform-gpu transition-all duration-700 ease-out
        ${isHovered ? 'scale-105 -translate-y-2' : 'scale-100 translate-y-0'}
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
        bg-gradient-to-br from-white/10 to-white/5
        backdrop-blur-xl border border-white/20
        rounded-2xl overflow-hidden
        transform-gpu transition-all duration-700
        ${isHovered ? 'rotateX-2 rotateY-2' : 'rotateX-0 rotateY-0'}
        before:absolute before:inset-0 before:bg-gradient-to-br before:from-blue-500/10 before:to-purple-500/10 before:opacity-0 before:transition-opacity before:duration-500
        ${isHovered ? 'before:opacity-100' : 'before:opacity-0'}
      `}>
        {/* Animated border gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Glass reflection effect */}
        <div className={`
          absolute top-0 left-0 w-full h-1/2 
          bg-gradient-to-b from-white/10 to-transparent 
          opacity-0 transition-opacity duration-500
          ${isHovered ? 'opacity-100' : 'opacity-0'}
        `} />
        
        <div className="relative z-10 p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

// Floating Animation Component
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

const HomePage = () => {
  const [mounted, setMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: BarChart3,
      title: "Career Analytics & Tips",
      description: "Get instant benchmarks and personalized roadmaps to guide your career journey with AI-powered insights.",
      gradient: "from-blue-500 to-cyan-500",
      delay: 0
    },
    {
      icon: Target,
      title: "Job Finder & Applier",
      description: "Utilize AI-powered search and match-scoring to find and apply for your dream job automatically.",
      gradient: "from-purple-500 to-pink-500",
      delay: 100
    },
    {
      icon: FileText,
      title: "Resume & CV Builder",
      description: "Create custom, ATS-optimized resumes and CVs in minutes with professional templates.",
      gradient: "from-green-500 to-teal-500",
      delay: 200
    },
    {
      icon: Mic,
      title: "Mock Interviews",
      description: "Practice with AI-simulated behavioral and technical interviews to build unshakeable confidence.",
      gradient: "from-orange-500 to-red-500",
      delay: 300
    },
    {
      icon: Linkedin,
      title: "LinkedIn Content Generator",
      description: "Generate viral posts and articles, then schedule them directly to maximize your reach.",
      gradient: "from-indigo-500 to-blue-500",
      delay: 400
    },
    {
      icon: Rocket,
      title: "Unified AI Interface",
      description: "Manage all your career-building activities from a single, intuitive conversational interface.",
      gradient: "from-violet-500 to-purple-500",
      delay: 500
    },
  ];

  const testimonials = [
    {
      quote: "I landed my dream job in 2 weeks—thanks to the Job Finder Agent! The AI made the search process incredibly efficient and targeted.",
      author: "Priya M.",
      role: "Software Engineer",
      avatar: "🚀"
    },
    {
      quote: "The mock interviews were a complete game-changer. I walked into my Google interview with bulletproof confidence.",
      author: "Rahul S.",
      role: "Product Manager", 
      avatar: "💼"
    },
    {
      quote: "My LinkedIn engagement skyrocketed 300% using the Content Generator. It's like having a personal marketing genius.",
      author: "Anita K.",
      role: "Marketing Director",
      avatar: "📈"
    },
  ];

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
          style={{ 
            transform: `translate(${scrollY * 0.1}px, ${scrollY * 0.05}px)`,
            animation: 'pulse 8s ease-in-out infinite' 
          }}
        />
        <div 
          className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-pink-500/20 to-orange-500/20 rounded-full blur-3xl"
          style={{ 
            transform: `translate(${scrollY * -0.1}px, ${scrollY * -0.03}px)`,
            animation: 'pulse 6s ease-in-out infinite reverse' 
          }}
        />
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          {/* Logo and Badge */}
          <div className="flex flex-col items-center mb-8">
            <FloatingElement delay={0} amplitude={15}>
              <AnimatedAgentIcon size="lg" />
            </FloatingElement>
            
            <div className="mt-6 px-6 py-3 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-full">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-medium bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  AI-Powered Career Platform
                </span>
              </div>
            </div>
          </div>

          {/* Main Heading */}
          <div className="space-y-6 mb-8">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="block">Supercharge Your</span>
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Career with AI
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed">
              Our suite of intelligent agents analyzes, optimizes, and propels your professional journey—all from one revolutionary platform.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl font-semibold text-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              <span className="relative flex items-center gap-2">
                Get Started Free
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            
            <button className="group px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl font-semibold text-lg transform transition-all duration-300 hover:scale-105 hover:bg-white/20">
              <span className="flex items-center gap-2">
                <Play className="w-5 h-5" />
                Watch Demo
              </span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            {[
              { number: "50K+", label: "Active Users" },
              { number: "2.4x", label: "Faster Job Search" },
              { number: "95%", label: "Success Rate" }
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
              <span className="text-sm font-medium">Powerful AI Agents</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Everything You Need to
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Dominate Your Career
              </span>
            </h2>
            
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Six specialized AI agents working together to accelerate every aspect of your professional growth.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card3D key={feature.title} delay={feature.delay}>
                <div className="flex items-start gap-4 mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${feature.gradient} shadow-lg`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-white/70 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center text-sm text-white/50 group-hover:text-white/80 transition-colors">
                  <span>Learn more</span>
                  <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Card3D>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-full mb-6">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium">Success Stories</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Loved by Professionals
              </span>
              <br />
              <span className="bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
                Worldwide
              </span>
            </h2>
            
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Real stories from users who have transformed their careers with our AI platform.
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card3D key={testimonial.author} delay={index * 200}>
                <div className="space-y-4">
                  {/* Stars */}
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  {/* Quote */}
                  <blockquote className="text-white/90 text-lg leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                  
                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-2xl">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{testimonial.author}</div>
                      <div className="text-sm text-white/60">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </Card3D>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card3D className="p-8 md:p-16 text-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold">
                  <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                    Ready to
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Accelerate Your Career?
                  </span>
                </h2>
                
                <p className="text-xl text-white/70 max-w-2xl mx-auto">
                  Join thousands of professionals who are taking control of their careers with AI-driven insights and tools.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl font-semibold text-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  <span className="relative flex items-center gap-2">
                    Start Your Free Trial
                    <CheckCircle className="w-5 h-5" />
                  </span>
                </button>
                
                <button className="px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl font-semibold text-lg transform transition-all duration-300 hover:scale-105 hover:bg-white/20">
                  Schedule Demo
                </button>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center justify-center gap-8 pt-8 text-sm text-white/50">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span>Enterprise Security</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>95% Success Rate</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>14-Day Free Trial</span>
                </div>
              </div>
            </div>
          </Card3D>
        </div>
      </section>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotateZ(0deg); }
          50% { transform: translateY(-20px) rotateZ(2deg); }
        }
      `}</style>
    </div>
  );
};

export default HomePage;