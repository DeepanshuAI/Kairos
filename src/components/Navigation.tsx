import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { gsap } from '../animations/utils';

export const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLElement | null)[]>([]);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Reading Progress Bar
    if (progressBarRef.current) {
      gsap.to(progressBarRef.current, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3,
        }
      });
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen && mobileMenuRef.current) {
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, clipPath: 'inset(0% 0% 100% 0%)' },
        { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', duration: 0.7, ease: 'power3.inOut' }
      );
      gsap.fromTo(
        linkRefs.current,
        { opacity: 0, y: 30, rotateX: 15 },
        { opacity: 1, y: 0, rotateX: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out', delay: 0.3 }
      );
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Residences', href: '#residences' },
    { name: 'Architecture', href: '#architecture' },
    { name: 'Lifestyle', href: '#lifestyle' },
    { name: 'Location', href: '#location' },
    { name: 'Enquire', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;

    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }

    setIsTransitioning(true);

    setTimeout(() => {
      // Jump to section instantly
      target.scrollIntoView({ behavior: 'auto' });
      
      // Allow layout/scrollTriggers a moment to catch up before fading in
      setTimeout(() => {
        setIsTransitioning(false);
      }, 150);
    }, 700);
  };

  return (
    <>
      {/* Global Transition Overlay */}
      <div 
        className={`fixed inset-0 bg-[#121110] z-[100] transition-opacity duration-700 pointer-events-none ${
          isTransitioning ? 'opacity-100' : 'opacity-0'
        }`}
      />
      
      {/* Reading Progress Bar */}
      <div 
        ref={progressBarRef} 
        className="fixed top-0 left-0 h-[2px] bg-bronze z-[60] origin-left scale-x-0 w-full"
      />
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
          isScrolled
            ? 'bg-charcoal border-b border-stone/10'
            : 'bg-transparent py-4'
        }`}
      >
      <div className={`max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 flex items-center justify-between transition-all duration-500 ${isScrolled ? 'py-5' : 'py-5 md:py-7'}`}>
        {/* Brand Mark */}
        <a 
          href="#" 
          onClick={(e) => handleNavClick(e, '#hero')}
          className="group flex items-center gap-3 tracking-[0.25em] text-xs font-medium uppercase text-ivory hover:text-bronze transition-colors duration-300"
          data-cursor="TOP"
        >
          <span className="font-serif text-xl tracking-[0.15em] text-ivory group-hover:text-bronze transition-colors duration-300">
            KAIROS
          </span>
          <span className="hidden sm:inline-block w-px h-3 bg-stone/30"></span>
          <span className="hidden sm:inline-block text-[10px] tracking-[0.3em] text-stone">
            REWARI • HARYANA
          </span>
        </a>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center space-x-12 text-[11px] uppercase tracking-[0.25em] font-medium text-stone">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href} 
              onClick={(e) => handleNavClick(e, link.href)}
              className="relative py-1 text-stone hover:text-ivory transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-ivory after:origin-right after:scale-x-0 hover:after:scale-x-100 hover:after:origin-left after:transition-transform after:duration-300"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Integrated Editorial CTA */}
        <div className="hidden lg:flex items-center">
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="group relative inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] font-medium text-ivory transition-all duration-300"
            data-cursor="ENTER"
          >
            <span className="relative after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-px after:bg-bronze after:origin-left group-hover:after:origin-right group-hover:after:scale-x-0 after:transition-transform after:duration-500">Book Private Viewing</span>
            <span className="w-4 h-px bg-bronze group-hover:w-6 transition-all duration-300" />
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-ivory p-2 focus:outline-none hover:text-bronze transition-colors relative z-50"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Full-Screen Drawer */}
      {mobileMenuOpen && (
        <div 
          ref={mobileMenuRef}
          className="lg:hidden fixed inset-0 z-40 bg-charcoal flex flex-col items-center justify-center space-y-8"
        >
          {navLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              ref={(el) => { linkRefs.current[index] = el; }}
              className="text-sm uppercase tracking-[0.35em] text-ivory hover:text-bronze transition-colors"
            >
              {link.name}
            </a>
          ))}
          <div 
            ref={(el) => { linkRefs.current[navLinks.length] = el; }}
            className="pt-8 border-t border-stone/20 mt-4 w-48 text-center"
          >
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] font-medium text-bronze transition-all duration-300"
            >
              <span>Book Viewing</span>
              <span className="w-4 h-px bg-bronze" />
            </a>
          </div>
        </div>
      )}
    </header>
    </>
  );
};
