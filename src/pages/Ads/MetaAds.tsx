import React, { useState } from 'react';
import { 
  ChevronDown, 
  Upload, 
  Image as ImageIcon, 
  FileText,
  Type,
  Hash,
  Link,
  File,
  ClipboardList,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const MetaAdsForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    campaignName: '',
    businessType: '',
    productService: '',
    targetAudience: '',
    callToAction: '',
    persona: '',
    keywords: '',
    title: '',
    description: '',
    hashtags: '',
    contentMediaType: 'image',
    referenceFile: null,
    aspectRatio: '1:1',
    keyNotes: ''
  });

  const businessTypes = [
    'E-commerce', 'SaaS', 'Healthcare', 'Education', 'Real Estate',
    'Restaurant', 'Fitness', 'Finance', 'Travel', 'Fashion', 'Other'
  ];

  const ctaOptions = [
    'Learn More', 'Shop Now', 'Sign Up', 'Download', 'Book Now',
    'Contact Us', 'Get Quote', 'Subscribe', 'Watch Now', 'Apply Now'
  ];

  const aspectRatios = [
    '1:1', '4:5', '9:16', '16:9', '2:3', '3:2'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      referenceFile: e.target.files[0]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Form submitted",
      description: "Your campaign details have been saved.",
    });
    // Add your submission logic here
  };

  const handleGenerate = () => {
    toast({
      title: "Content generated",
      description: "AI has created suggested content for your campaign.",
    });
    // Add your generation logic here
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClipboardList className="w-6 h-6" />
            Campaign Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Section 1: Basic Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1 flex items-center gap-2">
                  <FileText className="w-4 h-4" /> 1. Campaign Name *
                </label>
                <Input
                  name="campaignName"
                  value={formData.campaignName}
                  onChange={handleChange}
                  placeholder="Summer Sale 2023"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 flex items-center gap-2">
                  <FileText className="w-4 h-4" /> 2. Business Type *
                </label>
                <Select
                  name="businessType"
                  value={formData.businessType}
                  onValueChange={(value) => handleChange({ target: { name: 'businessType', value } })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                  <SelectContent>
                    {businessTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 flex items-center gap-2">
                  <FileText className="w-4 h-4" /> 3. Product/Service *
                </label>
                <Input
                  name="productService"
                  value={formData.productService}
                  onChange={handleChange}
                  placeholder="e.g., Wireless Headphones"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 flex items-center gap-2">
                  <FileText className="w-4 h-4" /> 4. Target Audience *
                </label>
                <Input
                  name="targetAudience"
                  value={formData.targetAudience}
                  onChange={handleChange}
                  placeholder="e.g., Tech enthusiasts 25-40"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 flex items-center gap-2">
                  <FileText className="w-4 h-4" /> 5. Call to Action *
                </label>
                <Select
                  name="callToAction"
                  value={formData.callToAction}
                  onValueChange={(value) => handleChange({ target: { name: 'callToAction', value } })}
                  required
                >
                  <SelectTrigger>
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
                <label className="block text-sm font-medium mb-1 flex items-center gap-2">
                  <FileText className="w-4 h-4" /> 6. Persona
                </label>
                <Input
                  name="persona"
                  value={formData.persona}
                  onChange={handleChange}
                  placeholder="e.g., Busy professional"
                />
              </div>
            </div>

            {/* Section 2: Content Details */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-1 flex items-center gap-2">
                  <FileText className="w-4 h-4" /> 7. Keywords
                </label>
                <Input
                  name="keywords"
                  value={formData.keywords}
                  onChange={handleChange}
                  placeholder="e.g., wireless, noise-cancelling, bluetooth"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 flex items-center gap-2">
                  <Type className="w-4 h-4" /> 8. Title *
                </label>
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Attention-grabbing headline"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 flex items-center gap-2">
                  <Type className="w-4 h-4" /> Description *
                </label>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Engaging description of your offer"
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 flex items-center gap-2">
                  <Hash className="w-4 h-4" /> Hashtags
                </label>
                <Input
                  name="hashtags"
                  value={formData.hashtags}
                  onChange={handleChange}
                  placeholder="#YourBrand #ProductCategory"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1 flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" /> Content Type
                  </label>
                  <Select
                    name="contentMediaType"
                    value={formData.contentMediaType}
                    onValueChange={(value) => handleChange({ target: { name: 'contentMediaType', value } })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select media type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="image">Image</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="carousel">Carousel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 flex items-center gap-2">
                    <Link className="w-4 h-4" /> Reference File
                  </label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="file"
                      onChange={handleFileChange}
                      accept="image/*,.pdf"
                      className="cursor-pointer"
                    />
                    {formData.referenceFile && (
                      <span className="text-sm text-gray-500 truncate">
                        {formData.referenceFile.name}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1 flex items-center gap-2">
                    <FileText className="w-4 h-4" /> Aspect Ratio
                  </label>
                  <Select
                    name="aspectRatio"
                    value={formData.aspectRatio}
                    onValueChange={(value) => handleChange({ target: { name: 'aspectRatio', value } })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select aspect ratio" />
                    </SelectTrigger>
                    <SelectContent>
                      {aspectRatios.map(ratio => (
                        <SelectItem key={ratio} value={ratio}>{ratio}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 flex items-center gap-2">
                  <FileText className="w-4 h-4" /> Key Notes
                </label>
                <Textarea
                  name="keyNotes"
                  value={formData.keyNotes}
                  onChange={handleChange}
                  placeholder="Any special instructions or requirements"
                  rows={3}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6">
              <Button
                type="button"
                variant="outline"
                className="bg-gradient-to-r from-blue-50 to-purple-50"
                onClick={handleGenerate}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Content
              </Button>
              <Button type="submit" className="bg-gradient-to-r from-blue-600 to-purple-600">
                Save Campaign
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Generate Box - Would appear after generation */}
      {/* You can conditionally render this based on your state */}
      {false && (
        <Card className="mt-6 border border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-700 flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Generated Content
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-green-800">Suggested Title:</h3>
                <p className="bg-white p-3 rounded">Premium Wireless Headphones with Noise Cancellation</p>
              </div>
              <div>
                <h3 className="font-medium text-green-800">Suggested Description:</h3>
                <p className="bg-white p-3 rounded">Experience crystal-clear sound with our latest wireless headphones. Perfect for commuters and music lovers alike. Shop now and enjoy 20% off your first order!</p>
              </div>
              <div>
                <h3 className="font-medium text-green-800">Suggested Hashtags:</h3>
                <p className="bg-white p-3 rounded">#WirelessAudio #NoiseCancelling #PremiumSound #MusicLovers</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MetaAdsForm;