
import React from 'react';
import { Mic, Globe, Phone, TrendingUp, Users, Headphones } from 'lucide-react';
import HeroSection from '@/components/products/HeroSection';
import FeaturesGrid from '@/components/products/FeaturesGrid';
import UseCases from '@/components/products/UseCases';
import QuoteForm from '@/components/products/QuoteForm';

const VoiceAgentsPage: React.FC = () => {
  const features = [
    {
      icon: Mic,
      title: "Lifelike TTS & STT",
      description: "Ultra-realistic text-to-speech and speech-to-text with human-like intonation and natural conversations."
    },
    {
      icon: Globe,
      title: "Multi-Language Support",
      description: "Communicate fluently in 29+ languages with native-level pronunciation and cultural context."
    },
    {
      icon: Phone,
      title: "Outbound & Inbound Flows",
      description: "Handle both incoming calls and proactive outreach with intelligent call routing and scripting."
    },
    {
      icon: TrendingUp,
      title: "Real-Time Analytics",
      description: "Track call performance, conversion rates, and conversation insights with detailed reporting."
    },
    {
      icon: Users,
      title: "Human Handover",
      description: "Seamlessly transfer to human agents when needed, with full conversation context and customer data."
    },
    {
      icon: Headphones,
      title: "Voice Customization",
      description: "Choose from premium voices or create custom voice models that match your brand personality."
    }
  ];

  const useCases = [
    {
      title: "Voice-Based Sales Outreach",
      description: "Automated sales calls that qualify leads and schedule meetings with human sales reps.",
      example: "AI calls 100 prospects daily, qualifies based on criteria, and books 15 qualified meetings for the sales team."
    },
    {
      title: "Recruitment Screening",
      description: "Pre-screen job candidates with intelligent voice interviews before human HR review.",
      example: "AI conducts initial screening calls, asks relevant questions, and ranks candidates for final interviews."
    },
    {
      title: "Appointment Scheduling",
      description: "Handle appointment bookings, cancellations, and rescheduling across multiple calendars.",
      example: "Patients call to book appointments, AI checks availability, confirms insurance, and sends reminders."
    },
    {
      title: "Customer Surveys",
      description: "Conduct voice-based customer satisfaction surveys and feedback collection.",
      example: "AI calls customers post-purchase, gathers feedback, and compiles satisfaction reports for management."
    },
    {
      title: "Order Taking & Processing",
      description: "Handle phone orders with payment processing and order confirmation.",
      example: "Restaurant customers call to place orders, AI takes order details, processes payment, and confirms delivery."
    },
    {
      title: "Technical Support Calls",
      description: "Provide first-level technical support through voice with escalation capabilities.",
      example: "Customers call with tech issues, AI troubleshoots common problems and escalates complex issues to specialists."
    }
  ];

  const handleQuoteSuccess = (message: string) => {
    alert(message);
  };

  return (
    <div className="min-h-screen pt-16">
      <HeroSection 
        title="Intelligent Voice Agents"
        subtitle="Sales calls, candidate screening, appointment scheduling—fully automated with human-like AI voices."
        backgroundGradient="from-purple-600 to-pink-600"
      />
      
      <FeaturesGrid features={features} />
      
      <UseCases useCases={useCases} />
      
      <QuoteForm 
        endpoint="/api/contact/voice-agents"
        title="Deploy AI Voice Agents Today"
        onSuccess={handleQuoteSuccess}
      />
    </div>
  );
};

export default VoiceAgentsPage;
