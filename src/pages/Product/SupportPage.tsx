
import React from 'react';
import { MessageCircle, Brain, ArrowUpDown, BarChart3, Clock, Globe } from 'lucide-react';
import HeroSection from '@/components/products/HeroSection';
import FeaturesGrid from '@/components/products/FeaturesGrid';
import UseCases from '@/components/products/UseCases';
import QuoteForm from '@/components/products/QuoteForm';

const SupportPage: React.FC = () => {
  const features = [
    {
      icon: MessageCircle,
      title: "Multi-Channel Chat",
      description: "Deploy AI chatbots across web, email, social media, and messaging platforms. One solution, everywhere."
    },
    {
      icon: Brain,
      title: "Contextual Understanding",
      description: "Advanced NLP that understands customer intent, maintains context, and provides relevant responses."
    },
    {
      icon: ArrowUpDown,
      title: "Seamless Handover",
      description: "Smart escalation to human agents when needed, with full conversation context and customer history."
    },
    {
      icon: BarChart3,
      title: "Analytics & Reporting",
      description: "Comprehensive insights into customer interactions, resolution rates, and satisfaction scores."
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Never miss a customer inquiry. Your AI assistant works around the clock to support your customers."
    },
    {
      icon: Globe,
      title: "Multi-Language Support",
      description: "Communicate with customers in their preferred language with built-in translation capabilities."
    }
  ];

  const useCases = [
    {
      title: "Instant FAQ Resolution",
      description: "Automatically answer common questions and reduce support ticket volume by 70%.",
      example: "Customer asks about return policy, AI instantly provides detailed policy and guides them through the return process."
    },
    {
      title: "Ticket Summarization",
      description: "AI analyzes long customer conversations and creates concise summaries for agents.",
      example: "Complex technical issue across 20+ messages gets summarized into key points and suggested solutions."
    },
    {
      title: "Chat-to-Email Handoff",
      description: "Seamlessly transition conversations from chat to email when detailed responses are needed.",
      example: "Customer needs detailed technical documentation, AI transfers conversation to email with full context."
    },
    {
      title: "Product Recommendations",
      description: "Intelligent product suggestions based on customer needs and purchase history.",
      example: "Customer looking for laptop, AI recommends models based on their budget, usage, and preferences."
    },
    {
      title: "Order Status & Tracking",
      description: "Instant order updates and shipping information without human intervention.",
      example: "Customer asks about order status, AI provides real-time tracking info and delivery estimates."
    },
    {
      title: "Lead Qualification",
      description: "Pre-qualify sales leads through intelligent conversations before routing to sales team.",
      example: "AI asks qualifying questions about budget, timeline, and needs before scheduling sales call."
    }
  ];

  const handleQuoteSuccess = (message: string) => {
    alert(message);
  };

  return (
    <div className="min-h-screen pt-16">
      <HeroSection 
        title="24/7 AI Customer Support"
        subtitle="Resolve tickets instantly, escalate intelligently, and delight customers around the clock with AI-powered support."
        backgroundGradient="from-emerald-600 to-teal-600"
      />
      
      <FeaturesGrid features={features} />
      
      <UseCases useCases={useCases} />
      
      <QuoteForm 
        endpoint="/api/contact/support"
        title="Transform Your Customer Support"
        onSuccess={handleQuoteSuccess}
      />
    </div>
  );
};

export default SupportPage;
