import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, LogIn, Menu, X, CreditCard, Zap, TrendingUp, Settings, Bell, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSignupDropdownOpen, setIsSignupDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const { isAuthenticated, userType, logout } = useAuth();
  const location = useLocation();

  // Mock credit data
  const userData = {
    name: "John Doe",
    plan: userType === 'professional' ? "Pro" : "Business",
    credits: 1247,
    maxCredits: 5000,
    renewalDate: "Dec 15, 2024"
  };

  const creditPercentage = (userData.credits / userData.maxCredits) * 100;
  const isLowCredits = creditPercentage < 20;

  const getProgressColor = () => {
    if (creditPercentage > 50) return 'bg-emerald-500';
    if (creditPercentage > 20) return 'bg-amber-500';
    return 'bg-red-500';
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.signup-dropdown')) {
        setIsSignupDropdownOpen(false);
      }
      if (!target.closest('.profile-dropdown')) {
        setIsProfileDropdownOpen(false);
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
    logout();
    navigate("/");
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
                {/* Notifications */}
                <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                  <Bell className="w-5 h-5" />
                  {isLowCredits && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                  )}
                </button>

                {/* Profile Dropdown */}
                <div className="profile-dropdown relative">
                  <button
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-2">
                      <User className="w-5 h-5 text-gray-600" />
                    </div>
                  </button>

                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                      {/* User Info Section */}
                      <div className="p-4 border-b border-gray-100">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h3 className="text-sm font-semibold text-gray-900">{userData.name}</h3>
                            <p className="text-xs text-gray-500">{userData.plan} Plan</p>
                          </div>
                          <Link to="/settings" className="text-gray-400 hover:text-gray-600">
                            <Settings className="w-4 h-4" />
                          </Link>
                        </div>
                        
                        {/* Credit Display */}
                        <div className="space-y-3 mt-4">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Credits</span>
                            <span className="text-sm font-medium text-gray-900">
                              {userData.credits.toLocaleString()} / {userData.maxCredits.toLocaleString()}
                            </span>
                          </div>
                          
                          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full transition-all duration-500 ${getProgressColor()}`}
                              style={{ width: `${creditPercentage}%` }}
                            />
                          </div>
                          
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>Renews: {userData.renewalDate}</span>
                            <span>{Math.floor(creditPercentage)}% used</span>
                          </div>
                        </div>
                        
                        {isLowCredits && (
                          <Link
                            to="/pricing"
                            className="w-full mt-3 block bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 text-center"
                            onClick={() => setIsProfileDropdownOpen(false)}
                          >
                            Upgrade Plan
                          </Link>
                        )}
                      </div>
                      
                      <div className="p-2">
                        <Link
                          to={userType === 'professional' ? '/dashboard/personal' : '/dashboard/company'}
                          className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                          onClick={() => setIsProfileDropdownOpen(false)}
                        >
                          <Zap className="w-4 h-4" />
                          <span>Dashboard</span>
                        </Link>
                        <Link
                          to={userType === 'professional' ? '/profile/personal' : '/profile/company'}
                          className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                          onClick={() => setIsProfileDropdownOpen(false)}
                        >
                          <User className="w-4 h-4" />
                          <span>View Profile</span>
                        </Link>
                        <Link
                          to="/analytics"
                          className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                          onClick={() => setIsProfileDropdownOpen(false)}
                        >
                          <TrendingUp className="w-4 h-4" />
                          <span>Usage Analytics</span>
                        </Link>
                        <Link
                          to="/billing"
                          className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                          onClick={() => setIsProfileDropdownOpen(false)}
                        >
                          <CreditCard className="w-4 h-4" />
                          <span>Billing & Plans</span>
                        </Link>
                        <button
                          onClick={() => {
                            handleLogout();
                            setIsProfileDropdownOpen(false);
                          }}
                          className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors text-left"
                        >
                          <LogIn className="w-4 h-4 transform rotate-180" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
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

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4 bg-white">
            <div className="space-y-2">
              <Link 
                to="/" 
                className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/pricing" 
                className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link 
                to="/resources" 
                className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Resources
              </Link>
              <Link 
                to="/support" 
                className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Customer Support
              </Link>
              
              {isAuthenticated && (
                <>
                  {/* Mobile Credits Display */}
                  <div className="px-3 py-2 bg-gray-50 rounded-md border mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">Credits</span>
                      <span className={`text-sm font-semibold ${isLowCredits ? 'text-red-600' : 'text-gray-900'}`}>
                        {userData.credits.toLocaleString()} / {userData.maxCredits.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-300 ${getProgressColor()}`}
                        style={{ width: `${creditPercentage}%` }}
                      />
                    </div>
                    {isLowCredits && (
                      <Link
                        to="/pricing"
                        className="w-full mt-3 block bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 text-center"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Upgrade Plan
                      </Link>
                    )}
                  </div>
                  
                  <Link 
                    to={userType === 'professional' ? '/dashboard/personal' : '/dashboard/company'} 
                    className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-md transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to={userType === 'professional' ? '/profile/personal' : '/profile/company'} 
                    className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-md transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button 
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-md transition-colors"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;