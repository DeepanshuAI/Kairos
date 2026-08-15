import React, { useState, useEffect, useRef } from 'react';
import { gsap } from '../animations/utils';

export const FinalConversionExperience: React.FC = () => {
  const [interest, setInterest] = useState<'viewing' | 'info' | 'brochure'>('viewing');
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [submitted, setSubmitted] = useState<boolean>(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current,
        { scale: 0.95, opacity: 0, y: 50 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top 80%',
          }
        }
      );
    }
    
    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 85%',
          }
        }
      );
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email) return;
    setSubmitted(true);
  };

  const scrollToEnquiry = () => {
    const el = document.getElementById('enquiry-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="contact" className="bg-charcoal text-ivory overflow-hidden">
      
      {/* 1. TRANSITION FROM PHASE 6 */}
      <div className="py-24 md:py-36 border-b border-stone/10 bg-charcoal">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <div className="flex flex-col items-center">
            <span className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-bronze font-medium block">
              09
            </span>
            <span className="text-[9px] uppercase tracking-[0.35em] text-stone/50 font-medium block mt-1">
              THE ARRIVAL
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-ivory leading-tight">
            “A place worth arriving at.”
          </h2>
          <p className="font-serif text-xl sm:text-2xl font-light text-stone/80 italic max-w-2xl mx-auto">
            Where structural elevation becomes a private residential legacy.
          </p>
        </div>
      </div>

      {/* 2. FINAL CINEMATIC HERO & NARRATIVE CALLBACK */}
      <div className="py-28 md:py-48 bg-ivory text-charcoal border-b border-stone/10 relative">
        <div ref={heroRef} className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 text-center space-y-10">
          
          {/* Subtle Visual Narrative Callback */}
          <div className="flex justify-center items-center gap-3 sm:gap-6 text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-bronze font-semibold">
            <span>ARCHITECTURE</span>
            <span>•</span>
            <span>LIGHT</span>
            <span>•</span>
            <span>MATERIAL</span>
            <span>•</span>
            <span>SPACE</span>
            <span>•</span>
            <span>LIFE</span>
            <span>→</span>
            <span className="text-charcoal font-serif text-xs font-normal italic">KAIROS</span>
          </div>

          {/* Monumental Headline */}
          <h2 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tight leading-[0.92] text-charcoal max-w-5xl mx-auto">
            YOUR NEXT <br />
            CHAPTER <br />
            <span className="italic font-normal">STARTS HERE.</span>
          </h2>

          <p className="max-w-md mx-auto text-xs md:text-sm font-light text-charcoal/70 tracking-wide leading-relaxed">
            Twelve private estates. One singular address. Begin your exploration with our principal estate director.
          </p>

          {/* Primary & Secondary CTAs */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-6">
            <button
              onClick={scrollToEnquiry}
              data-cursor="ENTER"
              className="group/cta relative inline-flex items-center gap-6 px-7 py-4 text-[11px] uppercase tracking-[0.25em] font-medium text-ivory bg-charcoal border border-charcoal hover:border-bronze transition-all duration-500"
            >
              <span>Book A Private Viewing</span>
              <span className="relative w-4 h-px bg-ivory/50 group-hover/cta:bg-bronze transition-colors">
                <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-t border-r border-ivory/50 group-hover/cta:border-bronze rotate-45 transform translate-x-1 group-hover/cta:translate-x-2 transition-all duration-300" />
              </span>
            </button>
            <button
              onClick={scrollToEnquiry}
              className="group/sec inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] font-medium text-stone hover:text-charcoal transition-colors duration-300 py-2"
            >
              <span>Request The Brochure</span>
              <span className="relative w-4 h-px bg-stone/40 group-hover/sec:w-8 group-hover/sec:bg-charcoal/70 transition-all duration-500" />
            </button>
          </div>

        </div>
      </div>

      {/* 3. PREMIUM ENQUIRY EXPERIENCE */}
      <div id="enquiry-form" className="py-24 md:py-36 border-b border-stone/10 bg-[#121110]">
        <div ref={formRef} className="max-w-3xl mx-auto px-6 space-y-12">
          
          <div className="text-center space-y-4">
            <span className="text-[10px] uppercase tracking-[0.35em] text-bronze font-semibold block">
              PRIVATE CONVERSATION
            </span>
            <h3 className="font-serif text-4xl sm:text-6xl font-light text-ivory">
              Let’s begin a conversation.
            </h3>
            <p className="text-xs sm:text-sm font-light text-stone/80 max-w-md mx-auto leading-relaxed">
              Inquiries are handled directly by our principal estate director with complete confidentiality.
            </p>
          </div>

          {/* Form */}
          <div className="min-h-[400px] flex flex-col justify-center">
            {submitted ? (
              <div className="text-center space-y-6 animate-fadeIn transition-opacity duration-1000 ease-out">
                <div className="w-12 h-px bg-bronze mx-auto mb-8"></div>
                <h4 className="font-serif text-3xl font-light text-ivory">
                  Thank you. Your enquiry has been received.
                </h4>
                <p className="text-xs text-stone/70 font-light max-w-sm mx-auto leading-relaxed">
                  Our principal estate director will contact you via your preferred channel within 24 hours to arrange your private viewing.
                </p>
                <div className="w-12 h-px bg-stone/20 mx-auto mt-8"></div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-12 pt-4">
                
                {/* Interest Toggle (Editorial Text Links) */}
                <div className="space-y-4 text-center border-b border-stone/10 pb-8">
                  <label className="text-[9px] uppercase tracking-[0.3em] text-stone/50 font-medium block">
                    01 / PRIMARY INTEREST
                  </label>
                  <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
                    <button
                      type="button"
                      onClick={() => setInterest('viewing')}
                      className={`text-[10px] uppercase tracking-[0.2em] transition-all duration-300 relative py-1 ${
                        interest === 'viewing' ? 'text-ivory' : 'text-stone/50 hover:text-stone'
                      }`}
                    >
                      Private Viewing
                      {interest === 'viewing' && (
                        <span className="absolute bottom-0 left-0 w-full h-px bg-bronze" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setInterest('info')}
                      className={`text-[10px] uppercase tracking-[0.2em] transition-all duration-300 relative py-1 ${
                        interest === 'info' ? 'text-ivory' : 'text-stone/50 hover:text-stone'
                      }`}
                    >
                      Residence Information
                      {interest === 'info' && (
                        <span className="absolute bottom-0 left-0 w-full h-px bg-bronze" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setInterest('brochure')}
                      className={`text-[10px] uppercase tracking-[0.2em] transition-all duration-300 relative py-1 ${
                        interest === 'brochure' ? 'text-ivory' : 'text-stone/50 hover:text-stone'
                      }`}
                    >
                      Brochure
                      {interest === 'brochure' && (
                        <span className="absolute bottom-0 left-0 w-full h-px bg-bronze" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-[0.3em] text-stone/50 font-medium block">
                    02 / FULL NAME *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikramaditya Singh"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="form-line-input"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-[0.3em] text-stone/50 font-medium block">
                      03 / EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@domain.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="form-line-input"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-[0.3em] text-stone/50 font-medium block">
                      04 / PHONE NUMBER
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      className="form-line-input"
                    />
                  </div>
                </div>

                <div className="pt-8 text-center flex justify-center">
                  <button
                    type="submit"
                    className="group/cta relative inline-flex items-center justify-center gap-6 px-10 py-5 w-full sm:w-auto text-[11px] uppercase tracking-[0.25em] font-medium text-charcoal bg-ivory border border-ivory hover:border-bronze hover:bg-bronze hover:text-ivory transition-all duration-500"
                  >
                    <span>Submit Enquiry</span>
                    <span className="relative w-4 h-px bg-charcoal/50 group-hover/cta:bg-ivory transition-colors">
                      <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-t border-r border-charcoal/50 group-hover/cta:border-ivory rotate-45 transform translate-x-1 group-hover/cta:translate-x-2 transition-all duration-300" />
                    </span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* 4. WHAT HAPPENS NEXT (3-Step Friction Reduction) */}
          <div className="border-t border-stone/15 pt-8 mt-12">
            <span className="text-[9px] uppercase tracking-[0.25em] text-stone/40 font-medium block text-center mb-8">
              WHAT HAPPENS NEXT?
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center text-xs text-stone/80">
              <div className="space-y-2">
                <div className="text-bronze font-medium text-[10px] tracking-widest uppercase">1. Submission</div>
                <div className="text-[11px] text-stone/50">Select your interest & details</div>
              </div>
              <div className="space-y-2">
                <div className="text-bronze font-medium text-[10px] tracking-widest uppercase">2. Contact</div>
                <div className="text-[11px] text-stone/50">Confidential response within 24h</div>
              </div>
              <div className="space-y-2">
                <div className="text-bronze font-medium text-[10px] tracking-widest uppercase">3. Viewing</div>
                <div className="text-[11px] text-stone/50">Arranged at your convenience</div>
              </div>
            </div>
          </div>

          {/* 5. DIRECT CONTACT ALTERNATIVE */}
          <div className="border-t border-stone/15 pt-8 text-center space-y-3 mt-12">
            <span className="text-[9px] uppercase tracking-[0.25em] text-stone/40 font-medium block">
              PREFER TO SPEAK DIRECTLY?
            </span>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-[11px] text-stone/70">
              <a href="tel:+911244809000" className="hover:text-ivory transition-colors relative after:absolute after:bottom-[-2px] after:left-0 after:w-full after:h-px after:bg-ivory after:origin-right after:scale-x-0 hover:after:scale-x-100 hover:after:origin-left after:transition-transform after:duration-300">
                Phone: +91 (0) 124 480 9000
              </a>
              <span className="hidden sm:inline text-stone/30">•</span>
              <a href="mailto:concierge@kairos-residences.com" className="hover:text-ivory transition-colors relative after:absolute after:bottom-[-2px] after:left-0 after:w-full after:h-px after:bg-ivory after:origin-right after:scale-x-0 hover:after:scale-x-100 hover:after:origin-left after:transition-transform after:duration-300">
                Email: concierge@kairos-residences.com
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* 6. QUIET MINIMAL FOOTER */}
      <footer className="py-16 bg-[#0a0a0a] text-stone border-t border-stone/10 text-xs tracking-wider">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col md:flex-row justify-between items-center gap-10">
          
          <div className="space-y-1 text-center md:text-left">
            <div className="font-serif text-xl text-ivory tracking-widest">KAIROS</div>
            <div className="text-[9px] uppercase tracking-[0.25em] text-stone/40">
              Rewari, Haryana • India
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-[9px] uppercase tracking-[0.25em] text-stone/60">
            {['Residences', 'Architecture', 'Lifestyle', 'Location', 'Contact'].map(link => (
              <a 
                key={link} 
                href={`#${link.toLowerCase()}`} 
                className="hover:text-ivory transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-px after:bg-ivory after:origin-right after:scale-x-0 hover:after:scale-x-100 hover:after:origin-left after:transition-transform after:duration-300"
              >
                {link}
              </a>
            ))}
          </div>

          <div className="flex gap-8 text-[9px] uppercase tracking-[0.25em] text-stone/50">
            <a href="#" className="hover:text-ivory transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-ivory transition-colors">Legal Terms</a>
          </div>

        </div>

        <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 pt-8 mt-12 border-t border-stone/10 text-center text-[9px] uppercase tracking-[0.25em] text-stone/30">
          © 2026 KAIROS PRIVATE RESIDENCES. ALL RIGHTS RESERVED.
        </div>
      </footer>

    </div>
  );
};
