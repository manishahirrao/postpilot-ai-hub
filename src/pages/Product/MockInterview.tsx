import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Star as StarIcon, RotateCcw, BarChart2, CheckCircle, HelpCircle, Download, Mic, Code, Type as TypeIcon, ArrowRight, Sparkles, Volume2, Layout, Play, Pause, Clock, ChevronRight, Cpu } from 'lucide-react';

// Mock ProductLayout component
interface ProductLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

const ProductLayout: React.FC<ProductLayoutProps> = ({ children, title, description }) => {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
};

// Types
interface Feedback {
  score: number;
  feedback: string;
  strengths: Array<{ text: string; strength: number }>;
  areasForImprovement: string[];
  examples: string[];
  fillerWords?: number;
  speakingRate?: number;
  sentimentScore?: number;
}

interface Question {
  id: string;
  text: string;
  type: 'behavioral' | 'technical';
  timeLimit: number;
}

// Floating element component
interface FloatingElementProps {
  children?: React.ReactNode;
  className?: string;
  delay?: number;
}

const FloatingElement: React.FC<FloatingElementProps> = ({ children, className = '', delay = 0 }) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: [0.1, 0.3, 0.1],
        y: [0, -15, 0],
      }}
      transition={{
        duration: 8 + Math.random() * 10,
        delay,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
};

const MockInterviewPage: React.FC = () => {
  // State management
  const [mounted, setMounted] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'behavioral' | 'technical'>('behavioral');
  const [isInterviewing, setIsInterviewing] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [timerIntervalId, setTimerIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [userResponse, setUserResponse] = useState<string>('');
  const [transcript, setTranscript] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);

  // Mock data for interview questions
  const MOCK_QUESTIONS = {
    behavioral: [
      {
        id: 'beh-1',
        text: "Tell me about a time you faced a difficult challenge and how you overcame it.",
        type: 'behavioral' as const,
        timeLimit: 180,
      },
      {
        id: 'beh-2',
        text: "Describe a situation where you had to work with a difficult team member.",
        type: 'behavioral' as const,
        timeLimit: 180,
      },
      {
        id: 'beh-3',
        text: "Tell me about a time you made a mistake and how you handled it.",
        type: 'behavioral' as const,
        timeLimit: 180,
      },
    ],
    technical: [
      {
        id: 'tech-1',
        text: "Explain how you would implement a function to reverse a string in JavaScript.",
        type: 'technical' as const,
        timeLimit: 180,
      },
      {
        id: 'tech-2',
        text: "What are the differences between let, const, and var in JavaScript?",
        type: 'technical' as const,
        timeLimit: 180,
      },
      {
        id: 'tech-3',
        text: "How would you optimize a slow React component?",
        type: 'technical' as const,
        timeLimit: 180,
      },
    ],
  };

  // Mock behavioral questions for the example
  const behavioralQuestions = [
    "Tell me about yourself",
    "Describe a challenge you faced",
    "How do you handle conflict?",
    "Give an example of leadership",
    "Describe a time you failed"
  ];

  // Mock feedback data
  const mockFeedback = {
    fillerWords: 12,
    speakingRate: 140,
    sentimentScore: 0.85,
    strengths: [
      "Clear structure in responses",
      "Good use of STAR method",
      "Positive tone throughout"
    ],
    improvements: [
      "Reduce filler words ('um', 'like')",
      "Pace could be slower for clarity",
      "Add more quantifiable results"
    ],
    examples: [
      `Instead of: 'We kind of improved things'\nTry: 'We increased conversion by 22% in Q3'`,
      `Instead of: 'I was like the leader'\nTry: 'I spearheaded a team of 5 engineers to deliver...'`
    ]
  };

  // Get current question based on active tab and index
  const currentQuestion = MOCK_QUESTIONS[activeTab][currentQuestionIndex];

  // Format time in MM:SS format
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Start interview
  const startInterview = () => {
    setIsInterviewing(true);
    setShowFeedback(false);
    setCurrentQuestionIndex(0);
    setUserResponse('');
    setTranscript('');
    setTimer(0);
    setIsTimerRunning(true);
  };

  // Toggle timer
  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  // Handle next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < MOCK_QUESTIONS[activeTab].length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setUserResponse('');
      setTranscript('');
    } else {
      // End of questions
      setIsInterviewing(false);
      setShowFeedback(true);
    }
  };

  // Toggle recording
  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  // Toggle mute
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  // Submit response
  const submitResponse = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      handleNextQuestion();
    }, 1000);
  };

  // Effect for timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isTimerRunning && isInterviewing) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
      setTimerIntervalId(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, isInterviewing]);

  // Set mounted state to prevent hydration issues
  useEffect(() => {
    setMounted(true);
    return () => {
      if (timerIntervalId) clearInterval(timerIntervalId);
    };
  }, [timerIntervalId]);

  if (!mounted) {
    return null;
  }

  return (
    <ProductLayout
      title="AI-Powered Mock Interviews | PostPilot"
      description="Practice your interview skills with our AI-powered mock interview platform. Get instant feedback on your responses, body language, and more."
    >
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
        {/* Animated background elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5" />
          <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }} />
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/3 right-1/3 w-40 h-40 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1.5s' }} />
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }} />

          {/* Floating animated elements */}
          <FloatingElement className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/20" delay={0}>
            <div className="w-full h-full" />
          </FloatingElement>
          <FloatingElement className="absolute top-1/3 right-1/4 w-12 h-12 rounded-full bg-purple-500/10 border border-purple-500/20" delay={0.5}>
            <div className="w-full h-full" />
          </FloatingElement>
          <FloatingElement className="absolute bottom-1/4 right-1/3 w-20 h-20 rounded-full bg-pink-500/10 border border-pink-500/20" delay={1}>
            <div className="w-full h-full" />
          </FloatingElement>
        </div>

        {/* Hero Section */}
        <section className="relative py-32 overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div 
                className="inline-flex items-center px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/10 backdrop-blur-md mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Sparkles className="w-5 h-5 mr-2 text-cyan-400" />
                <span className="text-sm font-medium bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  AI-Powered Mock Interviews
                </span>
              </motion.div>

              <motion.h1 
                className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <span className="block bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent">
                  Master Your Next
                </span>
                <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mt-2">
                  Technical Interview
                </span>
              </motion.h1>

              <motion.p 
                className="text-xl text-gray-300 max-w-2xl mx-auto mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Practice with our AI interviewer, get instant feedback, and improve your interview skills in a realistic environment.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row justify-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Button 
                  className="group relative overflow-hidden px-8 py-6 text-lg font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/20"
                  onClick={startInterview}
                >
                  <span className="relative z-10 flex items-center">
                    {isInterviewing ? 'Interview in Progress' : 'Start Mock Interview'}
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></span>
                </Button>

                <Button 
                  variant="outline" 
                  className="px-8 py-6 text-lg border-white/20 bg-transparent backdrop-blur-sm hover:bg-white/10 hover:text-white"
                >
                  <HelpCircle className="mr-2 h-5 w-5" />
                  How It Works
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <motion.div 
            className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Tabs 
              value={activeTab} 
              onValueChange={(value) => setActiveTab(value as 'behavioral' | 'technical')}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 bg-transparent p-0 border-b border-white/10">
                <TabsTrigger 
                  value="behavioral" 
                  className="py-6 data-[state=active]:bg-white/10 data-[state=active]:text-white data-[state=active]:shadow-none"
                >
                  <Mic className="w-5 h-5 mr-2" />
                  Behavioral
                </TabsTrigger>
                <TabsTrigger 
                  value="technical" 
                  className="py-6 data-[state=active]:bg-white/10 data-[state=active]:text-white data-[state=active]:shadow-none"
                >
                  <Code className="w-5 h-5 mr-2" />
                  Technical
                </TabsTrigger>
              </TabsList>
              
              <div className="p-6 md:p-8">
                {activeTab === 'behavioral' ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-8">
                      <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                        <Mic className="text-cyan-400" />
                        Behavioral Interview Simulation
                      </h3>
                      <p className="text-gray-300">
                        Practice answering common behavioral questions with AI-powered analysis of your responses.
                        Get feedback on your communication style, structure, and content.
                      </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                        <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                          <Volume2 className="text-cyan-400" />
                          Question Sets
                        </h4>
                        <p className="text-gray-300 mb-4">
                          Choose from 20+ scenarios: Leadership, Conflict Management, Teamwork, Cultural Fit.
                        </p>
                        <div className="space-y-2">
                          {behavioralQuestions.map((question, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <ChevronRight className="w-4 h-4 mt-1 text-cyan-400 flex-shrink-0" />
                              <p className="text-gray-300 text-sm">{question}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                        <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                          <BarChart2 className="text-cyan-400" />
                          Live Response Analysis
                        </h4>
                        <p className="text-gray-300 mb-4">
                          I'll transcribe and analyze your verbal or typed answers.
                        </p>
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <div className="text-2xl font-bold text-cyan-400 mb-1">12</div>
                            <div className="text-xs text-gray-300">FILLER WORDS</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-cyan-400 mb-1">140</div>
                            <div className="text-xs text-gray-300">WORDS/MIN</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-cyan-400 mb-1">0.85</div>
                            <div className="text-xs text-gray-300">SENTIMENT</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {!isInterviewing ? (
                      <motion.button
                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={startInterview}
                      >
                        <Play className="w-5 h-5" />
                        Start Behavioral Mock
                      </motion.button>
                    ) : (
                      <div className="space-y-6">
                        <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                          <div className="flex justify-between items-center mb-4">
                            <h4 className="font-bold text-white flex items-center gap-2">
                              <Clock className="text-cyan-400" />
                              Current Question
                            </h4>
                            <div className="bg-white/10 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                              <span className="text-cyan-400">{formatTime(timer)}</span>
                              {isTimerRunning ? (
                                <Pause className="w-4 h-4 cursor-pointer" onClick={toggleTimer} />
                              ) : (
                                <Play className="w-4 h-4 cursor-pointer" onClick={toggleTimer} />
                              )}
                            </div>
                          </div>
                          <p className="text-gray-300 text-lg mb-4">
                            "Tell me about a time you faced a conflict at work and how you resolved it."
                          </p>
                          <div className="bg-black/30 rounded-lg p-4 border border-white/10">
                            <textarea
                              className="w-full bg-transparent text-gray-300 placeholder-gray-400 focus:outline-none resize-none"
                              placeholder="Type your answer here or click the mic to speak..."
                              rows={5}
                              value={userResponse}
                              onChange={(e) => setUserResponse(e.target.value)}
                            />
                            <div className="flex justify-between items-center mt-2">
                              <button className="text-gray-400 hover:text-white transition-colors">
                                <RotateCcw className="w-5 h-5" />
                              </button>
                              <div className="flex gap-2">
                                <button 
                                  className={`p-2 rounded-full transition-colors ${isRecording ? 'bg-red-500/20 text-red-400' : 'bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20'}`}
                                  onClick={toggleRecording}
                                >
                                  <Mic className="w-5 h-5" />
                                </button>
                                <button className="p-2 bg-purple-500/10 rounded-full text-purple-400 hover:bg-purple-500/20 transition-colors">
                                  <TypeIcon className="w-5 h-5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <button 
                            className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 rounded-lg font-medium transition-colors"
                            onClick={handleNextQuestion}
                          >
                            Skip Question
                          </button>
                          <button 
                            className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-lg font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                            onClick={submitResponse}
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Processing...
                              </>
                            ) : 'Submit Answer'}
                          </button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-8">
                      <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                        <Code className="text-purple-400" />
                        Technical Interview Simulation
                      </h3>
                      <p className="text-gray-300">
                        Tackle technical challenges—algorithms, system design, and more with real-time feedback
                        and performance analysis.
                      </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                        <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                          <Cpu className="text-purple-400" />
                          Algorithm Practice
                        </h4>
                        <p className="text-gray-300 mb-4">
                          Solve curated coding problems in your preferred language, with test-case feedback.
                        </p>
                        <div className="text-sm text-purple-400 flex items-center gap-1">
                          <CheckCircle className="w-4 h-4 mt-0.5" />
                          Auto-run code against hidden test cases
                        </div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                        <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                          <Layout className="text-purple-400" />
                          System Design Whiteboard
                        </h4>
                        <p className="text-gray-300 mb-4">
                          Sketch architectures on a digital whiteboard; I'll provide critiques.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded">Database</span>
                          <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded">Cache</span>
                          <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded">Load Balancer</span>
                          <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded">API Gateway</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-6 border border-white/10 mb-8">
                      <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                        <Clock className="text-purple-400" />
                        Timed Mock Sessions
                      </h4>
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                          <p className="text-gray-300 mb-4">
                            Simulate a 45-minute technical round with real-time timer and hints.
                          </p>
                          <div className="flex items-center gap-2 text-sm">
                            <label className="text-gray-300">Enable hints:</label>
                            <div className="relative inline-block w-10 mr-2 align-middle select-none">
                              <input type="checkbox" id="toggle" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" />
                              <label htmlFor="toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                            </div>
                          </div>
                        </div>
                        <div className="bg-black/30 rounded-lg p-4 border border-purple-500/20 flex items-center justify-center">
                          <div className="text-3xl font-mono text-purple-400">45:00</div>
                        </div>
                      </div>
                    </div>
                    <motion.button
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-500/25 transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Play className="w-5 h-5" />
                      Begin Technical Mock
                    </motion.button>
                  </motion.div>
                )}
              </div>
            </Tabs>
          </motion.div>
        </div>

        {/* Feedback Dashboard Preview */}
        {showFeedback && (
          <section className="relative py-16">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    Feedback Dashboard
                  </span>
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Receive detailed notes on strengths, improvement areas, and example answer snippets.
                </p>
              </motion.div>
              <motion.div
                className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="p-6 md:p-8">
                  <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <BarChart2 className="text-cyan-400" />
                        Performance Metrics
                      </h3>
                      <div className="bg-black/30 rounded-lg p-6 border border-white/10 relative">
                        <div className="h-64 flex items-end gap-4 mb-6">
                          {/* Filler words chart */}
                          <div className="flex-1">
                            <div className="h-32 bg-cyan-500/20 rounded-t flex items-end">
                              <div className="h-3/4 w-full bg-gradient-to-t from-cyan-500 to-cyan-400 rounded-t"></div>
                            </div>
                            <div className="text-center mt-2 text-sm text-gray-300">Your Filler Words</div>
                            <div className="text-center text-lg font-bold text-cyan-400">{mockFeedback.fillerWords}</div>
                          </div>
                          {/* Speaking rate chart */}
                          <div className="flex-1">
                            <div className="h-40 bg-purple-500/20 rounded-t flex items-end">
                              <div className="h-4/5 w-full bg-gradient-to-t from-purple-500 to-purple-400 rounded-t"></div>
                            </div>
                            <div className="text-center mt-2 text-sm text-gray-300">Speaking Rate</div>
                            <div className="text-center text-lg font-bold text-purple-400">{mockFeedback.speakingRate} wpm</div>
                          </div>
                          {/* Sentiment chart */}
                          <div className="flex-1">
                            <div className="h-24 bg-pink-500/20 rounded-t flex items-end">
                              <div className="h-full w-full bg-gradient-to-t from-pink-500 to-pink-400 rounded-t"></div>
                            </div>
                            <div className="text-center mt-2 text-sm text-gray-300">Sentiment</div>
                            <div className="text-center text-lg font-bold text-pink-400">{mockFeedback.sentimentScore}</div>
                          </div>
                          {/* Optimal range indicators */}
                          <div className="absolute left-0 right-0 h-px bg-white/10" style={{ bottom: '40%' }}></div>
                          <div className="absolute left-0 right-0 h-px bg-white/10" style={{ bottom: '20%' }}></div>
                        </div>
                        <div className="text-sm text-gray-400 text-center">
                          Bar chart comparing your metrics to optimal ranges (shaded areas)
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <StarIcon className="text-yellow-400" />
                        Key Takeaways
                      </h3>
                      <div className="space-y-6">
                        <div className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-lg p-5 border border-cyan-500/20">
                          <h4 className="font-bold text-white mb-3">Strengths</h4>
                          <ul className="space-y-2">
                            {mockFeedback.strengths.map((strength, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 mt-0.5 text-cyan-400 flex-shrink-0" />
                                <span className="text-gray-300 text-sm">{strength}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-gradient-to-br from-purple-500/10 to-pink-600/10 rounded-lg p-5 border border-purple-500/20">
                          <h4 className="font-bold text-white mb-3">Areas for Improvement</h4>
                          <ul className="space-y-2">
                            {mockFeedback.improvements.map((improvement, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <HelpCircle className="w-4 h-4 mt-0.5 text-purple-400 flex-shrink-0" />
                                <span className="text-gray-300 text-sm">{improvement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 bg-gradient-to-br from-slate-800/50 to-slate-900/80 rounded-lg p-6 border border-white/10">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <TypeIcon className="text-green-400" />
                      Example Answer Improvements
                    </h3>
                    <div className="space-y-4">
                      {mockFeedback.examples.map((example, index) => {
                        const [before, after] = example.split('\nTry: ');
                        return (
                          <div key={index} className="grid md:grid-cols-2 gap-4">
                            <div className="bg-black/30 rounded p-4 border border-red-500/20">
                              <div className="text-xs font-semibold text-red-400 mb-2">Before</div>
                              <p className="text-gray-300 text-sm">{before.replace('Instead of: ', '')}</p>
                            </div>
                            <div className="bg-black/30 rounded p-4 border border-green-500/20">
                              <div className="text-xs font-semibold text-green-400 mb-2">After</div>
                              <p className="text-gray-300 text-sm">{after}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="mt-8 flex justify-between items-center">
                    <button 
                      className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                      onClick={() => {
                        setShowFeedback(false);
                        startInterview();
                      }}
                    >
                      <RotateCcw className="w-5 h-5" />
                      Retry Interview
                    </button>
                    <button className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all">
                      <Download className="w-5 h-5" />
                      Download PDF Report
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="relative py-24">
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-1/4 left-1/4 w-64 h-64 border border-cyan-500/20 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-48 h-48 border border-purple-500/20 rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Ace Your Next Interview?
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Practice with our AI interviewer and get detailed feedback to improve your skills.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <motion.button
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 text-lg font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Free Trial
                </motion.button>
                <motion.button
                  className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 text-lg font-semibold rounded-lg border border-white/20 hover:bg-white/20 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View All Features
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </ProductLayout>
  );
};

export default MockInterviewPage;