import { motion } from 'motion/react';

const technologies = [
  "Google Analytics 4", "Meta Ads Manager", "HubSpot", "Salesforce", "Shopify Plus", "TikTok Ads", "Mixpanel", "Ahrefs", "Semrush", "Figma", "Looker Studio", "Klaviyo"
];

export function TechStack() {
  return (
    <section className="py-24 bg-transparent border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Our Growth Stack</h2>
          <p className="text-slate-400">Enterprise-grade tools we leverage to build your competitive advantage.</p>
        </motion.div>
      </div>

      <div className="relative w-full overflow-hidden flex items-center">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0F1216] to-transparent z-10 hidden sm:block"></div>
        
        <motion.div 
          className="flex space-x-12 items-center whitespace-nowrap min-w-max px-12"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 30, repeat: Infinity }}
        >
          {[...technologies, ...technologies].map((tech, i) => (
            <div key={i} className="flex items-center justify-center px-6 py-3 glass rounded-full border border-white/10 hover:bg-white/10 transition-colors cursor-default">
              <span className="text-sm font-semibold text-slate-300">{tech}</span>
            </div>
          ))}
        </motion.div>

        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0F1216] to-transparent z-10 hidden sm:block"></div>
      </div>
    </section>
  );
}
