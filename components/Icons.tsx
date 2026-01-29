
import React from 'react';
import { 
  Phone, 
  Mail, 
  Globe, 
  MapPin, 
  MessageCircle, 
  QrCode, 
  Download, 
  Share2,
  X,
  CheckCircle2
} from 'lucide-react';

export const PhoneIcon = ({ className }: { className?: string }) => <Phone className={className} />;
export const MailIcon = ({ className }: { className?: string }) => <Mail className={className} />;
export const GlobeIcon = ({ className }: { className?: string }) => <Globe className={className} />;
export const MapPinIcon = ({ className }: { className?: string }) => <MapPin className={className} />;
export const WhatsAppIcon = ({ className }: { className?: string }) => <MessageCircle className={className} />;
export const QrCodeIcon = ({ className }: { className?: string }) => <QrCode className={className} />;
export const DownloadIcon = ({ className }: { className?: string }) => <Download className={className} />;
export const ShareIcon = ({ className }: { className?: string }) => <Share2 className={className} />;
export const CloseIcon = ({ className }: { className?: string }) => <X className={className} />;
export const CheckCircleIcon = ({ className }: { className?: string }) => <CheckCircle2 className={className} />;
