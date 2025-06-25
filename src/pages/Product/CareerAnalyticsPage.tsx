import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, BarChart3, TrendingUp, Target, Users, Award, BookOpen } from 'lucide-react';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import { motion } from 'framer-motion';
import { useTheme } from '@/components/ThemeProvider';

// Add animation styles
const styles = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .animate-fade-in {
    animation: fadeIn 0.5s ease-out forwards;
  }
`;

// Design system components
const PageSection = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <section className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
    {children}
  </section>
);

const Animated = ({ 
  children, 
  delay = 0, 
  className = '' 
}: { 
  children: React.ReactNode; 
  delay?: number; 
  className?: string 
}) => (
  <div 
    className={`opacity-0 animate-fade-in ${className}`}
    style={{ animationDelay: `${delay}s` }}
  >
    {children}
  </div>
);

const CareerAnalyticsPage: React.FC = () => {
  // Add style tag for animations
  React.useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);
  const skillsData = [
    { skill: 'React', userLevel: 85, marketDemand: 92, gap: 7 },
    { skill: 'Node.js', userLevel: 78, marketDemand: 88, gap: 10 },
    { skill: 'Python', userLevel: 65, marketDemand: 95, gap: 30 },
    { skill: 'AWS', userLevel: 45, marketDemand: 89, gap: 44 },
    { skill: 'Docker', userLevel: 60, marketDemand: 82, gap: 22 }
  ];

  const insights = [
    {
      icon: <TrendingUp className="w-6 h-6 text-green-600" />,
      title: 'Growing in Demand',
      description: 'Your React skills are highly valued in the current market',
      action: 'Keep building React projects'
    },
    {
      icon: <Target className="w-6 h-6 text-orange-600" />,
      title: 'Skill Gap Identified',
      description: 'Learning Python could increase your salary by 25%',
      action: 'Start Python course'
    },
    {
      icon: <Award className="w-6 h-6 text-blue-600" />,
      title: 'Career Milestone',
      description: 'You qualify for Senior Engineer positions',
      action: 'Update LinkedIn title'
    }
  ];

  const features = [
    'Skills gap analysis',
    'Market demand tracking',
    'Salary benchmarking',
    'Career progression roadmap',
    'Learning recommendations',
    'Industry trend insights',
    'Networking suggestions',
    'Goal tracking & milestones'
  ];

  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen flex flex-col ${isDark ? 'bg-gray-950 text-white' : 'bg-white text-gray-900'}`}>
      <Navbar />
      <main className="flex-1 relative overflow-hidden pt-24">
        {/* Add a root container with minimum height */}
        <div className={`min-h-[calc(100vh-6rem)] ${isDark ? 'bg-gray-950' : 'bg-white'}`}>
        {/* Hero Section */}
        <section className={`relative py-24 overflow-hidden ${isDark ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50'}`}>
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/10 via-purple-300/10 to-pink-300/10" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[600px] opacity-20 rounded-full bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 blur-3xl" />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
                Career Analytics & Tips
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 bg-clip-text text-transparent mb-6">
                Get Insights to Accelerate Your Career
              </h1>
              <p className="text-xl text-gray-700 mb-8">
                Understand where you stand in the market, identify skill gaps, and get 
                personalized recommendations to advance your career. Make data-driven 
                decisions about your professional growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/auth/register">
                  <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg">
                    View Dashboard
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="border-indigo-300 text-indigo-700">
                  See Sample Report
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <Card className="bg-white shadow-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-6 h-6 text-purple-600" />
                    <span>Skills Analysis</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {skillsData.slice(0, 3).map((item, index) => (
                    <Animated key={index} delay={0.3 + (index * 0.1)} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-900">{item.skill}</span>
                        <span className="text-sm text-gray-600">{item.userLevel}% / {item.marketDemand}%</span>
                      </div>
                      <div className="relative">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-purple-600 h-2 rounded-full"
                            style={{ width: `${item.userLevel}%` }}
                          />
                          <div 
                            className="absolute top-0 bg-orange-400 h-2 rounded-full opacity-50"
                            style={{ width: `${item.marketDemand}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>Your Level</span>
                          <span>Market Demand</span>
                        </div>
                      </div>
                    </Animated>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Analytics Dashboard Preview */}
        <PageSection className={`py-20 ${isDark ? 'bg-gray-950' : 'bg-white'}`}>
          <Animated delay={0.2}>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Your Personalized Career Dashboard
              </h2>
              <p className="text-xl text-gray-600">
                Get detailed insights about your career progress and market position
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Skills Analysis Chart */}
              <Animated delay={0.3} className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Skills vs Market Demand</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {skillsData.map((item, index) => (
                        <Animated key={index} delay={0.4 + (index * 0.1)} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-gray-900">{item.skill}</span>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-gray-600">Gap: {item.gap}%</span>
                              {item.gap > 20 && (
                                <Badge variant="destructive" className="text-xs">Priority</Badge>
                              )}
                            </div>
                          </div>
                          <div className="relative">
                            <div className="w-full bg-gray-200 rounded-full h-3">
                              <div 
                                className="bg-blue-600 h-3 rounded-full"
                                style={{ width: `${item.userLevel}%` }}
                              />
                              <div 
                                className="absolute top-0 bg-orange-400 h-3 rounded-full opacity-60"
                                style={{ width: `${item.marketDemand}%` }}
                              />
                            </div>
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                              <span>Your Level ({item.userLevel}%)</span>
                              <span>Market Demand ({item.marketDemand}%)</span>
                            </div>
                          </div>
                        </Animated>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Animated>

              {/* Insights Panel */}
              <Animated delay={0.5}>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>AI Insights</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {insights.map((insight, index) => (
                      <Animated key={index} delay={0.6 + (index * 0.1)} className="border-l-4 border-purple-300 pl-4 py-2">
                        <div className="flex items-center space-x-2 mb-1">
                          {insight.icon}
                          <h4 className="font-semibold text-sm">{insight.title}</h4>
                        </div>
                        <p className="text-xs text-gray-600 mb-2">{insight.description}</p>
                        <Button size="sm" variant="outline" className="text-xs">
                          {insight.action}
                        </Button>
                      </Animated>
                    ))}
                  </CardContent>
                </Card>
              </Animated>
            </div>
          </Animated>
        </PageSection>

        {/* Features Section */}
        <PageSection className={`py-20 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <Animated delay={0.3}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Comprehensive career intelligence
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {features.map((feature, index) => (
                    <Animated key={index} delay={0.4 + (index * 0.05)} className="flex items-center space-x-2">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </Animated>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Animated delay={0.5} className="space-y-4">
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3 mb-3">
                        <BarChart3 className="w-6 h-6 text-purple-600" />
                        <h3 className="font-semibold text-gray-900">Market Trends</h3>
                      </div>
                      <p className="text-gray-600">
                        Stay ahead with real-time insights about industry trends, salary benchmarks, and in-demand skills.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3 mb-3">
                        <BookOpen className="w-6 h-6 text-blue-600" />
                        <h3 className="font-semibold text-gray-900">Learning Paths</h3>
                      </div>
                      <p className="text-gray-600">
                        Get personalized learning recommendations to bridge skill gaps and advance your career.
                      </p>
                    </CardContent>
                  </Card>
                </Animated>
                
                <Animated delay={0.6} className="space-y-4">
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3 mb-3">
                        <Users className="w-6 h-6 text-green-600" />
                        <h3 className="font-semibold text-gray-900">Networking</h3>
                      </div>
                      <p className="text-gray-600">
                        Discover key people in your industry and get suggestions for expanding your professional network.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3 mb-3">
                        <Award className="w-6 h-6 text-orange-600" />
                        <h3 className="font-semibold text-gray-900">Career Goals</h3>
                      </div>
                      <p className="text-gray-600">
                        Set and track your career goals with our smart goal-setting tools and progress tracking.
                      </p>
                    </CardContent>
                  </Card>
                </Animated>
              </div>
            </div>
          </Animated>
        </PageSection>

        {/* CTA Section */}
        <section className={`py-24 relative ${
          isDark 
            ? 'bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900' 
            : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600'
        } text-white`}>
          {/* Subtle pattern overlay */}
          <div className={`absolute inset-0 ${
            isDark ? 'opacity-20' : 'opacity-10'
          }`}>
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
                Make data-driven career decisions
              </h2>
              <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
                Get the insights you need to accelerate your professional growth and achieve your goals.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/auth/register">
                  <Button 
                    size="lg" 
                    className={`${
                      isDark 
                        ? 'bg-white text-purple-700 hover:bg-gray-100' 
                        : 'bg-white text-purple-600 hover:bg-gray-50'
                    } transition-all shadow-lg hover:shadow-xl`}
                  >
                    View Analytics
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className={`${
                      isDark 
                        ? 'text-white border-white/60 hover:bg-white/10 hover:border-white' 
                        : 'text-white border-white hover:bg-white/10 hover:border-white/80'
                    } transition-all`}
                  >
                    View Pricing
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CareerAnalyticsPage;