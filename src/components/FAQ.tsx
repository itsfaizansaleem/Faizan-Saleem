import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: "How fast can we expect to see ROI?",
    a: "For Paid Search and Social, initial traction happens within weeks. However, true algorithmic optimization for scale typically hits peak efficiency between days 30 and 45. SEO and Content pipelines take 90-120 days to compound."
  },
  {
    q: "Do you require long-term binding contracts?",
    a: "No. We believe in earning our keep every single month. We typically start with an initial 90-day sprint to establish baselines and scale, after which we move to a rolling 30-day term."
  },
  {
    q: "What ad budget do we need to start?",
    a: "To properly feed platform algorithms (Meta/Google) with statistical significance, we require partners to have at least a $10,000/month dedicated ad spend budget, separate from our retainer fees."
  },
  {
    q: "Who handles the creative design and ad copy?",
    a: "We do. Our in-house creative engineering team handles all scriptwriting, static design, short-form editing, and landing page development required for the campaigns we run."
  }
];

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-24 bg-transparent border-t border-white/5">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-slate-400">Everything you need to know before we partner up.</p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass border border-white/10 rounded-2xl overflow-hidden"
            >
              <button 
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
              >
                <span className="font-semibold text-lg text-white">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-electric-blue transition-transform duration-300 ${openIdx === idx ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openIdx === idx && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 text-slate-400 leading-relaxed border-t border-white/5 mt-2 pt-4">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
