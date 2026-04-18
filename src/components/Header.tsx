import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Case Studies', href: '#work' },
    { name: 'About', href: '#about' },
    { name: 'Start Project', href: '#start-project' },
  ];

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${isScrolled ? 'py-4' : 'py-6'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className={`flex items-center justify-between rounded-2xl px-6 py-4 transition-all duration-300 ${isScrolled ? 'glass' : 'bg-transparent'}`}>
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.location.hash = '#home'}>
            <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
              <rect width="40" height="40" rx="8" fill="url(#paint0_linear)"/>
              <path d="M12 28V12H28" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 20H24" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 28L28 20" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              <defs>
                <linearGradient id="paint0_linear" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#007AFF"/>
                  <stop offset="1" stopColor="#7000FF"/>
                </linearGradient>
              </defs>
            </svg>
            <span className="font-heading font-[800] text-[20px] tracking-[-0.5px] text-white">FAIZAN <span className="text-electric-blue">SALEEM</span></span>
          </div>

          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-sm font-medium text-slate-300 hover:text-electric-blue transition-colors">
                {link.name}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2 text-slate-400" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 right-0 mt-2 mx-6"
          >
            <div className="glass rounded-2xl p-6 flex flex-col space-y-4 shadow-xl">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-lg font-medium text-white border-b border-white/10 pb-4"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
