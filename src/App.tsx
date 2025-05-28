
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";
import Home from "./pages/Home";
import CreateToken from "./pages/CreateToken";
import Market from "./pages/Market";
import Wallet from "./pages/Wallet";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Documentation from "./pages/Documentation";
import Support from "./pages/Support";
import Governance from "./pages/Governance";
import Staking from "./pages/Staking";
import Launchpad from "./pages/Launchpad";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-gradient-tokenx">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-token" element={<CreateToken />} />
            <Route path="/market" element={<Market />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/documentation" element={<Documentation />} />
            <Route path="/support" element={<Support />} />
            <Route path="/governance" element={<Governance />} />
            <Route path="/staking" element={<Staking />} />
            <Route path="/launchpad" element={<Launchpad />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
