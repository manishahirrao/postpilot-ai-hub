
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Search, Target, TrendingUp, CheckCircle, MapPin, Building, DollarSign, IndianRupee } from 'lucide-react';

const JobMatcherPage: React.FC = () => {
  const sampleJobs = [
    {
      title: 'Senior Software Engineer',
      company: 'TechCorp',
      location: 'San Francisco, CA',
      salary: '120k - 180k',
      matchScore: 92,
      skills: ['React', 'Node.js', 'AWS']
    },
    {
      title: 'Full Stack Developer',
      company: 'InnovateLab',
      location: 'New York, NY',
      salary: '100k - 140k',
      matchScore: 87,
      skills: ['JavaScript', 'Python', 'Docker']
    },
    {
      title: 'Frontend Engineer',
      company: 'StartupXYZ',
      location: 'Austin, TX',
      salary: '90k - 130k',
      matchScore: 83,
      skills: ['Vue.js', 'TypeScript', 'CSS']
    }
  ];

  const features = [
    'AI-powered job matching',
    'Real-time job alerts',
    'Skills gap analysis',
    'Resume tailoring for specific jobs',
    'Company culture insights',
    'Salary benchmarking',
    'Interview preparation tips',
    'Application tracking'
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-blue-100 text-blue-800">
                Profile-Job Matcher
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Find Your Perfect Job Match
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Our AI analyzes your profile and matches you with jobs that fit your skills, 
                experience, and career goals. Stop applying to random jobs – find opportunities 
                where you'll truly excel.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/auth/register">
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Find Jobs
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline">
                  See How It Works
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <Card className="bg-white shadow-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="w-6 h-6 text-blue-600" />
                    <span>Job Matches</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {sampleJobs.map((job, index) => (
                    <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900">{job.title}</h3>
                          <p className="text-sm text-gray-600">{job.company}</p>
                        </div>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          {job.matchScore}% match
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                        <span className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {job.location}
                        </span>
                        <span className="flex items-center">
                          <IndianRupee className="w-4 h-4 mr-1" />
                          {job.salary}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {job.skills.map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
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
              How Job Matching Works
            </h2>
            <p className="text-xl text-gray-600">
              Our AI uses advanced embeddings to find the perfect matches
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">1. Profile Analysis</h3>
              <p className="text-gray-600">
                We analyze your resume, skills, and career preferences to understand your professional profile.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">2. AI Matching</h3>
              <p className="text-gray-600">
                Our AI compares your profile with thousands of job postings using semantic similarity algorithms.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">3. Ranked Results</h3>
              <p className="text-gray-600">
                Get a ranked list of opportunities with match scores and personalized application tips.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                More than just job matching
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
                  <h3 className="font-semibold text-gray-900 mb-2">Smart Filtering</h3>
                  <p className="text-gray-600">
                    Our AI considers salary expectations, location preferences, company size, and culture fit.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Skills Gap Analysis</h3>
                  <p className="text-gray-600">
                    Identify skills you need to develop for your dream roles and get personalized learning recommendations.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Resume Tailoring</h3>
                  <p className="text-gray-600">
                    Get AI-powered suggestions to tailor your resume for specific job applications.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Job Board */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              See Your Personalized Job Board
            </h2>
            <p className="text-xl text-gray-600">
              Jobs ranked by AI-calculated compatibility with your profile
            </p>
          </div>
          
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Recommended Jobs for Software Engineer</span>
                <Button variant="outline" size="sm">
                  <Search className="w-4 h-4 mr-2" />
                  Refine Search
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {sampleJobs.map((job, index) => (
                <div key={index} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                        <Badge className="bg-green-100 text-green-800">
                          {job.matchScore}% match
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-gray-600 mb-3">
                        <span className="flex items-center">
                          <Building className="w-4 h-4 mr-1" />
                          {job.company}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {job.location}
                        </span>
                        <span className="flex items-center">
                          <IndianRupee className="w-4 h-4 mr-1" />
                          {job.salary}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="outline">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2 ml-4">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Apply Now
                      </Button>
                      <Button size="sm" variant="outline">
                        Save Job
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Find your next opportunity today
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Stop applying to random jobs. Let AI find opportunities where you'll excel.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth/register">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Start Job Search
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JobMatcherPage;
