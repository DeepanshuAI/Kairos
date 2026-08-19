import React, { useState } from 'react';
import { X, Check, Users, BedDouble, Maximize2, Sparkles, ArrowRight, ShieldCheck, Eye } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { db } from '../../database/db';

export const RoomDetailModal: React.FC = () => {
  const { selectedRoomForDetail, closeRoomDetail, openBooking } = useBooking();
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const config = db.getConfig();

  if (!selectedRoomForDetail) return null;

  const room = selectedRoomForDetail;

  const formatPrice = (amt: number) => {
    return `${config.currencySymbol}${amt.toLocaleString('en-IN')}`;
  };

  const handleBookNow = () => {
    const roomId = room.id;
    closeRoomDetail();
    openBooking(roomId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto bg-black/85 backdrop-blur-md animate-fadeIn">
      {/* Container */}
      <div className="relative w-full max-w-5xl bg-[#141312] border border-stone/20 text-ivory rounded-none shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-stone/15 bg-charcoal shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-[9px] uppercase tracking-[0.35em] text-bronze font-medium">
              ACCOMMODATION ARCHITECTURE
            </span>
            <span className="text-stone/30">•</span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-stone/60">
              {room.size}
            </span>
          </div>

          <button
            onClick={closeRoomDetail}
            className="p-2 text-stone hover:text-ivory border border-transparent hover:border-stone/30 transition-all"
            aria-label="Close room detail modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-8 md:p-10 overflow-y-auto flex-grow space-y-10">
          
          {/* Main Title & Hero Gallery */}
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-[0.3em] text-bronze font-medium block">
                  {room.view}
                </span>
                <h3 className="font-serif text-3xl sm:text-5xl font-light text-ivory tracking-tight">
                  {room.name}
                </h3>
                <p className="text-sm font-light text-stone/80 italic max-w-xl">
                  “{room.tagline}”
                </p>
              </div>

              <div className="text-left md:text-right border-t md:border-t-0 border-stone/15 pt-4 md:pt-0">
                <span className="text-[10px] uppercase tracking-[0.2em] text-stone/50 block">Nightly Rate</span>
                <div className="font-serif text-3xl sm:text-4xl text-ivory font-light text-bronze-light">
                  {formatPrice(room.pricePerNight)}
                  <span className="text-xs font-sans text-stone/50 font-normal"> / night</span>
                </div>
              </div>
            </div>

            {/* Gallery Viewer */}
            <div className="space-y-4">
              <div className="relative aspect-[16/9] min-h-[300px] sm:min-h-[420px] bg-charcoal overflow-hidden border border-stone/20">
                <img
                  src={room.images[activeImageIndex] || room.images[0]}
                  alt={`${room.name} view ${activeImageIndex + 1}`}
                  className="w-full h-full object-cover transition-all duration-700"
                />
                <div className="absolute bottom-4 left-4 text-[9px] uppercase tracking-[0.25em] bg-black/60 backdrop-blur-md px-3 py-1.5 border border-stone/20 text-ivory">
                  {activeImageIndex + 1} of {room.images.length} Photographs
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-4 overflow-x-auto pb-2">
                {room.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-24 h-16 shrink-0 overflow-hidden border transition-all duration-300 ${
                      activeImageIndex === idx ? 'border-bronze opacity-100 scale-[1.02]' : 'border-stone/20 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-charcoal/60 border border-stone/15 text-xs">
            <div className="space-y-1">
              <span className="text-[9px] uppercase tracking-[0.2em] text-stone/50 block">Spatial Footprint</span>
              <div className="flex items-center gap-2 font-medium text-ivory">
                <Maximize2 size={14} className="text-bronze" />
                <span>{room.size}</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[9px] uppercase tracking-[0.2em] text-stone/50 block">Capacity</span>
              <div className="flex items-center gap-2 font-medium text-ivory">
                <Users size={14} className="text-bronze" />
                <span>Up to {room.capacity} Guests</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[9px] uppercase tracking-[0.2em] text-stone/50 block">Bedding</span>
              <div className="flex items-center gap-2 font-medium text-ivory">
                <BedDouble size={14} className="text-bronze" />
                <span>{room.bedType}</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[9px] uppercase tracking-[0.2em] text-stone/50 block">Atmosphere</span>
              <div className="flex items-center gap-2 font-medium text-ivory">
                <Eye size={14} className="text-bronze" />
                <span>{room.view}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-[0.3em] text-bronze font-semibold block">
              SPATIAL ARCHITECTURE & DESIGN
            </span>
            <p className="text-sm sm:text-base font-light text-stone/90 leading-relaxed max-w-4xl">
              {room.description}
            </p>
          </div>

          {/* Architectural Highlights & Amenities */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-stone/15 pt-8">
            
            {/* Highlights */}
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.3em] text-bronze font-semibold block">
                SIGNATURE HIGHLIGHTS
              </span>
              <ul className="space-y-3">
                {room.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs text-stone/90 font-light">
                    <Sparkles size={14} className="text-bronze shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* In-Suite Amenities */}
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.3em] text-bronze font-semibold block">
                COMPLIMENTARY INCLUSIONS & AMENITIES
              </span>
              <ul className="space-y-2.5">
                {room.amenities.map((amenity, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs text-stone/90 font-light">
                    <Check size={14} className="text-bronze shrink-0 mt-0.5" />
                    <span>{amenity}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Guarantee & Cancellation */}
          <div className="p-4 border border-stone/15 bg-[#171615] flex items-center gap-3 text-xs text-stone/70">
            <ShieldCheck size={18} className="text-bronze shrink-0" />
            <span>
              Best Rate Guarantee directly with Kairos Resort. Includes complimentary breakfast, access to wellness spa pavilion, and 72-hour free cancellation.
            </span>
          </div>

        </div>

        {/* Bottom Action Footer */}
        <div className="px-6 py-5 bg-charcoal border-t border-stone/15 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <div>
            <span className="text-[9px] uppercase tracking-[0.2em] text-stone/50 block">From</span>
            <span className="font-serif text-2xl text-ivory font-light">{formatPrice(room.pricePerNight)}</span>
            <span className="text-xs text-stone/50"> / night + tax</span>
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto">
            <button
              onClick={handleBookNow}
              className="w-full sm:w-auto px-8 py-4 bg-bronze text-charcoal hover:bg-ivory text-xs uppercase tracking-[0.25em] font-bold shadow-2xl transition-all duration-300 flex items-center justify-center gap-3"
            >
              <span>Book This Residence</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
