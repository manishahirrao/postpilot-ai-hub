import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MessageSquare, Send, Building, Check, MapPin, Clock, User, MessageCircle, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

// Type Definitions
type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

interface ContactMethod {
  icon: IconType;
  title: string;
  value: string;
  gradient: string;
}

interface FormData {
  name: string;
  email: string;
  category: 'general' | 'support' | 'sales' | 'feedback';
  subject: string;
  message: string;
}

interface FormFieldProps {
  id: keyof FormData;
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: IconType;
}

interface SelectCategoryProps {
  id: 'category';
  value: FormData['category'];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  icon: IconType;
}

interface MessageTextareaProps {
  id: 'message';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  icon: IconType;
}

// Constants
const contactMethods: ContactMethod[] = [
  { icon: Mail, title: 'Email Us', value: 'support@postpilot.ai', gradient: 'from-blue-400 to-teal-400' },
  { icon: Phone, title: 'Call Us', value: '+1 (555) 123-4567', gradient: 'from-green-400 to-lime-400' },
  { icon: MessageSquare, title: 'Live Chat', value: 'Available 24/7', gradient: 'from-purple-400 to-pink-500' },
];

const companyInfo = {
  name: 'PostPilot AI',
  address: '123 AI Avenue, Silicon Valley, CA 94043',
  hours: 'Mon-Fri, 9 AM - 6 PM PST',
};

// Reusable Components
const FormField: React.FC<FormFieldProps> = ({ id, label, type, placeholder, value, onChange, icon: Icon }) => (
  <div className="relative">
    <label htmlFor={id} className="sr-only">{label}</label>
    <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
    <input
      id={id}
      name={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
      className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition duration-300 placeholder-slate-400"
    />
  </div>
);

const SelectCategory: React.FC<SelectCategoryProps> = ({ id, value, onChange, icon: Icon }) => (
  <div className="relative">
    <label htmlFor={id} className="sr-only">Category</label>
    <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
    <select
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition duration-300 appearance-none"
    >
      <option value="general">General Inquiry</option>
      <option value="support">Technical Support</option>
      <option value="sales">Sales Question</option>
      <option value="feedback">Feedback & Suggestions</option>
    </select>
  </div>
);

const MessageTextarea: React.FC<MessageTextareaProps> = ({ id, value, onChange, icon: Icon }) => (
  <div className="relative">
    <label htmlFor={id} className="sr-only">Message</label>
    <Icon className="absolute left-4 top-5 w-5 h-5 text-slate-400" />
    <textarea
      id={id}
      name={id}
      rows={6}
      placeholder="Tell us how we can help..."
      value={value}
      onChange={onChange}
      required
      className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition duration-300 placeholder-slate-400 resize-none"
    />
  </div>
);

const AnimatedBackground = () => (
    <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div className="absolute top-0 left-0 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <motion.div className="absolute top-0 right-0 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <motion.div className="absolute bottom-0 left-1/4 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
    </div>
);

// Main Page Component
const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    category: 'general',
    subject: '',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', category: 'general', subject: '', message: '' });
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative bg-slate-900 text-white min-h-screen overflow-hidden">
      <AnimatedBackground />
      <main className="relative z-10 container mx-auto px-4 py-16 sm:py-24">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Get in Touch</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-300">We're here to help and answer any question you might have. We look forward to hearing from you!</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {contactMethods.map((method, index) => (
            <motion.div
              key={index}
              className={`p-8 rounded-2xl text-center glass-effect bg-gradient-to-br ${method.gradient}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ y: -10, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
            >
              <div className="inline-block p-4 bg-white/20 rounded-full mb-4">
                <method.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">{method.title}</h3>
              <p className="mt-2 text-white/90 text-lg">{method.value}</p>
            </motion.div>
          ))}
        </div>

        <section id="contact-form" className="max-w-4xl mx-auto p-8 sm:p-12 rounded-2xl glass-card-deep">
          <h2 className="text-4xl font-bold text-center mb-2 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Send a Message</h2>
          <p className="text-center mb-10 text-slate-300">Fill out the form below and we'll get back to you as soon as possible.</p>
          
          {submitSuccess ? (
            <motion.div 
              className="mt-6 p-4 bg-green-500/20 border border-green-500 rounded-lg text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center justify-center">
                <Check className="w-6 h-6 mr-3 text-green-400" />
                <p className="font-semibold">Thank you! Your message has been sent successfully.</p>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField id="name" label="Full Name" type="text" placeholder="Your Name" value={formData.name} onChange={handleInputChange} icon={User} />
                <FormField id="email" label="Email Address" type="email" placeholder="your.email@example.com" value={formData.email} onChange={handleInputChange} icon={Mail} />
              </div>
              <SelectCategory id="category" value={formData.category} onChange={handleInputChange} icon={Zap} />
              <FormField id="subject" label="Subject" type="text" placeholder="What's this about?" value={formData.subject} onChange={handleInputChange} icon={MessageCircle} />
              <MessageTextarea id="message" value={formData.message} onChange={handleInputChange} icon={MessageSquare} />
              <div className="text-center">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    'w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 font-semibold text-white rounded-lg transition-all duration-300 ease-in-out',
                    'bg-gradient-to-r from-purple-600 to-indigo-600',
                    'hover:shadow-lg hover:shadow-purple-500/50 hover:scale-105',
                    'disabled:opacity-50 disabled:cursor-not-allowed'
                  )}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div className="w-5 h-5 border-t-2 border-white rounded-full mr-3" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </section>

        <section className="py-16 text-center">
            <h3 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Our Headquarters</h3>
            <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">Come say hello if you're in the area.</p>
            <div className="mt-12 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="glass-card p-6"><MapPin className="w-8 h-8 mx-auto text-purple-400"/><h4 className="mt-4 font-semibold text-lg">Address</h4><p className="mt-1 text-slate-400">{companyInfo.address}</p></div>
                <div className="glass-card p-6"><Clock className="w-8 h-8 mx-auto text-purple-400"/><h4 className="mt-4 font-semibold text-lg">Business Hours</h4><p className="mt-1 text-slate-400">{companyInfo.hours}</p></div>
                <div className="glass-card p-6"><Building className="w-8 h-8 mx-auto text-purple-400"/><h4 className="mt-4 font-semibold text-lg">Company</h4><p className="mt-1 text-slate-400">{companyInfo.name}</p></div>
            </div>
        </section>

      </main>

      <footer className="relative z-10 border-t border-slate-800 py-8">
        <div className="container mx-auto text-center text-slate-400">
          <p>&copy; {new Date().getFullYear()} {companyInfo.name}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ContactPage;