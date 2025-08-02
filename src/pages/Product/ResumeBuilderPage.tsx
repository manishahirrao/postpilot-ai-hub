import React, { useState, useEffect } from 'react';
import { 
  FileText,
  Download,
  LayoutTemplate,
  Search,
  Plus,
  Languages,
  Mail,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Sparkles,
  Award,
  Zap,
  UserCheck,
  Briefcase,
  Target,
  Star,
  Eye,
  TrendingUp,
  Brain,
  Rocket,
  Shield,
  Clock,
  Globe
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
        ${hover3D && isHovered ? 'rotateX-2 rotateY-2' : 'rotateX-0 rotateY-0'}
        shadow-2xl shadow-black/20
      `}>
        {/* Animated gradient border */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-teal-500/20 to-blue-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
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

// Template Card with 3D preview
const TemplateCard = ({ template, isActive, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`
        relative group cursor-pointer
        transform-gpu transition-all duration-500
        ${isActive ? 'scale-105 -translate-y-1' : 'scale-100 translate-y-0'}
      `}
      style={{ perspective: '1000px' }}
    >
      <div className={`
        relative w-full h-64
        bg-gradient-to-br ${template.gradient} 
        rounded-2xl overflow-hidden
        transform-gpu transition-all duration-500
        ${isActive ? 'rotateX-5 rotateY-5' : 'rotateX-0 rotateY-0'}
        shadow-2xl
        ${isActive ? 'shadow-emerald-500/25' : 'shadow-black/20'}
      `}>
        {/* Template preview content */}
        <div className="absolute inset-0 p-6 text-white">
          <div className="space-y-4">
            <div className="h-3 bg-white/80 rounded w-3/4" />
            <div className="h-2 bg-white/60 rounded w-1/2" />
            <div className="space-y-2 mt-6">
              <div className="h-2 bg-white/40 rounded w-full" />
              <div className="h-2 bg-white/40 rounded w-5/6" />
              <div className="h-2 bg-white/40 rounded w-4/6" />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="space-y-1">
                <div className="h-1.5 bg-white/40 rounded w-full" />
                <div className="h-1.5 bg-white/40 rounded w-3/4" />
              </div>
              <div className="space-y-1">
                <div className="h-1.5 bg-white/40 rounded w-full" />
                <div className="h-1.5 bg-white/40 rounded w-2/3" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Template name overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <h3 className="text-white font-bold text-lg">{template.name}</h3>
          <p className="text-white/80 text-sm">{template.description}</p>
        </div>
        
        {/* Active indicator */}
        {isActive && (
          <div className="absolute top-4 right-4">
            <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-white" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Progress indicator
const ProgressStep = ({ step, currentStep, label, icon: Icon }) => {
  const isCompleted = step < currentStep;
  const isActive = step === currentStep;
  
  return (
    <div className="flex items-center">
      <div className={`
        w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300
        ${isCompleted ? 'bg-gradient-to-r from-green-500 to-teal-500' : 
          isActive ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 
          'bg-white/10 border border-white/20'}
      `}>
        {isCompleted ? (
          <CheckCircle className="w-6 h-6 text-white" />
        ) : (
          <Icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-white/60'}`} />
        )}
      </div>
      <span className={`ml-3 font-medium ${isActive ? 'text-white' : 'text-white/60'}`}>
        {label}
      </span>
    </div>
  );
};

const ResumePage = () => {
  const [activeSection, setActiveSection] = useState('templates');
  const [currentTemplate, setCurrentTemplate] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const templates = [
    {
      name: "Executive Pro",
      description: "Perfect for senior roles",
      gradient: "from-blue-600 to-indigo-700"
    },
    {
      name: "Creative Edge",
      description: "Showcase your creativity",
      gradient: "from-purple-600 to-pink-600"
    },
    {
      name: "Tech Modern",
      description: "Clean and technical",
      gradient: "from-green-600 to-teal-600"
    },
    {
      name: "Classic Pro",
      description: "Timeless professional",
      gradient: "from-amber-600 to-orange-600"
    },
    {
      name: "Minimalist",
      description: "Simple and elegant",
      gradient: "from-gray-600 to-slate-700"
    },
    {
      name: "Bold Impact",
      description: "Make a statement",
      gradient: "from-red-600 to-rose-600"
    }
  ];

  const steps = [
    { step: 1, label: "Choose Template", icon: LayoutTemplate },
    { step: 2, label: "Add Content", icon: FileText },
    { step: 3, label: "Optimize ATS", icon: Search },
    { step: 4, label: "Download", icon: Download }
  ];

  const nextTemplate = () => {
    setCurrentTemplate((prev) => (prev + 1) % templates.length);
  };

  const prevTemplate = () => {
    setCurrentTemplate((prev) => (prev - 1 + templates.length) % templates.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-full blur-3xl"
          style={{ 
            transform: `translate(${scrollY * 0.1}px, ${scrollY * 0.05}px) rotate(${scrollY * 0.1}deg)`,
            animation: 'pulse 8s ease-in-out infinite' 
          }}
        />
        <div 
          className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
          style={{ 
            transform: `translate(${scrollY * -0.1}px, ${scrollY * -0.03}px) rotate(${scrollY * -0.1}deg)`,
            animation: 'pulse 6s ease-in-out infinite reverse' 
          }}
        />
        
        {/* Floating document icons */}
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute text-green-400/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `docFloat ${4 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          >
            <FileText className="w-6 h-6" />
          </div>
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          {/* Agent Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-full mb-8">
            <Brain className="w-5 h-5 text-green-400" />
            <span className="text-sm font-medium bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
              AI Resume Builder
            </span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-8">
            <span className="block bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent">
              Craft Resumes That
            </span>
            <span className="block bg-gradient-to-r from-green-400 via-teal-400 to-blue-400 bg-clip-text text-transparent">
              Recruiters Love
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/70 max-w-4xl mx-auto mb-12">
            ATS-optimized, professionally designed resumes tailored to your target role. Built by AI, perfected by you.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl font-semibold text-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/25">
              <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-teal-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              <span className="relative flex items-center gap-2">
                Build My Resume
                <Rocket className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            
            <button className="group px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl font-semibold text-lg transform transition-all duration-300 hover:scale-105 hover:bg-white/20">
              <span className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Preview Templates
              </span>
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            {[
              { icon: Shield, label: "ATS Compatible", desc: "98% pass rate" },
              { icon: Clock, label: "5 Min Setup", desc: "Average build time" },
              { icon: Globe, label: "500K+ Users", desc: "Worldwide" }
            ].map((item, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-xl mb-2">
                  <item.icon className="w-6 h-6 text-green-400" />
                </div>
                <div className="text-sm font-medium text-white">{item.label}</div>
                <div className="text-xs text-white/60">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <GlassCard hover3D={false}>
            <div className="flex justify-between items-center">
              {steps.map((step, index) => (
                <div key={step.step} className="flex items-center">
                  <ProgressStep 
                    step={step.step} 
                    currentStep={currentStep} 
                    label={step.label} 
                    icon={step.icon} 
                  />
                  {index < steps.length - 1 && (
                    <div className="w-16 h-px bg-white/20 mx-4" />
                  )}
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Builder Interface */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Navigation */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {[
              { id: 'templates', label: 'Templates', icon: LayoutTemplate },
              { id: 'optimization', label: 'ATS Optimization', icon: Search },
              { id: 'sections', label: 'Custom Sections', icon: Plus },
              { id: 'export', label: 'Export Options', icon: Download }
            ].map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeSection === section.id 
                    ? 'bg-gradient-to-r from-green-500 to-teal-600 text-white shadow-lg' 
                    : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-2">
                  <section.icon className="w-5 h-5" />
                  {section.label}
                </div>
              </button>
            ))}
          </div>

          {/* Templates Section */}
          {activeSection === 'templates' && (
            <div className="space-y-12">
              <GlassCard delay={100}>
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white mb-4">
                    Choose Your Professional Template
                  </h2>
                  <p className="text-white/70 text-lg">
                    20+ professionally designed templates optimized for different industries and roles.
                  </p>
                </div>

                {/* Template Carousel */}
                <div className="relative">
                  <div className="flex items-center justify-between mb-6">
                    <button 
                      onClick={prevTemplate}
                      className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                    >
                      <ChevronLeft className="w-6 h-6 text-white" />
                    </button>
                    
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-white">{templates[currentTemplate].name}</h3>
                      <p className="text-white/60">{templates[currentTemplate].description}</p>
                    </div>
                    
                    <button 
                      onClick={nextTemplate}
                      className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                    >
                      <ChevronRight className="w-6 h-6 text-white" />
                    </button>
                  </div>

                  {/* Main template display */}
                  <div className="grid md:grid-cols-3 gap-6 items-center">
                    <TemplateCard 
                      template={templates[(currentTemplate - 1 + templates.length) % templates.length]}
                      isActive={false}
                      onClick={prevTemplate}
                    />
                    <TemplateCard 
                      template={templates[currentTemplate]}
                      isActive={true}
                      onClick={() => {}}
                    />
                    <TemplateCard 
                      template={templates[(currentTemplate + 1) % templates.length]}
                      isActive={false}
                      onClick={nextTemplate}
                    />
                  </div>

                  {/* Template indicators */}
                  <div className="flex justify-center mt-8 gap-2">
                    {templates.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentTemplate(index)}
                        className={`w-3 h-3 rounded-full transition-all ${
                          index === currentTemplate ? 'bg-green-400' : 'bg-white/30'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </GlassCard>
            </div>
          )}

          {/* ATS Optimization Section */}
          {activeSection === 'optimization' && (
            <div className="space-y-8">
              <GlassCard delay={100}>
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-6">
                    <h2 className="text-3xl font-bold text-white">
                      <span className="bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
                        AI-Powered ATS Optimization
                      </span>
                    </h2>
                    
                    <p className="text-white/80 text-lg leading-relaxed">
                      Our AI analyzes job descriptions and optimizes your resume with the right keywords to pass Applicant Tracking Systems.
                    </p>
                    
                    <div className="space-y-4">
                      {[
                        "Smart keyword extraction from job descriptions",
                        "Real-time ATS compatibility scoring",
                        "Industry-specific optimization suggestions",
                        "Format optimization for maximum readability"
                      ].map((feature, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                          <span className="text-white/90">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="bg-gradient-to-br from-green-900/30 to-teal-900/30 rounded-2xl border border-green-500/20 p-8">
                      <div className="text-center space-y-4">
                        <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-teal-400 rounded-full flex items-center justify-center mx-auto">
                          <span className="text-3xl font-bold text-white">98%</span>
                        </div>
                        <h3 className="text-xl font-bold text-white">ATS Pass Rate</h3>
                        <p className="text-white/70">Industry-leading compatibility score</p>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>

              {/* ATS Score Demo */}
              <GlassCard delay={200}>
                <h3 className="text-2xl font-bold text-white mb-6">Live ATS Score Analysis</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { metric: "Keyword Match", score: 92, color: "green" },
                    { metric: "Format Score", score: 96, color: "blue" }, 
                    { metric: "Readability", score: 89, color: "purple" }
                  ].map((item, index) => (
                    <div key={item.metric} className="text-center p-6 bg-white/5 rounded-2xl">
                      <div className={`text-3xl font-bold mb-2 ${
                        item.color === 'green' ? 'text-green-400' :
                        item.color === 'blue' ? 'text-blue-400' : 'text-purple-400'
                      }`}>
                        {item.score}%
                      </div>
                      <div className="text-white/70">{item.metric}</div>
                      <div className="w-full bg-white/10 rounded-full h-2 mt-3">
                        <div 
                          className={`h-2 rounded-full ${
                            item.color === 'green' ? 'bg-green-400' :
                            item.color === 'blue' ? 'bg-blue-400' : 'bg-purple-400'
                          }`}
                          style={{ width: `${item.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          )}

          {/* Custom Sections */}
          {activeSection === 'sections' && (
            <div className="space-y-8">
              <GlassCard delay={100}>
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white mb-4">
                    Customize Your Resume Sections
                  </h2>
                  <p className="text-white/70 text-lg">
                    Add, remove, and reorder sections to create a resume that tells your unique story.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { name: 'Projects', icon: Target, description: 'Showcase key projects' },
                    { name: 'Publications', icon: FileText, description: 'Academic & professional publications' },
                    { name: 'Volunteer Work', icon: Award, description: 'Community involvement' },
                    { name: 'Languages', icon: Languages, description: 'Language proficiencies' },
                    { name: 'Certifications', icon: Star, description: 'Professional certifications' },
                    { name: 'Hobbies', icon: UserCheck, description: 'Personal interests' }
                  ].map((section, index) => (
                    <div 
                      key={section.name}
                      className="group p-6 bg-gradient-to-br from-white/5 to-white/0 hover:from-white/10 hover:to-white/5 border border-white/10 hover:border-white/20 rounded-2xl transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-2 bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-xl group-hover:from-green-500/30 group-hover:to-teal-500/30 transition-all">
                          <section.icon className="w-6 h-6 text-green-400" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-white mb-1">{section.name}</h3>
                          <p className="text-white/60 text-sm">{section.description}</p>
                        </div>
                        <Plus className="w-5 h-5 text-white/40 group-hover:text-white/80 transition-colors" />
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>

              {/* Drag and Drop Demo */}
              <GlassCard delay={200}>
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Languages className="w-6 h-6 text-teal-400" />
                  Drag-and-Drop Section Builder
                </h3>
                <div className="bg-gradient-to-r from-slate-900/50 to-slate-800/50 rounded-2xl p-6 border border-white/10">
                  <p className="text-white/80 mb-4">
                    Easily reorder sections by dragging and dropping to highlight what matters most for your target role.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-white/60">
                    <TrendingUp className="w-4 h-4" />
                    <span>Smart ordering suggestions based on your industry</span>
                  </div>
                </div>
              </GlassCard>
            </div>
          )}

          {/* Export Options */}
          {activeSection === 'export' && (
            <div className="space-y-8">
              <GlassCard delay={100}>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h2 className="text-3xl font-bold text-white">
                      Export & Share Options
                    </h2>
                    
                    <p className="text-white/80 text-lg">
                      Download your resume in multiple formats or share directly with recruiters and professional networks.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {['PDF', 'DOCX', 'TXT', 'HTML'].map((format) => (
                        <button
                          key={format}
                          className="p-4 bg-gradient-to-r from-white/5 to-white/0 hover:from-white/10 hover:to-white/5 border border-white/10 hover:border-white/20 rounded-xl transition-all duration-300 group"
                        >
                          <div className="flex items-center justify-center gap-2">
                            <Download className="w-5 h-5 text-green-400 group-hover:scale-110 transition-transform" />
                            <span className="font-medium text-white">{format}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                      <Mail className="w-6 h-6 text-teal-400" />
                      Direct Sharing
                    </h3>
                    
                    <div className="space-y-4">
                      <button className="w-full p-4 bg-gradient-to-r from-blue-900/30 to-purple-900/30 hover:from-blue-900/50 hover:to-purple-900/50 border border-blue-500/20 hover:border-blue-500/40 rounded-xl transition-all duration-300 group text-left">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-500/20 rounded-lg">
                            <Globe className="w-5 h-5 text-blue-400" />
                          </div>
                          <div>
                            <div className="font-medium text-white">Export to LinkedIn Profile</div>
                            <div className="text-white/60 text-sm">Sync with your LinkedIn profile</div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-white/40 group-hover:text-white/80 group-hover:translate-x-1 transition-all ml-auto" />
                        </div>
                      </button>
                      
                      <button className="w-full p-4 bg-gradient-to-r from-green-900/30 to-teal-900/30 hover:from-green-900/50 hover:to-teal-900/50 border border-green-500/20 hover:border-green-500/40 rounded-xl transition-all duration-300 group text-left">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-green-500/20 rounded-lg">
                            <Mail className="w-5 h-5 text-green-400" />
                          </div>
                          <div>
                            <div className="font-medium text-white">Email to Recruiters</div>
                            <div className="text-white/60 text-sm">Send to up to 10 recruiters</div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-white/40 group-hover:text-white/80 group-hover:translate-x-1 transition-all ml-auto" />
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>
          )}
        </div>
      </section>

      {/* Resume Builder Form */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <GlassCard delay={100}>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                Let's Build Your Perfect Resume
              </h2>
              <p className="text-white/70 text-lg">
                Share your details and let our AI create a tailored resume that stands out.
              </p>
            </div>

            <div className="space-y-8">
              {/* Input Fields */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-white/80 font-medium">Target Role</label>
                  <input 
                    type="text" 
                    placeholder="e.g., Senior Product Manager"
                    className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent backdrop-blur-sm"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-white/80 font-medium">Industry</label>
                  <input 
                    type="text" 
                    placeholder="e.g., Technology, Healthcare"
                    className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent backdrop-blur-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-white/80 font-medium">Professional Experience</label>
                <textarea 
                  rows={4}
                  placeholder="Paste or describe your work history, key achievements, and responsibilities..."
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent backdrop-blur-sm resize-none"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-white/80 font-medium">Education & Certifications</label>
                <textarea 
                  rows={3}
                  placeholder="Degrees, institutions, years, relevant certifications..."
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent backdrop-blur-sm resize-none"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-white/80 font-medium">Skills & Achievements</label>
                <textarea 
                  rows={3}
                  placeholder="Technical skills, soft skills, awards, notable projects..."
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent backdrop-blur-sm resize-none"
                />
              </div>

              {/* Job Description Upload */}
              <div className="space-y-4 p-6 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-2xl border border-blue-500/20">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-400" />
                  Job Description Analysis (Optional)
                </h3>
                <p className="text-white/70 text-sm">
                  Paste a job description to get AI-powered keyword optimization and tailored content suggestions.
                </p>
                <textarea 
                  rows={4}
                  placeholder="Paste the job description here for targeted optimization..."
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent backdrop-blur-sm resize-none"
                />
              </div>

              {/* Generate Button */}
              <div className="text-center pt-6">
                <button 
                  onClick={() => setCurrentStep(2)}
                  className="group relative px-12 py-6 bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl font-bold text-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/25"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-teal-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  <span className="relative flex items-center gap-3">
                    <Brain className="w-6 h-6" />
                    Generate My Resume
                    <Sparkles className="w-6 h-6 transform group-hover:rotate-12 transition-transform" />
                  </span>
                </button>
              </div>

              {/* Features Preview */}
              <div className="grid md:grid-cols-3 gap-6 pt-8 border-t border-white/10">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-xl flex items-center justify-center mx-auto">
                    <Zap className="w-6 h-6 text-green-400" />
                  </div>
                  <h4 className="font-bold text-white">AI-Powered</h4>
                  <p className="text-white/60 text-sm">Smart content generation</p>
                </div>
                
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center mx-auto">
                    <Search className="w-6 h-6 text-blue-400" />
                  </div>
                  <h4 className="font-bold text-white">ATS Optimized</h4>
                  <p className="text-white/60 text-sm">Passes screening systems</p>
                </div>
                
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center mx-auto">
                    <Award className="w-6 h-6 text-purple-400" />
                  </div>
                  <h4 className="font-bold text-white">Professional</h4>
                  <p className="text-white/60 text-sm">Industry-standard format</p>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Success Stories */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Success Stories from
              </span>
              <br />
              <span className="bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
                Our AI-Built Resumes
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                metric: "3.2x", 
                label: "More Interview Calls", 
                description: "Users report significantly more responses",
                color: "from-green-500 to-teal-500" 
              },
              { 
                metric: "89%", 
                label: "ATS Pass Rate", 
                description: "Resumes successfully parsed by systems",
                color: "from-blue-500 to-purple-500" 
              },
              { 
                metric: "14 Days", 
                label: "Average Job Landing", 
                description: "From resume creation to job offer",
                color: "from-purple-500 to-pink-500" 
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
        
        @keyframes docFloat {
          0%, 100% { transform: translateY(0px) rotateZ(0deg); }
          50% { transform: translateY(-25px) rotateZ(3deg); }
        }
        
        .rotateX-2 { transform: rotateX(2deg); }
        .rotateY-2 { transform: rotateY(2deg); }
        .rotateX-5 { transform: rotateX(5deg); }
        .rotateY-5 { transform: rotateY(5deg); }
        .rotateX-0 { transform: rotateX(0deg); }
        .rotateY-0 { transform: rotateY(0deg); }
      `}</style>
    </div>
  );
};

export default ResumePage;