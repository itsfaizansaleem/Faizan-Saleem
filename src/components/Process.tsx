import { motion } from 'motion/react';
import { Search, Map, Rocket, LineChart } from 'lucide-react';

const steps = [
  {
    title: "1. Global Growth Audit",
    description: "We dive deep into your analytics, competitor landscape, and existing funnels to locate high-leverage growth opportunities that are currently bottlenecked.",
    icon: <Search className="w-6 h-6 text-white" />,
    color: "bg-slate-900"
  },
  {
    title: "2. Engineered Strategy",
    description: "We don't guess. We architect a holistic go-to-market plan covering paid, organic, and conversion elements with clear KPIs and 90-day sprints.",
    icon: <Map className="w-6 h-6 text-white" />,
    color: "bg-blue-600"
  },
  {
    title: "3. Rapid Execution",
    description: "Our elite squad of copywriters, media buyers, and designers deploy your campaigns with extreme urgency, building initial momentum.",
    icon: <Rocket className="w-6 h-6 text-white" />,
    color: "bg-electric-blue"
  },
  {
    title: "4. Relentless Optimization",
    description: "Launch is just the beginning. We run daily A/B tests on creative, audiences, and landing pages to compress CPA and scale ROAS continuously.",
    icon: <LineChart className="w-6 h-6 text-white" />,
    color: "bg-purple-600"
  }
];

export function Process() {
  return (
    <section className="py-24 bg-transparent border-t border-white/5 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0F1216] pointer-events-none z-0"></div>
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-white tracking-tight"
          >
            The blueprint for <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-purple-600">exponential growth.</span>
          </motion.h2>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-4 bottom-4 w-px bg-white/10 md:-translate-x-1/2"></div>
          
          <div className="space-y-16">
            {steps.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`relative flex flex-col md:flex-row items-center ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
                  className="absolute left-8 md:left-1/2 -translate-x-1/2 w-16 h-16 rounded-full glass border-2 border-white/10 flex items-center justify-center z-10"
                >
                  <div className={`w-10 h-10 rounded-full ${step.color} flex items-center justify-center`}>
                    {step.icon}
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: idx % 2 === 0 ? 15 : -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className={`ml-24 md:ml-0 md:w-1/2 ${idx % 2 === 0 ? 'md:pl-16' : 'md:pr-16 text-left md:text-right'} py-4`}
                >
                  <h3 className="text-2xl font-bold text-white mb-4 hover:text-electric-blue transition-colors cursor-default">{step.title}</h3>
                  <p className="text-lg text-slate-400 leading-relaxed glass p-6 border border-white/10 md:bg-transparent md:p-0 md:border-transparent md:backdrop-blur-none cursor-default hover:text-slate-300 transition-colors">
                    {step.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
