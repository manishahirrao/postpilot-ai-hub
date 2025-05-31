
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Target, Heart, Users, Award } from 'lucide-react';

const AboutUsPage: React.FC = () => {
  const values = [
    {
      icon: <Target className="w-8 h-8 text-blue-600" />,
      title: 'Innovation First',
      description: 'We constantly push the boundaries of what\'s possible with AI to give our users competitive advantages.'
    },
    {
      icon: <Heart className="w-8 h-8 text-red-600" />,
      title: 'User-Centric',
      description: 'Every feature we build starts with understanding our users\' real challenges and needs.'
    },
    {
      icon: <Users className="w-8 h-8 text-green-600" />,
      title: 'Inclusive Growth',
      description: 'We believe everyone deserves equal opportunities to advance their career, regardless of background.'
    },
    {
      icon: <Award className="w-8 h-8 text-purple-600" />,
      title: 'Excellence',
      description: 'We strive for excellence in everything we do, from product quality to customer support.'
    }
  ];

  const timeline = [
    {
      year: '2023',
      title: 'Company Founded',
      description: 'PostPilot was founded with a mission to democratize professional networking and career advancement.'
    },
    {
      year: '2023',
      title: 'First 1,000 Users',
      description: 'Reached our first milestone of 1,000 active users within 6 months of launch.'
    },
    {
      year: '2024',
      title: 'AI Video Generation',
      description: 'Launched AI-powered video generation for company pages, revolutionizing LinkedIn content.'
    },
    {
      year: '2024',
      title: '50,000+ Users',
      description: 'Grew to over 50,000 professionals using PostPilot to accelerate their careers.'
    },
    {
      year: '2025',
      title: 'Series A Funding',
      description: 'Raised $15M Series A to expand our AI capabilities and global reach.'
    }
  ];

  const stats = [
    { number: '50,000+', label: 'Active Users' },
    { number: '2M+', label: 'Posts Generated' },
    { number: '150+', label: 'Countries' },
    { number: '99.9%', label: 'Uptime' }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-800">
              About PostPilot
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Empowering Careers Through
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {" "}AI Innovation
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              We're on a mission to democratize professional success by making AI-powered 
              career tools accessible to everyone, everywhere.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                To empower every professional with AI-driven tools that remove barriers to career 
                advancement and help them achieve their full potential in the modern workplace.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                We believe that career success shouldn't depend on who you know or where you went 
                to school. With the right tools and insights, anyone can build a strong professional 
                brand and find opportunities that match their skills and aspirations.
              </p>
              <Link to="/contact-sales">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Join Our Mission
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
            
            <div className="relative">
              <Card className="bg-gradient-to-br from-blue-50 to-purple-50">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                  <p className="text-gray-700 mb-6">
                    A world where every professional has equal access to career advancement 
                    opportunities, powered by intelligent technology that understands and 
                    amplifies human potential.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-gray-700">Democratize professional networking</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                      <span className="text-gray-700">Eliminate bias in hiring</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span className="text-gray-700">Accelerate career growth globally</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="mb-4 flex justify-center">{value.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600">
              Key milestones in our mission to transform careers
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-0.5 w-0.5 h-full bg-blue-200"></div>
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div key={index} className={`relative flex items-center ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                }`}>
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <Card className="bg-gradient-to-br from-blue-50 to-purple-50">
                      <CardContent className="p-6">
                        <div className="text-2xl font-bold text-blue-600 mb-2">{item.year}</div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                        <p className="text-gray-600">{item.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Preview */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Meet Our Team
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Passionate professionals dedicated to transforming careers worldwide
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">SC</span>
                </div>
                <h3 className="font-semibold text-gray-900">Sarah Chen</h3>
                <p className="text-gray-600 text-sm">CEO & Founder</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">MR</span>
                </div>
                <h3 className="font-semibold text-gray-900">Michael Rodriguez</h3>
                <p className="text-gray-600 text-sm">CTO</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">EJ</span>
                </div>
                <h3 className="font-semibold text-gray-900">Emily Johnson</h3>
                <p className="text-gray-600 text-sm">VP of Product</p>
              </CardContent>
            </Card>
          </div>
          
          <Link to="/about/management">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Meet the Full Team
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to transform your career?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of professionals who are already using PostPilot to accelerate their success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth/register">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/contact-sales">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
