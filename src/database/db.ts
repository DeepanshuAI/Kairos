import type {
  Room,
  Booking,
  Experience,
  DiningVenue,
  Amenity,
  Review,
  ContactMessage,
  NewsletterSubscriber,
  ResortConfig,
  BookingStatus,
} from './types';
import {
  SEED_CONFIG,
  SEED_ROOMS,
  SEED_EXPERIENCES,
  SEED_DINING,
  SEED_AMENITIES,
  SEED_REVIEWS,
  SEED_BOOKINGS,
} from './seedData';

const DB_KEYS = {
  CONFIG: 'kairos_db_config_v1',
  ROOMS: 'kairos_db_rooms_v1',
  BOOKINGS: 'kairos_db_bookings_v1',
  EXPERIENCES: 'kairos_db_experiences_v1',
  DINING: 'kairos_db_dining_v1',
  AMENITIES: 'kairos_db_amenities_v1',
  REVIEWS: 'kairos_db_reviews_v1',
  MESSAGES: 'kairos_db_messages_v1',
  NEWSLETTER: 'kairos_db_newsletter_v1',
};

class LocalResortDatabase {
  private inMemoryFallback: Record<string, string> = {};
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.init();
  }

  private getItem(key: string): string | null {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        return window.localStorage.getItem(key);
      }
    } catch {
      // Ignore localStorage security/private mode errors
    }
    return this.inMemoryFallback[key] || null;
  }

  private setItem(key: string, value: string): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, value);
      }
    } catch {
      // Ignore
    }
    this.inMemoryFallback[key] = value;
    this.notify();
  }

  private init() {
    if (!this.getItem(DB_KEYS.CONFIG)) {
      this.setItem(DB_KEYS.CONFIG, JSON.stringify(SEED_CONFIG));
    }
    if (!this.getItem(DB_KEYS.ROOMS)) {
      this.setItem(DB_KEYS.ROOMS, JSON.stringify(SEED_ROOMS));
    }
    if (!this.getItem(DB_KEYS.EXPERIENCES)) {
      this.setItem(DB_KEYS.EXPERIENCES, JSON.stringify(SEED_EXPERIENCES));
    }
    if (!this.getItem(DB_KEYS.DINING)) {
      this.setItem(DB_KEYS.DINING, JSON.stringify(SEED_DINING));
    }
    if (!this.getItem(DB_KEYS.AMENITIES)) {
      this.setItem(DB_KEYS.AMENITIES, JSON.stringify(SEED_AMENITIES));
    }
    if (!this.getItem(DB_KEYS.REVIEWS)) {
      this.setItem(DB_KEYS.REVIEWS, JSON.stringify(SEED_REVIEWS));
    }
    if (!this.getItem(DB_KEYS.BOOKINGS)) {
      this.setItem(DB_KEYS.BOOKINGS, JSON.stringify(SEED_BOOKINGS));
    }
    if (!this.getItem(DB_KEYS.MESSAGES)) {
      this.setItem(DB_KEYS.MESSAGES, JSON.stringify([]));
    }
    if (!this.getItem(DB_KEYS.NEWSLETTER)) {
      this.setItem(DB_KEYS.NEWSLETTER, JSON.stringify([]));
    }
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((listener) => {
      try {
        listener();
      } catch (err) {
        console.error('DB listener error:', err);
      }
    });
  }

  // --- CONFIG ---
  public getConfig(): ResortConfig {
    const raw = this.getItem(DB_KEYS.CONFIG);
    return raw ? JSON.parse(raw) : SEED_CONFIG;
  }

  public updateConfig(config: Partial<ResortConfig>): ResortConfig {
    const current = this.getConfig();
    const updated = { ...current, ...config };
    this.setItem(DB_KEYS.CONFIG, JSON.stringify(updated));
    return updated;
  }

  // --- ROOMS ---
  public getRooms(): Room[] {
    const raw = this.getItem(DB_KEYS.ROOMS);
    return raw ? JSON.parse(raw) : SEED_ROOMS;
  }

  public getRoomById(id: string): Room | undefined {
    return this.getRooms().find((r) => r.id === id);
  }

  public getRoomBySlug(slug: string): Room | undefined {
    return this.getRooms().find((r) => r.slug === slug);
  }

  public updateRoom(room: Room): void {
    const rooms = this.getRooms();
    const idx = rooms.findIndex((r) => r.id === room.id);
    if (idx !== -1) {
      rooms[idx] = room;
    } else {
      rooms.push(room);
    }
    this.setItem(DB_KEYS.ROOMS, JSON.stringify(rooms));
  }

  // --- BOOKINGS ---
  public getBookings(): Booking[] {
    const raw = this.getItem(DB_KEYS.BOOKINGS);
    return raw ? JSON.parse(raw) : SEED_BOOKINGS;
  }

  public getBookingById(id: string): Booking | undefined {
    return this.getBookings().find((b) => b.id === id);
  }

  public getBookingByCode(code: string): Booking | undefined {
    return this.getBookings().find((b) => b.reservationCode.toUpperCase() === code.toUpperCase());
  }

  public createBooking(bookingData: Omit<Booking, 'id' | 'createdAt'>): Booking {
    const bookings = this.getBookings();
    const newBooking: Booking = {
      ...bookingData,
      id: 'book-' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };
    bookings.unshift(newBooking);
    this.setItem(DB_KEYS.BOOKINGS, JSON.stringify(bookings));
    return newBooking;
  }

  public updateBookingStatus(id: string, status: BookingStatus): Booking | null {
    const bookings = this.getBookings();
    const idx = bookings.findIndex((b) => b.id === id);
    if (idx === -1) return null;
    bookings[idx].status = status;
    this.setItem(DB_KEYS.BOOKINGS, JSON.stringify(bookings));
    return bookings[idx];
  }

  // --- EXPERIENCES ---
  public getExperiences(): Experience[] {
    const raw = this.getItem(DB_KEYS.EXPERIENCES);
    return raw ? JSON.parse(raw) : SEED_EXPERIENCES;
  }

  public getExperienceById(id: string): Experience | undefined {
    return this.getExperiences().find((e) => e.id === id);
  }

  // --- DINING ---
  public getDining(): DiningVenue[] {
    const raw = this.getItem(DB_KEYS.DINING);
    return raw ? JSON.parse(raw) : SEED_DINING;
  }

  public getDiningById(id: string): DiningVenue | undefined {
    return this.getDining().find((d) => d.id === id);
  }

  // --- AMENITIES ---
  public getAmenities(): Amenity[] {
    const raw = this.getItem(DB_KEYS.AMENITIES);
    return raw ? JSON.parse(raw) : SEED_AMENITIES;
  }

  // --- REVIEWS ---
  public getReviews(): Review[] {
    const raw = this.getItem(DB_KEYS.REVIEWS);
    return raw ? JSON.parse(raw) : SEED_REVIEWS;
  }

  public addReview(reviewData: Omit<Review, 'id'>): Review {
    const reviews = this.getReviews();
    const newReview: Review = {
      ...reviewData,
      id: 'rev-' + Math.random().toString(36).substring(2, 9),
    };
    reviews.unshift(newReview);
    this.setItem(DB_KEYS.REVIEWS, JSON.stringify(reviews));
    return newReview;
  }

  // --- MESSAGES ---
  public getContactMessages(): ContactMessage[] {
    const raw = this.getItem(DB_KEYS.MESSAGES);
    return raw ? JSON.parse(raw) : [];
  }

  public createContactMessage(msg: Omit<ContactMessage, 'id' | 'status' | 'createdAt'>): ContactMessage {
    const messages = this.getContactMessages();
    const newMsg: ContactMessage = {
      ...msg,
      id: 'msg-' + Math.random().toString(36).substring(2, 9),
      status: 'NEW',
      createdAt: new Date().toISOString(),
    };
    messages.unshift(newMsg);
    this.setItem(DB_KEYS.MESSAGES, JSON.stringify(messages));
    return newMsg;
  }

  public updateMessageStatus(id: string, status: 'NEW' | 'RESPONDED' | 'ARCHIVED'): void {
    const messages = this.getContactMessages();
    const idx = messages.findIndex((m) => m.id === id);
    if (idx !== -1) {
      messages[idx].status = status;
      this.setItem(DB_KEYS.MESSAGES, JSON.stringify(messages));
    }
  }

  // --- NEWSLETTER ---
  public getNewsletterSubscribers(): NewsletterSubscriber[] {
    const raw = this.getItem(DB_KEYS.NEWSLETTER);
    return raw ? JSON.parse(raw) : [];
  }

  public addNewsletterSubscriber(email: string): boolean {
    const list = this.getNewsletterSubscribers();
    const trimmed = email.trim().toLowerCase();
    if (list.some((s) => s.email.toLowerCase() === trimmed)) {
      return false; // Already subscribed
    }
    list.unshift({
      id: 'sub-' + Math.random().toString(36).substring(2, 9),
      email: trimmed,
      subscribedAt: new Date().toISOString(),
    });
    this.setItem(DB_KEYS.NEWSLETTER, JSON.stringify(list));
    return true;
  }

  // --- RESET ---
  public resetDatabase(): void {
    this.setItem(DB_KEYS.CONFIG, JSON.stringify(SEED_CONFIG));
    this.setItem(DB_KEYS.ROOMS, JSON.stringify(SEED_ROOMS));
    this.setItem(DB_KEYS.EXPERIENCES, JSON.stringify(SEED_EXPERIENCES));
    this.setItem(DB_KEYS.DINING, JSON.stringify(SEED_DINING));
    this.setItem(DB_KEYS.AMENITIES, JSON.stringify(SEED_AMENITIES));
    this.setItem(DB_KEYS.REVIEWS, JSON.stringify(SEED_REVIEWS));
    this.setItem(DB_KEYS.BOOKINGS, JSON.stringify(SEED_BOOKINGS));
    this.setItem(DB_KEYS.MESSAGES, JSON.stringify([]));
    this.setItem(DB_KEYS.NEWSLETTER, JSON.stringify([]));
  }
}

export const db = new LocalResortDatabase();
