<<<<<<< HEAD

import React from 'react';
import { Workflow, Zap, Shield, Users, ArrowRight, Clock } from 'lucide-react';
import HeroSection from '@/components/products/HeroSection';
import FeaturesGrid from '@/components/products/FeaturesGrid';
import UseCases from '@/components/products/UseCases';
import QuoteForm from '@/components/products/QuoteForm';

const AutomationsPage: React.FC = () => {
=======
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import HeroSection from '@/components/CompanyProducts/HeroSection';
import FeaturesGrid from '@/components/CompanyProducts/FeaturesGrid';
import UseCases from '@/components/CompanyProducts/UseCases';
import QuoteForm from '@/components/CompanyProducts/QuoteForm';
import { Workflow, Zap, Shield, BarChart, Star } from 'lucide-react';
import OperationsPage from '../Images/Workflowimage';

const AutomationsPage = () => {
>>>>>>> f6197df ("upadte")
  const features = [
    {
      icon: Workflow,
      title: "Visual Workflow Builder",
<<<<<<< HEAD
      description: "Drag-and-drop interface to create complex automations without coding. Connect any app to any other app with ease."
    },
    {
      icon: Zap,
      title: "400+ Pre-built Templates",
      description: "Get started instantly with our library of pre-built automation templates for common business processes."
    },
    {
      icon: Users,
      title: "Human-in-the-Loop Controls",
      description: "Add approval steps and human oversight wherever needed. Perfect balance of automation and control."
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "SOC 2 compliant with end-to-end encryption. Your data is safe and secure at all times."
    },
    {
      icon: Clock,
      title: "Real-time Monitoring",
      description: "Monitor all your workflows in real-time with detailed logs and performance analytics."
=======
      description: "Create complex automations with our intuitive drag-and-drop interface. No coding required.",
      benefits: [
        "400+ pre-built connectors",
        "Drag-and-drop interface",
        "Real-time testing",
        "Template library"
      ]
    },
    {
      icon: Zap,
      title: "Lightning-Fast Execution",
      description: "Execute thousands of workflows simultaneously with sub-second response times.",
      benefits: [
        "99.9% uptime guarantee",
        "Auto-scaling infrastructure",
        "Real-time monitoring",
        "Error handling & retries"
      ]
    },
    {
      icon: Shield,
      title: "Human-in-the-Loop Controls",
      description: "Maintain control with approval gates, manual reviews, and conditional logic.",
      benefits: [
        "Approval workflows",
        "Manual intervention points",
        "Conditional branching",
        "Role-based permissions"
      ]
    },
    {
      icon: BarChart,
      title: "Advanced Analytics",
      description: "Track performance, identify bottlenecks, and optimize your workflows with detailed insights.",
      benefits: [
        "Real-time dashboards",
        "Performance metrics",
        "Custom reports",
        "ROI tracking"
      ]
>>>>>>> f6197df ("upadte")
    }
  ];

  const useCases = [
    {
<<<<<<< HEAD
      title: "Auto-publish LinkedIn Posts",
      description: "Schedule and automatically publish LinkedIn posts across multiple company accounts.",
      example: "Every Monday at 9 AM, publish the weekly company update to LinkedIn and track engagement metrics."
    },
    {
      title: "CRM Lead Synchronization",
      description: "Automatically sync new leads from your website forms directly to your CRM system.",
      example: "When someone fills out our contact form, create a lead in Salesforce and notify the sales team via Slack."
    },
    {
      title: "Automated Job Posting",
      description: "Trigger job postings across multiple platforms when new positions are approved.",
      example: "When HR approves a new job requisition, automatically post to LinkedIn, Indeed, and Glassdoor."
    },
    {
      title: "Customer Onboarding",
      description: "Streamline customer onboarding with automated welcome sequences and setup tasks.",
      example: "Send welcome email, create user accounts, schedule onboarding call, and add to customer success platform."
    },
    {
      title: "Invoice Processing",
      description: "Automate invoice approval workflows and payment processing.",
      example: "Extract data from invoices, route for approval based on amount, and automatically process payments."
    },
    {
      title: "Social Media Management",
      description: "Cross-platform posting and engagement tracking for your social media presence.",
      example: "Post content to LinkedIn, Twitter, and Facebook simultaneously, then compile engagement reports."
    }
  ];

  const handleQuoteSuccess = (message: string) => {
    alert(message);
  };

  return (
    <div className="min-h-screen pt-16">
      <HeroSection 
        title="Automate Every Workflow"
        subtitle="Drag-and-drop integrations, 400+ connectors, infinite possibilities. Transform your business processes with AI-powered automation."
        backgroundGradient="from-blue-600 to-indigo-600"
      />
      
      <FeaturesGrid features={features} />
      
      <UseCases useCases={useCases} />
      
      <QuoteForm 
        endpoint="/api/contact/automations"
        title="Get Your Custom Automation Quote"
        onSuccess={handleQuoteSuccess}
      />
=======
      title: "Automated LinkedIn Publishing",
      description: "Schedule and publish content across multiple LinkedIn profiles automatically.",
      industry: "Marketing",
      challenge: "Marketing team spends 10+ hours weekly manually posting content across different LinkedIn accounts and tracking engagement.",
      solution: "Automated workflow that schedules posts, customizes content for different audiences, and compiles engagement analytics.",
      results: [
        "90% reduction in manual posting time",
        "3x increase in content consistency",
        "40% improvement in engagement rates",
        "Real-time analytics and reporting"
      ],
      icon: "📱"
    },
    {
      title: "CRM Lead Synchronization",
      description: "Automatically sync leads between multiple platforms and trigger personalized email campaigns.",
      industry: "Sales",
      challenge: "Sales team loses potential leads due to manual data entry delays and inconsistent follow-up processes.",
      solution: "Real-time lead sync between CRM, email platforms, and lead generation tools with automated nurturing sequences.",
      results: [
        "50% faster lead response time",
        "95% reduction in data entry errors",
        "30% increase in conversion rates",
        "Automated lead scoring and routing"
      ],
      icon: "🎯"
    },
    {
      title: "Job Posting Automation",
      description: "Automatically post job openings across 20+ job boards from a single form submission.",
      industry: "HR Tech",
      challenge: "HR teams spend hours manually posting jobs across different platforms, leading to delayed recruitment and missed opportunities.",
      solution: "Automated job distribution system that formats and posts to multiple job boards, tracks applications, and sends notifications.",
      results: [
        "80% reduction in posting time",
        "3x increase in application volume",
        "Consistent job descriptions across platforms",
        "Automated candidate tracking"
      ],
      icon: "💼"
    },
    {
      title: "E-commerce Order Processing",
      description: "Streamline order fulfillment from payment to shipping with multi-platform integration.",
      industry: "E-commerce",
      challenge: "Manual order processing leads to shipping delays, inventory discrepancies, and customer service issues.",
      solution: "End-to-end automation connecting payment processing, inventory management, shipping, and customer notifications.",
      results: [
        "70% faster order processing",
        "99% inventory accuracy",
        "50% reduction in customer inquiries",
        "Automated shipping and tracking"
      ],
      icon: "🛒"
    }
  ];

  const reviews = [
    {
      name: "Sarah Johnson",
      role: "Marketing Director",
      company: "TechGrowth Inc.",
      content: "This automation platform transformed our marketing operations. What used to take 15 hours per week now happens automatically, and we've seen a 40% increase in engagement.",
      rating: 5,
      date: "May 2024"
    },
    {
      name: "Michael Chen",
      role: "Operations Manager",
      company: "Global Logistics Co.",
      content: "The visual workflow builder is incredibly intuitive. We automated our entire order fulfillment process in just 2 days, reducing errors by 95%.",
      rating: 5,
      date: "April 2024"
    },
    {
      name: "Emily Rodriguez",
      role: "HR Director",
      company: "TalentFirst Solutions",
      content: "Automating our job postings saved us 80% of the time we used to spend. The multi-platform posting feature alone was worth the investment.",
      rating: 4,
      date: "March 2024"
    },
    {
      name: "David Wilson",
      role: "Sales VP",
      company: "RevenueBoost LLC",
      content: "Our lead response time improved dramatically thanks to the CRM automation. The real-time sync between platforms is flawless.",
      rating: 5,
      date: "February 2024"
    }
  ];

  return (
    <div className="min-h-screen">
      <div className="w-full px-4 pt-20 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 w-full"
        >
          <HeroSection
            title={
              <>
                <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                  Automate
                </span>{' '}
                Every{' '}
                <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                  Workflow
                </span>
              </>
            }
            subtitle="Drag-and-drop integrations, 400+ connectors, infinite possibilities"
            description="Transform your business operations with powerful automation workflows that connect your favorite tools and eliminate manual tasks forever."
            backgroundGradient=""
          />
        </motion.div>

        <OperationsPage/>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <FeaturesGrid
            title="Everything You Need to Automate"
            subtitle="Build sophisticated workflows without writing a single line of code. Our platform handles the complexity so you can focus on results."
            features={features}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <UseCases
            title="Real-World Success Stories"
            subtitle="See how companies are saving time, reducing errors, and scaling their operations with PostPilot Automation."
            useCases={useCases}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Trusted by Thousands of Teams
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
              See what our customers say about automating their workflows
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {reviews.map((review, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full bg-background hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 h-full flex flex-col">
                      <div className="flex items-center mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i}
                            className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                            size={16}
                          />
                        ))}
                      </div>
                      <p className="text-lg font-medium mb-4 flex-grow">
                        "{review.content}"
                      </p>
                      <div className="mt-auto">
                        <p className="font-semibold">{review.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {review.role}, {review.company}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">{review.date}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <Card className="bg-gradient-to-r from-primary to-secondary shadow-lg rounded-xl overflow-hidden">
            <CardContent className="p-8">
              <QuoteForm
                title="Ready to Automate Your Workflows?"
                subtitle="Join thousands of companies saving 20+ hours per week with intelligent automation."
                endpoint="/api/contact/automations"
                detailsPlaceholder="Describe your current manual processes and what you'd like to automate..."
              />
            </CardContent>
          </Card>
        </motion.div>
      </div>
>>>>>>> f6197df ("upadte")
    </div>
  );
};

<<<<<<< HEAD
export default AutomationsPage;
=======
export default AutomationsPage;
>>>>>>> f6197df ("upadte")
