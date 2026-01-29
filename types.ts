
import React from 'react';

export interface ContactInfo {
  name: string;
  phone: string;
  whatsapp: string;
  email: string;
  website: string;
  address: string;
  mapsUrl: string;
  companyName: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  // Added React import to resolve the React namespace error
  children: React.ReactNode;
  title?: string;
}
