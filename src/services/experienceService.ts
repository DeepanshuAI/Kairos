import { db } from '../database/db';
import type { Experience, DiningVenue, Amenity, Review, ResortConfig } from '../database/types';

export const getExperiences = (): Experience[] => {
  return db.getExperiences();
};

export const getExperiencesByCategory = (category: string): Experience[] => {
  return db.getExperiences().filter((e) => e.category === category);
};

export const getDiningVenues = (): DiningVenue[] => {
  return db.getDining();
};

export const getAmenities = (): Amenity[] => {
  return db.getAmenities();
};

export const getReviews = (): Review[] => {
  return db.getReviews();
};

export const getResortConfig = (): ResortConfig => {
  return db.getConfig();
};
