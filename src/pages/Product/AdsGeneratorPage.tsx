import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Palette, Video, FileText, Zap, Target, Star, BarChart3, Sparkles } from 'lucide-react';

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
import QuoteForm from '@/components/products/QuoteForm';
import { Card, CardContent } from '@/components/ui/card';

const AdsGeneratorPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Google Ads');

  const features = [
    {
      icon: Sparkles,
      title: "Personalized Ad Copy",
      description: "Generate high-converting headlines and descriptions in 5 clicks. Create 3-5 variants per audience segment with tone and style controls.",
    },
    {
      icon: Palette,
      title: "Dynamic Banner Generation", 
      description: "Auto-layout designs for Facebook, Instagram, LinkedIn with brand overlay. Social-media specs automatically optimized for each platform.",
    },
    {
      icon: Video,
      title: "Automated Video Ads",
      description: "Template-driven 15-30s ads with music, transitions, and text overlays. Professional scenes and animations included.",
    },
    {
      icon: Target,
      title: "A/B Testing Assets",
      description: "Create and preview variants side-by-side. Auto-split tests with performance tracking and optimization suggestions.",
    },
    {
      icon: BarChart3,
      title: "Performance Analytics",
      description: "Real-time insights on ad performance, engagement metrics, and conversion tracking across all platforms and campaigns.",
    },
  ];

  const useCases = [
    {
      title: "E-commerce Success",
      description: "Increased conversion rates by 45% using AI-generated ad copy and visuals",
      industry: "E-commerce",
      challenge: "Marketing team struggled with creating engaging ad copy and visuals",
      solution: "AI-powered ad generator created personalized, high-converting ads",
      results: ["45% increase in conversion rate", "30% lower CPC", "95% customer satisfaction rate"],
    },
    {
      title: "Social Media Growth",
      description: "Automated content generation for 5 platforms",
      industry: "Marketing",
      challenge: "Content team overwhelmed with daily social media posting",
      solution: "AI generated consistent, engaging content across platforms",
      results: ["50% increase in followers", "75% engagement rate improvement", "2x content creation speed"],
    },
    {
      title: "Email Marketing",
      description: "Created personalized email campaigns",
      industry: "SaaS",
      challenge: "Low email open and conversion rates",
      solution: "AI generated personalized, compelling email content",
      results: ["40% open rate", "20% conversion rate", "90% customer satisfaction"],
    },
  ];

  const reviews = [
    {
      name: "Amit S.",
      role: "Marketing Manager",
      company: "SwiftCommerce",
      content: "We cut ad production time by 80% and saw a 30% boost in conversions. Incredible tool!",
      rating: 5,
      icon: "🧠",
    },
    {
      name: "Priya K.",
      role: "Social Media Lead",
      company: "BrandBuzz",
      content: "AI-generated banners and captions are better than our old manual process.",
      rating: 4,
      icon: "🎯",
    },
    {
      name: "Rahul D.",
      role: "Founder",
      company: "StartupSnap",
      content: "It’s like having a full ad team in one tool. Totally recommend it to early-stage founders.",
      rating: 5,
      icon: "🚀",
    },
    {
      name: "Sara T.",
      role: "Performance Marketer",
      company: "AdMagic",
      content: "The A/B testing and analytics features are my favorite. Saved us weeks of testing.",
      rating: 5,
      icon: "📈",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
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

      {/* Features and Use Cases */}
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <FeaturesGrid features={features} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-16"
        >
          <UseCases useCases={useCases} />
        </motion.div>
      </div>

      {/* Ads Tabs */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="Google Ads" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="Google Ads">Google Ads</TabsTrigger>
            <TabsTrigger value="Meta Ads">Meta Ads</TabsTrigger>
            <TabsTrigger value="LinkedIn Ads">LinkedIn Ads</TabsTrigger>
            <TabsTrigger value="YouTube Ads">YouTube Ads</TabsTrigger>
          </TabsList>

          <TabsContent value="Google Ads"><GoogleAds /></TabsContent>
          <TabsContent value="Meta Ads"><MetaAds /></TabsContent>
          <TabsContent value="LinkedIn Ads"><LinkedInAds /></TabsContent>
          <TabsContent value="YouTube Ads"><YouTubeAds /></TabsContent>
        </Tabs>

        {/* Reviews */}
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

        {/* Quote Form CTA */}
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
    </div>
  );
};

export default AdsGeneratorPage;
