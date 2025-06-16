import React, { useState } from 'react';
import { 
  ChevronDown, 
  Upload, 
  Play, 
  Image as ImageIcon, 
  Type, 
  FileText, 
  Zap, 
  Eye, 
  Target, 
  Download, 
  Copy,
  Sparkles,
  Wand2,
  X,
  Check,
  MousePointer
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
  customHeadline: string;
  customDescription: string;
  landingPageUrl: string;
  additionalNotes: string;
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
  bumperAdScript?: string;
  discoveryAdContent?: {
    headline: string;
    descriptionLine1: string;
    descriptionLine2: string;
  };
}

const YouTubeAdsForm: React.FC = () => {
  const { toast } = useToast();
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
    landingPageUrl: '',
    additionalNotes: ''
  });

  const [generatedContent, setGeneratedContent] = useState<GeneratedContent>({});
  const [showGenerated, setShowGenerated] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copiedField, setCopiedField] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  const adTypes = [
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

  const generateWithAI = async (field: 'customHeadline' | 'customDescription') => {
    setIsGenerating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const generatedText = field === 'customHeadline' 
        ? `AI-Generated Headline for ${formData.productService || 'your product'}` 
        : `This is an AI-generated description for your YouTube ad about ${formData.productService || 'your product/service'}.`;
      
      handleInputChange(field, generatedText);
      toast({
        title: "Success",
        description: `${field === 'customHeadline' ? 'Headline' : 'Description'} generated!`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate content",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const enhanceWithAI = async (field: 'customHeadline' | 'customDescription') => {
    setIsGenerating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const currentText = field === 'customHeadline' ? formData.customHeadline : formData.customDescription;
      const enhancedText = `${currentText} [Enhanced for YouTube performance]`;
      
      handleInputChange(field, enhancedText);
      toast({
        title: "Success",
        description: `${field === 'customHeadline' ? 'Headline' : 'Description'} enhanced!`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to enhance content",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const removeFieldContent = (field: 'customHeadline' | 'customDescription') => {
    handleInputChange(field, '');
  };

  const generateContent = () => {
    const { adType, businessType, targetAudience, productService, keyMessage, callToAction } = formData;
    
    if (!adType || !businessType || !productService) {
      toast({
        title: "Error",
        description: "Please fill in basic campaign information first",
        variant: "destructive"
      });
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
• Text: Large, readable font (min 12px)`,
          
          videoSpecs: `TRUEVIEW VIDEO SPECIFICATIONS:
• Resolution: 1920×1080 pixels (Full HD)
• Format: MP4 or MOV
• File size: Maximum 4 GB
• Frame rate: 24, 25, or 30 fps
• Aspect ratio: 16:9
• Duration: 15-60 seconds recommended
• Audio: Clear, balanced levels
• Branding: Include logo in first 3 seconds
• Captions: Include for accessibility
• Safe area: Keep important content in center 80%`
        };
        break;

      case 'bumper-ads':
        generated = {
          bumperAdScript: `6-SECOND SCRIPT:
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
          
          videoSpecs: `BUMPER AD SPECIFICATIONS:
• Resolution: 1920×1080 pixels (Full HD)
• Format: MP4 or MOV
• File size: Maximum 4 GB
• Frame rate: 24, 25, or 30 fps
• Aspect ratio: 16:9
• Duration: Exactly 6 seconds
• Audio: Clear, balanced levels
• Branding: Include throughout video
• Text: Minimal, large and readable`
        };
        break;

      case 'discovery-ads':
        const headline = generateDiscoveryHeadline(businessType, productService);
        const desc1 = generateDescriptionLine(businessType, productService, 1);
        const desc2 = generateDescriptionLine(businessType, productService, 2);
        
        generated = {
          discoveryAdContent: {
            headline,
            descriptionLine1: desc1,
            descriptionLine2: desc2
          },
          thumbnailSpecs: `DISCOVERY AD THUMBNAIL SPECS:
• Dimensions: 1280×720 pixels (16:9)
• Format: JPG or PNG
• File size: Maximum 2 MB
• Quality: High resolution, crisp details
• Content: Eye-catching visuals of product/service
• Text overlay: Minimal, readable (max 20% of image)
• Branding: Include subtle logo placement
• Safe area: Keep key content in center 80%`
        };
        break;

      case 'video-action-ads':
        generated = {
          headline: generateActionHeadline(businessType, productService),
          description: generateActionDescription(businessType, productService),
          videoSpecs: `VIDEO ACTION AD SPECS:
• Video: Same as TrueView specs
• Thumbnail: Same as Discovery specs
• Recommended length: 15-30 seconds
• Strong visual call-to-action overlay
• Mobile-optimized design
• Clear value proposition in first 5 seconds
• End with strong CTA and branding`
        };
        break;
    }

    setGeneratedContent(generated);
    setShowGenerated(true);
    toast({
      title: "Success",
      description: "YouTube ad content generated successfully!"
    });
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

  const downloadSpecs = () => {
    const specs = Object.entries(generatedContent)
      .map(([key, value]) => {
        if (key === 'discoveryAdContent' && typeof value === 'object') {
          return `DISCOVERY AD CONTENT:\nHeadline: ${value.headline}\nDescription 1: ${value.descriptionLine1}\nDescription 2: ${value.descriptionLine2}`;
        }
        return `${key.toUpperCase()}:\n${value}`;
      })
      .join('\n\n');
    
    const blob = new Blob([specs], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formData.adType}-youtube-specs.txt`;
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
      toast({
        title: "Success",
        description: "YouTube campaign setup completed!"
      });
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
            placeholder="e.g., wireless headphones, marketing software"
            className="w-full"
          />
          {errors.productService && <p className="text-red-500 text-sm mt-1">{errors.productService}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Target Audience</label>
          <Input
            value={formData.targetAudience}
            onChange={(e) => handleInputChange('targetAudience', e.target.value)}
            placeholder="e.g., tech enthusiasts, busy professionals"
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
              {ctaOptions.map(option => (
                <SelectItem key={option} value={option}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Persona</label>
          <Textarea
            value={formData.keyMessage}
            onChange={(e) => handleInputChange('keyMessage', e.target.value)}
            placeholder="What's the main benefit or message you want to communicate?"
            rows={3}
            className="w-full"
          />
        </div>

        <div className="md:col-span-2">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-semibold text-gray-700">Headline</label>
            <div className="flex gap-2">
              {formData.customHeadline ? (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => enhanceWithAI('customHeadline')}
                  disabled={isGenerating}
                  className="flex items-center gap-1"
                >
                  <Wand2 className="w-4 h-4" />
                  {isGenerating ? 'Enhancing...' : 'Enhance'}
                </Button>
              ) : (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => generateWithAI('customHeadline')}
                  disabled={isGenerating}
                  className="flex items-center gap-1"
                >
                  <Wand2 className="w-4 h-4" />
                  {isGenerating ? 'Generating...' : 'Generate'}
                </Button>
              )}
              {formData.customHeadline && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => removeFieldContent('customHeadline')}
                  className="text-red-500 hover:text-red-600"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
          <Input
            value={formData.customHeadline}
            onChange={(e) => handleInputChange('customHeadline', e.target.value)}
            placeholder="Enter custom headline or generate with AI"
            className="w-full"
          />
        </div>

        <div className="md:col-span-2">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-semibold text-gray-700">Description</label>
            <div className="flex gap-2">
              {formData.customDescription ? (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => enhanceWithAI('customDescription')}
                  disabled={isGenerating}
                  className="flex items-center gap-1"
                >
                  <Wand2 className="w-4 h-4" />
                  {isGenerating ? 'Enhancing...' : 'Enhance'}
                </Button>
              ) : (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => generateWithAI('customDescription')}
                  disabled={isGenerating}
                  className="flex items-center gap-1"
                >
                  <Wand2 className="w-4 h-4" />
                  {isGenerating ? 'Generating...' : 'Generate'}
                </Button>
              )}
              {formData.customDescription && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => removeFieldContent('customDescription')}
                  className="text-red-500 hover:text-red-600"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
          <Textarea
            value={formData.customDescription}
            onChange={(e) => handleInputChange('customDescription', e.target.value)}
            placeholder="Enter custom description or generate with AI"
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

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Additional Notes</label>
          <Textarea
            value={formData.additionalNotes}
            onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
            placeholder="Any additional notes or requirements"
            rows={2}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );

  const renderAdTypeSelection = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2">
        Select YouTube Ad Type
      </h2>
      
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <Tabs
          value={formData.adType}
          onValueChange={(value) => handleInputChange('adType', value)}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="trueview-instream" className="flex items-center gap-2">
              <Play className="w-4 h-4" />
              TrueView
            </TabsTrigger>
            <TabsTrigger value="bumper-ads" className="flex items-center gap-2">
              <MousePointer className="w-4 h-4" />
              Bumper Ads
            </TabsTrigger>
            <TabsTrigger value="discovery-ads" className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4" />
              Discovery
            </TabsTrigger>
            <TabsTrigger value="video-action-ads" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Video Action
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
            Generated YouTube Ad Content
          </CardTitle>
        </CardHeader>
        <CardContent>
          {formData.adType === 'trueview-instream' && generatedContent.videoScript && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">TrueView In-Stream Ad</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Video Script</h4>
                    <div className="flex items-center justify-between bg-gray-50 p-2 rounded mb-2">
                      <div className="flex-1">
                        <pre className="text-sm whitespace-pre-wrap">{generatedContent.videoScript}</pre>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(generatedContent.videoScript || '', 'video-script')}
                      >
                        {copiedField === 'video-script' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Companion Banner Specifications</h4>
                    <div className="flex items-center justify-between bg-gray-50 p-2 rounded mb-2">
                      <div className="flex-1">
                        <pre className="text-sm whitespace-pre-wrap">{generatedContent.companionBannerSpecs}</pre>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(generatedContent.companionBannerSpecs || '', 'banner-specs')}
                      >
                        {copiedField === 'banner-specs' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Video Specifications</h4>
                    <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <div className="flex-1">
                        <pre className="text-sm whitespace-pre-wrap">{generatedContent.videoSpecs}</pre>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(generatedContent.videoSpecs || '', 'video-specs')}
                      >
                        {copiedField === 'video-specs' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {formData.adType === 'bumper-ads' && generatedContent.bumperAdScript && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">Bumper Ad Content</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">6-Second Script</h4>
                    <div className="flex items-center justify-between bg-gray-50 p-2 rounded mb-2">
                      <div className="flex-1">
                        <pre className="text-sm whitespace-pre-wrap">{generatedContent.bumperAdScript}</pre>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(generatedContent.bumperAdScript || '', 'bumper-script')}
                      >
                        {copiedField === 'bumper-script' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Video Specifications</h4>
                    <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <div className="flex-1">
                        <pre className="text-sm whitespace-pre-wrap">{generatedContent.videoSpecs}</pre>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(generatedContent.videoSpecs || '', 'bumper-specs')}
                      >
                        {copiedField === 'bumper-specs' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {formData.adType === 'discovery-ads' && generatedContent.discoveryAdContent && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">Discovery Ad Content</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Headline (100 characters max)</h4>
                    <div className="flex items-center justify-between bg-gray-50 p-2 rounded mb-2">
                      <div className="flex-1">
                        <span className="text-sm">{generatedContent.discoveryAdContent.headline}</span>
                        <span className="text-xs text-gray-500 ml-2">({generatedContent.discoveryAdContent.headline.length}/100)</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(generatedContent.discoveryAdContent?.headline || '', 'discovery-headline')}
                      >
                        {copiedField === 'discovery-headline' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Description Line 1 (35 characters max)</h4>
                    <div className="flex items-center justify-between bg-gray-50 p-2 rounded mb-2">
                      <div className="flex-1">
                        <span className="text-sm">{generatedContent.discoveryAdContent.descriptionLine1}</span>
                        <span className="text-xs text-gray-500 ml-2">({generatedContent.discoveryAdContent.descriptionLine1.length}/35)</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(generatedContent.discoveryAdContent?.descriptionLine1 || '', 'discovery-desc1')}
                      >
                        {copiedField === 'discovery-desc1' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Description Line 2 (35 characters max)</h4>
                    <div className="flex items-center justify-between bg-gray-50 p-2 rounded mb-2">
                      <div className="flex-1">
                        <span className="text-sm">{generatedContent.discoveryAdContent.descriptionLine2}</span>
                        <span className="text-xs text-gray-500 ml-2">({generatedContent.discoveryAdContent.descriptionLine2.length}/35)</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(generatedContent.discoveryAdContent?.descriptionLine2 || '', 'discovery-desc2')}
                      >
                        {copiedField === 'discovery-desc2' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Thumbnail Specifications</h4>
                    <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <div className="flex-1">
                        <pre className="text-sm whitespace-pre-wrap">{generatedContent.thumbnailSpecs}</pre>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(generatedContent.thumbnailSpecs || '', 'thumbnail-specs')}
                      >
                        {copiedField === 'thumbnail-specs' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {formData.adType === 'video-action-ads' && generatedContent.headline && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">Video Action Ad Content</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Headline</h4>
                    <div className="flex items-center justify-between bg-gray-50 p-2 rounded mb-2">
                      <div className="flex-1">
                        <span className="text-sm">{generatedContent.headline}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(generatedContent.headline || '', 'action-headline')}
                      >
                        {copiedField === 'action-headline' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Description (25 characters max)</h4>
                    <div className="flex items-center justify-between bg-gray-50 p-2 rounded mb-2">
                      <div className="flex-1">
                        <span className="text-sm">{generatedContent.description}</span>
                        <span className="text-xs text-gray-500 ml-2">({generatedContent.description?.length || 0}/25)</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(generatedContent.description || '', 'action-description')}
                      >
                        {copiedField === 'action-description' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Video Specifications</h4>
                    <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <div className="flex-1">
                        <pre className="text-sm whitespace-pre-wrap">{generatedContent.videoSpecs}</pre>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(generatedContent.videoSpecs || '', 'action-specs')}
                      >
                        {copiedField === 'action-specs' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
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
          <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-8 text-center">
            <h1 className="text-4xl font-bold mb-2">YouTube Ads Generator</h1>
            <p className="text-xl opacity-90">Complete Campaign Specifications & Content</p>
          </div>

          <div className="p-8 space-y-8">
            {/* Ad Type Selection */}
            {renderAdTypeSelection()}

            {/* Basic Campaign Info - Only show if ad type is selected */}
            {formData.adType && (
              <>
                {renderBasicInputs()}

                {/* Generate Content Button */}
                {formData.businessType && formData.productService && (
                  <div className="text-center">
                    <Button
                      onClick={generateContent}
                      className="bg-gradient-to-r from-red-600 to-red-700 text-white py-4 px-8 rounded-lg font-bold text-lg hover:from-red-700 hover:to-red-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto"
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
                      onClick={handleSubmit}
                      className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-4 px-8 rounded-lg font-bold text-lg hover:from-red-700 hover:to-red-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      Complete Campaign Setup
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default YouTubeAdsForm;