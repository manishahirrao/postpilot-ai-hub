import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  MapPin, 
  DollarSign, 
  Clock, 
  Building, 
  Users, 
  Briefcase,
  Download,
  CheckCircle,
  AlertCircle,
  Star,
  ExternalLink,
  FileText,
  Target
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

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
  description?: JobDescription;
}

interface JobDescription {
  overview: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  companyInfo: {
    size: string;
    industry: string;
    founded: string;
    description: string;
  };
  reportingStructure: string;
  tools: string[];
  missingKeywords: string[];
  atsOptimization: {
    score: number;
    suggestions: string[];
  };
  resumeHelp: {
    improvements: string[];
    templates: string[];
  };
}

interface JobDetailModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
}

const sampleJobDescription: JobDescription = {
  overview: "We're looking for a Senior Frontend Developer to join our growing engineering team. You'll be responsible for building and maintaining user-facing applications using modern React and TypeScript technologies.",
  responsibilities: [
    "Develop and maintain high-quality frontend applications using React and TypeScript",
    "Collaborate with design and backend teams to implement user-friendly interfaces",
    "Optimize applications for maximum speed and scalability",
    "Participate in code reviews and maintain coding standards",
    "Mentor junior developers and contribute to team knowledge sharing"
  ],
  requirements: [
    "5+ years of experience in frontend development",
    "Expert knowledge of React, TypeScript, and modern JavaScript",
    "Experience with state management libraries (Redux, Zustand)",
    "Proficiency in CSS frameworks and responsive design",
    "Strong understanding of web performance optimization"
  ],
  benefits: [
    "Competitive salary and equity package",
    "Comprehensive health, dental, and vision insurance",
    "Flexible work arrangements and remote-first culture",
    "Professional development budget and learning opportunities",
    "Modern equipment and home office setup allowance"
  ],
  companyInfo: {
    size: "50-200 employees",
    industry: "Technology / SaaS",
    founded: "2019",
    description: "TechCorp is a fast-growing SaaS company that helps businesses streamline their operations through innovative software solutions."
  },
  reportingStructure: "You'll report directly to the Engineering Manager and work closely with the Product and Design teams.",
  tools: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Git", "Figma", "Jira"],
  missingKeywords: ["Python", "Node.js", "GraphQL"],
  atsOptimization: {
    score: 78,
    suggestions: [
      "Add 'Python' experience to your skills section",
      "Include 'Node.js' in your technical skills",
      "Mention 'GraphQL' if you have any experience with it",
      "Use exact job title 'Senior Frontend Developer' in your resume summary"
    ]
  },
  resumeHelp: {
    improvements: [
      "Highlight React and TypeScript projects prominently",
      "Quantify your frontend development impact with metrics",
      "Add specific examples of performance optimizations",
      "Include team leadership and mentoring experience"
    ],
    templates: [
      "Software Engineer Resume Template",
      "Frontend Developer Resume Template",
      "Senior Developer Resume Template"
    ]
  }
};

export function JobDetailModal({ job, isOpen, onClose }: JobDetailModalProps) {
  const [activeTab, setActiveTab] = useState("description");

  if (!job) return null;

  const jobWithDescription = {
    ...job,
    description: sampleJobDescription
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <DialogHeader className="p-6 border-b border-purple-200/50 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20">
            <div className="flex justify-between items-start">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                  {job.logo}
                </div>
                <div>
                  <DialogTitle className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                    {job.title}
                  </DialogTitle>
                  <p className="text-lg text-gray-600 dark:text-gray-400 mt-1">{job.company}</p>
                  <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
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
                  <div className="flex items-center space-x-2 mt-3">
                    <Badge className={`${getMatchColor(job.matchLevel)} border-0`}>
                      {job.matchScore}% match
                    </Badge>
                    <Badge variant="secondary">{job.type}</Badge>
                    {job.remote && <Badge className="bg-green-100 text-green-700">Remote</Badge>}
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-5 h-5" />
              </Button>
            </div>
          </DialogHeader>

          {/* Content */}
          <div className="flex-1 overflow-hidden">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
              <TabsList className="mx-6 mt-4 bg-white/50 dark:bg-gray-800/50">
                <TabsTrigger value="description" className="flex items-center space-x-2">
                  <FileText className="w-4 h-4" />
                  <span>Job Description</span>
                </TabsTrigger>
                <TabsTrigger value="apply" className="flex items-center space-x-2">
                  <Target className="w-4 h-4" />
                  <span>How to Apply</span>
                </TabsTrigger>
                <TabsTrigger value="resume" className="flex items-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>Resume Help</span>
                </TabsTrigger>
              </TabsList>

              <div className="flex-1 overflow-y-auto px-6 pb-6">
                <TabsContent value="description" className="mt-4 space-y-6">
                  {/* Job Overview */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Briefcase className="w-5 h-5 text-purple-600" />
                        <span>Job Overview</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {jobWithDescription.description.overview}
                      </p>
                    </CardContent>
                  </Card>

                  {/* Responsibilities */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Key Responsibilities</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {jobWithDescription.description.responsibilities.map((responsibility, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start space-x-3"
                          >
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 dark:text-gray-300">{responsibility}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Requirements */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Requirements</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {jobWithDescription.description.requirements.map((requirement, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start space-x-3"
                          >
                            <Star className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 dark:text-gray-300">{requirement}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Company Info */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Building className="w-5 h-5 text-purple-600" />
                        <span>About {job.company}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-700 dark:text-gray-300">
                        {jobWithDescription.description.companyInfo.description}
                      </p>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-purple-600">Company Size:</span>
                          <p className="text-gray-600 dark:text-gray-400">{jobWithDescription.description.companyInfo.size}</p>
                        </div>
                        <div>
                          <span className="font-medium text-purple-600">Industry:</span>
                          <p className="text-gray-600 dark:text-gray-400">{jobWithDescription.description.companyInfo.industry}</p>
                        </div>
                        <div>
                          <span className="font-medium text-purple-600">Founded:</span>
                          <p className="text-gray-600 dark:text-gray-400">{jobWithDescription.description.companyInfo.founded}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Tools & Technologies */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Tools & Technologies</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {jobWithDescription.description.tools.map((tool) => (
                          <Badge key={tool} variant="secondary" className="bg-purple-100 text-purple-700">
                            {tool}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="apply" className="mt-4 space-y-6">
                  {/* ATS Optimization */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Target className="w-5 h-5 text-purple-600" />
                        <span>ATS Optimization Score</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <Progress value={jobWithDescription.description.atsOptimization.score} className="flex-1" />
                        <span className="text-2xl font-bold text-purple-600">
                          {jobWithDescription.description.atsOptimization.score}%
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Your resume is optimized for this job's ATS system
                      </p>
                    </CardContent>
                  </Card>

                  {/* Missing Keywords */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <AlertCircle className="w-5 h-5 text-orange-500" />
                        <span>Missing Keywords</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Add these keywords to improve your match score:
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {jobWithDescription.description.missingKeywords.map((keyword) => (
                          <Badge key={keyword} variant="outline" className="border-orange-300 text-orange-700">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Optimization Suggestions */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Optimization Suggestions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {jobWithDescription.description.atsOptimization.suggestions.map((suggestion, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start space-x-3"
                          >
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 dark:text-gray-300">{suggestion}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Application Button */}
                  <Card>
                    <CardContent className="p-6 text-center">
                      <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg" size="lg">
                        <ExternalLink className="w-5 h-5 mr-2" />
                        Apply on Company Website
                      </Button>
                      <p className="text-sm text-gray-500 mt-2">
                        You'll be redirected to {job.company}'s career page
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="resume" className="mt-4 space-y-6">
                  {/* Resume Improvements */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <FileText className="w-5 h-5 text-purple-600" />
                        <span>Resume Improvements</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {jobWithDescription.description.resumeHelp.improvements.map((improvement, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start space-x-3"
                          >
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 dark:text-gray-300">{improvement}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Resume Templates */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Recommended Templates</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {jobWithDescription.description.resumeHelp.templates.map((template, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border border-purple-200 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                              <FileText className="w-6 h-6 text-purple-600" />
                            </div>
                            <span className="font-medium">{template}</span>
                          </div>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Resume Builder CTA */}
                  <Card>
                    <CardContent className="p-6 text-center bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                      <h3 className="text-lg font-semibold mb-2">Need a complete resume makeover?</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Use our AI-powered resume builder to create a tailored resume for this position.
                      </p>
                      <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg">
                        <FileText className="w-5 h-5 mr-2" />
                        Build Resume for This Job
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function getMatchColor(level: string) {
  switch (level) {
    case "strong": return "text-green-600 bg-green-100";
    case "fair": return "text-yellow-600 bg-yellow-100";
    case "low": return "text-red-600 bg-red-100";
    default: return "text-gray-600 bg-gray-100";
  }
}