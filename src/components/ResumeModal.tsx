import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, FileText, ExternalLink } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose, pdfUrl }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/65 dark:bg-[#101014]/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-5xl h-[85vh] bg-[#FAF8F5] border border-[#D0C8BC] dark:bg-[#19191F] dark:border-[#303038] rounded-2xl shadow-2xl flex flex-col z-10 glass-panel"
          >
            {/* Header */}
            <div className="bg-[#FAF8F5]/95 dark:bg-[#19191F]/95 backdrop-blur-md px-6 py-4 border-b border-[#D0C8BC] dark:border-[#303038] flex items-center justify-between z-20">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-[#D6B77A]/12 text-[#D6B77A]">
                  <FileText size={18} />
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-bold text-[#19191F] dark:text-[#F7F5F0] font-display">Curriculum Vitae</h3>
                  <p className="text-[10px] text-[#777783] font-mono font-bold">ADARSH_A_RESUME.pdf</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={pdfUrl}
                  download="ADARSH_A_RESUME.pdf"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-[#D6B77A] hover:bg-[#C5A566] text-[#101014] font-bold transition-all shadow-md shadow-[#D6B77A]/20"
                >
                  <Download size={14} />
                  Download
                </a>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg border border-[#D0C8BC] bg-[#FAF8F5] text-[#777783] hover:text-[#19191F] dark:border-[#303038] dark:bg-[#101014] dark:hover:text-[#D6B77A] dark:hover:bg-[#22222A] transition-colors"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Document Frame / Content — Print-friendly white canvas */}
            <div className="flex-1 bg-[#F4F0E8] dark:bg-[#101014] p-2 md:p-4 relative flex flex-col justify-center items-center overflow-hidden">
              <iframe
                src={`${pdfUrl}#toolbar=0`}
                className="w-full h-full rounded-lg border border-[#D0C8BC] dark:border-[#303038] bg-white z-10"
                title="ADARSH A Resume PDF"
              />

              {/* Informative Floating Background Message */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 space-y-3 z-0">
                <FileText size={48} className="text-[#777783] animate-pulse" />
                <h4 className="text-sm font-semibold text-[#19191F] dark:text-[#F7F5F0] font-display">PDF Embed Fallback</h4>
                <p className="text-xs md:text-sm text-[#5A5A66] dark:text-[#777783] max-w-sm leading-relaxed font-medium">
                  If your browser blocks embeds or is loading slowly, you can open it directly in a new tab or use the download link.
                </p>
                <div className="flex gap-3 font-mono text-xs">
                  <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#D6B77A] hover:underline font-bold"
                  >
                    Open in New Tab
                    <ExternalLink size={12} />
                  </a>
                  <span className="text-[#D0C8BC] dark:text-[#303038]">|</span>
                  <a
                    href={pdfUrl}
                    download="ADARSH_A_RESUME.pdf"
                    className="inline-flex items-center gap-1 text-[#5A5A66] dark:text-[#777783] hover:underline font-bold"
                  >
                    Direct Download
                  </a>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
