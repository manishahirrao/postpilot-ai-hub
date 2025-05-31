
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Shield, Headphones, Zap, Users, Award, Lock } from 'lucide-react';

const WhyUsPage: React.FC = () => {
  const differentiators = [
    {
      icon: <Shield className="w-12 h-12 text-blue-600" />,
      title: 'Enterprise-Grade Security & Compliance',
      description: 'Your data is protected with bank-level encryption, SOC 2 compliance, and GDPR adherence. We never share your personal information with third parties.',
      features: ['256-bit SSL encryption', 'SOC 2 Type II certified', 'GDPR compliant', 'Regular security audits']
    },
    {
      icon: <Zap className="w-12 h-12 text-purple-600" />,
      title: 'Seamless LinkedIn API Integration',
      description: 'Native integration with LinkedIn\'s official APIs ensures reliable posting, data sync, and compliance with platform guidelines.',
      features: ['Official LinkedIn Partner', 'Real-time data sync', 'No risk of account suspension', 'Full API coverage']
    },
    {
      icon: <Users className="w-12 h-12 text-green-600" />,
      title: 'AI-Powered Insights Tailored to Your Role',
      description: 'Our advanced AI doesn\'t just generate content – it understands your industry, role, and career goals to provide personalized recommendations.',
      features: ['Industry-specific templates', 'Role-based optimization', 'Career stage awareness', 'Personalized learning paths']
    },
    {
      icon: <Headphones className="w-12 h-12 text-orange-600" />,
      title: 'Dedicated 24/7 Support & Knowledge Base',
      description: 'Get help when you need it with our dedicated support team, comprehensive knowledge base, and regular training sessions.',
      features: ['24/7 chat support', 'Dedicated success manager', 'Video tutorials', 'Regular webinars']
    },
    {
      icon: <Award className="w-12 h-12 text-red-600" />,
      title: 'Proven Results & ROI',
      description: 'Our customers see measurable improvements in their LinkedIn engagement, job opportunities, and career advancement.',
      features: ['Average 300% engagement increase', '2x more job interviews', '40% faster career progression', 'Money-back guarantee']
    }
  ];

  const stats = [
    { number: '50,000+', label: 'Active Users' },
    { number: '2M+', label: 'Posts Generated' },
    { number: '99.9%', label: 'Uptime' },
    { number: '4.9/5', label: 'User Rating' }
  ];

  const testimonials = [
    {
      quote: "PostPilot's security standards were crucial for our enterprise adoption. The SOC 2 compliance gave our legal team confidence.",
      author: "David Chen",
      role: "IT Director",
      company: "Fortune 500 Company"
    },
    {
      quote: "Unlike other tools, PostPilot actually understands my industry. The content suggestions are always relevant and professional.",
      author: "Sarah Martinez",
      role: "Marketing Manager",
      company: "TechStartup Inc."
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-4 bg-blue-100 text-blue-800">
            Why Choose PostPilot?
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            The Smart Choice for
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {" "}Professional Growth
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover what makes PostPilot the preferred choice for professionals and companies 
            looking to excel on LinkedIn and advance their careers with confidence and security.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth/register">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/contact-sales">
              <Button size="lg" variant="outline">
                Talk to Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Sets Us Apart
            </h2>
            <p className="text-xl text-gray-600">
              Five key differentiators that make PostPilot the smart choice for your career
            </p>
          </div>
          
          <div className="space-y-16">
            {differentiators.map((item, index) => (
              <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}>
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="mb-6">{item.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                  <p className="text-lg text-gray-600 mb-6">{item.description}</p>
                  <ul className="space-y-2">
                    {item.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <Card className="bg-white shadow-lg">
                    <CardContent className="p-8">
                      {index === 0 && (
                        <div className="space-y-4">
                          <div className="flex items-center space-x-3">
                            <Lock className="w-6 h-6 text-blue-600" />
                            <span className="font-semibold">Enterprise Security</span>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="bg-blue-50 p-3 rounded">
                              <div className="font-medium text-blue-900">SOC 2 Type II</div>
                              <div className="text-blue-700">Certified</div>
                            </div>
                            <div className="bg-green-50 p-3 rounded">
                              <div className="font-medium text-green-900">GDPR</div>
                              <div className="text-green-700">Compliant</div>
                            </div>
                            <div className="bg-purple-50 p-3 rounded">
                              <div className="font-medium text-purple-900">256-bit SSL</div>
                              <div className="text-purple-700">Encryption</div>
                            </div>
                            <div className="bg-orange-50 p-3 rounded">
                              <div className="font-medium text-orange-900">Regular</div>
                              <div className="text-orange-700">Audits</div>
                            </div>
                          </div>
                        </div>
                      )}
                      {index === 1 && (
                        <div className="space-y-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                              <span className="text-white font-bold text-sm">in</span>
                            </div>
                            <span className="font-semibold">Official LinkedIn Partner</span>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>API Rate Limit</span>
                              <span className="text-green-600 font-medium">Unlimited</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Data Sync</span>
                              <span className="text-green-600 font-medium">Real-time</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Account Safety</span>
                              <span className="text-green-600 font-medium">Guaranteed</span>
                            </div>
                          </div>
                        </div>
                      )}
                      {index === 2 && (
                        <div className="space-y-4">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-purple-600">AI Engine</div>
                            <div className="text-sm text-gray-600">Industry-Aware</div>
                          </div>
                          <div className="space-y-2">
                            <div className="bg-gray-100 p-2 rounded text-sm">
                              <span className="font-medium">Your Role:</span> Software Engineer
                            </div>
                            <div className="bg-gray-100 p-2 rounded text-sm">
                              <span className="font-medium">Industry:</span> Technology
                            </div>
                            <div className="bg-gray-100 p-2 rounded text-sm">
                              <span className="font-medium">Experience:</span> 5+ years
                            </div>
                            <div className="bg-purple-50 p-2 rounded text-sm text-purple-700">
                              <span className="font-medium">AI Recommendation:</span> Focus on leadership content
                            </div>
                          </div>
                        </div>
                      )}
                      {index === 3 && (
                        <div className="space-y-4">
                          <div className="flex items-center space-x-3">
                            <Headphones className="w-6 h-6 text-orange-600" />
                            <span className="font-semibold">24/7 Support</span>
                          </div>
                          <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                              <span className="text-sm">Live chat available</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                              <span className="text-sm">Response time: &lt; 5 minutes</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                              <span className="text-sm">Success manager assigned</span>
                            </div>
                          </div>
                        </div>
                      )}
                      {index === 4 && (
                        <div className="space-y-4">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-green-600">300%</div>
                            <div className="text-sm text-gray-600">Avg. Engagement Increase</div>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="text-center">
                              <div className="text-xl font-bold text-blue-600">2x</div>
                              <div className="text-gray-600">More Interviews</div>
                            </div>
                            <div className="text-center">
                              <div className="text-xl font-bold text-purple-600">40%</div>
                              <div className="text-gray-600">Faster Growth</div>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Industry Leaders
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-gradient-to-br from-blue-50 to-purple-50">
                <CardContent className="p-8">
                  <p className="text-lg text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.author}</p>
                    <p className="text-gray-600">{testimonial.role} at {testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Experience the PostPilot difference
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of professionals who trust PostPilot with their career growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth/register">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/contact-sales">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
                Schedule Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyUsPage;
