import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster as HotToaster } from 'react-hot-toast';
import { AuthProvider } from "@/contexts/AuthContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HowItWorksPage from "./pages/HowItWorksPage";
import AuPairDashboard from "./pages/dashboard/AuPairDashboard";
import HostFamilyDashboard from "./pages/dashboard/HostFamilyDashboard";
import MessagesPage from "./pages/dashboard/MessagesPage";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { AuthRedirect } from "./components/auth/AuthRedirect";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <HotToaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'hsl(var(--background))',
              color: 'hsl(var(--foreground))',
              border: '1px solid hsl(var(--border))',
            },
          }}
        />
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/how-it-works" element={<HowItWorksPage />} />
                <Route path="/auth-redirect" element={<AuthRedirect />} />
                
                {/* Protected Dashboard Routes */}
                <Route 
                  path="/dashboard/au-pair" 
                  element={
                    <ProtectedRoute allowedRoles={['au_pair']}>
                      <AuPairDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/dashboard/host-family" 
                  element={
                    <ProtectedRoute allowedRoles={['host_family']}>
                      <HostFamilyDashboard />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Messages Routes */}
                <Route 
                  path="/dashboard/*/messages" 
                  element={
                    <ProtectedRoute allowedRoles={['au_pair', 'host_family']}>
                      <MessagesPage />
                    </ProtectedRoute>
                  } 
                />
                
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
