
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, DollarSign, Users, Coffee, Laptop, Heart, TrendingUp, IndianRupee } from 'lucide-react';

const CareersPage: React.FC = () => {
  const openPositions = [
    {
      title: 'Senior Software Engineer',
      department: 'Engineering',
      location: 'San Francisco, CA / Remote',
      type: 'Full-time',
      salary: '130k - 180k',
      description: 'Join our engineering team to build the next generation of AI-powered career tools.',
      requirements: ['5+ years of React/Node.js experience', 'Experience with AI/ML systems', 'Strong CS fundamentals'],
      posted: '2 days ago'
    },
    {
      title: 'Product Marketing Manager',
      department: 'Marketing',
      location: 'New York, NY / Remote',
      type: 'Full-time',
      salary: '90k - 130k',
      description: 'Drive product marketing strategy and go-to-market execution for our AI features.',
      requirements: ['3+ years product marketing experience', 'B2B SaaS background', 'Data-driven mindset'],
      posted: '1 week ago'
    },
    {
      title: 'UX/UI Designer',
      department: 'Design',
      location: 'Austin, TX / Remote',
      type: 'Full-time',
      salary: '85k - 120k',
      description: 'Design intuitive user experiences for our AI-powered career advancement platform.',
      requirements: ['4+ years UX/UI design experience', 'Figma proficiency', 'User research skills'],
      posted: '3 days ago'
    },
    {
      title: 'Customer Success Manager',
      department: 'Customer Success',
      location: 'Chicago, IL / Remote',
      type: 'Full-time',
      salary: '70k - 95k',
      description: 'Help our enterprise customers achieve success with PostPilot\'s platform.',
      requirements: ['2+ years customer success experience', 'SaaS experience preferred', 'Excellent communication'],
      posted: '5 days ago'
    },
    {
      title: 'AI/ML Engineer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      salary: '150k - 200k',
      description: 'Build and improve our AI models for content generation and job matching.',
      requirements: ['PhD or MS in CS/ML', 'Experience with LLMs', 'Python/PyTorch expertise'],
      posted: '1 day ago'
    }
  ];

  const benefits = [
    {
      icon: <Heart className="w-6 h-6 text-red-500" />,
      title: 'Health & Wellness',
      description: 'Comprehensive health, dental, and vision insurance plus wellness stipend'
    },
    {
      icon: <Laptop className="w-6 h-6 text-blue-500" />,
      title: 'Remote-First',
      description: 'Work from anywhere with flexible hours and home office setup allowance'
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-green-500" />,
      title: 'Growth & Learning',
      description: '$2,000 annual learning budget and mentorship programs'
    },
    {
      icon: <Coffee className="w-6 h-6 text-orange-500" />,
      title: 'Work-Life Balance',
      description: 'Unlimited PTO, parental leave, and mental health support'
    },
    {
      icon: <Users className="w-6 h-6 text-purple-500" />,
      title: 'Equity Package',
      description: 'Competitive equity compensation for all employees'
    },
    {
      icon: <IndianRupee className="w-6 h-6 text-yellow-500" />,
      title: 'Competitive Pay',
      description: 'Market-leading salaries with annual reviews and bonuses'
    }
  ];

  const values = [
    'Innovation & Excellence',
    'Diversity & Inclusion',
    'Transparency & Trust',
    'Customer Obsession',
    'Continuous Learning',
    'Work-Life Balance'
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Build the Future of
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
              {" "}Career Technology
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join our mission to democratize professional success. We're looking for passionate 
            individuals who want to make a real impact on millions of careers worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              View Open Positions
            </Button>
            <Button size="lg" variant="outline">
              Learn About Our Culture
            </Button>
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Join PostPilot?
            </h2>
            <p className="text-xl text-gray-600">
              More than just a job - it's an opportunity to shape the future of work
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="mb-4">{benefit.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Values Drive Everything We Do
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                We're building more than a product - we're creating a culture where everyone 
                can thrive and do their best work while making a meaningful impact on the world.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {values.map((value, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    <span className="text-gray-700">{value}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <Card className="bg-gradient-to-br from-purple-50 to-blue-50">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Life at PostPilot</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Team Size</span>
                      <span className="font-medium">45 people</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Average Age</span>
                      <span className="font-medium">32 years</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Remote Workers</span>
                      <span className="font-medium">80%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Countries</span>
                      <span className="font-medium">12</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Diversity</span>
                      <span className="font-medium">60% underrepresented</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Open Positions
            </h2>
            <p className="text-xl text-gray-600">
              Find your next career opportunity with us
            </p>
          </div>
          
          <div className="space-y-6">
            {openPositions.map((position, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{position.title}</h3>
                        <Badge variant="outline">{position.department}</Badge>
                        <Badge variant="secondary">{position.type}</Badge>
                      </div>
                      
                      <div className="flex items-center space-x-6 text-gray-600 mb-4">
                        <span className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {position.location}
                        </span>
                        <span className="flex items-center">
                          <IndianRupee className="w-4 h-4 mr-1" />
                          {position.salary}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          Posted {position.posted}
                        </span>
                      </div>
                      
                      <p className="text-gray-700 mb-4">{position.description}</p>
                      
                      <div className="space-y-2">
                        <h4 className="font-medium text-gray-900">Key Requirements:</h4>
                        <ul className="list-disc list-inside text-gray-600 space-y-1">
                          {position.requirements.map((req, reqIndex) => (
                            <li key={reqIndex} className="text-sm">{req}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-6 lg:mt-0 lg:ml-8">
                      <Button className="w-full lg:w-auto bg-purple-600 hover:bg-purple-700">
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Don't see a role that fits? We're always looking for talented people.
            </p>
            <Button variant="outline" size="lg">
              Send Us Your Resume
            </Button>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-20 bg-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Hiring Process
            </h2>
            <p className="text-xl text-gray-600">
              Transparent, fair, and designed to find the best mutual fit
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 font-bold text-xl">1</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Application Review</h3>
              <p className="text-gray-600">We review your application within 48 hours</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold text-xl">2</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Initial Screen</h3>
              <p className="text-gray-600">30-minute call with our recruiting team</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 font-bold text-xl">3</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Team Interviews</h3>
              <p className="text-gray-600">Meet the team and showcase your skills</p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-orange-600 font-bold text-xl">4</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Final Decision</h3>
              <p className="text-gray-600">Reference checks and offer within 1 week</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to make an impact?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Join our team and help build the future of professional success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
              Browse All Positions
            </Button>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-purple-600">
                Contact Recruiting Team
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CareersPage;
