import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Main sections
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import AIAutomation from "@/components/AIAutomation";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Clients from "@/components/Clients";
import Footer from "@/components/Footer";

// Pages
import ProjectDetail from "@/pages/ProjectDetail";
import Admin from "@/pages/Admin";
import { trackPageView } from "@/lib/analytics";

const queryClient = new QueryClient();

function Portfolio() {
  useEffect(() => { trackPageView(); }, []);
  return (
    <div className="min-h-[100dvh] w-full text-foreground selection:bg-cyan/30 selection:text-cyan">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <AIAutomation />
        <Services />
        <Clients />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Portfolio} />
      <Route path="/project/:id" component={ProjectDetail} />
      <Route path="/admin" component={Admin} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
