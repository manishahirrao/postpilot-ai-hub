import React, { useState, useEffect } from 'react';
import { ArrowRight, Upload, Zap, Download, CheckCircle, FileText, TrendingUp, Star, Sparkles, Clock, Shield, Users, Award } from 'lucide-react';

const ResumeBuilderPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
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

  const features = [
    { icon: Shield, title: 'ATS-friendly optimization', desc: 'Pass through screening systems' },
    { icon: Sparkles, title: 'AI-powered enhancement', desc: 'Transform weak points into achievements' },
    { icon: Award, title: 'Industry-specific templates', desc: 'Tailored for your field' },
    { icon: TrendingUp, title: 'Keyword optimization', desc: 'Rank higher in searches' },
    { icon: FileText, title: 'Format standardization', desc: 'Professional, clean layouts' },
    { icon: Users, title: 'Skills gap analysis', desc: 'Identify improvement areas' },
    { icon: Star, title: 'Achievement quantification', desc: 'Add numbers and impact' },
    { icon: Download, title: 'Multiple export formats', desc: 'PDF, DOCX, and more' }
  ];

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Floating Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl animate-pulse delay-2000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full text-white text-sm font-medium mb-6 shadow-lg">
                <Sparkles className="w-4 h-4 mr-2" />
                AI-Powered Resume Builder
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-6 leading-tight">
                Transform Your Resume with AI Magic
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Upload your existing resume and watch our AI transform it into an 
                <span className="font-semibold text-indigo-600"> ATS-friendly masterpiece</span> that 
                gets you noticed by top employers.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button className="group relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-semibold shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                  <span className="relative z-10 flex items-center">
                    Try It Free Now
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
                
                <button className="px-8 py-4 border-2 border-gray-200 text-gray-700 rounded-2xl font-semibold hover:border-indigo-300 hover:text-indigo-600 transition-all duration-300 bg-white/50 backdrop-blur-sm">
                  See Examples
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-100 shadow-sm">
                    <stat.icon className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{stat.number}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Interactive Demo */}
            <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl blur opacity-20"></div>
                <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Resume Enhancer</h3>
                      <p className="text-gray-500 text-sm">Powered by AI</p>
                    </div>
                  </div>
                  
                  <div 
                    className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center mb-6 hover:border-indigo-400 hover:bg-indigo-50/50 transition-all duration-300 cursor-pointer group"
                    onClick={handleUpload}
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <Upload className="w-8 h-8 text-indigo-600" />
                    </div>
                    <p className="text-gray-600 font-medium">Drop your resume here or click to upload</p>
                    <p className="text-sm text-gray-400 mt-1">PDF, DOCX supported</p>
                  </div>
                  
                  {uploadProgress > 0 && (
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-700 font-medium">
                          {isProcessing ? 'AI Enhancement in progress...' : 'Processing with AI...'}
                        </span>
                        <div className="flex items-center space-x-1">
                          <Sparkles className="w-4 h-4 text-indigo-600 animate-pulse" />
                          <span className="text-indigo-600 font-medium">{Math.round(uploadProgress)}%</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-500 relative overflow-hidden"
                          style={{ width: `${uploadProgress}%` }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <button 
                    className={`w-full py-4 rounded-2xl font-semibold transition-all duration-300 ${
                      uploadProgress >= 100 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg hover:-translate-y-0.5' 
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                    disabled={uploadProgress < 100}
                  >
                    <div className="flex items-center justify-center">
                      <Download className="w-5 h-5 mr-2" />
                      {uploadProgress >= 100 ? 'Download Enhanced Resume' : 'Upload resume to continue'}
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Before & After Transformation */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-indigo-900 bg-clip-text text-transparent mb-4">
              See the Magic Happen
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Watch how our AI transforms weak, generic statements into powerful, 
              quantified achievements that grab attention
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Before */}
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl blur opacity-20"></div>
              <div className="relative bg-white rounded-2xl border-2 border-red-200 shadow-xl p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-600 font-bold text-lg">✗</span>
                  </div>
                  <h3 className="text-xl font-bold text-red-600">Before: Generic & Weak</h3>
                </div>
                <div className="space-y-4">
                  {beforeAfter.before.map((item, index) => (
                    <div key={index} className="p-4 bg-red-50 rounded-xl border-l-4 border-red-300 transform hover:scale-105 transition-transform">
                      <p className="text-gray-700">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* After */}
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur opacity-20"></div>
              <div className="relative bg-white rounded-2xl border-2 border-green-200 shadow-xl p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-green-600">After: Impact-Driven Results</h3>
                </div>
                <div className="space-y-4">
                  {beforeAfter.after.map((item, index) => (
                    <div key={index} className="p-4 bg-green-50 rounded-xl border-l-4 border-green-300 transform hover:scale-105 transition-transform">
                      <p className="text-gray-700">{item}</p>
                      <div className="flex items-center mt-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span className="text-sm text-green-600 font-medium">AI Enhanced</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-indigo-900 bg-clip-text text-transparent mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple 3-step process to transform your resume
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Upload, title: "Upload Resume", desc: "Upload your current resume in PDF or DOCX format. Our AI will parse and analyze your content instantly.", color: "blue" },
              { icon: Zap, title: "AI Enhancement", desc: "Our advanced AI rewrites your bullet points to be more impactful, quantified, and ATS-friendly.", color: "purple" },
              { icon: Download, title: "Download Enhanced", desc: "Get your enhanced resume in multiple formats, optimized for both ATS systems and human readers.", color: "green" }
            ].map((step, index) => (
              <div key={index} className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl blur opacity-0 group-hover:opacity-20 transition-opacity"></div>
                <div className="relative text-center p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center bg-gradient-to-br ${
                    step.color === 'blue' ? 'from-blue-400 to-blue-600' :
                    step.color === 'purple' ? 'from-purple-400 to-purple-600' :
                    'from-green-400 to-green-600'
                  } shadow-lg`}>
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-2">
                    {index + 1}. {step.title}
                  </div>
                  <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-indigo-900 bg-clip-text text-transparent mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to create a standout resume
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group p-6 bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-100 hover:border-indigo-200 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/20"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-40 w-1 h-1 bg-white rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/3 w-1.5 h-1.5 bg-white rounded-full animate-pulse delay-2000"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Land Your Dream Job?
          </h2>
          <p className="text-xl text-indigo-200 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who've transformed their careers with our AI-powered resume enhancement.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button className="group px-8 py-4 bg-white text-indigo-600 rounded-2xl font-bold shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
              <span className="flex items-center justify-center">
                Enhance My Resume Free
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <button className="px-8 py-4 border-2 border-white/30 text-white rounded-2xl font-bold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
              View Pricing Plans
            </button>
          </div>
          
          <div className="flex items-center justify-center space-x-6 text-white/80">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>No Credit Card Required</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>2-Minute Setup</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResumeBuilderPage;