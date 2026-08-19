import { db } from '../database/db';
import type { Booking, BookingStatus } from '../database/types';

export interface PriceCalculation {
  nights: number;
  pricePerNight: number;
  subtotal: number;
  taxRate: number;
  tax: number;
  total: number;
}

export interface BookingSubmissionParams {
  roomId: string;
  roomName: string;
  guestName: string;
  email: string;
  phone: string;
  specialRequests?: string;
  checkIn: string; // YYYY-MM-DD
  checkOut: string; // YYYY-MM-DD
  adults: number;
  children: number;
}

export interface AvailabilityResult {
  isAvailable: boolean;
  conflictingBooking?: {
    checkIn: string;
    checkOut: string;
  };
  reason?: string;
}

export const calculateNights = (checkInStr: string, checkOutStr: string): number => {
  if (!checkInStr || !checkOutStr) return 0;
  const start = new Date(checkInStr);
  const end = new Date(checkOutStr);
  const diffTime = end.getTime() - start.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
};

export const calculatePricing = (
  pricePerNight: number,
  checkInStr: string,
  checkOutStr: string
): PriceCalculation => {
  const nights = calculateNights(checkInStr, checkOutStr);
  const config = db.getConfig();
  const taxRate = config.taxRate || 0.18;
  const subtotal = pricePerNight * nights;
  const tax = Math.round(subtotal * taxRate);
  const total = subtotal + tax;

  return {
    nights,
    pricePerNight,
    subtotal,
    taxRate,
    tax,
    total,
  };
};

export const checkRoomAvailability = (
  roomId: string,
  checkInStr: string,
  checkOutStr: string,
  excludeBookingId?: string
): AvailabilityResult => {
  if (!checkInStr || !checkOutStr) {
    return { isAvailable: false, reason: 'Please select both check-in and check-out dates.' };
  }

  const checkIn = new Date(checkInStr);
  const checkOut = new Date(checkOutStr);

  if (isNaN(checkIn.getTime()) || isNaN(checkOut.getTime())) {
    return { isAvailable: false, reason: 'Invalid date format.' };
  }

  if (checkOut <= checkIn) {
    return { isAvailable: false, reason: 'Check-out date must be after check-in date.' };
  }

  // Check against all active/confirmed bookings
  const bookings = db.getBookings();
  const overlapping = bookings.find((b) => {
    if (b.id === excludeBookingId) return false;
    if (b.roomId !== roomId) return false;
    if (b.status === 'CANCELLED') return false;

    const bStart = new Date(b.checkIn);
    const bEnd = new Date(b.checkOut);

    // Standard interval overlap: (StartA < EndB) and (EndA > StartB)
    return checkIn < bEnd && checkOut > bStart;
  });

  if (overlapping) {
    return {
      isAvailable: false,
      conflictingBooking: {
        checkIn: overlapping.checkIn,
        checkOut: overlapping.checkOut,
      },
      reason: `This room is already reserved from ${overlapping.checkIn} to ${overlapping.checkOut}.`,
    };
  }

  return { isAvailable: true };
};

export const generateReservationCode = (): string => {
  const letters = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  const randNum = Math.floor(1000 + Math.random() * 9000);
  const randLetter = letters.charAt(Math.floor(Math.random() * letters.length));
  return `KAI-${randNum}-${randLetter}`;
};

export const createBooking = (params: BookingSubmissionParams): { success: boolean; booking?: Booking; error?: string } => {
  // Validate basic inputs
  if (!params.guestName.trim()) return { success: false, error: 'Please enter your full name.' };
  if (!params.email.trim() || !params.email.includes('@')) return { success: false, error: 'Please enter a valid email address.' };
  if (!params.phone.trim()) return { success: false, error: 'Please enter a contact phone number.' };
  if (params.adults < 1) return { success: false, error: 'At least 1 adult guest is required.' };

  const room = db.getRoomById(params.roomId);
  if (!room) return { success: false, error: 'Selected room does not exist.' };

  const totalGuests = params.adults + params.children;
  if (totalGuests > room.capacity) {
    return { success: false, error: `Maximum capacity for ${room.name} is ${room.capacity} guests.` };
  }

  // Check availability
  const avail = checkRoomAvailability(params.roomId, params.checkIn, params.checkOut);
  if (!avail.isAvailable) {
    return { success: false, error: avail.reason || 'Room is unavailable for the selected dates.' };
  }

  // Calculate total
  const pricing = calculatePricing(room.pricePerNight, params.checkIn, params.checkOut);
  if (pricing.nights < 1) {
    return { success: false, error: 'Stay must be at least 1 night.' };
  }

  const reservationCode = generateReservationCode();

  const newBooking = db.createBooking({
    reservationCode,
    roomId: params.roomId,
    roomName: room.name,
    guestName: params.guestName.trim(),
    email: params.email.trim(),
    phone: params.phone.trim(),
    specialRequests: params.specialRequests?.trim() || undefined,
    checkIn: params.checkIn,
    checkOut: params.checkOut,
    adults: params.adults,
    children: params.children,
    nights: pricing.nights,
    subtotal: pricing.subtotal,
    tax: pricing.tax,
    total: pricing.total,
    status: 'CONFIRMED',
  });

  return { success: true, booking: newBooking };
};

export const getBookings = (): Booking[] => {
  return db.getBookings();
};

export const getBookingByCode = (code: string): Booking | undefined => {
  return db.getBookingByCode(code);
};

export const updateBookingStatus = (id: string, status: BookingStatus): Booking | null => {
  return db.updateBookingStatus(id, status);
};

export const getDashboardStats = () => {
  const bookings = db.getBookings();
  const rooms = db.getRooms();
  const messages = db.getContactMessages();
  const subscribers = db.getNewsletterSubscribers();

  const confirmedBookings = bookings.filter((b) => b.status === 'CONFIRMED');
  const totalRevenue = confirmedBookings.reduce((sum, b) => sum + b.total, 0);

  const todayStr = new Date().toISOString().split('T')[0];
  const upcomingArrivals = confirmedBookings.filter((b) => b.checkIn >= todayStr);

  return {
    totalBookings: bookings.length,
    confirmedBookings: confirmedBookings.length,
    totalRevenue,
    upcomingArrivalsCount: upcomingArrivals.length,
    totalRooms: rooms.length,
    totalMessages: messages.length,
    newMessagesCount: messages.filter((m) => m.status === 'NEW').length,
    subscribersCount: subscribers.length,
  };
};
