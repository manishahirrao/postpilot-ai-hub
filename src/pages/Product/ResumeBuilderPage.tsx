import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
  Target
} from 'lucide-react';
import { useThemeStyles } from '@/lib/theme-utils';
import ProductLayout from '@/components/Layout/ProductLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ResumePage = () => {
  const themeStyles = useThemeStyles();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  const templates = [
    {
      name: "Classic",
      gradient: "from-blue-500 to-indigo-600"
    },
    {
      name: "Modern",
      gradient: "from-purple-500 to-pink-600"
    },
    {
      name: "Creative",
      gradient: "from-green-500 to-teal-600"
    },
    {
      name: "Executive",
      gradient: "from-amber-500 to-orange-600"
    }
  ];
  
  const [currentTemplate, setCurrentTemplate] = useState(0);
  const [activeSection, setActiveSection] = useState('templates');

  const nextTemplate = () => {
    setCurrentTemplate((prev) => (prev + 1) % templates.length);
  };

  const prevTemplate = () => {
    setCurrentTemplate((prev) => (prev - 1 + templates.length) % templates.length);
  };

  return (
    <ProductLayout 
      title="AI-Powered Resume Builder"
      description="Create a professional resume that stands out with our AI-powered resume builder"
      className={themeStyles.bgGradient}
    >
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute top-1/2 left-1/4 w-64 h-64 border-2 border-cyan-500/10 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute -bottom-20 -right-20 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
            animate={{ 
              x: [0, 20, 0],
              y: [0, 20, 0]
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity, 
              repeatType: "reverse" 
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div 
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500/10 to-teal-500/10 rounded-full px-4 py-2 border border-green-500/20 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="w-4 h-4 text-green-400" />
              <span className="text-sm font-medium text-white/90">AI-Powered Resume Builder</span>
            </motion.div>

            <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-white mb-6">
              <span className="block">Craft a Resume That</span>
              <span className="bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
                Recruiters Can't Resist
              </span>
            </h1>

            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
              ATS-optimized, professionally designed resumes tailored to your target role—generated in minutes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button 
                className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-8 py-4 text-lg font-semibold rounded-lg hover:shadow-lg hover:shadow-teal-500/25 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Generate My Resume
              </motion.button>
              <motion.button 
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 text-lg font-semibold rounded-lg border border-white/20 hover:bg-white/20 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download className="w-5 h-5" />
                Download & Export
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Builder Sections */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/0 via-slate-900/50 to-slate-900/80" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h1 className={`text-4xl font-bold ${themeStyles.textPrimary} mb-4`}>
              Resume & CV Builder
            </h1>
            <p className={`text-xl ${themeStyles.textSecondary} max-w-3xl mx-auto`}>
              Create a professional resume that gets you noticed by employers and ATS systems.
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            <motion.button
              onClick={() => setActiveSection('templates')}
              className={`px-6 py-3 rounded-full font-medium transition-all ${activeSection === 'templates' ? 'bg-gradient-to-r from-green-500 to-teal-600 text-white' : 'bg-white/5 text-white/80 hover:bg-white/10'}`}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center gap-2">
                <LayoutTemplate className="w-5 h-5" />
                Templates
              </div>
            </motion.button>
            
            <motion.button
              onClick={() => setActiveSection('optimization')}
              className={`px-6 py-3 rounded-full font-medium transition-all ${activeSection === 'optimization' ? 'bg-gradient-to-r from-green-500 to-teal-600 text-white' : 'bg-white/5 text-white/80 hover:bg-white/10'}`}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                ATS Optimization
              </div>
            </motion.button>
            
            <motion.button
              onClick={() => setActiveSection('sections')}
              className={`px-6 py-3 rounded-full font-medium transition-all ${activeSection === 'sections' ? 'bg-gradient-to-r from-green-500 to-teal-600 text-white' : 'bg-white/5 text-white/80 hover:bg-white/10'}`}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Custom Sections
              </div>
            </motion.button>
            
            <motion.button
              onClick={() => setActiveSection('export')}
              className={`px-6 py-3 rounded-full font-medium transition-all ${activeSection === 'export' ? 'bg-gradient-to-r from-green-500 to-teal-600 text-white' : 'bg-white/5 text-white/80 hover:bg-white/10'}`}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center gap-2">
                <Download className="w-5 h-5" />
                Export Options
              </div>
            </motion.button>
          </div>

          {/* Template Showcase */}
          {activeSection === 'templates' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-white">
                  Choose from 20+ Professionally Designed Templates
                </h2>
                <div className="flex gap-2">
                  <button 
                    onClick={prevTemplate}
                    className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all"
                  >
                    <ChevronLeft className="w-6 h-6 text-white" />
                  </button>
                  <button 
                    onClick={nextTemplate}
                    className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all"
                  >
                    <ChevronRight className="w-6 h-6 text-white" />
                  </button>
                </div>
              </div>
              
              <div className="relative h-96">
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-r ${templates[currentTemplate].gradient} rounded-xl flex items-center justify-center text-white text-2xl font-bold`}
                  key={currentTemplate}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                >
                  {templates[currentTemplate].name} Template Preview
                </motion.div>
              </div>
              
              <div className="flex justify-center mt-6 gap-2">
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
            </motion.div>
          )}

          {/* ATS Optimization */}
          {activeSection === 'optimization' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
            >
              <h2 className="text-3xl font-bold text-white mb-6">
                ATS Optimization
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">
                    <span className="bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
                      Intelligent Keyword Matching
                    </span>
                  </h3>
                  <p className="text-white/80 mb-6">
                    Our AI analyzes job descriptions and integrates top keywords to ensure your resume passes Applicant Tracking Systems.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                      <p className="text-white/90">One-click keyword insertion for any role</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                      <p className="text-white/90">Real-time ATS score feedback</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                      <p className="text-white/90">Industry-specific optimization</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-green-900/30 to-teal-900/30 rounded-xl border border-green-500/20 p-6 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-green-400 mb-2">98%</div>
                    <div className="text-white/80">Average ATS compatibility score</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Custom Sections */}
          {activeSection === 'sections' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
            >
              <h2 className="text-3xl font-bold text-white mb-6">
                Custom Sections
              </h2>
              
              <p className="text-white/80 mb-8">
                Add optional sections to make your resume stand out from the crowd.
              </p>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {['Projects', 'Publications', 'Volunteer', 'Languages', 'Hobbies', 'Certifications'].map((section) => (
                  <motion.div
                    key={section}
                    className="bg-white/5 hover:bg-white/10 rounded-lg p-4 border border-white/10 cursor-pointer transition-all"
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-lg flex items-center justify-center">
                        <Plus className="w-5 h-5 text-green-400" />
                      </div>
                      <div className="font-medium text-white">{section}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-8 pt-8 border-t border-white/10">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Languages className="w-5 h-5 text-teal-400" />
                  <span>Drag-and-Drop Editor</span>
                </h3>
                <p className="text-white/80">
                  Easily reorder sections with our intuitive drag-and-drop interface to highlight what matters most.
                </p>
              </div>
            </motion.div>
          )}

          {/* Export Options */}
          {activeSection === 'export' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
            >
              <h2 className="text-3xl font-bold text-white mb-6">
                Export & Share
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Download className="w-5 h-5 text-teal-400" />
                    <span>Download Formats</span>
                  </h3>
                  <p className="text-white/80 mb-6">
                    Export your resume in multiple formats ready for any application.
                  </p>
                  
                  <div className="flex flex-wrap gap-3">
                    {['PDF', 'DOCX', 'TXT', 'HTML'].map((format) => (
                      <motion.div
                        key={format}
                        className="px-4 py-2 bg-white/5 rounded-full border border-white/10 text-white/90 hover:bg-white/10 transition-all cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                      >
                        {format}
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Mail className="w-5 h-5 text-teal-400" />
                    <span>Direct Sharing</span>
                  </h3>
                  <p className="text-white/80 mb-6">
                    Send your resume directly to recruiters or integrate with professional networks.
                  </p>
                  
                  <div className="space-y-3">
                    <motion.button
                      className="w-full bg-white/5 hover:bg-white/10 rounded-lg p-3 border border-white/10 text-white text-left transition-all"
                      whileHover={{ x: 5 }}
                    >
                      Export to LinkedIn Profile
                    </motion.button>
                    <motion.button
                      className="w-full bg-white/5 hover:bg-white/10 rounded-lg p-3 border border-white/10 text-white text-left transition-all"
                      whileHover={{ x: 5 }}
                    >
                      Schedule Email to Recruiters (Up to 10)
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Input Prompt */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/0 via-slate-900/50 to-slate-900/80" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="bg-gradient-to-br from-green-900/30 to-teal-900/30 rounded-2xl p-8 border border-green-500/20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              Let's Get Started - What's Your Target Role?
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-white/80 mb-2">Paste or upload your work history</label>
                <textarea 
                  className="w-full bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-green-500/50"
                  rows={3}
                  placeholder="Current position, company, duration, responsibilities..."
                />
              </div>
              
              <div>
                <label className="block text-white/80 mb-2">Education & Certifications</label>
                <textarea 
                  className="w-full bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-green-500/50"
                  rows={2}
                  placeholder="Degrees, institutions, years, certifications..."
                />
              </div>
              
              <div>
                <label className="block text-white/80 mb-2">Skills & Achievements</label>
                <textarea 
                  className="w-full bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-green-500/50"
                  rows={2}
                  placeholder="Technical skills, soft skills, awards, notable projects..."
                />
              </div>
              
              <div className="pt-4">
                <motion.button 
                  className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-8 py-4 text-lg font-semibold rounded-lg hover:shadow-lg hover:shadow-teal-500/25 transition-all duration-300 w-full"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  Generate My Resume
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </ProductLayout>
  );
};

export default ResumePage;