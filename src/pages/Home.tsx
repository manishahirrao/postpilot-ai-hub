
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CheckCircle, Users, TrendingUp, Zap, Shield } from 'lucide-react';

const Home: React.FC = () => {
  const features = [
    {
      icon: <Zap className="w-8 h-8 text-indigo-600" />,
      title: 'LinkedIn Post Generation',
      description: 'Create engaging LinkedIn content with AI-powered titles, content, and images.',
      link: '/product/linkedin-posts'
    },
    {
      icon: <Users className="w-8 h-8 text-indigo-600" />,
      title: 'Resume Builder/Enhancer',
      description: 'Transform your resume with AI to make it ATS-friendly and compelling.',
      link: '/product/resume-builder'
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-indigo-600" />,
      title: 'Profile-Job Matcher',
      description: 'Find the perfect job opportunities that match your skills and experience.',
      link: '/product/job-matcher'
    },
    {
      icon: <Shield className="w-8 h-8 text-indigo-600" />,
      title: 'Career Analytics & Tips',
      description: 'Get insights and personalized recommendations to advance your career.',
      link: '/product/career-analytics'
    }
  ];

  const testimonials = [
    {
      quote: "PostPilot transformed my LinkedIn presence. I went from 10 connections to 500+ in just 3 months!",
      author: "Sarah Chen",
      role: "Software Engineer",
      company: "TechCorp"
    },
    {
      quote: "The resume builder helped me land my dream job. The AI suggestions were spot-on.",
      author: "Michael Rodriguez",
      role: "Marketing Manager",
      company: "GrowthCo"
    },
    {
      quote: "As a recruiter, the job matching feature saves me hours every week finding the right candidates.",
      author: "Emily Johnson",
      role: "Senior Recruiter",
      company: "TalentFirst"
    }
  ];

  const companyLogos = ['TechCorp', 'GrowthCo', 'InnovateLab', 'FutureWorks', 'ScaleUp'];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4 bg-indigo-100 text-indigo-800">
              🚀 Now with AI-powered video generation
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Automate Your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                {" "}LinkedIn Content Strategy
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Generate posts, build resumes, and match profiles to jobs effortlessly with AI. 
              Join thousands of professionals who've accelerated their careers with PostPilot.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth/register">
                <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-lg px-8 py-3">
                  Get Started for Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-lg px-8 py-3">
                Watch Demo
              </Button>
            </div>
          </div>
          
          {/* Hero Image/Animation Placeholder */}
          <div className="mt-16 relative">
            <div className="bg-white rounded-lg shadow-2xl p-8 max-w-4xl mx-auto">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">LinkedIn Post Generator</h3>
                  <p className="text-gray-600">AI-powered content creation</p>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-gray-700">Title generated: "5 Key Trends Shaping Software Development in 2025"</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-gray-700">Content optimized for engagement</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-gray-700">Professional image created</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 mb-8">Trusted by professionals at</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {companyLogos.map((logo, index) => (
              <div key={index} className="text-2xl font-bold text-gray-400">
                {logo}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything you need to accelerate your career
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-powered platform provides all the tools you need to build a strong professional presence and find your next opportunity.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="mb-4 flex justify-center">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
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

      {/* Solutions Teaser */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tailored solutions for every professional
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Choose PostPilot?</h3>
                <p className="text-gray-600 mb-6">
                  Discover what makes our platform the preferred choice for professionals and companies 
                  looking to excel on LinkedIn and advance their careers.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Enterprise-grade security</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">24/7 dedicated support</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">AI-powered insights</span>
                  </li>
                </ul>
                <Link to="/solutions/why-us">
                  <Button>
                    View Details
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Solutions by Use Case</h3>
                <p className="text-gray-600 mb-6">
                  Whether you're a working professional looking to grow your network or a company 
                  wanting to enhance your brand presence, we have the right solution.
                </p>
                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="font-semibold text-gray-900">For Professionals</h4>
                    <p className="text-gray-600 text-sm">Build your personal brand and find better opportunities</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">For Companies</h4>
                    <p className="text-gray-600 text-sm">Automate content and showcase your company culture</p>
                  </div>
                </div>
                <Link to="/solutions/use-cases">
                  <Button>
                    View Details
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Loved by professionals worldwide
            </h2>
            <p className="text-xl text-gray-600">
              See how PostPilot has helped thousands advance their careers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white">
                <CardContent className="p-6">
                  <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.author}</p>
                    <p className="text-sm text-gray-600">{testimonial.role} at {testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Teaser */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Simple, predictable pricing
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Choose the plan that fits your needs. Start free, upgrade when you're ready.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/pricing">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">
                See Pricing
              </Button>
            </Link>
            <Link to="/contact-sales">
              <Button size="lg" variant="outline">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to transform your LinkedIn presence?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Join thousands of professionals who are already using PostPilot to accelerate their careers.
          </p>
          <Link to="/auth/register">
            <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100">
              Start Your Free Trial
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
