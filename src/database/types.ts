export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';

export interface Room {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  shortDescription: string;
  pricePerNight: number;
  capacity: number; // Max guests
  size: string; // e.g. "72 m²" or "8,500 SQ FT"
  bedType: string; // e.g. "King Bed"
  featured: boolean;
  available: boolean;
  images: string[];
  amenities: string[];
  highlights: string[];
  view: string;
}

export interface Booking {
  id: string;
  reservationCode: string;
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
  nights: number;
  subtotal: number;
  tax: number;
  total: number;
  status: BookingStatus;
  createdAt: string;
}

export interface Experience {
  id: string;
  title: string;
  slug: string;
  category: 'Wellness' | 'Adventure' | 'Culinary' | 'Nature' | 'Culture';
  description: string;
  duration: string;
  price: number;
  priceUnit: string;
  image: string;
  availability: string;
  highlights: string[];
  capacity?: string;
}

export interface DiningVenue {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  cuisine: string;
  hours: string;
  dressCode?: string;
  featuredDishes: { name: string; description: string; price?: string }[];
  image: string;
  secondaryImage?: string;
  ambiance: string;
}

export interface Amenity {
  id: string;
  title: string;
  category: 'Wellness & Spa' | 'Recreation' | 'Hospitality' | 'Spaces';
  description: string;
  image?: string;
}

export interface Review {
  id: string;
  guestName: string;
  location: string;
  rating: number;
  review: string;
  roomStayed: string;
  date: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  preferredDates?: string;
  guests?: string;
  status: 'NEW' | 'RESPONDED' | 'ARCHIVED';
  createdAt: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: string;
}

export interface ResortConfig {
  name: string;
  subtitle: string;
  location: string;
  nearestAirport: string;
  transferTimeAirport: string;
  transferTimeCity: string;
  taxRate: number; // e.g. 0.18 (18%)
  currency: string;
  currencySymbol: string;
  contactEmail: string;
  contactPhone: string;
  conciergePhone: string;
  address: string;
}
