import { motion } from 'motion/react';
import { Target, Lightbulb, TrendingUp } from 'lucide-react';

const values = [
  {
    title: "Data First, Ego Second",
    description: "Every decision, creative pivot, and spend allocation is dictated by hard metrics showing clear ROI.",
    icon: <Target className="w-6 h-6 text-electric-blue" />
  },
  {
    title: "Radical Transparency",
    description: "You'll have access to the exact dashboards we see. No vanity metrics, no hidden ad margins.",
    icon: <Lightbulb className="w-6 h-6 text-electric-blue" />
  },
  {
    title: "Speed as a Feature",
    description: "In digital growth, slow execution is a death sentence. We launch, measure, and optimize in days, not months.",
    icon: <TrendingUp className="w-6 h-6 text-electric-blue" />
  }
];

export function Values() {
  return (
    <section className="py-24 bg-transparent relative border-t border-white/5">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0F1216]"></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-6">The Philosophy Behind The Growth</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((val, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass p-8 rounded-2xl flex flex-col items-start border border-white/10 hover:bg-white/5 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-electric-blue/10 flex items-center justify-center mb-6 border border-electric-blue/20">
                {val.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{val.title}</h3>
              <p className="text-slate-400 leading-relaxed">{val.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
