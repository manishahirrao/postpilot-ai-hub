
import * as React from "react";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, MessageCircle, Send, Briefcase } from 'lucide-react';
import { ComplexOrbitalSystem } from '@/components/OrbitalSystem';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import PageSection from '@/components/Layout/PageSection';
import Animated from '@/components/Layout/Animated';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1200));
    setSubmitSuccess(true);
    setFormData({ name: '', email: '', subject: '', category: '', message: '' });
    setTimeout(() => setSubmitSuccess(false), 4000);
    setIsSubmitting(false);
  };

  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6 text-blue-600" />,
      title: 'Email Support',
      description: 'Get detailed, professional help from our team',
      contact: 'support@postpilot.ai',
      action: 'Email Us',
      href: 'mailto:support@postpilot.ai'
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-purple-600" />,
      title: 'Live Chat',
      description: 'Chat with our professional support team in real-time',
      contact: 'Available 24/7',
      action: 'Start Chat',
      href: '#'
    },
    {
      icon: <Briefcase className="w-6 h-6 text-green-600" />,
      title: '1:1 Consultation',
      description: 'Book a session with a LinkedIn expert',
      contact: 'Schedule a call',
      action: 'Book Now',
      href: '#'
    }
  ];


  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Get in
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {" "}Touch
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Have questions about PostPilot? Need help with your account? Want to share feedback? 
            We'd love to hear from you and help you succeed.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Methods */}
          <div className="lg:col-span-1 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Reach Us</h2>
              <div className="space-y-4">
                {contactMethods.map((method, index) => (
                  <Animated key={index} delay={0.1 * (index + 1)}>
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0">{method.icon}</div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">{method.title}</h3>
                            <p className="text-gray-600 text-sm mb-2">{method.description}</p>
                            <p className="font-medium text-gray-900 mb-3">{method.contact}</p>
                            <Button size="sm" variant="outline">
                              {method.action}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Animated>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Main Section */}
      <PageSection className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-gray-50 rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Send a Message</h2>
              <p className="text-gray-600 mb-6">We typically respond within 24 hours.</p>
              {submitSuccess && (
                <div className="mb-6 p-4 bg-green-50 text-green-800 rounded-lg">
                  Thank you for your message! We'll get back to you soon.
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-gray-700">Full Name *</Label>
                    <div className="mt-1 relative">
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Your name"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-gray-700">Email Address *</Label>
                    <div className="mt-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        id="email"
                        type="email"
                        className="pl-10"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <Label htmlFor="category" className="text-gray-700">Category *</Label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Briefcase className="h-5 w-5 text-gray-400" />
                    </div>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                      <SelectTrigger className="pl-10">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="support">Technical Support</SelectItem>
                        <SelectItem value="account">Account Help</SelectItem>
                        <SelectItem value="feedback">Feedback</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="subject" className="text-gray-700">Subject *</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    placeholder="How can we help you?"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="message" className="text-gray-700">Message *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Tell us more about your inquiry..."
                    rows={5}
                    required
                    className="mt-1"
                  />
                </div>
                <div className="pt-2">
                  <Button type="submit" className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
            {/* Professional Support Methods */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Other ways to reach us</h2>
              <div className="space-y-6">
                {contactMethods.map((method, idx) => (
                  <Animated key={idx} delay={0.1 * (idx + 1)}>
                    <Card className="border border-gray-100 hover:border-blue-100 transition-colors">
                      <CardContent className="p-6">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 bg-gradient-to-br from-blue-50 to-purple-50 p-3 rounded-xl">
                            {method.icon}
                          </div>
                          <div className="ml-4">
                            <h3 className="text-lg font-semibold text-gray-900">{method.title}</h3>
                            <p className="mt-1 text-gray-600">{method.description}</p>
                            <p className="mt-2 font-medium text-gray-900">{method.contact}</p>
                            <a href={method.href} className="mt-2 inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
                              {method.action}
                            </a>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Animated>
                ))}
              </div>
            </div>
          </div>
        </div>
      </PageSection>
      <Footer />
    </div>
  );
};

export default ContactPage;

