import { motion } from 'motion/react';
import { X, ExternalLink, ArrowRight, Calendar } from 'lucide-react';

export function PortfolioModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/90 backdrop-blur-xl cursor-pointer"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 30 }}
        className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto glass bg-[#0F1216]/90 p-0 shadow-2xl rounded-3xl"
      >
        <button onClick={onClose} className="fixed top-8 right-8 md:absolute md:top-6 md:right-6 p-3 text-slate-400 hover:text-white bg-slate-900/50 backdrop-blur-md rounded-full hover:bg-white/10 transition-colors z-50">
          <X className="w-6 h-6" />
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Main Info */}
          <div className="w-full md:w-1/3 p-8 md:p-12 border-b md:border-b-0 md:border-r border-white/5 bg-slate-900/20">
            <h2 className="text-4xl font-bold text-white mb-6">Our Journey</h2>
            <p className="text-slate-400 leading-relaxed mb-8">
              Since our founding in 2020, we have relentlessly innovated in performance marketing. We are a collective of data scientists, media buyers, and creative engineers obsessed with predictable scale.
            </p>
            
            <div className="space-y-6 mb-12">
              <div>
                <p className="text-3xl font-heading font-bold text-white">$500M+</p>
                <p className="text-sm text-electric-blue uppercase tracking-wider font-semibold mt-1">Revenue Generated</p>
              </div>
              <div>
                <p className="text-3xl font-heading font-bold text-white">45+</p>
                <p className="text-sm text-electric-blue uppercase tracking-wider font-semibold mt-1">Active Retainers</p>
              </div>
              <div>
                <p className="text-3xl font-heading font-bold text-white">94%</p>
                <p className="text-sm text-electric-blue uppercase tracking-wider font-semibold mt-1">Client Retention Rate</p>
              </div>
            </div>

            <button onClick={onClose} className="w-full py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-semibold transition-colors flex items-center justify-center border border-white/10">
              Close Portfolio <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>

          {/* Timeline */}
          <div className="w-full md:w-2/3 p-8 md:p-12 bg-[#0F1216]/50">
            <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
              
              {/* 2020 */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-slate-900 text-electric-blue shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_15px_rgba(0,122,255,0.2)]">
                  <Calendar className="w-4 h-4" />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass p-6 rounded-2xl border border-white/5 group-hover:border-electric-blue/30 transition-colors">
                  <div className="flex items-center mb-2">
                    <span className="text-electric-blue font-bold tracking-wider text-sm uppercase">2020</span>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">The Inception</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Founded in the midst of global shifts, we started as a small boutique team of 3 media buyers. Our thesis was simple: marketing should be a math equation, not a guessing game. We took on our first 5 clients and scaled them by an average of 300% ARR within 6 months.
                  </p>
                </div>
              </div>

              {/* 2021 */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-slate-900 text-electric-blue shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_15px_rgba(0,122,255,0.2)]">
                  <Calendar className="w-4 h-4" />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass p-6 rounded-2xl border border-white/5 group-hover:border-electric-blue/30 transition-colors">
                  <div className="flex items-center mb-2">
                    <span className="text-electric-blue font-bold tracking-wider text-sm uppercase">2021</span>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Data Infrastructure & SaaS Focus</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    We pivoted to heavily engineering our own internal tracking analytics to solve iOS14 attribution loss. Because of this leap in tech, we began acquiring major SaaS and B2B clients, hitting our first $50M in client-generated revenue.
                  </p>
                </div>
              </div>

              {/* 2022 */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-slate-900 text-electric-blue shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_15px_rgba(0,122,255,0.2)]">
                  <Calendar className="w-4 h-4" />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass p-6 rounded-2xl border border-white/5 group-hover:border-electric-blue/30 transition-colors">
                  <div className="flex items-center mb-2">
                    <span className="text-electric-blue font-bold tracking-wider text-sm uppercase">2022</span>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Scaling the Collective</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Grew the team from 5 to 25 engineers, creatives, and copywriters. Opened our official omnichannel structure (Google, Meta, TikTok, Programmatic). We crossed the $150M mark for total partner revenue managed.
                  </p>
                </div>
              </div>

              {/* 2023 */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-slate-900 text-electric-blue shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_15px_rgba(0,122,255,0.2)]">
                  <Calendar className="w-4 h-4" />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass p-6 rounded-2xl border border-white/5 group-hover:border-electric-blue/30 transition-colors">
                  <div className="flex items-center mb-2">
                    <span className="text-electric-blue font-bold tracking-wider text-sm uppercase">2023</span>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">The Enterprise Era</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Transitioned into securing core enterprise and mega E-commerce brands with $ millioner ad-budgets. Implemented AI-driven predictive LTV models for all active partners, bringing retention to an industry-leading 94%.
                  </p>
                </div>
              </div>

              {/* 2024+ */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-slate-900 border-electric-blue text-electric-blue shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_20px_rgba(0,122,255,0.4)]">
                  <Calendar className="w-4 h-4" />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass p-6 rounded-2xl border border-electric-blue/20 bg-electric-blue/5">
                  <div className="flex items-center mb-2">
                    <span className="text-electric-blue font-bold tracking-wider text-sm uppercase">Present</span>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Market Dominance</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Now managing elite brands across the globe. We have fully crossed $500M+ in verifiable client revenue. Our focus remains razor-sharp: we don't build to win awards, we build to win unparalleled market share for our partners.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
