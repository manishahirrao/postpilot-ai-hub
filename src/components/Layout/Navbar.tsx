
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { isAuthenticated, userType, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Personal user navigation links
  const personalLinks = [
    { href: '/services/linkedin-posts', label: 'LinkedIn Post Generation' },
    { href: '/services/resume-builder', label: 'Resume Builder/Enhancer' },
    { href: '/services/job-matcher', label: 'Profile & Job Matcher' },
    { href: '/services/career-analytics', label: 'Career Analytics & Tips' },
  ];

  // Company user navigation links
  const companyLinks = [
    { href: '/product/free-job-postings', label: 'Free Job Posting' },
    { href: '/product/hiring-outsourcing', label: 'Hiring & Outsourcing' },
    { href: '/services/linkedin-posts', label: 'LinkedIn Post Generation' },
  ];

  // Login dropdown options (when not authenticated)
  const loginOptions = [
    { href: '/auth/login/personal', label: 'Personal' },
    { href: '/auth/login/companies', label: 'Companies' },
  ];

  const solutionsLinks = [
    { href: '/solutions/why-us', label: 'Why Us?' },
    { href: '/solutions/use-cases', label: 'By Use Case' },
  ];

  const aboutLinks = [
    { href: '/about', label: 'About Us' },
    { href: '/about/careers', label: 'Careers' },
    { href: '/about/management', label: 'Management Team' },
    { href: '/about/investors', label: 'Investor Relations' },
    { href: '/contact', label: 'Contact Us' },
  ];

  const DropdownMenu: React.FC<{ 
    label: string; 
    links: { href: string; label: string }[];
    isActive: boolean;
  }> = ({ label, links, isActive }) => (
    <div 
      className="relative group"
      onMouseEnter={() => setActiveDropdown(label)}
      onMouseLeave={() => setActiveDropdown(null)}
    >
      <button className={`flex items-center px-4 py-2 text-sm font-medium transition-colors hover:text-indigo-600 ${
        isActive ? 'text-indigo-600' : 'text-gray-700'
      }`}>
        {label}
        <ChevronDown className="w-4 h-4 ml-1" />
      </button>
      
      {activeDropdown === label && (
        <div className="absolute left-0 top-full mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 z-50 opacity-100 translate-y-0 transition-all duration-200">
          <div className="py-2">
            {links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition-colors"
                onClick={() => setActiveDropdown(null)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  // Get the appropriate product links based on user type
  const getProductLinks = () => {
    if (!isAuthenticated) return [];
    return userType === 'professional' ? personalLinks : companyLinks;
  };

  const getProductLabel = () => {
    if (!isAuthenticated) return 'Login';
    return userType === 'professional' ? 'Personal Tools' : 'Business Tools';
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="text-2xl font-bold text-indigo-600">PostPilot</div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {/* Conditional Product/Login Dropdown */}
            <DropdownMenu 
              label={getProductLabel()}
              links={isAuthenticated ? getProductLinks() : loginOptions}
              isActive={
                isAuthenticated 
                  ? (userType === 'professional' ? location.pathname.startsWith('/services') : location.pathname.startsWith('/product'))
                  : location.pathname.startsWith('/auth/login')
              }
            />
            
            <DropdownMenu 
              label="Solutions" 
              links={solutionsLinks} 
              isActive={location.pathname.startsWith('/solutions')}
            />
            <Link 
              to="/pricing" 
              className={`px-4 py-2 text-sm font-medium transition-colors hover:text-indigo-600 ${
                location.pathname === '/pricing' ? 'text-indigo-600' : 'text-gray-700'
              }`}
            >
              Pricing
            </Link>
            <Link 
              to="/resources" 
              className={`px-4 py-2 text-sm font-medium transition-colors hover:text-indigo-600 ${
                location.pathname === '/resources' ? 'text-indigo-600' : 'text-gray-700'
              }`}
            >
              Resources
            </Link>
            <DropdownMenu 
              label="About" 
              links={aboutLinks} 
              isActive={location.pathname.startsWith('/about') || location.pathname === '/contact'}
            />
            <Link 
              to="/support" 
              className={`px-4 py-2 text-sm font-medium transition-colors hover:text-indigo-600 ${
                location.pathname === '/support' ? 'text-indigo-600' : 'text-gray-700'
              }`}
            >
              Customer Support
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link 
              to="/contact-sales" 
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
            >
              Contact Sales
            </Link>
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link 
                  to={userType === 'professional' ? '/dashboard/personal' : '/dashboard/company'} 
                  className="text-gray-700 hover:text-indigo-600 text-sm font-medium"
                >
                  Dashboard
                </Link>
                <Button onClick={logout} variant="outline" size="sm">
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Link 
                  to="/auth/register" 
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all text-sm font-medium"
                >
                  Sign Up Free
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-6 space-y-4">
            {/* Mobile Product/Login Links */}
            <div className="space-y-2">
              <div className="font-medium text-gray-900 mb-2">{getProductLabel()}</div>
              {(isAuthenticated ? getProductLinks() : loginOptions).map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="block pl-4 py-2 text-sm text-gray-600 hover:text-indigo-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            
            <div className="space-y-2">
              <div className="font-medium text-gray-900 mb-2">Solutions</div>
              {solutionsLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="block pl-4 py-2 text-sm text-gray-600 hover:text-indigo-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <Link to="/pricing" className="block py-2 text-sm font-medium text-gray-900 hover:text-indigo-600">
              Pricing
            </Link>
            <Link to="/resources" className="block py-2 text-sm font-medium text-gray-900 hover:text-indigo-600">
              Resources
            </Link>
            
            <div className="space-y-2">
              <div className="font-medium text-gray-900 mb-2">About</div>
              {aboutLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="block pl-4 py-2 text-sm text-gray-600 hover:text-indigo-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            
            <Link to="/support" className="block py-2 text-sm font-medium text-gray-900 hover:text-indigo-600">
              Customer Support
            </Link>
            
            <div className="pt-4 border-t border-gray-200 space-y-3">
              <Link 
                to="/contact-sales" 
                className="block w-full bg-indigo-600 text-white text-center px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact Sales
              </Link>
              {isAuthenticated ? (
                <>
                  <Link 
                    to={userType === 'professional' ? '/dashboard/personal' : '/dashboard/company'} 
                    className="block text-center py-2 text-sm font-medium text-gray-900 hover:text-indigo-600"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button 
                    onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                    className="block w-full text-center py-2 text-sm font-medium text-gray-900 hover:text-indigo-600"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link 
                  to="/auth/register" 
                  className="block w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center px-4 py-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all text-sm font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign Up Free
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
