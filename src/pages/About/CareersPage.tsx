
import * as React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, DollarSign, Users, Coffee, Laptop, Heart, TrendingUp, IndianRupee, Rocket, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import { ComplexOrbitalSystem } from '@/components/OrbitalSystem';

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
    <div className="min-h-screen flex flex-col hero-gradient">
      <Navbar />
      <main className="flex-1 relative overflow-hidden pt-24">
        {/* Hero Section */}
        <section className="relative py-24">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <ComplexOrbitalSystem className="w-96 h-96 opacity-30" />
            </div>
            
            <motion.div 
              className="absolute top-20 right-32 w-48 h-48"
              animate={{
                rotate: -360,
                x: [0, 30, 0, -30, 0],
                y: [0, -15, 0, 15, 0],
              }}
              transition={{
                rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                x: { duration: 12, repeat: Infinity, ease: "easeInOut" },
                y: { duration: 8, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              <ComplexOrbitalSystem className="opacity-20" />
            </motion.div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div 
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-full px-4 py-2 border border-cyan-500/20 mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <Rocket className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-medium">Join Our Growing Team</span>
              </motion.div>
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
                <span className="block">Build the Future of</span>
                <span className="block bg-gradient-to-r from-cyan-500 to-purple-600 bg-clip-text text-transparent">
                  Career Technology
                </span>
                <span className="text-3xl lg:text-4xl font-normal opacity-80 mt-4 block">
                  Join our mission to democratize professional success
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                We're looking for passionate individuals who want to make a real impact on millions of careers worldwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700"
                >
                  View Open Positions
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  Learn About Our Culture
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

      {/* Why Join Us */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Why Join PostPilot?
            </h2>
            <p className="text-xl text-muted-foreground">
              More than just a job - it's an opportunity to shape the future of work
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-all hover:border-primary/20 h-full">
                  <CardContent className="p-6">
                    <div className="mb-4">{benefit.icon}</div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-foreground mb-6">
                Our Values Drive Everything We Do
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                We're building more than a product - we're creating a culture where everyone 
                can thrive and do their best work while making a meaningful impact on the world.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {values.map((value, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-center space-x-2"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="w-2 h-2 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full"></div>
                    <span className="text-foreground">{value}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="bg-gradient-to-br from-cyan-50/50 to-purple-50/50 dark:from-cyan-900/10 dark:to-purple-900/10 border-border/20">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-foreground mb-6">Life at PostPilot</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Team Size</span>
                      <span className="font-medium text-foreground">45 people</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Average Age</span>
                      <span className="font-medium text-foreground">32 years</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Remote Workers</span>
                      <span className="font-medium text-foreground">80%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Countries</span>
                      <span className="font-medium text-foreground">12+</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Diversity</span>
                      <span className="font-medium text-foreground">52% Women</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

        {/* Open Positions */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Open Positions
              </h2>
              <p className="text-xl text-muted-foreground">
                Ready to join our team? Check out our current job openings.
              </p>
            </motion.div>
            
            <div className="space-y-6">
              {openPositions.map((position, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-all hover:border-primary/20">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-foreground">{position.title}</h3>
                          <div className="flex flex-wrap items-center gap-2 mt-2">
                            <Badge variant="outline" className="flex items-center bg-muted/50">
                              <MapPin className="w-3 h-3 mr-1" />
                              {position.location}
                            </Badge>
                            <Badge variant="outline" className="flex items-center bg-muted/50">
                              <Clock className="w-3 h-3 mr-1" />
                              {position.type}
                            </Badge>
                            <Badge variant="outline" className="flex items-center bg-muted/50">
                              <DollarSign className="w-3 h-3 mr-1" />
                              {position.salary}
                            </Badge>
                          </div>
                          <p className="mt-2 text-muted-foreground">{position.description}</p>
                        </div>
                        <Button className="mt-4 md:mt-0 group" variant="outline">
                          Apply Now
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Open Positions
              </h2>
              <p className="text-xl text-muted-foreground">
                Ready to join our team? Check out our current job openings.
              </p>
            </motion.div>
            
            <div className="space-y-6">
              {openPositions.map((position, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-all hover:border-primary/20">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-foreground">{position.title}</h3>
                          <div className="flex flex-wrap items-center gap-2 mt-2">
                            <Badge variant="outline" className="flex items-center bg-muted/50">
                              <MapPin className="w-3 h-3 mr-1" />
                              {position.location}
                            </Badge>
                            <Badge variant="outline" className="flex items-center bg-muted/50">
                              <Clock className="w-3 h-3 mr-1" />
                              {position.type}
                            </Badge>
                            <Badge variant="outline" className="flex items-center bg-muted/50">
                              <DollarSign className="w-3 h-3 mr-1" />
                              {position.salary}
                            </Badge>
                          </div>
                          <p className="mt-2 text-muted-foreground">{position.description}</p>
                        </div>
                        <Button className="mt-4 md:mt-0 group" variant="outline">
                          Apply Now
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-blue-500/5">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div 
              className="bg-background/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-border/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Ready to Join Our Team?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Don't see a role that fits? We're always looking for talented individuals to join our team.
              </p>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700"
              >
                Contact Us
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CareersPage;
