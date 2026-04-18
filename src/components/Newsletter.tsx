import { motion } from 'motion/react';
import { ArrowRight, Mail } from 'lucide-react';
import React, { useState } from 'react';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!email) return;
    setStatus('loading');
    
    try {
      const response = await fetch('https://formspree.io/f/xaqaokak', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });
      
      if (response.ok) {
        setStatus('success');
        setEmail('');
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('idle');
        alert("Something went wrong, please try again.");
      }
    } catch (error) {
      setStatus('idle');
      alert("Something went wrong, please try again.");
    }
  };

  return (
    <section className="py-24 bg-transparent relative overflow-hidden border-t border-white/5">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[400px] bg-electric-blue/20 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-flex items-center justify-center p-3 mb-6 bg-blue-500/10 rounded-2xl border border-blue-500/20">
            <Mail className="w-8 h-8 text-blue-400" />
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Get Weekly Growth Hacks.
          </h2>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            Join 10,000+ founders and marketers receiving our zero-BS strategies on scaling revenue every Tuesday.
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto relative">
            <div className="relative flex items-center">
              <input 
                type="email" 
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your work email" 
                className="w-full px-6 py-4 rounded-full bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent backdrop-blur-md transition-all text-lg"
                required
              />
              <button 
                type="submit"
                disabled={status === 'loading'}
                className="absolute right-2 top-2 bottom-2 px-6 bg-electric-blue text-white rounded-full font-medium hover:bg-electric-blue-hover transition-all flex items-center disabled:opacity-70"
              >
                {status === 'loading' ? 'Joining...' : status === 'success' ? 'Joined!' : (
                  <>
                    Subscribe
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </button>
            </div>
            <p className="text-sm text-slate-500 mt-4">
              We respect your inbox. No spam, ever.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
