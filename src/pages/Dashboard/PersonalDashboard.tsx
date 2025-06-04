
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { FileText, Briefcase, TrendingUp, PenTool, Star, Users, Award } from 'lucide-react';

const PersonalDashboard: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    { label: 'LinkedIn Posts Generated', value: '12', icon: PenTool },
    { label: 'Resume Enhancements', value: '3', icon: FileText },
    { label: 'Job Matches Found', value: '28', icon: Briefcase },
    { label: 'Career Tips Read', value: '15', icon: TrendingUp },
  ];

  const services = [
    {
      title: 'LinkedIn Post Generation',
      description: 'Create engaging LinkedIn posts with AI assistance',
      icon: PenTool,
      href: '/services/linkedin-posts',
      color: 'bg-blue-500'
    },
    {
      title: 'Resume Builder/Enhancer',
      description: 'Optimize your resume with AI-powered suggestions',
      icon: FileText,
      href: '/services/resume-builder',
      color: 'bg-green-500'
    },
    {
      title: 'Profile & Job Matcher',
      description: 'Find jobs that match your skills and experience',
      icon: Briefcase,
      href: '/services/job-matcher',
      color: 'bg-purple-500'
    },
    {
      title: 'Career Analytics & Tips',
      description: 'Get insights and tips to advance your career',
      icon: TrendingUp,
      href: '/services/career-analytics',
      color: 'bg-orange-500'
    }
  ];

  const recentMatches = [
    { title: 'Senior Frontend Developer', company: 'TechCorp', match: '92%' },
    { title: 'Product Manager', company: 'InnovateCo', match: '88%' },
    { title: 'UX Designer', company: 'DesignStudio', match: '85%' }
  ];

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
              <p className="text-gray-600">{user?.headline}</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Services Grid */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Career Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((service, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 ${service.color} rounded-lg flex items-center justify-center`}>
                        <service.icon className="w-5 h-5 text-white" />
                      </div>
                      <CardTitle className="text-lg">{service.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <Button asChild className="w-full">
                      <Link to={service.href}>Go to Tool</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Recent Activity Sidebar */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
            
            {/* Top Job Matches */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span>Top Job Matches</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentMatches.map((job, index) => (
                    <div key={index} className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">{job.title}</p>
                        <p className="text-sm text-gray-600">{job.company}</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Award className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-medium text-green-600">{job.match}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4" asChild>
                  <Link to="/services/job-matcher">View All Matches</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Recent Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Career Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium text-blue-900">Optimize Your LinkedIn Profile</p>
                    <p className="text-xs text-blue-700">2 days ago</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm font-medium text-green-900">Network Effectively</p>
                    <p className="text-xs text-green-700">5 days ago</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <p className="text-sm font-medium text-purple-900">Interview Preparation</p>
                    <p className="text-xs text-purple-700">1 week ago</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4" asChild>
                  <Link to="/services/career-analytics">View All Tips</Link>
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
