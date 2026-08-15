import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { gsap } from '../animations/utils';

interface ResidencePlan {
  id: string;
  name: string;
  tagline: string;
  area: string;
  bedrooms: string;
  terrace: string;
  image: string;
  highlights: string[];
}

const RESIDENCES: ResidencePlan[] = [
  {
    id: 'penthouse',
    name: 'The Penthouse Sanctuary',
    tagline: 'Entire top floorplate with 360-degree skyline views',
    area: '8,500 SQ FT',
    bedrooms: '5 En-Suite Bedrooms',
    terrace: '1,500 SQ FT Private Heated Terrace',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2000&auto=format&fit=crop',
    highlights: [
      'Private keycard lift vestibule directly into residence',
      'Double-height 22ft living pavilion with motorized glass walls',
      'Master suite with dual dressing rooms & outdoor spa plunge pool',
      'Private wine vault & sommelier tasting room',
    ],
  },
  {
    id: 'loggia',
    name: 'The Garden Loggia Estate',
    tagline: 'Ground-level sanctuary surrounded by 1.2 acres of private grounds',
    area: '7,800 SQ FT',
    bedrooms: '4 En-Suite Bedrooms',
    terrace: '2,200 SQ FT Private Water Courtyard',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2000&auto=format&fit=crop',
    highlights: [
      'Reflecting pool courtyard integrated into the formal living room',
      'Separate chef kitchen & staff quarters with independent entrance',
      'Custom travertine outdoor fireplace & covered dining pavilion',
      'Direct private access to the estate gardens',
    ],
  },
  {
    id: 'horizon',
    name: 'The Horizon Sky Villa',
    tagline: 'Mid-rise residence with dramatic cantilevered glass balconies',
    area: '8,200 SQ FT',
    bedrooms: '4 En-Suite Bedrooms',
    terrace: '1,200 SQ FT Horizon Balcony',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2000&auto=format&fit=crop',
    highlights: [
      'Floor-to-ceiling acoustic glass wall framing sunrise and sunset',
      'Custom Poliform kitchen with hand-selected Calacatta marble',
      'Integrated smart lighting & automated solar shades',
      'Private 4-car subterranean climate-controlled garage bay',
    ],
  },
];

export const ResidencesShowcase: React.FC = () => {
  const [activePlan, setActivePlan] = useState<ResidencePlan>(RESIDENCES[0]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      sectionRef.current.querySelectorAll('[data-animate]'),
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      }
    );
  }, []);

  const handlePlanChange = (plan: ResidencePlan) => {
    if (plan.id === activePlan.id) return;
    
    // Quick fade transition on image swap
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        opacity: 0,
        duration: 0.25,
        onComplete: () => {
          setActivePlan(plan);
          gsap.to(imageRef.current, { opacity: 1, duration: 0.4 });
        },
      });
    } else {
      setActivePlan(plan);
    }
  };

  return (
    <section 
      id="residences"
      ref={sectionRef}
      className="pt-28 pb-32 md:pt-36 md:pb-48 bg-[#0F0F0F] text-ivory border-b border-stone/10 overflow-hidden"
    >
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 space-y-16">
        
        {/* Section Header with clearance for fixed nav */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 pt-6" data-animate>
          <div className="space-y-4 max-w-2xl">
            <div className="flex flex-col">
              <span className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-bronze font-medium block">
                03
              </span>
              <span className="text-[9px] uppercase tracking-[0.35em] text-stone/50 font-medium block mt-1">
                PRIVATE COLLECTION
              </span>
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl font-light leading-tight">
              Twelve Privately Scaled Estates.
            </h2>
            <p className="text-xs md:text-sm font-light text-stone/80 leading-relaxed">
              Designed for absolute privacy and spatial freedom. Only one residence per floorplate across the twelve stories of KAIROS.
            </p>
          </div>

          {/* Residence Selectors — Mobile touch friendly & clear pointer buttons */}
          <div className="flex flex-wrap gap-4 border-b border-stone/20 pb-3 w-full md:w-auto">
            {RESIDENCES.map((plan) => (
              <button
                key={plan.id}
                type="button"
                onClick={() => handlePlanChange(plan)}
                className={`cursor-pointer relative z-10 text-[11px] uppercase tracking-[0.25em] font-medium transition-all duration-300 pb-2 border-b-2 ${
                  activePlan.id === plan.id
                    ? 'text-ivory border-bronze font-semibold'
                    : 'text-stone/50 border-transparent hover:text-stone'
                }`}
              >
                {plan.name.split(' ')[1]} Estate
              </button>
            ))}
          </div>
        </div>

        {/* Active Plan Interactive Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center" data-animate>
          
          {/* Image Showcase */}
          <div className="lg:col-span-7 relative group cursor-pointer" data-cursor="VIEW">
            <div className="relative aspect-[16/10] bg-charcoal overflow-hidden border border-stone/15 transition-all duration-700 group-hover:border-stone/30 group-hover:shadow-2xl">
              <img
                ref={imageRef}
                src={activePlan.image}
                alt={activePlan.name}
                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-60 transition-opacity duration-700 group-hover:opacity-80" />
            </div>

            {/* Floating Spec Badge - Slides in slightly on hover */}
            <div className="absolute bottom-6 left-6 right-6 p-4 bg-charcoal/90 backdrop-blur-md border border-stone/20 flex justify-between items-center text-xs transform transition-all duration-700 translate-y-2 opacity-90 group-hover:translate-y-0 group-hover:opacity-100 group-hover:border-stone/40">
              <span className="font-serif text-base text-ivory">{activePlan.name}</span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-bronze font-semibold flex items-center gap-4">
                {activePlan.area}
                <ArrowUpRight size={14} className="text-ivory opacity-0 -translate-x-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0" />
              </span>
            </div>
          </div>

          {/* Architectural Specs & Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.3em] text-bronze font-medium">ESTATE OVERVIEW</span>
              <h3 className="font-serif text-3xl md:text-4xl font-light text-ivory">{activePlan.name}</h3>
              <p className="text-xs md:text-sm font-light text-stone/70 leading-relaxed pt-1">
                {activePlan.tagline}
              </p>
            </div>

            {/* Spec Highlights Grid */}
            <div className="grid grid-cols-2 gap-4 py-4 border-y border-stone/15 text-xs">
              <div>
                <span className="block text-[10px] uppercase tracking-[0.2em] text-stone/50">Internal Area</span>
                <span className="font-medium text-ivory text-sm">{activePlan.area}</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-[0.2em] text-stone/50">Bedrooms</span>
                <span className="font-medium text-ivory text-sm">{activePlan.bedrooms}</span>
              </div>
              <div className="col-span-2">
                <span className="block text-[10px] uppercase tracking-[0.2em] text-stone/50">Outdoor Living</span>
                <span className="font-medium text-ivory text-sm">{activePlan.terrace}</span>
              </div>
            </div>

            {/* Feature Bullets */}
            <div className="space-y-3">
              <span className="text-[10px] uppercase tracking-[0.25em] text-stone/60 block font-medium">
                KEY ARCHITECTURAL HIGHLIGHTS
              </span>
              <ul className="space-y-2">
                {activePlan.highlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs text-stone/90 font-light">
                    <Check size={14} className="text-bronze shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Inquiry Link */}
            <div className="pt-2">
              <a
                href="#contact"
                className="group inline-flex items-center gap-4 px-6 py-3.5 border border-stone/30 hover:border-bronze hover:bg-bronze/10 text-xs uppercase tracking-[0.25em] font-semibold text-ivory transition-all duration-300"
              >
                <span>Inquire About {activePlan.name.split(' ')[1]}</span>
                <ArrowUpRight size={14} className="text-bronze group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
