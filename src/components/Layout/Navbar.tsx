import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, ChevronDown, MessageSquare, Award, TrendingUp, 
  Shield, Mic2, Briefcase, User, Handshake, Mail, Moon, Sun, Zap, UserCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link, useLocation, useNavigate } from 'react-router-dom';
// Using a simple text logo instead of the custom component
const Logo = () => (
  <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent hover:no-underline">
    ContentHelm
  </div>
);
import { useTheme } from 'next-themes';

interface NavItem {
  name: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  desc?: string;
  items?: NavItem[];
}

// Navigation data
const aboutItems: NavItem[] = [
  { name: 'About Us', href: '/about', icon: User, desc: 'Our story, mission, and values' },
  { name: 'Investors', href: '/about/investors', icon: Handshake, desc: 'Information for our investors' },
];

const solutionItems: NavItem[] = [
  { name: 'Why Us?', href: '/solutions/why-us', icon: Award, desc: 'Discover your competitive advantage' },
  { name: 'Use Cases', href: '/solutions/use-cases', icon: Briefcase, desc: 'Solutions for every industry' }
];

const productItems: NavItem[] = [
  { name: 'LinkedIn Post Builder', href: '/product/post-generation', icon: MessageSquare, desc: 'Craft compelling, engaging posts' },
  { name: 'Resume Enhancer', href: '/product/resume-builder', icon: Award, desc: 'Optimize your resume for success' },
  { name: 'Career Match', href: '/product/job-matcher', icon: TrendingUp, desc: 'Find your perfect job match' },
  { name: 'Mock Interview', href: '/product/mock-interview', icon: Mic2, desc: 'Practice and excel in interviews' },
  { name: 'Career Insights', href: '/product/career-analytics', icon: Shield, desc: 'Gain expert advice and insights' }
];

const navItems: NavItem[] = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about', items: aboutItems },
  { name: 'Products', href: '/product', items: productItems },
  { name: 'Solutions', href: '/solutions', items: solutionItems },
  { name: 'Resources', href: '/resources' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Contact Us', href: '/contact', icon: Mail, desc: 'Get in touch with our team' }
];



// Main Navbar component

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme } = useTheme();
  
  // Track if dropdown is being hovered
  const [isHovered, setIsHovered] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Handle navigation
  const handleNavigate = (href: string) => {
    navigate(href);
    setIsOpen(false);
    setOpenDropdown(null);
  };
  // Dropdown menu component with animation
  const renderDropdownMenu = (items: NavItem[]) => (
    <motion.div 
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ 
        duration: 0.15,
        ease: [0.4, 0, 0.2, 1],
        scale: {
          type: 'spring',
          damping: 20,
          stiffness: 300
        }
      }}
      className="grid grid-cols-1 gap-1.5 p-2 w-full min-w-[280px] bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg rounded-lg shadow-xl border border-gray-200/50 dark:border-slate-700/50 ring-1 ring-black/5 dark:ring-white/10"
      onClick={(e) => e.stopPropagation()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className="group flex items-start p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
          onClick={() => {
            setOpenDropdown(null);
            setIsOpen(false);
          }}
        >
          {item.icon && (
            <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 text-cyan-500 dark:text-cyan-400">
              <item.icon className="h-4 w-4" />
            </div>
          )}
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors">
              {item.name}
            </p>
            {item.desc && (
              <p className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                {item.desc}
              </p>
            )}
          </div>
        </Link>
      ))}
    </motion.div>
  );

  return (
    <motion.nav 
      className={cn(
        "fixed w-full z-50 transition-all duration-300",
        scrolled 
          ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-b border-gray-100 dark:border-slate-800 shadow-lg text-gray-900 dark:text-white" 
          : "bg-transparent text-white dark:text-white"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group no-underline hover:no-underline">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                <button
                  onMouseEnter={() => item.items && setOpenDropdown(item.name)}
                  onMouseLeave={() => !isHovered && setOpenDropdown(null)}
                  onClick={() => {
                    if (item.items) {
                      setOpenDropdown(openDropdown === item.name ? null : item.name);
                    } else {
                      handleNavigate(item.href);
                    }
                  }}
                  className={cn(
                    'flex items-center px-4 py-2.5 text-sm font-medium rounded-lg mx-1 transition-all duration-200',
                    location.pathname === item.href
                      ? 'bg-cyan-500/10 text-cyan-500 dark:text-cyan-400 dark:bg-cyan-500/10'
                      : scrolled 
                        ? 'text-gray-900 hover:text-cyan-500 dark:text-gray-200 dark:hover:text-cyan-400' 
                        : 'text-white/90 hover:text-white dark:text-white/90 dark:hover:text-white',
                    scrolled 
                      ? 'group hover:bg-gray-100/50 dark:hover:bg-slate-800/50' 
                      : 'group hover:bg-white/10',
                    openDropdown === item.name && (scrolled ? 'text-cyan-500 dark:text-cyan-400' : 'text-white')
                  )}
                >
                  <span>{item.name}</span>
                  {item.items && (
                    <ChevronDown
                      className={cn(
                        'ml-1 h-4 w-4 transition-transform duration-200',
                        openDropdown === item.name ? 'transform rotate-180' : ''
                      )}
                      aria-hidden="true"
                    />
                  )}
                </button>

                {item.items && (
                  <AnimatePresence>
                    {openDropdown === item.name && (
                      <motion.div 
                        ref={dropdownRef}
                        className="absolute left-0 mt-1 w-64 origin-top-left z-50"
                        initial="closed"
                        animate="open"
                        exit="closed"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => {
                          setIsHovered(false);
                          setOpenDropdown(null);
                        }}
                      >
                        {renderDropdownMenu(item.items)}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>

          {/* Right side buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              to="/auth/login"
              className="hidden lg:inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 dark:focus:ring-offset-slate-800 transition-all duration-200 shadow-md hover:shadow-lg hover:shadow-cyan-500/20 dark:shadow-cyan-500/10 no-underline"
            >
              <UserCircle className="h-4 w-4 mr-2" />
              <span>Login</span>
            </Link>
            <button
              onClick={() => handleNavigate('/auth/register')}
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 rounded-md transition-all duration-200"
            >
              Get Started
              <Zap className="ml-2 h-4 w-4" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden bg-slate-900/95 backdrop-blur-lg border-t border-white/10"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <div key={item.name} className="border-b border-white/5 last:border-0">
                  <button
                    onClick={() => {
                      if (item.items) {
                        setOpenDropdown(openDropdown === item.name ? null : item.name);
                      } else {
                        setOpenDropdown(null);
                        setIsOpen(false);
                        navigate(item.href);
                      }
                    }}
                    className={cn(
                      'w-full text-left px-4 py-3 text-base font-medium flex items-center justify-between',
                      'text-gray-300 hover:bg-white/5 hover:text-white rounded-lg',
                      'transition-colors duration-200'
                    )}
                  >
                    <span>{item.name}</span>
                    {item.items && (
                      <ChevronDown
                        className={cn(
                          'h-4 w-4 transform transition-transform',
                          openDropdown === item.name ? 'rotate-180' : ''
                        )}
                      />
                    )}
                  </button>
                  
                  {item.items && openDropdown === item.name && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="pl-6 py-1 space-y-1"
                    >
                      {item.items.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.href}
                          onClick={() => {
                            setIsOpen(false);
                            setOpenDropdown(null);
                          }}
                          className="block px-4 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                        >
                          <div className="flex items-center">
                            {subItem.icon && (
                              <subItem.icon className="h-4 w-4 mr-3 text-cyan-400" />
                            )}
                            <div>
                              <div className="font-medium">{subItem.name}</div>
                              {subItem.desc && (
                                <div className="text-xs text-gray-500">{subItem.desc}</div>
                              )}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="pt-2 pb-4 px-4 space-y-3">
              <button
                onClick={() => handleNavigate('/auth/login')}
                className={cn(
                  'w-full flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors',
                  'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-slate-800',
                  scrolled ? 'text-gray-800 dark:text-gray-200' : 'text-gray-700 dark:text-gray-200'
                )}
              >
                <UserCircle className="h-4 w-4 mr-2" />
                Log in
              </button>
              <button
                onClick={() => handleNavigate('/auth/register')}
                className={cn(
                  'w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-white',
                  'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700',
                  'shadow-lg hover:shadow-cyan-500/30 rounded-md transition-all duration-200'
                )}
              >
                Get Started
                <Zap className="ml-2 h-4 w-4" />
              </button>
              
              <div className="flex items-center justify-center pt-2">
                <button 
                  onClick={toggleTheme}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-200 transition-colors"
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;