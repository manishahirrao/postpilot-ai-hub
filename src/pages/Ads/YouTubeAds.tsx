import React, { useState } from 'react';
import { ChevronDown, Upload, Play, Image, Type, MousePointer, FileText, Zap, Eye, Target, Download, Copy } from 'lucide-react';

interface FormData {
  campaignName: string;
  adType: string;
  businessType: string;
  targetAudience: string;
  callToAction: string;
  productService: string;
  keyMessage: string;
  video?: File;
  companionBanner?: File;
  thumbnail?: File;
  customHeadline: string;
  customDescription: string;
  descriptionLine1: string;
  descriptionLine2: string;
  selectedCTA: string;
}

interface GeneratedContent {
  videoScript?: string;
  headline?: string;
  description?: string;
  descriptionLine1?: string;
  descriptionLine2?: string;
  companionBannerSpecs?: string;
  thumbnailSpecs?: string;
  videoSpecs?: string;
}

const YouTubeAdsForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    campaignName: '',
    adType: '',
    businessType: '',
    targetAudience: '',
    callToAction: '',
    productService: '',
    keyMessage: '',
    customHeadline: '',
    customDescription: '',
    descriptionLine1: '',
    descriptionLine2: '',
    selectedCTA: ''
  });

  const [generatedContent, setGeneratedContent] = useState<GeneratedContent>({});
  const [showGenerated, setShowGenerated] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const adTypes = [
    { value: '', label: 'Select Ad Type' },
    { value: 'trueview-instream', label: 'TrueView In-Stream' },
    { value: 'bumper-ads', label: 'Bumper Ads' },
    { value: 'discovery-ads', label: 'Discovery Ads' },
    { value: 'video-action-ads', label: 'Video Action Ads' }
  ];

  const businessTypes = [
    'E-commerce', 'SaaS/Software', 'Healthcare', 'Education', 'Real Estate', 
    'Restaurant/Food', 'Fitness/Wellness', 'Finance', 'Travel', 'Fashion', 'Other'
  ];

  const ctaOptions = [
    'Shop Now', 'Learn More', 'Sign Up', 'Get Quote', 'Download', 
    'Book Now', 'Start Free Trial', 'Call Now', 'Visit Site'
  ];

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const generateContent = () => {
    const { adType, businessType, targetAudience, productService, keyMessage, callToAction } = formData;
    
    if (!adType || !businessType || !productService) {
      alert('Please fill in basic campaign information first');
      return;
    }

    let generated: GeneratedContent = {};

    switch (adType) {
      case 'trueview-instream':
        generated = {
          videoScript: `HOOK (0-3s): "${getHook(businessType, productService)}"
          
BODY (4-15s): ${getBody(businessType, productService, keyMessage, targetAudience)}

CTA (16-20s): "${callToAction || 'Learn more'} - Visit our website today!"

SCRIPT NOTES:
• Keep energy high throughout
• Show product/service benefits visually  
• Include brand logo in first 3 seconds
• End with clear next step`,
          
          companionBannerSpecs: `COMPANION BANNER SPECIFICATIONS:
• Dimensions: 300×60 pixels
• Format: JPG or PNG
• File size: Under 150KB recommended
• Include: Logo, key message, CTA button
• Colors: Match video branding
• Text: Large, readable font (min 12px)`
        };
        break;

      case 'bumper-ads':
        generated = {
          videoScript: `6-SECOND SCRIPT:
"${getBumperScript(businessType, productService, callToAction)}"

TIMING BREAKDOWN:
• 0-1s: Brand/product reveal
• 2-4s: Key benefit/message  
• 5-6s: Logo + CTA

PRODUCTION NOTES:
• Use bold, high-contrast visuals
• Ensure logo is visible throughout
• No complex messaging - one clear point
• Test readability on mobile devices`,
          
          videoSpecs: `VIDEO SPECIFICATIONS:
• Resolution: 1920×1080 pixels (Full HD)
• Format: MP4 or MOV
• File size: Maximum 4 GB
• Frame rate: 24, 25, or 30 fps
• Aspect ratio: 16:9
• Duration: Maximum 6 seconds
• Audio: Clear, balanced levels`
        };
        break;

      case 'discovery-ads':
        const headline = generateDiscoveryHeadline(businessType, productService);
        const desc1 = generateDescriptionLine(businessType, productService, 1);
        const desc2 = generateDescriptionLine(businessType, productService, 2);
        
        generated = {
          headline: headline,
          descriptionLine1: desc1,
          descriptionLine2: desc2,
          thumbnailSpecs: `THUMBNAIL SPECIFICATIONS:
• Dimensions: 1280×720 pixels (16:9)
• Format: JPG or PNG
• File size: Maximum 2 MB
• Quality: High resolution, crisp details
• Content: Eye-catching visuals of product/service
• Text overlay: Minimal, readable
• Branding: Include subtle logo placement`
        };
        break;

      case 'video-action-ads':
        generated = {
          headline: generateActionHeadline(businessType, productService),
          description: generateActionDescription(businessType, productService),
          videoSpecs: `VIDEO & THUMBNAIL SPECS:
Same requirements as TrueView In-Stream:
• Video: MP4/MOV, up to 4GB, 16:9 or 4:3
• Thumbnail: 1280×720px, JPG/PNG, ≤2MB
• Recommended length: 15-30 seconds
• Strong visual call-to-action overlay
• Mobile-optimized design`,
        };
        break;
    }

    setGeneratedContent(generated);
    setShowGenerated(true);
  };

  const getHook = (businessType: string, product: string): string => {
    const hooks = {
      'E-commerce': `Tired of overpriced ${product}?`,
      'SaaS/Software': `${product} in just 30 seconds?`,
      'Healthcare': `Better ${product} is possible`,
      'Education': `Master ${product} faster`,
      'Real Estate': `Your dream ${product} awaits`,
      'Restaurant/Food': `Craving amazing ${product}?`,
      'Fitness/Wellness': `Transform with ${product}`,
      'Finance': `Smart ${product} solutions`,
      'Travel': `Discover ${product} deals`,
      'Fashion': `Style meets ${product}`
    };
    return hooks[businessType as keyof typeof hooks] || `Discover amazing ${product}`;
  };

  const getBody = (businessType: string, product: string, message: string, audience: string): string => {
    const base = message || `Our ${product} helps ${audience || 'people'} achieve their goals faster and easier.`;
    return `${base} With proven results and thousands of satisfied customers, we're the trusted choice for quality and value.`;
  };

  const getBumperScript = (businessType: string, product: string, cta: string): string => {
    const scripts = {
      'E-commerce': `${product} - 50% off today only! ${cta || 'Shop now'}!`,
      'SaaS/Software': `${product} - Free trial starts now! ${cta || 'Sign up'}!`,
      'Healthcare': `Better ${product} is here. ${cta || 'Learn more'} today!`,
      'Education': `Master ${product} in minutes. ${cta || 'Start now'}!`,
      'Real Estate': `Find your perfect ${product}. ${cta || 'Browse now'}!`,
      'Restaurant/Food': `Fresh ${product} delivered fast! ${cta || 'Order now'}!`
    };
    return scripts[businessType as keyof typeof scripts] || `Amazing ${product} awaits. ${cta || 'Get started'}!`;
  };

  const generateDiscoveryHeadline = (businessType: string, product: string): string => {
    const headlines = {
      'E-commerce': `Best ${product} Deals Online`,
      'SaaS/Software': `${product} Made Simple`,
      'Healthcare': `Advanced ${product} Care`,
      'Education': `Learn ${product} Fast`,
      'Real Estate': `Perfect ${product} Found`,
      'Restaurant/Food': `Fresh ${product} Daily`
    };
    return (headlines[businessType as keyof typeof headlines] || `Quality ${product} Here`).substring(0, 100);
  };

  const generateDescriptionLine = (businessType: string, product: string, line: number): string => {
    if (line === 1) {
      return `Top-rated ${product}`.substring(0, 35);
    } else {
      return `Trusted by thousands`.substring(0, 35);
    }
  };

  const generateActionHeadline = (businessType: string, product: string): string => {
    const headlines = {
      'E-commerce': 'Shop Now',
      'SaaS/Software': 'Try Free',
      'Healthcare': 'Book Now',
      'Education': 'Learn Now',
      'Real Estate': 'View Now',
      'Restaurant/Food': 'Order Now'
    };
    return headlines[businessType as keyof typeof headlines] || 'Get Started';
  };

  const generateActionDescription = (businessType: string, product: string): string => {
    return `Best ${product} deals`.substring(0, 25);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const downloadSpecs = () => {
    const specs = Object.entries(generatedContent)
      .map(([key, value]) => `${key.toUpperCase()}:\n${value}`)
      .join('\n\n');
    
    const blob = new Blob([specs], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formData.adType}-specs.txt`;
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
      alert('Campaign specs generated successfully!');
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
            placeholder="e.g., Summer Sale 2024"
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
            placeholder="e.g., running shoes, CRM software"
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
            placeholder="e.g., fitness enthusiasts, small business owners"
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
          {Object.entries(generatedContent).map(([key, value]) => (
            <div key={key} className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-800 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </h4>
                <button
                  onClick={() => copyToClipboard(value || '')}
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
          <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-8 text-center">
            <h1 className="text-4xl font-bold mb-2">YouTube Ads Generator</h1>
            <p className="text-xl opacity-90">Complete Campaign Specifications & Content</p>
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
              <div className="pt-6 border-t border-gray-200">
                <button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-4 px-8 rounded-lg font-bold text-lg hover:from-red-700 hover:to-red-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Complete Campaign Setup
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default YouTubeAdsForm;