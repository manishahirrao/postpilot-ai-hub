<<<<<<< HEAD

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
=======
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Palette, Video, FileText, Zap, Target, Star } from 'lucide-react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import GoogleAds from '../Ads/GoogleAds';
import MetaAds from '../Ads/MetaAds';
import LinkedInAds from '../Ads/LinkedInAds';
import YouTubeAds from '../Ads/YouTubeAds';
import HeroSection from '@/components/CompanyProducts/HeroSection';
import FeaturesGrid from '@/components/CompanyProducts/FeaturesGrid';
import UseCases from '@/components/CompanyProducts/UseCases';
import QuoteForm from '@/components/CompanyProducts/QuoteForm';
import { Card, CardContent } from '@/components/ui/card';

const AdsGeneratorPage = () => {
  const [activeTab, setActiveTab] = useState('Google Ads');

  const features = [
    {
      icon: FileText,
      title: "Personalized Ad Copy",
      description: "Generate high-converting headlines and descriptions in 5 clicks. Create 3-5 variants per audience segment.",
      benefits: [
        "AI-powered copywriting",
        "Multiple audience segments",
        "High-conversion headlines",
        "Instant variant generation"
      ],
      iconColor: "text-indigo-600",
      titleColor: "text-indigo-600",
      borderColor: "border-indigo-600"
    },
    {
      icon: Palette,
      title: "Dynamic Banner Generation",
      description: "Auto-layout designs for Facebook, Instagram, LinkedIn with smart brand overlay integration.",
      benefits: [
        "Social media specifications",
        "Brand-consistent layouts",
        "Multi-platform optimization",
        "Instant preview generation"
      ],
      iconColor: "text-purple-600",
      titleColor: "text-purple-600",
      borderColor: "border-purple-600"
    },
    {
      icon: Zap,
      title: "Lightning-Fast Generation",
      description: "Create professional ad campaigns in minutes, not days. Scale unlimited variants effortlessly.",
      benefits: [
        "Minutes, not days",
        "Unlimited variants",
        "Batch processing",
        "Quick iterations"
      ],
      iconColor: "text-indigo-600",
      titleColor: "text-indigo-600",
      borderColor: "border-indigo-600"
    },
    {
      icon: Target,
      title: "Audience-Focused Personalization",
      description: "AI analyzes your audience data to create perfectly targeted messaging and visuals.",
      benefits: [
        "Audience analysis",
        "Targeted messaging",
        "Demographic optimization",
        "Behavioral insights"
      ],
      iconColor: "text-purple-600",
      titleColor: "text-purple-600",
      borderColor: "border-purple-600"
>>>>>>> f6197df ("upadte")
    }
  ];

  const useCases = [
    {
<<<<<<< HEAD
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
=======
      title: "E-commerce Success",
      description: "Increased conversion rates by 45% using AI-generated ad copy and visuals",
      icon: "zap",
      industry: "E-commerce",
      challenge: "Low conversion rates and high ad spend",
      solution: "AI-generated ad copy and visuals that resonate with target audience",
      results: [
        "45% increase in conversion rates",
        "30% reduction in CPC"
      ],
      image: "/ecommerce-case-study.jpg",
      titleColor: "text-indigo-600",
      borderColor: "border-indigo-600"
    }
  ];

  const reviews = [
    {
      name: "Sarah Johnson",
      role: "Digital Marketing Director",
      company: "EcomGrowth Inc.",
      content: "This tool cut our ad creation time by 70% while improving our CTR by 45%. The AI-generated copy outperforms our manual versions consistently.",
      rating: 5,
      icon: "🌟"
    },
    {
      name: "Michael Chen",
      role: "PPC Specialist",
      company: "TechScale Marketing",
      content: "The dynamic banner generation saved us countless hours. Now we can test 5x more creatives without additional design resources.",
      rating: 5,
      icon: "🚀"
    },
    {
      name: "Emily Rodriguez",
      role: "Social Media Manager",
      company: "BrandLift Agency",
      content: "Our Meta Ads performance improved dramatically after switching to AI-generated creatives. The platform's audience insights are incredibly accurate.",
      rating: 4,
      icon: "💡"
    },
    {
      name: "David Wilson",
      role: "Head of Growth",
      company: "SaaSForward",
      content: "For LinkedIn Ads, this platform is unmatched. We've seen a 60% increase in lead quality since using their AI-generated content.",
      rating: 5,
      icon: "🎯"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection
        title={
          <>
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Ad Copy AI
            </span>
          </>
        }
        subtitle="Create high-performing ads for multiple platforms"
        description="Generate optimized ads for Google Ads, Meta Ads, LinkedIn Ads, and YouTube Ads. Our AI-powered platform helps you create compelling ad copy and creative assets that convert."
      />

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="Google Ads" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="Google Ads">Google Ads</TabsTrigger>
            <TabsTrigger value="Meta Ads">Meta Ads</TabsTrigger>
            <TabsTrigger value="LinkedIn Ads">LinkedIn Ads</TabsTrigger>
            <TabsTrigger value="YouTube Ads">YouTube Ads</TabsTrigger>
          </TabsList>

          <TabsContent value="Google Ads">
            <GoogleAds />
          </TabsContent>

          <TabsContent value="Meta Ads">
            <MetaAds />
          </TabsContent>

          <TabsContent value="LinkedIn Ads">
            <LinkedInAds />
          </TabsContent>

          <TabsContent value="YouTube Ads">
            <YouTubeAds />
          </TabsContent>
        </Tabs>

        <FeaturesGrid
          title="Everything You Need to Create Winning Ads"
          subtitle="From concept to conversion, our AI handles every aspect of your creative workflow"
          features={features}
        />

        <UseCases
          title="Real Results from Real Campaigns"
          subtitle="See how businesses transform their advertising with AI-powered creative generation"
          useCases={useCases}
        />

        {/* Reviews Section */}
        <div className="my-16">
          <h2 className="text-3xl font-bold text-center mb-2 text-indigo-600">
            What Our Customers Say
          </h2>
          <p className="text-xl text-center text-gray-600 mb-12">
            Trusted by marketing teams at companies of all sizes
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
                <Card className="h-full p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center mb-4">
                    <div className="text-2xl mr-2">{review.icon}</div>
                    <div>
                      <h3 className="font-semibold">{review.name}</h3>
                      <p className="text-sm text-gray-600">{review.role}, {review.company}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">{review.content}</p>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="my-16">
          <Card className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg rounded-xl overflow-hidden">
            <CardContent className="p-8">
              <QuoteForm 
                title="Ready to Transform Your Advertising?"
                subtitle="Join hundreds of marketers creating better ads faster with AI"
                endpoint="/api/generate-quote"
              />
            </CardContent>
          </Card>
        </div>
      </main>
>>>>>>> f6197df ("upadte")
    </div>
  );
};

<<<<<<< HEAD
export default AdsGeneratorPage;
=======
export default AdsGeneratorPage;
>>>>>>> f6197df ("upadte")
