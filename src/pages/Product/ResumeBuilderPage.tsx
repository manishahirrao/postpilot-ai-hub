import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Upload, Zap, Download, CheckCircle, FileText, TrendingUp, Star, Sparkles, Clock, Shield, Users, Award, Check, PenTool, BarChart, Rocket, Mail, UserCheck, ThumbsUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ComplexOrbitalSystem } from '@/components/OrbitalSystem';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';

const ResumeBuilderPage = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const features = [
    {
      icon: <FileText className="w-10 h-10 text-blue-500" />,
      title: 'ATS Optimization',
      description: 'Our AI ensures your resume passes through applicant tracking systems with flying colors.',
      gradient: 'from-blue-500 to-cyan-400',
      delay: 0.1
    },
    {
      icon: <UserCheck className="w-10 h-10 text-green-500" />,
      title: 'Personalized Content',
      description: 'Get tailored suggestions based on your experience and target roles.',
      gradient: 'from-green-500 to-teal-400',
      delay: 0.2
    },
    {
      icon: <BarChart className="w-10 h-10 text-purple-500" />,
      title: 'Performance Metrics',
      description: 'See how your resume performs and get actionable insights.',
      gradient: 'from-purple-500 to-pink-400',
      delay: 0.3
    }
  ];
  
  const steps = [
    {
      number: '1',
      title: 'Upload Your Resume',
      description: 'Easily upload your existing resume in any format',
      icon: Upload
    },
    {
      number: '2',
      title: 'AI Analysis',
      description: 'Our AI scans and analyzes your resume content',
      icon: Zap
    },
    {
      number: '3',
      title: 'Get Recommendations',
      description: 'Receive personalized improvement suggestions',
      icon: CheckCircle
    },
    {
      number: '4',
      title: 'Download & Apply',
      description: 'Download your polished resume and land interviews',
      icon: Download
    }
  ];

  useEffect(() => {
    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => clearInterval(progressInterval);
  }, []);

  const beforeAfter = {
    before: [
      "Worked on software projects",
      "Helped with team coordination", 
      "Used various programming languages"
    ],
    after: [
      "Led development of 3 mission-critical applications serving 10,000+ users",
      "Coordinated cross-functional team of 8 developers, reducing delivery time by 30%",
      "Architected scalable solutions using React, Node.js, and AWS, improving performance by 40%"
    ]
  };

  const stats = [
    { number: '50K+', label: 'Resumes Enhanced', icon: FileText },
    { number: '85%', label: 'Interview Rate', icon: TrendingUp },
    { number: '4.9/5', label: 'User Rating', icon: Star },
    { number: '2min', label: 'Processing Time', icon: Clock }
  ];

  const handleUpload = () => {
    setIsProcessing(true);
    setTimeout(() => setIsProcessing(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Navbar />
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/images/hero-bg.svg')] bg-cover bg-center opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20" />  
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <ComplexOrbitalSystem className="w-96 h-96 opacity-30" />
          </div>
          
          <motion.div 
            className="absolute top-20 right-32 w-48 h-48"
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
          >
            <ComplexOrbitalSystem className="opacity-20" />
          </motion.div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div 
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-full px-4 py-2 border border-blue-500/20 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <Rocket className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium">AI-Powered Resume Builder</span>
            </motion.div>
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
              <span className="block">Build a Resume That</span>
              <span className="block gradient-text">Gets You Hired</span>
              <span className="text-3xl lg:text-4xl font-normal opacity-80 mt-4">
                AI-powered resume optimization for your dream job
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Our advanced AI analyzes your resume and provides personalized recommendations to help you stand out to employers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8 py-6 text-lg font-medium bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                Build My Resume <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-6 text-lg font-medium">
                See Examples
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose Our Resume Builder?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We combine cutting-edge AI with expert career advice to help you land more interviews.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: feature.delay }}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Get a professional resume in just a few simple steps
            </p>
          </div>
          
          <div className="relative">
            <div className="hidden md:block absolute top-0 left-1/2 h-full w-0.5 bg-gradient-to-b from-blue-500/20 to-purple-500/20"></div>
            
            <div className="space-y-12 md:space-y-24">
              {steps.map((step, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className="md:w-1/2 px-4 md:px-8 mb-6 md:mb-0">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold text-xl mb-4">
                      {step.number}
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                  <div className="md:w-1/2 px-4">
                    <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 flex items-center justify-center h-full">
                      <step.icon className="w-16 h-16 text-blue-500 opacity-20" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Resume Upload Section */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-3">Upload Your Resume</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Get started by uploading your existing resume. We'll analyze it and provide personalized recommendations.
              </p>
            </div>
            
            <div 
              className="border-2 border-dashed border-blue-200 rounded-2xl p-12 text-center mb-8 hover:border-blue-400 hover:bg-blue-50/50 transition-all duration-300 cursor-pointer group"
              onClick={handleUpload}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Upload className="w-10 h-10 text-blue-600" />
              </div>
              <p className="text-lg text-gray-700 font-medium mb-2">Drag & drop your resume here</p>
              <p className="text-sm text-gray-500">or click to browse files (PDF, DOCX, TXT)</p>
            </div>
            
            {uploadProgress > 0 && (
              <motion.div 
                className="space-y-4 mb-8"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-700 font-medium">
                    {isProcessing ? 'AI Enhancement in progress...' : 'Processing with AI...'}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" />
                    <span className="text-blue-600 font-medium">{Math.round(uploadProgress)}%</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2.5 rounded-full transition-all duration-500 relative overflow-hidden"
                    style={{ width: `${uploadProgress}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                  </div>
                </div>
              </motion.div>
            )}
            
            <Button 
              size="lg"
              disabled={uploadProgress < 100}
              className={`w-full py-6 text-lg font-medium transition-all duration-300 ${
                uploadProgress >= 100 
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 hover:shadow-lg hover:-translate-y-0.5' 
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Download className="w-5 h-5 mr-2" />
              {uploadProgress >= 100 ? 'Download Enhanced Resume' : 'Upload resume to continue'}
            </Button>
          </motion.div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center"
              >
                <stat.icon className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Before & After Transformation */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-indigo-900 bg-clip-text text-transparent">
                See the Magic Happen
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Watch how our AI transforms weak, generic statements into powerful, 
                quantified achievements that grab attention
              </p>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Before */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl blur opacity-20"></div>
              <div className="relative bg-white rounded-2xl border-2 border-red-200 shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
                    <span className="text-red-600 font-bold text-xl">✗</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Before AI</h3>
                </div>
                
                <div className="space-y-4">
                  {beforeAfter.before.map((item, index) => (
                    <motion.div 
                      key={index} 
                      className="flex items-start space-x-3 group"
                      whileHover={{ x: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-6 h-6 rounded-full bg-red-50 flex items-center justify-center group-hover:bg-red-100 transition-colors">
                          <span className="text-red-500 text-sm">✗</span>
                        </div>
                      </div>
                      <p className="text-gray-700">{item}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
            
            {/* After */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur opacity-20"></div>
              <div className="relative bg-white rounded-2xl border-2 border-green-200 shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">After AI Enhancement</h3>
                </div>
                
                <div className="space-y-4">
                  {beforeAfter.after.map((item, index) => (
                    <motion.div 
                      key={index} 
                      className="flex items-start space-x-3 group"
                      whileHover={{ x: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center group-hover:bg-green-100 transition-colors">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        </div>
                      </div>
                      <p className="text-gray-700">{item}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjJnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4yIj48cGF0aCBkPSJNMjAgMGMxMS4wNDYgMCAyMCA4Ljk1NCAyMCAyMHMtOC45NTQgMjAtMjAgMjBTMCAzMS4wNDYgMCAyMCA4Ljk1NCAwIDIwIDB6bTAgMTVjMi43NjEgMCA1IDIuMjM5IDUgNXMtMi4yMzkgNS01IDUtNS0yLjIzOS01LTVzMi4yMzktNSA1LTV6Ii8+PC9nPjwvZz48L3N2Zz4=')]"></div>
        </div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Ready to Transform Your Career?
            </h2>
            <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
              Join thousands of professionals who've landed their dream jobs with our AI-powered resume builder
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
              <Link to="/auth/register">
                <Button 
                  size="lg" 
                  className="bg-white text-indigo-700 hover:bg-gray-100 px-8 py-6 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                >
                  Get Started for Free <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/pricing">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold rounded-xl backdrop-blur-sm transition-all duration-300"
                >
                  View Pricing
                </Button>
              </Link>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-white/90 pt-4 text-sm md:text-base">
              <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full">
                <CheckCircle className="w-5 h-5 text-green-300" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full">
                <Clock className="w-5 h-5 text-blue-300" />
                <span>2-minute setup</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full">
                <Shield className="w-5 h-5 text-purple-300" />
                <span>Secure & private</span>
              </div>
            </div>
            
            <div className="pt-8">
              <div className="flex items-center justify-center space-x-4 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-indigo-100 italic">
                "This resume builder helped me land 3x more interviews. Best decision ever!"
                <span className="block font-medium mt-1">- Sarah K., Marketing Director</span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ResumeBuilderPage;