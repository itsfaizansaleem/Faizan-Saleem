import { motion } from 'motion/react';
import { Quote } from 'lucide-react';

export function Founder() {
  return (
    <section className="py-32 bg-transparent border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-electric-blue/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen"></div>
      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center"
        >
          <Quote className="w-16 h-16 text-electric-blue/50 mb-10" />
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
            "We didn't build an agency to win awards. We built it to win market share."
          </h2>
          <p className="text-lg md:text-xl text-slate-400 mb-12 leading-relaxed max-w-3xl mx-auto">
            When I started this agency, I was tired of seeing brilliant products fail because of generic marketing built on 'best practices' instead of cold hard data. 
            We've spent the last decade building a system that turns marketing from an unpredictable expense into a predictable revenue engine.
          </p>
          <div>
            <p className="text-2xl font-bold text-white mb-2">Faizan Saleem</p>
            <p className="text-electric-blue text-sm uppercase tracking-widest font-semibold">Founder & Chief Strategist</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
