
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Building2, Users, FileText } from 'lucide-react';

const CompanyHome: React.FC = () => {
  const companyFeatures = [
    {
      icon: <Building2 className="w-12 h-12 text-indigo-600" />,
      title: 'Free Job Posting',
      description: 'Post unlimited job openings on our platform and connect with top talent at no cost.',
      link: '/product/free-job-postings'
    },
    {
      icon: <Users className="w-12 h-12 text-indigo-600" />,
      title: 'Hiring Outsourcing',
      description: 'Let our expert recruiters handle your entire hiring process from screening to onboarding.',
      link: '/product/hiring-outsourcing'
    },
    {
      icon: <FileText className="w-12 h-12 text-indigo-600" />,
      title: 'LinkedIn Post Generator',
      description: 'Create on-brand LinkedIn content that showcases your company culture and attracts talent.',
      link: '/product/linkedin-posts'
    }
  ];

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Scale Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600"> Hiring</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Streamline your recruitment process with AI-powered tools for job posting, 
            hiring outsourcing, and employer branding on LinkedIn.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login/company">
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
              Complete Hiring Solutions for Modern Companies
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to attract, hire, and onboard top talent efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {companyFeatures.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8 text-center">
                  <div className="flex justify-center mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {feature.description}
                  </p>
                  <Link to={feature.link}>
                    <Button variant="outline" size="sm">
                      Learn More
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Trusted by Companies Worldwide
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-indigo-600 mb-2">10,000+</div>
              <div className="text-gray-600">Jobs Posted</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-indigo-600 mb-2">500+</div>
              <div className="text-gray-600">Companies Served</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-indigo-600 mb-2">95%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Revolutionize Your Hiring?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join hundreds of companies that have streamlined their hiring process with PostPilot.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login/company">
              <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-50 px-8 py-3">
                Start Free Trial
              </Button>
            </Link>
            <Link to="/contact-sales">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-indigo-600 px-8 py-3">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CompanyHome;
