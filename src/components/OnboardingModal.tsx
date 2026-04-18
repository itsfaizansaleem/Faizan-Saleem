import { useState, FormEvent, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';

export function OnboardingModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', company: '', website: '', industry: '', revenue: '', spend: '', bottleneck: ''
  });

  const updateForm = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const currentStepIsValid = () => {
    if (step === 1) return formData.name && formData.email && formData.phone;
    if (step === 2) return formData.company && formData.website && formData.industry;
    if (step === 3) return formData.revenue && formData.spend && formData.bottleneck;
    return true;
  };

  const nextStep = () => {
    if (currentStepIsValid() && step < 3) setStep(step + 1);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!currentStepIsValid()) return;
    setStatus('loading');
    try {
      const response = await fetch('https://formspree.io/f/xaqaokak', {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, formType: 'Detailed Onboarding Request' })
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

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass bg-[#0F1216]/95 p-8 shadow-2xl rounded-2xl"
      >
        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-white/5 rounded-full hover:bg-white/10 transition-colors z-10">
          <X className="w-5 h-5" />
        </button>

        {status === 'success' ? (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center py-16">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6 border border-green-500/30">
              <CheckCircle className="w-10 h-10 text-green-400" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">Application Received</h3>
            <p className="text-slate-400 text-lg">Our growth engineering team will review your details and reach out within 24 hours to schedule your strategy session.</p>
          </motion.div>
        ) : (
          <div className="flex flex-col relative z-0">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Partner Application</h2>
              <p className="text-slate-400">Apply to become a growth partner. We review every application to ensure mutual fit.</p>
              
              {/* Progress Bar */}
              <div className="flex items-center gap-2 mt-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className={`h-1.5 flex-1 rounded-full ${step >= i ? 'bg-electric-blue' : 'bg-white/10'} transition-colors duration-300`} />
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-4">
                    <h3 className="text-xl font-semibold text-white mb-4">1. Personal Details</h3>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Full Name</label>
                      <input type="text" name="name" value={formData.name} onChange={updateForm} required className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white outline-none focus:border-electric-blue transition-colors" placeholder="Jordan Belfort" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Work Email</label>
                      <input type="email" name="email" value={formData.email} onChange={updateForm} required className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white outline-none focus:border-electric-blue transition-colors" placeholder="jordan@stratton.com" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Phone Number</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={updateForm} required className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white outline-none focus:border-electric-blue transition-colors" placeholder="+1 (555) 000-0000" />
                    </div>
                  </motion.div>
                )}
                
                {step === 2 && (
                  <motion.div key="step2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-4">
                    <h3 className="text-xl font-semibold text-white mb-4">2. Company Profile</h3>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Company Name</label>
                      <input type="text" name="company" value={formData.company} onChange={updateForm} required className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white outline-none focus:border-electric-blue transition-colors" placeholder="Acme Corp" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Website URL</label>
                      <input type="url" name="website" value={formData.website} onChange={updateForm} required className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white outline-none focus:border-electric-blue transition-colors" placeholder="https://acmecorp.com" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Industry</label>
                      <select name="industry" value={formData.industry} onChange={updateForm} required className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white outline-none focus:border-electric-blue transition-colors appearance-none">
                        <option value="" disabled className="text-slate-500">Select Industry</option>
                        <option value="SaaS">SaaS / Software</option>
                        <option value="E-Commerce">E-Commerce</option>
                        <option value="B2B Services">B2B Services</option>
                        <option value="Fintech">Fintech</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div key="step3" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-4">
                    <h3 className="text-xl font-semibold text-white mb-4">3. Growth Metrics</h3>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Current Monthly Revenue</label>
                      <select name="revenue" value={formData.revenue} onChange={updateForm} required className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white outline-none focus:border-electric-blue transition-colors appearance-none">
                        <option value="" disabled className="text-slate-500">Select Range</option>
                        <option value="<$50k">Under $50k / mo</option>
                        <option value="$50k-$250k">$50k - $250k / mo</option>
                        <option value="$250k-$1M">$250k - $1M / mo</option>
                        <option value="$1M+">$1M+ / mo</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Current Monthly Ad Spend</label>
                      <select name="spend" value={formData.spend} onChange={updateForm} required className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white outline-none focus:border-electric-blue transition-colors appearance-none">
                        <option value="" disabled className="text-slate-500">Select Spend</option>
                        <option value="<$10k">Under $10k / mo</option>
                        <option value="$10k-$50k">$10k - $50k / mo</option>
                        <option value="$50k+">$50k+ / mo</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Primary Growth Bottleneck</label>
                      <textarea name="bottleneck" value={formData.bottleneck} onChange={updateForm} required rows={3} className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white outline-none focus:border-electric-blue transition-colors resize-none" placeholder="E.g., High CPA on Meta, poor organic traffic, failing to scale spend profitably..." />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex justify-between pt-6 border-t border-white/5">
                {step > 1 ? (
                  <button type="button" onClick={() => setStep(step - 1)} className="px-6 py-3 border border-white/10 rounded-xl text-white hover:bg-white/5 transition-colors flex items-center">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                  </button>
                ) : <div />}
                
                {step < 3 ? (
                  <button type="button" onClick={nextStep} disabled={!currentStepIsValid()} className="px-6 py-3 bg-electric-blue rounded-xl text-white font-semibold hover:brightness-110 transition-all flex items-center disabled:opacity-50">
                    Continue <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                ) : (
                  <button type="submit" disabled={!currentStepIsValid() || status === 'loading'} className="px-8 py-3 bg-gradient-to-r from-electric-blue to-purple-600 rounded-xl text-white font-bold hover:brightness-110 transition-all flex items-center disabled:opacity-50">
                    {status === 'loading' ? 'Submitting...' : 'Submit Request'}
                  </button>
                )}
              </div>
            </form>
          </div>
        )}
      </motion.div>
    </div>
  );
}
