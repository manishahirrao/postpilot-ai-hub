
import * as React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, TrendingUp, Users } from 'lucide-react';
import { ComplexOrbitalSystem } from '@/components/OrbitalSystem';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import { Link } from 'react-router-dom';

const professionalUseCases = [
  {
    icon: <TrendingUp className="w-8 h-8 text-blue-600" />, 
    title: "Career Growth",
    description: "Showcase your achievements, share industry insights, and attract recruiters for better job opportunities."
  },
  {
    icon: <CheckCircle className="w-8 h-8 text-purple-600" />, 
    title: "Thought Leadership",
    description: "Establish yourself as a go-to expert by consistently posting valuable content and engaging with your network."
  },
  {
    icon: <Users className="w-8 h-8 text-green-600" />, 
    title: "Network Building",
    description: "Connect with professionals, mentors, and peers to expand your influence and open new doors."
  },
  {
    icon: <ArrowRight className="w-8 h-8 text-orange-600" />, 
    title: "Personal Branding",
    description: "Craft a memorable online presence that reflects your unique strengths and aspirations."
  }
];

const testimonials = [
  {
    quote: "PostPilot made it effortless to build my brand and get noticed by top companies.",
    author: "Anjali Mehra",
    role: "Product Manager"
  },
  {
    quote: "I landed my dream job after consistently sharing insights with the help of PostPilot.",
    author: "Rahul Sharma",
    role: "Data Analyst"
  }
];

const UseCasesPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />
      {/* Hero Section with Animated Background */}
      <section className="relative py-20 text-center">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute top-1/2 left-1/2 w-96 h-96 opacity-20"
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            style={{ transform: 'translate(-50%, -50%)' }}
          >
            <ComplexOrbitalSystem />
          </motion.div>
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-900">
            Unlock Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Professional Potential</span>
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Discover how PostPilot empowers individuals to grow their careers, build influence, and stand out on LinkedIn.
          </p>
          <Link to="/auth/register">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Get Started
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">Top Use Cases for Professionals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {professionalUseCases.map((uc, idx) => (
              <Card key={idx} className="shadow-md">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">{uc.icon}<span className="text-xl font-semibold">{uc.title}</span></div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{uc.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Success Stories from Professionals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-gradient-to-br from-green-50 to-blue-50">
                <CardContent className="p-8">
                  <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.author}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to see PostPilot in action?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Start achieving your professional goals today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth/register">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default UseCasesPage;
