
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  FileText, 
  User, 
  TrendingUp, 
  Briefcase, 
  Building2, 
  Users, 
  Star,
  ArrowRight 
} from 'lucide-react';

const CombinedHome: React.FC = () => {
  const individualServices = [
    {
      icon: <FileText className="w-8 h-8 text-indigo-600" />,
      title: 'Social Media Post Generator',
      description: 'Create engaging posts with tone, style, and length controls. Rate suggestions and regenerate with personal anecdotes.',
      features: ['Tone Control', 'Style Options', 'Length Settings', 'Anecdote Integration']
    },
    {
      icon: <User className="w-8 h-8 text-indigo-600" />,
      title: 'Resume Builder/Enhancer',
      description: 'Build powerful resumes from scratch or enhance existing ones with AI-powered suggestions.',
      features: ['ATS-Friendly Format', 'Content Enhancement', 'Skills Optimization', 'Template Library']
    },
    {
      icon: <Briefcase className="w-8 h-8 text-indigo-600" />,
      title: 'Profile Job Matcher',
      description: 'Match your skills and experience with relevant job opportunities using advanced AI algorithms.',
      features: ['Smart Matching', 'Skill Analysis', 'Job Alerts', 'Application Tracking']
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-indigo-600" />,
      title: 'Career Analytics & Tips',
      description: 'Get personalized insights and actionable tips to advance your professional journey.',
      features: ['Performance Analytics', 'Skill Gap Analysis', 'Career Roadmap', 'Industry Insights']
    }
  ];

  const companyServices = [
    {
      icon: <Building2 className="w-8 h-8 text-purple-600" />,
      title: 'Free Job Posting',
      description: 'Post unlimited job openings and connect with top talent at no cost.',
      features: ['Unlimited Postings', 'Candidate Filtering', 'Application Management', 'Multi-Platform Distribution']
    },
    {
      icon: <Users className="w-8 h-8 text-purple-600" />,
      title: 'Hiring Outsourcing',
      description: 'Let our expert recruiters handle your entire hiring process from screening to onboarding.',
      features: ['Expert Recruiters', 'End-to-End Process', 'Quality Assurance', 'Fast Turnaround']
    },
    {
      icon: <FileText className="w-8 h-8 text-purple-600" />,
      title: 'Social Media Post/Video Generation',
      description: 'Create on-brand content with company voice, tone controls, and regeneration options.',
      features: ['Brand Voice', 'Content Calendar', 'Video Generation', 'Performance Tracking']
    }
  ];

  const testimonials = [
    {
      quote: "The LinkedIn Post Generator made my job search 10x easier. I got more responses than ever before!",
      author: "Priya S.",
      role: "UX Designer",
      type: "individual"
    },
    {
      quote: "Resume enhancer gave me a clean, ATS-friendly format and great content tips that landed me interviews.",
      author: "Amit R.",
      role: "Marketing Graduate",
      type: "individual"
    },
    {
      quote: "The hiring outsourcing service saved us weeks of time. We hired 3 people via the tool in just one month!",
      author: "Anika K.",
      role: "HR Manager at TalentHive",
      type: "company"
    },
    {
      quote: "We now publish professional posts regularly without an agency. Huge time and cost saver for our startup.",
      author: "Raj M.",
      role: "Co-founder of WebRecruit",
      type: "company"
    }
  ];

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Empowering 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600"> Everyone </span>
            on Social Media
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto">
            Whether you're a job seeker building your career or a company scaling your team, 
            our AI-powered tools help you create powerful content, hire smarter, and stand out online.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/home/LoginPersonalPage">
              <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-3">
                I'm an Individual
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/home/LoginCompanyPage">
              <Button size="lg" variant="outline" className="px-8 py-3 border-2">
                I'm a Company
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* For Individuals Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              For Individuals
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Accelerate your career with AI-powered tools designed for job seekers and professionals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {individualServices.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      {service.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {service.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {service.features.map((feature, idx) => (
                          <span key={idx} className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm rounded-full">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* For Companies Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              For Companies
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Streamline your hiring process and enhance your employer brand with our comprehensive solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {companyServices.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8 text-center">
                  <div className="flex justify-center mb-6">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {service.features.map((feature, idx) => (
                      <span key={idx} className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full">
                        {feature}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600">
              Trusted by thousands of professionals and companies worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-none shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-gray-700 mb-6 italic">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      testimonial.type === 'individual' ? 'bg-indigo-100' : 'bg-purple-100'
                    }`}>
                      {testimonial.type === 'individual' ? 
                        <User className={`w-6 h-6 ${testimonial.type === 'individual' ? 'text-indigo-600' : 'text-purple-600'}`} /> :
                        <Building2 className={`w-6 h-6 ${testimonial.type === 'individual' ? 'text-indigo-600' : 'text-purple-600'}`} />
                      }
                    </div>
                    <div className="ml-4">
                      <div className="font-semibold text-gray-900">{testimonial.author}</div>
                      <div className="text-gray-600 text-sm">{testimonial.role}</div>
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
            Ready to Get Started?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Choose your journey to explore the tools tailored specifically for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login/personal">
              <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-50 px-8 py-3">
                Start as Individual
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/login/company">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-indigo-600 px-8 py-3">
                Start as Company
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CombinedHome;
