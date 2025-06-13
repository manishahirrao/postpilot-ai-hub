import React, { useState } from 'react';
import { 
  ChevronDown, 
  Upload, 
  Type, 
  Image, 
  Link, 
  Zap, 
  Target, 
  Copy, 
  Download,
  AlertCircle,
  Sparkles,
  RefreshCw,
  Check,
  Info,
  Search,
  Layout,
  Maximize,
  FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface FormData {
  campaignName: string;
  adType: string;
  businessType: string;
  targetAudience: string;
  callToAction: string;
  productService: string;
  keyMessage: string;
  landingPageUrl: string;
  customHeadlines: string[];
  customDescriptions: string[];
  businessName: string;
  pathFields: string[];
  images: {
    landscape?: File;
    square?: File;
    logo?: File;
  };
  video?: File;
}

interface GeneratedContent {
  searchAds?: {
    headlines: string[];
    descriptions: string[];
    pathFields: string[];
    finalUrl: string;
  };
  displayAds?: {
    headlines: string[];
    longHeadline: string;
    descriptions: string[];
    businessName: string;
    imageSpecs: string;
  };
  performanceMax?: {
    headlines: string[];
    longHeadline: string;
    descriptions: string[];
    businessName: string;
    imageSpecs: string;
    videoSpecs: string;
  };
}

const GoogleAdsForm: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    campaignName: '',
    adType: '',
    businessType: '',
    targetAudience: '',
    callToAction: '',
    productService: '',
    keyMessage: '',
    landingPageUrl: '',
    customHeadlines: [''],
    customDescriptions: [''],
    businessName: '',
    pathFields: [],
    images: {},
  });

  const [generatedContent, setGeneratedContent] = useState<GeneratedContent>({});
  const [showGenerated, setShowGenerated] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copiedField, setCopiedField] = useState<string>('');

  const adTypes = [
    { value: 'placeholder', label: 'Select Ad Type' },
    { value: 'search', label: 'Search Ads' },
    { value: 'display', label: 'Display Ads' },
    { value: 'performance-max', label: 'Performance Max' }
  ];

  const businessTypes = [
    'E-commerce', 'SaaS/Software', 'Healthcare', 'Education', 'Real Estate', 
    'Restaurant/Food', 'Fitness/Wellness', 'Finance', 'Travel', 'Fashion', 'Other'
  ];

  const ctaOptions = [
    'Shop Now', 'Learn More', 'Sign Up', 'Get Quote', 'Download', 
    'Book Now', 'Start Free Trial', 'Call Now', 'Visit Site'
  ];

  const handleInputChange = (field: keyof FormData, value: string | string[] | File) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as string]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateContent = (content: string, type: 'headline' | 'description' | 'path', adType: string): boolean => {
    const limits = {
      search: {
        headline: 30,
        description: 90,
        path: 15
      },
      display: {
        headline: 30,
        description: 90,
        path: 0
      },
      'performance-max': {
        headline: 30,
        description: 90,
        path: 0
      }
    };

    const limit = limits[adType as keyof typeof limits][type];
    return content.length <= limit;
  };

  const generateContent = () => {
    const { adType, businessType, targetAudience, productService, keyMessage, callToAction, businessName, landingPageUrl } = formData;
    
    if (adType === 'placeholder' || !businessType || !productService) {
      toast({
        title: "Error",
        description: "Please fill in basic campaign information first",
        variant: "destructive"
      });
      return;
    }

    if (adType === 'display' || adType === 'performance-max') {
      if (!businessName) {
        toast({
          title: "Error",
          description: "Business name is required for Display and Performance Max ads",
          variant: "destructive"
        });
        return;
      }
    }

    let generated: GeneratedContent = {};

    switch (adType) {
      case 'search':
        const headlines = generateSearchHeadlines(businessType, productService, targetAudience)
          .filter(headline => validateContent(headline, 'headline', 'search'));
        const descriptions = generateSearchDescriptions(businessType, productService, keyMessage, targetAudience)
          .filter(desc => validateContent(desc, 'description', 'search'));
        const paths = ['Learn More', 'Get Started', 'Shop Now', 'View Details']
          .filter(path => validateContent(path, 'path', 'search'));

        generated = {
          searchAds: {
            headlines,
            descriptions,
            pathFields: paths.slice(0, 2),
            finalUrl: landingPageUrl
          }
        };
        break;

      case 'display':
        const displayHeadlines = generateDisplayHeadlines(businessType, productService, targetAudience)
          .filter(headline => validateContent(headline, 'headline', 'display'));
        const displayDescriptions = generateDisplayDescriptions(businessType, productService, keyMessage)
          .filter(desc => validateContent(desc, 'description', 'display'));

        generated = {
          displayAds: {
            headlines: displayHeadlines,
            longHeadline: generateLongHeadline(businessType, productService, targetAudience),
            descriptions: displayDescriptions,
            businessName: businessName,
            imageSpecs: `IMAGE SPECIFICATIONS:
• Landscape: 1200×628 px (1.91:1)
• Square: 1200×1200 px (1:1)
• Logo: 120×120 px (1:1)
• Format: JPG or PNG
• File size: Under 150KB recommended
• Colors: Match brand guidelines
• Text: Large, readable font (min 12px)
• Text overlay: Maximum 20% of image area
• Safe area: Keep important content in center 80%`
          }
        };
        break;

      case 'performance-max':
        const pmaxHeadlines = generateDisplayHeadlines(businessType, productService, targetAudience)
          .filter(headline => validateContent(headline, 'headline', 'performance-max'));
        const pmaxDescriptions = generateDisplayDescriptions(businessType, productService, keyMessage)
          .filter(desc => validateContent(desc, 'description', 'performance-max'));

        generated = {
          performanceMax: {
            headlines: pmaxHeadlines,
            longHeadline: generateLongHeadline(businessType, productService, targetAudience),
            descriptions: pmaxDescriptions,
            businessName: businessName,
            imageSpecs: `IMAGE SPECIFICATIONS:
• Landscape: 1200×628 px (1.91:1)
• Square: 1200×1200 px (1:1)
• Logo: 120×120 px (1:1)
• Format: JPG or PNG
• File size: Under 150KB recommended
• Colors: Match brand guidelines
• Text: Large, readable font (min 12px)
• Text overlay: Maximum 20% of image area
• Safe area: Keep important content in center 80%`,
            videoSpecs: `VIDEO SPECIFICATIONS:
• Resolution: 1920×1080 pixels (Full HD)
• Format: MP4 or MOV
• File size: Maximum 4 GB
• Frame rate: 24, 25, or 30 fps
• Aspect ratio: 16:9
• Duration: Maximum 30 seconds
• Audio: Clear, balanced levels
• Branding: Include logo in first 3 seconds
• Captions: Include for accessibility
• Safe area: Keep important content in center 80%`
          }
        };
        break;
    }

    setGeneratedContent(generated);
    setShowGenerated(true);
    toast({
      title: "Success",
      description: "Content generated successfully!"
    });
  };

  const generateSearchHeadlines = (businessType: string, product: string, audience: string): string[] => {
    const headlines = [
      `${product} for ${audience}`,
      `${businessType} - ${product} Solutions`,
      `Get ${product} Results Fast`,
      `${product} - Made Simple`,
      `${businessType} - ${audience} Experts`,
      `Transform Your ${product} Today`,
      `${product} - ${audience} Choice`,
      `${businessType} - ${product} Leaders`,
      `Boost Your ${product} Now`,
      `${product} - ${audience} Solution`,
      `${businessType} - ${product} Partner`,
      `${product} - ${audience} Success`,
      `${businessType} - ${product} Experts`,
      `${product} - ${audience} Growth`,
      `${businessType} - ${product} Innovation`
    ];
    return headlines.slice(0, 15);
  };

  const generateSearchDescriptions = (businessType: string, product: string, message: string, audience: string): string[] => {
    const base = message || `Our ${product} helps ${audience} achieve their goals faster and easier.`;
    return [
      `${base} With proven results and thousands of satisfied customers.`,
      `Experience the power of ${product} - trusted by ${audience} worldwide.`,
      `Transform your ${businessType} with our innovative ${product} solution.`,
      `Join thousands of ${audience} who trust our ${product} for success.`
    ].slice(0, 4);
  };

  const generateDisplayHeadlines = (businessType: string, product: string, audience: string): string[] => {
    return [
      `${product} for ${audience}`,
      `${businessType} - ${product} Solutions`,
      `Get ${product} Results Fast`,
      `${product} - Made Simple`,
      `${businessType} - ${audience} Experts`
    ].slice(0, 5);
  };

  const generateLongHeadline = (businessType: string, product: string, audience: string): string => {
    return `Transform your ${businessType} with our innovative ${product} - Join ${audience} worldwide!`;
  };

  const generateDisplayDescriptions = (businessType: string, product: string, message: string): string[] => {
    const base = message || `Our ${product} helps businesses achieve their goals faster and easier.`;
    return [
      `${base} With proven results and thousands of satisfied customers.`,
      `Experience the power of ${product} - trusted by businesses worldwide.`,
      `Transform your ${businessType} with our innovative ${product} solution.`,
      `Join thousands of businesses who trust our ${product} for success.`,
      `Maximize your results with our cutting-edge ${product} technology.`
    ].slice(0, 5);
  };

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      toast({
        title: "Success",
        description: "Content copied to clipboard!"
      });
      setTimeout(() => setCopiedField(''), 2000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy content",
        variant: "destructive"
      });
    }
  };

  const handleAdTypeChange = (value: string) => {
    handleInputChange('adType', value);
    setGeneratedContent({});
    setShowGenerated(false);
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
          <Input
            value={formData.campaignName}
            onChange={(e) => handleInputChange('campaignName', e.target.value)}
            placeholder="e.g., Summer Sale 2024"
            className="w-full"
          />
          {errors.campaignName && <p className="text-red-500 text-sm mt-1">{errors.campaignName}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Business Type *</label>
          <Select
            value={formData.businessType}
            onValueChange={(value) => handleInputChange('businessType', value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select business type" />
            </SelectTrigger>
            <SelectContent>
              {businessTypes.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.businessType && <p className="text-red-500 text-sm mt-1">{errors.businessType}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Product/Service *</label>
          <Input
            value={formData.productService}
            onChange={(e) => handleInputChange('productService', e.target.value)}
            placeholder="e.g., running shoes, CRM software"
            className="w-full"
          />
          {errors.productService && <p className="text-red-500 text-sm mt-1">{errors.productService}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Target Audience</label>
          <Input
            value={formData.targetAudience}
            onChange={(e) => handleInputChange('targetAudience', e.target.value)}
            placeholder="e.g., fitness enthusiasts, small business owners"
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Call to Action</label>
          <Select
            value={formData.callToAction}
            onValueChange={(value) => handleInputChange('callToAction', value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select CTA" />
            </SelectTrigger>
            <SelectContent>
              {ctaOptions.map((cta) => (
                <SelectItem key={cta} value={cta}>{cta}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Business Name</label>
          <Input
            value={formData.businessName}
            onChange={(e) => handleInputChange('businessName', e.target.value)}
            placeholder="Enter your business name"
            className="w-full"
            required={formData.adType === 'display' || formData.adType === 'performance-max'}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Key Message/Benefit</label>
          <Textarea
            value={formData.keyMessage}
            onChange={(e) => handleInputChange('keyMessage', e.target.value)}
            placeholder="What's the main benefit or message you want to communicate?"
            rows={3}
            className="w-full"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Landing Page URL</label>
          <Input
            value={formData.landingPageUrl}
            onChange={(e) => handleInputChange('landingPageUrl', e.target.value)}
            placeholder="https://your-landing-page.com"
            type="url"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );

  const renderAdTypeSelection = () => (
    <div className="space-y-6 mt-8">
      <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2">
        Select Ad Type
      </h2>
      
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <Tabs
          value={formData.adType}
          onValueChange={handleAdTypeChange}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="search" className="flex items-center gap-2">
              <Search className="w-4 h-4" />
              Search Ads
            </TabsTrigger>
            <TabsTrigger value="display" className="flex items-center gap-2">
              <Layout className="w-4 h-4" />
              Display Ads
            </TabsTrigger>
            <TabsTrigger value="performance-max" className="flex items-center gap-2">
              <Maximize className="w-4 h-4" />
              Performance Max
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );

  const renderGeneratedContent = () => {
    if (!showGenerated) return null;

    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Sparkles className="w-5 h-5 mr-2" />
            Generated Content
          </CardTitle>
        </CardHeader>
        <CardContent>
          {formData.adType === 'search' && generatedContent.searchAds && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">Search Ads Content</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Headlines (30 characters max)</h4>
                    {generatedContent.searchAds.headlines.map((headline, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded mb-2">
                        <div className="flex-1">
                          <span className="text-sm">{headline}</span>
                          <span className="text-xs text-gray-500 ml-2">({headline.length}/30)</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(headline, `headline-${index}`)}
                        >
                          {copiedField === `headline-${index}` ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </Button>
                      </div>
                    ))}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Descriptions (90 characters max)</h4>
                    {generatedContent.searchAds.descriptions.map((description, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded mb-2">
                        <div className="flex-1">
                          <span className="text-sm">{description}</span>
                          <span className="text-xs text-gray-500 ml-2">({description.length}/90)</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(description, `description-${index}`)}
                        >
                          {copiedField === `description-${index}` ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </Button>
                      </div>
                    ))}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Path Fields (15 characters max)</h4>
                    {generatedContent.searchAds.pathFields.map((path, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded mb-2">
                        <div className="flex-1">
                          <span className="text-sm">{path}</span>
                          <span className="text-xs text-gray-500 ml-2">({path.length}/15)</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(path, `path-${index}`)}
                        >
                          {copiedField === `path-${index}` ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {formData.adType === 'display' && generatedContent.displayAds && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">Display Ads Content</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Headlines</h4>
                    {generatedContent.displayAds.headlines.map((headline, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded mb-2">
                        <span className="text-sm">{headline}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(headline, `display-headline-${index}`)}
                        >
                          {copiedField === `display-headline-${index}` ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </Button>
                      </div>
                    ))}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Long Headline</h4>
                    <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <span className="text-sm">{generatedContent.displayAds.longHeadline}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(generatedContent.displayAds.longHeadline, 'long-headline')}
                      >
                        {copiedField === 'long-headline' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Image Specifications</h4>
                    <div className="bg-gray-50 p-4 rounded whitespace-pre-wrap text-sm">
                      {generatedContent.displayAds.imageSpecs}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {formData.adType === 'performance-max' && generatedContent.performanceMax && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">Performance Max Content</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Headlines</h4>
                    {generatedContent.performanceMax.headlines.map((headline, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded mb-2">
                        <span className="text-sm">{headline}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(headline, `pmax-headline-${index}`)}
                        >
                          {copiedField === `pmax-headline-${index}` ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </Button>
                      </div>
                    ))}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Long Headline</h4>
                    <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <span className="text-sm">{generatedContent.performanceMax.longHeadline}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(generatedContent.performanceMax.longHeadline, 'pmax-long-headline')}
                      >
                        {copiedField === 'pmax-long-headline' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Image & Video Specifications</h4>
                    <div className="bg-gray-50 p-4 rounded whitespace-pre-wrap text-sm">
                      {generatedContent.performanceMax.imageSpecs}
                      {'\n\n'}
                      {generatedContent.performanceMax.videoSpecs}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 text-center">
            <h1 className="text-4xl font-bold mb-2">Google Ads Generator</h1>
            <p className="text-xl opacity-90">Complete Campaign Specifications & Content</p>
          </div>

          <div className="p-8 space-y-8">
            {/* Basic Campaign Info */}
            {renderBasicInputs()}

            {/* Ad Type Selection - Only show if basic info is filled */}
            {formData.campaignName && formData.businessType && formData.productService && (
              renderAdTypeSelection()
            )}

            {/* Generate Content Button */}
            {formData.adType && formData.businessType && formData.productService && (
              <div className="text-center">
                <Button
                  onClick={generateContent}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-8 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto"
                >
                  <Sparkles className="w-5 h-5" />
                  Generate Content & Specifications
                </Button>
              </div>
            )}

            {/* Generated Content */}
            {renderGeneratedContent()}

            {/* Submit Button */}
            {showGenerated && (
              <div className="pt-6 border-t border-gray-200">
                <Button
                  onClick={() => {
                    toast({
                      title: "Success",
                      description: "Campaign setup completed successfully!"
                    });
                  }}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-8 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Complete Campaign Setup
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleAdsForm; 