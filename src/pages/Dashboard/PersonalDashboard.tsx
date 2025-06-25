import * as React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
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
  Award,
  ArrowRight,
  Calendar,
  ChevronRight,
  BarChart3
} from 'lucide-react';

// === PostPilot AI Hub: User Management Imports ===
// import ProfileEditor from '@/components/ProfileEditor';
// import PostsManager from '@/components/PostsManager';
// import CareerTipsManager from '@/components/CareerTipsManager';
// === End User Management Imports ===

const PersonalDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  // Mock data for the dashboard
  const mockUser = {
    id: 'demo_user_123',
    email: 'demo@example.com',
    email_verified: true,
    is_active: true,
    profile: {
      id: 'profile_123',
      user_id: 'demo_user_123',
      full_name: 'Demo User',
      headline: 'Frontend Demo Account',
      bio: 'This is a demo account for frontend development.',
      subscription_plan: 'demo',
      credits: 10,
      max_credits: 10,
    },
  };
  
  // Use mock user if no user is logged in (for demo purposes)
  const currentUser = user || mockUser;

  // Stats data for the dashboard
  const statsData = [
    { 
      label: 'Social Media Posts', 
      value: '12', 
      icon: PenTool,
      change: '+3 this week',
      changeType: 'positive',
      color: 'bg-gradient-to-br from-blue-500 to-blue-600'
    },
    { 
      label: 'Job Matches', 
      value: '28', 
      icon: Briefcase,
      change: '5 new',
      changeType: 'positive',
      color: 'bg-gradient-to-br from-purple-500 to-purple-600'
    },
    { 
      label: 'Career Tips', 
      value: '7', 
      icon: Star,
      change: '2 new',
      changeType: 'positive',
      color: 'bg-gradient-to-br from-yellow-500 to-yellow-600'
    }
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

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const handleLogout = () => {
    logout();
    navigate('/auth/login/personal');
  };

  const quickActions = [
    {
      title: 'Create a New Post',
      description: 'Craft a new LinkedIn post with AI-powered suggestions',
      icon: PenTool,
      href: '/Product/PersonalPostGeneration',
      color: 'bg-blue-500',
      badge: 'New',
      action: () => {}
    },
    {
      title: 'Update Your Resume',
      description: 'Polish your resume with AI-powered improvements',
      icon: FileText,
      href: '/Product/ResumeBuilderPage',
      color: 'bg-green-500',
      badge: 'Updated',
      action: () => {}
    },
    {
      title: 'Discover New Job Matches',
      description: 'Find roles that align with your skills, goals, and personality',
      icon: Briefcase,
      href: '/Product/JobMatcherPage',
      color: 'bg-purple-500',
      badge: 'Hot',
      action: () => {}
    },
    {
      title: 'Get Career Insights & Tips',
      description: 'Stay ahead with personalized career advice and growth tips',
      icon: TrendingUp,
      href: '/Product/CareerAnalyticsPage',
      color: 'bg-orange-500',
      badge: 'New',
      action: () => {}
    }
  ];



  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">PostPilot AI Hub</h1>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              {currentUser.profile?.full_name || 'Demo User'}
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/dashboard/personal/settings">Settings</Link>
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleLogout}
              className="text-gray-700 hover:bg-gray-100"
            >
              Sign out
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              {getGreeting()}, {currentUser?.profile?.full_name || 'User'}!
            </h1>
            <p className="mt-3 max-w-md mx-auto text-xl text-blue-100 sm:max-w-3xl">
              Welcome to your personal career dashboard
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {statsData.map((stat, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className={`${stat.color} p-3 rounded-lg inline-block mb-2`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg font-medium">
                    {stat.label}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className={`text-sm ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.href || '#'}
              className="block bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-200 group"
              onClick={action.action}
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${action.color} bg-opacity-10`}>
                  {action.icon && <action.icon className="h-6 w-6" />}
                </div>
                <div>
                  <h3 className="font-medium text-white">{action.title}</h3>
                  <p className="text-xs text-blue-100">{action.description}</p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-blue-200">{action.badge}</span>
                <ArrowRight className="w-4 h-4 text-blue-200 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 pb-12">
        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Your Career Tools</h2>
                <p className="text-gray-600 mt-1">Smart tools to accelerate your career success</p>
              </div>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Career Tools</h2>
                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                  <ChevronRight className="h-4 w-4 mr-1" />
                  View All
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((service, index) => (
                <Card key={index} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg overflow-hidden relative">
                  <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
                  <div className={`h-1.5 bg-gradient-to-r ${service.gradient}`}></div>
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 bg-gradient-to-r ${service.gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <service.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg font-semibold group-hover:text-blue-600 transition-colors">
                            {service.title}
                          </CardTitle>
                          <Badge className={`mt-1 ${service.badgeColor} border-0 text-xs h-5`}>
                            {service.badge}
                          </Badge>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-gray-600 mb-6 leading-relaxed text-sm">{service.description}</p>
                    <Button 
                      asChild 
                      className="w-full bg-gray-900 hover:bg-gray-800 transition-colors duration-300 group/button"
                    >
                      <Link to={service.href} className="flex items-center justify-center space-x-2">
                        <span>Launch Tool</span>
                        <ArrowRight className="w-4 h-4 group-hover/button:translate-x-1 transition-transform" />
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
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* === PostPilot AI Hub: User Management Section === */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Your Profile & Content Management</h2>
          <Button asChild variant="outline" className="flex items-center gap-2">
            <Link to="/resume-enhancer">
              Try our new Resume Enhancer
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Profile Editor</CardTitle>
              <p className="text-sm text-gray-500">Update your professional profile information</p>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Edit Profile
              </Button>
            </CardContent>
          </Card>
          {/* <ProfileEditor />
          <PostsManager />
          <CareerTipsManager /> */}
        </div>
      </div>
      {/* === End User Management Section === */}
    </div>
  );
};

export default PersonalDashboard;