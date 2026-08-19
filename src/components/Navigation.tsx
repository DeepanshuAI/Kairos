import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Calendar, Sparkles } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export const Navigation: React.FC = () => {
  const { openBooking, currentView, navigateToSection } = useBooking();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Stay', id: 'stay', title: 'Suites & Residences' },
    { name: 'Experience', id: 'experience', title: 'Curated Rituals' },
    { name: 'Dining', id: 'dining', title: 'Artisanal Dining' },
    { name: 'The Resort', id: 'resort', title: 'Sanctuary & Architecture' },
    { name: 'Location', id: 'location', title: 'Location & Arrival' },
    { name: 'Contact', id: 'contact', title: 'Concierge Desk' },
  ];

  const handleNavClick = (e: React.MouseEvent, id: string, title?: string) => {
    e.preventDefault();
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
    navigateToSection(id, title);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled || currentView !== 'all'
            ? 'bg-charcoal/95 backdrop-blur-md border-b border-stone/15 shadow-xl'
            : 'bg-transparent py-4'
        }`}
      >
        <div className={`max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 flex items-center justify-between transition-all duration-500 ${isScrolled || currentView !== 'all' ? 'py-4' : 'py-5 md:py-7'}`}>
          
          {/* Brand Mark */}
          <button 
            onClick={(e) => handleNavClick(e, 'all', 'Kairos Sanctuary')}
            className="group flex items-center gap-3 tracking-[0.25em] text-xs font-medium uppercase text-ivory hover:text-bronze transition-colors duration-300 text-left"
            data-cursor="RESORT"
          >
            <span className="font-serif text-xl sm:text-2xl tracking-[0.18em] text-ivory group-hover:text-bronze transition-colors duration-300">
              KAIROS
            </span>
            <span className="hidden sm:inline-block w-px h-3 bg-stone/30"></span>
            <span className="hidden sm:inline-block text-[9px] tracking-[0.35em] text-stone font-sans">
              LUXURY RESORT • REWARI
            </span>
          </button>

          {/* Desktop Section Links */}
          <nav className="hidden lg:flex items-center space-x-9 text-[11px] uppercase tracking-[0.25em] font-medium">
            {currentView !== 'all' && (
              <button
                onClick={(e) => handleNavClick(e, 'all', '3D Resort Overview')}
                className="inline-flex items-center gap-2 text-bronze hover:text-ivory transition-colors duration-300 py-1"
              >
                <Sparkles size={12} />
                <span>3D Overview</span>
              </button>
            )}

            {navLinks.map((link) => {
              const isActive = currentView === link.id;
              return (
                <button 
                  key={link.name}
                  onClick={(e) => handleNavClick(e, link.id, link.title)}
                  className={`relative py-1 transition-colors duration-300 ${
                    isActive
                      ? 'text-ivory font-semibold'
                      : 'text-stone/70 hover:text-ivory'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-bronze" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Primary CTA */}
          <div className="hidden lg:flex items-center gap-6">
            <button
              onClick={() => openBooking()}
              data-cursor="BOOK"
              className="group relative inline-flex items-center gap-3 px-6 py-3 text-[10px] uppercase tracking-[0.25em] font-bold text-charcoal bg-ivory border border-ivory hover:bg-bronze hover:border-bronze hover:text-charcoal transition-all duration-300 shadow-md"
            >
              <Calendar size={13} className="text-charcoal" />
              <span>Book Your Stay</span>
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              onClick={() => openBooking()}
              className="px-3.5 py-2 bg-bronze text-charcoal text-[9px] uppercase tracking-[0.2em] font-bold"
            >
              Book Stay
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-ivory p-2 focus:outline-none hover:text-bronze transition-colors relative z-50"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>

        {/* Mobile Full-Screen Drawer */}
        {mobileMenuOpen && (
          <div 
            ref={mobileMenuRef}
            className="lg:hidden fixed inset-0 z-40 bg-[#121110] flex flex-col items-center justify-center space-y-7 p-6 animate-fadeIn"
          >
            <button
              onClick={(e) => handleNavClick(e, 'all', '3D Sanctuary')}
              className="text-xs uppercase tracking-[0.3em] text-bronze hover:text-ivory transition-colors flex items-center gap-2"
            >
              <Sparkles size={14} />
              <span>Full 3D Overview</span>
            </button>

            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={(e) => handleNavClick(e, link.id, link.title)}
                className={`text-sm uppercase tracking-[0.35em] transition-colors ${
                  currentView === link.id ? 'text-bronze font-bold' : 'text-ivory hover:text-bronze'
                }`}
              >
                {link.name}
              </button>
            ))}
            
            <div className="pt-6 border-t border-stone/20 mt-4 w-56 text-center space-y-4">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openBooking();
                }}
                className="w-full py-3.5 bg-bronze text-charcoal text-xs uppercase tracking-[0.25em] font-bold shadow-xl"
              >
                Book Your Stay
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
