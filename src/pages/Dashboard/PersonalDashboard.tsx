import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Briefcase, 
  TrendingUp, 
  PenTool, 
  Star, 
  Users, 
  Award,
  ArrowRight,
  Calendar,
  Target,
  Zap,
  ChevronRight,
  Activity,
  BarChart3
} from 'lucide-react';

const PersonalDashboard: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    { 
      label: 'Social Media Posts', 
      value: '12', 
      icon: PenTool,
      change: '+3 this week',
      changeType: 'positive',
      color: 'bg-gradient-to-br from-blue-500 to-blue-600'
    },
    { 
      label: 'Resume Updates', 
      value: '3', 
      icon: FileText,
      change: '+1 this month',
      changeType: 'positive',
      color: 'bg-gradient-to-br from-green-500 to-green-600'
    },
    { 
      label: 'Job Matches', 
      value: '28', 
      icon: Briefcase,
      change: '+5 new today',
      changeType: 'positive',
      color: 'bg-gradient-to-br from-purple-500 to-purple-600'
    },
    { 
      label: 'Career Tips', 
      value: '15', 
      icon: TrendingUp,
      change: '+2 this week',
      changeType: 'positive',
      color: 'bg-gradient-to-br from-orange-500 to-orange-600'
    },
  ];

  const services = [
    {
      title: 'LinkedIn Post Builder',
      description: 'Craft impactful, professional LinkedIn posts in seconds with AI. Grow your network, build your brand, and stay active — effortlessly.',
      icon: PenTool,
      href: '/Product/PersonalPostGeneration',
      gradient: 'from-blue-500 to-cyan-500',
      badge: 'Popular',
      badgeColor: 'bg-blue-100 text-blue-700'
    },
    {
      title: 'Resume Enhancer',
      description: 'Polish your resume with AI-powered improvements tailored to your role and industry. Get noticed by recruiters with optimized formatting and content.',
      icon: FileText,
      href: '/Product/ResumeBuilderPage',
      gradient: 'from-green-500 to-emerald-500',
      badge: 'Updated',
      badgeColor: 'bg-green-100 text-green-700'
    },
    {
      title: 'Career Match',
      description: 'Discover roles that align with your skills, goals, and personality. AI analyzes your profile and recommends jobs you\'re truly a match for.',
      icon: Briefcase,
      href: '/Product/JobMatcherPage',
      gradient: 'from-purple-500 to-pink-500',
      badge: 'Hot',
      badgeColor: 'bg-purple-100 text-purple-700'
    },
    {
      title: 'Career Insights & Tips',
      description: 'Stay ahead with personalized career advice, industry trends, and growth tips — all curated by AI to help you succeed at every step.',
      icon: TrendingUp,
      href: '/Product/CareerAnalyticsPage',
      gradient: 'from-orange-500 to-red-500',
      badge: 'New',
      badgeColor: 'bg-orange-100 text-orange-700'
    }
  ];

  const recentMatches = [
    { 
      title: 'Senior Frontend Developer', 
      company: 'TechCorp', 
      match: '92%',
      location: 'San Francisco, CA',
      salary: '$120k - $160k',
      posted: '2 days ago'
    },
    { 
      title: 'Product Manager', 
      company: 'InnovateCo', 
      match: '88%',
      location: 'New York, NY',
      salary: '$130k - $170k',
      posted: '3 days ago'
    },
    { 
      title: 'UX Designer', 
      company: 'DesignStudio', 
      match: '85%',
      location: 'Remote',
      salary: '$90k - $120k',
      posted: '1 week ago'
    }
  ];

  const recentTips = [
    {
      title: 'Optimize Your LinkedIn Profile',
      category: 'Profile',
      time: '2 days ago',
      color: 'bg-blue-50 border-blue-200',
      textColor: 'text-blue-900',
      timeColor: 'text-blue-600'
    },
    {
      title: 'Network Effectively in 2025',
      category: 'Networking',
      time: '5 days ago',
      color: 'bg-green-50 border-green-200',
      textColor: 'text-green-900',
      timeColor: 'text-green-600'
    },
    {
      title: 'Interview Preparation Checklist',
      category: 'Interview',
      time: '1 week ago',
      color: 'bg-purple-50 border-purple-200',
      textColor: 'text-purple-900',
      timeColor: 'text-purple-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
                <Users className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="text-white">
              <h1 className="text-4xl font-bold mb-2">Welcome back, {user?.name}! 👋</h1>
              <p className="text-blue-100 text-lg">{user?.headline || 'Ready to accelerate your career journey?'}</p>
              <div className="flex items-center space-x-4 mt-3">
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-green-300" />
                  <span className="text-sm text-blue-100">Active today</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-yellow-300" />
                  <span className="text-sm text-blue-100">3 goals in progress</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 pb-12">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className={`absolute inset-0 ${stat.color} opacity-5`}></div>
              <CardContent className="p-6 relative">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Services Grid */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Your Career Tools</h2>
                <p className="text-gray-600 mt-1">Powered by AI to accelerate your success</p>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                <span className="text-sm font-medium text-gray-700">AI-Powered</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((service, index) => (
                <Card key={index} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${service.gradient}`}></div>
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 bg-gradient-to-r ${service.gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <service.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                            {service.title}
                          </CardTitle>
                        </div>
                      </div>
                      <Badge className={`${service.badgeColor} border-0`}>
                        {service.badge}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                    <Button asChild className="w-full group-hover:bg-gray-900 transition-colors duration-300">
                      <Link to={service.href} className="flex items-center justify-center space-x-2">
                        <span>Launch Tool</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Top Job Matches */}
            <Card className="shadow-lg border-0 overflow-hidden">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 h-1"></div>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <span>Top Job Matches</span>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-700 border-0">
                    Hot
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  {recentMatches.map((job, index) => (
                    <div key={index} className="group p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {job.title}
                          </h4>
                          <p className="text-sm text-gray-600 mb-1">{job.company}</p>
                          <p className="text-xs text-gray-500">{job.location}</p>
                        </div>
                        <div className="flex flex-col items-end space-y-1">
                          <div className="flex items-center space-x-1">
                            <Award className="w-4 h-4 text-green-500" />
                            <span className="text-sm font-bold text-green-600">{job.match}</span>
                          </div>
                          <span className="text-xs text-gray-500">{job.posted}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">{job.salary}</span>
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-6 group" asChild>
                  <Link to="/Product/JobMatcherPage" className="flex items-center justify-center space-x-2">
                    <BarChart3 className="w-4 h-4" />
                    <span>View All Matches</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Recent Tips */}
            <Card className="shadow-lg border-0 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-400 to-purple-500 h-1"></div>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center justify-between">
                  <span>Recent Career Tips</span>
                  <Badge className="bg-blue-100 text-blue-700 border-0">
                    Fresh
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  {recentTips.map((tip, index) => (
                    <div key={index} className={`p-4 rounded-xl border-2 ${tip.color} hover:shadow-md transition-all duration-200 cursor-pointer group`}>
                      <div className="flex items-start justify-between mb-2">
                        <h4 className={`text-sm font-semibold ${tip.textColor} group-hover:underline`}>
                          {tip.title}
                        </h4>
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-all flex-shrink-0 ml-2" />
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="text-xs">
                          {tip.category}
                        </Badge>
                        <span className={`text-xs ${tip.timeColor} flex items-center space-x-1`}>
                          <Calendar className="w-3 h-3" />
                          <span>{tip.time}</span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-6 group" asChild>
                  <Link to="/Product/CareerAnalyticsPage" className="flex items-center justify-center space-x-2">
                    <TrendingUp className="w-4 h-4" />
                    <span>View All Tips</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDashboard;