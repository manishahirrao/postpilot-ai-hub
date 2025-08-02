import { useState, useRef, useEffect, Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, MessageSquare, Award, TrendingUp, Shield, Mic2, Briefcase, User, Handshake, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import AgentOSLogo from "../Logo/logo";

interface NavItem {
  name: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  desc?: string;
  items?: NavItem[];
}

const aboutItems: NavItem[] = [
  { name: 'About Us', href: '/about', icon: User, desc: 'Our story, mission, and values' },
  { name: 'Investors', href: '/about/investors', icon: Handshake, desc: 'Information for our investors' },
  
];

const solutionItems: NavItem[] = [
  { name: 'Why ContentHelm?', href: '/solutions/why-us', icon: Award, desc: 'Discover your competitive advantage' },
  { name: 'Use Cases', href: '/solutions/use-cases', icon: Briefcase, desc: 'Solutions for every industry' }
];

const productItems: NavItem[] = [
  { name: 'LinkedIn Post Builder', href: '/product/post-generation', icon: MessageSquare, desc: 'Craft compelling, engaging posts' },
  { name: 'Resume Enhancer', href: '/product/resume-enhancer', icon: Award, desc: 'Optimize your resume for success' },
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

const DropdownMenu = ({ items }: { items: NavItem[] }) => (
  <div className="grid grid-cols-1 gap-1.5 p-2 w-full min-w-[280px]">
    {items.map((item) => (
      <Link
        to={item.href}
        key={item.href}
        className="group relative flex items-start gap-3 rounded-lg p-3 text-sm transition-all duration-200 hover:bg-gray-50 hover:shadow-sm focus:outline-none w-full text-left border border-transparent hover:border-border/20"
      >
        {item.icon && (
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 text-primary">
            <item.icon className="h-4.5 w-4.5 transition-transform group-hover:scale-110" />
          </div>
        )}
        <div className="flex-1 space-y-1">
          <p className="font-medium text-gray-900 group-hover:text-primary transition-colors">{item.name}</p>
          <p className="text-xs text-gray-500 leading-snug">{item.desc}</p>
        </div>
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
      </Link>
    ))}
  </div>
);

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const dropdownTimeout = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  const handleMouseEnter = (name: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setOpenDropdown(name);
  };

  const handleMouseLeave = () => {
    dropdownTimeout.current = window.setTimeout(() => {
      setOpenDropdown(null);
    }, 100);
  };

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled 
          ? "border-b border-border/60 bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent"
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 hover:no-underline">
            <AgentOSLogo />
            <span className="text-lg font-semibold text-foreground">ContentHelm</span>
          </Link>
          
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div 
                key={item.name}
                className="relative"
                onMouseEnter={() => item.items && handleMouseEnter(item.name)}
                onMouseLeave={() => item.items && handleMouseLeave()}
              >
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    location.pathname.startsWith(item.href) && item.href !== '/'
                      ? 'bg-accent text-accent-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                    location.pathname === '/' && item.href === '/' 
                      ? 'bg-accent text-accent-foreground'
                      : ''
                  )}
                >
                  {item.name}
                  {item.items && <ChevronDown className="h-4 w-4" />}
                </Link>

                <AnimatePresence>
                  {item.items && openDropdown === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute left-0 top-full mt-1.5 w-auto origin-top-left rounded-xl border bg-white p-1.5 text-foreground shadow-lg z-50 ring-1 ring-border/10"
                    >
                      <DropdownMenu items={item.items} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden lg:flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link to="/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link to="/signup">Get Started</Link>
            </Button>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden"
          >
            <div className="container space-y-2 p-4">
              {navItems.map((item) => (
                <Fragment key={item.name}>
                  {item.items ? (
                    <div>
                      <button
                        onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
                        className="flex w-full items-center justify-between rounded-md py-2 text-sm font-medium"
                      >
                        {item.name}
                        <ChevronDown className={cn('h-4 w-4 transition-transform', openDropdown === item.name && 'rotate-180')} />
                      </button>
                      <AnimatePresence>
                        {openDropdown === item.name && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden pl-4"
                          >
                            {item.items.map((subItem) => (
                              <Link
                                key={subItem.href}
                                to={subItem.href}
                                className="block rounded-md py-2 text-muted-foreground"
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link to={item.href} className="block rounded-md py-2 text-sm font-medium">
                      {item.name}
                    </Link>
                  )}
                </Fragment>
              ))}
              <div className="flex flex-col gap-2 pt-4">
                <Button variant="outline" asChild>
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link to="/signup">Get Started</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;