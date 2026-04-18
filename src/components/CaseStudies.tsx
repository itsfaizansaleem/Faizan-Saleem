import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { ArrowUpRight, X, ArrowRight, CheckCircle } from 'lucide-react';

const cases = [
  {
    client: "Luminary Tech",
    industry: "SaaS",
    title: "Scaling MRR with high-intent Paid Search",
    metrics: [
      { label: "Increase in ROI", value: "+240%" },
      { label: "CPA Reduction", value: "-45%" }
    ],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    challenge: "Luminary Tech was experiencing aggressive churn and high acquisition costs on their B2B SaaS product due to poor search intent matching.",
    solution: "We restructured their entire Google Ads architecture, isolating high-LTV keywords and deploying dynamic landing pages that adapted copy based on the exact search term, reducing friction dramatically.",
    features: ["Dynamic Landing Pages", "Keyword Isolation", "LTV-based Bidding"]
  },
  {
    client: "Krave Beauty",
    industry: "E-Commerce",
    title: "Viral TikTok campaigns driving explosive sales",
    metrics: [
      { label: "Revenue YoY", value: "+315%" },
      { label: "ROAS", value: "4.8x" }
    ],
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=800",
    challenge: "The D2C beauty space was incredibly saturated, and Krave's Meta ad costs were skyrocketing, destroying their margin.",
    solution: "We pivoted entirely to TikTok, seeding products to 150 micro-creators and whitelisting the top 5% of performing videos. This organic-first approach bypassed ad fatigue completely.",
    features: ["Creator Seeding", "TikTok Whitelisting", "Offer Restructuring"]
  },
  {
    client: "FinFlow",
    industry: "Fintech",
    title: "Dominating organic search through technical SEO",
    metrics: [
      { label: "Organic Traffic", value: "+500%" },
      { label: "Lead Quality", value: "+80%" }
    ],
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800",
    challenge: "As a new fintech app, FinFlow had virtually zero domain authority and couldn't rank for any core financial terms against established banks.",
    solution: "We executed a massive programmatic SEO campaign, generating 500+ hyper-specific 'Vs' and 'Alternative to' pages, paired with a stringent technical optimization phase.",
    features: ["Programmatic Content", "Technical Auditing", "Backlink engineering"]
  }
];

export function CaseStudies() {
  const targetRef = useRef<HTMLDivElement>(null);
  const [selectedCase, setSelectedCase] = useState<typeof cases[0] | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);

  return (
    <section id="work" ref={targetRef} className="py-24 bg-transparent text-white relative h-[250vh]">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        
        <div className="max-w-7xl mx-auto px-6 w-full mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Don't just take our word. <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Look at the data.</span>
            </h2>
            <p className="text-lg text-slate-400">
              Real brands. Real numbers. See how we've engineered exponential growth pipelines for our clients.
            </p>
          </motion.div>
        </div>

        <motion.div style={{ x }} className="flex gap-8 px-6 md:px-24">
          {cases.map((project, idx) => (
            <div key={idx} onClick={() => setSelectedCase(project)} className="w-[85vw] md:w-[600px] shrink-0 glass overflow-hidden group p-0 cursor-pointer">
              <div className="h-64 md:h-80 w-full overflow-hidden relative">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                  <div className="space-x-2">
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-md text-sm font-medium rounded-full border border-white/10">{project.client}</span>
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-300 backdrop-blur-md text-sm font-medium rounded-full border border-blue-500/20">{project.industry}</span>
                  </div>
                </div>
              </div>
              <div className="p-8 relative">
                <h3 className="text-2xl font-bold mb-8 group-hover:text-blue-300 transition-colors flex items-center justify-between">
                  {project.title}
                  <span className="w-10 h-10 rounded-full border border-slate-600 flex items-center justify-center group-hover:border-blue-400 group-hover:bg-blue-400 group-hover:text-slate-900 transition-all">
                    <ArrowUpRight className="w-5 h-5" />
                  </span>
                </h3>
                
                <div className="grid grid-cols-2 gap-4 border-t border-slate-700 pt-6">
                  {project.metrics.map((metric, i) => (
                    <div key={i}>
                      <p className="text-3xl font-heading font-bold text-white mb-1">{metric.value}</p>
                      <p className="text-sm font-medium text-slate-400">{metric.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
          <div className="w-[10vw] shrink-0"></div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedCase && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedCase(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass bg-[#0F1216]/95 border border-white/10 p-0 shadow-2xl rounded-2xl flex flex-col md:flex-row"
            >
              <button onClick={() => setSelectedCase(null)} className="absolute top-4 right-4 p-2 text-white bg-black/50 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors z-10">
                <X className="w-5 h-5" />
              </button>

              <div className="w-full md:w-2/5 h-64 md:h-auto relative bg-slate-900">
                <img src={selectedCase.image} alt={selectedCase.client} className="w-full h-full object-cover opacity-60" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0F1216] via-[#0F1216]/50 to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8">
                  <h3 className="text-3xl font-bold text-white mb-2">{selectedCase.client}</h3>
                  <span className="px-3 py-1 bg-electric-blue/20 text-electric-blue text-xs font-bold uppercase tracking-wider rounded-full border border-electric-blue/20">{selectedCase.industry}</span>
                </div>
              </div>

              <div className="w-full md:w-3/5 p-8 md:p-12 flex flex-col">
                <h4 className="text-2xl font-bold text-white mb-8">{selectedCase.title}</h4>
                
                <div className="space-y-6 flex-1">
                  <div>
                    <h5 className="text-sm font-semibold text-electric-blue uppercase tracking-wider mb-2">The Challenge</h5>
                    <p className="text-slate-400 leading-relaxed">{selectedCase.challenge}</p>
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-electric-blue uppercase tracking-wider mb-2">Our Solution</h5>
                    <p className="text-slate-400 leading-relaxed">{selectedCase.solution}</p>
                  </div>
                  
                  <div className="pt-6 border-t border-white/10">
                    <h5 className="text-sm font-semibold text-white mb-4">Core Interventions:</h5>
                    <ul className="space-y-2">
                      {selectedCase.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-slate-300 text-sm">
                          <CheckCircle className="w-4 h-4 text-electric-blue mr-3 shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-2 gap-4">
                  {selectedCase.metrics.map((metric, i) => (
                    <div key={i}>
                      <p className="text-3xl font-heading font-bold text-white mb-1">{metric.value}</p>
                      <p className="text-sm font-medium text-slate-500">{metric.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
