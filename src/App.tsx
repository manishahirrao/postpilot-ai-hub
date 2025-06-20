import { Toaster } from "@/components/ui/toaster";
import React from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Layout from "@/components/Layout/Layout";
import NotFound from "./pages/NotFound";
import ProtectedRoute from './components/ProtectedRoute';

// Main Landing Page
import CombinedHome from "./pages/Home/CombinedHome";

// Product Pages
import LinkedInPostsPage from "./pages/Product/CompanyPostGeneration";
import ResumeBuilderPage from "./pages/Product/ResumeBuilderPage";
import JobMatcherPage from "./pages/Product/JobMatcherPage";
import CareerAnalyticsPage from "./pages/Product/CareerAnalyticsPage";
import FreeJobPostingsPage from "./pages/Product/FreeJobPostingsPage";
import HiringOutsourcingPage from "./pages/Product/HiringOutsourcingPage";
import AutomationsPage from "./pages/Product/AutomationsPage";
import VoiceAgentsPage from "./pages/Product/VoiceAgentsPage";
import AdsGeneratorPage from "./pages/Product/AdsGeneratorPage";
import PersonalPostGeneration from "./pages/Product/PersonalPostGeneration";
import SupportPage from "./pages/Product/SupportPage";
import ProductSupportPage from "./pages/Product/SupportPage";
import LinkedInPostGenerator from "./pages/Dashboard/LinkedInPostGenerator";

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
import ContactSalesPage from "./pages/ContactSalesPage";

// Auth Pages
import LoginPersonalPage from "./pages/Auth/LoginPersonalPage";
import LoginCompanyPage from "./pages/Auth/LoginCompanyPage";
import PersonalRegisterPage from "./pages/Auth/PersonalRegisterPage";
import CompanyRegisterPage from "./pages/Auth/CompanyRegisterPage";
import PasswordResetPage from "./pages/Auth/PasswordResetPage";
import UpdatePasswordPage from "./pages/Auth/UpdatePasswordPage";
import VerifyEmailPage from './pages/Auth/VerifyEmailPage';
import ForgotPassword from './pages/Auth/ForgotPassword';

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
import PrivacyPolicyPage from "./pages/Legal/PrivacyPolicyPage";

// Blog
import BlogArticle from "./pages/BlogArticle";
import Blog from "./pages/Blog";

// Chatbot
import Chatbot from "./ChatBot/Chatbot";
import ChatWidget from "./components/Layout/ChatWidget";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
      <AuthProvider>
        <Sonner position="top-center" richColors />
        <Layout>
            <Routes>
              {/* Main Landing Page - Default Route */}
              <Route path="/" element={<CombinedHome />} />

               {/* Auth Routes */}
               <Route path="/auth/login/personal" element={<LoginPersonalPage />} />
               <Route path="/auth/login/company" element={<LoginCompanyPage />} />
               <Route path="/auth/register/personal" element={<PersonalRegisterPage />} />
               <Route path="/auth/register/company" element={<CompanyRegisterPage />} />
               <Route path="/auth/forgot-password" element={<ForgotPassword />} />
               <Route path="/auth/verify-email" element={<VerifyEmailPage />} />
               <Route path="/auth/reset-password" element={<PasswordResetPage />} />
               <Route path="/auth/update-password" element={<UpdatePasswordPage />} />

              {/* Protected Dashboard Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/personal"
                element={
                  <ProtectedRoute>
                    <PersonalDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/company"
                element={
                  <ProtectedRoute>
                    <CompanyDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Protected Profile Routes */}
              <Route
                path="/profile/personal"
                element={
                  <ProtectedRoute>
                    <PersonalProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile/company"
                element={
                  <ProtectedRoute>
                    <CompanyProfile />
                  </ProtectedRoute>
                }
              />

              {/* Public Product Routes */}
              <Route path="/product/linkedin-posts" element={<LinkedInPostsPage />} />
              <Route path="/product/resume-builder" element={<ResumeBuilderPage />} />
              <Route path="/product/job-matcher" element={<JobMatcherPage />} />
              <Route path="/product/career-analytics" element={<CareerAnalyticsPage />} />
              <Route path="/product/free-job-postings" element={<FreeJobPostingsPage />} />
              <Route path="/product/hiring-outsourcing" element={<HiringOutsourcingPage />} />
              <Route path="/product/personalpostgeneration" element={<PersonalPostGeneration />} />
              <Route path="/product/ads-generator" element={<AdsGeneratorPage />} />
              <Route path="/product/automation-page" element={<AutomationsPage />} />
              <Route path="/product/support-page" element={<SupportPage />} />
              <Route path="/product/voice-agent" element={<VoiceAgentsPage />} />

              {/* Other Public Routes */}
              <Route path="/solutions/why-us" element={<WhyUsPage />} />
              <Route path="/solutions/use-cases" element={<UseCasesPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/blog/:slug" element={<BlogArticle />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/about" element={<AboutUsPage />} />
              <Route path="/about/careers" element={<CareersPage />} />
              <Route path="/about/management" element={<ManagementPage />} />
              <Route path="/about/investors" element={<InvestorsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/contact-sales" element={<ContactSalesPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/cookie-policy" element={<CookiePolicyPage />} />
              <Route path="/privacy" element={<PrivacyPolicyPage />} />

              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
          <Chatbot/>
        </AuthProvider>
        </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
