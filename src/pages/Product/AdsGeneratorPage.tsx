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
      title: "E-commerce Flash Sale Campaign",
      description: "Generate urgent, compelling copy and vibrant banners for limited-time offers across all social platforms.",
      example: "Create '24-Hour Flash Sale!' banners with countdown timers and product showcases for maximum conversion."
    },
    {
      title: "Video Ad Script Generator",
      description: "Create engaging video scripts with storyboards and voiceover text for YouTube and TikTok ads.",
      example: "Generate a 30-second script for a product demo video with call-to-action and brand messaging."
    },
    {
      title: "Social Media Post Generator",
      description: "Automatically create engaging posts for Instagram, Facebook, and Twitter with optimized hashtags.",
      example: "Generate a carousel post for Instagram showcasing product features with relevant hashtags and CTA."
    },
    {
      title: "Email Marketing Templates",
      description: "Generate professional email templates with personalized subject lines and compelling copy.",
      example: "Create a welcome series email template with product recommendations and special offers."
    },
    {
    }
  ];

  const useCases = [
    {
      title: "E-commerce Success",
      description: "Increased conversion rates by 45% using AI-generated ad copy and visuals",
      industry: "E-commerce",
      challenge: "Marketing team struggled with creating engaging ad copy and visuals",
      solution: "AI-powered ad generator created personalized, high-converting ads",
      results: [
        "45% increase in conversion rate",
        "30% lower CPC",
        "95% customer satisfaction rate"
      ]
    },
    {
      title: "Social Media Growth",
      description: "Automated content generation for 5 platforms",
      industry: "Marketing",
      challenge: "Content team overwhelmed with daily social media posting",
      solution: "AI generated consistent, engaging content across platforms",
      results: [
        "50% increase in followers",
        "75% engagement rate improvement",
        "2x content creation speed"
      ]
    },
    {
      title: "Email Marketing",
      description: "Created personalized email campaigns",
      industry: "SaaS",
      challenge: "Low email open and conversion rates",
      solution: "AI generated personalized, compelling email content",
      results: [
        "40% open rate",
        "20% conversion rate",
        "90% customer satisfaction"
      ]
    }
  ];

  const handleQuoteSuccess = (message: string) => {
    console.log(message);
  };

  return (
    <div className="min-h-screen">
      <div className="w-full px-4 pt-20 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <HeroSection 
            title="AI-Powered Ads & Creative Generator"
            subtitle="Transform your marketing with intelligent content generation"
          />
        </motion.div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <FeaturesGrid
            features={features}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-16"
        >
          <UseCases
            useCases={useCases}
          />
        </motion.div>
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
