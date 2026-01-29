import React, { useState, useEffect } from 'react';
import { CONTACT_DATA, ASSET_URLS } from './constants';
import { 
  PhoneIcon, 
  WhatsAppIcon, 
  MailIcon, 
  GlobeIcon, 
  MapPinIcon, 
  QrCodeIcon, 
  DownloadIcon, 
  ShareIcon,
  CheckCircleIcon,
  CloseIcon
} from './components/Icons';

const App: React.FC = () => {
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleDirectWhatsApp = () => {
    window.open(`https://wa.me/${CONTACT_DATA.whatsapp}`, '_blank');
  };

  const handleDirectEmail = () => {
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT_DATA.email}`;
    window.open(gmailUrl, '_blank');
  };

  const handleSharePdfWhatsapp = () => {
    const message = encodeURIComponent(`Olá! Segue meu cartão digital: ${ASSET_URLS.cardPdf}`);
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  /**
   * NOVA LÓGICA DE E-MAIL (MOBILE-FIRST)
   * 1. Prioriza o compartilhamento nativo do sistema
   * 2. Concatena link e texto para evitar bugs de omissão em apps como Gmail
   * 3. Fallback para mailto: com encodeURIComponent
   */
  const handleSharePdfEmail = () => {
    const titulo = `Cartão Digital - ${CONTACT_DATA.name}`;
    const mensagemCompleta = `Olá, segue o link do meu cartão digital: ${ASSET_URLS.cardPdf}`;

    const abrirMailto = (assunto: string, corpo: string) => {
      const url = `mailto:?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
      window.location.href = url;
    };

    if (navigator.share) {
      navigator.share({
        title: titulo,
        text: mensagemCompleta
      }).catch(() => {
        // Se o usuário cancelar ou houver erro, tenta o plano B
        abrirMailto(titulo, mensagemCompleta);
      });
    } else {
      // Navegadores que não suportam Share API (Desktop/Antigos)
      abrirMailto(titulo, mensagemCompleta);
    }
  };

  const handleDownloadPdf = () => {
    window.open(ASSET_URLS.cardPdf, '_blank');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setShowToast(true);
    }).catch(err => {
      console.error('Falha ao copiar: ', err);
    });
  };

  const handleShareLink = () => {
    const currentUrl = window.location.href;
    const isUrlValid = currentUrl.startsWith('http');
    const finalShareUrl = isUrlValid ? currentUrl : CONTACT_DATA.website;

    if (navigator.share && isUrlValid) {
      navigator.share({
        title: CONTACT_DATA.name,
        text: `Confira o cartão digital de ${CONTACT_DATA.name}`,
        url: finalShareUrl,
      }).catch(() => {
        copyToClipboard(finalShareUrl);
      });
    } else {
      copyToClipboard(finalShareUrl);
    }
  };

  return (
    <div className="min-h-screen bg-[#161616] text-white flex flex-col items-center p-6 pb-12 max-w-md mx-auto overflow-x-hidden font-['Montserrat']">
      
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[200] bg-[#bfa072] text-[#161616] px-6 py-3 rounded-full flex items-center gap-3 shadow-2xl animate-in fade-in zoom-in duration-300">
          <CheckCircleIcon className="w-5 h-5" />
          <span className="font-bold text-sm uppercase tracking-wider">Link Copiado!</span>
        </div>
      )}

      {/* Logo Area */}
      <div className="mt-8 mb-10">
        <div className="w-56 h-56 flex items-center justify-center p-2">
          <img 
            src={ASSET_URLS.logo} 
            alt="Logo HTO"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Name and Professional Info */}
      <div className="text-center mb-8 px-4">
        <h1 className="text-2xl font-medium tracking-wide mb-1 uppercase leading-tight">
          {CONTACT_DATA.name}
        </h1>
      </div>

      {/* Main Action (Phone) */}
      <div className="w-full mb-8">
        <a 
          href={`tel:${CONTACT_DATA.phone.replace(/\D/g, '')}`}
          className="flex items-center justify-center gap-3 w-full border border-[#bfa072] py-4 rounded-sm text-xl text-[#bfa072] hover:bg-[#bfa072]/10 transition-colors"
        >
          <PhoneIcon className="w-6 h-6" />
          <span>{CONTACT_DATA.phone}</span>
        </a>
      </div>

      {/* Icon Row Buttons */}
      <div className="flex justify-between w-full mb-10 px-4">
        <button onClick={handleDirectWhatsApp} className="p-4 border border-[#bfa072]/40 rounded-sm hover:bg-[#bfa072]/10 transition-all text-[#bfa072]">
          <WhatsAppIcon className="w-7 h-7" />
        </button>
        <button onClick={handleDirectEmail} className="p-4 border border-[#bfa072]/40 rounded-sm hover:bg-[#bfa072]/10 transition-all text-[#bfa072]">
          <MailIcon className="w-7 h-7" />
        </button>
        <a href={CONTACT_DATA.website} target="_blank" rel="noopener noreferrer" className="p-4 border border-[#bfa072]/40 rounded-sm hover:bg-[#bfa072]/10 transition-all text-[#bfa072]">
          <GlobeIcon className="w-7 h-7" />
        </a>
        <a href={CONTACT_DATA.mapsUrl} target="_blank" rel="noopener noreferrer" className="p-4 border border-[#bfa072]/40 rounded-sm hover:bg-[#bfa072]/10 transition-all text-[#bfa072]">
          <MapPinIcon className="w-7 h-7" />
        </a>
      </div>

      {/* Address Text */}
      <div className="text-center text-sm text-gray-400 mb-10 max-w-[280px] leading-relaxed">
        {CONTACT_DATA.address}
      </div>

      {/* Divider */}
      <div className="w-full h-[1px] bg-[#bfa072]/30 mb-12"></div>

      {/* Secondary Bottom Buttons */}
      <div className="flex flex-col gap-4 w-full px-2 mb-12">
        <button 
          onClick={() => setIsQrModalOpen(true)}
          className="flex items-center justify-center gap-3 w-full bg-[#1e1e1e] border border-[#bfa072]/30 py-4 rounded-xl text-lg hover:border-[#bfa072] transition-all"
        >
          <QrCodeIcon className="w-5 h-5 text-[#bfa072]" />
          <span>Ver QR Code</span>
        </button>

        <button 
          onClick={handleSharePdfWhatsapp}
          className="flex items-center justify-center gap-3 w-full bg-[#1e1e1e] border border-[#bfa072]/30 py-4 rounded-xl text-lg hover:border-[#bfa072] transition-all"
        >
          <WhatsAppIcon className="w-5 h-5 text-[#bfa072]" />
          <span>Enviar por WhatsApp</span>
        </button>

        <button 
          onClick={handleSharePdfEmail}
          className="flex items-center justify-center gap-3 w-full bg-[#1e1e1e] border border-[#bfa072]/30 py-4 rounded-xl text-lg hover:border-[#bfa072] transition-all"
        >
          <MailIcon className="w-5 h-5 text-[#bfa072]" />
          <span>Enviar por e-mail</span>
        </button>

        <button 
          onClick={handleDownloadPdf}
          className="flex items-center justify-center gap-3 w-full bg-[#bfa072] text-[#161616] font-bold py-4 rounded-xl text-[15px] hover:opacity-90 transition-all shadow-lg uppercase tracking-tighter"
        >
          <DownloadIcon className="w-5 h-5 shrink-0" />
          <span className="truncate">Download para o Celular</span>
        </button>
      </div>

      {/* Bottom Logo */}
      <div className="flex items-center gap-3 mt-auto opacity-80 pb-4">
        <div className="w-10 h-10 border-2 border-[#bfa072] flex items-center justify-center overflow-hidden">
            <img src={ASSET_URLS.logo} alt="HTO Logo" className="w-full h-full object-contain scale-150" />
        </div>
        <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tighter leading-none">HTO</span>
            <span className="text-[8px] font-medium tracking-[0.2em] text-[#bfa072]">ADVOGADOS</span>
        </div>
      </div>

      {/* QR Code Modal Overlay */}
      {isQrModalOpen && (
        <div className="fixed inset-0 z-[100] bg-[#161616] overflow-y-auto animate-in slide-in-from-bottom duration-300">
          <button 
            onClick={() => setIsQrModalOpen(false)}
            className="fixed top-6 right-6 z-[110] p-2 bg-white/5 rounded-full text-[#bfa072] hover:bg-white/10 transition-colors"
          >
            <CloseIcon className="w-8 h-8" />
          </button>

          <div className="min-h-screen flex flex-col items-center justify-start p-6 pt-16 pb-12">
            <div className="mb-6 w-24 h-24 flex items-center justify-center">
              <img src={ASSET_URLS.logo} alt="Logo" className="w-full h-full object-contain opacity-50" />
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-2xl mb-8">
              <img 
                src={ASSET_URLS.qrCodeImage} 
                alt="QR Code Octávio" 
                className="w-56 h-56 md:w-64 md:h-64 object-contain"
              />
            </div>

            <div className="text-center mb-8 max-w-xs">
              <h2 className="text-2xl font-bold text-[#bfa072] mb-2 uppercase tracking-widest">QR CODE</h2>
              <p className="text-gray-400 text-sm leading-relaxed">Escaneie o código acima para acessar o cartão digital.</p>
            </div>

            <div className="flex flex-col gap-4 w-full max-w-xs">
              <button 
                onClick={handleShareLink}
                className="flex items-center justify-center gap-3 text-[#bfa072] border border-[#bfa072]/30 py-4 rounded-xl hover:bg-[#bfa072]/10 transition-all font-semibold"
              >
                <ShareIcon className="w-5 h-5" />
                <span>COMPARTILHAR LINK</span>
              </button>
              
              <button 
                onClick={() => setIsQrModalOpen(false)}
                className="flex items-center justify-center gap-2 bg-[#bfa072] text-[#161616] font-bold py-4 rounded-xl hover:opacity-90 transition-all shadow-lg uppercase"
              >
                <span>VOLTAR</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default App;