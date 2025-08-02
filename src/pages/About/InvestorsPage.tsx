
import * as React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Users, Globe, Award, ArrowRight, Download } from 'lucide-react';
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

interface Metric {
  title: string;
  value: string;
  period: string;
  description: string;
  icon: React.ReactNode;
}

interface Milestone {
  date: string;
  event: string;
  description: string;
}

const InvestorsPage: React.FC = () => {

  const renderIcon = (icon: React.ReactNode, className: string) => {
    if (React.isValidElement(icon)) {
      return React.cloneElement(icon as React.ReactElement, { className });
    }
    return icon;
  };

  const metrics: Metric[] = [
    {
      title: 'Monthly Active Users',
      value: '2.5M+',
      period: 'As of Q2 2025',
      description: 'Growing 15% month-over-month',
      icon: <Users className="w-8 h-8" />,
    },
    {
      title: 'Revenue Growth',
      value: '12x',
      period: 'Year over Year',
      description: 'Consistent quarter-over-quarter growth',
      icon: <TrendingUp className="w-8 h-8" />,
    },
    {
      title: 'Global Reach',
      value: '150+',
      period: 'Countries',
      description: 'Active users worldwide',
      icon: <Globe className="w-8 h-8" />,
    },
    {
      title: 'Awards',
      value: '25+',
      period: 'Industry Recognitions',
      description: 'For innovation and impact',
      icon: <Award className="w-8 h-8" />,
    },
  ];

  const milestones: Milestone[] = [
    { date: 'Q1 2025', event: 'Company Founded', description: 'ContentHelm incorporated with founding team' },
    { date: 'Q3 2025', event: 'Product Launch', description: 'Beta launch with 1,000 early users' },
    { date: 'Q4 2025', event: 'Market Validation', description: 'Achieved product-market fit metrics' },
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
      
      <main className="flex-1 relative z-10 overflow-hidden pt-2">
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
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <motion.div 
                className="absolute -top-4 -left-4 w-32 h-32 bg-blue-500/10 rounded-full filter blur-3xl -z-10"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
              
              <div className="inline-flex items-center px-6 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/10 mb-8 backdrop-blur-sm">
                <span className="text-sm font-medium text-blue-400">Investor Information</span>
              </div>
              
              <motion.h1 
                className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Building the Future of
                <span className="block mt-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                  Professional Growth
                </span>
              </motion.h1>
              
              <motion.p 
                className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Join our journey as we revolutionize career development with AI-powered tools. 
                Our investors are partners in our mission to democratize professional success.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <Button 
                  size="lg" 
                  className="group relative overflow-hidden px-8 py-6 text-lg font-medium bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/20"
                >
                  <span className="relative z-10 flex items-center">
                    <Download className="w-5 h-5 mr-3" />
                    Download Investment Deck
                    <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></span>
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline"
                  className="group relative overflow-hidden px-8 py-6 text-lg font-medium text-white border-white/20 hover:border-white/40 hover:bg-white/5 rounded-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <span className="relative z-10 flex items-center">
                    Contact Investor Relations
                    <ArrowRight className="ml-3 h-5 w-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></span>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Key Metrics */}
        {/* <section className="py-20 bg-background/50 relative">
          <div className="absolute inset-0 bg-grid-slate-900/[0.04] dark:bg-grid-slate-100/[0.04]" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Key Performance Metrics
              </h2>
              <p className="text-xl text-muted-foreground">
                Strong fundamentals driving sustainable growth
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {metrics.map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full bg-background/80 backdrop-blur-sm border-border/20 hover:shadow-lg transition-all">
                    <CardContent className="p-8 text-center">
                      <div className={`w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center ${
                        index === 0 ? 'bg-gradient-to-br from-cyan-500 to-blue-500' :
                        index === 1 ? 'bg-gradient-to-br from-purple-500 to-pink-500' :
                        index === 2 ? 'bg-gradient-to-br from-green-500 to-emerald-500' :
                        'bg-gradient-to-br from-orange-500 to-amber-500'
                      }`}>
                        {renderIcon(metric.icon, 'w-8 h-8 text-white')}
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">{metric.title}</h3>
                      <div className="text-3xl font-bold bg-gradient-to-r bg-clip-text text-transparent ${
                        index === 0 ? 'from-cyan-500 to-blue-500' :
                        index === 1 ? 'from-purple-500 to-pink-500' :
                        index === 2 ? 'from-green-500 to-emerald-500' :
                        'from-orange-500 to-amber-500'
                      } mb-1">
                        {metric.value}
                      </div>
                      <div className="text-sm text-muted-foreground mb-3">{metric.period}</div>
                      <p className="text-sm text-muted-foreground">{metric.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Section Divider --- */}
        <div className="w-full h-12 bg-gradient-to-r from-cyan-400/10 via-purple-400/10 to-blue-400/10 flex items-center justify-center">
          <span className="h-1 w-32 rounded-full bg-gradient-to-r from-cyan-500 via-purple-500 to-blue-500 opacity-40"></span>
        </div>

        {/* Market Opportunity */}
        {/* <section className="py-20 bg-background/80 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Market Opportunity
              </h2>
              <p className="text-xl text-muted-foreground">
                Addressing a $100B+ market with significant growth potential
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Market Size',
                  description: '$100B+ TAM in professional development and career advancement',
                },
                {
                  title: 'Growth Rate',
                  description: '20%+ CAGR expected through 2030',
                },
                {
                  title: 'Target Audience',
                  description: '500M+ professionals globally',
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full bg-background/80 backdrop-blur-sm border-border/20 hover:shadow-lg transition-all">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </CardContent>
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Key Performance Metrics
              </h2>
              <p className="text-xl text-muted-foreground">
                Strong fundamentals driving sustainable growth
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {metrics.map((metric, index) => {
                const gradientMap = [
                  'from-cyan-500 to-blue-500',
                  'from-purple-500 to-pink-500',
                  'from-green-500 to-emerald-500',
                  'from-orange-500 to-amber-500'
                ];
                const gradient = gradientMap[index % gradientMap.length];
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="h-full bg-background/80 backdrop-blur-sm border-border/20 hover:shadow-lg transition-all">
                      <CardContent className="p-8 text-center">
                        <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center bg-gradient-to-r ${gradient}`}>
                          {React.cloneElement(metric.icon, { className: 'w-8 h-8 text-white' })}
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">{metric.title}</h3>
                        <div className={`text-3xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent mb-1`}>
                          {metric.value}
                        </div>
                        <div className="text-sm text-muted-foreground mb-3">{metric.period}</div>
                        <p className="text-sm text-muted-foreground">{metric.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Market Opportunity */}
        <section className="py-20 bg-background/80 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Market Opportunity
              </h2>
              <p className="text-xl text-muted-foreground">
                Addressing a $100B+ market with significant growth potential
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Market Size',
                  description: '$100B+ TAM in professional development and career advancement',
                },
                {
                  title: 'Growth Rate',
                  description: '20%+ CAGR expected through 2030',
                },
                {
                  title: 'Target Audience',
                  description: '500M+ professionals globally',
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full bg-background/80 backdrop-blur-sm border-border/20 hover:shadow-lg transition-all">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Company Milestones */}
        <section className="py-20 bg-background/80 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Company Milestones
              </h2>
              <p className="text-xl text-muted-foreground">
                Our journey of growth and innovation
              </p>
            </motion.div>
            
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-0.5 w-0.5 h-full bg-gradient-to-b from-cyan-500 via-purple-500 to-blue-500"></div>
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <motion.div 
                    key={index}
                    className={`relative flex items-center ${
                      index % 2 === 0 ? 'justify-start' : 'justify-end'
                    }`}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className={`w-5/6 md:w-2/5 ${
                      index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'
                    }`}>
                      <Card className="bg-background/80 backdrop-blur-sm border-border/20 hover:shadow-lg transition-all">
                        <CardContent className="p-6">
                          <div className="text-sm font-semibold text-cyan-600 dark:text-cyan-400 mb-1">
                            {milestone.date}
                          </div>
                          <h3 className="text-xl font-semibold text-foreground mb-2">
                            {milestone.event}
                          </h3>
                          <p className="text-muted-foreground">{milestone.description}</p>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full border-4 border-background"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-24 bg-gradient-to-r from-cyan-500 via-purple-500 to-blue-600 text-white">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuLWJnIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgcGF0dGVyblRyYW5zZm9ybT0icm90YXRlKDQ1KSI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjcGF0dGVybi1iZykiLz48L3N2Zz4=')]" />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Join Us in Shaping the Future of Work
              </h2>
              <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
                Interested in learning more about investment opportunities? Our team would love to connect.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button 
                  size="lg" 
                  className="group bg-white text-foreground hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
                >
                  Contact Investor Relations
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="group border-white/30 bg-white/5 text-white hover:bg-white/10 transition-all"
                >
                  View Our Pitch Deck
                  <Download className="ml-2 h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    
    </div>
  );
};

export default InvestorsPage;
