import { db } from '../database/db';
import type { ContactMessage } from '../database/types';

export interface SubmitContactParams {
  name: string;
  email: string;
  phone: string;
  message: string;
  preferredDates?: string;
  guests?: string;
}

export const submitContactMessage = (params: SubmitContactParams): { success: boolean; message?: ContactMessage; error?: string } => {
  if (!params.name.trim()) return { success: false, error: 'Please enter your name.' };
  if (!params.email.trim() || !params.email.includes('@')) return { success: false, error: 'Please enter a valid email address.' };
  if (!params.message.trim()) return { success: false, error: 'Please enter a message.' };

  const newMsg = db.createContactMessage({
    name: params.name.trim(),
    email: params.email.trim(),
    phone: params.phone.trim(),
    message: params.message.trim(),
    preferredDates: params.preferredDates?.trim() || undefined,
    guests: params.guests?.trim() || undefined,
  });

  return { success: true, message: newMsg };
};

export const subscribeNewsletter = (email: string): { success: boolean; message: string } => {
  if (!email || !email.includes('@')) {
    return { success: false, message: 'Please enter a valid email address.' };
  }

  const added = db.addNewsletterSubscriber(email);
  if (!added) {
    return { success: true, message: 'You are already subscribed to notes from Kairos.' };
  }
  return { success: true, message: 'Thank you for subscribing to occasional notes from Kairos.' };
};

export const getContactMessages = (): ContactMessage[] => {
  return db.getContactMessages();
};
