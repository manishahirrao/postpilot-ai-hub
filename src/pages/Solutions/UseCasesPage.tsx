
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, User, Building, CheckCircle, TrendingUp, Users, Target } from 'lucide-react';

const UseCasesPage: React.FC = () => {
  const professionalBenefits = [
    'Build authentic personal brand',
    'Increase network engagement by 300%',
    'Get discovered by recruiters',
    'Land better job opportunities',
    'Share industry insights effectively',
    'Establish thought leadership'
  ];

  const companyBenefits = [
    'Automate company page updates',
    'Showcase company culture',
    'Generate recruiting content',
    'Increase brand awareness',
    'Engage with industry talent',
    'Drive website traffic'
  ];

  const professionalTestimonials = [
    {
      quote: "PostPilot helped me transition from individual contributor to team lead. The content suggestions were perfect for establishing my thought leadership.",
      author: "Alex Thompson",
      role: "Senior Software Engineer → Team Lead",
      company: "Microsoft",
      result: "Promoted in 8 months"
    },
    {
      quote: "I went from 200 to 5,000 LinkedIn connections in 6 months. The job opportunities started flowing in naturally.",
      author: "Maria Rodriguez",
      role: "Marketing Manager",
      company: "Spotify",
      result: "3x more interview invites"
    }
  ];

  const companyTestimonials = [
    {
      quote: "Our engineering team's LinkedIn presence improved dramatically. We're now seen as a top employer in our city.",
      author: "Sarah Kim",
      role: "Head of People",
      company: "TechStartup Inc.",
      result: "50% reduction in recruiting costs"
    },
    {
      quote: "PostPilot's company content generator helped us maintain consistent messaging across all our executives' profiles.",
      author: "David Chen",
      role: "VP Marketing",
      company: "ScaleUp Corp",
      result: "200% increase in brand mentions"
    }
  ];

  const professionalUseCases = [
    {
      title: "Job Seekers",
      description: "Stand out in a competitive market",
      features: ["Resume optimization", "Job matching", "Interview prep content", "Network building"]
    },
    {
      title: "Career Changers",
      description: "Transition to new industries smoothly",
      features: ["Industry insights", "Skill gap analysis", "Transition storytelling", "Network expansion"]
    },
    {
      title: "Thought Leaders",
      description: "Establish expertise and influence",
      features: ["Content ideation", "Industry trends", "Engagement strategies", "Speaking opportunities"]
    },
    {
      title: "Sales Professionals",
      description: "Build trust and generate leads",
      features: ["Relationship building", "Industry credibility", "Lead generation", "Trust building"]
    }
  ];

  const companyUseCases = [
    {
      title: "Recruiting Teams",
      description: "Attract top talent organically",
      features: ["Employer branding", "Culture showcasing", "Talent attraction", "Recruiting content"]
    },
    {
      title: "Marketing Teams",
      description: "Amplify brand reach and engagement",
      features: ["Brand awareness", "Content amplification", "Audience engagement", "Lead generation"]
    },
    {
      title: "Executive Teams",
      description: "Build executive presence and credibility",
      features: ["Thought leadership", "Industry influence", "Executive branding", "Strategic messaging"]
    },
    {
      title: "Sales Teams",
      description: "Social selling and relationship building",
      features: ["Social selling", "Prospect engagement", "Relationship nurturing", "Sales enablement"]
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-4 bg-green-100 text-green-800">
            Solutions by Use Case
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Perfect Solution for
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
              {" "}Every Professional
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Whether you're a working professional looking to grow your network or a company 
            wanting to enhance your brand presence, we have the right solution tailored to your needs.
          </p>
        </div>
      </section>

      {/* Use Case Tabs */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="professionals" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-16">
              <TabsTrigger value="professionals" className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>For Professionals</span>
              </TabsTrigger>
              <TabsTrigger value="companies" className="flex items-center space-x-2">
                <Building className="w-4 h-4" />
                <span>For Companies</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="professionals">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    Accelerate Your Career Growth
                  </h2>
                  <p className="text-lg text-gray-600 mb-8">
                    Build your personal brand, expand your network, and unlock better career opportunities 
                    with AI-powered content that resonates with your professional audience.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    {professionalBenefits.map((benefit, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link to="/auth/register">
                      <Button size="lg" className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                        Start Building Your Brand
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
                    <Link to="/pricing">
                      <Button size="lg" variant="outline">
                        View Pricing
                      </Button>
                    </Link>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <Card className="bg-gradient-to-br from-green-50 to-blue-50">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <TrendingUp className="w-6 h-6 text-green-600" />
                        <h3 className="font-semibold text-gray-900">Career Growth</h3>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Network Growth</span>
                          <span className="text-green-600 font-medium">+300%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Profile Views</span>
                          <span className="text-green-600 font-medium">+250%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Job Opportunities</span>
                          <span className="text-green-600 font-medium">+400%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <blockquote className="text-gray-700 italic mb-4">
                        "PostPilot helped me position myself as a thought leader in my industry. 
                        I now get approached by recruiters weekly."
                      </blockquote>
                      <div>
                        <p className="font-semibold text-gray-900">Jennifer Walsh</p>
                        <p className="text-sm text-gray-600">Senior Product Manager at Google</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Professional Use Cases */}
              <div className="mb-20">
                <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                  Tailored for Your Professional Journey
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {professionalUseCases.map((useCase, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="text-lg">{useCase.title}</CardTitle>
                        <p className="text-sm text-gray-600">{useCase.description}</p>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {useCase.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                              <span className="text-sm text-gray-700">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Professional Testimonials */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                  Success Stories from Professionals
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {professionalTestimonials.map((testimonial, index) => (
                    <Card key={index} className="bg-gradient-to-br from-green-50 to-blue-50">
                      <CardContent className="p-8">
                        <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
                        <div className="flex justify-between items-end">
                          <div>
                            <p className="font-semibold text-gray-900">{testimonial.author}</p>
                            <p className="text-sm text-gray-600">{testimonial.role}</p>
                            <p className="text-sm text-gray-600">{testimonial.company}</p>
                          </div>
                          <Badge className="bg-green-100 text-green-800">
                            {testimonial.result}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="companies">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    Amplify Your Company's Voice
                  </h2>
                  <p className="text-lg text-gray-600 mb-8">
                    Scale your company's LinkedIn presence with consistent, engaging content that 
                    showcases your culture, attracts top talent, and builds brand authority in your industry.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    {companyBenefits.map((benefit, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
                        <span className="text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link to="/contact-sales">
                      <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                        Schedule Demo
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
                    <Link to="/pricing">
                      <Button size="lg" variant="outline">
                        View Enterprise Pricing
                      </Button>
                    </Link>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <Card className="bg-gradient-to-br from-blue-50 to-purple-50">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <Users className="w-6 h-6 text-blue-600" />
                        <h3 className="font-semibold text-gray-900">Company Impact</h3>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Brand Awareness</span>
                          <span className="text-blue-600 font-medium">+200%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Recruiting Efficiency</span>
                          <span className="text-blue-600 font-medium">+150%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Employee Advocacy</span>
                          <span className="text-blue-600 font-medium">+300%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <blockquote className="text-gray-700 italic mb-4">
                        "PostPilot helped us build a strong employer brand. We're now considered 
                        a top workplace in our industry."
                      </blockquote>
                      <div>
                        <p className="font-semibold text-gray-900">Michael Chang</p>
                        <p className="text-sm text-gray-600">Chief People Officer at InnovateLab</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Company Use Cases */}
              <div className="mb-20">
                <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                  Solutions for Every Team
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {companyUseCases.map((useCase, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="text-lg">{useCase.title}</CardTitle>
                        <p className="text-sm text-gray-600">{useCase.description}</p>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {useCase.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                              <span className="text-sm text-gray-700">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Company Testimonials */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                  Enterprise Success Stories
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {companyTestimonials.map((testimonial, index) => (
                    <Card key={index} className="bg-gradient-to-br from-blue-50 to-purple-50">
                      <CardContent className="p-8">
                        <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
                        <div className="flex justify-between items-end">
                          <div>
                            <p className="font-semibold text-gray-900">{testimonial.author}</p>
                            <p className="text-sm text-gray-600">{testimonial.role}</p>
                            <p className="text-sm text-gray-600">{testimonial.company}</p>
                          </div>
                          <Badge className="bg-blue-100 text-blue-800">
                            {testimonial.result}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to see PostPilot in action?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Choose your path and start achieving your professional goals today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth/register">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                Start as Professional
                <User className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/contact-sales">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-green-600">
                Enterprise Demo
                <Building className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UseCasesPage;
