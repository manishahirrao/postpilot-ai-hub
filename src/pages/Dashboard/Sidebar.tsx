import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CreditCard,
  TrendingUp,
  User,
  Award,
  Shield,
  LayoutDashboard,
  Pencil,
  Briefcase,
  Lightbulb,
  ChevronLeft,
  ChevronRight,
  FileText,
  Users as UsersIcon,
  Cpu,
  Handshake,
  Mail
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  subItems?: MenuItem[];
}

const menuItems: MenuItem[] = [
  { id: 'dashboard', label: 'Home', icon: LayoutDashboard, href: '/' },
  {
    id: 'about',
    label: 'About',
    icon: UsersIcon,
    href: '/about',
    subItems: [
      { id: 'about-us', label: 'About Us', icon: User, href: '/about' },
      { id: 'careers', label: 'Careers', icon: Briefcase, href: '/about/careers' },
      { id: 'management', label: 'Management Team', icon: User, href: '/about/management' },
      { id: 'investors', label: 'Investor Relations', icon: Handshake, href: '/about/investors' },
      { id: 'contact', label: 'Contact Us', icon: Mail, href: '/contact' }
    ]
  },
  {
    id: 'solutions',
    label: 'Solution',
    icon: Lightbulb,
    href: '/solution',
    subItems: [
      { id: 'why-us', label: 'Why Us?', icon: Award, href: '/solutions/why-us' },
      { id: 'use-cases', label: 'By Use Case', icon: Briefcase, href: '/solutions/use-cases' }
    ]
  },
  { 
    id: 'resources', 
    label: 'Resources', 
    icon: FileText, 
    href: '/resources' 
  },
  {
    id: 'products',
    label: 'Products',
    icon: Cpu,
    href: '/product',
    subItems: [
      { id: 'linkedin-post', label: 'LinkedIn Post Builder', icon: Pencil, href: '/product/personal-post-generation' },
      { id: 'resume', label: 'Resume Enhancer', icon: Award, href: '/product/resume-builder' },
      { id: 'career-match', label: 'Career Match', icon: TrendingUp, href: '/product/job-matcher' },
      { id: 'career-insights', label: 'Career Insights & Tips', icon: Shield, href: '/product/career-analytics' }
    ]
  },
  { 
    id: 'pricing', 
    label: 'Pricing', 
    icon: CreditCard, 
    href: '/pricing' 
  }
];



const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle }) => {
  const location = useLocation();

  const isActive = (href: string) => {
    if (href === '/dashboard' && location.pathname === '/') return true;
    return location.pathname.startsWith(href) && href !== '#';
  };

  // No toggle functionality needed - all menus are always expanded

  const renderMenuItem = (item: MenuItem, isSubmenu = false) => {
    const Icon = item.icon;
    const active = isActive(item.href);
    const hasSubItems = !!item.subItems;
    const isParentActive = hasSubItems && item.subItems?.some(subItem => isActive(subItem.href));

    const baseClass = 'flex items-center w-full text-sm font-medium transition-colors duration-150';
    const iconClass = 'h-5 w-5 flex-shrink-0';
    const textClass = 'font-medium';
    const linkClass = cn(
      baseClass,
      'py-2 px-3 rounded-md',
      isSubmenu ? 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800',
      active && !isSubmenu && 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold',
      active && isSubmenu && 'text-blue-600 dark:text-blue-400 font-semibold',
      'dark:hover:bg-gray-800/50'
    );

    if (hasSubItems) {
      return (
        <div key={item.id} className="mb-0.5">
          <div className={cn(
            baseClass,
            'py-2 px-3 rounded-md',
            'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800',
            'cursor-default',
            'dark:hover:bg-gray-800/50'
          )}>
            <div className="flex items-center">
              <Icon 
                className={cn(
                  iconClass,
                  isParentActive ? 'text-blue-600' : 'text-gray-400',
                  !collapsed && 'mr-3'
                )} 
              />
              {!collapsed && (
                <span className={cn(textClass, isParentActive && 'text-gray-900 font-semibold')}>
                  {item.label}
                </span>
              )}
            </div>
          </div>
          {!collapsed && item.subItems && (
            <div className="pl-8 space-y-1 mt-1">
              {item.subItems.map(subItem => renderMenuItem(subItem, true))}
            </div>
          )}
        </div>
      );
    }

    return (
      <Link
        key={item.id}
        to={item.href}
        className={linkClass}
        title={collapsed ? item.label : undefined}
      >
        <div className="flex items-center">
          <Icon 
            className={cn(
              iconClass,
              active ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600',
              !collapsed && 'mr-3',
              isSubmenu && collapsed && 'ml-1'
            )} 
          />
          {!collapsed && (
            <span className={cn(textClass, active && 'text-blue-600 font-semibold')}>
              {item.label}
            </span>
          )}
        </div>
      </Link>
    );
  };

  return (
    <motion.aside
      initial={false}
      animate={{ 
        width: collapsed ? 64 : 240,
        transition: { duration: 0.2, ease: 'easeInOut' }
      }}
      className="fixed left-0 top-0 h-full bg-white dark:bg-gray-900 z-40 flex flex-col border-r border-gray-200 dark:border-gray-800"
    >
      {/* Logo/Brand */}
      <div className={cn(
        "flex items-center h-16 px-4 border-b border-gray-200 dark:border-gray-800",
        collapsed ? 'justify-center' : 'justify-between',
        'bg-white dark:bg-gray-900'
      )}>
        {!collapsed && (
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-lg bg-blue-500"></div>
            <span className="font-bold text-lg ml-3 text-gray-800 dark:text-gray-200">Vortex</span>
          </div>
        )}
        {collapsed && (
          <div className="w-8 h-8 rounded-lg bg-blue-500"></div>
        )}
      </div>

      {/* Collapse Button */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-6 w-6 h-6 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-full flex items-center justify-center z-50 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? (
          <ChevronLeft className={cn("h-4 w-4 text-gray-500", collapsed && "hidden")} />
        ) : (
          <ChevronRight className={cn("h-4 w-4 text-gray-500", !collapsed && "hidden")} />
        )}
      </button>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-2">
        {/* Write Post Button */}
     
        
        {/* Menu Items */}
        <div className="space-y-1">
          {menuItems.map(item => renderMenuItem(item))}
        </div>
      </nav>

      {/* User Profile Section */}
      <div className="border-t border-gray-200 dark:border-gray-800 p-2">
        <div className="flex items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
          <img 
            className="h-8 w-8 rounded-full object-cover mr-3" 
            src="https://placehold.co/100x100" 
            alt="User avatar"
          />
          {!collapsed && (
            <div>
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">Manish</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">m@gmail.com</p>
            </div>
          )}
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
