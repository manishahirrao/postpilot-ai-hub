import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X, ChevronDown, Sparkles, Award, TrendingUp, Shield, Users, Briefcase, User, Handshake, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "../ThemeProvider";
import { Link, useLocation } from "react-router-dom";
import AgentOSLogo from "../Logo/logo";

interface NavItem {
  name: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  desc?: string;
  items?: NavItem[];
}

const aboutItems = [
  { name: 'About Us', href: '/about', icon: Users, desc: 'Our story' },
  { name: 'Careers', href: '/about/careers', icon: Briefcase, desc: 'Join our team' },
  { name: 'Management Team', href: '/about/management', icon: User, desc: 'Meet the leaders' },
  { name: 'Investor Relations', href: '/about/investors', icon: Handshake, desc: 'For investors' },
  { name: 'Contact Us', href: '/contact', icon: Mail, desc: 'Get in touch' }
];

const solutionItems = [
  { name: 'Why Us?', href: '/solutions/why-us', icon: Award, desc: 'See our advantages' },
  { name: 'By Use Case', href: '/solutions/use-cases', icon: Briefcase, desc: 'Industry solutions' }
];

const productItems = [
  { name: 'LinkedIn Post Builder', href: '/product/personal-post-generation', icon: Sparkles, desc: 'Create engaging posts' },
  { name: 'Resume Enhancer', href: '/product/resume-builder', icon: Award, desc: 'Boost your profile' },
  { name: 'Career Match', href: '/product/job-matcher', icon: TrendingUp, desc: 'Find perfect jobs' },
  { name: 'Career Insights & Tips', href: '/product/career-analytics', icon: Shield, desc: 'Get expert advice' }
];

const navItems: NavItem[] = [
  { name: 'Home', href: '/' },
  { 
    name: 'About', 
    href: '/about',
    items: aboutItems
  },
  { 
    name: 'Solution', 
    href: '/solution',
    items: solutionItems
  },
  { name: 'Resources', href: '/resources' },
  { 
    name: 'Products', 
    href: '/product',
    items: productItems
  },
  { name: 'Pricing', href: '/pricing' }
];

const DropdownMenu = ({ items, isOpen, onClose }: { items: NavItem[], isOpen: boolean, onClose: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <motion.div
      ref={ref}
      className="absolute left-0 mt-2 w-64 rounded-lg shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 overflow-hidden"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.15 }}
      style={{
        '--tw-shadow': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        '--tw-shadow-colored': '0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color)'
      } as React.CSSProperties}
    >
      <div className="py-1">
        {items.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {item.icon && <item.icon className="h-5 w-5 text-muted-foreground mr-3" />}
            <span>{item.name}</span>
          </Link>
        ))}
      </div>
    </motion.div>
  );
};

const MobileDropdownMenu = ({ items, isOpen }: { items: NavItem[], isOpen: boolean }) => {
  if (!isOpen) return null;

  const location = useLocation();
  
  return (
    <div className="pl-6 py-1 space-y-1">
      {items.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
            location.pathname === item.href
              ? 'bg-primary text-primary-foreground'
              : 'text-foreground/70 hover:text-foreground hover:bg-accent'
          }`}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { theme, setTheme } = useTheme();
  const { pathname } = useLocation();

  // Initialize theme on mount
  useEffect(() => {
    // Check for saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme === 'dark' || (!savedTheme && systemPrefersDark) ? 'dark' : 'light';
    
    // Apply the theme
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Update theme state
    setTheme(initialTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    
    // Update the class on the html element
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Save to localStorage and update state
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  };

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <motion.nav 
      className="fixed top-0 w-full z-50 backdrop-blur-sm bg-background/80 border-b border-border/10"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <AgentOSLogo size="lg" />
            <Link to="/" className="text-xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">PostPilot</Link>
          </motion.div>

          {/* Desktop Navbar */}
          <div className="hidden md:flex items-center space-x-1 relative">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                <Link 
                  to={item.href} 
                  className={`flex items-center px-3 py-2 text-sm font-medium transition-colors rounded-md ${
                    pathname === item.href
                      ? 'text-foreground bg-accent'
                      : 'text-foreground/80 hover:text-foreground hover:bg-accent'
                  }`}
                  onClick={(e) => item.items && (e.preventDefault(), toggleDropdown(item.name))}
                >
                  {item.name}
                  {item.items && (
                    <ChevronDown 
                      className={`ml-1 h-4 w-4 transition-transform ${openDropdown === item.name ? 'rotate-180' : ''}`} 
                    />
                  )}
                </Link>
                
                {item.items && (
                  <div className="relative">
                    <AnimatePresence>
                      <DropdownMenu 
                        items={item.items} 
                        isOpen={openDropdown === item.name} 
                        onClose={() => setOpenDropdown(null)} 
                      />
                    </AnimatePresence>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Theme Toggle & CTA */}
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme}
              className="hover:bg-foreground/5 transition-colors duration-200"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-yellow-400" />
              ) : (
                <Moon className="h-5 w-5 text-blue-400" />
              )}
            </Button>
            
            <Button 
              className="hidden md:block bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 animate-glow"
              asChild
            >
              <Link to="/auth/login">Get Started</Link>
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-foreground/5 transition-colors duration-200"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

          {/* Mobile menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div 
                className="md:hidden bg-background/95 backdrop-blur-sm border-t border-border/10 shadow-lg overflow-hidden"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <div className="py-2 px-4 space-y-1">
                  {navItems.map((item) => (
                    <div key={item.name} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <Link
                          to={item.href}
                          onClick={(e) => {
                            if (item.items) {
                              e.preventDefault();
                              toggleDropdown(item.name);
                            } else {
                              setIsOpen(false);
                            }
                          }}
                          className="flex-1 px-4 py-2 text-base font-medium text-foreground/90 hover:bg-accent rounded-md"
                        >
                          {item.name}
                        </Link>
                        {item.items && (
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              toggleDropdown(item.name);
                            }}
                            className="p-2 -mr-2"
                          >
                            <ChevronDown 
                              className={`h-4 w-4 transition-transform ${openDropdown === item.name ? 'rotate-180' : ''}`} 
                            />
                          </button>
                        )}
                      </div>
                      {item.items && (
                        <MobileDropdownMenu 
                          items={item.items} 
                          isOpen={openDropdown === item.name} 
                        />
                      )}
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-border/10">
                  <Button 
                    className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white"
                    onClick={() => window.location.href = '/auth/login'}
                  >
                    Get Started
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;