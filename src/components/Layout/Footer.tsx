import { motion } from "framer-motion";
import { OrbitLogo } from "../OrbitLogo";
import { Twitter, Linkedin, Github, Mail, Phone, MapPin, Clock, Shield, Lock, Zap, Users, TrendingUp, Globe, Instagram, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const personalProducts = [
  { name: 'LinkedIn Post Builder', href: '/product/personalpostgeneration', icon: <Zap className="w-4 h-4" /> },
  { name: 'Resume Enhancer', href: '/product/resume-builder', icon: <Users className="w-4 h-4" /> },
  { name: 'Career Match', href: '/product/job-matcher', icon: <TrendingUp className="w-4 h-4" /> },
  { name: 'Career Insights & Tips', href: '/product/career-analytics', icon: <Globe className="w-4 h-4" /> },
];

const companyInfo = [
  { name: 'About Us', href: '/about' },
  { name: 'Careers', href: '/about/careers' },
  { name: 'Management Team', href: '/about/management' },
  { name: 'Investor Relations', href: '/about/investors' },
];

const supportLinks = [
  { name: 'Learning Center', href: '/resources' },
  { name: 'Contact Support', href: '/contact' },
];

const legalLinks = [
  { name: 'Terms of Service', href: '/terms' },
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Cookie Policy', href: '/cookie-policy' },
  { name: 'GDPR Compliance', href: '/gdpr' },
  { name: 'Security', href: '/security' },
  { name: 'Acceptable Use', href: '/acceptable-use' },
];

const socialLinks = [
  { name: 'Twitter', href: 'https://twitter.com/postpilot', icon: <Twitter className="w-5 h-5" /> },
  { name: 'LinkedIn', href: 'https://linkedin.com/company/postpilot', icon: <Linkedin className="w-5 h-5" /> },
  { name: 'GitHub', href: 'https://github.com/postpilot', icon: <Github className="w-5 h-5" /> },
  { name: 'Instagram', href: 'https://instagram.com/postpilot', icon: <Instagram className="w-5 h-5" /> },
];

const contactInfo = [
  { icon: Mail, text: "support@postpilot.ai", href: "mailto:support@postpilot.ai" },
  { icon: Phone, text: "+1 (555) 123-4567", href: "tel:+15551234567" },
  { 
    icon: MapPin, 
    text: "123 Startup St, San Francisco, CA 94107", 
    href: "https://maps.google.com" 
  },
  { icon: Clock, text: "Mon-Fri: 9am-6pm PST", href: "#" }
];

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link to={href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
    {children}
  </Link>
);

const FooterSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div>
    <h3 className="text-sm font-semibold mb-4">{title}</h3>
    <ul className="space-y-3">
      {children}
    </ul>
  </div>
);

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubscribed(true);
      setEmail("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="bg-background border-t border-border/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Company Info & Newsletter */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-3">
              <OrbitLogo size="sm" />
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                PostPilot AI
              </span>
            </div>
            
            <p className="text-muted-foreground">
              Empowering professionals with AI-powered tools for career growth and content creation.
            </p>
            
            {/* Newsletter */}
            <div className="space-y-4">
              <h3 className="font-medium">Subscribe to our newsletter</h3>
              {isSubscribed ? (
                <div className="p-3 bg-green-50 text-green-800 rounded-md text-sm">
                  Thank you for subscribing! Check your email to confirm.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex space-x-2">
                  <Input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1"
                  />
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Sending..." : <ArrowRight className="h-4 w-4" />}
                  </Button>
                </form>
              )}
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 pt-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <FooterSection title="Products">
              {personalProducts.map((item) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <FooterLink href={item.href}>
                    <div className="flex items-center space-x-2">
                      {item.icon}
                      <span>{item.name}</span>
                    </div>
                  </FooterLink>
                </motion.li>
              ))}
            </FooterSection>
          </div>

          <div className="space-y-6">
            <FooterSection title="Company">
              {companyInfo.map((item) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <FooterLink href={item.href}>{item.name}</FooterLink>
                </motion.li>
              ))}
            </FooterSection>

            <FooterSection title="Support">
              {supportLinks.map((item) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <FooterLink href={item.href}>{item.name}</FooterLink>
                </motion.li>
              ))}
            </FooterSection>
          </div>

          <div className="space-y-6">
            <FooterSection title="Legal">
              {legalLinks.map((item) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <FooterLink href={item.href}>{item.name}</FooterLink>
                </motion.li>
              ))}
            </FooterSection>

            {/* Contact Info */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold">Contact Us</h3>
              <div className="space-y-2">
                {contactInfo.map((item, i) => (
                  <motion.a 
                    key={i}
                    href={item.href}
                    className="flex items-start space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <item.icon className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>{item.text}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} PostPilot AI. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Shield className="h-4 w-4" />
              <span className="text-xs">GDPR Compliant</span>
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Lock className="h-4 w-4" />
              <span className="text-xs">Secure Payments</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}