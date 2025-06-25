import * as React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Upload, Sparkles, Award, Zap, Shield, BarChart, CheckCircle, FileText } from 'lucide-react';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import { useDropzone } from 'react-dropzone';
import { readFileAsText } from '@/lib/utils';

interface Enhancement {
  id: string;
  original: string;
  enhanced: string;
  createdAt: Date;
}

const ResumeEnhancerPage: React.FC = () => {
   
  const [_, setEnhancements] = React.useState<Enhancement[]>([]);
  const [original, setOriginal] = React.useState("");
  const [enhanced, setEnhanced] = React.useState("");
  const [fileName, setFileName] = React.useState<string | null>(null);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [credits, setCredits] = React.useState(10);
  const [isEnhancing, setIsEnhancing] = React.useState(false);

  const onDrop = React.useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setLoading(true);
    setError("");
    
    try {
      const content = await readFileAsText(file);
      setOriginal(content);
      setFileName(file.name);
    } catch (err) {
      setError("Failed to read file. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt']
    },
    maxFiles: 1,
    multiple: false
  });

  const handleEnhance = async () => {
    if (!original.trim()) {
      setError("Please upload a resume or paste your content");
      return;
    }

    if (credits <= 0) {
      setError("You've used all your credits. Please upgrade your plan.");
      return;
    }

    setIsEnhancing(true);
    setError("");

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock enhancement - in a real app, this would be an API call
      const mockEnhanced = `Enhanced version of your resume:\n\n${original}\n\n` +
        "• Optimized for ATS systems\n" +
        "• Improved action verbs and impact statements\n" +
        "• Enhanced readability and formatting";
      
      setEnhanced(mockEnhanced);
      setCredits(prev => prev - 1);
      
      // Save to history
      const newEnhancement: Enhancement = {
        id: Date.now().toString(),
        original,
        enhanced: mockEnhanced,
        createdAt: new Date()
      };
      
      setEnhancements(prev => [newEnhancement, ...prev]);
    } catch (err) {
      setError("Failed to enhance resume. Please try again.");
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleClear = () => {
    setOriginal("");
    setEnhanced("");
    setFileName(null);
    setError("");
  };

  const features = [
    {
      icon: <Zap className="w-8 h-8 text-blue-500" />,
      title: 'Instant Enhancement',
      description: 'Get AI-powered suggestions to improve your resume in seconds.'
    },
    {
      icon: <Shield className="w-8 h-8 text-green-500" />,
      title: 'ATS Optimization',
      description: 'Optimized to pass through Applicant Tracking Systems used by 99% of employers.'
    },
    {
      icon: <BarChart className="w-8 h-8 text-purple-500" />,
      title: 'Performance Metrics',
      description: 'Get detailed feedback on how your resume performs and where to improve.'
    },
    {
      icon: <Award className="w-8 h-8 text-amber-500" />,
      title: 'Proven Results',
      description: 'Users see 3x more interview requests after using our enhancer.'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              AI-Powered Resume Enhancement
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Transform your resume with AI to land more interviews and stand out to employers
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                <Sparkles className="w-5 h-5 mr-2" />
                Enhance My Resume
              </Button>
              <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Input */}
          <div className="space-y-6">
            <Card className="border-2 border-dashed border-gray-200 hover:border-blue-300 transition-colors">
              <CardHeader>
                <CardTitle className="text-xl">Upload Your Resume</CardTitle>
                <CardDescription>
                  Upload a file or paste your resume content below
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div 
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                    isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
                  }`}
                >
                  <input {...getInputProps()} />
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Upload className="w-10 h-10 text-gray-400" />
                    <p className="text-sm text-gray-600">
                      {isDragActive 
                        ? 'Drop the file here' 
                        : 'Drag & drop your resume here, or click to select file'}
                    </p>
                    <p className="text-xs text-gray-500">
                      Supports: PDF, DOC, DOCX, TXT (max 5MB)
                    </p>
                  </div>
                </div>

                {fileName && (
                  <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-md text-sm flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    {fileName}
                  </div>
                )}

                <div className="mt-6">
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="resume-content" className="text-sm font-medium text-gray-700">
                      Or paste your resume content:
                    </label>
                    {original && (
                      <button 
                        onClick={handleClear}
                        className="text-xs text-red-500 hover:text-red-700"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                  <Textarea
                    id="resume-content"
                    value={original}
                    onChange={(e) => setOriginal(e.target.value)}
                    placeholder="Paste your resume content here..."
                    className="min-h-[200px]"
                    disabled={loading}
                  />
                </div>

                <div className="mt-6 flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    {credits} enhancement credit{credits !== 1 ? 's' : ''} remaining
                  </div>
                  <Button 
                    onClick={handleEnhance} 
                    disabled={!original.trim() || loading || isEnhancing || credits <= 0}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {isEnhancing ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Enhancing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Enhance My Resume
                      </>
                    )}
                  </Button>
                </div>

                {error && (
                  <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
                    {error}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Output */}
          <div className="space-y-6">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-xl">Enhanced Resume</CardTitle>
                <CardDescription>
                  {enhanced ? 'Your enhanced resume is ready' : 'Your enhanced resume will appear here'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {enhanced ? (
                  <div className="prose max-w-none">
                    <pre className="whitespace-pre-wrap font-sans">{enhanced}</pre>
                    <div className="mt-6 flex space-x-3">
                      <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                        Download PDF
                      </Button>
                      <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                        Copy to Clipboard
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                    <div className="text-center p-6">
                      <FileText className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-1">No resume enhanced yet</h3>
                      <p className="text-sm text-gray-500">Upload your resume and click 'Enhance' to get started</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features Section */}
        <section className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Use Our Resume Enhancer?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transform your resume with AI-powered tools designed to help you stand out
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ResumeEnhancerPage;
