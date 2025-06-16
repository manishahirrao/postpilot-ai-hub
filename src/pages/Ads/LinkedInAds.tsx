import React, { useState } from 'react';
import { 
  ChevronDown, 
  Upload, 
  Type, 
  Image as ImageIcon, 
  Link, 
  MessageSquare,
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
  FileText,
  Wand2,
  X,
  Hash,
  File,
  User
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
  businessType: string;
  productService: string;
  targetAudience: string;
  callToAction: string;
  persona: string;
  keywords: string[];
  title: string;
  description: string;
  hashtags: string[];
  mediaType: string;
  aspectRatio: string;
  keyNotes: string;
  referenceFiles: File[];
  adType: string;
  businessName: string;
  landingPageUrl: string;
  keyMessage: string;
}

interface GeneratedContent {
  sponsoredContent?: {
    introText: string;
    headlines: string[];
    descriptions: string[];
    ctaButton: string;
  };
  messageAds?: {
    subjectLine: string;
    messageBody: string;
    ctaButtonLabel: string;
    destinationUrl: string;
  };
  textAds?: {
    headlines: string[];
    descriptions: string[];
    destinationUrl: string;
  };
}

const LinkedInAdsForm: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    campaignName: '',
    businessType: '',
    productService: '',
    targetAudience: '',
    callToAction: '',
    persona: '',
    keywords: [],
    title: '',
    description: '',
    hashtags: [],
    mediaType: '',
    aspectRatio: '',
    keyNotes: '',
    referenceFiles: [],
    adType: '',
    businessName: '',
    landingPageUrl: '',
    keyMessage: ''
  });

  const [generatedContent, setGeneratedContent] = useState<GeneratedContent>({});
  const [showGenerated, setShowGenerated] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copiedField, setCopiedField] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const businessTypes = [
    'B2B', 'B2C', 'SaaS', 'E-commerce', 'Consulting', 
    'Finance', 'Healthcare', 'Education', 'Technology', 'Other'
  ];

  const ctaOptions = [
    'Learn More', 'Sign Up', 'Download', 'Get Started', 'Contact Us', 
    'Apply Now', 'Register', 'Subscribe', 'Visit Website', 'Shop Now'
  ];

  const personas = [
    'Decision Maker', 'Influencer', 'User', 'Technical', 'Non-Technical',
    'Budget Holder', 'End Consumer', 'Business Owner'
  ];

  const adTypes = [
    { value: 'sponsored-content', label: 'Sponsored Content' },
    { value: 'message-ads', label: 'Message Ads' },
    { value: 'text-ads', label: 'Text Ads' }
  ];

  const mediaTypes = ['Image', 'Video', 'Document'];
  const aspectRatios = [
    '1:1 (Square)', '16:9 (Widescreen)', '4:5 (Portrait)', '9:16 (Story)'
  ];

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as string]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleKeywordChange = (index: number, value: string) => {
    const newKeywords = [...formData.keywords];
    newKeywords[index] = value;
    handleInputChange('keywords', newKeywords);
  };

  const addKeyword = () => {
    handleInputChange('keywords', [...formData.keywords, '']);
  };

  const removeKeyword = (index: number) => {
    const newKeywords = formData.keywords.filter((_, i) => i !== index);
    handleInputChange('keywords', newKeywords);
  };

  const handleHashtagChange = (index: number, value: string) => {
    const newHashtags = [...formData.hashtags];
    newHashtags[index] = value;
    handleInputChange('hashtags', newHashtags);
  };

  const addHashtag = () => {
    handleInputChange('hashtags', [...formData.hashtags, '']);
  };

  const removeHashtag = (index: number) => {
    const newHashtags = formData.hashtags.filter((_, i) => i !== index);
    handleInputChange('hashtags', newHashtags);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'reference') => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      if (type === 'reference') {
        handleInputChange('referenceFiles', [...formData.referenceFiles, ...files]);
      }
    }
  };

  const removeFile = (index: number) => {
    const newFiles = formData.referenceFiles.filter((_, i) => i !== index);
    handleInputChange('referenceFiles', newFiles);
  };

  const generateWithAI = async (field: 'title' | 'description' | 'hashtags' | 'keyNotes') => {
    setIsGenerating(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      let generatedText = '';
      switch(field) {
        case 'title':
          generatedText = `AI-Generated ${formData.productService || 'LinkedIn Ad'} Title`;
          break;
        case 'description':
          generatedText = `This is an AI-generated description for your LinkedIn ad targeting ${formData.targetAudience || 'professionals'}.`;
          break;
        case 'hashtags':
          const tags = formData.productService 
            ? [`#${formData.productService.replace(/\s+/g, '')}`, `#${formData.businessType.replace(/\s+/g, '')}`, '#LinkedInAds']
            : ['#Marketing', '#Professional', '#Business'];
          handleInputChange('hashtags', tags);
          break;
        case 'keyNotes':
          generatedText = `Key notes for ${formData.campaignName || 'your LinkedIn campaign'}:
- Target: ${formData.targetAudience || 'professionals'}
- Primary CTA: ${formData.callToAction || 'Learn More'}
- Ad Type: ${formData.adType || 'Sponsored Content'}`;
          break;
      }

      if (field !== 'hashtags') {
        handleInputChange(field, generatedText);
      }

      toast({
        title: "Success",
        description: `${field.charAt(0).toUpperCase() + field.slice(1)} generated!`
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

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.campaignName) newErrors.campaignName = 'Campaign name is required';
    if (!formData.businessType) newErrors.businessType = 'Business type is required';
    if (!formData.productService) newErrors.productService = 'Product/service is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateForm()) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const generateContent = () => {
    if (!validateForm()) return;

    const generated: GeneratedContent = {};
    const { adType, businessType, targetAudience, productService, keyMessage, callToAction, businessName, landingPageUrl } = formData;

    switch (adType) {
      case 'sponsored-content':
        generated.sponsoredContent = {
          introText: `Discover how ${productService} can help ${targetAudience} achieve their professional goals.`,
          headlines: [
            `${productService} for ${targetAudience}`,
            `${businessType} - ${productService} Solutions`,
            `Get ${productService} Results`,
            `${productService} - Made Simple`,
            `${businessType} - ${targetAudience} Experts`
          ],
          descriptions: [
            `${keyMessage || `Our ${productService} helps ${targetAudience} succeed.`} Trusted by professionals worldwide.`,
            `Experience the power of ${productService} - designed for ${targetAudience}.`,
            `Transform your ${businessType} with our ${productService} solution.`
          ],
          ctaButton: callToAction || 'Learn More'
        };
        break;

      case 'message-ads':
        generated.messageAds = {
          subjectLine: `${businessName || 'We'} have a professional solution for ${targetAudience}`,
          messageBody: `Hello,\n\nI noticed you might benefit from our ${productService}. At ${businessName || 'our firm'}, we specialize in helping ${targetAudience} with ${keyMessage || 'their challenges'}.\n\nWould you be open to a quick conversation?\n\nBest regards,\nThe ${businessName || 'Our'} Team`,
          ctaButtonLabel: callToAction || 'Schedule a Call',
          destinationUrl: landingPageUrl || `https://www.${businessName?.toLowerCase().replace(/\s+/g, '') || 'example'}.com`
        };
        break;

      case 'text-ads':
        generated.textAds = {
          headlines: [
            `${productService} for ${targetAudience}`,
            `${businessType} Solutions`,
            `Professional ${productService}`,
            `${productService} Experts`
          ],
          descriptions: [
            `${keyMessage || `Professional ${productService} solutions`}. Trusted by industry leaders.`,
            `${productService} for ${businessType} professionals.`,
            `Elevate your business with ${productService}.`
          ],
          destinationUrl: landingPageUrl || `https://www.${businessName?.toLowerCase().replace(/\s+/g, '') || 'example'}.com`
        };
        break;
    }

    setGeneratedContent(generated);
    setShowGenerated(true);
      toast({
        title: "Success",
      description: "LinkedIn ad content generated successfully!"
    });
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

  const renderStep1 = () => (
    <div className="space-y-6 p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border-l-4 border-blue-500">
      <h3 className="text-xl font-bold text-gray-800 flex items-center">
        <FileText className="mr-2 text-blue-600" size={24} />
        Basic Information
      </h3>
      
      <div className="grid md:grid-cols-2 gap-6">
            <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Campaign Name *</label>
              <Input
            value={formData.campaignName}
            onChange={(e) => handleInputChange('campaignName', e.target.value)}
            placeholder="Enter campaign name"
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

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Product/Service *</label>
              <Input
            value={formData.productService}
            onChange={(e) => handleInputChange('productService', e.target.value)}
            placeholder="What are you promoting?"
            className="w-full"
          />
          {errors.productService && <p className="text-red-500 text-sm mt-1">{errors.productService}</p>}
            </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Target Audience</label>
              <Input
            value={formData.targetAudience}
            onChange={(e) => handleInputChange('targetAudience', e.target.value)}
            placeholder="Who is your ideal professional audience?"
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
              {ctaOptions.map(cta => (
                <SelectItem key={cta} value={cta}>{cta}</SelectItem>
              ))}
                </SelectContent>
              </Select>
            </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Persona</label>
          <Select
            value={formData.persona}
            onValueChange={(value) => handleInputChange('persona', value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select persona" />
            </SelectTrigger>
            <SelectContent>
              {personas.map(persona => (
                <SelectItem key={persona} value={persona}>{persona}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Keywords</label>
          <div className="space-y-2">
            {formData.keywords.map((keyword, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  value={keyword}
                  onChange={(e) => handleKeywordChange(index, e.target.value)}
                  placeholder={`Keyword ${index + 1}`}
                  className="flex-1"
                />
          <Button
                  variant="outline"
            size="sm"
                  onClick={() => removeKeyword(index)}
                  className="text-red-500"
          >
                  <X className="w-4 h-4" />
          </Button>
        </div>
            ))}
            <Button
              variant="outline"
              onClick={addKeyword}
              className="mt-2"
            >
              + Add Keyword
            </Button>
      </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Business Name</label>
          <Input
            value={formData.businessName}
            onChange={(e) => handleInputChange('businessName', e.target.value)}
            placeholder="Your company name"
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Landing Page URL</label>
          <Input
            value={formData.landingPageUrl}
            onChange={(e) => handleInputChange('landingPageUrl', e.target.value)}
            placeholder="https://your-website.com"
            type="url"
            className="w-full"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Key Message</label>
          <Textarea
            value={formData.keyMessage}
            onChange={(e) => handleInputChange('keyMessage', e.target.value)}
            placeholder="Main value proposition or message"
            rows={3}
            className="w-full"
          />
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button onClick={nextStep} className="bg-blue-600 hover:bg-blue-700">
          Next: Ad Type & Content
        </Button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6 p-6 bg-gradient-to-r from-gray-50 to-purple-50 rounded-xl border-l-4 border-purple-500">
      <h3 className="text-xl font-bold text-gray-800 flex items-center">
        <Layout className="mr-2 text-purple-600" size={24} />
        Ad Type & Content
      </h3>
      
      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-2">LinkedIn Ad Type</h4>
          <Tabs
            value={formData.adType}
            onValueChange={handleAdTypeChange}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="sponsored-content" className="flex items-center gap-2">
                <Layout className="w-4 h-4" />
                Sponsored
              </TabsTrigger>
              <TabsTrigger value="message-ads" className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Message
              </TabsTrigger>
              <TabsTrigger value="text-ads" className="flex items-center gap-2">
                <Type className="w-4 h-4" />
                Text
              </TabsTrigger>
            </TabsList>
          </Tabs>
                      </div>

        {formData.adType && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-semibold text-gray-700">Title</label>
                      <Button
                  variant="outline" 
                        size="sm"
                  onClick={() => generateWithAI('title')}
                  disabled={isGenerating}
                  className="flex items-center gap-1"
                      >
                  <Wand2 className="w-4 h-4" />
                  {isGenerating ? 'Generating...' : 'Generate with AI'}
                      </Button>
                    </div>
              <Input
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Enter your ad title"
                className="w-full"
              />
                      </div>

            <div className="md:col-span-2">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-semibold text-gray-700">Description</label>
                      <Button
                  variant="outline" 
                        size="sm"
                  onClick={() => generateWithAI('description')}
                  disabled={isGenerating}
                  className="flex items-center gap-1"
                      >
                  <Wand2 className="w-4 h-4" />
                  {isGenerating ? 'Generating...' : 'Generate with AI'}
                      </Button>
                    </div>
        <Textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Enter your ad description"
                rows={4}
                className="w-full"
              />
      </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Hashtags</label>
              <div className="space-y-2">
                {formData.hashtags.map((hashtag, index) => (
                  <div key={index} className="flex items-center gap-2">
        <Input
                      value={hashtag}
                      onChange={(e) => handleHashtagChange(index, e.target.value)}
                      placeholder={`Hashtag ${index + 1}`}
                      className="flex-1"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeHashtag(index)}
                      className="text-red-500"
                    >
                      <X className="w-4 h-4" />
                    </Button>
        </div>
                ))}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={addHashtag}
                  >
                    <Hash className="w-4 h-4 mr-2" />
                    Add Hashtag
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => generateWithAI('hashtags')}
                    disabled={isGenerating}
                  >
                    <Wand2 className="w-4 h-4 mr-2" />
                    {isGenerating ? 'Generating...' : 'Generate Hashtags'}
                  </Button>
      </div>
        </div>
      </div>

      <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Media Type</label>
        <Select
                value={formData.mediaType}
                onValueChange={(value) => handleInputChange('mediaType', value)}
        >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select media type" />
          </SelectTrigger>
          <SelectContent>
                  {mediaTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

            {formData.mediaType && (
      <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Aspect Ratio</label>
        <Select
                  value={formData.aspectRatio}
                  onValueChange={(value) => handleInputChange('aspectRatio', value)}
        >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select aspect ratio" />
          </SelectTrigger>
          <SelectContent>
                    {aspectRatios.map(ratio => (
                      <SelectItem key={ratio} value={ratio}>{ratio}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
            )}

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Reference Images/PDF</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                <div className="flex flex-col items-center justify-center py-4">
                  <Upload className="w-8 h-8 mb-2 text-gray-400" />
                  <p className="text-sm text-gray-500 mb-2">Drag & drop files here or click to browse</p>
        <Input
                    type="file"
                    onChange={(e) => handleFileUpload(e, 'reference')}
                    className="hidden"
                    id="reference-upload"
                    multiple
                    accept="image/*,.pdf"
                  />
                  <Button variant="outline" asChild>
                    <label htmlFor="reference-upload" className="cursor-pointer">
                      Select Files
                    </label>
                  </Button>
                </div>
                {formData.referenceFiles.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {formData.referenceFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div className="flex items-center gap-2">
                          <File className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">{file.name}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(index)}
                          className="text-red-500"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
        </div>
      </div>

            <div className="md:col-span-2">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-semibold text-gray-700">Key Notes</label>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => generateWithAI('keyNotes')}
                  disabled={isGenerating}
                  className="flex items-center gap-1"
                >
                  <Wand2 className="w-4 h-4" />
                  {isGenerating ? 'Generating...' : 'Generate with AI'}
                </Button>
              </div>
        <Textarea
                value={formData.keyNotes}
                onChange={(e) => handleInputChange('keyNotes', e.target.value)}
                placeholder="Any important notes or special instructions"
                rows={4}
                className="w-full"
              />
        </div>
          </div>
        )}
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={prevStep}>
          Back
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={generateContent}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Generate Content
          </Button>
          <Button onClick={nextStep} className="bg-purple-600 hover:bg-purple-700">
            Next: Review & Submit
          </Button>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-800 flex items-center">
        <Check className="mr-2 text-green-600" size={24} />
        Review & Submit
      </h3>

      {showGenerated && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Sparkles className="w-5 h-5 mr-2" />
              Generated LinkedIn Ad Content
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {formData.adType === 'sponsored-content' && generatedContent.sponsoredContent && (
              <>
      <div>
                  <h4 className="text-sm font-medium mb-2">Intro Text (150 characters max)</h4>
                  <div className="flex items-center justify-between bg-gray-50 p-3 rounded">
                    <p>{generatedContent.sponsoredContent.introText}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(generatedContent.sponsoredContent?.introText || '', 'intro-text')}
                    >
                      {copiedField === 'intro-text' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Headlines (70 characters max)</h4>
                  {generatedContent.sponsoredContent.headlines.map((headline, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded mb-2">
                      <div className="flex-1">
                        <span className="text-sm">{headline}</span>
                        <span className="text-xs text-gray-500 ml-2">({headline.length}/70)</span>
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
                  <h4 className="text-sm font-medium mb-2">Descriptions (100 characters max)</h4>
                  {generatedContent.sponsoredContent.descriptions.map((description, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded mb-2">
                      <div className="flex-1">
                        <span className="text-sm">{description}</span>
                        <span className="text-xs text-gray-500 ml-2">({description.length}/100)</span>
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
                  <h4 className="text-sm font-medium mb-2">Call to Action</h4>
                  <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <span className="text-sm">{generatedContent.sponsoredContent.ctaButton}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(generatedContent.sponsoredContent?.ctaButton || '', 'cta-button')}
                    >
                      {copiedField === 'cta-button' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
        </div>
      </div>
              </>
            )}

            {formData.adType === 'message-ads' && generatedContent.messageAds && (
              <>
      <div>
                  <h4 className="text-sm font-medium mb-2">Subject Line (60 characters max)</h4>
                  <div className="flex items-center justify-between bg-gray-50 p-3 rounded">
                    <p>{generatedContent.messageAds.subjectLine}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(generatedContent.messageAds?.subjectLine || '', 'subject-line')}
                    >
                      {copiedField === 'subject-line' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
        </div>
      </div>
      <div>
                  <h4 className="text-sm font-medium mb-2">Message Body (1000 characters max)</h4>
                  <div className="flex items-center justify-between bg-gray-50 p-3 rounded">
                    <p className="whitespace-pre-line">{generatedContent.messageAds.messageBody}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(generatedContent.messageAds?.messageBody || '', 'message-body')}
                    >
                      {copiedField === 'message-body' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
        </div>
      </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Call to Action</h4>
                  <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <span className="text-sm">{generatedContent.messageAds.ctaButtonLabel}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(generatedContent.messageAds?.ctaButtonLabel || '', 'message-cta')}
                    >
                      {copiedField === 'message-cta' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
    </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Destination URL</h4>
                  <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <span className="text-sm">{generatedContent.messageAds.destinationUrl}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(generatedContent.messageAds?.destinationUrl || '', 'message-url')}
                    >
                      {copiedField === 'message-url' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
        </div>
                </div>
              </>
            )}

            {formData.adType === 'text-ads' && generatedContent.textAds && (
              <>
                <div>
                  <h4 className="text-sm font-medium mb-2">Headlines (25 characters max)</h4>
                  {generatedContent.textAds.headlines.map((headline, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded mb-2">
                      <div className="flex-1">
                        <span className="text-sm">{headline}</span>
                        <span className="text-xs text-gray-500 ml-2">({headline.length}/25)</span>
                      </div>
            <Button 
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(headline, `text-headline-${index}`)}
                      >
                        {copiedField === `text-headline-${index}` ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </Button>
          </div>
                  ))}
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Descriptions (75 characters max)</h4>
                  {generatedContent.textAds.descriptions.map((description, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded mb-2">
                      <div className="flex-1">
                        <span className="text-sm">{description}</span>
                        <span className="text-xs text-gray-500 ml-2">({description.length}/75)</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(description, `text-description-${index}`)}
                      >
                        {copiedField === `text-description-${index}` ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                  ))}
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Destination URL</h4>
                  <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <span className="text-sm">{generatedContent.textAds.destinationUrl}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(generatedContent.textAds?.destinationUrl || '', 'text-url')}
                    >
                      {copiedField === 'text-url' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              </>
            )}
        </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Campaign Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Campaign Name</p>
                <p>{formData.campaignName || '-'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Business Type</p>
                <p>{formData.businessType || '-'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Product/Service</p>
                <p>{formData.productService || '-'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Target Audience</p>
                <p>{formData.targetAudience || '-'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Call to Action</p>
                <p>{formData.callToAction || '-'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Persona</p>
                <p>{formData.persona || '-'}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm font-medium text-gray-500">Keywords</p>
                <div className="flex flex-wrap gap-2">
                  {formData.keywords.length > 0 
                    ? formData.keywords.map((kw, i) => <span key={i} className="bg-gray-100 px-2 py-1 rounded text-sm">{kw}</span>)
                    : '-'}
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h4 className="font-medium mb-2">Content Details</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Ad Type</p>
                  <p>{formData.adType ? adTypes.find(t => t.value === formData.adType)?.label : '-'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Title</p>
                  <p>{formData.title || '-'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Media Type</p>
                  <p>{formData.mediaType || '-'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Aspect Ratio</p>
                  <p>{formData.aspectRatio || '-'}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm font-medium text-gray-500">Description</p>
                  <p className="whitespace-pre-line">{formData.description || '-'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Hashtags</p>
                  <div className="flex flex-wrap gap-1">
                    {formData.hashtags.length > 0 
                      ? formData.hashtags.map((ht, i) => <span key={i} className="text-blue-600">{ht}</span>)
                      : '-'}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm font-medium text-gray-500">Reference Files</p>
                  <div className="flex flex-wrap gap-2">
                    {formData.referenceFiles.length > 0 
                      ? formData.referenceFiles.map((file, i) => (
                          <span key={i} className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded text-sm">
                            <File className="w-3 h-3" />
                            {file.name}
                          </span>
                        ))
                      : '-'}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm font-medium text-gray-500">Key Notes</p>
                  <p className="whitespace-pre-line">{formData.keyNotes || '-'}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
    </Card>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={prevStep}>
          Back
        </Button>
        <Button 
          onClick={() => {
            toast({
              title: "Success",
              description: "LinkedIn campaign submitted successfully!"
            });
          }}
          className="bg-green-600 hover:bg-green-700"
        >
          Submit Campaign
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 text-center">
            <h1 className="text-4xl font-bold mb-2">LinkedIn Ads Generator</h1>
            <p className="text-xl opacity-90">Professional LinkedIn Ad Campaigns</p>
          </div>

          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                  1
                </div>
                <span className={`text-sm ${currentStep >= 1 ? 'font-semibold text-blue-600' : 'text-gray-500'}`}>Basic Info</span>
              </div>
              <div className="h-px flex-1 bg-gray-200 mx-2"></div>
              <div className="flex items-center gap-2">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 2 ? 'bg-blue-600 text-white' : currentStep === 2 ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-600'}`}>
                  2
                </div>
                <span className={`text-sm ${currentStep >= 2 ? 'font-semibold text-blue-600' : 'text-gray-500'}`}>Ad Content</span>
              </div>
              <div className="h-px flex-1 bg-gray-200 mx-2"></div>
              <div className="flex items-center gap-2">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 3 ? 'bg-blue-600 text-white' : currentStep === 3 ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-600'}`}>
                  3
                </div>
                <span className={`text-sm ${currentStep >= 3 ? 'font-semibold text-blue-600' : 'text-gray-500'}`}>Review</span>
        </div>
      </div>

            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkedInAdsForm;