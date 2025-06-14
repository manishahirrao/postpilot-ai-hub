import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Twitter, 
  Linkedin, 
  Github, 
  Instagram,
  ArrowRight,
  Zap,
  Users,
  TrendingUp,
  Shield,
  Globe,
  Heart
} from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const personalProducts = [
    { name: 'LinkedIn Post Generator', href: '/product/linkedin-posts', icon: <Zap className="w-4 h-4" /> },
    { name: 'Resume Builder', href: '/product/resume-builder', icon: <Users className="w-4 h-4" /> },
    { name: 'Job Matcher', href: '/product/job-matcher', icon: <TrendingUp className="w-4 h-4" /> },
    { name: 'Career Analytics', href: '/product/career-analytics', icon: <Globe className="w-4 h-4" /> },
  ];

  const companyProducts = [
    { name: 'Free Job Postings', href: '/product/free-job-postings' },
    { name: 'Hiring Outsourcing', href: '/product/hiring-outsourcing' },
    { name: 'Workflow Automation', href: '/products/automations' },
    { name: 'AI Customer Support', href: '/products/support' },
    { name: 'AI Voice Agents', href: '/products/voice-agents' },
    { name: 'Ads Generator', href: '/products/ads-generator' },
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
    { name: 'Status Page', href: '/status' },
    { name: 'Community Forum', href: '/community' },
    { name: 'Feature Requests', href: '/feedback' },
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

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Stay ahead of the curve
              </h3>
              <p className="text-gray-300 text-lg">
                Get the latest updates on AI-powered career tools, industry insights, and exclusive features.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 bg-white/10 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent backdrop-blur-sm"
                />
              </div>
              <button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center group">
                Subscribe
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center mb-6">
              <div className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                PostPilot
              </div>
            </Link>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Empowering professionals and businesses with AI-powered tools for career growth, 
              content creation, and hiring solutions. Join thousands who trust PostPilot for their success.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 hover:bg-indigo-600 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 backdrop-blur-sm"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Personal Products */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6 flex items-center">
              <Users className="w-5 h-5 mr-2 text-indigo-400" />
              Personal Tools
            </h4>
            <ul className="space-y-3">
              {personalProducts.map((product) => (
                <li key={product.href}>
                  <Link
                    to={product.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group"
                  >
                    <span className="text-indigo-400 mr-2 group-hover:translate-x-1 transition-transform">
                      {product.icon}
                    </span>
                    {product.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Solutions */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-purple-400" />
              Business Tools
            </h4>
            <ul className="space-y-3">
              {companyProducts.map((product) => (
                <li key={product.href}>
                  <Link
                    to={product.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-1 transform inline-block"
                  >
                    {product.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6 flex items-center">
              <Globe className="w-5 h-5 mr-2 text-green-400" />
              Company
            </h4>
            <ul className="space-y-3">
              {companyInfo.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-1 transform inline-block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Legal */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6 flex items-center">
              <Shield className="w-5 h-5 mr-2 text-yellow-400" />
              Support & Legal
            </h4>
            <ul className="space-y-3">
              {supportLinks.slice(0, 3).map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-1 transform inline-block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              {legalLinks.slice(0, 3).map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-1 transform inline-block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-16 pt-8 border-t border-gray-700/50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center text-gray-300">
              <Mail className="w-5 h-5 mr-3 text-indigo-400" />
              <div>
                <p className="font-medium text-white">Email Us</p>
                <a href="mailto:hello@postpilot.com" className="hover:text-white transition-colors">
                  hello@postpilot.com
                </a>
              </div>
            </div>
            <div className="flex items-center text-gray-300">
              <Phone className="w-5 h-5 mr-3 text-purple-400" />
              <div>
                <p className="font-medium text-white">Call Us</p>
                <a href="tel:+1-555-123-4567" className="hover:text-white transition-colors">
                  +1 (555) 123-4567
                </a>
              </div>
            </div>
            <div className="flex items-center text-gray-300">
              <MapPin className="w-5 h-5 mr-3 text-green-400" />
              <div>
                <p className="font-medium text-white">Visit Us</p>
                <p>Delhi,India</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700/50 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center text-gray-400 text-sm">
              <p>&copy; {currentYear} PostPilot. All rights reserved.</p>
             
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms
              </Link>
              <Link to="/cookie-policy" className="text-gray-400 hover:text-white transition-colors">
                Cookies
              </Link>
              <div className="flex items-center text-gray-400">
                <Globe className="w-4 h-4 mr-1" />
                English (US)
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;