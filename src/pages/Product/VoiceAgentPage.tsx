
import React from 'react';

import HeroSection from '@/components/CompanyProducts/HeroSection';
import FeaturesGrid from '@/components/CompanyProducts/FeaturesGrid';
import UseCases from '@/components/CompanyProducts/UseCases';
import QuoteForm from '@/components/CompanyProducts/QuoteForm';
import { Phone, Mic, Globe, BarChart } from 'lucide-react';
import AIVoicePlatform from '../Images/AIVoiceAgent';

const VoiceAgentsPage = () => {
  const features = [
    {
      icon: Phone,
      title: "Lifelike Voice Technology",
      description: "Ultra-realistic AI voices that sound natural and professional in every conversation.",
      benefits: [
        "11+ premium voice options",
        "Emotional tone adaptation",
        "Natural conversation flow",
        "Background noise filtering"
      ]
    },
    {
      icon: Globe,
      title: "Multi-Language Support",
      description: "Conduct conversations in 29+ languages with native-level pronunciation and cultural awareness.",
      benefits: [
        "29+ languages supported",
        "Native pronunciation",
        "Cultural context awareness",
        "Real-time translation"
      ]
    },
    {
      icon: Mic,
      title: "Outbound & Inbound Flows",
      description: "Handle both outgoing sales calls and incoming customer inquiries with intelligent routing.",
      benefits: [
        "Smart call routing",
        "Appointment scheduling",
        "Lead qualification",
        "Follow-up automation"
      ]
    },
    {
      icon: BarChart,
      title: "Real-Time Analytics",
      description: "Monitor call performance, conversion rates, and customer sentiment in real-time.",
      benefits: [
        "Live call monitoring",
        "Sentiment analysis",
        "Conversion tracking",
        "Performance insights"
      ]
    }
  ];

  const useCases = [
    {
      title: "Voice-Based Sales Outreach",
      description: "AI voice agents conduct initial sales calls, qualify leads, and schedule meetings.",
      industry: "Sales",
      challenge: "Sales team spends too much time on initial outreach calls that often don't convert, reducing time for qualified leads.",
      solution: "AI voice agents handle initial outreach, qualify prospects, and only transfer hot leads to human sales reps.",
      results: [
        "3x increase in qualified leads",
        "60% reduction in sales team workload",
        "40% improvement in call consistency",
        "24/7 prospect engagement"
      ],
      icon: "📞"
    },
    {
      title: "Automated Recruitment Screening",
      description: "Conduct initial candidate interviews and technical screenings via voice calls.",
      industry: "HR Tech",
      challenge: "HR teams overwhelmed with candidate screening, leading to slow hiring processes and missed top talent.",
      solution: "AI voice agents conduct initial screenings, ask relevant questions, and score candidates for human review.",
      results: [
        "80% faster screening process",
        "Consistent interview questions",
        "50% reduction in hiring time",
        "Improved candidate experience"
      ],
      icon: "🎤"
    },
    {
      title: "Voice Surveys & Feedback",
      description: "Collect customer feedback through natural voice conversations instead of boring forms.",
      industry: "Market Research",
      challenge: "Low response rates on traditional surveys and forms, limiting valuable customer insights.",
      solution: "AI voice agents conduct conversational surveys that feel natural and encourage honest feedback.",
      results: [
        "5x higher response rates",
        "More detailed feedback",
        "Real-time sentiment analysis",
        "Automated insights generation"
      ],
      icon: "🎯"
    },
    {
      title: "Appointment Scheduling",
      description: "Handle appointment bookings, rescheduling, and confirmations across multiple calendars.",
      industry: "Healthcare",
      challenge: "Front desk staff overwhelmed with appointment scheduling, leading to booking errors and customer frustration.",
      solution: "AI voice agents handle all appointment-related calls with real-time calendar integration and confirmation.",
      results: [
        "95% scheduling accuracy",
        "50% reduction in no-shows",
        "24/7 booking availability",
        "Improved patient satisfaction"
      ],
      icon: "📅"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
    
      
      <HeroSection
        title="Intelligent Voice Agents"
        subtitle="Sales calls, candidate screening, appointment scheduling—fully automated"
        description="Deploy AI voice agents that sound human, understand context, and handle complex conversations at scale while maintaining the personal touch your customers expect."
        backgroundGradient="gradient-accent"
      />
  <AIVoicePlatform/>
      <FeaturesGrid
        title="Voice AI That Feels Human"
        subtitle="Advanced voice technology that handles complex conversations with the nuance and empathy of your best human agents."
        features={features}
      />

      <UseCases
        title="Voice AI Success Stories"
        subtitle="See how companies are scaling their voice operations while improving customer experiences."
        useCases={useCases}
      />

      <QuoteForm
        title="Ready to Deploy Voice Agents?"
        subtitle="Transform your phone operations with AI voice agents that work around the clock."
        endpoint="/api/contact/voice-agents"
        companyField="Monthly Call Volume"
        detailsPlaceholder="Describe your current phone operations and what you'd like to automate..."
      />

      
    </div>
  );
};

export default VoiceAgentsPage;
