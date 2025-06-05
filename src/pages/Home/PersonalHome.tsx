
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, User, TrendingUp, Briefcase } from 'lucide-react';

const PersonalHome: React.FC = () => {
  const personalFeatures = [
    {
      icon: <FileText className="w-12 h-12 text-indigo-600" />,
      title: 'LinkedIn Post Generator',
      description: 'Create engaging LinkedIn posts that reflect your personal brand and professional expertise.',
      link: '/product/linkedin-posts'
    },
    {
      icon: <User className="w-12 h-12 text-indigo-600" />,
      title: 'Resume Builder/Enhancer',
      description: 'Build or enhance your resume with AI-powered suggestions and industry best practices.',
      link: '/product/resume-builder'
    },
    {
      icon: <Briefcase className="w-12 h-12 text-indigo-600" />,
      title: 'Profile Job Matcher',
      description: 'Match your skills and experience with relevant job opportunities automatically.',
      link: '/product/job-matcher'
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-indigo-600" />,
      title: 'Career Analytics & Tips',
      description: 'Get personalized career insights and actionable tips to advance your professional journey.',
      link: '/product/career-analytics'
    }
  ];

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Accelerate Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600"> Career</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Leverage AI-powered tools to enhance your LinkedIn presence, build standout resumes, 
            find perfect job matches, and get personalized career insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login/personal">
              <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-3">
                Get Started for Free
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="px-8 py-3">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Professional Tools for Career Growth
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to build a stronger professional presence and advance your career.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {personalFeatures.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {feature.description}
                      </p>
                      <Link to={feature.link}>
                        <Button variant="outline" size="sm">
                          Learn More
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who are already using PostPilot to advance their careers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login/personal">
              <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-50 px-8 py-3">
                Start Free Trial
              </Button>
            </Link>
            <Link to="/contact-sales">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-indigo-600 px-8 py-3">
                Book a Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PersonalHome;
