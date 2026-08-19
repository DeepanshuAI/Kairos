import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle2, Calendar, ArrowRight, Shield } from 'lucide-react';
import { db } from '../../database/db';
import { useBooking } from '../../context/BookingContext';
import { submitContactMessage, subscribeNewsletter } from '../../services/contactService';

export const ContactFooter: React.FC = () => {
  const { openBooking, openAdmin, navigateToSection } = useBooking();
  const config = db.getConfig();

  // Contact Form State
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    preferredDates: '',
    guests: '',
  });
  const [contactSubmitted, setContactSubmitted] = useState<boolean>(false);
  const [contactError, setContactError] = useState<string | null>(null);

  // Newsletter State
  const [newsletterEmail, setNewsletterEmail] = useState<string>('');
  const [newsletterStatus, setNewsletterStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactError(null);
    const res = submitContactMessage(formState);
    if (res.success) {
      setContactSubmitted(true);
    } else {
      setContactError(res.error || 'Failed to send message.');
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = subscribeNewsletter(newsletterEmail);
    setNewsletterStatus(res);
    if (res.success) {
      setNewsletterEmail('');
    }
  };

  const handleFooterNavClick = (e: React.MouseEvent, id: string, title: string) => {
    e.preventDefault();
    navigateToSection(id, title);
  };

  return (
    <div id="contact" className="relative z-10 text-ivory overflow-hidden bg-[#100F0E]">
      
      {/* 1. EDITORIAL CONCIERGE & INQUIRY SECTION */}
      <div className="py-28 md:py-40 border-b border-stone/10 bg-[#121110]">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left: Contact Info & Philosophy */}
          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-4">
              <div className="flex flex-col">
                <span className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-bronze font-medium block">
                  10 • CONCIERGE DESK
                </span>
                <span className="text-[9px] uppercase tracking-[0.35em] text-stone/50 font-medium block mt-1">
                  DIRECT CONVERSATION
                </span>
              </div>
              <h3 className="font-serif text-4xl sm:text-6xl font-light text-ivory leading-tight">
                Plan Your Stay.
              </h3>
              <p className="text-xs sm:text-sm font-light text-stone/80 leading-relaxed max-w-md">
                Whether orchestrating a private villa buyout, an extended wellness retreat, or bespoke culinary celebrations, our guest experience director is at your disposal.
              </p>
            </div>

            <div className="space-y-6 text-xs text-stone/80 pt-4 border-t border-stone/15">
              <div className="flex items-start gap-4">
                <MapPin size={18} className="text-bronze shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <div className="text-ivory font-medium">Kairos Resort & Spa</div>
                  <div className="text-stone/60">{config.address}</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Phone size={18} className="text-bronze shrink-0" />
                <div>
                  <a href={`tel:${config.contactPhone}`} className="text-ivory hover:text-bronze transition-colors">
                    {config.contactPhone}
                  </a>
                  <span className="text-[10px] text-stone/50 block">Daily 08:00 – 22:00 IST</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Mail size={18} className="text-bronze shrink-0" />
                <div>
                  <a href={`mailto:${config.contactEmail}`} className="text-ivory hover:text-bronze transition-colors">
                    {config.contactEmail}
                  </a>
                  <span className="text-[10px] text-stone/50 block">Confidential response within 12 hours</span>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="button"
                onClick={() => openBooking()}
                className="w-full sm:w-auto px-8 py-4 bg-bronze text-charcoal hover:bg-ivory text-xs uppercase tracking-[0.25em] font-bold shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
              >
                <Calendar size={14} />
                <span>Instant Room Reservation</span>
              </button>
            </div>
          </div>

          {/* Right: Message Form */}
          <div className="lg:col-span-7 bg-charcoal/60 p-8 sm:p-12 border border-stone/15">
            {contactSubmitted ? (
              <div className="text-center py-12 space-y-6 animate-fadeIn">
                <div className="w-14 h-14 rounded-full bg-bronze/10 border border-bronze/40 flex items-center justify-center mx-auto text-bronze">
                  <CheckCircle2 size={28} />
                </div>
                <div className="space-y-2 max-w-md mx-auto">
                  <h4 className="font-serif text-3xl font-light text-ivory">Message Received.</h4>
                  <p className="text-xs text-stone/70 font-light leading-relaxed">
                    Thank you. Your inquiry has been delivered to our guest concierge team. We will be in touch shortly to assist with your arrangements.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setContactSubmitted(false)}
                  className="text-xs uppercase tracking-[0.2em] text-bronze hover:underline pt-4 block mx-auto"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-8">
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-bronze font-semibold block">
                    INQUIRY DETAILS
                  </span>
                  <h4 className="font-serif text-2xl sm:text-3xl font-light text-ivory">
                    Send a Message to the Concierge
                  </h4>
                </div>

                {contactError && (
                  <div className="p-3 bg-red-950/50 border border-red-800 text-red-200 text-xs">
                    {contactError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-[0.25em] text-stone/50 font-medium block">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priyal Sharma"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="form-line-input"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-[0.25em] text-stone/50 font-medium block">
                      Email Address *
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
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-[0.25em] text-stone/50 font-medium block">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      className="form-line-input"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-[0.25em] text-stone/50 font-medium block">
                      Preferred Dates & Party Size
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Mid-October • 4 Guests"
                      value={formState.preferredDates}
                      onChange={(e) => setFormState({ ...formState, preferredDates: e.target.value })}
                      className="form-line-input"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-[0.25em] text-stone/50 font-medium block">
                    Message / Special Itinerary Requests *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about the occasion, desired experiences, or custom villa requirements..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full bg-transparent border-b border-stone/20 text-ivory py-3 text-sm focus:outline-none focus:border-bronze resize-none"
                  />
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="group inline-flex items-center gap-4 px-8 py-4 bg-ivory text-charcoal hover:bg-bronze hover:text-ivory text-xs uppercase tracking-[0.25em] font-semibold transition-all duration-300"
                  >
                    <span>Send Message</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </div>

      {/* 2. NEWSLETTER DISPATCHES */}
      <div className="py-20 md:py-28 border-b border-stone/10 bg-[#0e0d0c]">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <div className="space-y-3">
            <span className="text-[10px] uppercase tracking-[0.35em] text-bronze font-semibold block">
              EDITORIAL DISPATCHES
            </span>
            <h3 className="font-serif text-3xl sm:text-5xl font-light text-ivory">
              Receive occasional notes from Kairos.
            </h3>
            <p className="text-xs sm:text-sm font-light text-stone/70 max-w-lg mx-auto leading-relaxed">
              Seasonal menus, architectural essays, and priority reservation windows for upcoming wellness retreats.
            </p>
          </div>

          <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              required
              placeholder="Enter your email address"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="flex-grow bg-[#1a1918] border border-stone/30 text-ivory px-4 py-3.5 text-xs focus:outline-none focus:border-bronze"
            />
            <button
              type="submit"
              className="px-6 py-3.5 bg-bronze text-charcoal hover:bg-ivory text-xs uppercase tracking-[0.2em] font-bold transition-colors"
            >
              Subscribe
            </button>
          </form>

          {newsletterStatus && (
            <p className={`text-xs ${newsletterStatus.success ? 'text-green-300' : 'text-red-300'}`}>
              {newsletterStatus.message}
            </p>
          )}
        </div>
      </div>

      {/* 3. LUXURY EDITORIAL FOOTER */}
      <footer className="py-16 bg-[#080808] text-stone text-xs tracking-wider">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col md:flex-row justify-between items-center gap-10">
          
          <div className="space-y-1 text-center md:text-left">
            <button 
              onClick={(e) => handleFooterNavClick(e, 'all', 'Kairos Sanctuary')} 
              className="font-serif text-2xl text-ivory tracking-widest block hover:text-bronze transition-colors text-left"
            >
              KAIROS
            </button>
            <div className="text-[9px] uppercase tracking-[0.25em] text-stone/50">
              A PRIVATE RESORT BUILT AROUND STILLNESS
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-8 text-[10px] uppercase tracking-[0.25em] text-stone/70">
            {[
              { label: 'Stay', id: 'stay', title: 'Suites & Residences' },
              { label: 'Experience', id: 'experience', title: 'Curated Rituals' },
              { label: 'Dining', id: 'dining', title: 'Artisanal Dining' },
              { label: 'The Resort', id: 'resort', title: 'Sanctuary & Architecture' },
              { label: 'Location', id: 'location', title: 'Location & Arrival' },
              { label: 'Contact', id: 'contact', title: 'Concierge Desk' },
            ].map((link) => (
              <button 
                key={link.label} 
                onClick={(e) => handleFooterNavClick(e, link.id, link.title)}
                className="hover:text-ivory transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Subtle Admin / Operations Link */}
          <div className="flex items-center gap-6 text-[10px] uppercase tracking-[0.2em] text-stone/50">
            <button
              onClick={openAdmin}
              className="hover:text-bronze transition-colors flex items-center gap-1.5"
              title="Open Local PMS Console"
            >
              <Shield size={12} />
              <span>Operations Portal</span>
            </button>
            <span className="text-stone/30">•</span>
            <span>Privacy & Terms</span>
          </div>

        </div>

        <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 pt-8 mt-12 border-t border-stone/10 text-center text-[9px] uppercase tracking-[0.25em] text-stone/40">
          © 2026 KAIROS RESORT & PRIVATE SANCTUARY. ALL RIGHTS RESERVED.
        </div>
      </footer>

    </div>
  );
};
