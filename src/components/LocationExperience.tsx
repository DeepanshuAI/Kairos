import React, { useState, useEffect, useRef } from 'react';
import { gsap } from '../animations/utils';

interface LocationNode {
  id: string;
  name: string;
  category: string;
  distance: string;
  time: string;
  detail: string;
  x: number; // percentage in map
  y: number;
}

const LOCATION_NODES: LocationNode[] = [
  {
    id: 'kairos',
    name: 'KAIROS Private Estate',
    category: 'PRIMARY SANCTUARY',
    distance: '0 KM',
    time: '0 MIN',
    detail: '4.5 Acres Sanctuary in Rewari Green Belt',
    x: 50,
    y: 55,
  },
  {
    id: 'airport',
    name: 'IGI International Airport',
    category: 'AVIATION',
    distance: '62 KM',
    time: '45 MIN',
    detail: 'Direct access via Dwarka Expressway & NH-48 Corridor',
    x: 75,
    y: 25,
  },
  {
    id: 'cybercity',
    name: 'Gurugram Cyber City',
    category: 'BUSINESS HUB',
    distance: '48 KM',
    time: '35 MIN',
    detail: 'Seamless commute to primary regional financial center',
    x: 70,
    y: 40,
  },
  {
    id: 'highway',
    name: 'NH-48 National Highway',
    category: 'CONNECTIVITY',
    distance: '8 KM',
    time: '12 MIN',
    detail: 'Direct arterial connection to Delhi NCR network',
    x: 42,
    y: 48,
  },
  {
    id: 'greenbelt',
    name: 'Rewari Heritage Green Belt',
    category: 'ECOLOGY',
    distance: '1 KM',
    time: '3 MIN',
    detail: 'Protected agricultural and forestry canopy buffer',
    x: 35,
    y: 65,
  },
];

export const LocationExperience: React.FC = () => {
  const [activeNode, setActiveNode] = useState<LocationNode>(LOCATION_NODES[0]);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current || !mapContentRef.current) return;

    gsap.fromTo(
      mapContentRef.current,
      { scale: 1.1 },
      {
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: mapContainerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <section id="location" className="bg-[#131211] text-ivory overflow-hidden">
      
      {/* 1. EDITORIAL TRANSITION FROM LIFESTYLE */}
      <div className="py-24 md:py-36 border-b border-stone/10 bg-charcoal">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <div className="flex flex-col items-center">
            <span className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-bronze font-medium block">
              07
            </span>
            <span className="text-[9px] uppercase tracking-[0.35em] text-stone/50 font-medium block mt-1">
              CONTEXT & CONNECTIVITY
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-ivory leading-tight">
            “The right place changes everything.”
          </h2>
          <p className="font-serif text-xl sm:text-2xl font-light text-stone/80 italic max-w-2xl mx-auto">
            From how life feels — to where life happens.
          </p>
        </div>
      </div>

      {/* 2. LOCATION HERO */}
      <div className="py-20 md:py-32 border-b border-stone/10 bg-[#151413]">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 space-y-6">
          <span className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-bronze font-medium block">
            LOCATION • REWARI, HARYANA
          </span>
          <h3 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-ivory max-w-4xl leading-tight">
            Close enough to stay connected. <br className="hidden sm:inline" />
            <span className="italic text-stone/90">Quiet enough to feel removed.</span>
          </h3>
          <p className="text-xs sm:text-sm font-light text-stone/80 max-w-xl leading-relaxed">
            Nestled along the green corridors of Rewari, KAIROS offers a sanctuary within reach of the region’s essential economic and travel hubs.
          </p>
        </div>
      </div>

      {/* 3. ARCHITECTURAL CARTOGRAPHIC MAP EXPERIENCE */}
      <div className="py-24 md:py-36 border-b border-stone/10 bg-[#11100F]">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 space-y-12">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="space-y-3">
              <span className="text-[10px] uppercase tracking-[0.3em] text-bronze font-medium block">
                CARTOGRAPHIC VISUALIZATION
              </span>
              <h4 className="font-serif text-3xl sm:text-4xl font-light text-ivory">
                Regional Connectivity Map
              </h4>
            </div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-stone/50 font-medium">
              Select any location marker to inspect travel metrics
            </div>
          </div>

          {/* Map Grid Canvas */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left: Cartographic SVG Map Container */}
            <div ref={mapContainerRef} className="lg:col-span-8 relative aspect-[16/10] min-h-[380px] bg-[#181715] border border-stone/20 overflow-hidden p-6 sm:p-10 flex flex-col justify-between">
              
              <div ref={mapContentRef} className="absolute inset-0 w-full h-full">
                {/* Map Grid Pattern Overlay */}
                <div 
                  className="absolute inset-0 opacity-15 pointer-events-none"
                  style={{
                    backgroundImage: `radial-gradient(#9A8060 1px, transparent 1px)`,
                    backgroundSize: '24px 24px',
                  }}
                />

                {/* Connecting Vector Lines SVG */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-bronze/30" strokeWidth="1" strokeDasharray="4 4">
                  <line x1="50%" y1="55%" x2="75%" y2="25%" />
                  <line x1="50%" y1="55%" x2="70%" y2="40%" />
                  <line x1="50%" y1="55%" x2="42%" y2="48%" />
                  <line x1="50%" y1="55%" x2="35%" y2="65%" />
                </svg>

                {/* Location Node Pins */}
                {LOCATION_NODES.map((node) => {
                  const isActive = activeNode.id === node.id;
                  return (
                    <button
                      key={node.id}
                      onClick={() => setActiveNode(node)}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 group focus:outline-none"
                      style={{ left: `${node.x}%`, top: `${node.y}%` }}
                    >
                      <div className="relative flex items-center justify-center">
                        {isActive && (
                          <>
                            <span className="absolute w-12 h-12 rounded-full border border-bronze/40 animate-[ping_2s_ease-out_infinite]" />
                            <span className="absolute w-8 h-8 rounded-full bg-bronze/20 animate-[ping_2s_ease-out_infinite_0.5s]" />
                          </>
                        )}
                        <span 
                          className={`w-3.5 h-3.5 rounded-full transition-all duration-300 relative z-10 ${
                            isActive 
                              ? 'bg-ivory ring-4 ring-bronze scale-125' 
                              : 'bg-bronze hover:bg-ivory hover:scale-110'
                          }`} 
                        />
                        <span className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-medium text-stone/90 bg-charcoal/90 px-3 py-1.5 border border-stone/20 rounded-xs opacity-0 group-hover:opacity-100 transition-opacity z-20">
                          {node.name}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Map Footer Disclaimer */}
              <div className="relative z-10 text-[9px] uppercase tracking-[0.25em] text-stone/50">
                Cartographic Schematic • Rewari Corridor
              </div>
              <div className="relative z-10 text-[9px] uppercase tracking-[0.25em] text-bronze font-medium">
                Regional Distances (Demo Content)
              </div>
            </div>

            {/* Right: Selected Node Details Card */}
            <div className="lg:col-span-4 bg-[#161514] border border-stone/20 p-8 flex flex-col justify-between space-y-8">
              <div className="space-y-6">
                <span className="text-[10px] uppercase tracking-[0.3em] text-bronze font-semibold block">
                  {activeNode.category}
                </span>
                <h5 className="font-serif text-3xl font-light text-ivory">
                  {activeNode.name}
                </h5>
                <p className="text-xs font-light text-stone/80 leading-relaxed">
                  {activeNode.detail}
                </p>
              </div>

              <div className="border-t border-stone/15 pt-6 grid grid-cols-2 gap-4">
                <div>
                  <div className="font-serif text-3xl text-ivory font-light">{activeNode.time}</div>
                  <div className="text-[9px] uppercase tracking-[0.25em] text-stone/60 pt-1">Drive Time</div>
                </div>
                <div>
                  <div className="font-serif text-3xl text-ivory font-light">{activeNode.distance}</div>
                  <div className="text-[9px] uppercase tracking-[0.25em] text-stone/60 pt-1">Distance</div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* 4. ACCESSIBILITY & CONNECTIVITY MATRIX */}
      <div className="py-24 md:py-36 border-b border-stone/10 bg-[#141312]">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 space-y-12">
          <div className="space-y-4 max-w-xl">
            <span className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-bronze font-medium block">
              ESTIMATED METRICS
            </span>
            <h4 className="font-serif text-3xl sm:text-5xl font-light text-ivory">
              Arterial Connectivity
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-4">
            <div className="p-8 border border-stone/15 bg-charcoal/60 space-y-4">
              <div className="font-serif text-4xl sm:text-5xl text-ivory font-light">45 MIN</div>
              <div className="text-xs uppercase tracking-[0.25em] text-bronze font-medium">IGI Airport Delhi</div>
              <p className="text-xs text-stone/70 font-light leading-relaxed">
                Direct access via Dwarka Expressway & NH-48 with minimal urban traffic delays.
              </p>
            </div>

            <div className="p-8 border border-stone/15 bg-charcoal/60 space-y-4">
              <div className="font-serif text-4xl sm:text-5xl text-ivory font-light">35 MIN</div>
              <div className="text-xs uppercase tracking-[0.25em] text-bronze font-medium">Gurugram Cyber City</div>
              <p className="text-xs text-stone/70 font-light leading-relaxed">
                Seamless connection to the primary financial and commercial headquarters of Delhi NCR.
              </p>
            </div>

            <div className="p-8 border border-stone/15 bg-charcoal/60 space-y-4">
              <div className="font-serif text-4xl sm:text-5xl text-ivory font-light">12 MIN</div>
              <div className="text-xs uppercase tracking-[0.25em] text-bronze font-medium">NH-48 Expressway</div>
              <p className="text-xs text-stone/70 font-light leading-relaxed">
                Fast link to major national arterial highway corridors.
              </p>
            </div>

            <div className="p-8 border border-stone/15 bg-charcoal/60 space-y-4">
              <div className="font-serif text-4xl sm:text-5xl text-ivory font-light">85%</div>
              <div className="text-xs uppercase tracking-[0.25em] text-bronze font-medium">Green Buffer</div>
              <p className="text-xs text-stone/70 font-light leading-relaxed">
                Dedicated agricultural and natural canopy grounds buffering the 4.5 acre private estate.
              </p>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};
