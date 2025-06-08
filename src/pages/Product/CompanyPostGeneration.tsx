import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Zap, Image, FileText, Share, CheckCircle } from 'lucide-react';
import CareerAnalyticsPage from './CareerAnalyticsPage';
import ResumeBuilderPage from './ResumeBuilderPage';
import JobMatcherPage from './JobMatcherPage';
import { ContentGenerator } from './Postgeneration';


const LinkedInPostsPage: React.FC = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [achievementText, setAchievementText] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
   const [activeTab, setActiveTab] = useState('jobs');

  const generateProposal = async () => {
    if (!jobTitle || !jobDescription) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in the job title and description.',
        variant: 'destructive',
      });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setGeneratedContent(`🚀 Proposal for ${jobTitle}:\n${jobDescription}`);
      setLoading(false);
    }, 1500);
  };

  const generateLinkedInPost = async () => {
    if (!achievementText) {
      toast({
        title: 'Missing Information',
        description: 'Please enter an achievement or insight.',
        variant: 'destructive',
      });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setGeneratedContent(`🌟 Sharing a recent milestone: ${achievementText}`);
      setLoading(false);
    }, 1500);
  };

  const generateResumeOptimization = async () => {
    setLoading(true);
    setTimeout(() => {
      setGeneratedContent(
        `📝 Resume Tip: Tailor your resume to job descriptions, use action verbs, and quantify results.`
      );
      setLoading(false);
    }, 1500);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent);
    toast({
      title: 'Copied!',
      description: 'Generated content copied to clipboard.',
    });
  };

  const steps = [
    { icon: <FileText className="w-8 h-8 text-indigo-600" />, title: 'Generate Title', description: 'AI creates engaging titles based on your industry and role' },
    { icon: <Zap className="w-8 h-8 text-indigo-600" />, title: 'Create Content', description: 'AI writes compelling posts that resonate with your network' },
    { icon: <Image className="w-8 h-8 text-indigo-600" />, title: 'Generate Image', description: 'DALL·E creates professional visuals to accompany your posts' },
    { icon: <CheckCircle className="w-8 h-8 text-indigo-600" />, title: 'Preview & Edit', description: 'Review and customize before publishing' },
    { icon: <Share className="w-8 h-8 text-indigo-600" />, title: 'Publish', description: 'Post directly to LinkedIn or copy to clipboard' },
  ];

  const features = [
    'AI-powered content generation',
    'Professional image creation with DALL·E',
    'Industry-specific templates',
    'Engagement optimization',
    'Direct Social Media publishing',
    'Content calendar integration',
    'Analytics and insights',
    'Video generation (Business plan)',
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-indigo-100 text-indigo-800">Social Media Post Generation</Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Create Engaging Social Media Content in Minutes</h1>
              <p className="text-xl text-gray-600 mb-8">
                Let AI handle your Social Media content creation. Generate titles, write compelling posts, create visuals, and publish.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/auth/register">
                  <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                    Get Started <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline">Try Demo</Button>
              </div>
            </div>
            <div className="relative">
              <Card className="bg-white shadow-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="w-6 h-6 text-indigo-600" />
                    <span>Post Generator</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 bg-gray-50 rounded border">
                    <strong>Generated Title:</strong> “5 Essential Skills Every Software Engineer Needs in 2025”
                  </div>
                  <div className="p-3 bg-gray-50 rounded border h-24 overflow-hidden">
                    <strong>AI-Generated Content:</strong> The tech landscape is evolving rapidly. Here are the key skills that will set you apart...
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Professional image generated ✓</span>
                    <Button size="sm">Publish to Social Media</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

         {/* bar of all social media content */}
       <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="LinkedIn">LinkedIn</TabsTrigger>
          <TabsTrigger value="Facebook">Facebook</TabsTrigger>
          <TabsTrigger value="Instagram">Instagram</TabsTrigger>
          <TabsTrigger value="Pinterest">Pinterest</TabsTrigger>
         
        </TabsList>

        <TabsContent value="LinkedIn">
          <ContentGenerator />
        </TabsContent>

       <TabsContent value="Facebook">
          <ContentGenerator />
        </TabsContent>
        
        <TabsContent value="Instagram">
          <ContentGenerator />
        </TabsContent>

        <TabsContent value="Pinterest">
          <ContentGenerator />
        </TabsContent>


       
      </Tabs>

      {/* Steps */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 mb-12">Create professional Social Media content in 5 simple steps</p>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="mb-4 flex justify-center">{step.icon}</div>
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold mb-6">Everything you need for Social Media success</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {features.map((feature, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              {['AI-Powered Content', 'Professional Visuals', 'Direct Publishing'].map((title, i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">{title}</h3>
                    <p className="text-gray-600">
                      {title === 'AI-Powered Content' && 'Our AI understands your industry and audience to craft tailored content.'}
                      {title === 'Professional Visuals' && 'Generate DALL·E images to support your message visually.'}
                      {title === 'Direct Publishing' && 'Post directly or schedule for peak engagement times.'}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to transform your Social Media presence?</h2>
          <p className="text-xl mb-8">Start creating professional content that drives engagement.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/auth/register">
              <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100">Start Creating Posts <ArrowRight className="w-5 h-5 ml-2" /></Button>
            </Link>
            <Link to="/pricing">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-indigo-600">View Pricing</Button>
            </Link>
          </div>
        </div>
      </section>

     

         
    </div>
  );
};

export default LinkedInPostsPage;
