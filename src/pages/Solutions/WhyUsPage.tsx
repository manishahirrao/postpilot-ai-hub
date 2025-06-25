import React from 'react';
import { motion } from "framer-motion";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  ArrowRight, 
  Zap, 
  Clock, 
  TrendingUp, 
  UserCheck, 
  CheckCircle,
  Star
} from 'lucide-react';
import { ComplexOrbitalSystem } from '@/components/OrbitalSystem';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import { Link } from 'react-router-dom';
import PageSection from '@/components/Layout/PageSection';
import Animated from '@/components/Layout/Animated';

const features = [
  {
    icon: <Zap className="w-10 h-10 text-blue-500" />,
    title: "AI-Powered Content",
    description: "Generate high-quality, engaging posts in seconds using our advanced AI technology.",
    color: "from-blue-100 to-blue-50",
    points: [
      "Tone Control & Style Options",
      "Length Settings & Customization",
      "Anecdote Integration & Personal Touch"
    ]
  },
  {
    icon: <Clock className="w-10 h-10 text-purple-500" />,
    title: "Time-Saving",
    description: "Cut your content creation time by 80% and focus on what matters most.",
    color: "from-purple-100 to-purple-50",
    points: [
      "Quick Post Generation",
      "Batch Scheduling",
      "Content Calendar"
    ]
  },
  {
    icon: <TrendingUp className="w-10 h-10 text-green-500" />,
    title: "Grow Your Network",
    description: "Attract more connections and opportunities with optimized content.",
    color: "from-green-100 to-green-50",
    points: [
      "Engagement Analytics",
      "Follower Growth",
      "Networking Tools"
    ]
  },
  {
    icon: <UserCheck className="w-10 h-10 text-amber-500" />,
    title: "Personal Branding",
    description: "Build a strong, consistent professional brand across all your content.",
    color: "from-amber-100 to-amber-50",
    points: [
      "Brand Voice Consistency",
      "Content Strategy",
      "Profile Optimization"
    ]
  }
];

const stats = [
  { number: '50,000+', label: 'Professionals Empowered' },
  { number: '2M+', label: 'Posts Created' },
  { number: '10x', label: 'More Engagement' },
  { number: '4.9/5', label: 'User Rating' }
];

const testimonials = [
  {
    quote: "PostPilot transformed my LinkedIn presence. I went from 500 to 10,000+ followers in 6 months!",
    author: "Sarah Johnson",
    role: "Marketing Director",
    avatar: "SJ"
  },
  {
    quote: "The AI suggestions are incredibly accurate. I spend 80% less time creating content now.",
    author: "Michael Chen",
    role: "Tech Entrepreneur",
    avatar: "MC"
  },
  {
    quote: "Best investment in my professional development. The engagement on my posts has skyrocketed.",
    author: "Priya Patel",
    role: "Freelance Designer",
    avatar: "PP"
  }
];

const WhyUsPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <PageSection className="relative min-h-[80vh] flex items-center overflow-hidden hero-gradient">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <ComplexOrbitalSystem className="w-96 h-96 opacity-30" />
          </div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Animated delay={0.1}>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Elevate Your Professional
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 block">
                Brand on LinkedIn
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Join thousands of professionals who are growing their network and career 
              with AI-powered LinkedIn optimization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth/register">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/features">
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </Link>
            </div>
          </Animated>
        </div>
      </PageSection>
      
      {/* Stats Section */}
      <PageSection className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <Animated key={index} delay={0.2 + index * 0.1} className="group">
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </Animated>
            ))}
          </div>
        </div>
      </PageSection>

      {/* Features Section */}
      <PageSection className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Everything You Need to Succeed
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful features designed to help you grow your professional brand
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Animated key={index} delay={0.1 * index}>
                <Card className={`h-full bg-gradient-to-br ${feature.color} hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-14 h-14 rounded-xl bg-white shadow-sm flex items-center justify-center">
                          {feature.icon}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                        <p className="text-gray-700 mb-4">{feature.description}</p>
                        <ul className="space-y-2">
                          {feature.points.map((point, i) => (
                            <li key={i} className="flex items-start">
                              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                              <span className="text-gray-700">{point}</span>
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

      {/* Testimonials */}
      <PageSection className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Trusted by Professionals
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of professionals who have transformed their LinkedIn presence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Animated key={index} delay={0.1 * index} className="h-full">
                <Card className="h-full bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-8 h-full flex flex-col">
                    <div className="mb-6 text-blue-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 inline-block fill-current" />
                      ))}
                    </div>
                    <p className="text-lg text-gray-700 mb-6 flex-grow">"{testimonial.quote}"</p>
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                        {testimonial.avatar}
                      </div>
                      <div className="ml-4">
                        <div className="font-semibold text-gray-900">{testimonial.author}</div>
                        <div className="text-sm text-gray-600">{testimonial.role}</div>
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
      <PageSection className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-95"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <Animated delay={0.1}>
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl mb-6">
              Ready to Transform Your Professional Brand?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Join thousands of professionals who are growing their network and career with PostPilot.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth/register">
                <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 font-medium">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/demo">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 font-medium">
                  Watch Demo
                </Button>
              </Link>
            </div>
          </Animated>
          
          {/* Animated elements */}
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/10"></div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-white/5"></div>
        </div>
      </PageSection>

      <Footer />
    </div>
  );
};

export default WhyUsPage;
