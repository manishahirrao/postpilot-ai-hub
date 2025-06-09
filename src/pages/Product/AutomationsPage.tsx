
import React from 'react';
import { Workflow, Zap, Shield, Users, ArrowRight, Clock } from 'lucide-react';
import HeroSection from '@/components/products/HeroSection';
import FeaturesGrid from '@/components/products/FeaturesGrid';
import UseCases from '@/components/products/UseCases';
import QuoteForm from '@/components/products/QuoteForm';

const AutomationsPage: React.FC = () => {
  const features = [
    {
      icon: Workflow,
      title: "Visual Workflow Builder",
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
    }
  ];

  const useCases = [
    {
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
    </div>
  );
};

export default AutomationsPage;
