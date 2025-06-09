
import React from 'react';
import HeroSection from '@/components/products/HeroSection';
import FeaturesGrid from '@/components/products/FeaturesGrid';
import UseCases from '@/components/products/UseCases';
import QuoteForm from '@/components/products/QuoteForm';
import { useToast } from '@/hooks/use-toast';
import { 
  Palette, 
  Video, 
  Target, 
  BarChart3,
  Sparkles
} from 'lucide-react';

const AdsGeneratorPage: React.FC = () => {
  const { toast } = useToast();

  const features = [
    {
      icon: Sparkles,
      title: "Personalized Ad Copy",
      description: "Generate high-converting headlines and descriptions in 5 clicks. Create 3-5 variants per audience segment with tone and style controls."
    },
    {
      icon: Palette,
      title: "Dynamic Banner Generation", 
      description: "Auto-layout designs for Facebook, Instagram, LinkedIn with brand overlay. Social-media specs automatically optimized for each platform."
    },
    {
      icon: Video,
      title: "Automated Video Ads",
      description: "Template-driven 15-30s ads with music, transitions, and text overlays. Professional scenes and animations included."
    },
    {
      icon: Target,
      title: "A/B Testing Assets",
      description: "Create and preview variants side-by-side. Auto-split tests with performance tracking and optimization suggestions."
    },
    {
      icon: BarChart3,
      title: "Performance Analytics",
      description: "Real-time insights on ad performance, engagement metrics, and conversion tracking across all platforms and campaigns."
    }
  ];

  const useCases = [
    {
      title: "E-commerce Flash Sale Campaign",
      description: "Generate urgent, compelling copy and vibrant banners for limited-time offers across all social platforms.",
      example: "Create '24-Hour Flash Sale!' banners with countdown timers and product showcases for maximum conversion."
    },
    {
      title: "Event Promotion Videos", 
      description: "Automated video creation for conferences, webinars, and product launches with professional templates.",
      example: "Generate 30-second teaser videos with speaker highlights, agenda previews, and registration CTAs."
    },
    {
      title: "Retargeting Carousel Ads",
      description: "Dynamic product carousels that automatically update based on user behavior and browsing history.",
      example: "Show personalized product recommendations with 'Complete Your Purchase' messaging for cart abandoners."
    },
    {
      title: "B2B Lead Generation",
      description: "Professional LinkedIn ads with industry-specific messaging and thought leadership positioning.", 
      example: "Create 'Download Our White Paper' campaigns with compelling statistics and professional imagery."
    }
  ];

  const handleQuoteSuccess = (message: string) => {
    toast({
      title: "Quote Request Sent!",
      description: message,
    });
  };

  return (
    <div className="min-h-screen">
      <HeroSection
        title="AI-Powered Ads & Creative Generator"
        subtitle="Automate copywriting, banners, and videos—tailored to every audience. Generate unlimited variants in minutes, not days."
        backgroundGradient="from-purple-600 to-pink-600"
      />
      
      <FeaturesGrid features={features} />
      
      <UseCases useCases={useCases} />
      
      <QuoteForm
        endpoint="/api/contact/ads-generator"
        title="Get Your Custom Ad Package"
        onSuccess={handleQuoteSuccess}
      />
    </div>
  );
};

export default AdsGeneratorPage;
