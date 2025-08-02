import { useState, FC, lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import DashboardNavbar from './DashboardNavbar';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

// Placeholder components for dashboard roles
const PlaceholderDashboard = () => <div>Loading dashboard...</div>;

// Dynamic imports for better code splitting
const ContentCreatorDashboard = lazy(() => Promise.resolve({ default: () => <PlaceholderDashboard /> }));
const JobSeekerDashboard = lazy(() => Promise.resolve({ default: () => <PlaceholderDashboard /> }));
const EmployerDashboard = lazy(() => Promise.resolve({ default: () => <PlaceholderDashboard /> }));
const HrAgencyDashboard = lazy(() => Promise.resolve({ default: () => <PlaceholderDashboard /> }));

// Import page components for menu items
const AboutPage = lazy(() => import('@/pages/About/AboutUsPage'))
const InvestorRelations = lazy(() => import('@/pages/About/InvestorsPage'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));
const SolutionsPage = lazy(() => import('@/pages/Solutions/WhyUsPage'));
const UseCasesPage = lazy(() => import('@/pages/Solutions/UseCasesPage'));
const ResourcesPage = lazy(() => import('@/pages/ResourcesPage'));
const LinkedInPostBuilder = lazy(() => import('@/pages/Product/PersonalPostGeneration'));
const ResumeEnhancer = lazy(() => import('@/pages/Product/ResumeBuilderPage'));
const CareerMatch = lazy(() => import('@/pages/Product/JobMatcherPage'));
const CareerInsights = lazy(() => import('@/pages/Product/CareerAnalyticsPage'));
const PricingPage = lazy(() => import('@/pages/PricingPage'));

// This component determines which dashboard to show based on user role
const RoleSpecificDashboard: FC = () => {
  const { user, isLoading } = useAuth();
  const profile = user?.profile;

  if (isLoading) {
    return <div>Loading dashboard...</div>; // Or a spinner component
  }

  switch (profile?.user_type) {
    case 'content_creator':
      return <ContentCreatorDashboard />;
    case 'job_seeker':
      return <JobSeekerDashboard />;
    case 'employer':
      return <EmployerDashboard />;
    case 'hr_agency':
      return <HrAgencyDashboard />;
    default:
      // Fallback for unknown roles or if profile is not loaded
      return <div>Welcome! Your dashboard is being set up.</div>;
  }
};

const Dashboard: FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <DashboardNavbar />
      <Suspense fallback={<div>Loading dashboard components...</div>}>
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          collapsed={sidebarCollapsed} 
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
        />
        <main className={cn(
          "transition-all duration-300 ease-in-out flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900",
          sidebarCollapsed ? "ml-20" : "ml-64"
        )}>
          <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <Routes>
              {/* Index route - role-specific dashboard */}
              <Route path="/" element={<RoleSpecificDashboard />} />
              
              {/* About section routes */}
              <Route path="/about" element={<AboutPage />} />
              <Route path="/about/investors" element={<InvestorRelations />} />
              <Route path="/contact" element={<ContactPage />} />
              
              {/* Solutions section routes */}
              <Route path="/solution" element={<Navigate to="/solutions/why-us" replace />} />
              <Route path="/solutions/why-us" element={<SolutionsPage />} />
              <Route path="/solutions/use-cases" element={<UseCasesPage />} />
              
              {/* Resources */}
              <Route path="/resources" element={<ResourcesPage />} />
              
              {/* Products section routes */}
              <Route path="/product" element={<Navigate to="/product/personal-post-generation" replace />} />
              <Route path="/product/personal-post-generation" element={<LinkedInPostBuilder />} />
              <Route path="/product/resume-builder" element={<ResumeEnhancer />} />
              <Route path="/product/job-matcher" element={<CareerMatch />} />
              <Route path="/product/career-analytics" element={<CareerInsights />} />
              
              {/* Pricing */}
              <Route path="/pricing" element={<PricingPage />} />
              
              {/* Redirect any unmatched routes to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </main>
        </div>
      </Suspense>
    </div>
  );
};

export default Dashboard;
