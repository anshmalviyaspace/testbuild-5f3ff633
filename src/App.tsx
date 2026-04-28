import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { AuthProvider } from "@/contexts/AuthContext";

import LandingPage from "@/pages/LandingPage";
import AboutPage from "@/pages/AboutPage";
import SignupPage from "@/pages/SignupPage";
import LoginPage from "@/pages/LoginPage";
import OTPVerificationPage from "@/pages/OTPVerificationPage";
import OnboardingPage from "@/pages/OnboardingPage";
import QuizPage from "@/pages/QuizPage";
import QuizResultsPage from "@/pages/QuizResultsPage";
import DashboardLayout from "@/layouts/DashboardLayout";
import HomeView from "@/pages/dashboard/HomeView";
import TrackView from "@/pages/dashboard/TrackView";
import ProjectsView from "@/pages/dashboard/ProjectsView";
import CommunityView from "@/pages/dashboard/CommunityView";
import PortfolioView from "@/pages/dashboard/PortfolioView";
import SettingsView from "@/pages/dashboard/SettingsView";
import ToolsView from "@/pages/dashboard/ToolsView";
import PublicProfilePage from "@/pages/PublicProfilePage";
import NotFound from "@/pages/NotFound";
import ProtectedRoute from "@/components/ProtectedRoute";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, refetchOnWindowFocus: false } },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/verify-otp" element={<OTPVerificationPage />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="/profile/:username" element={<PublicProfilePage />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/quiz" element={<QuizPage />} />
              <Route path="/quiz/results" element={<QuizResultsPage />} />
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route path="home" element={<HomeView />} />
                <Route path="track" element={<TrackView />} />
                <Route path="projects" element={<ProjectsView />} />
                <Route path="community" element={<CommunityView />} />
                <Route path="tools" element={<ToolsView />} />
                <Route path="portfolio" element={<PortfolioView />} />
                <Route path="settings" element={<SettingsView />} />
              </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
