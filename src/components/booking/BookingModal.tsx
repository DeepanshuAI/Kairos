import React, { useState, useEffect } from 'react';
import { X, Calendar, CheckCircle2, ChevronRight, ChevronLeft, ArrowRight, ShieldCheck, AlertCircle, Copy, Check } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { db } from '../../database/db';
import type { Room, Booking } from '../../database/types';
import { checkRoomAvailability, calculatePricing, createBooking } from '../../services/bookingService';

export const BookingModal: React.FC = () => {
  const { isBookingOpen, closeBooking, bookingInitialRoomId, bookingInitialDates } = useBooking();
  const rooms = db.getRooms();
  const config = db.getConfig();

  // Helper for tomorrow and +3 days dates
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const defaultCheckIn = tomorrow.toISOString().split('T')[0];

  const defaultOutDate = new Date(tomorrow);
  defaultOutDate.setDate(tomorrow.getDate() + 3);
  const defaultCheckOut = defaultOutDate.toISOString().split('T')[0];

  const [step, setStep] = useState<number>(1);
  const [checkIn, setCheckIn] = useState<string>(defaultCheckIn);
  const [checkOut, setCheckOut] = useState<string>(defaultCheckOut);
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);
  const [selectedRoomId, setSelectedRoomId] = useState<string>(rooms[0]?.id || '');
  const [guestName, setGuestName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [specialRequests, setSpecialRequests] = useState<string>('');

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  // Sync initial props when opened
  useEffect(() => {
    if (isBookingOpen) {
      setStep(1);
      setErrorMessage(null);
      setConfirmedBooking(null);
      if (bookingInitialRoomId) {
        setSelectedRoomId(bookingInitialRoomId);
      }
      if (bookingInitialDates) {
        setCheckIn(bookingInitialDates.checkIn);
        setCheckOut(bookingInitialDates.checkOut);
      }
    }
  }, [isBookingOpen, bookingInitialRoomId, bookingInitialDates]);

  if (!isBookingOpen) return null;

  const selectedRoom: Room | undefined = rooms.find((r) => r.id === selectedRoomId) || rooms[0];
  const pricing = selectedRoom ? calculatePricing(selectedRoom.pricePerNight, checkIn, checkOut) : null;

  const handleNextFromDates = () => {
    setErrorMessage(null);
    if (!checkIn || !checkOut) {
      setErrorMessage('Please select both check-in and check-out dates.');
      return;
    }
    const cin = new Date(checkIn);
    const cout = new Date(checkOut);
    if (cout <= cin) {
      setErrorMessage('Check-out date must be after check-in date.');
      return;
    }
    setStep(2);
  };

  const handleNextFromGuests = () => {
    setErrorMessage(null);
    if (adults < 1) {
      setErrorMessage('At least 1 adult is required.');
      return;
    }
    setStep(3);
  };

  const handleSelectRoom = (roomId: string) => {
    setErrorMessage(null);
    const room = rooms.find((r) => r.id === roomId);
    if (!room) return;

    if (adults + children > room.capacity) {
      setErrorMessage(`${room.name} accommodates a maximum of ${room.capacity} guests. Please adjust guests or select a larger villa.`);
      return;
    }

    const avail = checkRoomAvailability(roomId, checkIn, checkOut);
    if (!avail.isAvailable) {
      setErrorMessage(avail.reason || 'This room is unavailable for the selected dates.');
      return;
    }

    setSelectedRoomId(roomId);
    setStep(4);
  };

  const handleNextFromGuestInfo = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    if (!guestName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!phone.trim()) {
      setErrorMessage('Please enter your contact phone number.');
      return;
    }
    setStep(5);
  };

  const handleConfirmReservation = () => {
    setErrorMessage(null);
    if (!selectedRoom) return;

    const result = createBooking({
      roomId: selectedRoom.id,
      roomName: selectedRoom.name,
      guestName,
      email,
      phone,
      specialRequests,
      checkIn,
      checkOut,
      adults,
      children,
    });

    if (result.success && result.booking) {
      setConfirmedBooking(result.booking);
      setStep(6);
    } else {
      setErrorMessage(result.error || 'Failed to complete booking.');
    }
  };

  const handleCopyCode = () => {
    if (confirmedBooking?.reservationCode) {
      navigator.clipboard.writeText(confirmedBooking.reservationCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatPrice = (amt: number) => {
    return `${config.currencySymbol}${amt.toLocaleString('en-IN')}`;
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto bg-black/80 backdrop-blur-md animate-fadeIn">
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-[#141312] border border-stone/20 text-ivory rounded-none shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-stone/15 bg-charcoal shrink-0">
          <div className="space-y-1">
            <span className="text-[9px] uppercase tracking-[0.35em] text-bronze font-medium block">
              RESERVATION EXPERIENCE
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-light tracking-wide text-ivory">
              {step === 6 ? 'Reservation Confirmed' : 'Book Your Stay at Kairos'}
            </h3>
          </div>

          <button
            onClick={closeBooking}
            className="p-2 text-stone hover:text-ivory border border-transparent hover:border-stone/30 transition-all"
            aria-label="Close booking modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Step Progress Tracker */}
        {step < 6 && (
          <div className="px-6 py-3 bg-[#181716] border-b border-stone/10 shrink-0">
            <div className="flex items-center justify-between max-w-2xl mx-auto text-[10px] uppercase tracking-[0.2em]">
              {[
                { num: 1, label: 'Dates' },
                { num: 2, label: 'Guests' },
                { num: 3, label: 'Suite' },
                { num: 4, label: 'Guest Details' },
                { num: 5, label: 'Summary' },
              ].map((s) => (
                <div key={s.num} className="flex items-center gap-2">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-medium border transition-colors ${
                      step === s.num
                        ? 'bg-bronze text-charcoal border-bronze font-bold'
                        : step > s.num
                        ? 'bg-stone/20 text-ivory border-stone/40'
                        : 'text-stone/40 border-stone/20'
                    }`}
                  >
                    {step > s.num ? <Check size={12} /> : s.num}
                  </div>
                  <span className={`hidden sm:inline ${step === s.num ? 'text-ivory font-medium' : 'text-stone/50'}`}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error Alert */}
        {errorMessage && (
          <div className="px-6 py-3 bg-red-950/60 border-b border-red-800/40 text-red-200 text-xs flex items-center gap-3">
            <AlertCircle size={16} className="shrink-0 text-red-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Scrollable Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-grow space-y-8">
          
          {/* STEP 1: DATES */}
          {step === 1 && (
            <div className="space-y-8 animate-fadeIn">
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-[0.3em] text-bronze font-semibold block">STEP 01</span>
                <h4 className="font-serif text-3xl font-light text-ivory">Choose Your Stay Dates</h4>
                <p className="text-xs text-stone/70 font-light">
                  Select your arrival and departure dates to check suite availability across Kairos Resort.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div className="p-6 border border-stone/20 bg-charcoal/40 space-y-3">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-bronze font-medium">
                    <Calendar size={14} />
                    <span>Check-In Date</span>
                  </div>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full bg-[#1e1d1c] border border-stone/30 text-ivory p-3.5 text-sm focus:outline-none focus:border-bronze"
                  />
                  <span className="text-[10px] text-stone/50 block">Standard arrival from 14:00</span>
                </div>

                <div className="p-6 border border-stone/20 bg-charcoal/40 space-y-3">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-bronze font-medium">
                    <Calendar size={14} />
                    <span>Check-Out Date</span>
                  </div>
                  <input
                    type="date"
                    min={checkIn || new Date().toISOString().split('T')[0]}
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full bg-[#1e1d1c] border border-stone/30 text-ivory p-3.5 text-sm focus:outline-none focus:border-bronze"
                  />
                  <span className="text-[10px] text-stone/50 block">Standard departure until 11:00</span>
                </div>
              </div>

              <div className="p-4 border border-stone/15 bg-[#171615] flex items-center justify-between text-xs text-stone/80">
                <div className="flex items-center gap-3">
                  <ShieldCheck size={18} className="text-bronze" />
                  <span>Complimentary cancellation up to 72 hours before arrival.</span>
                </div>
                {pricing && pricing.nights > 0 && (
                  <div className="text-ivory font-medium tracking-wider">
                    {pricing.nights} {pricing.nights === 1 ? 'Night' : 'Nights'} Selected
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 2: GUESTS */}
          {step === 2 && (
            <div className="space-y-8 animate-fadeIn">
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-[0.3em] text-bronze font-semibold block">STEP 02</span>
                <h4 className="font-serif text-3xl font-light text-ivory">Number of Guests</h4>
                <p className="text-xs text-stone/70 font-light">
                  Please specify party size so we can tailor the most comfortable residence experience.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                {/* Adults */}
                <div className="p-6 border border-stone/20 bg-charcoal/40 flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-sm font-medium text-ivory block">Adults</span>
                    <span className="text-[10px] text-stone/60">Age 13 and above</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      disabled={adults <= 1}
                      onClick={() => setAdults(Math.max(1, adults - 1))}
                      className="w-8 h-8 rounded border border-stone/30 flex items-center justify-center text-ivory hover:border-bronze disabled:opacity-30"
                    >
                      -
                    </button>
                    <span className="font-serif text-xl font-medium w-6 text-center">{adults}</span>
                    <button
                      type="button"
                      disabled={adults >= 6}
                      onClick={() => setAdults(adults + 1)}
                      className="w-8 h-8 rounded border border-stone/30 flex items-center justify-center text-ivory hover:border-bronze disabled:opacity-30"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Children */}
                <div className="p-6 border border-stone/20 bg-charcoal/40 flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-sm font-medium text-ivory block">Children</span>
                    <span className="text-[10px] text-stone/60">Age 0–12</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      disabled={children <= 0}
                      onClick={() => setChildren(Math.max(0, children - 1))}
                      className="w-8 h-8 rounded border border-stone/30 flex items-center justify-center text-ivory hover:border-bronze disabled:opacity-30"
                    >
                      -
                    </button>
                    <span className="font-serif text-xl font-medium w-6 text-center">{children}</span>
                    <button
                      type="button"
                      disabled={children >= 4}
                      onClick={() => setChildren(children + 1)}
                      className="w-8 h-8 rounded border border-stone/30 flex items-center justify-center text-ivory hover:border-bronze disabled:opacity-30"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-4 border border-stone/15 bg-[#171615] text-xs text-stone/80">
                <span className="text-bronze font-medium">Note: </span>
                Our residences accommodate between 2 to 6 guests each. For parties larger than 6, our concierge can orchestrate adjoining pavilion wings.
              </div>
            </div>
          )}

          {/* STEP 3: SELECT SUITE */}
          {step === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-[0.3em] text-bronze font-semibold block">STEP 03</span>
                <h4 className="font-serif text-3xl font-light text-ivory">Select Your Residence</h4>
                <p className="text-xs text-stone/70 font-light">
                  Showing available luxury suites and villas for {formatDate(checkIn)} — {formatDate(checkOut)} ({adults + children} guests).
                </p>
              </div>

              <div className="space-y-4 pt-2">
                {rooms.map((room) => {
                  const isAvailable = checkRoomAvailability(room.id, checkIn, checkOut).isAvailable;
                  const fitsCapacity = adults + children <= room.capacity;
                  const isSelectable = isAvailable && fitsCapacity;

                  return (
                    <div
                      key={room.id}
                      className={`p-5 sm:p-6 border transition-all duration-300 grid grid-cols-1 md:grid-cols-12 gap-6 items-center ${
                        selectedRoomId === room.id
                          ? 'border-bronze bg-charcoal/80 shadow-lg'
                          : isSelectable
                          ? 'border-stone/20 bg-charcoal/40 hover:border-stone/40'
                          : 'border-stone/10 bg-black/40 opacity-60'
                      }`}
                    >
                      {/* Image Preview */}
                      <div className="md:col-span-4 aspect-[16/10] overflow-hidden relative border border-stone/15 bg-black">
                        <img
                          src={room.images[0]}
                          alt={room.name}
                          className="w-full h-full object-cover"
                        />
                        {!isAvailable && (
                          <div className="absolute inset-0 bg-black/70 flex items-center justify-center p-2 text-center">
                            <span className="text-[9px] uppercase tracking-[0.2em] font-semibold text-red-300 bg-red-950/80 px-3 py-1 border border-red-800/50">
                              Reserved For Dates
                            </span>
                          </div>
                        )}
                        {isAvailable && !fitsCapacity && (
                          <div className="absolute inset-0 bg-black/70 flex items-center justify-center p-2 text-center">
                            <span className="text-[9px] uppercase tracking-[0.2em] font-semibold text-amber-300 bg-amber-950/80 px-3 py-1 border border-amber-800/50">
                              Max {room.capacity} Guests
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Room Info */}
                      <div className="md:col-span-5 space-y-2">
                        <div className="flex items-center gap-3">
                          <h5 className="font-serif text-xl sm:text-2xl font-light text-ivory">{room.name}</h5>
                          {room.featured && (
                            <span className="text-[8px] uppercase tracking-[0.2em] text-bronze bg-bronze/10 border border-bronze/30 px-2 py-0.5">
                              Signature
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-stone/70 line-clamp-2">{room.shortDescription}</p>

                        <div className="flex flex-wrap gap-4 text-[10px] uppercase tracking-[0.15em] text-stone/60 pt-2">
                          <span>{room.size}</span>
                          <span>•</span>
                          <span>{room.bedType}</span>
                          <span>•</span>
                          <span>Up to {room.capacity} Guests</span>
                        </div>
                      </div>

                      {/* Price & CTA */}
                      <div className="md:col-span-3 flex flex-col items-start md:items-end justify-center space-y-3 border-t md:border-t-0 md:border-l border-stone/15 pt-4 md:pt-0 md:pl-6">
                        <div>
                          <span className="text-[9px] uppercase tracking-[0.2em] text-stone/50 block">Nightly Rate</span>
                          <span className="font-serif text-2xl text-ivory font-light">{formatPrice(room.pricePerNight)}</span>
                        </div>

                        <button
                          type="button"
                          disabled={!isSelectable}
                          onClick={() => handleSelectRoom(room.id)}
                          className={`w-full py-3 px-4 text-[10px] uppercase tracking-[0.2em] font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                            isSelectable
                              ? selectedRoomId === room.id
                                ? 'bg-bronze text-charcoal'
                                : 'border border-bronze text-ivory hover:bg-bronze hover:text-charcoal'
                              : 'border border-stone/20 text-stone/40 cursor-not-allowed'
                          }`}
                        >
                          <span>{selectedRoomId === room.id ? 'Selected' : 'Select Suite'}</span>
                          <ArrowRight size={12} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: GUEST INFORMATION */}
          {step === 4 && (
            <form onSubmit={handleNextFromGuestInfo} className="space-y-6 animate-fadeIn">
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-[0.3em] text-bronze font-semibold block">STEP 04</span>
                <h4 className="font-serif text-3xl font-light text-ivory">Primary Guest Information</h4>
                <p className="text-xs text-stone/70 font-light">
                  Please provide your contact details for reservation confirmation and arrival arrangements.
                </p>
              </div>

              <div className="p-4 border border-bronze/30 bg-bronze/5 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-bronze block">Selected Suite</span>
                  <span className="font-serif text-lg text-ivory font-light">{selectedRoom?.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-stone/50 block">Dates</span>
                  <span className="text-xs text-stone/80">{formatDate(checkIn)} — {formatDate(checkOut)} ({pricing?.nights} nights)</span>
                </div>
              </div>

              <div className="space-y-6 pt-2">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.25em] text-stone/60 font-medium block">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikramaditya Singh"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full bg-[#1a1918] border border-stone/30 text-ivory p-3.5 text-sm focus:outline-none focus:border-bronze"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.25em] text-stone/60 font-medium block">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#1a1918] border border-stone/30 text-ivory p-3.5 text-sm focus:outline-none focus:border-bronze"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.25em] text-stone/60 font-medium block">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#1a1918] border border-stone/30 text-ivory p-3.5 text-sm focus:outline-none focus:border-bronze"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.25em] text-stone/60 font-medium block">
                    Special In-Suite Requests & Dietary Preferences (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Airport pickup time, dietary restrictions, celebration arrangements, feather-free pillows..."
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="w-full bg-[#1a1918] border border-stone/30 text-ivory p-3.5 text-sm focus:outline-none focus:border-bronze resize-none"
                  />
                </div>
              </div>
            </form>
          )}

          {/* STEP 5: SUMMARY & BREAKDOWN */}
          {step === 5 && selectedRoom && pricing && (
            <div className="space-y-8 animate-fadeIn">
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-[0.3em] text-bronze font-semibold block">STEP 05</span>
                <h4 className="font-serif text-3xl font-light text-ivory">Reservation Summary</h4>
                <p className="text-xs text-stone/70 font-light">
                  Please review the complete details of your stay before confirming.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Stay Details */}
                <div className="lg:col-span-7 space-y-6 bg-charcoal/40 p-6 border border-stone/15">
                  <div className="flex items-start gap-4">
                    <img
                      src={selectedRoom.images[0]}
                      alt={selectedRoom.name}
                      className="w-24 h-20 object-cover border border-stone/20 shrink-0"
                    />
                    <div className="space-y-1">
                      <span className="text-[9px] uppercase tracking-[0.25em] text-bronze">RESERVED SUITE</span>
                      <h5 className="font-serif text-2xl font-light text-ivory">{selectedRoom.name}</h5>
                      <p className="text-xs text-stone/60">{selectedRoom.view}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 py-4 border-y border-stone/15 text-xs">
                    <div>
                      <span className="text-[9px] uppercase tracking-[0.2em] text-stone/50 block">Dates</span>
                      <span className="text-ivory font-medium">{formatDate(checkIn)} — {formatDate(checkOut)}</span>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-[0.2em] text-stone/50 block">Duration</span>
                      <span className="text-ivory font-medium">{pricing.nights} {pricing.nights === 1 ? 'Night' : 'Nights'}</span>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-[0.2em] text-stone/50 block">Guests</span>
                      <span className="text-ivory font-medium">{adults} Adults {children > 0 ? `, ${children} Children` : ''}</span>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-[0.2em] text-stone/50 block">Guest Name</span>
                      <span className="text-ivory font-medium">{guestName}</span>
                    </div>
                  </div>

                  {specialRequests && (
                    <div className="text-xs text-stone/70">
                      <span className="text-[9px] uppercase tracking-[0.2em] text-stone/50 block mb-1">Special Requests:</span>
                      <p className="italic">“{specialRequests}”</p>
                    </div>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="lg:col-span-5 space-y-6 bg-[#181716] p-6 border border-stone/20 flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-bronze font-semibold block">
                      PRICE BREAKDOWN
                    </span>

                    <div className="space-y-2.5 text-xs text-stone/80">
                      <div className="flex justify-between">
                        <span>{formatPrice(selectedRoom.pricePerNight)} × {pricing.nights} nights</span>
                        <span className="text-ivory">{formatPrice(pricing.subtotal)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Luxury Hospitality GST ({Math.round(pricing.taxRate * 100)}%)</span>
                        <span className="text-ivory">{formatPrice(pricing.tax)}</span>
                      </div>
                      <div className="flex justify-between text-[11px] text-stone/60">
                        <span>Artisanal breakfast & amenities</span>
                        <span className="text-bronze font-medium">Included</span>
                      </div>
                    </div>

                    <div className="border-t border-stone/20 pt-4 flex items-baseline justify-between">
                      <div>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-stone/60 block">Total Payable</span>
                        <span className="text-[9px] text-stone/40">Includes all taxes & fees</span>
                      </div>
                      <span className="font-serif text-3xl font-light text-ivory text-bronze-light">
                        {formatPrice(pricing.total)}
                      </span>
                    </div>
                  </div>

                  <div className="text-[10px] text-stone/50 pt-4 border-t border-stone/15 leading-relaxed">
                    * This demo reservation will create an active local database record without processing live payments.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: CONFIRMATION STATE */}
          {step === 6 && confirmedBooking && (
            <div className="space-y-8 text-center py-6 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-bronze/10 border border-bronze/40 flex items-center justify-center mx-auto text-bronze">
                <CheckCircle2 size={32} />
              </div>

              <div className="space-y-2 max-w-xl mx-auto">
                <span className="text-[10px] uppercase tracking-[0.35em] text-bronze font-semibold block">
                  CONFIRMATION COMPLETED
                </span>
                <h4 className="font-serif text-4xl sm:text-5xl font-light text-ivory">
                  Your reservation is confirmed.
                </h4>
                <p className="text-xs sm:text-sm text-stone/80 font-light">
                  Thank you, <span className="text-ivory font-medium">{confirmedBooking.guestName}</span>. A confirmation notification and stay itinerary have been generated.
                </p>
              </div>

              {/* Booking Record Card */}
              <div className="max-w-xl mx-auto bg-charcoal/80 border border-stone/20 p-8 text-left space-y-6 shadow-2xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone/15 gap-4">
                  <div>
                    <span className="text-[9px] uppercase tracking-[0.25em] text-stone/50 block">Reservation Code</span>
                    <span className="font-mono text-2xl text-bronze font-semibold tracking-wider">
                      {confirmedBooking.reservationCode}
                    </span>
                  </div>

                  <button
                    onClick={handleCopyCode}
                    className="inline-flex items-center gap-2 px-4 py-2 border border-stone/30 hover:border-bronze text-[10px] uppercase tracking-[0.2em] text-ivory transition-colors self-start sm:self-auto"
                  >
                    {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                    <span>{copied ? 'Copied' : 'Copy Code'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-[9px] uppercase tracking-[0.2em] text-stone/50 block">Suite</span>
                    <span className="text-ivory font-medium">{confirmedBooking.roomName}</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-[0.2em] text-stone/50 block">Dates</span>
                    <span className="text-ivory font-medium">{formatDate(confirmedBooking.checkIn)} — {formatDate(confirmedBooking.checkOut)}</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-[0.2em] text-stone/50 block">Guests</span>
                    <span className="text-ivory font-medium">{confirmedBooking.adults} Adults {confirmedBooking.children > 0 ? `, ${confirmedBooking.children} Children` : ''}</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-[0.2em] text-stone/50 block">Total Amount</span>
                    <span className="text-ivory font-medium font-serif text-lg">{formatPrice(confirmedBooking.total)}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-stone/15 text-[11px] text-stone/60 leading-relaxed">
                  Our private estate concierge will reach out to <span className="text-stone/90">{confirmedBooking.email}</span> prior to arrival to confirm chauffeured transfer details.
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={closeBooking}
                  className="px-8 py-4 bg-ivory text-charcoal hover:bg-bronze hover:text-ivory text-xs uppercase tracking-[0.25em] font-semibold transition-all duration-300"
                >
                  Return to Resort
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer Navigation Bar (Step Buttons) */}
        {step < 6 && (
          <div className="px-6 py-4 bg-charcoal border-t border-stone/15 flex items-center justify-between shrink-0">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="inline-flex items-center gap-2 px-5 py-3 border border-stone/30 hover:border-stone text-xs uppercase tracking-[0.2em] text-stone hover:text-ivory transition-colors"
              >
                <ChevronLeft size={14} />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {step === 1 && (
              <button
                type="button"
                onClick={handleNextFromDates}
                className="inline-flex items-center gap-3 px-8 py-3.5 bg-ivory text-charcoal hover:bg-bronze hover:text-ivory text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300"
              >
                <span>Select Guests</span>
                <ChevronRight size={14} />
              </button>
            )}

            {step === 2 && (
              <button
                type="button"
                onClick={handleNextFromGuests}
                className="inline-flex items-center gap-3 px-8 py-3.5 bg-ivory text-charcoal hover:bg-bronze hover:text-ivory text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300"
              >
                <span>View Available Suites</span>
                <ChevronRight size={14} />
              </button>
            )}

            {step === 3 && (
              <button
                type="button"
                onClick={() => handleSelectRoom(selectedRoomId)}
                className="inline-flex items-center gap-3 px-8 py-3.5 bg-ivory text-charcoal hover:bg-bronze hover:text-ivory text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300"
              >
                <span>Proceed with Selected Suite</span>
                <ChevronRight size={14} />
              </button>
            )}

            {step === 4 && (
              <button
                type="button"
                onClick={handleNextFromGuestInfo}
                className="inline-flex items-center gap-3 px-8 py-3.5 bg-ivory text-charcoal hover:bg-bronze hover:text-ivory text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300"
              >
                <span>Review Summary</span>
                <ChevronRight size={14} />
              </button>
            )}

            {step === 5 && (
              <button
                type="button"
                onClick={handleConfirmReservation}
                className="inline-flex items-center gap-3 px-10 py-4 bg-bronze text-charcoal hover:bg-ivory hover:text-charcoal text-xs uppercase tracking-[0.25em] font-bold shadow-2xl transition-all duration-300"
              >
                <span>Confirm Reservation</span>
                <CheckCircle2 size={16} />
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
