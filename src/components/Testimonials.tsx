import { motion } from 'motion/react';
import { Star, Linkedin } from 'lucide-react';

const testimonials = [
  {
    quote: "Faizan Salem completely overhauled our paid acquisition strategy. Within 90 days, we saw our CPA drop by 40% while volume doubled. absolute game-changers.",
    author: "Sarah Jenkins",
    role: "CMO, TechFlow",
    rating: 5
  },
  {
    quote: "Finding an agency that actually cares about bottom-line revenue is rare. Their CRO team found a leak in our checkout funnel that instantly added $50k/mo to our top line.",
    author: "Marcus Aurelius",
    role: "Founder, Krave Beauty",
    rating: 5
  },
  {
    quote: "The SEO architecture they built for us became our biggest growth lever. We're now outranking billion-dollar competitors for our core non-brand terms.",
    author: "Elena Rodriguez",
    role: "VP of Growth, FinFlow",
    rating: 5
  },
  {
    quote: "Hyper-responsive, painfully analytical, and deeply creative. It's a rare combination.",
    author: "David Chen",
    role: "CEO, Nexus SaaS",
    rating: 5
  },
  {
    quote: "We spent months trying to crack TikTok ads. They figured it out in two weeks. Our best agency partner by far.",
    author: "Jessica Walsh",
    role: "Director of Marketing, Elevate",
    rating: 5
  }
];

export function Testimonials() {
  return (
    <section className="py-24 bg-transparent border-t border-white/5 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0F1216] pointer-events-none z-0"></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-white mb-6"
            >
              Verified results from verified leaders.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-slate-400"
            >
              Don't take our word for it. Here is what industry leaders have to say about partnering with us.
            </motion.p>
          </div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {testimonials.map((t, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.1, duration: 0.5, ease: "easeOut" }}
                className="break-inside-avoid glass p-8 transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:bg-white/5 relative group cursor-default"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-electric-blue/5 rounded-full blur-2xl group-hover:bg-electric-blue/20 transition-colors pointer-events-none opacity-0 group-hover:opacity-100"></div>
                <div className="flex space-x-1 mb-6">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#FFB800] text-[#FFB800]" />
                  ))}
                </div>
                <p className="text-slate-300 text-lg leading-relaxed mb-6 font-medium">"{t.quote}"</p>
                
                <div className="flex items-center justify-between border-t border-white/10 pt-6">
                  <div>
                    <h4 className="font-bold text-white">{t.author}</h4>
                    <p className="text-sm text-slate-500">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
      </div>
    </section>
  );
}
