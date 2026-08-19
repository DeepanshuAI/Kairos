import { db } from '../database/db';
import type { Room } from '../database/types';
import { checkRoomAvailability } from './bookingService';

export const getRooms = (): Room[] => {
  return db.getRooms();
};

export const getFeaturedRooms = (): Room[] => {
  return db.getRooms().filter((r) => r.featured);
};

export const getRoomById = (id: string): Room | undefined => {
  return db.getRoomById(id);
};

export const getRoomBySlug = (slug: string): Room | undefined => {
  return db.getRoomBySlug(slug);
};

export const getAvailableRooms = (checkInStr: string, checkOutStr: string): Room[] => {
  const rooms = db.getRooms();
  if (!checkInStr || !checkOutStr) return rooms;

  return rooms.filter((room) => {
    const avail = checkRoomAvailability(room.id, checkInStr, checkOutStr);
    return avail.isAvailable;
  });
};
