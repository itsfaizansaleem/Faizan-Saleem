import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { Services } from './components/Services';
import { TechStack } from './components/TechStack';
import { ChatBot } from './components/ChatBot';
import { CaseStudies } from './components/CaseStudies';
import { About } from './components/About';
import { Values } from './components/Values';
import { Founder } from './components/Founder';
import { ProjectSection } from './components/ProjectSection';
import { Testimonials } from './components/Testimonials';
import { Pricing } from './components/Pricing';
import { Process } from './components/Process';
import { FAQ } from './components/FAQ';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { OnboardingModal } from './components/OnboardingModal';
import { PortfolioModal } from './components/PortfolioModal';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState(window.location.hash || '#home');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showPortfolio, setShowPortfolio] = useState(false);

  useEffect(() => {
    const handleHashChange = () => setCurrentRoute(window.location.hash || '#home');
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const handleOpenModal = (e: CustomEvent) => {
      if (e.detail === 'onboarding') setShowOnboarding(true);
      if (e.detail === 'portfolio') setShowPortfolio(true);
    };
    window.addEventListener('openModal' as any, handleOpenModal);
    return () => window.removeEventListener('openModal' as any, handleOpenModal);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentRoute]);

  return (
    <div className="bg-[var(--bg)] min-h-screen selection:bg-electric-blue selection:text-white relative pb-0">
      {/* Background grain texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[1] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      <div className="relative z-[2]">
        <Header />
        
        <AnimatePresence mode="wait">
          {currentRoute === '#privacy' ? (
            <motion.div 
              key="privacy"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <PrivacyPolicy />
            </motion.div>
          ) : (
            <motion.main 
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Hero />
              <TrustBar />
              <Services />
              <TechStack />
              <CaseStudies />
              <About />
              <Values />
              <Founder />
              <ProjectSection />
              <Testimonials />
              <Pricing onGetStarted={() => setShowOnboarding(true)} />
              <Process />
              <FAQ />
              <Newsletter />
            </motion.main>
          )}
        </AnimatePresence>

        <Footer />
        
        <AnimatePresence>
          {showOnboarding && <OnboardingModal onClose={() => setShowOnboarding(false)} />}
        </AnimatePresence>

        <AnimatePresence>
          {showPortfolio && <PortfolioModal onClose={() => setShowPortfolio(false)} />}
        </AnimatePresence>
        
        <ChatBot openForm={() => setShowOnboarding(true)} />
      </div>
    </div>
  );
}
