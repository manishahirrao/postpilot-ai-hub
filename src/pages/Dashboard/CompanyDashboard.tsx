
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Building2, Briefcase, Users, PenTool, Calendar, TrendingUp, MapPin } from 'lucide-react';

const CompanyDashboard: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    { label: 'Active Job Postings', value: '8', icon: Briefcase },
    { label: 'Outsourcing Requests', value: '3', icon: Users },
    { label: 'LinkedIn Posts This Month', value: '15', icon: PenTool },
    { label: 'Candidates Reviewed', value: '42', icon: TrendingUp },
  ];

  const services = [
    {
      title: 'Free Job Posting',
      description: 'Post unlimited jobs on our free job board',
      icon: Briefcase,
      href: '/product/free-job-postings',
      color: 'bg-green-500'
    },
    {
      title: 'Hiring & Outsourcing',
      description: 'Outsource your hiring process to our experts',
      icon: Users,
      href: '/product/hiring-outsourcing',
      color: 'bg-blue-500'
    },
    {
      title: 'LinkedIn Post Generation',
      description: 'Create on-brand LinkedIn content for your company',
      icon: PenTool,
      href: '/services/linkedin-posts',
      color: 'bg-purple-500'
    }
  ];

  const recentJobs = [
    { title: 'Senior Software Engineer', location: 'San Francisco, CA', applicants: 23, status: 'Active' },
    { title: 'Product Manager', location: 'Remote', applicants: 45, status: 'Active' },
    { title: 'UX Designer', location: 'New York, NY', applicants: 12, status: 'Closed' }
  ];

  const outsourcingRequests = [
    { role: 'Backend Developer', budget: '$5,000', status: 'In Progress' },
    { role: 'Marketing Manager', budget: '$3,500', status: 'Pending' },
    { role: 'Data Scientist', budget: '$7,000', status: 'Completed' }
  ];

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
              <Building2 className="w-8 h-8 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">TechCorp Dashboard</h1>
              <p className="text-gray-600">Manage your hiring and content strategy</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-indigo-600" />
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
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Business Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

            {/* Recent Job Postings */}
            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Job Postings</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {recentJobs.map((job, index) => (
                      <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">{job.title}</h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {job.location}
                            </span>
                            <span>{job.applicants} applicants</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            job.status === 'Active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {job.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4" asChild>
                    <Link to="/product/free-job-postings">Manage All Jobs</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
            
            {/* Outsourcing Requests */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-blue-500" />
                  <span>Outsourcing Requests</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {outsourcingRequests.map((request, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <p className="font-medium text-gray-900">{request.role}</p>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          request.status === 'Completed' 
                            ? 'bg-green-100 text-green-800'
                            : request.status === 'In Progress'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {request.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">Budget: {request.budget}</p>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4" asChild>
                  <Link to="/product/hiring-outsourcing">View All Requests</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" asChild>
                  <Link to="/product/free-job-postings">Post New Job</Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/services/linkedin-posts">Create LinkedIn Post</Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/product/hiring-outsourcing">Request Outsourcing</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
