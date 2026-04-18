import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Rocket, CheckCircle, Mail, MessageSquare, Briefcase, Loader2, ArrowRight } from 'lucide-react';
import { db } from '../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

import { User, Phone } from 'lucide-react';

export function ProjectSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const submitProject = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setError('Please enter a valid email');
      return;
    }
    if (!name.trim()) {
      setError('Name is required');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const submissionId = `sub_${Date.now()}`;
      const submissionData = {
        name,
        email,
        number,
        message,
        status: 'new_lead',
        createdAt: new Date().toISOString()
      };

      // 1. Store in Firestore
      await setDoc(doc(db, 'inquiries', submissionId), submissionData);

      // 2. Send to Formspree
      await fetch('https://formspree.io/f/xaqaokak', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...submissionData, formType: 'Website Inquiry' })
      });

      setSuccess(true);
    } catch (err) {
      setError('Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <section className="py-24 bg-transparent border-t border-white/5 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }}
            className="glass p-12 rounded-3xl border border-electric-blue/30"
          >
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-400" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">Message Received!</h2>
            <p className="text-slate-400 text-lg mb-8">
              Your inquiry has been sent to our team. We'll be in touch at {email} shortly.
            </p>
            <button 
              onClick={() => { setSuccess(false); setName(''); setEmail(''); setNumber(''); setMessage(''); }}
              className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold transition-all border border-white/10"
            >
              Back to Form
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="start-project" className="py-24 bg-transparent border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-electric-blue/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-electric-blue font-bold tracking-[3px] text-xs uppercase mb-4 block">New Project</span>
            <h2 className="text-5xl font-bold text-white mb-6">Initialize Your Scale.</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Ready to engineer your next phase of growth? Share your vision below and our team will analyze your project for strategic alignment.
            </p>
          </motion.div>
        </div>

        <div className="max-w-2xl mx-auto">
          <motion.form 
            onSubmit={submitProject}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass p-8 md:p-12 rounded-3xl border border-white/10 space-y-6"
          >
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:border-electric-blue outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Business Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:border-electric-blue outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input 
                  type="tel" 
                  required
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:border-electric-blue outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Message</label>
              <div className="relative">
                <MessageSquare className="absolute left-4 top-6 w-5 h-5 text-slate-500" />
                <textarea 
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we help your brand grow?"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:border-electric-blue outline-none transition-all resize-none"
                />
              </div>
            </div>

            {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
            
            <button 
              type="submit"
              disabled={loading}
              className="group relative w-full py-5 bg-electric-blue text-white rounded-xl font-bold transition-all flex items-center justify-center shadow-2xl shadow-electric-blue/30 overflow-hidden hover:brightness-110"
            >
              <div className="absolute inset-0 w-1/2 h-full bg-white/20 -skew-x-12 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Send Inquiry <ArrowRight className="w-4 h-4 ml-2" /></>}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
