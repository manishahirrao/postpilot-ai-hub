import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Layout/Navbar";
import { ArrowRight, BookOpen, FileText, HelpCircle, Video, Clock, MessageCircle, Users } from "lucide-react";

// Reusable Section Component
const Section = ({ id, children, className = "" }: { id?: string; children: React.ReactNode; className?: string }) => (
  <section id={id} className={`py-20 ${className}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  </section>
);

// Reusable Section Header Component
const SectionHeader = ({ title, subtitle, className = "" }: { title: string; subtitle: string; className?: string }) => (
  <div className={`text-center mb-16 ${className}`}>
    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
      {title}
    </h2>
    <p className="text-xl text-gray-300">
      {subtitle}
    </p>
  </div>
);

// Reusable Glass Card Component
const GlassCard = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <motion.div 
    className={`bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden ${className}`}
    whileHover={{ y: -5, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

// Background Gradient Component
const BackgroundGradient = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden">
    <div className="absolute top-0 left-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
    <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-full filter blur-3xl translate-x-1/3 translate-y-1/3"></div>
  </div>
);

const ResourcesPage: React.FC = () => {
  const blogPosts = [
  {
    title: 'How LinkedIn Automation Can Supercharge Your Job Search in 2025',
    excerpt: 'Discover how automation tools can personalize outreach, increase visibility, and speed up your job hunt.',
    category: 'Job Search',
    author: 'Manish Ahirrao',
    date: 'June 8, 2025',
    readTime: '5 min read',
  },
  {
    title: 'The Future of Recruiting: Why Every Company Needs LinkedIn Content Automation',
    excerpt: 'Recruiters and hiring managers are saving time and finding better candidates—here’s how.',
    category: 'Recruiting',
    author: 'Manish Ahirrao',
    date: 'June 7, 2025',
    readTime: '6 min read',
  },
  // {
  //   title: 'LinkedIn Post Generator Tools: How AI is Changing the Way We Network Professionally',
  //   excerpt: 'AI-generated LinkedIn posts are reshaping professional networking and brand building.',
  //   category: 'Networking',
  //   author: 'Manish Ahirrao',
  //   date: 'June 6, 2025',
  //   readTime: '4 min read',
  // },
  // {
  //   title: 'Build Your Personal Brand on LinkedIn in 10 Minutes a Day with AI',
  //   excerpt: 'Short on time? Here’s how to grow your personal brand with automation.',
  //   category: 'Personal Branding',
  //   author: 'Manish Ahirrao',
  //   date: 'June 5, 2025',
  //   readTime: '5 min read',
  // },
  // {
  //   title: 'Top LinkedIn Strategies for Startup Founders to Attract Investors and Talent',
  //   excerpt: 'Learn how founders are using LinkedIn content to build credibility and recruit top talent.',
  //   category: 'Startups',
  //   author: 'Manish Ahirrao',
  //   date: 'June 4, 2025',
  //   readTime: '6 min read',
  // },
  // {
  //   title: 'How to Write LinkedIn Posts That Get 10x More Engagement—Automatically!',
  //   excerpt: 'Unlock tips for creating high-engagement posts with the help of AI.',
  //   category: 'Content Marketing',
  //   author: 'Manish Ahirrao',
  //   date: 'June 3, 2025',
  //   readTime: '5 min read',
  // },
  // {
  //   title: '5 Ways LinkedIn Content Automation Saves Time for Busy Professionals',
  //   excerpt: 'From scheduling to smart post suggestions, automation helps you stay active without the hassle.',
  //   category: 'Productivity',
  //   author: 'Manish Ahirrao',
  //   date: 'June 2, 2025',
  //   readTime: '4 min read',
  // },
  // {
  //   title: 'The Beginner\'s Guide to LinkedIn Automation: Grow Faster, Smarter, Better',
  //   excerpt: 'Just starting out with LinkedIn automation? Here’s everything you need to know.',
  //   category: 'Beginner Guide',
  //   author: 'Manish Ahirrao',
  //   date: 'June 1, 2025',
  //   readTime: '5 min read',
  // },
  // {
  //   title: 'How Recruiters Can Use AI to Source Better Candidates on LinkedIn',
  //   excerpt: 'AI tools help recruiters discover, vet, and connect with top talent more efficiently.',
  //   category: 'HR Tech',
  //   author: 'Manish Ahirrao',
  //   date: 'May 31, 2025',
  //   readTime: '6 min read',
  // },
  // {
  //   title: 'Why Every Freelancer Should Be Using LinkedIn AI Tools in 2025',
  //   excerpt: 'Build authority, generate leads, and maintain presence with AI-driven automation.',
  //   category: 'Freelancing',
  //   author: 'Manish Ahirrao',
  //   date: 'May 30, 2025',
  //   readTime: '4 min read',
  // },
  // {
  //   title: 'The Top 7 Mistakes Job Seekers Make on LinkedIn (And How Automation Fixes Them)',
  //   excerpt: 'Avoid common pitfalls and let automation elevate your profile and messaging.',
  //   category: 'Career Tips',
  //   author: 'Manish Ahirrao',
  //   date: 'May 29, 2025',
  //   readTime: '5 min read',
  // },
  // {
  //   title: 'From Ghosted to Hired: How LinkedIn Automation Tools Boost Response Rates',
  //   excerpt: 'More replies, more interviews—see how smart automation makes you stand out.',
  //   category: 'Success Stories',
  //   author: 'Manish Ahirrao',
  //   date: 'May 28, 2025',
  //   readTime: '5 min read',
  // },
  // {
  //   title: 'How Our AI Resume and LinkedIn Toolkit is Revolutionizing the Hiring Game',
  //   excerpt: 'A deep dive into how resume builders and LinkedIn optimizers work together to land your next role.',
  //   category: 'AI Tools',
  //   author: 'Manish Ahirrao',
  //   date: 'May 27, 2025',
  //   readTime: '6 min read',
  // },
  // {
  //   title: 'Hiring for Startups? Why You Should Automate Your LinkedIn Job Posting',
  //   excerpt: 'Scale your hiring efforts with less effort and more results using automation.',
  //   category: 'Startup Hiring',
  //   author: 'Manish Ahirrao',
  //   date: 'May 26, 2025',
  //   readTime: '5 min read',
  // },
  // {
  //   title: 'AI + LinkedIn = Gamechanger for Career Growth—Here’s How',
  //   excerpt: 'Learn how AI-enhanced LinkedIn strategies are shaping the future of work.',
  //   category: 'Future of Work',
  //   author: 'Manish Ahirrao',
  //   date: 'May 25, 2025',
  //   readTime: '5 min read',
  // },
  // {
  //   title: 'Why Manual LinkedIn Posting is Dead in 2025',
  //   excerpt: 'The shift to AI-driven social engagement is here. Don’t get left behind.',
  //   category: 'Trends',
  //   author: 'Manish Ahirrao',
  //   date: 'May 24, 2025',
  //   readTime: '4 min read',
  // },
  // {
  //   title: 'Get Hired Faster: How Our LinkedIn Optimization Tool Helps You Stand Out',
  //   excerpt: 'Perfect your profile, headline, and posts to get noticed by top employers.',
  //   category: 'Job Hunt',
  //   author: 'Manish Ahirrao',
  //   date: 'May 23, 2025',
  //   readTime: '5 min read',
  // },
  // {
  //   title: 'The Ultimate LinkedIn Content Calendar for Founders and Creators (Free Template Inside)',
  //   excerpt: 'Plan, post, and profit with this free template and AI tool for effortless execution.',
  //   category: 'Founders',
  //   author: 'Manish Ahirrao',
  //   date: 'May 22, 2025',
  //   readTime: '6 min read',
  // },
];



  const helpTopics = [
    {
      icon: <FileText className="w-6 h-6 text-blue-600" />,
      title: 'Getting Started',
      description: 'Learn the basics of using PostPilot',
      articles: 12
    },
    {
      icon: <Users className="w-6 h-6 text-green-600" />,
      title: 'LinkedIn Integration',
      description: 'Connect and manage your LinkedIn account',
      articles: 8
    },
    {
      icon: <Video className="w-6 h-6 text-purple-600" />,
      title: 'Content Creation',
      description: 'Master AI-powered content generation',
      articles: 15
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-orange-600" />,
      title: 'Troubleshooting',
      description: 'Solutions to common issues',
      articles: 6,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <BackgroundGradient />
      <Navbar />
      
      {/* Hero Section */}
      <Section id="hero" className="pt-32 pb-24">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-6"
          >
            <Badge className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 text-blue-300 border border-blue-800/30 backdrop-blur-sm px-4 py-2 text-sm font-medium">
              <BookOpen className="w-4 h-4 mr-2" />
              Professional Resources
            </Badge>
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Master Your <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text">Career</span> with Expert Resources
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-300 max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Curated guides, tutorials, and insights to help you grow professionally and master LinkedIn with AI-powered tools.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button 
              asChild 
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-6 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link to="/blog">
                Explore Resources
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </Section>

      {/* Blog Posts */}
      {/* <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border-0 px-4 py-2 text-sm font-medium">
              <BookOpen className="inline w-4 h-4 mr-2 text-purple-400" />
              Latest Insights
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-purple-900 to-pink-900 bg-clip-text text-transparent leading-tight mb-4">
              Expert Blog Posts
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Discover our latest articles on LinkedIn strategy, AI-powered tools, and career growth.
            </p>
          </div>
          <div className="grid gap-8 md:gap-10 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post, i) => (
              <Card key={i} className="bg-white rounded-xl shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl">
                <CardHeader className="pb-2">
                  <Badge className="mb-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border-0">
                    {post.category}
                  </Badge>
                  <CardTitle className="text-2xl font-semibold text-gray-900 mb-1">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 min-h-[60px]">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span className="flex items-center">
                      <Users className="w-4 h-4 mr-1 text-gray-400" />
                      {post.author}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1 text-gray-400" />
                      {post.date}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-purple-600 font-semibold bg-purple-50 rounded-full px-3 py-1">
                      {post.readTime}
                    </span>
                    <Link to="/blog" className="flex items-center text-purple-600 hover:text-purple-700 transition-colors">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

      {/* Quick Access */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Blog</h3>
                <p className="text-gray-600 mb-4">
                  Expert insights, tips, and strategies for career growth and LinkedIn success.
                </p>
                <Button variant="outline">
                  Read Articles
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HelpCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Help Center</h3>
                <p className="text-gray-600 mb-4">
                  Step-by-step guides, tutorials, and answers to frequently asked questions.
                </p>
                <Button variant="outline">
                  Get Help
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Customer Support</h3>
                <p className="text-gray-600 mb-4">
                  Need personalized help? Our support team is ready to assist you.
                </p>
                <Link to="/support">
                  <Button variant="outline">
                    Contact Support
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <Section id="blog" className="relative z-10">
        <SectionHeader 
          title="Latest from Our Blog" 
          subtitle="Stay up-to-date with the latest career advice and industry insights"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.slice(0, 3).map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <GlassCard className="h-full">
                <div className="h-48 bg-gradient-to-r from-blue-900/30 to-cyan-900/30 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-blue-500 to-cyan-500"></div>
                </div>
                <CardContent className="p-6">
                  <Badge className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 text-blue-300 border border-blue-800/30 backdrop-blur-sm mb-3">
                    {post.category}
                  </Badge>
                  <h3 className="text-xl font-semibold text-white mb-3 line-clamp-2">{post.title}</h3>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span>{post.author}</span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {post.readTime}
                    </span>
                  </div>
                </CardContent>
              </GlassCard>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-6 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
          >
            View All Articles
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </Section>

      {/* Help Topics Section */}
      <Section id="help-topics" className="relative z-10">
        <SectionHeader 
          title="Help Center Topics" 
          subtitle="Find answers to your questions organized by topic"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {helpTopics.map((topic, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <GlassCard className="h-full hover:bg-white/10 transition-colors duration-300 cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-900/30 to-cyan-900/30 flex items-center justify-center">
                    {React.cloneElement(topic.icon, { className: 'w-8 h-8 text-blue-400' })}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{topic.title}</h3>
                  <p className="text-gray-300 text-sm mb-3">{topic.description}</p>
                  <p className="text-sm font-medium text-blue-400">{topic.articles} articles</p>
                </CardContent>
              </GlassCard>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Button 
            variant="outline"
            className="border-gray-700 text-white hover:bg-white/5 hover:border-white/30 px-8 py-6 text-lg font-medium"
          >
            Visit Help Center
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </Section>

      {/* Video Tutorials */}
      <Section id="video-tutorials" className="relative z-10">
        <SectionHeader 
          title="Video Tutorials" 
          subtitle="Watch step-by-step guides to get the most out of our platform"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            {[
              { 
                icon: <Video className="w-6 h-6 text-blue-400" />,
                title: 'Getting Started with PostPilot',
                duration: '8 min',
                description: 'A complete walkthrough of setting up your account and first campaign'
              },
              { 
                icon: <Video className="w-6 h-6 text-blue-400" />,
                title: 'Advanced LinkedIn Automation',
                duration: '12 min',
                description: 'Advanced techniques for optimizing your LinkedIn profile'
              },
              { 
                icon: <Video className="w-6 h-6 text-blue-400" />,
                title: 'Advanced Job Matching Tips',
                duration: '10 min',
                description: 'Maximize your job search effectiveness with PostPilot'
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <GlassCard className="hover:bg-white/5 transition-colors duration-300">
                  <div className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-blue-900/30 rounded-lg backdrop-blur-sm">
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                        <p className="text-gray-300 text-sm mb-2">{item.description}</p>
                        <span className="text-sm text-blue-400">{item.duration}</span>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="pt-4"
            >
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-6 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Watch All Tutorials
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          </div>
          
          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <GlassCard className="overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-blue-900/30 to-cyan-900/30 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-blue-500 to-cyan-500"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                    <Video className="w-12 h-12 text-white" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-white mb-2">PostPilot Masterclass</h3>
                <p className="text-gray-300 mb-6">45 minutes of expert tips and strategies</p>
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-6 text-lg"
                >
                  Watch Masterclass
                </Button>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </Section>

      {/* Newsletter Signup */}
      <Section id="newsletter" className="relative overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Join Our <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Community</span>
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Get exclusive career tips, LinkedIn strategies, and early access to new features.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-xl border-0 focus:ring-2 focus:ring-white/20 bg-white/10 text-white placeholder-gray-400 backdrop-blur-sm"
              />
              <Button 
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Subscribe
              </Button>
            </div>
          </motion.div>
          
          <div className="absolute -z-10 top-1/2 left-1/2 w-[120%] h-[120%] -translate-x-1/2 -translate-y-1/2 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-blue-900/50 to-transparent"></div>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-gray-900/50 backdrop-blur-md border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Integrations</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Changelog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Tutorials</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Community</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Press</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">GDPR</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© {new Date().getFullYear()} PostPilot. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.377.202 2.398.1 2.651.64.699 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ResourcesPage;
