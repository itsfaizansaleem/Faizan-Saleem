import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Rocket, CheckCircle, Mail, Key, Loader2, ArrowRight } from 'lucide-react';
import { db } from '../lib/firebase';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';

export function ProjectSection() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const nextStep = () => {
    if (step === 1) {
      if (!email.includes('@')) {
        setError('Please enter a valid email');
        return;
      }
      if (!projectName.trim()) {
        setError('Project name is required');
        return;
      }
      setError('');
      setStep(2);
    }
  };

  const submitProject = async () => {
    if (!description.trim()) {
      setError('Please provide some details about your vision');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const projectId = `proj_${Date.now()}`;
      const projectData = {
        userId: 'anonymous',
        email,
        projectName,
        description,
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      // 1. Store in Firestore
      await setDoc(doc(db, 'projects', projectId), projectData);

      // 2. Send to Formspree link
      await fetch('https://formspree.io/f/xaqaokak', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...projectData, formType: 'New Venture Project Request' })
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
            <h2 className="text-4xl font-bold text-white mb-4">Venture Initialized!</h2>
            <p className="text-slate-400 text-lg mb-8">
              Your project application has been secured in our database and sent to our team for immediate review. We'll be in touch via {email}.
            </p>
            <button 
              onClick={() => { setSuccess(false); setStep(1); setEmail(''); setProjectName(''); setDescription(''); }}
              className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold transition-all border border-white/10"
            >
              Submit Another Project
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
            <span className="text-electric-blue font-bold tracking-[3px] text-xs uppercase mb-4 block">New Venture</span>
            <h2 className="text-5xl font-bold text-white mb-6">Ready to let go with us?</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Initialize your project application. We analyze every partner to ensure the highest quality of service and strategic alignment.
            </p>
          </motion.div>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="glass p-8 md:p-12 rounded-3xl border border-white/10">
            <div className="flex items-center justify-center space-x-4 mb-10">
                {[1, 2].map((s) => (
                  <div key={s} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${step >= s ? 'bg-electric-blue text-white' : 'bg-white/5 text-slate-500 border border-white/10'}`}>
                      {s}
                    </div>
                    {s < 2 && <div className={`w-12 h-0.5 mx-2 transition-all ${step > s ? 'bg-electric-blue' : 'bg-white/10'}`}></div>}
                  </div>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div 
                    key="step1"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-6"
                  >
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Business Email</label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                          <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="yourname@brand.com"
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:border-electric-blue outline-none transition-all"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Project Name</label>
                        <input 
                          type="text" 
                          value={projectName}
                          onChange={(e) => setProjectName(e.target.value)}
                          placeholder="e.g. Q4 Growth Sprint"
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white focus:border-electric-blue outline-none transition-all"
                        />
                      </div>
                    </div>
                    {error && <p className="text-red-400 text-sm">{error}</p>}
                    <button 
                      onClick={nextStep}
                      className="w-full py-4 bg-electric-blue text-white rounded-xl font-bold hover:brightness-110 transition-all flex items-center justify-center shadow-lg shadow-electric-blue/20"
                    >
                      Continue to Details <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div 
                    key="step2"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Vision / Challenges</label>
                      <textarea 
                        rows={6}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="What is your current bottleneck and desired scale?"
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white focus:border-electric-blue outline-none transition-all resize-none"
                      />
                    </div>
                    {error && <p className="text-red-400 text-sm">{error}</p>}
                    <div className="flex space-x-4">
                      <button 
                        onClick={() => setStep(1)}
                        className="flex-1 py-4 bg-white/5 text-white rounded-xl font-bold hover:bg-white/10 transition-all border border-white/10"
                      >
                        Back
                      </button>
                      <button 
                        onClick={submitProject}
                        disabled={loading}
                        className="flex-[2] py-4 bg-electric-blue text-white rounded-xl font-bold hover:brightness-110 transition-all flex items-center justify-center shadow-2xl shadow-electric-blue/30"
                      >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Launch Project Application <Rocket className="w-4 h-4 ml-2" /></>}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
        </div>
      </div>
    </section>
  );
}
