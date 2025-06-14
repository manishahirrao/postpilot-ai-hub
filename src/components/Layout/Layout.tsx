import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronUp, Wifi, WifiOff, AlertTriangle } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import ChatWidget from './ChatWidget';
import { useAuth } from '@/contexts/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
  showFooter?: boolean;
  showChatWidget?: boolean;
  showScrollToTop?: boolean;
  className?: string;
}

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Layout Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

// Loading Spinner Component
const LoadingSpinner: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      <p className="mt-4 text-gray-600 font-medium">Loading PostPilot...</p>
    </div>
  </div>
);

// Error Fallback Component
const ErrorFallback: React.FC<{ retry?: () => void }> = ({ retry }) => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-white">
    <div className="text-center max-w-md mx-auto px-4">
      <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h1>
      <p className="text-gray-600 mb-6">
        We're sorry, but something unexpected happened. Please try refreshing the page.
      </p>
      {retry && (
        <button
          onClick={retry}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  </div>
);

// Network Status Component
const NetworkStatus: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showOfflineMessage, setShowOfflineMessage] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowOfflineMessage(false);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowOfflineMessage(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!showOfflineMessage) return null;

  return (
    <div className={`fixed top-16 left-0 right-0 z-40 transition-all duration-300 ${
      !isOnline ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="bg-red-600 text-white py-2 px-4 text-center text-sm font-medium flex items-center justify-center">
        <WifiOff className="w-4 h-4 mr-2" />
        You're currently offline. Some features may not be available.
      </div>
    </div>
  );
};

// Scroll to Top Component
const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-24 left-6 z-50 w-12 h-12 bg-white border border-gray-200 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center group"
      aria-label="Scroll to top"
    >
      <ChevronUp className="w-5 h-5 text-gray-600 group-hover:text-indigo-600 transition-colors" />
    </button>
  );
};

// Page Transition Component
const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 150);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className={`transition-opacity duration-150 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
      {children}
    </div>
  );
};

// Skip Navigation Component
const SkipNavigation: React.FC = () => (
  <a
    href="#main-content"
    className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-indigo-600 text-white px-4 py-2 rounded-lg z-50 font-medium"
  >
    Skip to main content
  </a>
);

// Breadcrumb Component
const Breadcrumb: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(Boolean);

  if (pathnames.length <= 1) return null;

  return (
    <nav className="bg-gray-50 border-b border-gray-200" aria-label="Breadcrumb">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center py-3 text-sm">
          <a href="/" className="text-gray-500 hover:text-gray-700 transition-colors">
            Home
          </a>
          {pathnames.map((pathname, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;
            const displayName = pathname.charAt(0).toUpperCase() + pathname.slice(1).replace(/-/g, ' ');

            return (
              <React.Fragment key={pathname}>
                <span className="mx-2 text-gray-400">/</span>
                {isLast ? (
                  <span className="text-gray-900 font-medium">{displayName}</span>
                ) : (
                  <a
                    href={routeTo}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {displayName}
                  </a>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

const Layout: React.FC<LayoutProps> = ({
  children,
  showFooter = true,
  showChatWidget = true,
  showScrollToTop = true,
  className = ''
}) => {
  const { isLoading } = useAuth();
  const location = useLocation();

  // Pages where we might want different behavior
  const isAuthPage = location.pathname.startsWith('/auth') || 
                     location.pathname.startsWith('/login') || 
                     location.pathname.startsWith('/register');
  
  const isLandingPage = location.pathname === '/';

  // Show loading spinner during auth loading
  if (isLoading) {
    return <LoadingSpinner />;
  }

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <ErrorBoundary fallback={<ErrorFallback retry={handleRetry} />}>
      <div className={`min-h-screen flex flex-col w-full bg-white ${className}`}>
        {/* Skip Navigation for Accessibility */}
        <SkipNavigation />
        
        {/* Network Status */}
        <NetworkStatus />
        
        {/* Navigation */}
        <Navbar />
        
        {/* Breadcrumb (only show on certain pages) */}
        {!isAuthPage && !isLandingPage && <Breadcrumb />}
        
        {/* Main Content */}
        <main 
          id="main-content" 
          className="flex-1 focus:outline-none" 
          role="main"
          tabIndex={-1}
        >
          <PageTransition>
            {children}
          </PageTransition>
        </main>
        
        {/* Footer */}
        {showFooter && !isAuthPage && <Footer />}
        
       
        
        {/* Scroll to Top */}
        {showScrollToTop && <ScrollToTop />}
      </div>
    </ErrorBoundary>
  );
};

export default Layout;