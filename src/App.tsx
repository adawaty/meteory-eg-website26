import { Navbar, Footer } from "@/components/Layout";
import TrustBadges from "@/components/TrustBadges";
import { Route, Switch, Router } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import Home from "@/pages/Home";
import Products from "@/pages/Products";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Contact from "@/pages/Contact";
import Projects from "@/pages/Projects";
import Industries from "@/pages/Industries";
import Resources from "@/pages/Resources";
import LeadCalculator from "@/pages/LeadCalculator";
import Quote from "@/pages/Quote";
import Datasheet from "@/pages/Datasheet";
import Admin from "@/pages/Admin";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import ErrorBoundary from "@/components/ErrorBoundary";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Component to handle scroll on route change
function ScrollToTop() {
  const [location] = useHashLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

function AppRoutes() {
  const [location] = useHashLocation();

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            <Switch>
          <Route path="/" component={Home} />
          <Route path="/products" component={Products} />
          <Route path="/about" component={About} />
          <Route path="/services" component={Services} />
          <Route path="/contact" component={Contact} />
          <Route path="/projects" component={Projects} />
          <Route path="/industries" component={Industries} />
          <Route path="/resources" component={Resources} />
          <Route path="/calculator" component={LeadCalculator} />
          <Route path="/quote" component={Quote} />
          <Route path="/products/:id/datasheet" component={Datasheet} />
          <Route path="/admin" component={Admin} />
          <Route path="/login" component={Login} />
          <Route component={NotFound} />
            </Switch>
          </motion.div>
        </AnimatePresence>
      </main>
      <TrustBadges />
      <Footer />
      <Toaster />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <LanguageProvider>
          <TooltipProvider>
            <Router hook={useHashLocation}>
              <AppRoutes />
            </Router>
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
