
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, TrendingUp, Users, MessageSquare, Award, Star } from 'lucide-react';
import { ComplexOrbitalSystem } from '@/components/OrbitalSystem';
import { Link } from 'react-router-dom';
import PageSection from '@/components/Layout/PageSection';
import Animated from '@/components/Layout/Animated';
import MainLayout from '@/components/Layout/MainLayout';

const professionalUseCases = [
  {
    icon: <TrendingUp className="w-10 h-10 text-blue-500" />, 
    title: "Career Growth",
    description: "Showcase your achievements, share industry insights, and attract recruiters for better job opportunities.",
    color: "from-blue-100 to-blue-50",
    features: [
      "Attract recruiters with optimized profiles",
      "Showcase career milestones",
      "Highlight key achievements"
    ]
  },
  {
    icon: <MessageSquare className="w-10 h-10 text-purple-500" />, 
    title: "Thought Leadership",
    description: "Establish yourself as a go-to expert by consistently posting valuable content and engaging with your network.",
    color: "from-purple-100 to-purple-50",
    features: [
      "Content strategy planning",
      "Industry insights sharing",
      "Engagement analytics"
    ]
  },
  {
    icon: <Users className="w-10 h-10 text-green-500" />, 
    title: "Network Building",
    description: "Connect with professionals, mentors, and peers to expand your influence and open new doors.",
    color: "from-green-100 to-green-50",
    features: [
      "Smart connection suggestions",
      "Engagement tracking",
      "Networking analytics"
    ]
  },
  {
    icon: <Award className="w-10 h-10 text-amber-500" />, 
    title: "Personal Branding",
    description: "Craft a memorable online presence that reflects your unique strengths and aspirations.",
    color: "from-amber-100 to-amber-50",
    features: [
      "Profile optimization",
      "Content personalization",
      "Brand consistency tools"
    ]
  }
];

const testimonials = [
  {
    quote: "PostPilot made it effortless to build my brand and get noticed by top companies. The AI suggestions helped me craft the perfect profile.",
    author: "Anjali Mehra",
    role: "Product Manager",
    avatar: "AM",
    rating: 5
  },
  {
    quote: "I landed my dream job after consistently sharing insights with the help of PostPilot. The content suggestions were spot on!",
    author: "Rahul Sharma",
    role: "Data Analyst",
    avatar: "RS",
    rating: 5
  },
  {
    quote: "The networking tools helped me connect with industry leaders I never thought I'd have access to. Game changer!",
    author: "Priya Patel",
    role: "UX Designer",
    avatar: "PP",
    rating: 5
  }
];

const UseCasesPage: React.FC = () => {
  return (
  
      <main>
        {/* Hero Section */}
        <PageSection className="relative min-h-[70vh] flex items-center overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <ComplexOrbitalSystem className="w-96 h-96 opacity-30" />
            </div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Animated delay={0.1}>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Unlock Your Professional
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 block">
                  Potential
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Discover how PostPilot empowers professionals to grow their careers, 
                build influence, and stand out on LinkedIn.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/auth/register">
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Get Started Free
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to="/solutions/why-us">
                  <Button size="lg" variant="outline">
                    Why Choose Us
                  </Button>
                </Link>
              </div>
            </Animated>
          </div>
        </PageSection>
        {/* Use Cases Section */}
        <PageSection className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                How Professionals Succeed with PostPilot
              </h2>
              <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                Powerful solutions designed to help you achieve your career goals
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {professionalUseCases.map((uc, idx) => (
                <Animated key={idx} delay={0.1 * idx}>
                  <Card className={`h-full bg-gradient-to-br ${uc.color} hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
                    <CardContent className="p-8">
                      <div className="flex items-start gap-6">
                        <div className="flex-shrink-0">
                          <div className="w-14 h-14 rounded-xl bg-white shadow-sm flex items-center justify-center">
                            {uc.icon}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{uc.title}</h3>
                          <p className="text-gray-700 mb-4">{uc.description}</p>
                          <ul className="space-y-2">
                            {uc.features.map((feature, i) => (
                              <li key={i} className="flex items-start">
                                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                                <span className="text-gray-700">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Animated>
              ))}
            </div>
          </div>
        </PageSection>

        {/* Testimonials Section */}
        <PageSection className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Success Stories
              </h2>
              <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                Hear from professionals who transformed their careers with PostPilot
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Animated key={index} delay={0.1 * index}>
                  <Card className="h-full bg-white hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-8">
                      <div className="flex items-center mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
                      <div className="flex items-center gap-4 mt-6">
                        <div className="flex-shrink-0">
                          <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-semibold">
                            {testimonial.avatar}
                          </div>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{testimonial.author}</p>
                          <p className="text-sm text-gray-600">{testimonial.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Animated>
              ))}
            </div>
          </div>
        </PageSection>

        {/* CTA Section */}
        <PageSection className="py-24 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Animated delay={0.1}>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Transform Your Professional Presence?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join thousands of professionals who are growing their network and career with PostPilot's AI-powered tools.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/auth/register">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 hover:shadow-lg transition-all duration-200">
                    Get Started Free
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to="/solutions/why-us">
                  <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                    Learn More
                  </Button>
                </Link>
              </div>
            </Animated>
          </div>
        </PageSection>
      </main>
    
  );
};

export default UseCasesPage;
