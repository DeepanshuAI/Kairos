import React from 'react';
import { MapPin, Plane, Car, Compass } from 'lucide-react';

export const LocationSection: React.FC = () => {
  return (
    <section 
      id="location" 
      className="relative z-10 w-full py-28 md:py-40 bg-[#141312] text-ivory border-b border-stone/10"
    >
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 pb-6 border-b border-stone/15">
          <div className="space-y-4 max-w-2xl">
            <div className="flex flex-col">
              <span className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-bronze font-medium block">
                08 • GEOGRAPHIC SETTING
              </span>
              <span className="text-[9px] uppercase tracking-[0.35em] text-stone/50 font-medium block mt-1">
                SECLUDED YET ACCESSIBLE
              </span>
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl font-light leading-tight">
              Location & Arrival.
            </h2>
            <p className="text-xs md:text-sm font-light text-stone/80 leading-relaxed">
              Surrounded by native greenery and protected agricultural corridors, Kairos offers total acoustic seclusion while remaining effortlessly connected to the capital’s international transit hub.
            </p>
          </div>

          <div className="text-left lg:text-right text-xs text-stone/60 space-y-1">
            <div className="text-ivory font-serif text-lg font-light">Kairos Sanctuary Corridor</div>
            <div>Rewari Greens, Haryana 123401</div>
            <div className="text-[10px] text-bronze uppercase tracking-widest font-mono">28.1920° N, 76.6239° E</div>
          </div>
        </div>

        {/* Map & Transit Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Transit & Travel Times */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.3em] text-bronze font-semibold block">
                TRANSFER TIMES & CONNECTIVITY
              </span>
              
              <div className="space-y-4">
                <div className="p-6 bg-charcoal/50 border border-stone/15 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Plane size={16} className="text-bronze" />
                      <span className="text-xs uppercase tracking-[0.2em] text-ivory font-medium">Delhi Airport (DEL)</span>
                    </div>
                    <span className="font-serif text-2xl text-bronze font-light">45 Min</span>
                  </div>
                  <p className="text-[11px] text-stone/60 font-light">
                    Direct access via the Western Peripheral Expressway. Private Mercedes-Maybach chauffeur service available.
                  </p>
                </div>

                <div className="p-6 bg-charcoal/50 border border-stone/15 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Car size={16} className="text-bronze" />
                      <span className="text-xs uppercase tracking-[0.2em] text-ivory font-medium">Cyber City & South Delhi</span>
                    </div>
                    <span className="font-serif text-2xl text-bronze font-light">30 Min</span>
                  </div>
                  <p className="text-[11px] text-stone/60 font-light">
                    Seamless connectivity through the southern green corridor without city congestion.
                  </p>
                </div>

                <div className="p-6 bg-charcoal/50 border border-stone/15 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Compass size={16} className="text-bronze" />
                      <span className="text-xs uppercase tracking-[0.2em] text-ivory font-medium">Private Helipad</span>
                    </div>
                    <span className="font-serif text-2xl text-bronze font-light">12 Min</span>
                  </div>
                  <p className="text-[11px] text-stone/60 font-light">
                    Direct landing clearance at on-site Helipad for chartered arrivals and private transfers.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 border border-stone/15 bg-[#181716] space-y-2">
              <span className="text-[9px] uppercase tracking-[0.25em] text-bronze block">CHAUFFEUR INCLUSION</span>
              <p className="text-xs text-stone/80 font-light">
                Complimentary luxury airport transfers are included with all Villa and Pavilion reservations.
              </p>
            </div>
          </div>

          {/* Right: Stylized Cartographic Map Visual */}
          <div className="lg:col-span-7 relative min-h-[420px] bg-[#11100f] border border-stone/20 overflow-hidden flex flex-col justify-between p-8 sm:p-12">
            
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#201f1e_1px,transparent_1px),linear-gradient(to_bottom,#201f1e_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />

            {/* Top Map Identifier */}
            <div className="relative z-10 flex justify-between items-start">
              <div className="space-y-1">
                <span className="text-[9px] uppercase tracking-[0.3em] text-bronze font-semibold">
                  CARTOGRAPHIC SURVEY
                </span>
                <h4 className="font-serif text-2xl font-light text-ivory">Sanctuary Topography</h4>
              </div>
              <span className="text-[9px] uppercase tracking-[0.2em] text-stone/50 bg-charcoal/80 px-3 py-1 border border-stone/20">
                SECTOR 28 • REWARI
              </span>
            </div>

            {/* Center Landmark Target Pin */}
            <div className="relative z-10 my-12 flex flex-col items-center justify-center text-center space-y-3">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border border-bronze/30 animate-ping absolute inset-0 opacity-40" />
                <div className="w-16 h-16 rounded-full border border-bronze/60 bg-bronze/10 flex items-center justify-center text-bronze shadow-[0_0_20px_rgba(202,168,124,0.3)]">
                  <MapPin size={24} />
                </div>
              </div>
              <div className="space-y-1">
                <div className="font-serif text-2xl text-ivory tracking-wide">KAIROS RESORT</div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-stone/60">45-Acre Private Enclave</div>
              </div>
            </div>

            {/* Bottom Coordinate Bar */}
            <div className="relative z-10 flex flex-wrap justify-between items-center pt-4 border-t border-stone/15 text-[10px] text-stone/60 font-mono">
              <span>LAT: 28°11'31.2"N</span>
              <span>ELEV: 242M AMSL</span>
              <span>LON: 76°37'26.0"E</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
