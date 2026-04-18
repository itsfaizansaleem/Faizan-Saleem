import { motion } from 'motion/react';
import { Target, Zap, ShieldCheck } from 'lucide-react';

export function About() {
  return (
    <section id="about" className="py-24 bg-transparent border-t border-white/5 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-electric-blue/5 pointer-events-none z-0"></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, x: -15, scale: 0.98 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-electric-blue rounded-3xl translate-x-4 translate-y-4 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform duration-500"></div>
            <img 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000" 
              alt="Team at work" 
              loading="lazy"
              className="relative z-10 w-full h-[600px] object-cover rounded-3xl grayscale hover:grayscale-0 transition-all duration-700 hover:scale-[1.02]"
              referrerPolicy="no-referrer"
            />
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="absolute -bottom-10 -left-10 z-20 glass bg-slate-900/90 text-white p-6 rounded-2xl max-w-[240px] hover:scale-[1.05] hover:shadow-2xl hover:shadow-electric-blue/20 transition-all duration-300"
            >
              <p className="text-4xl font-heading font-bold mb-2">12+</p>
              <p className="text-sm font-medium text-slate-300">Years of driving measurable growth for enterprise brands.</p>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <motion.div 
            initial={{ opacity: 0, x: 15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-bold tracking-widest text-electric-blue uppercase mb-4">The Faizan Saleem Edge</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-8">
              We don't sell vanity metrics. We sell <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-purple-600">revenue growth.</span>
            </h2>
            
            <p className="text-lg text-slate-400 mb-10 leading-relaxed">
              Most agencies focus on clicks and impressions. We focus on your bottom line. Our methodology combines rigorous data analysis with elite creative engineering to produce marketing that actually converts.
            </p>

            <div className="space-y-8">
              <motion.div 
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="flex gap-4"
              >
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center shrink-0 hover:scale-110 transition-transform">
                  <Target className="w-6 h-6 text-electric-blue" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">Hyper-Targeted Precision</h4>
                  <p className="text-slate-400">We map your total addressable market and build funnels that intercept your ideal customers at their highest intent point.</p>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex gap-4"
              >
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center shrink-0 hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6 text-electric-blue" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">Agile Execution</h4>
                  <p className="text-slate-400">Growth doesn't wait. We deploy rapid experimentation cycles to find winning creatives and scale them instantly.</p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex gap-4"
              >
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center shrink-0 hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6 text-electric-blue" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">Radical Transparency</h4>
                  <p className="text-slate-400">You see what we see. Live dashboards, direct communication, and no hidden margins on ad spend.</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
