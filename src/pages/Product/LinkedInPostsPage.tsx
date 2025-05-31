
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Zap, Image, FileText, Share, CheckCircle } from 'lucide-react';

const LinkedInPostsPage: React.FC = () => {
  const steps = [
    {
      icon: <FileText className="w-8 h-8 text-indigo-600" />,
      title: 'Generate Title',
      description: 'AI creates engaging titles based on your industry and role'
    },
    {
      icon: <Zap className="w-8 h-8 text-indigo-600" />,
      title: 'Create Content',
      description: 'AI writes compelling posts that resonate with your network'
    },
    {
      icon: <Image className="w-8 h-8 text-indigo-600" />,
      title: 'Generate Image',
      description: 'DALL-E creates professional visuals to accompany your posts'
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-indigo-600" />,
      title: 'Preview & Edit',
      description: 'Review and customize before publishing'
    },
    {
      icon: <Share className="w-8 h-8 text-indigo-600" />,
      title: 'Publish',
      description: 'Post directly to LinkedIn or copy to clipboard'
    }
  ];

  const features = [
    'AI-powered content generation',
    'Professional image creation with DALL-E',
    'Industry-specific templates',
    'Engagement optimization',
    'Direct LinkedIn publishing',
    'Content calendar integration',
    'Analytics and insights',
    'Video generation (Business plan)'
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-indigo-100 text-indigo-800">
                LinkedIn Post Generation
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Create Engaging LinkedIn Content in Minutes
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Let AI handle your LinkedIn content creation. Generate titles, write compelling posts, 
                create professional images, and publish directly to LinkedIn – all in one seamless workflow.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/auth/register">
                  <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                    Get Started
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline">
                  Try Demo
                </Button>
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
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Generated Title</label>
                    <div className="p-3 bg-gray-50 rounded border">
                      "5 Essential Skills Every Software Engineer Needs in 2025"
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">AI-Generated Content</label>
                    <div className="p-3 bg-gray-50 rounded border h-24 overflow-hidden">
                      The tech landscape is evolving rapidly. Here are the key skills that will set you apart...
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Professional image generated ✓</span>
                    <Button size="sm">Publish to LinkedIn</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Create professional LinkedIn content in 5 simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="mb-4 flex justify-center">{step.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
                {index < steps.length - 1 && (
                  <ArrowRight className="hidden md:block absolute top-4 -right-4 w-6 h-6 text-gray-300" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Everything you need for LinkedIn success
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">AI-Powered Content</h3>
                  <p className="text-gray-600">
                    Our advanced AI understands your industry, role, and audience to create content that drives engagement.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Professional Visuals</h3>
                  <p className="text-gray-600">
                    Generate eye-catching images with DALL-E that perfectly complement your professional message.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Direct Publishing</h3>
                  <p className="text-gray-600">
                    Seamlessly publish to LinkedIn or schedule posts for optimal engagement times.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to transform your LinkedIn presence?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Start creating professional content that drives engagement and grows your network.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth/register">
              <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100">
                Start Creating Posts
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-indigo-600">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LinkedInPostsPage;
