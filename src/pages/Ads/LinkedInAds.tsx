import React, { useState } from 'react';
import { 
  AlertCircle, 
  Upload, 
  X, 
  Sparkles, 
  Copy, 
  RefreshCw, 
  Check,
  ChevronDown,
  ChevronUp,
  Info,
  FileText,
  MessageSquare,
  Layout,
  Type,
  Image as ImageIcon,
  Video,
  Link
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface LinkedInAdsFormProps {
  onSubmit?: (data: {
    adType: AdType;
    adFormat: AdFormat;
    formData: Record<string, string>;
    businessInfo: BusinessInfo;
  }) => void;
}

type BusinessInfo = {
  company: string;
  product: string;
  targetAudience: string;
  objective: string;
};

type GeneratedContent = {
  introText?: string;
  headline?: string;
  description?: string;
  ctaButton?: string;
  subjectLine?: string;
  messageBody?: string;
  ctaButtonLabel?: string;
  destinationUrl?: string;
  textHeadline?: string;
  textDescription?: string;
  textDestinationUrl?: string;
};

type FormErrors = {
  [key: string]: string;
};

type AdType = 'sponsored-content' | 'message-ads' | 'text-ads';

type AdFormat = 'single-image' | 'carousel' | 'video' | 'document';


const LinkedInAdsForm: React.FC<LinkedInAdsFormProps> = ({ onSubmit }) => {
  const { toast } = useToast();
  const [selectedAdType, setSelectedAdType] = useState<AdType | undefined>(undefined);
  const [selectedFormat, setSelectedFormat] = useState<AdFormat | undefined>(undefined);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedField, setCopiedField] = useState('');
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>({
    company: '',
    product: '',
    targetAudience: '',
    objective: ''
  });
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    businessInfo: true,
    contentGeneration: false,
    adDetails: true
  });

  const validateForm = (type: AdType): boolean => {
    const requiredFields = {
      'sponsored-content': ['introText', 'headline', 'description', 'ctaButton'],
      'message-ads': ['subjectLine', 'messageBody', 'ctaButtonLabel', 'destinationUrl'],
      'text-ads': ['textHeadline', 'textDescription', 'textDestinationUrl']
    }[type] || [];

    const validationErrors: FormErrors = {};
    let isValid = true;

    requiredFields.forEach(field => {
      if (!formData[field]) {
        validationErrors[field] = 'This field is required';
        isValid = false;
      }
    });

    setErrors(validationErrors);
    return isValid;
  };

  const adTypes = [
    { value: 'sponsored-content', label: 'Sponsored Content (Feeds)' },
    { value: 'message-ads', label: 'Message Ads' },
    { value: 'text-ads', label: 'Text Ads (Sidebar)' }
  ];

  const contentFormats = [
    { value: 'single-image', label: 'Single Image' },
    { value: 'carousel', label: 'Carousel' },
    { value: 'video', label: 'Video' },
    { value: 'document', label: 'Document' }
  ];

  const ctaButtons = [
    'Learn More', 'Sign Up', 'Download', 'Get Started', 'Contact Us', 
    'Apply Now', 'Register', 'Subscribe', 'Visit Website', 'Shop Now'
  ];

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    return true;
  };

  const validateField = (field, value, maxLength) => {
    if (value && value.length > maxLength) {
      setErrors(prev => ({ ...prev, [field]: `Maximum ${maxLength} characters allowed` }));
      return false;
    }
    return true;
  };

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      toast({
        title: "Success",
        description: "Content copied to clipboard!"
      });
    } catch (error) {
      console.error('Failed to copy text:', error);
      toast({
        title: "Error",
        description: "Failed to copy content to clipboard",
        variant: "destructive"
      });
    }
  };

  const generateContent = async () => {
    try {
      setIsGenerating(true);
      
      if (!businessInfo.company || !businessInfo.product || !businessInfo.targetAudience || !businessInfo.objective) {
        throw new Error('Please fill in all business information fields');
      }

      const { company, product, targetAudience, objective } = businessInfo;
      
      let content: GeneratedContent = {};
      
      if (selectedAdType === 'sponsored-content') {
        content = {
          introText: `${company} helps ${targetAudience} achieve better results with our innovative ${product} solution.`,
          headline: `Transform Your Business with ${product}`,
          description: `Join thousands of satisfied customers who trust ${company} for ${objective}.`,
          ctaButton: objective === 'lead generation' ? 'Get Started' : 
                    objective === 'brand awareness' ? 'Learn More' :
                    objective === 'conversions' ? 'Shop Now' : 'Learn More'
        };
      } else if (selectedAdType === 'message-ads') {
        content = {
          subjectLine: `${company}: Special offer for ${targetAudience}`,
          messageBody: `Hi there!\n\nI noticed you work in a role that could benefit from ${product}. At ${company}, we've helped many ${targetAudience} achieve their ${objective} goals.\n\nWould you be interested in learning how we can help you too?\n\nBest regards,\nThe ${company} Team`,
          ctaButtonLabel: 'Learn More',
          destinationUrl: `https://www.${company.toLowerCase().replace(/\s+/g, '')}.com`
        };
      } else if (selectedAdType === 'text-ads') {
        content = {
          textHeadline: `${product} for ${targetAudience}`,
          textDescription: `${company} - Leading ${product} solution for better ${objective}`,
          textDestinationUrl: `https://www.${company.toLowerCase().replace(/\s+/g, '')}.com`
        };
      }
      
      setGeneratedContent(content);
      setIsGenerating(false);
      toast({
        title: "Success",
        description: "Content generated successfully!"
      });
    } catch (error) {
      console.error('Error generating content:', error);
      setIsGenerating(false);
      toast({
        title: "Error",
        description: "Failed to generate content. Please check your inputs and try again.",
        variant: "destructive"
      });
    }
  };

  const handleFormatChange = (format: AdFormat) => {
    setSelectedFormat(format);
  };

  const handleAdTypeChange = (type: AdType) => {
    setSelectedAdType(type);
    setFormData({});
    setGeneratedContent({});
  };

  const renderBusinessInfoForm = () => (
    <div className="space-y-6 p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border-l-4 border-blue-500">
      <h3 className="text-xl font-bold text-gray-800 flex items-center">
        <FileText className="mr-2 text-blue-600" size={24} />
        Campaign Information
      </h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name *</label>
          <Input
            type="text"
            value={businessInfo.company}
            onChange={(e) => setBusinessInfo(prev => ({...prev, company: e.target.value}))}
            placeholder="Your Company"
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Product/Service *</label>
          <Input
            type="text"
            value={businessInfo.product}
            onChange={(e) => setBusinessInfo(prev => ({...prev, product: e.target.value}))}
            placeholder="SaaS Platform, Consulting, etc."
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Target Audience *</label>
          <Input
            type="text"
            value={businessInfo.targetAudience}
            onChange={(e) => setBusinessInfo(prev => ({...prev, targetAudience: e.target.value}))}
            placeholder="CEOs, Marketers, Developers, etc."
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Campaign Objective *</label>
          <Select
            value={businessInfo.objective}
            onValueChange={(value) => setBusinessInfo(prev => ({...prev, objective: value}))}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Objective" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="brand awareness">Brand Awareness</SelectItem>
              <SelectItem value="lead generation">Lead Generation</SelectItem>
              <SelectItem value="website traffic">Website Traffic</SelectItem>
              <SelectItem value="conversions">Conversions</SelectItem>
              <SelectItem value="engagement">Engagement</SelectItem>
            </SelectContent>
          </Select>
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
          value={selectedAdType}
          onValueChange={(value) => setSelectedAdType(value as AdType)}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="sponsored-content" className="flex items-center gap-2">
              <Layout className="w-4 h-4" />
              Sponsored Content
            </TabsTrigger>
            <TabsTrigger value="message-ads" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Message Ads
            </TabsTrigger>
            <TabsTrigger value="text-ads" className="flex items-center gap-2">
              <Type className="w-4 h-4" />
              Text Ads
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );

  const renderSpecifications = () => {
    if (!selectedAdType) return null;

    const specs = {
      'sponsored-content': (
        <div className="space-y-4 mt-4">
          <h4 className="font-semibold text-gray-800">Specifications</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h5 className="font-medium text-gray-700 mb-2 flex items-center">
                <ImageIcon className="w-4 h-4 mr-2" />
                Image Requirements
              </h5>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 1200×627 px or 1080×1080 px</li>
                <li>• Maximum file size: 5 MB</li>
                <li>• Supported formats: JPG, PNG, GIF</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h5 className="font-medium text-gray-700 mb-2 flex items-center">
                <Video className="w-4 h-4 mr-2" />
                Video Requirements
              </h5>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Format: MP4</li>
                <li>• Maximum file size: 200 MB</li>
                <li>• Duration: 3-30 seconds</li>
                <li>• Aspect ratio: 16:9 or 1:1</li>
              </ul>
            </div>
          </div>
        </div>
      ),
      'message-ads': (
        <div className="space-y-4 mt-4">
          <h4 className="font-semibold text-gray-800">Specifications</h4>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h5 className="font-medium text-gray-700 mb-2 flex items-center">
              <MessageSquare className="w-4 h-4 mr-2" />
              Message Requirements
            </h5>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Subject Line: Maximum 60 characters</li>
              <li>• Message Body: Maximum 1,000 characters</li>
              <li>• Include a clear call-to-action</li>
              <li>• Personalize message for better engagement</li>
            </ul>
          </div>
        </div>
      ),
      'text-ads': (
        <div className="space-y-4 mt-4">
          <h4 className="font-semibold text-gray-800">Specifications</h4>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h5 className="font-medium text-gray-700 mb-2 flex items-center">
              <Type className="w-4 h-4 mr-2" />
              Text Ad Requirements
            </h5>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Headline: Maximum 25 characters</li>
              <li>• Description: Maximum 75 characters</li>
              <li>• Optional Image: 100×100 px</li>
              <li>• Clear and concise messaging</li>
            </ul>
          </div>
        </div>
      )
    };

    return specs[selectedAdType];
  };

  const renderGeneratedContentField = (label, value, field, maxLength) => {
    if (!value) return null;
    
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
        <div className="flex justify-between items-start mb-2">
          <label className="block text-sm font-medium text-green-800">{label} (Generated)</label>
          <button
            onClick={() => copyToClipboard(value, field)}
            className="text-green-600 hover:text-green-800 flex items-center text-xs"
          >
            {copiedField === field ? (
              <>
                <Check className="w-3 h-3 mr-1" />
                Copied
              </>
            ) : (
              <>
                <Copy className="w-3 h-3 mr-1" />
                Copy
              </>
            )}
          </button>
        </div>
        <div className="bg-white p-3 rounded border">
          <p className="text-gray-900 text-sm whitespace-pre-wrap">{value}</p>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs text-green-600">{value.length}/{maxLength} characters</span>
          <Button
            onClick={() => handleInputChange(field, value)}
            variant="ghost"
            size="sm"
            className="text-green-600 hover:text-green-800"
          >
            Use This
          </Button>
        </div>
      </div>
    );
  };

  const handleSubmit = () => {
    if (!selectedAdType) {
      toast({
        title: "Error",
        description: "Please select an ad type",
        variant: "destructive"
      });
      return;
    }

    if (!selectedFormat) {
      toast({
        title: "Error",
        description: "Please select an ad format",
        variant: "destructive"
      });
      return;
    }

    if (!validateForm(selectedAdType)) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const submissionData = {
      adType: selectedAdType,
      adFormat: selectedFormat,
      formData,
      businessInfo
    };

    if (onSubmit) {
      onSubmit(submissionData);
    }

    toast({
      title: "Success",
      description: "Ad details submitted successfully!"
    });
  };

  const renderCharacterCount = (field, maxLength) => {
    const currentLength = formData[field]?.length || 0;
    const isOverLimit = currentLength > maxLength;
    return (
      <span className={`text-xs ${isOverLimit ? 'text-red-500' : 'text-gray-500'}`}>
        {currentLength}/{maxLength}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 text-center">
            <h1 className="text-4xl font-bold mb-2">LinkedIn Ads Generator</h1>
            <p className="text-xl opacity-90">Create Professional LinkedIn Ad Campaigns</p>
          </div>

          <div className="p-8 space-y-8">
            {/* Basic Campaign Info */}
            {renderBusinessInfoForm()}

            {/* Ad Type Selection - Only show if basic info is filled */}
            {businessInfo.company && businessInfo.product && businessInfo.targetAudience && businessInfo.objective && (
              renderAdTypeSelection()
            )}

            {/* Ad Specifications */}
            {selectedAdType && renderSpecifications()}

            {/* Content Generation Section */}
            {selectedAdType && (
              <div className="mt-8">
                <Button
                  onClick={generateContent}
                  disabled={!businessInfo.company || !businessInfo.product || !businessInfo.targetAudience || !businessInfo.objective || isGenerating}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-8 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Generate Content
                    </>
                  )}
                </Button>
              </div>
            )}

            {/* Generated Content */}
            {Object.keys(generatedContent).length > 0 && (
              <div className="mt-8 space-y-6">
                <h3 className="text-xl font-bold text-gray-800">Generated Content</h3>
                {selectedAdType === 'sponsored-content' && (
                  <>
                    {renderGeneratedContentField("Intro Text", generatedContent.introText, "introText", 150)}
                    {renderGeneratedContentField("Headline", generatedContent.headline, "headline", 70)}
                    {renderGeneratedContentField("Description", generatedContent.description, "description", 100)}
                    {generatedContent.ctaButton && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <label className="block text-sm font-medium text-green-800 mb-2">CTA Button</label>
                        <div className="bg-white p-3 rounded border">
                          <Button variant="outline" className="bg-blue-600 text-white hover:bg-blue-700">
                            {generatedContent.ctaButton}
                          </Button>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {selectedAdType === 'message-ads' && (
                  <>
                    {renderGeneratedContentField("Subject Line", generatedContent.subjectLine, "subjectLine", 60)}
                    {renderGeneratedContentField("Message Body", generatedContent.messageBody, "messageBody", 1000)}
                    {renderGeneratedContentField("CTA Button", generatedContent.ctaButtonLabel, "ctaButtonLabel", 30)}
                    {renderGeneratedContentField("Destination URL", generatedContent.destinationUrl, "destinationUrl", 200)}
                  </>
                )}

                {selectedAdType === 'text-ads' && (
                  <>
                    {renderGeneratedContentField("Headline", generatedContent.textHeadline, "textHeadline", 25)}
                    {renderGeneratedContentField("Description", generatedContent.textDescription, "textDescription", 75)}
                    {renderGeneratedContentField("Destination URL", generatedContent.textDestinationUrl, "textDestinationUrl", 200)}
                  </>
                )}
              </div>
            )}

            {/* Submit Button */}
            {Object.keys(generatedContent).length > 0 && (
              <div className="pt-6 border-t border-gray-200">
                <Button
                  onClick={handleSubmit}
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

export default LinkedInAdsForm;