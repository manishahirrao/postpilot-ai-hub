import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, Phone, MessageSquare, Send, Building, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const contactMethods = [
  {
    icon: Mail,
    title: 'Email Support',
    description: 'Our team will get back to you within 24 hours.',
    contact: 'support@postpilot.ai',
    href: 'mailto:support@postpilot.ai',
  },
  {
    icon: Phone,
    title: 'Phone Support',
    description: 'Mon-Fri, 9am-5pm EST.',
    contact: '+1 (555) 123-4567',
    href: 'tel:+15551234567',
  },
  {
    icon: MessageSquare,
    title: 'Live Chat',
    description: 'Chat with a support agent right now.',
    contact: 'Start Chat',
    href: '#',
  },
];

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitSuccess(true);
    // Reset form after a delay
    setTimeout(() => setSubmitSuccess(false), 5000);
  };

  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="outline" className="mb-4">We're Here to Help</Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">Get in Touch</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Have a question, a feature request, or need help with your account? Reach out and we'll be happy to assist.
          </p>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-20 md:py-24 bg-muted/40">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                <CardDescription>We typically respond within one business day.</CardDescription>
              </CardHeader>
              <CardContent>
                {submitSuccess ? (
                  <div className="flex flex-col items-center justify-center h-full text-center p-8">
                    <div className="bg-green-100 p-3 rounded-full mb-4">
                      <Check className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground">Thank you for reaching out. We'll get back to you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" placeholder="John Doe" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" placeholder="john.doe@example.com" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Inquiry Type</Label>
                      <Select required>
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="support">Technical Support</SelectItem>
                          <SelectItem value="billing">Billing & Subscriptions</SelectItem>
                          <SelectItem value="feedback">Feedback & Suggestions</SelectItem>
                          <SelectItem value="partnership">Partnership Inquiry</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" placeholder="How can we help?" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea id="message" placeholder="Tell us more..." rows={5} required />
                    </div>
                    <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? 'Sending...' : <><Send className="mr-2 h-4 w-4" /> Send Message</>}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>

            {/* Info Side */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold tracking-tight mb-4">Contact Information</h2>
                <div className="space-y-4">
                  {contactMethods.map((method) => (
                    <a key={method.title} href={method.href} className="block">
                      <Card className="hover:border-primary/80 transition-colors">
                        <CardContent className="p-6 flex items-start space-x-4">
                          <div className="bg-primary/10 p-3 rounded-full">
                            <method.icon className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{method.title}</h3>
                            <p className="text-muted-foreground">{method.description}</p>
                            <p className="text-primary font-medium mt-1">{method.contact}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </a>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold tracking-tight mb-4">Our Office</h2>
                <Card>
                  <CardContent className="p-6 flex items-start space-x-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Building className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Corporate HQ</h3>
                      <p className="text-muted-foreground">123 AI Avenue, Suite 404, Silicon Valley, CA 94043</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
