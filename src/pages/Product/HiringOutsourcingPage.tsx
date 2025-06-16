import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Users, Clock, Star, ArrowRight, Target, Zap, Shield, Trophy, MessageCircle, Phone, Mail, Sparkles, Award, TrendingUp } from 'lucide-react';

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
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const packages = [
    {
      id: 'basic',
      name: 'Intern Talent-Link',
      price: 'Flat ₹2,000',
      period: 'per intern placement',
      description: 'Perfect for small teams with straightforward hiring needs',
      gradient: 'from-blue-500 to-cyan-500',
      features: [
        'Dedicated intern sourcing & screening',
        'Interview scheduling & coordination',
        'Onboarding support materials',
        'Monthly check-ins & progress reports',
        'Compliance with internship regulations',
        '1-month replacement guarantee if intern departs early'
      ],
      popular: false,
      savings: '60% Time Saved'
    },
    {
      id: 'pro',
      name: 'Full-Time ExpertCare',
      price: '10%',
      period: 'of employee\'s annual salary',
      description: 'Comprehensive hiring solution for growing companies',
      gradient: 'from-purple-500 to-pink-500',
      features: [
        'End-to-end recruitment (sourcing, screening, interviewing)',
        'Offer negotiation & onboarding',
        'Payroll setup & processing',
        'Benefits administration & statutory compliance',
        'Dedicated HR account manager',
        'Quarterly performance insights',
        '1-month replacement guarantee if hire exits within 30 days'
      ],
      popular: true,
      savings: 'Most Popular'
    },
    {
      id: 'enterprise',
      name: 'Project-Flex Freelance',
      price: '5%',
      period: 'of contractor\'s project fee',
      description: 'Full-service recruitment for large organizations',
      gradient: 'from-indigo-500 to-purple-500',
      features: [
        'Curated freelancer marketplace access',
        'Skill-based vetting & portfolio review',
        'Contract drafting & milestone tracking',
        'Invoicing support & payment facilitation',
        'Quick scale-up/down flexibility',
        'Project delivery check-ins',
        '1-month replacement guarantee if contractor disengages early'
      ],
      popular: false,
      savings: 'Flexible Scale'
    }
  ];

  const trustedCompanies = [
    { name: 'TechCorp', color: 'from-blue-500 to-blue-600' },
    { name: 'InnovateLab', color: 'from-green-500 to-green-600' },
    { name: 'StartupXYZ', color: 'from-purple-500 to-purple-600' },
    { name: 'DigitalFlow', color: 'from-pink-500 to-pink-600' },
    { name: 'CloudTech', color: 'from-indigo-500 to-indigo-600' },
    { name: 'DataDriven', color: 'from-orange-500 to-orange-600' }
  ];

  const benefits = [
    {
      icon: Clock,
      title: 'Save 60% Time',
      description: 'Reduce hiring time significantly with our streamlined process and dedicated team',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Users,
      title: 'Expert Recruiters',
      description: 'Work with experienced recruiters who specialize in your industry vertical',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Target,
      title: 'Quality Candidates',
      description: 'Access to pre-vetted, high-quality talent pool with proven track records',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: Shield,
      title: 'Risk-Free Hiring',
      description: 'Comprehensive replacement guarantee and compliance support included',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Zap,
      title: 'Rapid Deployment',
      description: 'Get candidates in front of you within 48 hours of request submission',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Trophy,
      title: '98% Success Rate',
      description: 'Industry-leading placement success rate with long-term retention focus',
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setContactForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!contactForm.name || !contactForm.email || !contactForm.company) return;
    
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
      alert('Thank you! We\'ll get back to you within 2 hours with a custom proposal.');
    }, 1000);
  };

  const handlePackageSelect = (packageName: string) => {
    setSelectedPackage(packageName);
    handleInputChange('package', packageName);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 pt-24 pb-20">
        <div className="absolute inset-0 bg-black/30"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <span className="text-white/90 font-medium">Trusted by 500+ Companies</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              Hire Smarter,
              <br />
              <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent">
                Not Harder
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-12">
              Let our expert recruiters handle your entire hiring process. From sourcing to onboarding, 
              we deliver quality candidates while you focus on growing your business.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="h-14 px-8 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold rounded-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-200"
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Get Started Free
              </Button>
              <Button 
                variant="outline" 
                className="h-14 px-8 border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm rounded-xl font-semibold"
                onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Phone className="w-5 h-5 mr-2" />
                View Packages
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-white mb-2">98%</div>
                <div className="text-white/80 text-sm">Success Rate</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-white mb-2">48h</div>
                <div className="text-white/80 text-sm">First Candidates</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-white mb-2">500+</div>
                <div className="text-white/80 text-sm">Happy Clients</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-white mb-2">60%</div>
                <div className="text-white/80 text-sm">Time Saved</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        {/* Benefits Section */}
        <div className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="group bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <CardContent className="p-8 text-center">
                  <div className={`w-20 h-20 bg-gradient-to-r ${benefit.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <benefit.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Packages Section */}
        <div id="packages" className="mb-20">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-indigo-100 rounded-full px-4 py-2 mb-4">
              <Award className="w-4 h-4 text-indigo-600" />
              <span className="text-indigo-600 text-sm font-medium">Choose Your Plan</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Pricing That Scales
              <br />
              <span className="text-indigo-600">With Your Business</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transparent pricing with no hidden fees. Pay only for successful placements.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <Card 
                key={pkg.id} 
                className={`relative group cursor-pointer transition-all duration-300 hover:scale-105 ${
                  selectedPackage === pkg.name 
                    ? 'ring-4 ring-indigo-500 shadow-2xl' 
                    : 'hover:shadow-2xl'
                } ${pkg.popular ? 'shadow-2xl scale-105' : ''}`}
                onClick={() => handlePackageSelect(pkg.name)}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 text-sm font-bold">
                      <Star className="w-4 h-4 mr-1" />
                      {pkg.savings}
                    </Badge>
                  </div>
                )}
                
                <CardHeader className={`bg-gradient-to-r ${pkg.gradient} text-white rounded-t-lg relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="relative">
                    <CardTitle className="text-2xl font-bold mb-2">{pkg.name}</CardTitle>
                    <div className="mb-4">
                      <span className="text-4xl font-bold">{pkg.price}</span>
                      <span className="text-white/80 ml-2">{pkg.period}</span>
                    </div>
                    <p className="text-white/90">{pkg.description}</p>
                    
                    {!pkg.popular && (
                      <div className="mt-4">
                        <Badge variant="secondary" className="bg-white/20 text-white">
                          {pkg.savings}
                        </Badge>
                      </div>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="p-8">
                  <ul className="space-y-4 mb-8">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full h-12 bg-gradient-to-r ${pkg.gradient} hover:shadow-xl transform group-hover:scale-105 transition-all duration-200 font-semibold`}
                    onClick={() => {
                      handlePackageSelect(pkg.name);
                      document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Choose {pkg.name}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <Card id="contact-form" className="max-w-4xl mx-auto mb-20 shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-slate-800 to-slate-900 text-white rounded-t-lg text-center py-10">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8" />
            </div>
            <CardTitle className="text-3xl font-bold mb-4">Ready to Transform Your Hiring?</CardTitle>
            <p className="text-white/90 text-lg max-w-2xl mx-auto">
              Tell us about your hiring needs and we'll create a custom solution tailored for your business.
              Get a response within 2 hours!
            </p>
          </CardHeader>
          
          <CardContent className="p-10">
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-semibold text-gray-800">Full Name *</Label>
                  <Input
                    id="name"
                    value={contactForm.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter your full name"
                    className="h-12 border-2 border-gray-200 focus:border-indigo-500 rounded-xl"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-semibold text-gray-800">Work Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="you@company.com"
                    className="h-12 border-2 border-gray-200 focus:border-indigo-500 rounded-xl"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-sm font-semibold text-gray-800">Company Name *</Label>
                  <Input
                    id="company"
                    value={contactForm.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    placeholder="Your company name"
                    className="h-12 border-2 border-gray-200 focus:border-indigo-500 rounded-xl"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companySize" className="text-sm font-semibold text-gray-800">Company Size</Label>
                  <Select value={contactForm.companySize} onValueChange={(value) => handleInputChange('companySize', value)}>
                    <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-indigo-500 rounded-xl">
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

              <div className="space-y-2">
                <Label htmlFor="package" className="text-sm font-semibold text-gray-800">Interested Package</Label>
                <Select value={contactForm.package} onValueChange={(value) => handleInputChange('package', value)}>
                  <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-indigo-500 rounded-xl">
                    <SelectValue placeholder="Select a package" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Intern Talent-Link">Intern Talent-Link</SelectItem>
                    <SelectItem value="Full-Time ExpertCare">Full-Time ExpertCare</SelectItem>
                    <SelectItem value="Project-Flex Freelance">Project-Flex Freelance</SelectItem>
                    <SelectItem value="Custom Solution">Custom Solution</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-semibold text-gray-800">Tell us about your hiring needs</Label>
                <Textarea
                  id="message"
                  value={contactForm.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder="Describe the roles you're hiring for, timeline, specific requirements, budget range, etc."
                  rows={5}
                  className="border-2 border-gray-200 focus:border-indigo-500 rounded-xl resize-none"
                />
              </div>

              <Button 
                onClick={handleSubmit}
                className="w-full h-16 text-lg bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold rounded-xl shadow-2xl hover:shadow-3xl transform hover:scale-[1.02] transition-all duration-200"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Sending Request...
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Mail className="w-6 h-6" />
                    Get Custom Proposal (2 Hour Response)
                  </div>
                )}
              </Button>
              
              <div className="text-center text-sm text-gray-500">
                🔒 Your information is secure and will never be shared with third parties
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Trusted By Section */}
        <div className="text-center mb-20">
          <h3 className="text-3xl font-bold text-gray-800 mb-4">Trusted by Industry Leaders</h3>
          <p className="text-gray-600 mb-12 text-lg">Join 500+ companies that have transformed their hiring process</p>
          
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6 items-center">
            {trustedCompanies.map((company, index) => (
              <div key={index} className="group cursor-pointer">
                <div className={`h-20 bg-gradient-to-r ${company.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                  <span className="text-white font-bold text-sm px-2">{company.name}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 p-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl">
            <div className="flex items-center justify-center gap-4 text-green-800">
              <TrendingUp className="w-8 h-8" />
              <div className="text-left">
                <div className="text-2xl font-bold">Average 98% Client Satisfaction</div>
                <div className="text-green-700">Based on 1000+ successful placements</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HiringOutsourcingPage;