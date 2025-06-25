import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Filter, 
  MapPin, 
  Clock, 
  DollarSign, 
  Bookmark, 
  BookmarkCheck,
  ChevronDown,
  ChevronUp,
  Star,
  Building,
  Users,
  Zap,
  Lock,
  RefreshCw
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { JobDetailModal } from "../JobDetailModal";
import { OrbitalSystem } from "@/components/OrbitalSystem";

interface Job {
  id: string;
  title: string;
  company: string;
  logo: string;
  location: string;
  salary: string;
  posted: string;
  matchScore: number;
  matchLevel: "strong" | "fair" | "low";
  type: "Full-time" | "Part-time" | "Contract";
  remote: boolean;
  experienceLevel: "Entry" | "Mid" | "Senior";
  isBookmarked: boolean;
  isPremium?: boolean;
  whyLowScore?: string[];
}

const sampleJobs: Job[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechCorp",
    logo: "TC",
    location: "San Francisco, CA",
    salary: "$120k - $180k",
    posted: "2 hours ago",
    matchScore: 95,
    matchLevel: "strong",
    type: "Full-time",
    remote: true,
    experienceLevel: "Senior",
    isBookmarked: false
  },
  {
    id: "2",
    title: "Full Stack Engineer",
    company: "StartupXYZ",
    logo: "SX",
    location: "Remote",
    salary: "$100k - $140k",
    posted: "5 hours ago",
    matchScore: 88,
    matchLevel: "strong",
    type: "Full-time",
    remote: true,
    experienceLevel: "Mid",
    isBookmarked: true
  },
  {
    id: "3",
    title: "React Developer",
    company: "WebSolutions",
    logo: "WS",
    location: "New York, NY",
    salary: "$80k - $120k",
    posted: "1 day ago",
    matchScore: 72,
    matchLevel: "fair",
    type: "Full-time",
    remote: false,
    experienceLevel: "Mid",
    isBookmarked: false,
    whyLowScore: ["Location preference mismatch", "Salary below expectations", "Missing Python experience"]
  },
  {
    id: "4",
    title: "Lead Software Engineer",
    company: "BigTech Inc",
    logo: "BT",
    location: "Seattle, WA",
    salary: "$180k - $250k",
    posted: "3 days ago",
    matchScore: 45,
    matchLevel: "low",
    type: "Full-time",
    remote: false,
    experienceLevel: "Senior",
    isBookmarked: false,
    whyLowScore: ["Requires 8+ years experience", "Heavy backend focus", "No remote option"]
  },
  {
    id: "5",
    title: "Principal Engineer",
    company: "Premium Corp",
    logo: "PC",
    location: "San Francisco, CA",
    salary: "$200k - $300k",
    posted: "1 day ago",
    matchScore: 92,
    matchLevel: "strong",
    type: "Full-time",
    remote: true,
    experienceLevel: "Senior",
    isBookmarked: false,
    isPremium: true
  }
];

export default function JobBoard() {
  const [jobs, setJobs] = useState<Job[]>(sampleJobs);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(sampleJobs);
  const [activeTab, setActiveTab] = useState("recommended");
  const [filters, setFilters] = useState({
    jobType: "all",
    experienceLevel: "all",
    remoteOnly: false
  });
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [refreshTimer, setRefreshTimer] = useState(300); // 5 minutes
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Refresh timer
  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshTimer((prev) => prev > 0 ? prev - 1 : 300);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = [...jobs];

    if (filters.jobType !== "all") {
      filtered = filtered.filter(job => job.type === filters.jobType);
    }

    if (filters.experienceLevel !== "all") {
      filtered = filtered.filter(job => job.experienceLevel === filters.experienceLevel);
    }

    if (filters.remoteOnly) {
      filtered = filtered.filter(job => job.remote);
    }

    // Sort based on active tab
    if (activeTab === "recommended") {
      filtered.sort((a, b) => b.matchScore - a.matchScore);
    } else if (activeTab === "match-score") {
      filtered.sort((a, b) => b.matchScore - a.matchScore);
    } else if (activeTab === "posted-date") {
      filtered.sort((a, b) => new Date(b.posted).getTime() - new Date(a.posted).getTime());
    }

    setFilteredJobs(filtered);
  }, [jobs, filters, activeTab]);

  const toggleBookmark = (jobId: string) => {
    setJobs(jobs.map(job => 
      job.id === jobId ? { ...job, isBookmarked: !job.isBookmarked } : job
    ));
  };

  const toggleExpanded = (jobId: string) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(jobId)) {
      newExpanded.delete(jobId);
    } else {
      newExpanded.add(jobId);
    }
    setExpandedCards(newExpanded);
  };

  const getMatchColor = (level: string) => {
    switch (level) {
      case "strong": return "text-green-600 bg-green-100";
      case "fair": return "text-yellow-600 bg-yellow-100";
      case "low": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const openJobDetail = (job: Job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const closeJobDetail = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950 dark:to-indigo-950 relative overflow-hidden">
      {/* Background Orbital Systems */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-32 right-20 w-40 h-40"
          animate={{
            rotate: -360,
            x: [0, 20, 0, -20, 0],
            y: [0, -10, 0, 10, 0],
          }}
          transition={{
            rotate: { duration: 25, repeat: Infinity, ease: "linear" },
            x: { duration: 12, repeat: Infinity, ease: "easeInOut" },
            y: { duration: 8, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <OrbitalSystem centerSize={12} className="opacity-20" />
        </motion.div>
        
        <motion.div
          className="absolute bottom-20 left-16 w-56 h-56"
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 30, repeat: Infinity, ease: "linear" },
            scale: { duration: 10, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <OrbitalSystem centerSize={18} className="opacity-15" />
        </motion.div>

        <motion.div
          className="absolute top-1/2 left-1/3 w-24 h-24"
          animate={{
            rotate: 360,
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            rotate: { duration: 15, repeat: Infinity, ease: "linear" },
            opacity: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <OrbitalSystem centerSize={8} className="opacity-25" />
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-purple-200/50 dark:border-purple-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg"></div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                JobMatch Pro
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <Button variant="ghost" className="text-purple-600 hover:text-purple-700" onClick={() => window.location.href = '/'}>
                Home
              </Button>
              <Button variant="ghost" className="text-purple-600 hover:text-purple-700" onClick={() => window.location.href = '/dashboard'}>
                Dashboard
              </Button>
              <Button variant="ghost" className="text-purple-600 hover:text-purple-700" onClick={() => window.location.href = '/pricing'}>
                Plans
              </Button>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-purple-600">
                <RefreshCw className="w-4 h-4" />
                <span>Next update: {formatTime(refreshTimer)}</span>
              </div>
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Panel */}
          <div className="lg:col-span-1">
            <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border-purple-200/50 dark:border-purple-700/50 sticky top-8">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Filter className="w-5 h-5 text-purple-600" />
                  <span className="font-semibold">Filters</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Job Type</label>
                  <Select value={filters.jobType} onValueChange={(value) => setFilters({...filters, jobType: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="Full-time">Full-time</SelectItem>
                      <SelectItem value="Part-time">Part-time</SelectItem>
                      <SelectItem value="Contract">Contract</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Experience Level</label>
                  <Select value={filters.experienceLevel} onValueChange={(value) => setFilters({...filters, experienceLevel: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="Entry">Entry Level</SelectItem>
                      <SelectItem value="Mid">Mid Level</SelectItem>
                      <SelectItem value="Senior">Senior Level</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Remote Only</label>
                  <Switch 
                    checked={filters.remoteOnly}
                    onCheckedChange={(checked) => setFilters({...filters, remoteOnly: checked})}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Job Listings */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-purple-900 dark:text-purple-100 mb-4">
                Job Matches ({filteredJobs.length})
              </h1>
              
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="bg-white/50 dark:bg-gray-800/50">
                  <TabsTrigger value="recommended">Recommended</TabsTrigger>
                  <TabsTrigger value="match-score">Match Score</TabsTrigger>
                  <TabsTrigger value="posted-date">Posted Date</TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab} className="space-y-4 mt-6">
                  {filteredJobs.filter(job => !job.isPremium).map((job) => (
                    <motion.div
                      key={job.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <Card 
                        className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border-purple-200/50 dark:border-purple-700/50 hover:shadow-lg transition-all duration-300 cursor-pointer"
                        onClick={() => openJobDetail(job)}
                      >
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex items-start space-x-4">
                              <div className="relative">
                                <motion.div 
                                  className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center text-white font-bold relative z-10"
                                  whileHover={{ scale: 1.1 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  {job.logo}
                                </motion.div>
                                
                                {/* Match score orbital indicator */}
                                {job.matchScore > 80 && (
                                  <motion.div
                                    className="absolute w-16 h-16 border border-green-300/40 rounded-full"
                                    style={{ left: '-8px', top: '-8px' }}
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                  >
                                    <motion.div
                                      className="absolute w-2 h-2 bg-green-400 rounded-full"
                                      animate={{
                                        x: [24, 0, -24, 0, 24],
                                        y: [0, -24, 0, 24, 0],
                                      }}
                                      transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "linear",
                                      }}
                                      style={{ left: '50%', top: '50%', marginLeft: '-4px', marginTop: '-4px' }}
                                    />
                                  </motion.div>
                                )}
                                
                                {job.matchScore >= 60 && job.matchScore <= 80 && (
                                  <motion.div
                                    className="absolute w-16 h-16 border border-yellow-300/40 rounded-full"
                                    style={{ left: '-8px', top: '-8px' }}
                                    animate={{ rotate: -360 }}
                                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                                  >
                                    <motion.div
                                      className="absolute w-1.5 h-1.5 bg-yellow-400 rounded-full"
                                      animate={{
                                        x: [-20, 0, 20, 0, -20],
                                        y: [0, 20, 0, -20, 0],
                                      }}
                                      transition={{
                                        duration: 6,
                                        repeat: Infinity,
                                        ease: "linear",
                                      }}
                                      style={{ left: '50%', top: '50%', marginLeft: '-3px', marginTop: '-3px' }}
                                    />
                                  </motion.div>
                                )}
                              </div>
                              <div className="flex-1">
                                <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100">
                                  {job.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">{job.company}</p>
                                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                                  <div className="flex items-center space-x-1">
                                    <MapPin className="w-4 h-4" />
                                    <span>{job.location}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <DollarSign className="w-4 h-4" />
                                    <span>{job.salary}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <Clock className="w-4 h-4" />
                                    <span>{job.posted}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <Badge className={`${getMatchColor(job.matchLevel)} border-0`}>
                                {job.matchScore}% {job.matchLevel}
                              </Badge>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleBookmark(job.id);
                                }}
                                className="text-purple-600 hover:text-purple-700"
                              >
                                {job.isBookmarked ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
                              </Button>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Badge variant="secondary">{job.type}</Badge>
                              <Badge variant="secondary">{job.experienceLevel}</Badge>
                              {job.remote && <Badge className="bg-green-100 text-green-700">Remote</Badge>}
                            </div>

                            {job.matchLevel === "low" && job.whyLowScore && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleExpanded(job.id);
                                }}
                                className="text-red-600 hover:text-red-700"
                              >
                                Why low score?
                                {expandedCards.has(job.id) ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />}
                              </Button>
                            )}
                          </div>

                          <AnimatePresence>
                            {expandedCards.has(job.id) && job.whyLowScore && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800"
                              >
                                <h4 className="font-medium text-red-800 dark:text-red-200 mb-2">Reasons for lower match:</h4>
                                <ul className="space-y-1">
                                  {job.whyLowScore.map((reason, index) => (
                                    <li key={index} className="text-sm text-red-600 dark:text-red-300 flex items-center space-x-2">
                                      <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                                      <span>{reason}</span>
                                    </li>
                                  ))}
                                </ul>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}

                  {/* Premium Jobs Section */}
                  {filteredJobs.some(job => job.isPremium) && (
                    <div className="mt-8">
                      <div className="flex items-center space-x-2 mb-4">
                        <Lock className="w-5 h-5 text-yellow-600" />
                        <h2 className="text-xl font-semibold text-purple-900 dark:text-purple-100">
                          Premium Jobs
                        </h2>
                        <Badge className="bg-yellow-100 text-yellow-700">Upgrade Required</Badge>
                      </div>
                      
                      {filteredJobs.filter(job => job.isPremium).map((job) => (
                        <Card key={job.id} className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-md border-yellow-200/50 dark:border-yellow-700/50 relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-yellow-100/50 to-orange-100/50 dark:from-yellow-900/20 dark:to-orange-900/20 backdrop-blur-sm"></div>
                          <CardContent className="p-6 relative">
                            <div className="flex justify-between items-start mb-4 opacity-60">
                              <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center text-white font-bold">
                                  {job.logo}
                                </div>
                                <div className="flex-1">
                                  <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100">
                                    {job.title}
                                  </h3>
                                  <p className="text-gray-600 dark:text-gray-400">{job.company}</p>
                                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                                    <div className="flex items-center space-x-1">
                                      <MapPin className="w-4 h-4" />
                                      <span>{job.location}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                      <DollarSign className="w-4 h-4" />
                                      <span>{job.salary}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <Badge className={`${getMatchColor(job.matchLevel)} border-0`}>
                                {job.matchScore}% {job.matchLevel}
                              </Badge>
                            </div>
                            
                            <div className="flex items-center justify-center">
                              <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:shadow-lg">
                                <Zap className="w-4 h-4 mr-2" />
                                Upgrade to View
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>

      {/* Job Detail Modal */}
      <JobDetailModal 
        job={selectedJob}
        isOpen={isModalOpen}
        onClose={closeJobDetail}
      />
    </div>
  );
}