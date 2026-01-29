
import React from 'react';
import { ModalProps } from '../types';
import { CloseIcon } from './Icons';

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#1a1a1a] border border-[#bfa072]/30 w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl">
        <div className="flex justify-between items-center p-4 border-b border-[#bfa072]/10">
          <h3 className="text-white font-semibold text-lg">{title}</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6 flex flex-col items-center">
          {children}
        </div>
      </div>
    </div>
  );
};
