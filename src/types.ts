export interface MemoryPhoto {
  id: string;
  url: string;
  title: string;
  caption: string;
  date?: string;
  rotation?: number;
}

export interface SiblingPromise {
  id: string;
  title: string;
  icon: string;
  desc: string;
  redeemed?: boolean;
}

export type RakhiType = 'royal-kundan' | 'sacred-rudraksha' | 'golden-zari' | 'floral-peacock' | 'silver-filigree';

export interface RakhiDesign {
  id: RakhiType;
  name: string;
  subtitle: string;
  primaryColor: string;
  accentColor: string;
  jewel: string;
  threadColor: string;
}

export interface AppGiftData {
  recipientName: string;
  senderName: string;
  relationship: string;
  heroHeadline: string;
  heroSubtitle: string;
  mainMessage: string;
  giftSurpriseTitle: string;
  giftSurpriseMessage: string;
  secretLetter: string;
  selectedRakhi: RakhiType;
  photos: MemoryPhoto[];
  promises: SiblingPromise[];
}
