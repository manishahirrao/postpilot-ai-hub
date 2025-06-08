
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Upload, Zap, Download, CheckCircle, FileText, TrendingUp } from 'lucide-react';

const ResumeBuilderPage: React.FC = () => {
  const beforeAfter = {
    before: [
      "Worked on software projects",
      "Helped with team coordination",
      "Used various programming languages"
    ],
    after: [
      "Led development of 3 mission-critical applications serving 10,000+ users",
      "Coordinated cross-functional team of 8 developers, reducing delivery time by 30%",
      "Architected scalable solutions using React, Node.js, and AWS, improving performance by 40%"
    ]
  };

  const features = [
    'ATS-friendly optimization',
    'AI-powered bullet point enhancement',
    'Industry-specific templates',
    'Keyword optimization',
    'Format standardization',
    'Skills gap analysis',
    'Achievement quantification',
    'Multiple export formats'
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-gradient-to-r from-indigo-600 to-purple-600">
                Resume Builder/Enhancer
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Transform Your Resume with AI
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Upload your existing resume and let our AI enhance it to be ATS-friendly, 
                compelling, and optimized for your target roles. Stand out from the competition 
                with professionally crafted content.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/auth/register">
                  <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-green-700 hover:to-blue-700">
                    Try It Now
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline">
                  See Examples
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <Card className="bg-white shadow-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="w-6 h-6 text-green-600" />
                    <span>Resume Enhancer</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Drop your resume here or click to upload</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Processing with AI...</span>
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full w-3/4"></div>
                    </div>
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <Download className="w-4 h-4 mr-2" />
                    Download Enhanced Resume
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Before & After */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              See the Transformation
            </h2>
            <p className="text-xl text-gray-600">
              Our AI transforms weak bullet points into compelling achievements
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="text-red-600">Before: Generic Statements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {beforeAfter.before.map((item, index) => (
                  <div key={index} className="p-3 bg-red-50 rounded border-l-4 border-red-300">
                    <p className="text-gray-700">{item}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
            
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-600">After: Impact-Driven Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {beforeAfter.after.map((item, index) => (
                  <div key={index} className="p-3 bg-green-50 rounded border-l-4 border-green-300">
                    <p className="text-gray-700">{item}</p>
                    <CheckCircle className="w-5 h-5 text-green-500 mt-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple 3-step process to enhance your resume
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">1. Upload Resume</h3>
              <p className="text-gray-600">
                Upload your current resume in PDF or DOCX format. Our AI will parse and analyze your content.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">2. AI Enhancement</h3>
              <p className="text-gray-600">
                Our AI rewrites your bullet points to be more impactful, quantified, and ATS-friendly.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">3. Download Enhanced</h3>
              <p className="text-gray-600">
                Get your enhanced resume in multiple formats, optimized for both ATS systems and human readers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Features that make your resume stand out
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
                  <h3 className="font-semibold text-gray-900 mb-2">ATS Optimization</h3>
                  <p className="text-gray-600">
                    Ensure your resume passes Applicant Tracking Systems with proper formatting and keyword optimization.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Impact Quantification</h3>
                  <p className="text-gray-600">
                    Transform vague descriptions into quantified achievements that demonstrate your value.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Industry Customization</h3>
                  <p className="text-gray-600">
                    Tailor your resume for specific industries and roles with AI-driven recommendations.
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
            Ready to enhance your resume?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Transform your resume into a powerful tool that gets you noticed by employers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth/register">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                Enhance My Resume
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-green-600">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResumeBuilderPage;
