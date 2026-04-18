export function Footer() {
  return (
    <footer className="bg-slate-950 pt-20 pb-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6 cursor-pointer" onClick={() => window.location.hash = '#home'}>
              <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                <rect width="40" height="40" rx="8" fill="url(#paint0_linear)"/>
                <path d="M12 28V12H28" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 20H24" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 28L28 20" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                <defs>
                  <linearGradient id="paint0_linear" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#007AFF"/>
                    <stop offset="1" stopColor="#7000FF"/>
                  </linearGradient>
                </defs>
              </svg>
              <span className="font-heading font-[800] text-[20px] tracking-[-0.5px] text-white uppercase">Faizan <span className="text-electric-blue">Saleem</span></span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              A premier digital marketing agency engineering predictable, scalable revenue for modern brands.
            </p>
          </div>

          {/* Site Map Column */}
          <div>
            <h3 className="text-white font-bold mb-6">Site Map</h3>
            <ul className="space-y-3">
              {['Home', 'Services', 'Case Studies', 'About Us', 'Insights', 'Careers'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-slate-400 hover:text-electric-blue text-sm transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div id="contact">
            <h3 className="text-white font-bold mb-6">Contact Us</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <a href="mailto:contact@faizansaleem.studio" className="hover:text-electric-blue transition-colors">
                  contact@faizansaleem.studio
                </a>
              </li>
              <li>
                <a href="https://wa.me/15558430010" target="_blank" rel="noopener noreferrer" className="hover:text-[#25D366] transition-colors">
                  +1 555-843-0010
                </a>
              </li>
              <li className="pt-2 leading-relaxed">
                100 Innovation Drive<br />
                Suite 400<br />
                San Francisco, CA 94111
              </li>
            </ul>
          </div>

          {/* Map Column */}
          <div className="lg:col-span-1 border border-white/10 rounded-2xl overflow-hidden h-48 lg:h-full min-h-[200px]">
             <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100939.98555098464!2d-122.50764017948534!3d37.75781499660172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(1.2)' }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Office Location Map"
              ></iframe>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between">
          <p className="text-slate-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Faizan Saleem Digital Agency. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#privacy" className="text-slate-500 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="#privacy" className="text-slate-500 hover:text-white text-sm transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
