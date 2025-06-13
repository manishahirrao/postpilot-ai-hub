import React, { useState } from 'react';
import { ChevronDown, Upload, Image, Type, MousePointer, FileText, Zap, Eye, Target, Download, Copy, Play } from 'lucide-react';

interface FormData {
  campaignName: string;
  adType: string;
  businessType: string;
  targetAudience: string;
  callToAction: string;
  productService: string;
  keyMessage: string;
  selectedCTA: string;
  customHeadline: string;
  customDescription: string;
}

interface GeneratedContent {
  primaryText?: string;
  headline?: string;
  description?: string;
  imageSpecs?: string;
  videoSpecs?: string;
  carouselSpecs?: string;
  reelsSpecs?: string;
  overlayText?: string;
  carouselCards?: Array<{
    headline: string;
    description: string;
  }>;
}

const MetaAdsGenerator: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    campaignName: '',
    adType: '',
    businessType: '',
    targetAudience: '',
    callToAction: '',
    productService: '',
    keyMessage: '',
    selectedCTA: '',
    customHeadline: '',
    customDescription: ''
  });

  const [generatedContent, setGeneratedContent] = useState<GeneratedContent>({});
  const [showGenerated, setShowGenerated] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const adTypes = [
    { value: '', label: 'Select Ad Type' },
    { value: 'single-image', label: 'Single Image Ad' },
    { value: 'carousel', label: 'Carousel Ad' },
    { value: 'video', label: 'Video Ad' },
    { value: 'reels-stories', label: 'Reels & Stories' }
  ];

  const businessTypes = [
    'E-commerce', 'SaaS/Software', 'Healthcare', 'Education', 'Real Estate', 
    'Restaurant/Food', 'Fitness/Wellness', 'Finance', 'Travel', 'Fashion', 'Other'
  ];

  const ctaOptions = [
    'Learn More', 'Shop Now', 'Sign Up', 'Download', 'Book Now', 
    'Contact Us', 'Get Quote', 'Subscribe', 'Apply Now', 'See Menu'
  ];

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const generateContent = () => {
    const { adType, businessType, targetAudience, productService, keyMessage, callToAction, selectedCTA } = formData;
    
    if (!adType || !businessType || !productService) {
      alert('Please fill in basic campaign information first');
      return;
    }

    let generated: GeneratedContent = {};

    switch (adType) {
      case 'single-image':
        generated = {
          primaryText: generatePrimaryText(businessType, productService, keyMessage, targetAudience),
          headline: generateHeadline(businessType, productService),
          description: generateDescription(businessType, productService),
          imageSpecs: `SINGLE IMAGE AD SPECIFICATIONS:

IMAGE REQUIREMENTS:
• Dimensions: 1,200 × 628 pixels (1.91:1 aspect ratio)
• Format: JPG or PNG
• File size: Maximum 30 MB
• Resolution: High quality, minimum 1080p
• Content: 20% text rule (minimal text overlay)

DESIGN GUIDELINES:
• Use high-contrast, eye-catching visuals
• Include brand logo prominently
• Ensure image works on mobile devices
• Test with and without text overlay
• Consider seasonal/trending elements
• Use brand colors consistently

BEST PRACTICES:
• Focus on product/service benefits
• Show real people using your product
• Use lifestyle imagery when appropriate
• Avoid cluttered compositions
• Ensure image tells a story`
        };
        break;

      case 'carousel':
        const carouselCards = generateCarouselCards(businessType, productService, keyMessage);
        generated = {
          primaryText: generatePrimaryText(businessType, productService, keyMessage, targetAudience),
          carouselCards: carouselCards,
          carouselSpecs: `CAROUSEL AD SPECIFICATIONS:

CAROUSEL REQUIREMENTS:
• Cards: 2-10 cards per carousel
• Image dimensions: 1,080 × 1,080 pixels (1:1 aspect ratio)
• Format: JPG or PNG per card
• File size: Maximum 30 MB per image
• Total campaign size: Consider loading times

CARD SPECIFICATIONS:
• Headline: Maximum 40 characters per card
• Description: Maximum 20 characters per card (optional)
• Destination URL: Unique URL per card allowed
• Image consistency: Maintain visual cohesion

DESIGN GUIDELINES:
• Tell a sequential story across cards
• Use consistent branding elements
• Vary content while maintaining theme
• Include clear product shots
• Test card order for optimal performance

CONTENT STRATEGY:
• Feature different products/services
• Show various use cases
• Highlight multiple benefits
• Create before/after sequences
• Showcase customer testimonials`
        };
        break;

      case 'video':
        generated = {
          primaryText: generatePrimaryText(businessType, productService, keyMessage, targetAudience),
          headline: generateHeadline(businessType, productService),
          videoSpecs: `VIDEO AD SPECIFICATIONS:

VIDEO REQUIREMENTS:
• Format: MP4 or MOV
• Minimum resolution: 720 × 720 pixels
• Maximum file size: 4 GB
• Maximum duration: 240 seconds (15-60 seconds recommended)
• Aspect ratios: 16:9, 1:1, or 4:5 supported
• Frame rate: 30fps recommended

AUDIO SPECIFICATIONS:
• Format: AAC audio, 128kbps+
• Ensure audio works without visuals
• Include captions for accessibility
• Test audio levels across devices
• Consider auto-play without sound

CONTENT GUIDELINES:
• Hook viewers in first 3 seconds
• Show brand/product early
• Include clear call-to-action
• Optimize for mobile viewing
• Test with/without audio

THUMBNAIL SPECIFICATIONS:
• Dimensions: 1,200 × 675 pixels (recommended)
• Format: JPG or PNG
• High quality, representative frame
• Include branding elements
• Test thumbnail effectiveness`
        };
        break;

      case 'reels-stories':
        generated = {
          overlayText: generateReelsOverlay(businessType, productService, keyMessage),
          reelsSpecs: `REELS & STORIES SPECIFICATIONS:

VIDEO REQUIREMENTS:
• Dimensions: 1,080 × 1,920 pixels (9:16 aspect ratio)
• Format: MP4 or MOV
• Maximum duration: 120 seconds
• Minimum duration: 1 second
• File size: Maximum 4 GB
• Frame rate: 30fps recommended

DESIGN CONSIDERATIONS:
• Vertical orientation optimized
• Mobile-first design approach
• Full-screen immersive experience
• Minimal text overlay (accessibility)
• High contrast for visibility

OVERLAY TEXT SPECIFICATIONS:
• Title: Clear, concise messaging
• Short description: Supporting details
• Font: Large, readable on mobile
• Positioning: Safe zones consideration
• Animation: Subtle, non-distracting

CONTENT STRATEGY:
• Behind-the-scenes content
• Quick tutorials/tips
• Product demonstrations
• User-generated content
• Trending audio/effects integration

TECHNICAL NOTES:
• Test across different devices
• Ensure text readability
• Consider story highlights
• Optimize loading speed
• Include branded elements subtly`
        };
        break;
    }

    setGeneratedContent(generated);
    setShowGenerated(true);
  };

  const generatePrimaryText = (businessType: string, product: string, message: string, audience: string): string => {
    const baseMessage = message || `Transform your ${audience || 'business'} with our premium ${product}`;
    const cta = formData.callToAction || 'Learn more';
    
    const templates: Record<string, string> = {
      'E-commerce': `🛍️ ${baseMessage}. Shop now and save up to 50% on ${product}! Free shipping included. ${cta} ⬇️`,
      'SaaS/Software': `🚀 ${baseMessage}. Join thousands who've streamlined their workflow with ${product}. ${cta} about our free trial!`,
      'Healthcare': `💙 ${baseMessage}. Trusted by healthcare professionals nationwide. ${cta} about our ${product} solutions.`,
      'Education': `📚 ${baseMessage}. Master new skills with our proven ${product} courses. ${cta} about enrollment today!`,
      'Real Estate': `🏠 ${baseMessage}. Find your perfect ${product} with our expert guidance. ${cta} about available properties.`,
      'Restaurant/Food': `🍽️ ${baseMessage}. Fresh, delicious ${product} made with premium ingredients. ${cta} and order today!`,
      'Fitness/Wellness': `💪 ${baseMessage}. Transform your health with our ${product} program. ${cta} about getting started!`,
      'Finance': `💰 ${baseMessage}. Secure your financial future with our ${product} services. ${cta} for a free consultation.`,
      'Travel': `✈️ ${baseMessage}. Discover amazing ${product} deals and create unforgettable memories. ${cta} today!`,
      'Fashion': `👗 ${baseMessage}. Elevate your style with our latest ${product} collection. ${cta} and shop now!`
    };

    const generated = templates[businessType] || 
      `✨ ${baseMessage}. Experience the difference with our ${product}. ${cta} today!`;
    
    return generated.substring(0, 125);
  };

  const generateHeadline = (businessType: string, product: string): string => {
    const headlines: Record<string, string> = {
      'E-commerce': `Best ${product} Deals`,
      'SaaS/Software': `${product} Made Easy`,
      'Healthcare': `Advanced ${product}`,
      'Education': `Learn ${product} Fast`,
      'Real Estate': `Dream ${product} Found`,
      'Restaurant/Food': `Fresh ${product} Daily`,
      'Fitness/Wellness': `Transform Today`,
      'Finance': `Smart ${product}`,
      'Travel': `Amazing ${product}`,
      'Fashion': `Style ${product}`
    };
    
    const generated = headlines[businessType] || `Quality ${product}`;
    return generated.substring(0, 40);
  };

  const generateDescription = (businessType: string, product: string): string => {
    const descriptions: Record<string, string> = {
      'E-commerce': 'Shop now & save',
      'SaaS/Software': 'Try free today',
      'Healthcare': 'Expert care',
      'Education': 'Start learning',
      'Real Estate': 'Find your home',
      'Restaurant/Food': 'Order fresh',
      'Fitness/Wellness': 'Get fit now',
      'Finance': 'Secure future',
      'Travel': 'Book adventure',
      'Fashion': 'Look amazing'
    };
    
    const generated = descriptions[businessType] || 'Get started';
    return generated.substring(0, 30);
  };

  const generateCarouselCards = (businessType: string, product: string, message: string) => {
    const cardSets: Record<string, Array<{headline: string, description: string}>> = {
      'E-commerce': [
        { headline: 'Premium Quality', description: 'Best materials' },
        { headline: 'Fast Shipping', description: 'Free delivery' },
        { headline: 'Great Prices', description: 'Save up to 50%' },
        { headline: 'Happy Customers', description: '5-star reviews' }
      ],
      'SaaS/Software': [
        { headline: 'Easy Setup', description: '5-min install' },
        { headline: 'Powerful Features', description: 'All-in-one' },
        { headline: 'Great Support', description: '24/7 help' },
        { headline: 'Free Trial', description: 'Start today' }
      ],
      'Healthcare': [
        { headline: 'Expert Care', description: 'Certified pros' },
        { headline: 'Modern Tech', description: 'Latest tools' },
        { headline: 'Quick Results', description: 'Fast relief' },
        { headline: 'Trusted Choice', description: 'Proven results' }
      ]
    };

    return cardSets[businessType] || [
      { headline: `Best ${product}`, description: 'Top quality' },
      { headline: 'Great Service', description: 'Expert help' },
      { headline: 'Fast Results', description: 'Quick wins' },
      { headline: 'Try Today', description: 'Get started' }
    ];
  };

  const generateReelsOverlay = (businessType: string, product: string, message: string): string => {
    const overlays: Record<string, string> = {
      'E-commerce': `🛍️ TITLE: "Shop ${product} Now"\nDESCRIPTION: "Premium quality, unbeatable prices, fast shipping!"`,
      'SaaS/Software': `🚀 TITLE: "${product} in 60 Seconds"\nDESCRIPTION: "See how easy it is to get started today!"`,
      'Healthcare': `💙 TITLE: "Better ${product} Care"\nDESCRIPTION: "Expert solutions for your health needs"`,
      'Education': `📚 TITLE: "Master ${product}"\nDESCRIPTION: "Learn from industry experts, start today!"`,
      'Real Estate': `🏠 TITLE: "Your Dream ${product}"\nDESCRIPTION: "Find the perfect property with us"`,
      'Restaurant/Food': `🍽️ TITLE: "Fresh ${product}"\nDESCRIPTION: "Made daily with premium ingredients"`,
      'Fitness/Wellness': `💪 TITLE: "Transform Today"\nDESCRIPTION: "Your ${product} journey starts now"`,
      'Finance': `💰 TITLE: "Smart ${product}"\nDESCRIPTION: "Secure your financial future today"`,
      'Travel': `✈️ TITLE: "Amazing ${product}"\nDESCRIPTION: "Discover your next adventure"`,
      'Fashion': `👗 TITLE: "Style ${product}"\nDESCRIPTION: "Elevate your look with our collection"`
    };

    return overlays[businessType] || 
      `✨ TITLE: "Discover ${product}"\nDESCRIPTION: "Experience the difference today!"`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const downloadSpecs = () => {
    const specs = Object.entries(generatedContent)
      .map(([key, value]) => {
        if (key === 'carouselCards' && Array.isArray(value)) {
          return `CAROUSEL CARDS:\n${value.map((card, i) => 
            `Card ${i + 1}:\nHeadline: ${card.headline}\nDescription: ${card.description}`
          ).join('\n\n')}`;
        }
        return `${key.toUpperCase()}:\n${value}`;
      })
      .join('\n\n');
    
    const blob = new Blob([specs], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formData.adType}-meta-specs.txt`;
    a.click();
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.campaignName.trim()) newErrors.campaignName = 'Campaign name is required';
    if (!formData.adType) newErrors.adType = 'Please select an ad type';
    if (!formData.businessType) newErrors.businessType = 'Business type is required';
    if (!formData.productService.trim()) newErrors.productService = 'Product/service is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log('Form submitted:', formData);
      console.log('Generated content:', generatedContent);
      alert('Meta Ads campaign specs generated successfully!');
    }
  };

  const renderBasicInputs = () => (
    <div className="space-y-6 p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border-l-4 border-blue-500">
      <h3 className="text-xl font-bold text-gray-800 flex items-center">
        <FileText className="mr-2 text-blue-600" size={24} />
        Campaign Information
      </h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Campaign Name *</label>
          <input
            type="text"
            value={formData.campaignName}
            onChange={(e) => handleInputChange('campaignName', e.target.value)}
            placeholder="e.g., Holiday Sale 2024"
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
          />
          {errors.campaignName && <p className="text-red-500 text-sm mt-1">{errors.campaignName}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Business Type *</label>
          <select
            value={formData.businessType}
            onChange={(e) => handleInputChange('businessType', e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
          >
            <option value="">Select business type</option>
            {businessTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          {errors.businessType && <p className="text-red-500 text-sm mt-1">{errors.businessType}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Product/Service *</label>
          <input
            type="text"
            value={formData.productService}
            onChange={(e) => handleInputChange('productService', e.target.value)}
            placeholder="e.g., wireless headphones, marketing software"
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
          />
          {errors.productService && <p className="text-red-500 text-sm mt-1">{errors.productService}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Target Audience</label>
          <input
            type="text"
            value={formData.targetAudience}
            onChange={(e) => handleInputChange('targetAudience', e.target.value)}
            placeholder="e.g., tech enthusiasts, busy professionals"
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Key Message/Benefit</label>
          <textarea
            value={formData.keyMessage}
            onChange={(e) => handleInputChange('keyMessage', e.target.value)}
            placeholder="What's the main benefit or message you want to communicate?"
            rows={3}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Call to Action</label>
          <input
            type="text"
            value={formData.callToAction}
            onChange={(e) => handleInputChange('callToAction', e.target.value)}
            placeholder="e.g., Shop now, Learn more, Sign up"
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred CTA Button</label>
          <select
            value={formData.selectedCTA}
            onChange={(e) => handleInputChange('selectedCTA', e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
          >
            <option value="">Select CTA button</option>
            {ctaOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );

  const renderGeneratedContent = () => {
    if (!showGenerated) return null;

    return (
      <div className="space-y-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-l-4 border-green-500">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-800 flex items-center">
            <Zap className="mr-2 text-green-600" size={24} />
            Generated Content & Specifications
          </h3>
          <div className="flex gap-2">
            <button
              onClick={downloadSpecs}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
            >
              <Download size={16} />
              Download
            </button>
          </div>
        </div>

        <div className="grid gap-6">
          {/* Carousel Cards Special Rendering */}
          {generatedContent.carouselCards && (
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-800">Carousel Cards Content</h4>
                <button
                  onClick={() => copyToClipboard(
                    generatedContent.carouselCards?.map((card, i) => 
                      `Card ${i + 1}:\nHeadline: ${card.headline}\nDescription: ${card.description}`
                    ).join('\n\n') || ''
                  )}
                  className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded transition-all"
                >
                  <Copy size={14} />
                  Copy
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {generatedContent.carouselCards.map((card, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded border">
                    <h5 className="font-medium text-sm text-gray-600 mb-1">Card {index + 1}</h5>
                    <p className="font-semibold text-gray-800">{card.headline}</p>
                    <p className="text-sm text-gray-600">{card.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Other Content */}
          {Object.entries(generatedContent)
            .filter(([key]) => key !== 'carouselCards')
            .map(([key, value]) => (
              <div key={key} className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-800 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </h4>
                  <button
                    onClick={() => copyToClipboard(value?.toString() || '')}
                    className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded transition-all"
                  >
                    <Copy size={14} />
                    Copy
                  </button>
                </div>
                <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono bg-gray-50 p-3 rounded">
                  {value}
                </pre>
              </div>
            ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-8 text-center">
            <h1 className="text-4xl font-bold mb-2">Meta Ads Generator</h1>
            <p className="text-xl opacity-90">Complete Campaign Specifications & Content for Facebook & Instagram</p>
          </div>

          <div className="p-8 space-y-8">
            {/* Basic Campaign Info */}
            {renderBasicInputs()}

            {/* Ad Type Selection */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2">
                Select Ad Type
              </h2>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Ad Type *</label>
                <div className="relative">
                  <select
                    value={formData.adType}
                    onChange={(e) => handleInputChange('adType', e.target.value)}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all appearance-none"
                  >
                    {adTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-3 text-gray-400" size={20} />
                </div>
                {errors.adType && <p className="text-red-500 text-sm mt-1">{errors.adType}</p>}
              </div>

              {/* Ad Type Info Cards */}
              {formData.adType && (
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                  {formData.adType === 'single-image' && (
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <Image className="w-8 h-8 text-blue-600 mb-2" />
                      <h4 className="font-semibold text-blue-800">Single Image</h4>
                      <p className="text-sm text-blue-700">1,200 × 628 px, JPG/PNG</p>
                    </div>
                  )}
                  {formData.adType === 'carousel' && (
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <Target className="w-8 h-8 text-green-600 mb-2" />
                      <h4 className="font-semibold text-green-800">Carousel</h4>
                      <p className="text-sm text-green-700">2-10 cards, 1,080 × 1,080 px</p>
                    </div>
                  )}
                  {formData.adType === 'video' && (
                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                      <Play className="w-8 h-8 text-purple-600 mb-2" />
                      <h4 className="font-semibold text-purple-800">Video</h4>
                      <p className="text-sm text-purple-700">MP4/MOV, ≥720×720 px</p>
                    </div>
                  )}
                  {formData.adType === 'reels-stories' && (
                    <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
                      <Eye className="w-8 h-8 text-pink-600 mb-2" />
                      <h4 className="font-semibold text-pink-800">Reels & Stories</h4>
                      <p className="text-sm text-pink-700">1,080 × 1,920 px, 9:16 ratio</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Generate Content Button */}
            {formData.adType && formData.businessType && formData.productService && (
              <div className="text-center">
                <button
                  onClick={generateContent}
                  className="bg-gradient-to-r from-green-600 to-green-700 text-white py-4 px-8 rounded-lg font-bold text-lg hover:from-green-700 hover:to-green-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto"
                >
                  <Zap size={24} />
                  Generate Content & Specifications
                </button>
              </div>
            )}

            {/* Generated Content */}
            {renderGeneratedContent()}

            {/* Submit Button */}
            {showGenerated && (
              <div className="text-center">
                <button
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 px-8 rounded-lg font-bold text-lg hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Save Campaign
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetaAdsGenerator;