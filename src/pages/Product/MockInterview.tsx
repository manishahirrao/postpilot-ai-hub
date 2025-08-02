import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  Mic,
  Code,
  Cpu,
  Layout,
  Clock,
  BarChart2,
  Volume2,
  Type,
  MessageSquare,
  ChevronRight,
  Play,
  Pause,
  Download,
  RotateCcw,
  HelpCircle,
  CheckCircle,
  Star
} from 'lucide-react';
import { useThemeStyles } from '@/lib/theme-utils';
import ProductLayout from '@/components/Layout/ProductLayout';

type TabType = 'behavioral' | 'technical';

const MockInterviewPage = () => {
  const themeStyles = useThemeStyles();
  const [mounted, setMounted] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<TabType>('behavioral');
  const [isInterviewing, setIsInterviewing] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [timerIntervalId, setTimerIntervalId] = useState<NodeJS.Timeout | null>(null); // Added state for interval ID

  useEffect(() => {
    setMounted(true);
  }, []);

  // Mock data for behavioral questions
  const behavioralQuestions = [
    "Tell me about a time you faced a conflict at work and how you resolved it.",
    "Describe a situation where you demonstrated leadership skills.",
    "Give an example of how you've worked on a team.",
    "Tell me about a time you failed and what you learned from it.",
    "Describe a time when you had to persuade someone to see things your way."
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
      `Instead of: 'We kind of improved things'
Try: 'We increased conversion by 22% in Q3'`,
      `Instead of: 'I was like the leader'
Try: 'I spearheaded a team of 5 engineers to deliver...'`
    ]
  };

  // Start interview simulation
  const startInterview = useCallback(() => {
    setIsInterviewing(true);
    setIsTimerRunning(true);
    const interval = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);
    setTimerIntervalId(interval); // Store the interval ID
  }, []);

  // Effect to clear interval on unmount or when interview stops
  useEffect(() => {
    return () => {
      if (timerIntervalId) {
        clearInterval(timerIntervalId);
      }
    };
  }, [timerIntervalId]);

  // Toggle timer running state
  const toggleTimer = useCallback(() => {
    setIsTimerRunning(prev => !prev);
  }, []);

  // Effect to manage timer interval based on isTimerRunning
  useEffect(() => {
    if (isTimerRunning && isInterviewing) {
      const interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
      setTimerIntervalId(interval);
      return () => clearInterval(interval);
    } else if (timerIntervalId) {
      clearInterval(timerIntervalId);
      setTimerIntervalId(null);
    }
  }, [isTimerRunning, isInterviewing]);

  // Format time for display
  const formatTime = useCallback((seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ProductLayout
      title="AI-Powered Mock Interviews"
      description="Practice your interview skills with our AI-powered mock interview platform"
      className={`${themeStyles.bgGradient} text-gray-900 dark:text-gray-100 min-h-screen`}
    >
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/2 left-1/4 w-64 h-64 border-2 border-cyan-500/10 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-48 h-48 border border-purple-500/20 rounded-full"
            animate={{
              rotate: -360,
              x: [0, 30, 0, -30, 0],
              y: [0, -15, 0, 15, 0],
            }}
            transition={{
              rotate: { duration: 25, repeat: Infinity, ease: "linear" },
              x: { duration: 12, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 8, repeat: Infinity, ease: "easeInOut" },
            }}
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-full px-4 py-2 border border-cyan-500/20 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Mic className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-medium text-white/90">AI-Powered Mock Interviews</span>
            </motion.div>
            <motion.h1
              className="text-5xl lg:text-7xl font-bold leading-tight text-white mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="block">Ace Your Next</span>
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Interview with AI
              </span>
            </motion.h1>
            <motion.p
              className="text-xl text-gray-700 dark:text-white/80 max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Practice with our AI interviewer, get instant feedback, and improve your interview skills.
            </motion.p>
          </div>
        </div>
      </section>
      {/* Interview Type Selector */}
      <section className="relative py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex border-b border-white/10">
              <button
                className={`flex-1 py-4 px-6 text-lg font-medium text-center transition-all ${activeTab === 'behavioral' ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-white/70 hover:text-white'}`}
                onClick={() => setActiveTab('behavioral')}
              >
                <div className="flex items-center justify-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Behavioral Interview
                </div>
              </button>
              <button
                className={`flex-1 py-4 px-6 text-lg font-medium text-center transition-all ${activeTab === 'technical' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-white/70 hover:text-white'}`}
                onClick={() => setActiveTab('technical')}
              >
                <div className="flex items-center justify-center gap-2">
                  <Code className="w-5 h-5" />
                  Technical Interview
                </div>
              </button>
            </div>
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
                    <p className="text-gray-700 dark:text-white/80">
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
                      <p className="text-gray-700 dark:text-white/70 mb-4">
                        Choose from 20+ scenarios: Leadership, Conflict Management, Teamwork, Cultural Fit.
                      </p>
                      <div className="space-y-2">
                        {behavioralQuestions.map((question, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <ChevronRight className="w-4 h-4 mt-1 text-cyan-400 flex-shrink-0" />
                            <p className="text-gray-700 dark:text-white/80 text-sm">{question}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                      <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                        <BarChart2 className="text-cyan-400" />
                        Live Response Analysis
                      </h4>
                      <p className="text-gray-700 dark:text-white/70 mb-4">
                        I'll transcribe and analyze your verbal or typed answers.
                      </p>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-cyan-400 mb-1">12</div>
                          <div className="text-xs text-gray-700 dark:text-white/70">FILLER WORDS</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-cyan-400 mb-1">140</div>
                          <div className="text-xs text-gray-700 dark:text-white/70">WORDS/MIN</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-cyan-400 mb-1">0.85</div>
                          <div className="text-xs text-gray-700 dark:text-white/70">SENTIMENT</div>
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
                        <p className="text-gray-700 dark:text-white/90 text-lg mb-4">
                          "Tell me about a time you faced a conflict at work and how you resolved it."
                        </p>
                        <div className="bg-black/30 rounded-lg p-4 border border-white/10">
                          <textarea
                            className="w-full bg-transparent text-gray-700 dark:text-white/80 placeholder-gray-700 dark:placeholder-white/30 focus:outline-none resize-none"
                            placeholder="Type your answer here or click the mic to speak..."
                            rows={5}
                          />
                          <div className="flex justify-between items-center mt-2">
                            <button className="text-gray-700 dark:text-white/50 hover:text-gray-700 dark:hover:text-white transition-colors">
                              <RotateCcw className="w-5 h-5" />
                            </button>
                            <div className="flex gap-2">
                              <button className="p-2 bg-cyan-500/10 rounded-full text-cyan-400 hover:bg-cyan-500/20 transition-colors">
                                <Mic className="w-5 h-5" />
                              </button>
                              <button className="p-2 bg-purple-500/10 rounded-full text-purple-400 hover:bg-purple-500/20 transition-colors">
                                <Type className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <button className="flex-1 bg-white/10 hover:bg-white/20 text-gray-700 dark:text-white py-3 rounded-lg font-medium transition-colors">
                          Skip Question
                        </button>
                        <button className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-lg font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all">
                          Submit Answer
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
                    <p className="text-gray-700 dark:text-white/80">
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
                      <p className="text-gray-700 dark:text-white/70 mb-4">
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
                      <p className="text-gray-700 dark:text-white/70 mb-4">
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
                        <p className="text-gray-700 dark:text-white/70 mb-4">
                          Simulate a 45-minute technical round with real-time timer and hints.
                        </p>
                        <div className="flex items-center gap-2 text-sm">
                          <label className="text-gray-700 dark:text-white/70">Enable hints:</label>
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
          </motion.div>
        </div>
      </section>
      {/* Feedback Dashboard Preview */}
      {activeTab === 'behavioral' && (
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
              <p className="text-xl text-gray-700 dark:text-white/80 max-w-3xl mx-auto">
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
                          <div className="text-center mt-2 text-sm text-gray-700 dark:text-white/70">Your Filler Words</div>
                          <div className="text-center text-lg font-bold text-cyan-400">{mockFeedback.fillerWords}</div>
                        </div>
                        {/* Speaking rate chart */}
                        <div className="flex-1">
                          <div className="h-40 bg-purple-500/20 rounded-t flex items-end">
                            <div className="h-4/5 w-full bg-gradient-to-t from-purple-500 to-purple-400 rounded-t"></div>
                          </div>
                          <div className="text-center mt-2 text-sm text-gray-700 dark:text-white/70">Speaking Rate</div>
                          <div className="text-center text-lg font-bold text-purple-400">{mockFeedback.speakingRate} wpm</div>
                        </div>
                        {/* Sentiment chart */}
                        <div className="flex-1">
                          <div className="h-24 bg-pink-500/20 rounded-t flex items-end">
                            <div className="h-full w-full bg-gradient-to-t from-pink-500 to-pink-400 rounded-t"></div>
                          </div>
                          <div className="text-center mt-2 text-sm text-gray-700 dark:text-white/70">Sentiment</div>
                          <div className="text-center text-lg font-bold text-pink-400">{mockFeedback.sentimentScore}</div>
                        </div>
                        {/* Optimal range indicators */}
                        <div className="absolute left-0 right-0 h-px bg-white/10" style={{ bottom: '40%' }}></div>
                        <div className="absolute left-0 right-0 h-px bg-white/10" style={{ bottom: '20%' }}></div>
                      </div>
                      <div className="text-sm text-gray-700 dark:text-white/60 text-center">
                        Bar chart comparing your metrics to optimal ranges (shaded areas)
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                      <Star className="text-yellow-400" />
                      Key Takeaways
                    </h3>
                    <div className="space-y-6">
                      <div className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-lg p-5 border border-cyan-500/20">
                        <h4 className="font-bold text-white mb-3">Strengths</h4>
                        <ul className="space-y-2">
                          {mockFeedback.strengths.map((strength, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 mt-0.5 text-cyan-400 flex-shrink-0" />
                              <span className="text-gray-700 dark:text-white/80 text-sm">{strength}</span>
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
                              <span className="text-gray-700 dark:text-white/80 text-sm">{improvement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-8 bg-gradient-to-br from-slate-800/50 to-slate-900/80 rounded-lg p-6 border border-white/10">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Type className="text-green-400" />
                    Example Answer Improvements
                  </h3>
                  <div className="space-y-4">
                    {mockFeedback.examples.map((example, index) => {
                      const [before, after] = example.split('\nTry: ');
                      return (
                        <div key={index} className="grid md:grid-cols-2 gap-4">
                          <div className="bg-black/30 rounded p-4 border border-red-500/20">
                            <div className="text-xs font-semibold text-red-400 mb-2">Before</div>
                            <p className="text-gray-700 dark:text-white/70 text-sm">{before.replace('Instead of: ', '')}</p>
                          </div>
                          <div className="bg-black/30 rounded p-4 border border-green-500/20">
                            <div className="text-xs font-semibold text-green-400 mb-2">After</div>
                            <p className="text-gray-700 dark:text-white/70 text-sm">{after}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="mt-8 flex justify-between items-center">
                  <button className="flex items-center gap-2 text-gray-700 dark:text-white/50 hover:text-gray-700 dark:hover:text-white transition-colors">
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
      {/* Technical Interview Features */}
      {activeTab === 'technical' && (
        <section className="relative py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Technical Performance Review
                </span>
              </h2>
              <p className="text-xl text-gray-700 dark:text-white/80 max-w-3xl mx-auto">
                Detailed report on code efficiency, design considerations, and best-practices missed.
              </p>
            </motion.div>
            <motion.div
              className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="p-6 md:p-8">
                <div className="grid lg:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                      <Code className="text-purple-400" />
                      Coding Assessment
                    </h3>
                    <div className="bg-black/30 rounded-lg p-4 border border-white/10 mb-6">
                      <pre className="font-mono text-sm text-gray-700 dark:text-white/80">
                        <code>
                          <div className="text-purple-400">// Problem: Reverse a linked list</div>
                          <div className="text-cyan-400">function</div> reverseList(head) {'{'}
                          <div className="ml-4">let prev = <span className="text-blue-400">null</span>;</div>
                          <div className="ml-4">let current = head;</div>
                          <br />
                          <div className="ml-4 text-cyan-400">while</div> (current) {'{'}
                          <div className="ml-8">const next = current.next;</div>
                          <div className="ml-8">current.next = prev;</div>
                          <div className="ml-8">prev = current;</div>
                          <div className="ml-8">current = next;</div>
                          <div className="ml-4">{'}'}</div>
                          <br />
                          <div className="ml-4 text-cyan-400">return</div> prev;
                          <div>{'}'}</div>
                        </code>
                      </pre>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="bg-white/5 rounded p-3 border border-white/10">
                        <div className="text-lg font-bold text-green-400 mb-1">O(n)</div>
                        <div className="text-xs text-gray-700 dark:text-white/70">TIME COMPLEXITY</div>
                      </div>
                      <div className="bg-white/5 rounded p-3 border border-white/10">
                        <div className="text-lg font-bold text-green-400 mb-1">O(1)</div>
                        <div className="text-xs text-gray-700 dark:text-white/70">SPACE COMPLEXITY</div>
                      </div>
                      <div className="bg-white/5 rounded p-3 border border-white/10">
                        <div className="text-lg font-bold text-green-400 mb-1">5/5</div>
                        <div className="text-xs text-gray-700 dark:text-white/70">TEST CASES</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                      <Layout className="text-pink-400" />
                      System Design Feedback
                    </h3>
                    <div className="bg-black/30 rounded-lg p-4 border border-white/10 h-full">
                      <div className="space-y-4">
                        <div>
                          <div className="font-bold text-white mb-1">Strengths:</div>
                          <ul className="text-sm text-gray-700 dark:text-white/80 space-y-1">
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 mt-0.5 text-green-400 flex-shrink-0" />
                              Clear separation of read/write workloads
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 mt-0.5 text-green-400 flex-shrink-0" />
                              Good caching strategy for hot data
                            </li>
                          </ul>
                        </div>
                        <div>
                          <div className="font-bold text-white mb-1">Improvements:</div>
                          <ul className="text-sm text-gray-700 dark:text-white/80 space-y-1">
                            <li className="flex items-start gap-2">
                              <HelpCircle className="w-4 h-4 mt-0.5 text-yellow-400 flex-shrink-0" />
                              Consider adding a CDN for static assets
                            </li>
                            <li className="flex items-start gap-2">
                              <HelpCircle className="w-4 h-4 mt-0.5 text-yellow-400 flex-shrink-0" />
                              Database sharding strategy needed at scale
                            </li>
                          </ul>
                        </div>
                        <div>
                          <div className="font-bold text-white mb-1">Best Practices:</div>
                          <ul className="text-sm text-gray-700 dark:text-white/80 space-y-1">
                            <li className="flex items-start gap-2">
                              <Star className="w-4 h-4 mt-0.5 text-blue-400 flex-shrink-0" />
                              Implement circuit breakers for microservices
                            </li>
                            <li className="flex items-start gap-2">
                              <Star className="w-4 h-4 mt-0.5 text-blue-400 flex-shrink-0" />
                              Add monitoring for all critical components
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-lg p-6 border border-purple-500/20">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Download className="text-pink-400" />
                    Download Summary
                  </h3>
                  <p className="text-gray-700 dark:text-white/80 mb-6">
                    Get a PDF summary with your technical interview performance and personalized improvement plan.
                  </p>
                  <button className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all">
                    <Download className="w-5 h-5" />
                    Download Full Report
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
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
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
    </ProductLayout>
  );
};

export default MockInterviewPage;
