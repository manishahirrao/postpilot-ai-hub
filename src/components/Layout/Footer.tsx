import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Twitter, 
  Linkedin, 
  Github, 
  Instagram, 
  Mail, 
  MessageSquare, 
  Briefcase, 
  Zap, 
  Award, 
  TrendingUp, 
  Mic2, 
  Building2, 
  BookOpen, 
  Check,
  FileText 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface FooterLink {
  name: string;
  href: string;
  icon?: React.ReactNode;
}

interface FooterSection {
  title: string;
  icon: React.ReactNode;
  links: FooterLink[];
}

const footerSections: FooterSection[] = [
  {
    title: 'Products',
    icon: <Briefcase className="h-5 w-5 text-cyan-400" />,
    links: [
      { name: 'LinkedIn Post Builder', href: '/product/personal-post-generation', icon: <MessageSquare className="h-4 w-4 mr-2 text-cyan-400" /> },
      { name: 'Resume Enhancer', href: '/product/resume-builder', icon: <FileText className="h-4 w-4 mr-2 text-cyan-400" /> },
      { name: 'Career Match', href: '/product/job-matcher', icon: <TrendingUp className="h-4 w-4 mr-2 text-cyan-400" /> },
      { name: 'Mock Interview', href: '/product/mock-interview', icon: <Mic2 className="h-4 w-4 mr-2 text-cyan-400" /> },
      { name: 'Career Insights', href: '/product/career-analytics', icon: <Award className="h-4 w-4 mr-2 text-cyan-400" /> },
    ],
  },
  {
    title: 'Company',
    icon: <Building2 className="h-5 w-5 text-cyan-400" />,
    links: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/about/careers' },
      { name: 'Leadership', href: '/about/management' },
      { name: 'Investors', href: '/about/investors' },
      { name: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Resources',
    icon: <BookOpen className="h-5 w-5 text-cyan-400" />,
    links: [
      { name: 'Blog', href: '/blog' },
      { name: 'Help Center', href: '/support' },
      { name: 'API Documentation', href: '/docs' },
      { name: 'Community', href: '/community' },
      { name: 'Tutorials', href: '/tutorials' },
    ],
  },
];

const socialLinks = [
  { name: 'Twitter', href: '#', icon: Twitter, color: 'hover:bg-[#1DA1F2]' },
  { name: 'LinkedIn', href: '#', icon: Linkedin, color: 'hover:bg-[#0077B5]' },
  { name: 'GitHub', href: '#', icon: Github, color: 'hover:bg-gray-800' },
  { name: 'Instagram', href: '#', icon: Instagram, color: 'hover:bg-gradient-to-r from-pink-500 to-purple-600' },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setTimeout(() => setIsSubscribed(false), 5000);
      setEmail("");
    }, 1000);
  };

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white pt-20 pb-12">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
            style={{
              width: `${Math.random() * 200 + 100}px`,
              height: `${Math.random() * 200 + 100}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              filter: 'blur(60px)',
              opacity: 0.1,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                ContentHelm
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Empowering your career journey with AI-powered tools for content creation, resume enhancement, and career growth.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className={cn(
                    "h-10 w-10 rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:scale-110",
                    social.color
                  )}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.3 }}
                >
                  <social.icon className="h-5 w-5 text-white" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Navigation Columns */}
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
              className="space-y-5"
            >
              <div className="flex items-center space-x-2">
                {section.icon}
                <h3 className="text-lg font-semibold text-white">{section.title}</h3>
              </div>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <motion.li 
                    key={link.name}
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Link
                      to={link.href}
                      className="flex items-center text-sm text-gray-400 hover:text-cyan-400 transition-colors duration-300 group"
                    >
                      {link.icon || (
                    <Zap className="h-3 w-3 mr-2 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                      <span>{link.name}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Newsletter */}
        <motion.div 
          className="mt-16 pt-8 border-t border-white/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Mail className="h-6 w-6 text-cyan-400" />
              <h3 className="text-xl font-semibold text-white">Stay Updated</h3>
            </div>
            <p className="text-gray-400 mb-6">Subscribe to our newsletter for the latest updates and insights.</p>
            
            {isSubscribed ? (
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="inline-flex items-center px-4 py-2 rounded-full bg-green-500/10 text-green-400 text-sm font-medium"
              >
                <Check className="h-4 w-4 mr-2" />
                Thank you for subscribing!
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <div className="relative flex-1">
                  <Input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-white/5 border-white/10 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent h-12 px-4 rounded-lg backdrop-blur-sm"
                    aria-label="Email for newsletter"
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="h-12 px-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cyan-500/20"
                >
                  {isLoading ? 'Subscribing...' : 'Subscribe'}
                </Button>
              </form>
            )}
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div 
          className="mt-12 pt-6 border-t border-white/10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} ContentHelm. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-sm text-gray-500 hover:text-cyan-400 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-gray-500 hover:text-cyan-400 transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-sm text-gray-500 hover:text-cyan-400 transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}