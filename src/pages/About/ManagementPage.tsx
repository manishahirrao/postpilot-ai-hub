
import * as React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Linkedin } from 'lucide-react';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import { ComplexOrbitalSystem } from '@/components/OrbitalSystem';

const ManagementPage: React.FC = () => {
  const executives = [
    {
      name: 'Harsh Singh Rajput',
      title: 'Founder',
      bio: 'Harsh Kumar Singh founded PostPilot with a mission to simplify customer engagement for modern businesses. With a B.Com. in Business Process Management and a specialization in CRM from Delhi Skills and Entrepreneurship University, Harsh brings a deep understanding of customer behavior, digital marketing, and data-driven decision-making. He has led multiple research and consulting projects focused on market analysis, process optimization, and digital transformation. His work reflects a passion for building strategic, customer-centric solutions that help businesses grow smarter and faster.',
      previousRoles: [`Market Research & CRM Strategy`,`Sales Manager` ],
      education: ['B.Com. in Business Process Management (BPM),Delhi'],
      linkedin: '#',
      image: 'HR'
    },
    {
      name: 'Manish Ahirrao',
      title: 'Co-founder',
      bio: 'Manish Ahirrao co-founded PostPilot to bridge the gap between intelligent automation and user-centric product experiences. With a background in Computer Science from Savitribai Phule Pune University and hands-on expertise in full-stack web development, Manish has built scalable tech solutions using modern frameworks like React, Node.js, and MongoDB. His deep interest in machine learning and AI led him to complete a Data Science & ML internship, where he applied predictive analytics to real-world problems. At PostPilot, Manish leads the technology vision—driving innovation at the intersection of AI and digital engagement.',
      previousRoles: ['Data Science & Machine Learning '],
      education: ['Bachelor of Engineering in Computer Science,Pune'],
      linkedin: '#',
      image: 'MA'
    },
    
  ];

  // const advisors = [
  //   {
  //     name: 'Dr. Jennifer Walsh',
  //     title: 'AI Advisor',
  //     company: 'Former VP AI at Google',
  //     bio: 'Leading AI researcher with 20+ publications in top-tier conferences.',
  //     image: 'JW'
  //   },
  //   {
  //     name: 'Robert Martinez',
  //     title: 'Go-to-Market Advisor',
  //     company: 'Former CMO at Slack',
  //     bio: 'Expert in scaling B2B SaaS companies from startup to IPO.',
  //     image: 'RM'
  //   },
  //   {
  //     name: 'Amanda Foster',
  //     title: 'HR Technology Advisor',
  //     company: 'Former Chief People Officer at Stripe',
  //     bio: 'Pioneer in people analytics and future of work technologies.',
  //     image: 'AF'
  //   }
  // ];

  return (
    <div className="min-h-screen flex flex-col hero-gradient">
      <Navbar />
      <main className="flex-1 relative overflow-hidden pt-24">
        {/* Hero Section */}
        <section className="relative py-24">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5" />
            <ComplexOrbitalSystem className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[600px] opacity-30" />
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                Leadership{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-purple-500 to-blue-500">
                  Team
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Meet the experienced leaders driving PostPilot's mission to democratize 
                professional success through AI-powered career tools.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Executive Team */}
        <section className="py-20 bg-background/50 relative">
          <div className="absolute inset-0 bg-grid-slate-900/[0.04] dark:bg-grid-slate-100/[0.04]" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Executive Team
              </h2>
              <p className="text-xl text-muted-foreground">
                Proven leaders with decades of experience building world-class products
              </p>
            </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {executives.map((executive, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-all hover:border-primary/20 h-full">
                    <CardContent className="p-8">
                      <div className="flex flex-col sm:flex-row gap-6">
                        <div className="flex-shrink-0">
                          <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-2xl">{executive.image}</span>
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-foreground mb-1">{executive.name}</h3>
                          <p className="bg-gradient-to-r from-cyan-500 to-purple-600 bg-clip-text text-transparent font-medium mb-3">
                            {executive.title}
                          </p>
                          
                          <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{executive.bio}</p>
                          
                          <div className="space-y-3">
                            <div>
                              <h4 className="text-sm font-semibold text-foreground mb-1">Previous Roles</h4>
                              <div className="flex flex-wrap gap-1">
                                {executive.previousRoles.map((role, roleIndex) => (
                                  <Badge 
                                    key={roleIndex} 
                                    variant="outline" 
                                    className="text-xs bg-muted/50"
                                  >
                                    {role}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-sm font-semibold text-foreground mb-1">Education</h4>
                              <div className="flex flex-wrap gap-1">
                                {executive.education.map((edu, eduIndex) => (
                                  <Badge 
                                    key={eduIndex} 
                                    variant="secondary" 
                                    className="text-xs"
                                  >
                                    {edu}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-4">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="group"
                              onClick={() => window.open(executive.linkedin, '_blank')}
                            >
                              <Linkedin className="w-4 h-4 mr-2 text-[#0A66C2]" />
                              Connect on LinkedIn
                              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Board of Advisors */}
      {/* <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Board of Advisors
            </h2>
            <p className="text-xl text-gray-600">
              Industry experts guiding our strategic direction
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {advisors.map((advisor, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">{advisor.image}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{advisor.name}</h3>
                  <p className="text-blue-600 font-medium mb-2">{advisor.title}</p>
                  <p className="text-gray-600 text-sm mb-3">{advisor.company}</p>
                  <p className="text-gray-700 text-sm">{advisor.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

        {/* Company Stats */}
        <section className="py-20 bg-background/80 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-blue-500/5" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Leadership by the Numbers
              </h2>
              <p className="text-xl text-muted-foreground">
                The experience and success that drives our vision forward
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { value: '100+', label: 'Combined Years of Experience', gradient: 'from-cyan-500 to-blue-500' },
                { value: '$2B+', label: 'Previous Company Valuations', gradient: 'from-purple-500 to-pink-500' },
                { value: '50M+', label: 'Users at Previous Companies', gradient: 'from-green-500 to-emerald-500' },
                { value: '15+', label: 'Successful Exits', gradient: 'from-orange-500 to-amber-500' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full bg-background/80 backdrop-blur-sm border-border/20 hover:shadow-lg transition-all">
                    <CardContent className="p-8 text-center">
                      <div className={`text-4xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2`}>
                        {stat.value}
                      </div>
                      <div className="text-muted-foreground">{stat.label}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Culture */}
        <section className="py-20 bg-background relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Leadership Philosophy
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Our leadership team believes in transparency, empowerment, and leading by example. 
                  We foster a culture where every team member can contribute to our mission and grow 
                  their careers alongside our company.
                </p>
                
                <div className="space-y-4">
                  {[
                    { 
                      title: 'Servant Leadership', 
                      description: 'We serve our team and customers, not the other way around',
                      color: 'from-cyan-500 to-blue-500'
                    },
                    { 
                      title: 'Data-Driven Decisions', 
                      description: 'We make decisions based on data, not opinions or hierarchy',
                      color: 'from-purple-500 to-pink-500'
                    },
                    { 
                      title: 'Continuous Learning', 
                      description: 'We\'re always learning and adapting to serve our users better',
                      color: 'from-green-500 to-emerald-500'
                    },
                    { 
                      title: 'Customer Obsession', 
                      description: 'Every decision starts with how it impacts our users\' success',
                      color: 'from-orange-500 to-amber-500'
                    }
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-start space-x-4 p-4 rounded-lg hover:bg-muted/50 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${item.color} mt-1.5 flex-shrink-0`}></div>
                      <div>
                        <h4 className="font-semibold text-foreground">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
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
                <Card className="bg-background/80 backdrop-blur-sm border-border/20 hover:shadow-lg transition-all">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-bold text-foreground mb-6">Team Diversity</h3>
                    
                    <div className="space-y-6">
                      {[
                        { label: 'Gender Diversity', value: '50/50', percentage: 50, gradient: 'from-purple-500 to-pink-500' },
                        { label: 'International Background', value: '67%', percentage: 67, gradient: 'from-blue-500 to-cyan-500' },
                        { label: 'Technical Background', value: '83%', percentage: 83, gradient: 'from-green-500 to-emerald-500' }
                      ].map((item, index) => (
                        <div key={index}>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-foreground">{item.label}</span>
                            <span className="text-sm font-medium bg-gradient-to-r bg-clip-text text-transparent ${item.gradient}">
                              {item.value}
                            </span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                            <div 
                              className={`h-full rounded-full bg-gradient-to-r ${item.gradient}`}
                              style={{ width: `${item.percentage}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ManagementPage;
