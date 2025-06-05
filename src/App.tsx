
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Layout from "@/components/Layout/Layout";
import NotFound from "./pages/NotFound";

// Main Landing Page
import CombinedHome from "./pages/Home/CombinedHome";

// Product Pages
import LinkedInPostsPage from "./pages/Product/LinkedInPostsPage";
import ResumeBuilderPage from "./pages/Product/ResumeBuilderPage";
import JobMatcherPage from "./pages/Product/JobMatcherPage";
import CareerAnalyticsPage from "./pages/Product/CareerAnalyticsPage";
import FreeJobPostingsPage from "./pages/Product/FreeJobPostingsPage";
import HiringOutsourcingPage from "./pages/Product/HiringOutsourcingPage";

// Solutions Pages
import WhyUsPage from "./pages/Solutions/WhyUsPage";
import UseCasesPage from "./pages/Solutions/UseCasesPage";

// Other Pages
import PricingPage from "./pages/PricingPage";
import ResourcesPage from "./pages/ResourcesPage";
import AboutUsPage from "./pages/About/AboutUsPage";
import CareersPage from "./pages/About/CareersPage";
import ManagementPage from "./pages/About/ManagementPage";
import InvestorsPage from "./pages/About/InvestorsPage";
import ContactPage from "./pages/ContactPage";
import SupportPage from "./pages/SupportPage";
import ContactSalesPage from "./pages/ContactSalesPage";

// Auth Pages
import LoginPage from "./pages/Auth/LoginPage";
import LoginPersonalPage from "./pages/Auth/LoginPersonalPage";
import LoginCompanyPage from "./pages/Auth/LoginCompanyPage";
import RegisterPage from "./pages/Auth/RegisterPage";

// Dashboard Pages
import DashboardPage from "./pages/Dashboard/DashboardPage";
import PersonalDashboard from "./pages/Dashboard/PersonalDashboard";
import CompanyDashboard from "./pages/Dashboard/CompanyDashboard";

// Home Pages
import PersonalHome from "./pages/Home/PersonalHome";
import CompanyHome from "./pages/Home/CompanyHome";

// Profile Pages
import PersonalProfile from "./pages/Profile/PersonalProfile";
import CompanyProfile from "./pages/Profile/CompanyProfile";

// Legal Pages
import TermsPage from "./pages/Legal/TermsPage";
import CookiePolicyPage from "./pages/Legal/CookiePolicyPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              {/* Main Landing Page */}
              <Route path="/" element={<CombinedHome />} />
              
              {/* Specific Home Routes */}
              <Route path="/home/personal" element={<PersonalHome />} />
              <Route path="/home/company" element={<CompanyHome />} />
              
              {/* Product Routes */}
              <Route path="/product/linkedin-posts" element={<LinkedInPostsPage />} />
              <Route path="/product/resume-builder" element={<ResumeBuilderPage />} />
              <Route path="/product/job-matcher" element={<JobMatcherPage />} />
              <Route path="/product/career-analytics" element={<CareerAnalyticsPage />} />
              <Route path="/product/free-job-postings" element={<FreeJobPostingsPage />} />
              <Route path="/product/hiring-outsourcing" element={<HiringOutsourcingPage />} />
              
              {/* Solutions Routes */}
              <Route path="/solutions/why-us" element={<WhyUsPage />} />
              <Route path="/solutions/use-cases" element={<UseCasesPage />} />
              
              {/* Other Routes */}
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/resources" element={<ResourcesPage />} />
              
              {/* About Routes */}
              <Route path="/about" element={<AboutUsPage />} />
              <Route path="/about/careers" element={<CareersPage />} />
              <Route path="/about/management" element={<ManagementPage />} />
              <Route path="/about/investors" element={<InvestorsPage />} />
              
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/support" element={<SupportPage />} />
              <Route path="/contact-sales" element={<ContactSalesPage />} />
              
              {/* Auth Routes */}
              <Route path="/login/personal" element={<LoginPersonalPage />} />
              <Route path="/login/company" element={<LoginCompanyPage />} />
              <Route path="/auth/login" element={<LoginPage />} />
              <Route path="/auth/login/personal" element={<LoginPersonalPage />} />
              <Route path="/auth/login/companies" element={<LoginCompanyPage />} />
              <Route path="/auth/register" element={<RegisterPage />} />
              
              {/* Profile Routes */}
              <Route path="/profile/personal" element={<PersonalProfile />} />
              <Route path="/profile/company" element={<CompanyProfile />} />
              
              {/* Dashboard Routes */}
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/dashboard/personal" element={<PersonalDashboard />} />
              <Route path="/dashboard/company" element={<CompanyDashboard />} />
              
              {/* Legal Routes */}
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/cookie-policy" element={<CookiePolicyPage />} />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
