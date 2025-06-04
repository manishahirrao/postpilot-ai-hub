
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Plus, Edit, Trash2, Briefcase, MapPin, Calendar, Building } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface Job {
  id: string;
  title: string;
  location: string;
  description: string;
  employmentType: string;
  status: 'Active' | 'Closed';
  postedAt: string;
  company: string;
}

const FreeJobPostingsPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    description: '',
    employmentType: 'Full-time'
  });

  // Mock data for demonstration
  useEffect(() => {
    if (isAuthenticated && user?.role === 'company') {
      setJobs([
        {
          id: '1',
          title: 'Senior Software Engineer',
          location: 'San Francisco, CA',
          description: 'We are looking for a senior software engineer to join our growing team...',
          employmentType: 'Full-time',
          status: 'Active',
          postedAt: '2024-01-15',
          company: user.name || 'Your Company'
        },
        {
          id: '2',
          title: 'Product Manager',
          location: 'Remote',
          description: 'Seeking an experienced product manager to lead our product strategy...',
          employmentType: 'Full-time',
          status: 'Active',
          postedAt: '2024-01-10',
          company: user.name || 'Your Company'
        }
      ]);
    }
  }, [isAuthenticated, user]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingJob) {
      // Update existing job
      setJobs(jobs.map(job => 
        job.id === editingJob.id 
          ? { ...job, ...formData }
          : job
      ));
    } else {
      // Create new job
      const newJob: Job = {
        id: Date.now().toString(),
        ...formData,
        status: 'Active',
        postedAt: new Date().toISOString().split('T')[0],
        company: user?.name || 'Your Company'
      };
      setJobs([newJob, ...jobs]);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      location: '',
      description: '',
      employmentType: 'Full-time'
    });
    setShowForm(false);
    setEditingJob(null);
  };

  const handleEdit = (job: Job) => {
    setFormData({
      title: job.title,
      location: job.location,
      description: job.description,
      employmentType: job.employmentType
    });
    setEditingJob(job);
    setShowForm(true);
  };

  const handleDelete = (jobId: string) => {
    setJobs(jobs.filter(job => job.id !== jobId));
  };

  const handleCloseJob = (jobId: string) => {
    setJobs(jobs.map(job => 
      job.id === jobId 
        ? { ...job, status: 'Closed' as const }
        : job
    ));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-16">
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Free Job Postings</h1>
          <p className="text-xl text-gray-600 mb-8">
            Post unlimited job openings on our free job board to attract top talent.
          </p>
          <Link to="/auth/login">
            <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
              Sign In to Post Jobs
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (user?.role !== 'company') {
    return (
      <div className="min-h-screen pt-16">
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Free Job Postings</h1>
          <p className="text-xl text-gray-600 mb-8">
            This feature is available for company accounts only.
          </p>
          <Link to="/auth/register">
            <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
              Create Company Account
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Header Section */}
      <section className="py-12 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <Badge className="mb-4 bg-indigo-100 text-indigo-800">
              Free Job Postings
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Post Jobs for Free
            </h1>
            <p className="text-xl text-gray-600">
              Reach thousands of qualified candidates with unlimited free job postings
            </p>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={() => setShowForm(true)}
              size="lg"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
            >
              <Plus className="w-5 h-5 mr-2" />
              Post New Job
            </Button>
          </div>
        </div>
      </section>

      {/* Job Posting Form */}
      {showForm && (
        <section className="py-8 bg-white border-b">
          <div className="max-w-4xl mx-auto px-4">
            <Card>
              <CardHeader>
                <CardTitle>
                  {editingJob ? 'Edit Job Posting' : 'Create New Job Posting'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title">Job Title</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        placeholder="e.g. Senior Software Engineer"
                        required
                        className="mt-1"
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
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="employmentType">Employment Type</Label>
                    <Select value={formData.employmentType} onValueChange={(value) => handleInputChange('employmentType', value)}>
                      <SelectTrigger className="mt-1">
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
                      placeholder="Describe the role, responsibilities, requirements..."
                      rows={6}
                      required
                      className="mt-1"
                    />
                  </div>

                  <div className="flex space-x-4">
                    <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
                      {editingJob ? 'Update Job' : 'Post Job'}
                    </Button>
                    <Button type="button" variant="outline" onClick={resetForm}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Jobs List */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Job Postings</h2>
            <p className="text-gray-600">
              Manage your active and closed job postings
            </p>
          </div>

          {jobs.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No job postings yet</h3>
                <p className="text-gray-600 mb-6">
                  Start attracting top talent by posting your first job opening.
                </p>
                <Button
                  onClick={() => setShowForm(true)}
                  className="bg-indigo-600 hover:bg-indigo-700"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Post Your First Job
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {jobs.map((job) => (
                <Card key={job.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                          <Badge variant={job.status === 'Active' ? 'default' : 'secondary'}>
                            {job.status}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-gray-600 mb-3">
                          <div className="flex items-center space-x-1">
                            <Building className="w-4 h-4" />
                            <span>{job.company}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>Posted {new Date(job.postedAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <p className="text-gray-700 mb-4">
                          {job.description.length > 150 
                            ? `${job.description.substring(0, 150)}...` 
                            : job.description
                          }
                        </p>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{job.employmentType}</Badge>
                        </div>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(job)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        {job.status === 'Active' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCloseJob(job.id)}
                          >
                            Close
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(job.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our Free Job Board?
            </h2>
            <p className="text-xl text-gray-600">
              Reach qualified candidates without breaking the budget
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Unlimited Postings</h3>
              <p className="text-gray-600">
                Post as many jobs as you need with no hidden fees or restrictions.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality Candidates</h3>
              <p className="text-gray-600">
                Access to our network of pre-screened professionals and job seekers.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ArrowRight className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy Management</h3>
              <p className="text-gray-600">
                Simple dashboard to manage all your job postings in one place.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FreeJobPostingsPage;
