
import * as React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Target, Heart, Users, Award, Rocket, Globe, Sparkles } from 'lucide-react';
import { ComplexOrbitalSystem } from '@/components/OrbitalSystem';

// Floating Animation Component
interface FloatingElementProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

const FloatingElement: React.FC<FloatingElementProps> = ({ 
  children, 
  delay = 0, 
  className = '' 
}) => {
  const style = {
    animation: `float 6s ease-in-out infinite`,
    animationDelay: `${delay}s`,
  } as React.CSSProperties;

  return (
    <div 
      className={`transform-gpu ${className}`}
      style={style}
    >
      {children}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotateZ(0deg); }
            50% { transform: translateY(10px) rotateZ(2deg); }
          }
        `}
      </style>
    </div>
  );
};

const AboutUsPage: React.FC = () => {
  const values = [
    {
      icon: <Target className="w-10 h-10 text-blue-500" />,
      title: 'Innovation First',
      description: 'We constantly push the boundaries of what\'s possible with AI to give our users competitive advantages.',
      gradient: 'from-blue-500 to-cyan-400',
      delay: 0.1
    },
    {
      icon: <Heart className="w-10 h-10 text-pink-500" />,
      title: 'User-Centric',
      description: 'Every feature we build starts with understanding our users\' real challenges and needs.',
      gradient: 'from-pink-500 to-rose-400',
      delay: 0.2
    },
    {
      icon: <Users className="w-10 h-10 text-emerald-500" />,
      title: 'Inclusive Growth',
      description: 'We believe everyone deserves equal opportunities to advance their career, regardless of background.',
      gradient: 'from-emerald-500 to-teal-400',
      delay: 0.3
    },
    {
      icon: <Award className="w-10 h-10 text-purple-500" />,
      title: 'Excellence',
      description: 'We strive for excellence in everything we do, from product quality to customer support.',
      gradient: 'from-purple-500 to-indigo-400',
      delay: 0.4
    }
  ];

  const timeline = [
    {
      year: '2025',
      title: 'Company Founded',
      description: 'ContentHelm was founded with a mission to democratize professional networking and career advancement.'
    },
    {
      year: '2025',
      title: 'First 1,000 Users',
      description: 'Reached our first milestone of 1,000 active users within 3 months of launch.'
    },
   
  ];

  const stats = [
    { number: '50,000+', label: 'Active Users' },
    { number: '2M+', label: 'Posts Generated' },
    { number: '150+', label: 'Countries' },
    { number: '99.9%', label: 'Uptime' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5" />
        
        {/* Large floating orbs */}
        <div 
          className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '0.5s' }}
        />
        <div 
          className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '1s' }}
        />
        <div 
          className="absolute top-1/3 right-1/3 w-40 h-40 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: '1.5s' }}
        />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-5" 
          style={{
            backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }} 
        />
      </div>
      
      {/* Page content wrapper */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center overflow-hidden">
          <div className="absolute inset-0">
            {/* Floating elements */}
            <FloatingElement className="absolute top-1/4 left-1/4" delay={0.3}>
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm border border-blue-500/30" />
            </FloatingElement>
            
            <FloatingElement className="absolute bottom-1/3 right-1/3" delay={0.6}>
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-500/30" />
            </FloatingElement>
            
            {/* Main orbital system */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-20">
              <ComplexOrbitalSystem className="w-full max-w-2xl" />
            </div>
          </div>
          
          {/* Hero content */}
          <div className="container mx-auto px-4 relative z-10 text-center">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/10 backdrop-blur-md mb-8"
              >
                <Sparkles className="w-5 h-5 mr-2 text-cyan-400" />
                <span className="text-sm font-medium bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  The Future of Career Development
                </span>
              </motion.div>
              
              <motion.h1 
                className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <span className="block bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent">
                  Empowering Careers with
                </span>
                <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mt-2">
                  Intelligent Technology
                </span>
              </motion.h1>
              
              <motion.p 
                className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                We're revolutionizing career development through cutting-edge AI and data-driven insights that deliver real results.
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Button 
                  className="group relative overflow-hidden px-8 py-6 text-lg font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/20"
                >
                  <span className="relative z-10 flex items-center">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="group relative overflow-hidden px-8 py-6 text-lg font-medium text-white border-white/20 hover:bg-white/5 hover:border-white/30 rounded-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <span className="relative z-10 flex items-center">
                    Learn More
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </motion.div>
              
              {/* Trust indicators */}
              <motion.div 
                className="mt-16 pt-8 border-t border-white/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <p className="text-sm text-gray-400 mb-6">TRUSTED BY INNOVATIVE COMPANIES WORLDWIDE</p>
                <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
                  {['TechCorp', 'InnovateX', 'FutureLabs', 'Nexus', 'Quantum', 'Horizon'].map((company, i) => (
                    <div key={i} className="text-gray-300 font-medium hover:text-white transition-colors cursor-pointer">
                      {company}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Rest of the page content */}
       

        {/* Mission & Vision */}
        <section className="py-20 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  To empower every professional with AI-driven tools that remove barriers to career 
                  advancement and help them achieve their full potential in the modern workplace.
                </p>
                <p className="text-lg text-muted-foreground mb-8">
                  We believe that career success shouldn't depend on who you know or where you went 
                  to school. With the right tools and insights, anyone can build a strong professional 
                brand and find opportunities that match their skills and aspirations.
              </p>
              <Link to="/contact-sales">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Join Our Mission
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
            
            <div className="relative">
              <Card className="bg-gradient-to-br from-blue-50 to-purple-50">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                  <p className="text-gray-700 mb-6">
                    A world where every professional has equal access to career advancement 
                    opportunities, powered by intelligent technology that understands and 
                    amplifies human potential.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-gray-700">Democratize professional networking</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                      <span className="text-gray-700">Eliminate bias in hiring</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span className="text-gray-700">Accelerate career growth globally</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative py-24 overflow-hidden" id="values">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 to-background/90" />
          <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_0.5px,transparent_0.5px)] [background-size:16px_16px] opacity-10" />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/80 to-muted/20" />
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block mb-4 text-sm font-semibold tracking-wider text-transparent uppercase bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">
              Our Culture
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Core Values That
              <span className="relative ml-2 inline-block">
                <span className="relative z-10">Drive Us</span>
                <span className="absolute bottom-2 left-0 w-full h-3 bg-gradient-to-r from-blue-500/20 to-cyan-400/20 -z-0" />
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The foundational principles that shape our culture, decisions, and the way we build for you.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: value.delay }}
              >
                <Card className="h-full group relative overflow-hidden bg-background/50 backdrop-blur-sm border border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-background to-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  <CardContent className="relative p-8">
                    <div className="w-16 h-16 rounded-2xl mb-6 flex items-center justify-center bg-gradient-to-br from-background to-muted shadow-sm group-hover:shadow-lg transition-all duration-300 mx-auto">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${value.gradient} text-white shadow-inner`}>
                        {value.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-cyan-400 transition-all duration-300">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground group-hover:text-foreground/90 transition-colors duration-300">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Divider */}
      <div className="relative py-12">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-border/20" />
        </div>
        <div className="relative flex justify-center">
          <span className="px-4 bg-background text-sm text-muted-foreground">Our Journey</span>
        </div>
      </div>

      {/* Timeline */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background to-muted/10" />
        <div className="absolute inset-0 -z-20 bg-grid-pattern opacity-5" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block mb-4 text-sm font-semibold tracking-wider text-transparent uppercase bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-400">
              Our Journey
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Milestones That
              <span className="relative ml-2 inline-block">
                <span className="relative z-10">Shape Us</span>
                <span className="absolute bottom-2 left-0 w-full h-3 bg-gradient-to-r from-purple-500/20 to-indigo-400/20 -z-0" />
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Key moments that defined our journey in transforming careers and building the future of professional growth.
            </p>
          </motion.div>
          
          <div className="relative">
            {/* Animated line */}
            <motion.div 
              className="absolute left-1/2 transform -translate-x-0.5 w-1 h-full bg-gradient-to-b from-blue-400/30 via-purple-400/30 to-pink-400/30 rounded-full"
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            />
            
            <div className="space-y-24">
              {timeline.map((item, index) => {
                const isEven = index % 2 === 0;
                const delay = index * 0.1 + 0.2;
                
                return (
                  <motion.div 
                    key={index}
                    className={`relative flex ${isEven ? 'justify-start' : 'justify-end'}`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay }}
                  >
                    <div className={`w-full md:w-5/12 ${isEven ? 'pr-2 md:pr-12' : 'pl-2 md:pl-12'}`}>
                      <Card className={`group relative overflow-hidden bg-background/50 backdrop-blur-sm border border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-xl ${
                        isEven ? 'md:ml-auto' : 'md:mr-auto'
                      }`}>
                        <div className="absolute inset-0 bg-gradient-to-br from-background to-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className={`absolute inset-0 bg-gradient-to-br from-purple-500/5 to-indigo-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                        <CardContent className="relative p-8">
                          <div className="flex items-center mb-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-400 flex items-center justify-center text-white font-bold text-lg mr-4 shadow-md">
                              {item.year}
                            </div>
                            <h3 className="text-xl font-bold text-foreground group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-indigo-400 transition-all duration-300">
                              {item.title}
                            </h3>
                          </div>
                          <p className="text-muted-foreground group-hover:text-foreground/90 transition-colors duration-300 pl-16">
                            {item.description}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-gradient-to-br from-purple-500 to-indigo-400 rounded-full border-4 border-background shadow-lg z-10" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background to-muted/10" />
        <div className="absolute inset-0 -z-20 opacity-10 [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)]">
          <div className="absolute inset-0 bg-[radial-gradient(#60a5fa_1px,transparent_1px)] [background-size:16px_16px]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block mb-4 text-sm font-semibold tracking-wider text-transparent uppercase bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-400">
              Our Team
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Meet The
              <span className="relative ml-2 inline-block">
                <span className="relative z-10">Visionaries</span>
                <span className="absolute bottom-2 left-0 w-full h-3 bg-gradient-to-r from-cyan-500/20 to-blue-400/20 -z-0" />
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Passionate individuals dedicated to transforming careers and building the future of professional networking.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Team Member 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="group relative overflow-hidden h-full bg-background/50 backdrop-blur-sm border border-border/50 hover:border-cyan-500/20 transition-all duration-300 hover:shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-background to-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardContent className="relative p-8 text-center">
                  <div className="w-32 h-32 mx-auto mb-6 relative">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500 to-blue-400 p-0.5">
                      <div className="w-full h-full rounded-full bg-background p-1">
                        <div className="w-full h-full rounded-full bg-gradient-to-br from-cyan-500/10 to-blue-400/10 flex items-center justify-center text-3xl font-bold text-cyan-600">
                          HR
                        </div>
                      </div>
                    </div>
                    <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-cyan-500/30 to-blue-400/30 opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-300" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-blue-400 transition-all duration-300">
                    Harsh Singh Rajput
                  </h3>
                  <p className="text-muted-foreground mb-4 font-medium">Founder & CEO</p>
                  <p className="text-muted-foreground/80 group-hover:text-foreground/90 transition-colors duration-300">
                    Visionary leader with a passion for democratizing professional growth through technology.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Team Member 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="group relative overflow-hidden h-full bg-background/50 backdrop-blur-sm border border-border/50 hover:border-blue-500/20 transition-all duration-300 hover:shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-background to-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardContent className="relative p-8 text-center">
                  <div className="w-32 h-32 mx-auto mb-6 relative">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-indigo-400 p-0.5">
                      <div className="w-full h-full rounded-full bg-background p-1">
                        <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500/10 to-indigo-400/10 flex items-center justify-center text-3xl font-bold text-blue-600">
                          MA
                        </div>
                      </div>
                    </div>
                    <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-blue-500/30 to-indigo-400/30 opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-300" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-indigo-400 transition-all duration-300">
                    Manish Ahirrao
                  </h3>
                  <p className="text-muted-foreground mb-4 font-medium">Co-founder & CTO</p>
                  <p className="text-muted-foreground/80 group-hover:text-foreground/90 transition-colors duration-300">
                    Tech innovator building scalable solutions to connect professionals with opportunities.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
          
          </motion.div>
        </div>
      </section>
      
      {/* Divider */}
      <div className="relative py-12">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-border/20" />
        </div>
      </div>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden bg-background">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-background to-muted/20" />
          <div className="absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)]">
            <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_0.5px,transparent_0.5px)] [background-size:16px_16px]" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div 
            className="relative z-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider text-white bg-gradient-to-r from-blue-500 to-cyan-400 mb-6">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              Join Our Community
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 max-w-4xl mx-auto">
              Ready to Transform Your 
              <span className="relative ml-2 inline-block">
                <span className="relative z-10">Career?</span>
                <span className="absolute bottom-2 left-0 w-full h-4 bg-gradient-to-r from-blue-500/20 to-cyan-400/20 -z-0" />
              </span>
            </h2>
            
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Join thousands of professionals who are already accelerating their success with ContentHelm powerful tools and community.
            </p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Link to="/auth/register" className="group">
                <Button 
                  size="lg" 
                  className="relative overflow-hidden px-8 py-6 text-base font-semibold rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 group-hover:scale-[1.02]"
                >
                  <span className="relative z-10 flex items-center">
                    Get Started Free
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-white/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>
              </Link>
              
              <Link to="/contact-sales" className="group">
                <Button 
                  variant="outline"
                  size="lg" 
                  className="relative overflow-hidden px-8 py-6 text-base font-semibold rounded-full border-2 border-border/50 bg-background/50 backdrop-blur-sm text-foreground hover:bg-background hover:border-blue-400/50 hover:text-blue-400 shadow-sm transition-all duration-300 group-hover:scale-[1.02]"
                >
                  <span className="relative z-10">
                    Contact Sales
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>
              </Link>
            </motion.div>
            
            <div className="mt-8 flex items-center justify-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2 text-blue-400" />
                <span>50,000+ Professionals</span>
              </div>
              <div className="h-4 w-px bg-border" />
              <div className="flex items-center">
                <Globe className="w-4 h-4 mr-2 text-cyan-400" />
                <span>150+ Countries</span>
              </div>
            </div>
          </motion.div>
          
          {/* Floating elements */}
          <motion.div 
            className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-400/20 blur-3xl -z-10"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div 
            className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl -z-10"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              repeatType: "reverse" as const,
            }}
          />
        </div>
        
        {/* Divider */}
        <div className="relative py-12">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-border/20" />
          </div>
        </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUsPage;
