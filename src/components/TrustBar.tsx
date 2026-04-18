import { motion } from 'motion/react';

const logos = [
  "TechFlow", "GlobalGrowth", "Nexus", "Elevate", 
  "TechFlow", "GlobalGrowth", "Nexus", "Elevate" // Duplicated to ensure seamless scroll
];

export function TrustBar() {
  return (
    <section className="py-12 bg-transparent border-b border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-6">
        <p className="text-center text-sm font-medium text-slate-400 uppercase tracking-wider">
          Clients We've Scaled
        </p>
      </div>
      
      <div className="relative w-full overflow-hidden flex items-center">
        {/* Left Gradient Mask */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0F1216] to-transparent z-10 hidden sm:block"></div>
        
        <motion.div 
          className="flex space-x-16 items-center whitespace-nowrap min-w-max px-16"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 20, repeat: Infinity }}
        >
          {logos.map((logo, i) => (
            <div key={i} className="flex items-center justify-center opacity-40 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
              <span className="text-2xl font-heading font-bold font-sans text-slate-400">{logo}</span>
            </div>
          ))}
          {logos.map((logo, i) => (
            <div key={`dup-${i}`} className="flex items-center justify-center opacity-40 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
              <span className="text-2xl font-heading font-bold font-sans text-slate-400">{logo}</span>
            </div>
          ))}
        </motion.div>

        {/* Right Gradient Mask */}
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0F1216] to-transparent z-10 hidden sm:block"></div>
      </div>
    </section>
  );
}
