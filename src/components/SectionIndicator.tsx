import React, { useEffect, useState } from 'react';

interface SectionItem {
  id: string;
  num: string;
  name: string;
}

const SECTIONS: SectionItem[] = [
  { id: 'hero', num: '01', name: 'HERO' },
  { id: 'statement', num: '02', name: 'PHILOSOPHY' },
  { id: 'architecture', num: '03', name: 'ARCHITECTURE' },
  { id: 'residences', num: '04', name: 'RESIDENCES' },
  { id: 'materials', num: '05', name: 'ATMOSPHERE' },
  { id: 'lifestyle', num: '06', name: 'EXPERIENCE' },
  { id: 'location', num: '07', name: 'LOCATION' },
  { id: 'contact', num: '08', name: 'ENQUIRE' },
];

export const SectionIndicator: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show indicator after scrolling slightly down
      setIsVisible(window.scrollY > 200);

      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(SECTIONS[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className={`fixed right-6 md:right-12 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col space-y-4 transition-opacity duration-700 pointer-events-auto ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {SECTIONS.map((sec) => {
        const isActive = activeSection === sec.id;
        return (
          <button
            key={sec.id}
            onClick={() => scrollToSection(sec.id)}
            className="group flex items-center justify-end gap-3 text-right focus:outline-none py-1"
          >
            <span
              className={`text-[9px] uppercase tracking-[0.25em] transition-all duration-300 ${
                isActive
                  ? 'text-ivory font-medium opacity-100 translate-x-0'
                  : 'text-stone/40 opacity-0 group-hover:opacity-80 -translate-x-2 group-hover:translate-x-0'
              }`}
            >
              {sec.num} {sec.name}
            </span>
            <span
              className={`h-[1px] transition-all duration-300 ${
                isActive
                  ? 'w-6 bg-bronze'
                  : 'w-2 bg-stone/30 group-hover:w-4 group-hover:bg-stone/60'
              }`}
            />
          </button>
        );
      })}
    </div>
  );
};
