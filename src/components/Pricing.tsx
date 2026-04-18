import { motion } from 'motion/react';
import { CheckCircle } from 'lucide-react';

const tiers = [
  {
    name: "Starter Engine",
    price: "$1,000/mo",
    description: "Kickstart your digital presence with foundational growth systems.",
    features: [
      "Single Channel Ads",
      "Basic Analytics Setup",
      "Monthly Strategy Call",
      "Campaign Structuring"
    ],
    highlighted: false
  },
  {
    name: "Growth Accelerator",
    price: "$2,500/mo",
    description: "Scale your proven offers with dedicated media buying and insights.",
    features: [
      "Dual Channel Management",
      "Advanced Pixel Tracking",
      "Bi-weekly Strategy Calls",
      "Ad Copy Optimization"
    ],
    highlighted: false
  },
  {
    name: "Market Presence",
    price: "$4,500/mo",
    description: "Aggressive scaling for businesses ready to capture real market share.",
    features: [
      "Omnichannel Ad Buying",
      "Landing Page A/B Testing",
      "Weekly Strategy Alignment",
      "Basic Video Ad Editing"
    ],
    highlighted: false
  },
  {
    name: "Category Leader",
    price: "$7,000/mo",
    description: "Full-funnel engineered dominance. Top-tier creative & media buying.",
    features: [
      "Dedicated Elite Team",
      "Content & SEO Scaling",
      "Custom Dashboards",
      "Priority Slack Comms"
    ],
    highlighted: true
  },
  {
    name: "Fractional CMO",
    price: "$10,000/mo",
    description: "We become your entire high-performance marketing department.",
    features: [
      "C-Suite Level Strategy",
      "Omnichannel + Programmatic",
      "Complex LTV Modeling",
      "24/7 Access & Support"
    ],
    highlighted: false
  },
  {
    name: "Enterprise Custom",
    price: "Custom",
    description: "Bespoke engineering for brands with multi-million dollar ad spends.",
    features: [
      "Custom Data Infrastructure",
      "In-House Team Training",
      "Global Market Scaling",
      "Exclusive Partnerships"
    ],
    highlighted: false
  }
];

export function Pricing({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <section className="py-24 bg-transparent border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-6">Transparent Investment</h2>
          <p className="text-lg text-slate-400">
            No hidden fees. Just elite growth engineering that aggressively pays for itself.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {tiers.map((tier, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`glass rounded-3xl p-8 border ${tier.highlighted ? 'border-electric-blue bg-electric-blue/5 shadow-2xl shadow-electric-blue/10 transform lg:-translate-y-4' : 'border-white/10 hover:bg-white/5'} transition-all`}
            >
              {tier.highlighted && (
                <span className="inline-block px-4 py-1 rounded-full bg-electric-blue text-white text-xs font-bold uppercase tracking-wider mb-6">
                  Most Popular
                </span>
              )}
              <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
              <p className="text-slate-400 text-sm mb-6 h-10">{tier.description}</p>
              <div className="mb-8">
                <span className="text-4xl font-heading font-bold text-white">{tier.price}</span>
              </div>
              
              <ul className="space-y-4 mb-8">
                {tier.features.map((feat, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle className={`w-5 h-5 mr-3 shrink-0 ${tier.highlighted ? 'text-electric-blue' : 'text-slate-500'}`} />
                    <span className="text-slate-300 text-sm">{feat}</span>
                  </li>
                ))}
              </ul>

              <button 
                onClick={onGetStarted}
                className={`w-full py-4 rounded-xl font-bold transition-all ${tier.highlighted ? 'bg-electric-blue text-white hover:brightness-110' : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'}`}
              >
                Apply for Partnership
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
