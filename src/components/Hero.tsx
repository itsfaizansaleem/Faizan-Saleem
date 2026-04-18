import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Play } from 'lucide-react';
import { useRef } from 'react';

export function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} id="home" className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden bg-transparent">
      {/* Background Abstract Elements */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-electric-blue/10 rounded-full blur-[100px] mix-blend-screen animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] mix-blend-screen animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] mix-blend-screen animate-blob animation-delay-4000"></div>
        
        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0F1216]/50 to-[#0F1216]"></div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-[11px] uppercase tracking-[2px] text-electric-blue font-[700] mb-[16px] glass px-4 py-1.5 rounded-full border border-electric-blue/20">
              Modern Authority
            </span>
          </motion.div>

          <motion.h1 
            className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-8 leading-tight"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
          >
            Scaling Brands Through <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-purple-600 inline-block hover:scale-105 transition-transform duration-500 cursor-default">Data-Driven Creativity.</span>
          </motion.h1>

          <motion.p 
            className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          >
            We transform data into strategy and strategy into revenue. Stop guessing and start scaling with performance marketing engineered for modern growth.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('openModal', { detail: 'onboarding' }))}
              className="w-full sm:w-auto inline-flex items-center justify-center px-[28px] py-[14px] text-[13px] font-semibold text-white bg-electric-blue border border-transparent rounded-[8px] hover:-translate-y-0.5 transition-all"
            >
              Get Started
            </button>
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('openModal', { detail: 'portfolio' }))}
              className="w-full sm:w-auto inline-flex items-center justify-center px-[28px] py-[14px] text-[13px] font-semibold text-white bg-transparent border border-white/10 rounded-[8px] hover:bg-white/5 transition-all"
            >
              View Portfolio
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
