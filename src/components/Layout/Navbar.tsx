import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, LogIn, Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSignupDropdownOpen, setIsSignupDropdownOpen] = useState(false);
  const { isAuthenticated, userType, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.signup-dropdown')) {
        setIsSignupDropdownOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const personalLinks = [
    { href: '/product/linkedin-posts', label: 'Social Media Post Generator' },
    { href: '/product/resume-builder', label: 'Resume Builder/Enhancer' },
    { href: '/product/job-matcher', label: 'Profile Job Matcher' },
    { href: '/product/career-analytics', label: 'Career Analytics & Tips' },
  ];

  const companyLinks = [
    { href: '/product/free-job-postings', label: 'Free Job Posting' },
    { href: '/product/hiring-outsourcing', label: 'Hiring Outsourcing' },
    { href: '/product/linkedin-posts', label: 'Social Media Post Generator' },
  ];

  const loginOptions = [
    { href: '/login/personal', label: 'Personal' },
    { href: '/login/company', label: 'Company' },
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

   const navigate = useNavigate();

  const handleLogout = () => {
    logout();          // your logout function
    navigate("/");     // navigate to home page
  };

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

  const getServiceLinks = () => {
    if (!isAuthenticated) return [];
    return userType === 'professional' ? personalLinks : companyLinks;
  };

  const getServiceLabel = () => {
    if (!isAuthenticated) return 'Login';
    return userType === 'professional' ? 'Personal Tools' : 'Business Tools';
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <div className="text-2xl font-bold text-indigo-600">PostPilot</div>
          </Link>

          <div className="hidden lg:flex items-center space-x-2">
               <Link 
              to="/" 
              className={`px-4 py-2 text-sm font-medium transition-colors hover:text-indigo-600 ${
                location.pathname === '/' ? 'text-indigo-600' : 'text-gray-700'
              }`}
            >
              Home
            </Link>
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
            {isAuthenticated && (
              <DropdownMenu 
                label={getServiceLabel()} 
                links={getServiceLinks()} 
                isActive={false} 
              />
            )}
          </div>

          <div className="hidden lg:flex items-center space-x-4">
          {!isAuthenticated && (
  <Link 
    to="/contact-sales" 
    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
  >
    Contact Sales
  </Link>
)}


            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link 
                  to={userType === 'professional' ? '/dashboard/personal' : '/dashboard/company'} 
                  className="text-gray-700 hover:text-indigo-600 text-sm font-medium"
                >
                  Dashboard
                </Link>
                <Link 
                  to={userType === 'professional' ? '/profile/personal' : '/profile/company'} 
                  className="text-gray-700 hover:text-indigo-600 text-sm font-medium"
                >
                  Profile
                </Link>
                <Button 
                
                onClick={handleLogout} variant="outline" size="sm">
                  Logout
                </Button>
              </div>
            ) : (
              <div className="relative signup-dropdown">
                <button
                  onClick={() => setIsSignupDropdownOpen((prev) => !prev)}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all text-sm font-medium inline-flex items-center"
                >
                  Sign Up Free
                  <ChevronDown className="w-4 h-4 ml-2" />
                </button>

                {isSignupDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                    <Link
                      to="/auth/register/personal"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsSignupDropdownOpen(false)}
                    >
                      Personal
                    </Link>
                    <Link
                      to="/auth/register/company"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsSignupDropdownOpen(false)}
                    >
                      Company
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          <button
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
