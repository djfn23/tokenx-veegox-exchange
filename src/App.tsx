
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import Index from "./pages/Index";
import Home from "./pages/Home";
import Market from "./pages/Market";
import CreateToken from "./pages/CreateToken";
import Crowdfunding from "./pages/Crowdfunding";
import ProjectDetails from "./pages/ProjectDetails";
import Launchpad from "./pages/Launchpad";
import Staking from "./pages/Staking";
import Governance from "./pages/Governance";
import Wallet from "./pages/Wallet";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Documentation from "./pages/Documentation";
import Support from "./pages/Support";
import Explorer from "./pages/Explorer";
import Deployment from "./pages/Deployment";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-tokenx-dark text-white">
            <Navbar />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/home" element={<Home />} />
              <Route path="/market" element={<Market />} />
              <Route path="/create-token" element={<CreateToken />} />
              <Route path="/crowdfunding" element={<Crowdfunding />} />
              <Route path="/project/:id" element={<ProjectDetails />} />
              <Route path="/launchpad" element={<Launchpad />} />
              <Route path="/staking" element={<Staking />} />
              <Route path="/governance" element={<Governance />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/about" element={<About />} />
              <Route path="/documentation" element={<Documentation />} />
              <Route path="/support" element={<Support />} />
              <Route path="/explorer" element={<Explorer />} />
              <Route path="/deployment" element={<Deployment />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
