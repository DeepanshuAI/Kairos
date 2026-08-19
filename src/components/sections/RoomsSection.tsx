import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, Check, BedDouble, Users, Maximize2, Calendar, Eye } from 'lucide-react';
import { db } from '../../database/db';
import type { Room } from '../../database/types';
import { useBooking } from '../../context/BookingContext';

export const RoomsSection: React.FC = () => {
  const { openBooking, openRoomDetail } = useBooking();
  const [rooms, setRooms] = useState<Room[]>(db.getRooms());
  const [activeRoomIndex, setActiveRoomIndex] = useState<number>(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const config = db.getConfig();

  useEffect(() => {
    // Subscribe to db updates if any
    const unsubscribe = db.subscribe(() => {
      setRooms(db.getRooms());
    });
    return unsubscribe;
  }, []);

  const activeRoom = rooms[activeRoomIndex] || rooms[0];

  const formatPrice = (amt: number) => {
    return `${config.currencySymbol}${amt.toLocaleString('en-IN')}`;
  };

  return (
    <section 
      id="stay"
      ref={sectionRef}
      className="relative z-10 w-full py-28 md:py-40 bg-[#121110] text-ivory border-b border-stone/10"
    >
      <div className="max-w-[1800px] w-full mx-auto px-6 md:px-12 lg:px-16 space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 pb-6 border-b border-stone/15">
          <div className="space-y-4 max-w-2xl">
            <div className="flex flex-col">
              <span className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-bronze font-medium block">
                03 • ACCOMMODATIONS
              </span>
              <span className="text-[9px] uppercase tracking-[0.35em] text-stone/50 font-medium block mt-1">
                PRIVATE SANCTUARIES
              </span>
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl font-light leading-tight">
              Stay Your Way.
            </h2>
            <p className="text-xs md:text-sm font-light text-stone/80 leading-relaxed">
              Designed for absolute privacy and spatial freedom. Each suite and villa at Kairos is oriented towards natural light, peaceful water reflections, and indigenous forest canopies.
            </p>
          </div>

          {/* Room Switcher Tabs */}
          <div className="flex flex-wrap gap-2 sm:gap-4 overflow-x-auto pb-2 w-full lg:w-auto">
            {rooms.map((room, idx) => (
              <button
                key={room.id}
                onClick={() => setActiveRoomIndex(idx)}
                className={`text-[10px] uppercase tracking-[0.2em] px-4 py-2.5 transition-all duration-300 border ${
                  activeRoomIndex === idx
                    ? 'border-bronze bg-bronze/10 text-ivory font-semibold shadow-md'
                    : 'border-stone/20 text-stone/50 hover:border-stone/40 hover:text-stone'
                }`}
              >
                {room.name}
              </button>
            ))}
          </div>
        </div>

        {/* Active Room Detailed Showcase Grid */}
        {activeRoom && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Room Specs & Actions */}
            <div className="lg:col-span-5 space-y-8 bg-charcoal/60 backdrop-blur-md p-8 sm:p-10 border border-stone/15 rounded-none shadow-2xl">
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-bronze font-medium">
                    {activeRoom.view}
                  </span>
                  {activeRoom.featured && (
                    <span className="text-[9px] uppercase tracking-[0.2em] text-bronze bg-bronze/10 border border-bronze/30 px-2.5 py-0.5 font-medium">
                      Featured
                    </span>
                  )}
                </div>
                
                <h3 className="font-serif text-3xl sm:text-4xl font-light text-ivory">
                  {activeRoom.name}
                </h3>
                
                <p className="text-xs sm:text-sm font-light text-stone/70 leading-relaxed pt-1">
                  {activeRoom.shortDescription}
                </p>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-4 py-4 border-y border-stone/15 text-xs">
                <div className="space-y-1">
                  <span className="block text-[9px] uppercase tracking-[0.2em] text-stone/50">Footprint</span>
                  <div className="flex items-center gap-2 font-medium text-ivory text-sm">
                    <Maximize2 size={13} className="text-bronze" />
                    <span>{activeRoom.size}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="block text-[9px] uppercase tracking-[0.2em] text-stone/50">Capacity</span>
                  <div className="flex items-center gap-2 font-medium text-ivory text-sm">
                    <Users size={13} className="text-bronze" />
                    <span>{activeRoom.capacity} Guests</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="block text-[9px] uppercase tracking-[0.2em] text-stone/50">Bedding</span>
                  <div className="flex items-center gap-2 font-medium text-ivory text-sm">
                    <BedDouble size={13} className="text-bronze" />
                    <span>{activeRoom.bedType}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="block text-[9px] uppercase tracking-[0.2em] text-stone/50">Nightly Rate</span>
                  <span className="font-serif text-xl font-light text-ivory text-bronze-light">
                    {formatPrice(activeRoom.pricePerNight)}
                  </span>
                </div>
              </div>

              {/* Inclusions */}
              <div className="space-y-3">
                <span className="text-[10px] uppercase tracking-[0.25em] text-stone/60 block font-medium">
                  KEY INCLUSIONS
                </span>
                <ul className="space-y-2">
                  {activeRoom.amenities.slice(0, 4).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs text-stone/90 font-light">
                      <Check size={14} className="text-bronze shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Dual CTAs: View Room & Check Availability */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
                <button
                  type="button"
                  onClick={() => openBooking(activeRoom.id)}
                  data-cursor="BOOK"
                  className="w-full sm:w-auto flex-1 px-6 py-4 bg-bronze text-charcoal hover:bg-ivory text-xs uppercase tracking-[0.25em] font-bold shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <Calendar size={14} />
                  <span>Check Availability</span>
                </button>

                <button
                  type="button"
                  onClick={() => openRoomDetail(activeRoom)}
                  data-cursor="VIEW"
                  className="w-full sm:w-auto px-6 py-4 border border-stone/30 hover:border-ivory text-xs uppercase tracking-[0.25em] font-medium text-ivory transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Eye size={14} />
                  <span>View Details</span>
                </button>
              </div>

            </div>

            {/* Right: Immersive Photography Grid */}
            <div className="lg:col-span-7 space-y-4">
              <div 
                className="relative aspect-[16/10] bg-charcoal overflow-hidden border border-stone/20 group cursor-pointer"
                onClick={() => openRoomDetail(activeRoom)}
              >
                <img
                  src={activeRoom.images[0]}
                  alt={activeRoom.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.2em] text-ivory font-medium bg-black/60 backdrop-blur-md px-3 py-1.5 border border-stone/20">
                    Click to view full {activeRoom.images.length}-photo gallery
                  </span>
                  <ArrowUpRight size={18} className="text-ivory group-hover:text-bronze transition-colors" />
                </div>
              </div>

              {/* Secondary Thumbnails */}
              <div className="grid grid-cols-2 gap-4">
                {activeRoom.images.slice(1, 3).map((img, i) => (
                  <div
                    key={i}
                    onClick={() => openRoomDetail(activeRoom)}
                    className="relative aspect-[16/9] bg-charcoal overflow-hidden border border-stone/20 cursor-pointer group"
                  >
                    <img
                      src={img}
                      alt={`${activeRoom.name} detail`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
