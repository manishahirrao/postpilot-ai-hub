
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, BarChart3, TrendingUp, Target, CheckCircle, Users, Award, BookOpen } from 'lucide-react';

const CareerAnalyticsPage: React.FC = () => {
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

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-gradient-to-r from-indigo-600 to-purple-600">
                Career Analytics & Tips
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Get Insights to Accelerate Your Career
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Understand where you stand in the market, identify skill gaps, and get 
                personalized recommendations to advance your career. Make data-driven 
                decisions about your professional growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/auth/register">
                  <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-purple-700 hover:to-pink-700">
                    View Dashboard
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline">
                  See Sample Report
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <Card className="bg-white shadow-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-6 h-6 text-purple-600" />
                    <span>Skills Analysis</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {skillsData.slice(0, 3).map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-900">{item.skill}</span>
                        <span className="text-sm text-gray-600">{item.userLevel}% / {item.marketDemand}%</span>
                      </div>
                      <div className="relative">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-purple-600 h-2 rounded-full"
                            style={{ width: `${item.userLevel}%` }}
                          ></div>
                          <div 
                            className="absolute top-0 bg-orange-400 h-2 rounded-full opacity-50"
                            style={{ width: `${item.marketDemand}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>Your Level</span>
                          <span>Market Demand</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics Dashboard Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Skills vs Market Demand</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {skillsData.map((item, index) => (
                    <div key={index} className="space-y-2">
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
                          ></div>
                          <div 
                            className="absolute top-0 bg-orange-400 h-3 rounded-full opacity-60"
                            style={{ width: `${item.marketDemand}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>Your Level ({item.userLevel}%)</span>
                          <span>Market Demand ({item.marketDemand}%)</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Insights Panel */}
            <Card>
              <CardHeader>
                <CardTitle>AI Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {insights.map((insight, index) => (
                  <div key={index} className="border-l-4 border-purple-300 pl-4">
                    <div className="flex items-center space-x-2 mb-1">
                      {insight.icon}
                      <h4 className="font-semibold text-sm">{insight.title}</h4>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{insight.description}</p>
                    <Button size="sm" variant="outline" className="text-xs">
                      {insight.action}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Comprehensive career intelligence
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <BarChart3 className="w-6 h-6 text-purple-600" />
                    <h3 className="font-semibold text-gray-900">Market Intelligence</h3>
                  </div>
                  <p className="text-gray-600">
                    Stay ahead with real-time insights about industry trends, salary benchmarks, and in-demand skills.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
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
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <Users className="w-6 h-6 text-green-600" />
                    <h3 className="font-semibold text-gray-900">Networking Insights</h3>
                  </div>
                  <p className="text-gray-600">
                    Discover key people in your industry and get suggestions for expanding your professional network.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Metrics */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Track Your Progress
            </h2>
            <p className="text-xl text-gray-600">
              Monitor key metrics that matter for your career growth
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-purple-600 mb-2">85%</div>
                <div className="text-sm text-gray-600">Market Readiness</div>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-green-600 mb-2">$120k</div>
                <div className="text-sm text-gray-600">Target Salary</div>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-blue-600 mb-2">12</div>
                <div className="text-sm text-gray-600">Skills Identified</div>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-orange-600 mb-2">3</div>
                <div className="text-sm text-gray-600">Priority Areas</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Make data-driven career decisions
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Get the insights you need to accelerate your professional growth and achieve your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth/register">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                View Analytics
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-purple-600">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CareerAnalyticsPage;
