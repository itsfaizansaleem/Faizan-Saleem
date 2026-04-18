import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, TrendingUp, Users, Activity, ArrowRight, X, Calendar, CheckCircle } from 'lucide-react';

const services = [
  {
    title: "SEO & Content Strategy",
    description: "Dominate search engine results with data-backed content architectures that drive high-intent organic traffic.",
    details: "Our SEO goes beyond basic keywords. We construct advanced topical maps, execute rigorous technical audits, and produce high-authority content that compounds traffic value over time, turning your website into an automated lead machine.",
    icon: <Search className="w-6 h-6 text-electric-blue" />
  },
  {
    title: "Paid Acquisition",
    description: "Multi-channel media buying across Meta and Google Ads specifically optimized for ROAS and scale.",
    details: "Stop burning cash on generic ads. We leverage aggressive multivariate testing across Meta, Google, and emerging platforms to compress CPA ceilings. Our deep-funnel tracking ensures pixel-perfect attribution on every dollar spent.",
    icon: <TrendingUp className="w-6 h-6 text-electric-blue" />
  },
  {
    title: "Social Media Management",
    description: "Build a cult-like following with viral-engineered creative campaigns and community management.",
    details: "We don't do boring corporate posts. We build organic engines by deciphering platform algorithms. From TikTok virality to LinkedIn authority building, we turn followers into loyal, paying advocates.",
    icon: <Users className="w-6 h-6 text-electric-blue" />
  },
  {
    title: "Conversion Rate Optimization (CRO)",
    description: "Turn clicks into revenue. We rapidly A/B test funnels and landing pages to maximize conversion lift.",
    details: "Traffic means nothing if it doesn't convert. We use session recordings, heatmaps, and rigorous split-testing to find friction points and redesign fluid, high-converting checkout flows and landing pages.",
    icon: <Activity className="w-6 h-6 text-electric-blue" />
  }
];

export function Services() {
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    setStatus('loading');
    try {
      const response = await fetch('https://formspree.io/f/xaqaokak', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('idle');
        alert("Something went wrong, please try again.");
      }
    } catch (error) {
      setStatus('idle');
      alert("Something went wrong. Please check your connection.");
    }
  };

  const closeMenu = () => {
    setSelectedService(null);
    setStatus('idle');
  };

  return (
    <section id="services" className="py-24 bg-transparent relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 max-w-2xl">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6"
          >
            Capabilities engineered for <span className="text-electric-blue">growth.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-400"
          >
            We don’t offer generic packages. We implement aggressive, tailored performance marketing solutions designed to dominate your market.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedService(service)}
              className="group glass p-8 relative flex flex-col sm:flex-row gap-6 cursor-pointer overflow-hidden transition-colors hover:bg-white/5"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-electric-blue/5 rounded-full blur-2xl -mr-16 -mt-16 group-hover:bg-electric-blue/10 transition-colors"></div>
              
              <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-electric-blue transition-colors">{service.title}</h3>
                <p className="text-slate-400 mb-6 leading-relaxed">{service.description}</p>
                <div className="inline-flex items-center text-sm font-semibold text-white group-hover:text-electric-blue transition-colors">
                  View Details & Book <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 10 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass bg-[#0F1216]/90 p-8 md:p-12 shadow-2xl flex flex-col md:flex-row gap-12"
            >
              <button 
                onClick={closeMenu}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-white/5 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Info Column */}
              <div className="flex-1 space-y-6 flex flex-col pt-4">
                <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center mb-2 shrink-0">
                  {selectedService.icon}
                </div>
                <div>
                  <h3 className="text-3xl font-heading font-bold text-white mb-4">{selectedService.title}</h3>
                  <p className="text-slate-400 leading-relaxed text-lg mb-8">
                    {selectedService.details}
                  </p>
                </div>
                
                <div className="mt-auto bg-electric-blue/10 border border-electric-blue/20 rounded-xl p-6">
                  <h4 className="text-white font-bold mb-2 flex items-center">
                    <CheckCircle className="w-5 h-5 text-electric-blue mr-2" /> What to expect
                  </h4>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li>→ 30 Minute Deep Dive Call</li>
                    <li>→ Immediate Funnel/Account Audit</li>
                    <li>→ Transparent Pricing & Timelines</li>
                  </ul>
                </div>
              </div>

              {/* Form Column */}
              <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-8 relative">
                {status === 'success' ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 z-10"
                  >
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4 border border-green-500/30">
                      <CheckCircle className="w-8 h-8 text-green-400" />
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-2">Request Sent!</h4>
                    <p className="text-slate-400">Our team will be in touch with you shortly to schedule your call.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col space-y-4 relative z-10">
                    <h4 className="text-xl font-bold text-white mb-4 flex items-center">
                      <Calendar className="w-5 h-5 mr-2 text-electric-blue" />
                      Book your call
                    </h4>
                    
                    <input type="hidden" name="serviceRequested" value={selectedService.title} />

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Full Name</label>
                      <input 
                        type="text" 
                        name="name" 
                        required 
                        className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white outline-none focus:border-electric-blue transition-colors"
                        placeholder="John Doe"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Work Email</label>
                      <input 
                        type="email" 
                        name="email" 
                        required 
                        className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white outline-none focus:border-electric-blue transition-colors"
                        placeholder="john@company.com"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Business Impact/Goals</label>
                      <textarea 
                        name="details" 
                        required 
                        rows={3}
                        className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white outline-none focus:border-electric-blue transition-colors resize-none"
                        placeholder="Briefly describe your current bottlenecks..."
                      />
                    </div>

                    <button 
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full mt-4 py-4 rounded-xl bg-electric-blue text-white font-bold hover:brightness-110 transition-all flex items-center justify-center shadow-lg shadow-electric-blue/20 disabled:opacity-70"
                    >
                      {status === 'loading' ? 'Sending Request...' : 'Schedule Discovery Call'}
                    </button>
                  </form>
                )}
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
