import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, LogIn, Menu, X, CreditCard, Zap, TrendingUp, Settings, Bell, User, Sparkles, Award, Shield } from 'lucide-react';

interface LinkItem {
  href: string;
  label: string;
  desc?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSignupDropdownOpen, setIsSignupDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  
  // Mock authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<'professional' | 'business'>('professional');
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Mock credit data
  const userData = {
    name: "Alex Johnson",
    plan: userType === 'professional' ? "Pro" : "Business",
    credits: 1247,
    maxCredits: 5000,
    renewalDate: "Dec 15, 2024",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  };

  const creditPercentage = (userData.credits / userData.maxCredits) * 100;
  const isLowCredits = creditPercentage < 20;

  const getProgressColor = () => {
    if (creditPercentage > 50) return 'from-emerald-500 to-emerald-600';
    if (creditPercentage > 20) return 'from-amber-500 to-amber-600';
    return 'from-red-500 to-red-600';
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
      if (!target.closest('.dropdown-container') && !target.closest('.dropdown-trigger')) {
        setActiveDropdown(null);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const productPersonalLinks: LinkItem[] = [
    { href: '/product/personalpostgeneration', label: 'LinkedIn Post Builder', icon: Sparkles, desc: 'Create engaging posts' },
    { href: '/product/resume-builder', label: 'Resume Enhancer', icon: Award, desc: 'Boost your profile' },
    { href: '/product/job-matcher', label: 'Career Match', icon: TrendingUp, desc: 'Find perfect jobs' },
    { href: '/product/career-analytics', label: 'Career Insights & Tips', icon: Shield, desc: 'Get expert advice' },
  ];

  const productCompanyLinks: LinkItem[] = [
    { href: '/product/free-job-postings', label: 'Post a Job', icon: Sparkles, desc: 'Find top talent' },
    { href: '/product/hiring-outsourcing', label: 'Hire Assist', icon: Award, desc: 'AI-powered hiring' },
    { href: '/product/linkedin-posts', label: 'AI Post Builder', icon: TrendingUp, desc: 'Create job posts' },
    { href: '/product/automation-page', label: 'AI Workflow', icon: Shield, desc: 'Automate processes' },
    { href: '/product/voice-agent', label: 'Voice Agent', icon: Zap, desc: 'Voice interviews' },
    { href: '/product/ads-generator', label: 'Ad Copy AI', icon: Settings, desc: 'Generate copy' },
    { href: '/product/support-page', label: 'AI Customer Support', icon: User, desc: '24/7 assistance' },
  ];

  const solutionsLinks: LinkItem[] = [
    { href: '/solutions/why-us', label: 'Why Us?', desc: 'See our advantages' },
    { href: '/solutions/use-cases', label: 'By Use Case', desc: 'Industry solutions' },
  ];

  const aboutLinks: LinkItem[] = [
    { href: '/about', label: 'About Us', desc: 'Our story' },
    { href: '/about/careers', label: 'Careers', desc: 'Join our team' },
    { href: '/about/management', label: 'Management Team', desc: 'Meet the leaders' },
    { href: '/about/investors', label: 'Investor Relations', desc: 'For investors' },
    { href: '/contact', label: 'Contact Us', desc: 'Get in touch' },
  ];

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  interface DropdownMenuProps {
    label: string;
    links: LinkItem[];
    isActive: boolean;
    customContent?: React.ReactNode;
  }

  const DropdownMenu: React.FC<DropdownMenuProps> = ({ label, links, isActive, customContent }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    return (
      <div 
        className="relative dropdown-container"
        onMouseEnter={() => {
          setIsHovered(true);
          setActiveDropdown(label);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          if (!isClicked) {
            setTimeout(() => {
              if (!isHovered) setActiveDropdown(null);
            }, 200);
          }
        }}
        ref={dropdownRef}
      >
        <button 
          className={`dropdown-trigger flex items-center px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg hover:bg-gray-50 group ${
            isActive ? 'text-indigo-600 bg-indigo-50' : 'text-gray-700 hover:text-indigo-600'
          }`}
          onClick={() => {
            setIsClicked(!isClicked);
            setActiveDropdown(isClicked ? null : label);
          }}
        >
          {label}
          <ChevronDown className={`w-4 h-4 ml-1 transition-all duration-200 ${activeDropdown === label ? 'rotate-180 text-indigo-600' : 'group-hover:text-indigo-600'}`} />
        </button>
        
        {(activeDropdown === label) && (
          <div 
            className="absolute left-0 top-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 animate-in slide-in-from-top-2 duration-200"
            style={{ minWidth: customContent ? '480px' : '280px' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {customContent || (
              <div className="py-3">
                {links.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="flex items-start px-4 py-3 text-sm hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-200 group"
                    onClick={() => {
                      setActiveDropdown(null);
                      setIsClicked(false);
                    }}
                  >
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 group-hover:text-indigo-600 transition-colors">
                        {link.label}
                      </div>
                      {link.desc && (
                        <div className="text-xs text-gray-500 mt-1 group-hover:text-indigo-500">
                          {link.desc}
                        </div>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-100' : 'bg-white/90 backdrop-blur-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="/" className="flex items-center group">
            <div className="relative">
              <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 bg-clip-text text-transparent">
                PostPilot
              </div>
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-pulse"></div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <a 
              href="/" 
              className="px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
            >
              Home
            </a>

            <DropdownMenu 
              label="Product" 
              links={[]} 
              isActive={activeDropdown === 'Product'}
              customContent={
                <div className="grid grid-cols-2 gap-0">
                  <div className="p-4 border-r border-gray-100">
                    <h3 className="flex items-center px-2 pb-3 text-sm font-semibold text-gray-900">
                      <User className="w-4 h-4 mr-2 text-indigo-600" />
                      Personal
                    </h3>
                    <div className="space-y-1">
                      {productPersonalLinks.map((link, index) => {
                        const Icon = link.icon || User;
                        return (
                          <a
                            key={index}
                            href={link.href}
                            className="flex items-start px-3 py-3 rounded-lg hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-200 group"
                            onClick={() => setActiveDropdown(null)}
                          >
                            <Icon className="w-4 h-4 mt-0.5 mr-3 text-gray-400 group-hover:text-indigo-600 transition-colors" />
                            <div>
                              <div className="text-sm font-medium text-gray-900 group-hover:text-indigo-600 transition-colors">
                                {link.label}
                              </div>
                              <div className="text-xs text-gray-500 mt-0.5 group-hover:text-indigo-500">
                                {link.desc}
                              </div>
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="flex items-center px-2 pb-3 text-sm font-semibold text-gray-900">
                      <Shield className="w-4 h-4 mr-2 text-purple-600" />
                      Company
                    </h3>
                    <div className="space-y-1">
                      {productCompanyLinks.map((link, index) => {
                        const Icon = link.icon || User;
                        return (
                          <a
                            key={index}
                            href={link.href}
                            className="flex items-start px-3 py-3 rounded-lg hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-200 group"
                            onClick={() => setActiveDropdown(null)}
                          >
                            <Icon className="w-4 h-4 mt-0.5 mr-3 text-gray-400 group-hover:text-purple-600 transition-colors" />
                            <div>
                              <div className="text-sm font-medium text-gray-900 group-hover:text-purple-600 transition-colors">
                                {link.label}
                              </div>
                              <div className="text-xs text-gray-500 mt-0.5 group-hover:text-purple-500">
                                {link.desc}
                              </div>
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              }
            />

            <DropdownMenu 
              label="Solutions" 
              links={solutionsLinks} 
              isActive={activeDropdown === 'Solutions'}
            />
            
            <a 
              href="/pricing" 
              className="px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
            >
              Pricing
            </a>
            
            <a 
              href="/resources" 
              className="px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
            >
              Resources
            </a>
            
            <DropdownMenu 
              label="About" 
              links={aboutLinks} 
              isActive={activeDropdown === 'About'}
            />
            
            <a 
              href="contact" 
              className="px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
            >
              Support
            </a>
          </div>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            {!isAuthenticated && (
              <a 
                href="contact-sales" 
                className="bg-white text-gray-700 px-4 py-2 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 text-sm font-medium"
              >
                Contact Sales
              </a>
            )}

            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                {/* Notifications */}
                <button className="relative p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-200">
                  <Bell className="w-5 h-5" />
                  {isLowCredits && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-red-500 to-red-600 rounded-full animate-pulse">
                      <span className="absolute inset-0 w-3 h-3 bg-red-400 rounded-full animate-ping"></span>
                    </span>
                  )}
                </button>

                {/* Profile Dropdown */}
                <div className="profile-dropdown relative">
                  <button
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    className="flex items-center space-x-2 p-1.5 rounded-xl hover:bg-gray-100 transition-all duration-200 group"
                  >
                    <img
                      src={userData.avatar}
                      alt="Profile"
                      className="w-8 h-8 rounded-lg object-cover ring-2 ring-gray-200 group-hover:ring-indigo-300 transition-all duration-200"
                    />
                    <ChevronDown className={`w-4 h-4 text-gray-500 group-hover:text-gray-700 transition-all duration-200 ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 animate-in slide-in-from-top-2 duration-200">
                      {/* Profile Header */}
                      <div className="p-6 border-b border-gray-100 bg-gradient-to-br from-indigo-50 to-purple-50">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <img
                              src={userData.avatar}
                              alt="Profile"
                              className="w-12 h-12 rounded-xl object-cover ring-2 ring-white shadow-lg"
                            />
                            <div>
                              <h3 className="text-sm font-semibold text-gray-900">{userData.name}</h3>
                              <p className="text-xs text-gray-600 flex items-center">
                                <Award className="w-3 h-3 mr-1" />
                                {userData.plan} Plan
                              </p>
                            </div>
                          </div>
                          <button className="text-gray-400 hover:text-gray-600 p-1.5 hover:bg-white rounded-lg transition-all duration-200">
                            <Settings className="w-4 h-4" />
                          </button>
                        </div>
                        
                        {/* Credits Section */}
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600 flex items-center">
                              <Zap className="w-4 h-4 mr-1.5 text-indigo-600" />
                              Credits
                            </span>
                            <span className="text-sm font-medium text-gray-900">
                              {userData.credits.toLocaleString()} / {userData.maxCredits.toLocaleString()}
                            </span>
                          </div>
                          
                          <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full transition-all duration-700 bg-gradient-to-r ${getProgressColor()}`}
                              style={{ width: `${creditPercentage}%` }}
                            />
                          </div>
                          
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>Renews: {userData.renewalDate}</span>
                            <span className={isLowCredits ? 'text-red-600 font-medium' : ''}>
                              {Math.floor(creditPercentage)}% used
                            </span>
                          </div>
                        </div>
                        
                        {isLowCredits && (
                          <button
                            className="w-full mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2.5 px-4 rounded-lg text-sm font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            onClick={() => setIsProfileDropdownOpen(false)}
                          >
                            Upgrade Plan
                          </button>
                        )}
                      </div>
                      
                      {/* Menu Items */}
                      <div className="p-2">
                        {[
                          { icon: Zap, label: 'Dashboard', href: '#' },
                          { icon: User, label: 'View Profile', href: '#' },
                          { icon: TrendingUp, label: 'Usage Analytics', href: '#' },
                          { icon: CreditCard, label: 'Billing & Plans', href: '#' },
                        ].map((item, index) => (
                          <a
                            key={index}
                            href={item.href}
                            className="w-full flex items-center space-x-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-600 rounded-lg transition-all duration-200"
                            onClick={() => setIsProfileDropdownOpen(false)}
                          >
                            <item.icon className="w-4 h-4" />
                            <span>{item.label}</span>
                          </a>
                        ))}
                        
                        <hr className="my-2 border-gray-100" />
                        
                        <button
                          onClick={() => {
                            handleLogout();
                            setIsProfileDropdownOpen(false);
                          }}
                          className="w-full flex items-center space-x-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all duration-200"
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
              <div className="flex items-center space-x-3">
                {/* Login Button */}
                <button
                  onClick={() => setIsAuthenticated(true)}
                  className="text-gray-700 hover:text-indigo-600 px-4 py-2 text-sm font-medium transition-all duration-200"
                >
                  Log In
                </button>

                {/* Sign Up Dropdown */}
                <div className="relative signup-dropdown">
                  <button
                    onClick={() => setIsSignupDropdownOpen(!isSignupDropdownOpen)}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2.5 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 text-sm font-medium inline-flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Sign Up Free
                    <ChevronDown className={`w-4 h-4 ml-2 transition-transform duration-200 ${isSignupDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isSignupDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 animate-in slide-in-from-top-2 duration-200">
                      <div className="p-2">
                        <a
                          href="/auth/login/personal"
                          className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-600 rounded-lg transition-all duration-200"
                          onClick={() => setIsSignupDropdownOpen(false)}
                        >
                          <User className="w-4 h-4 mr-3" />
                          Personal
                        </a>
                        <a
                          href="/auth/login/company"
                          className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-600 rounded-lg transition-all duration-200"
                          onClick={() => setIsSignupDropdownOpen(false)}
                        >
                          <Shield className="w-4 h-4 mr-3" />
                          Company
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4 bg-white/95 backdrop-blur-lg animate-in slide-in-from-top-2 duration-200">
            <div className="space-y-2">
              <a 
                href="#" 
                className="block px-4 py-3 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 rounded-lg transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </a>

              {/* Mobile Product Sections */}
              <div className="px-4 py-2">
                <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                  <User className="w-4 h-4 mr-2 text-indigo-600" />
                  Product - Personal
                </h3>
                <div className="space-y-1 pl-6">
                  {productPersonalLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      className="block px-3 py-2 text-sm text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>

              <div className="px-4 py-2">
                <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                  <Shield className="w-4 h-4 mr-2 text-purple-600" />
                  Product - Company
                </h3>
                <div className="space-y-1 pl-6">
                  {productCompanyLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      className="block px-3 py-2 text-sm text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>

              {['Pricing', 'Resources', 'Support'].map((item) => (
                <a 
                  key={item}
                  href="#" 
                  className="block px-4 py-3 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 rounded-lg transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              
              {/* Mobile Auth Section */}
              {!isAuthenticated ? (
                <div className="pt-4 border-t border-gray-200 space-y-2">
                  <button
                    onClick={() => {
                      setIsAuthenticated(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200"
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => {
                      setIsAuthenticated(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-lg text-sm font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg"
                  >
                    Sign Up Free
                  </button>
                </div>
              ) : (
                <div className="pt-4 border-t border-gray-200">
                  {/* Mobile Credits */}
                  <div className="px-4 py-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900 flex items-center">
                        <Zap className="w-4 h-4 mr-1.5 text-indigo-600" />
                        Credits
                      </span>
                      <span className={`text-sm font-semibold ${isLowCredits ? 'text-red-600' : 'text-gray-900'}`}>
                        {userData.credits.toLocaleString()} / {userData.maxCredits.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-300 bg-gradient-to-r ${getProgressColor()}`}
                        style={{ width: `${creditPercentage}%` }}
                      />
                    </div>
                    {isLowCredits && (
                      <button
                        className="w-full mt-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Upgrade Plan
                      </button>
                    )}
                  </div>
                  
                  {/* Mobile Profile Links */}
                  {[
                    { icon: Zap, label: 'Dashboard' },
                    { icon: User, label: 'Profile' },
                    { icon: TrendingUp, label: 'Analytics' },
                    { icon: CreditCard, label: 'Billing' },
                  ].map((item, index) => (
                    <a 
                      key={index}
                      href="#" 
                      className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 rounded-lg transition-all duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <item.icon className="w-4 h-4 mr-3" />
                      {item.label}
                    </a>
                  ))}
                  
                  <button 
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                  >
                    <LogIn className="w-4 h-4 mr-3 transform rotate-180" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      
    </nav>
  );
};

export default Navbar;