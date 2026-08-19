import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type { Room } from '../database/types';

interface BookingContextType {
  isBookingOpen: boolean;
  openBooking: (initialRoomId?: string, initialDates?: { checkIn: string; checkOut: string }) => void;
  closeBooking: () => void;
  bookingInitialRoomId: string | null;
  bookingInitialDates: { checkIn: string; checkOut: string } | null;

  selectedRoomForDetail: Room | null;
  openRoomDetail: (room: Room) => void;
  closeRoomDetail: () => void;

  isAdminOpen: boolean;
  openAdmin: () => void;
  closeAdmin: () => void;

  currentView: string; // 'all' | 'stay' | 'experience' | 'dining' | 'resort' | 'location' | 'contact'
  navigateToSection: (sectionId: string, title?: string) => void;
  isPageTransitioning: boolean;
  transitionTitle: string;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingInitialRoomId, setBookingInitialRoomId] = useState<string | null>(null);
  const [bookingInitialDates, setBookingInitialDates] = useState<{ checkIn: string; checkOut: string } | null>(null);

  const [selectedRoomForDetail, setSelectedRoomForDetail] = useState<Room | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Section / Page View Transition State
  const [currentView, setCurrentView] = useState<string>('all');
  const [isPageTransitioning, setIsPageTransitioning] = useState<boolean>(false);
  const [transitionTitle, setTransitionTitle] = useState<string>('KAIROS');

  const openBooking = (initialRoomId?: string, initialDates?: { checkIn: string; checkOut: string }) => {
    setBookingInitialRoomId(initialRoomId || null);
    if (initialDates) {
      setBookingInitialDates(initialDates);
    }
    // Close room detail if open so booking modal takes focus cleanly
    setSelectedRoomForDetail(null);
    setIsBookingOpen(true);
  };

  const closeBooking = () => {
    setIsBookingOpen(false);
  };

  const openRoomDetail = (room: Room) => {
    setSelectedRoomForDetail(room);
  };

  const closeRoomDetail = () => {
    setSelectedRoomForDetail(null);
  };

  const openAdmin = () => {
    setIsAdminOpen(true);
  };

  const closeAdmin = () => {
    setIsAdminOpen(false);
  };

  const navigateToSection = (sectionId: string, title?: string) => {
    const cleanId = sectionId.replace('#', '');
    const displayTitle = title || cleanId.toUpperCase();
    
    setIsPageTransitioning(true);
    setTransitionTitle(displayTitle);

    setTimeout(() => {
      setCurrentView(cleanId);
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      
      setTimeout(() => {
        setIsPageTransitioning(false);
      }, 400);
    }, 450);
  };

  return (
    <BookingContext.Provider
      value={{
        isBookingOpen,
        openBooking,
        closeBooking,
        bookingInitialRoomId,
        bookingInitialDates,
        selectedRoomForDetail,
        openRoomDetail,
        closeRoomDetail,
        isAdminOpen,
        openAdmin,
        closeAdmin,
        currentView,
        navigateToSection,
        isPageTransitioning,
        transitionTitle,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = (): BookingContextType => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
