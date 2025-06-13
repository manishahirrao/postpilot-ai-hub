<<<<<<< HEAD

import React from 'react';
import { MessageCircle, Brain, ArrowUpDown, BarChart3, Clock, Globe } from 'lucide-react';
import HeroSection from '@/components/products/HeroSection';
import FeaturesGrid from '@/components/products/FeaturesGrid';
import UseCases from '@/components/products/UseCases';
import QuoteForm from '@/components/products/QuoteForm';

const SupportPage: React.FC = () => {
=======
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import HeroSection from '@/components/CompanyProducts/HeroSection';
import FeaturesGrid from '@/components/CompanyProducts/FeaturesGrid';
import UseCases from '@/components/CompanyProducts/UseCases';
import QuoteForm from '@/components/CompanyProducts/QuoteForm';
import { MessageCircle, Brain, ArrowRight, BarChart, Star } from 'lucide-react';

const SupportPage = () => {
>>>>>>> f6197df ("upadte")
  const features = [
    {
      icon: MessageCircle,
      title: "Multi-Channel Chat",
<<<<<<< HEAD
      description: "Deploy AI chatbots across web, email, social media, and messaging platforms. One solution, everywhere."
=======
      description: "Provide consistent support across web chat, email, social media, and messaging platforms.",
      benefits: [
        "Unified inbox for all channels",
        "Real-time chat widgets",
        "Social media integration",
        "Mobile-responsive design"
      ],
      iconColor: "text-indigo-600",
      titleColor: "text-indigo-600",
      borderColor: "border-indigo-600"
>>>>>>> f6197df ("upadte")
    },
    {
      icon: Brain,
      title: "Contextual Understanding",
<<<<<<< HEAD
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
=======
      description: "AI that understands context, sentiment, and intent to provide accurate, helpful responses.",
      benefits: [
        "Natural language processing",
        "Sentiment analysis",
        "Intent recognition",
        "Multi-language support"
      ],
      iconColor: "text-purple-600",
      titleColor: "text-purple-600",
      borderColor: "border-purple-600"
    },
    {
      icon: ArrowRight,
      title: "Seamless Handover",
      description: "Smooth transitions from AI to human agents when complex issues require personal attention.",
      benefits: [
        "Smart escalation rules",
        "Context preservation",
        "Agent notifications",
        "Priority routing"
      ],
      iconColor: "text-indigo-600",
      titleColor: "text-indigo-600",
      borderColor: "border-indigo-600"
    },
    {
      icon: BarChart,
      title: "Advanced Analytics",
      description: "Comprehensive insights into customer satisfaction, resolution times, and AI performance.",
      benefits: [
        "Customer satisfaction scores",
        "Resolution time tracking",
        "AI accuracy metrics",
        "Custom dashboards"
      ],
      iconColor: "text-purple-600",
      titleColor: "text-purple-600",
      borderColor: "border-purple-600"
>>>>>>> f6197df ("upadte")
    }
  ];

  const useCases = [
    {
      title: "Instant FAQ Resolution",
<<<<<<< HEAD
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
=======
      description: "AI chatbot handles 80% of common customer questions instantly, 24/7.",
      industry: "SaaS",
      challenge: "Customer support team overwhelmed with repetitive questions, leading to long response times and customer frustration.",
      solution: "AI chatbot trained on knowledge base to instantly answer common questions with seamless escalation for complex issues.",
      results: [
        "80% reduction in support ticket volume",
        "Average response time under 30 seconds",
        "95% customer satisfaction rate",
        "24/7 availability without additional staff"
      ],
      icon: "💬",
      titleColor: "text-indigo-600",
      borderColor: "border-indigo-600"
    },
    {
      title: "Multilingual Support",
      description: "Provide customer support in 50+ languages without hiring multilingual staff.",
      industry: "E-commerce",
      challenge: "Global expansion limited by language barriers and high cost of multilingual support staff.",
      solution: "AI-powered support system with real-time translation and culturally-aware responses for global customers.",
      results: [
        "50+ languages supported",
        "90% accuracy in translations",
        "3x expansion in global markets",
        "50% reduction in support costs"
      ],
      icon: "🌍",
      titleColor: "text-purple-600",
      borderColor: "border-purple-600"
    },
    {
      title: "Ticket Summarization",
      description: "Automatically summarize long customer conversations for faster agent review.",
      industry: "Enterprise",
      challenge: "Support agents spend too much time reading through long conversation histories, slowing down resolution times.",
      solution: "AI summarizes conversation history, highlights key issues, and suggests solutions for faster agent response.",
      results: [
        "60% faster ticket resolution",
        "Improved agent productivity",
        "Better customer satisfaction",
        "Reduced average handle time"
      ],
      icon: "📄",
      titleColor: "text-indigo-600",
      borderColor: "border-indigo-600"
    },
    {
      title: "Proactive Support",
      description: "Identify potential issues before customers report them and reach out proactively.",
      industry: "Software",
      challenge: "Customers experience issues that could be prevented, leading to churn and negative reviews.",
      solution: "AI monitors user behavior patterns to identify potential issues and triggers proactive support outreach.",
      results: [
        "40% reduction in support tickets",
        "25% decrease in customer churn",
        "Improved product satisfaction",
        "Higher customer lifetime value"
      ],
      icon: "🔮",
      titleColor: "text-purple-600",
      borderColor: "border-purple-600"
    }
  ];

  const reviews = [
    {
      name: "Sarah Johnson",
      role: "Customer Support Manager",
      company: "TechSolutions Inc.",
      content: "Since implementing this AI support system, our response times have improved by 70% and customer satisfaction scores are at an all-time high. The seamless handover to human agents is flawless.",
      rating: 5,
      date: "May 2024"
    },
    {
      name: "Michael Chen",
      role: "Director of Operations",
      company: "GlobalEcom",
      content: "The multilingual support has been a game-changer for our international expansion. We're now supporting customers in 12 languages with the same small team we had before.",
      rating: 5,
      date: "April 2024"
    },
    {
      name: "Emma Rodriguez",
      role: "VP of Customer Experience",
      company: "SaaSStartup",
      content: "The analytics dashboard gives us incredible visibility into our support operations. We've identified several process improvements that have reduced our average handle time by 40%.",
      rating: 4,
      date: "March 2024"
    }
  ];

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="min-h-screen bg-gray-50">
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
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  24/7 AI
                </span>{' '}
                Customer{' '}
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Support
                </span>
              </>
            }
            subtitle="Resolve tickets, escalate when needed, delight customers"
            description="Transform your customer support with AI that understands, responds, and learns from every interaction to deliver exceptional customer experiences."
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <FeaturesGrid
            title="Intelligent Support That Scales"
            subtitle="Deliver personalized, contextual support across all channels while reducing costs and improving customer satisfaction."
            features={features}
            titleClass="text-indigo-600"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <UseCases
            title="Customer Support Success Stories"
            subtitle="Discover how businesses are revolutionizing their customer support with AI-powered solutions."
            useCases={useCases}
            titleClass="text-indigo-600"
          />
        </motion.div>

        {/* New Reviews Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                Trusted by Support Teams Worldwide
              </h2>
              <p className="mt-4 text-xl text-gray-600">
                Hear what our customers say about transforming their support experience
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {reviews.map((review, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="flex flex-col h-full">
                      <div className="flex items-center mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <p className="text-gray-700 mb-6 flex-grow">"{review.content}"</p>
                      <div className="mt-auto">
                        <div className="font-semibold text-gray-900">{review.name}</div>
                        <div className="text-sm text-gray-600">{review.role}, {review.company}</div>
                        <div className="text-xs text-gray-500 mt-1">{review.date}</div>
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
          <Card className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg rounded-xl overflow-hidden">
            <CardContent className="p-8">
              <QuoteForm
                title="Ready to Transform Your Support?"
                subtitle="Join hundreds of companies providing better support while reducing costs with AI."
                endpoint="/api/contact/support"
                detailsPlaceholder="Tell us about your current support challenges and volume..."
                buttonClass="bg-white text-indigo-600 hover:bg-gray-100"
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
export default SupportPage;
=======
export default SupportPage;
>>>>>>> f6197df ("upadte")
