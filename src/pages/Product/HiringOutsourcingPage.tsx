
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Users, Clock, Star, ArrowRight } from 'lucide-react';

const HiringOutsourcingPage: React.FC = () => {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    company: '',
    companySize: '',
    package: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const packages = [
    {
      id: 'basic',
      name: 'Basic Package',
      price: 'Starting at $2,999',
      description: 'Perfect for small teams with straightforward hiring needs',
      features: [
        'Screen up to 10 candidates',
        'Initial phone interviews',
        'Background verification',
        'Shortlist top 3 candidates',
        'Basic skills assessment',
        '2-week turnaround'
      ],
      popular: false
    },
    {
      id: 'pro',
      name: 'Pro Package',
      price: 'Starting at $4,999',
      description: 'Comprehensive hiring solution for growing companies',
      features: [
        'Everything in Basic',
        'Technical skills testing',
        'Video interviews',
        'Detailed candidate reports',
        'Reference checks',
        'Cultural fit assessment',
        '1-week turnaround',
        'Dedicated recruiter'
      ],
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise Package',
      price: 'Custom Pricing',
      description: 'Full-service recruitment for large organizations',
      features: [
        'Everything in Pro',
        'Custom recruitment strategy',
        'Employer branding support',
        'Multi-stage interview process',
        'Executive search capabilities',
        'Onboarding assistance',
        'SLA guarantees',
        'Account management'
      ],
      popular: false
    }
  ];

  const trustedCompanies = [
    { name: 'TechCorp', logo: '/api/placeholder/120/60' },
    { name: 'InnovateLab', logo: '/api/placeholder/120/60' },
    { name: 'StartupXYZ', logo: '/api/placeholder/120/60' },
    { name: 'DigitalFlow', logo: '/api/placeholder/120/60' },
    { name: 'CloudTech', logo: '/api/placeholder/120/60' },
    { name: 'DataDriven', logo: '/api/placeholder/120/60' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setContactForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Contact form submitted:', contactForm);
      setContactForm({
        name: '',
        email: '',
        company: '',
        companySize: '',
        package: '',
        message: ''
      });
      setIsSubmitting(false);
      alert('Thank you! We\'ll get back to you within 24 hours.');
    }, 1000);
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Hiring Outsourcing Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Let our expert recruiters handle your hiring process from start to finish. 
            Focus on your business while we find the perfect candidates for you.
          </p>
        </div>

        {/* Benefits Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Save Time</h3>
            <p className="text-gray-600">Reduce hiring time by 60% with our streamlined process</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Expert Recruiters</h3>
            <p className="text-gray-600">Work with experienced recruiters who know your industry</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Quality Candidates</h3>
            <p className="text-gray-600">Access to pre-vetted, high-quality talent pool</p>
          </div>
        </div>

        {/* Packages */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Choose Your Package</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <Card key={pkg.id} className={`relative ${pkg.popular ? 'ring-2 ring-indigo-500' : ''}`}>
                {pkg.popular && (
                  <Badge className="absolute top-4 right-4 bg-indigo-500">
                    Most Popular
                  </Badge>
                )}
                <CardHeader>
                  <CardTitle className="text-xl">{pkg.name}</CardTitle>
                  <div className="text-2xl font-bold text-indigo-600">{pkg.price}</div>
                  <p className="text-gray-600">{pkg.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                    onClick={() => handleInputChange('package', pkg.name)}
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <Card className="max-w-2xl mx-auto mb-16">
          <CardHeader>
            <CardTitle>Contact Our Recruitment Team</CardTitle>
            <p className="text-gray-600">Tell us about your hiring needs and we'll create a custom solution for you.</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={contactForm.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="company">Company Name</Label>
                  <Input
                    id="company"
                    value={contactForm.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="companySize">Company Size</Label>
                  <Select value={contactForm.companySize} onValueChange={(value) => handleInputChange('companySize', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select company size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 employees</SelectItem>
                      <SelectItem value="11-50">11-50 employees</SelectItem>
                      <SelectItem value="51-200">51-200 employees</SelectItem>
                      <SelectItem value="201-1000">201-1000 employees</SelectItem>
                      <SelectItem value="1000+">1000+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="package">Interested Package</Label>
                <Select value={contactForm.package} onValueChange={(value) => handleInputChange('package', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a package" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Basic Package">Basic Package</SelectItem>
                    <SelectItem value="Pro Package">Pro Package</SelectItem>
                    <SelectItem value="Enterprise Package">Enterprise Package</SelectItem>
                    <SelectItem value="Custom Solution">Custom Solution</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="message">Tell us about your hiring needs</Label>
                <Textarea
                  id="message"
                  value={contactForm.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder="Describe the roles you're hiring for, timeline, specific requirements, etc."
                  rows={4}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Submit Request'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Trusted By Section */}
        <div className="text-center">
          <h3 className="text-2xl font-semibold mb-8">Trusted by Leading Companies</h3>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center opacity-60">
            {trustedCompanies.map((company, index) => (
              <div key={index} className="flex items-center justify-center">
                <div className="w-24 h-12 bg-gray-200 rounded flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-600">{company.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HiringOutsourcingPage;
