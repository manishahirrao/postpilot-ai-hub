import { Toaster } from "@/components/ui/toaster";
import * as React from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import NotFound from "./pages/NotFound";
import ProtectedRoute from './components/ProtectedRoute';
import { ThemeProvider } from "./components/ThemeProvider";

// Main Landing Page
// import CombinedHome from "./pages/Home/CombinedHome

// Product Pages
import ProductIndexPage from './pages/Product';
import ResumeBuilderPage from './pages/Product/ResumeBuilderPage';
import MockInterviewPage from './pages/Product/MockInterview';
import JobMatcherPage from './pages/Product/JobMatcherPage';
import CareerAnalyticsPage from './pages/Product/CareerAnalyticsPage';
import PersonalPostGeneration from './pages/Product/PersonalPostGeneration';
import { ContentGenerator as PostGeneration } from "./pages/Product/Postgeneration";
import JobBoard from './pages/Product/JobBoard';

// Solutions Pages
import SolutionsIndexPage from './pages/Solutions';
import WhyUsPage from "./pages/Solutions/WhyUsPage";
import UseCasesPage from "./pages/Solutions/UseCasesPage";

// Other Pages
import PricingPage from "./pages/PricingPage";
import ResourcesPage from "./pages/ResourcesPage";
import AboutUsPage from "./pages/About/AboutUsPage";
// import CareersPage from "./pages/About/CareersPage";
// import ManagementPage from "./pages/About/ManagementPage";
import InvestorsPage from "./pages/About/InvestorsPage";
import ContactPage from "./pages/ContactPage";
import ContactSalesPage from "./pages/ContactSalesPage";


// Auth Pages
import LoginPersonalPage from "./pages/Auth/LoginPersonalPage";
import Callback from "./pages/Auth/Callback";

// Dashboard Pages
import DashboardPage from "./pages/Dashboard/Dashboard";
// import PersonalDashboard from "./pages/Dashboard/PersonalDashboard";
// import CompanyDashboard from "./pages/Dashboard/CompanyDashboard";

// Home Pages
import PersonalHome from "./pages/Home/PersonalHome";
// import CompanyHome from "./pages/Home/CompanyHome";

// Profile Pages
import PersonalProfile from "./pages/Profile/PersonalProfile";
// import CompanyProfile from "./pages/Profile/CompanyProfile";

// Legal Pages - Imported in route definitions below

// Blog
import BlogArticle from "./pages/BlogArticle";
import Blog from "./pages/Blog";

// Chatbot
import Chatbot from "./ChatBot/Chatbot";
import PersonalRegisterPage from "./pages/Auth/PersonalRegisterPage";

import ResumeEnhancerPage from "./pages/ResumeEnhancerPage";

const queryClient = new QueryClient();

// Import MainLayout component
import MainLayout from '@/components/Layout/MainLayout';

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <TooltipProvider>
        <BrowserRouter>
          <AuthProvider>
            <Sonner position="top-center" richColors />
            <Toaster />
            <Routes>
              {/* Product Pages - No Navbar/Footer */}
              <Route path="/product" element={<ProductIndexPage />} />
              <Route path="/product/resume-builder" element={<ResumeBuilderPage />} />
              <Route path="/product/mock-interview" element={<MockInterviewPage />} />
              <Route path="/product/job-matcher" element={<JobMatcherPage />} />
              <Route path="/product/career-analytics" element={<CareerAnalyticsPage />} />
              <Route path="/product/post-generation" element={<PersonalPostGeneration />} />
              <Route path="/product/post-generator" element={<PostGeneration />} />
              <Route path="/product/job-board" element={<JobBoard />} />
              <Route path="/product/resume-enhancer" element={<ResumeEnhancerPage />} />
              
              {/* Solutions Pages */}
              <Route path="/solutions" element={<SolutionsIndexPage />} />
              
              {/* All other pages with Navbar and Footer */}
              <Route path="*" element={
                <MainLayout>
                  <Routes>
                    {/* Main Landing Page - Default Route */}
                    <Route path="/" element={<PersonalHome />} />

                    {/* Auth Routes */}
                    <Route path="/auth/login" element={<LoginPersonalPage />} />
                    <Route path="/auth/register" element={<PersonalRegisterPage />} />
                    <Route path="/auth/callback" element={<Callback />} />

                    {/* Protected Dashboard Routes */}
                    <Route
                      path="/dashboard"
                      element={
                        <ProtectedRoute>
                          <DashboardPage />
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

                    {/* Other Public Routes */}
                    <Route path="/solutions/why-us" element={<WhyUsPage />} />
                    <Route path="/solutions/use-cases" element={<UseCasesPage />} />
                    <Route path="/resources" element={<ResourcesPage />} />
                    <Route path="/blog/:slug" element={<BlogArticle />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/pricing" element={<PricingPage />} />
                    <Route path="/about" element={<AboutUsPage />} />
              
                    <Route path="/about/investors" element={<InvestorsPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/contact/legacy" element={<ContactPage />} />
                    <Route path="/contact/sales" element={<ContactSalesPage />} />

                    {/* 404 - Not Found */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </MainLayout>
              } />
            </Routes>
            <Chatbot />
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;