
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, MapPin, Building2, Clock } from 'lucide-react';

interface Job {
  id: string;
  title: string;
  location: string;
  description: string;
  employmentType: string;
  status: 'Active' | 'Closed';
  postedAt: string;
}

const FreeJobPostingsPage: React.FC = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    description: '',
    employmentType: 'Full-time'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock data for demonstration
  useEffect(() => {
    setJobs([
      {
        id: '1',
        title: 'Senior Frontend Developer',
        location: 'San Francisco, CA',
        description: 'We are looking for an experienced frontend developer...',
        employmentType: 'Full-time',
        status: 'Active',
        postedAt: '2024-01-15'
      },
      {
        id: '2',
        title: 'Product Manager',
        location: 'Remote',
        description: 'Join our product team to help shape the future...',
        employmentType: 'Full-time',
        status: 'Active',
        postedAt: '2024-01-10'
      }
    ]);
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newJob: Job = {
        id: Date.now().toString(),
        ...formData,
        status: 'Active',
        postedAt: new Date().toISOString().split('T')[0]
      };
      setJobs(prev => [newJob, ...prev]);
      setFormData({
        title: '',
        location: '',
        description: '',
        employmentType: 'Full-time'
      });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleCloseJob = (jobId: string) => {
    setJobs(prev => prev.map(job => 
      job.id === jobId ? { ...job, status: 'Closed' as const } : job
    ));
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Free Job Postings
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Post unlimited job openings on our free job board to attract top talent. 
            No hidden fees, no limits - just results.
          </p>
        </div>

        {/* Post New Job Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              Post a New Job
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="title">Job Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="e.g. Senior Software Engineer"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="e.g. San Francisco, CA or Remote"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="employmentType">Employment Type</Label>
                <Select value={formData.employmentType} onValueChange={(value) => handleInputChange('employmentType', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                    <SelectItem value="Internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description">Job Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe the role, responsibilities, requirements, and benefits..."
                  rows={6}
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Posting Job...' : 'Post Job'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Job Listings */}
        <Card>
          <CardHeader>
            <CardTitle>My Job Listings</CardTitle>
          </CardHeader>
          <CardContent>
            {jobs.length === 0 ? (
              <div className="text-center py-8">
                <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No job postings yet. Create your first job posting above!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {jobs.map((job) => (
                  <div key={job.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {job.employmentType}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            Posted {new Date(job.postedAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          job.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {job.status}
                        </span>
                        {job.status === 'Active' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCloseJob(job.id)}
                          >
                            Close Job
                          </Button>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm line-clamp-3">{job.description}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FreeJobPostingsPage;
