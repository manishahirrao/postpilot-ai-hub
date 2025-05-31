
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { 
  ArrowRight, 
  Zap, 
  FileText, 
  Target, 
  TrendingUp, 
  PlusCircle,
  BarChart3,
  Users,
  Clock
} from 'lucide-react';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  const quickActions = [
    {
      title: 'Create LinkedIn Post',
      description: 'Generate engaging content with AI',
      icon: <Zap className="w-6 h-6 text-blue-600" />,
      link: '/dashboard/post-generator',
      color: 'from-blue-50 to-indigo-50'
    },
    {
      title: 'Upload Resume',
      description: 'Enhance your resume with AI',
      icon: <FileText className="w-6 h-6 text-green-600" />,
      link: '/dashboard/resume',
      color: 'from-green-50 to-emerald-50'
    },
    {
      title: 'Find Jobs',
      description: 'Discover matching opportunities',
      icon: <Target className="w-6 h-6 text-purple-600" />,
      link: '/dashboard/job-matcher',
      color: 'from-purple-50 to-pink-50'
    },
    {
      title: 'View Analytics',
      description: 'Track your progress',
      icon: <TrendingUp className="w-6 h-6 text-orange-600" />,
      link: '/dashboard/analytics',
      color: 'from-orange-50 to-red-50'
    }
  ];

  const recentActivity = [
    {
      action: 'Generated LinkedIn post',
      title: '"5 Key Trends in Software Development"',
      time: '2 hours ago',
      status: 'Published'
    },
    {
      action: 'Enhanced resume',
      title: 'Software Engineer Resume.pdf',
      time: '1 day ago',
      status: 'Completed'
    },
    {
      action: 'Found job matches',
      title: '12 new opportunities',
      time: '2 days ago',
      status: 'New'
    }
  ];

  const stats = [
    { label: 'Posts Generated', value: '24', change: '+8 this month' },
    { label: 'Profile Views', value: '1,247', change: '+23% vs last month' },
    { label: 'Job Matches', value: '18', change: '6 new this week' },
    { label: 'Network Growth', value: '+156', change: 'connections this month' }
  ];

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name || 'there'}! 👋
          </h1>
          <p className="text-gray-600 mt-2">
            Here's what's happening with your career growth
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-xs text-green-600 mt-2">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <PlusCircle className="w-5 h-5" />
                  <span>Quick Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {quickActions.map((action, index) => (
                    <Link key={index} to={action.link}>
                      <Card className={`hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-br ${action.color}`}>
                        <CardContent className="p-6">
                          <div className="flex items-center space-x-3 mb-3">
                            {action.icon}
                            <h3 className="font-semibold text-gray-900">{action.title}</h3>
                          </div>
                          <p className="text-gray-600 text-sm mb-4">{action.description}</p>
                          <Button variant="outline" size="sm">
                            Get Started
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Posts Preview */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Recent LinkedIn Posts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900">
                        "5 Key Trends Shaping Software Development in 2025"
                      </h4>
                      <Badge className="bg-green-100 text-green-800">Published</Badge>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">
                      The tech landscape is evolving rapidly. Here are the trends every developer should watch...
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>📈 156 views</span>
                      <span>❤️ 23 likes</span>
                      <span>💬 8 comments</span>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4 opacity-75">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900">
                        "The Importance of Continuous Learning in Tech"
                      </h4>
                      <Badge variant="outline">Draft</Badge>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">
                      In our rapidly changing industry, staying up-to-date is not just beneficial—it's essential...
                    </p>
                    <Button size="sm" variant="outline">
                      Continue Editing
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>Recent Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                        <p className="text-sm text-gray-600">{activity.title}</p>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-xs text-gray-500">{activity.time}</p>
                          <Badge variant="outline" className="text-xs">
                            {activity.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upgrade Prompt */}
            <Card className="bg-gradient-to-br from-purple-50 to-pink-50">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Unlock Advanced Features
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Upgrade to Professional for unlimited posts, advanced analytics, and priority support.
                </p>
                <Link to="/pricing">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    Upgrade Now
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Help & Resources */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/resources" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    📚 Help Center
                  </Button>
                </Link>
                <Link to="/support" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    💬 Contact Support
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start">
                  🎥 Watch Tutorials
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
