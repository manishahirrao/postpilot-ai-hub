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
import { ArrowRight, Zap, Image, FileText, Share, CheckCircle, Sparkles, TrendingUp, Users, Clock, Target, Calendar, User, Heart, MessageCircle } from 'lucide-react';
import { ContentGenerator } from './Postgeneration';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';

const PersonalPostGeneration: React.FC = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [achievementText, setAchievementText] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('LinkedIn');

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
    { 
      icon: <User className="w-8 h-8" />, 
      title: 'Personal Branding', 
      description: 'AI analyzes your profile and creates content that reflects your unique voice',
      color: 'from-blue-500 to-blue-600'
    },
    { 
      icon: <Zap className="w-8 h-8" />, 
      title: 'Create Content', 
      description: 'Generate authentic posts that resonate with your personal network',
      color: 'from-purple-500 to-purple-600'
    },
    { 
      icon: <Image className="w-8 h-8" />, 
      title: 'Visual Stories', 
      description: 'Create compelling visuals that tell your personal story',
      color: 'from-pink-500 to-pink-600'
    },
    { 
      icon: <Heart className="w-8 h-8" />, 
      title: 'Engagement Focus', 
      description: 'Optimize for meaningful connections and conversations',
      color: 'from-red-500 to-red-600'
    },
    { 
      icon: <Share className="w-8 h-8" />, 
      title: 'Share & Connect', 
      description: 'Publish across platforms to build your personal brand',
      color: 'from-green-500 to-green-600'
    },
  ];

  const features = [
    { icon: <User className="w-6 h-6" />, text: 'Personal brand optimization', color: 'text-blue-500' },
    { icon: <Heart className="w-6 h-6" />, text: 'Authentic voice generation', color: 'text-red-500' },
    { icon: <Target className="w-6 h-6" />, text: 'Career-focused content', color: 'text-purple-500' },
    { icon: <TrendingUp className="w-6 h-6" />, text: 'Growth-oriented posts', color: 'text-green-500' },
    { icon: <MessageCircle className="w-6 h-6" />, text: 'Conversation starters', color: 'text-orange-500' },
    { icon: <Calendar className="w-6 h-6" />, text: 'Personal content calendar', color: 'text-indigo-500' },
    { icon: <Users className="w-6 h-6" />, text: 'Network building tools', color: 'text-cyan-500' },
    { icon: <Sparkles className="w-6 h-6" />, text: 'Personal story enhancement', color: 'text-yellow-500' },
  ];

  const socialPlatforms = [
    { 
      name: 'LinkedIn', 
      icon: '👤', 
      description: 'Professional personal branding',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    { 
      name: 'Facebook', 
      icon: '🤝', 
      description: 'Personal connections and updates',
      color: 'from-blue-600 to-blue-700',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    { 
      name: 'Instagram', 
      icon: '✨', 
      description: 'Visual personal storytelling',
      color: 'from-pink-500 to-purple-600',
      bgColor: 'bg-gradient-to-r from-pink-50 to-purple-50',
      textColor: 'text-purple-700'
    },
    { 
      name: 'Pinterest', 
      icon: '💡', 
      description: 'Personal inspiration and ideas',
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      textColor: 'text-red-700'
    },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-16 bg-gradient-to-br from-slate-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-pink-50 opacity-60"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border-0 px-4 py-2 text-sm font-medium">
                  ✨ Personal Brand Content Generation
                </Badge>
                <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-purple-900 to-pink-900 bg-clip-text text-transparent leading-tight">
                  Build Your Personal Brand with AI-Powered Content
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                  Create authentic, engaging content that showcases your unique voice and builds meaningful connections. Let AI help you tell your story across all social platforms.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/auth/register">
                  <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200">
                    Start Building Your Brand <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="border-2 border-gray-300 hover:border-purple-500 px-8 py-4 rounded-xl font-semibold hover:bg-purple-50 transition-all duration-200">
                  See Examples
                </Button>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">25K+</div>
                  <div className="text-sm text-gray-600">Personal Brands</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">3x</div>
                  <div className="text-sm text-gray-600">More Engagement</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">98%</div>
                  <div className="text-sm text-gray-600">Authentic Voice</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 rounded-3xl transform rotate-3 opacity-10"></div>
              <Card className="bg-white/80 backdrop-blur-sm shadow-2xl border-0 rounded-3xl overflow-hidden relative z-10">
                <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-600 text-white">
                  <CardTitle className="flex items-center space-x-3 text-xl">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <User className="w-6 h-6" />
                    </div>
                    <span>Personal Brand Generator</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 p-8">
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                      <div className="text-sm font-medium text-purple-800 mb-2">✨ Personal Story:</div>
                      <div className="text-gray-800 font-semibold">"From Junior Developer to Tech Lead: My Journey in 3 Years"</div>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100 h-32 overflow-hidden">
                      <div className="text-sm font-medium text-blue-800 mb-2">🎯 Authentic Content:</div>
                      <div className="text-gray-700 text-sm leading-relaxed">Three years ago, I was debugging my first Hello World program. Today, I'm leading a team of 8 developers. Here's what I learned...</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-2">
                      <Heart className="w-5 h-5 text-red-500" />
                      <span className="text-sm text-gray-600">Authentic voice preserved</span>
                    </div>
                    <Button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-lg">
                      Share Story
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Platforms Tabs */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Build Your Personal Brand</h2>
            <p className="text-xl text-gray-600">Create authentic content optimized for your personal growth on each platform</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8 bg-gray-100 p-1 rounded-2xl">
              {socialPlatforms.map((platform) => (
                <TabsTrigger 
                  key={platform.name}
                  value={platform.name} 
                  className="data-[state=active]:bg-white data-[state=active]:shadow-md rounded-xl py-4 px-6 font-semibold transition-all duration-200"
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">{platform.icon}</span>
                    <span>{platform.name}</span>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>

            {socialPlatforms.map((platform) => (
              <TabsContent key={platform.name} value={platform.name} className="mt-8">
                <div className={`p-6 rounded-2xl ${platform.bgColor} border border-gray-200/50 mb-8`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className={`text-2xl font-bold ${platform.textColor} mb-2`}>
                        {platform.icon} {platform.name} Personal Content
                      </h3>
                      <p className="text-gray-600">{platform.description}</p>
                    </div>
                    <div className={`p-4 bg-gradient-to-r ${platform.color} rounded-xl text-white`}>
                      <User className="w-8 h-8" />
                    </div>
                  </div>
                </div>
                <ContentGenerator selectedAdType={platform.name} />
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* How It Works Steps */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-purple-100 text-purple-800 mb-4 px-4 py-2">How It Works</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Build Your Personal Brand in 5 Steps</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Our AI understands your unique voice and helps you create authentic content that builds meaningful connections.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-center group hover:transform hover:-translate-y-2 transition-all duration-300">
                  <div className={`mb-6 flex justify-center relative`}>
                    <div className={`p-6 bg-gradient-to-r ${step.color} rounded-2xl text-white shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                      {step.icon}
                    </div>
                    <div className="absolute -top-2 -right-2 bg-white text-purple-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold border-2 border-purple-200">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/4 -right-4 transform">
                    <ArrowRight className="w-6 h-6 text-gray-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <div>
                <Badge className="bg-pink-100 text-pink-800 mb-4 px-4 py-2">Personal Branding Features</Badge>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Everything You Need to Build Your Personal Brand</h2>
                <p className="text-xl text-gray-600">Authentic tools to showcase your unique voice and connect with your audience meaningfully.</p>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {features.map((feature, i) => (
                  <div key={i} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <div className={`${feature.color}`}>
                      {feature.icon}
                    </div>
                    <span className="font-medium text-gray-800">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-6">
              {[
                {
                  title: 'Authentic Voice',
                  description: 'AI learns your unique communication style and maintains your authentic voice across all content while optimizing for engagement.',
                  icon: <Heart className="w-6 h-6 text-red-500" />,
                  gradient: 'from-red-50 to-pink-50'
                },
                {
                  title: 'Personal Stories',
                  description: 'Transform your experiences into compelling narratives that resonate with your audience and build genuine connections.',
                  icon: <User className="w-6 h-6 text-purple-500" />,
                  gradient: 'from-purple-50 to-indigo-50'
                },
                {
                  title: 'Growth Focused',
                  description: 'Every piece of content is designed to build your personal brand, expand your network, and create new opportunities.',
                  icon: <TrendingUp className="w-6 h-6 text-green-500" />,
                  gradient: 'from-green-50 to-emerald-50'
                }
              ].map((feature, i) => (
                <Card key={i} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                  <CardContent className={`p-8 bg-gradient-to-r ${feature.gradient}`}>
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-white rounded-xl shadow-sm group-hover:shadow-md transition-shadow duration-300">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-gray-900 mb-3">{feature.title}</h3>
                        <p className="text-gray-700 leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-40 h-40 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-60 h-60 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Build Your Personal Brand?</h2>
              <p className="text-xl opacity-90 max-w-2xl mx-auto leading-relaxed">
                Join thousands of professionals who are using AI to create authentic content that builds meaningful connections and opens new opportunities.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link to="/auth/register">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200">
                  Start Building Your Brand <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/pricing">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 rounded-xl font-semibold transition-all duration-200">
                  View Personal Plans
                </Button>
              </Link>
            </div>
            
            <div className="pt-8 flex items-center justify-center space-x-8 opacity-80">
              <div className="text-center">
                <div className="text-2xl font-bold">Free</div>
                <div className="text-sm">Personal Start</div>
              </div>
              <div className="w-px h-8 bg-white/30"></div>
              <div className="text-center">
                <div className="text-2xl font-bold">1 Min</div>
                <div className="text-sm">Setup Time</div>
              </div>
              <div className="w-px h-8 bg-white/30"></div>
              <div className="text-center">
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-sm">AI Assistant</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
      <Footer />
    </>
  );
};

export default PersonalPostGeneration;