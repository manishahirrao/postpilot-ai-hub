
import * as React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Users, Globe, Award, ArrowRight, Download } from 'lucide-react';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import { ComplexOrbitalSystem } from '@/components/OrbitalSystem';

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
    { date: 'Q1 2025', event: 'Company Founded', description: 'PostPilot incorporated with founding team' },
    { date: 'Q3 2025', event: 'Product Launch', description: 'Beta launch with 1,000 early users' },
    { date: 'Q4 2025', event: 'Market Validation', description: 'Achieved product-market fit metrics' },
  ];

  return (
    <div className="min-h-screen flex flex-col hero-gradient">
      <Navbar />
      <main className="flex-1 relative overflow-hidden pt-24">
        {/* Hero Section */}
        <section className="relative py-24">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-blue-500/5" />
            <ComplexOrbitalSystem className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[600px] opacity-30" />
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                Investor
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-purple-500 to-blue-500">
                  {" "}Relations
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                PostPilot is backed by world-class investors who share our vision of democratizing 
                professional success through AI-powered career tools.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="group bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transition-all"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Investment Deck
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="group"
                >
                  Contact Investor Relations
                  <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </Button>
              </div>
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
      <Footer />
    </div>
  );
};

export default InvestorsPage;
