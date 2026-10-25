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
            className="fixed inset-0 bg-black/75 dark:bg-[#08080b]/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-5xl h-[85vh] bg-white border border-[#dbe0eb] dark:bg-[#12131a] dark:border-[#252733] rounded-2xl shadow-2xl flex flex-col z-10 glass-panel"
          >
            {/* Header */}
            <div className="bg-white/95 dark:bg-[#12131a]/95 backdrop-blur-md px-6 py-4 border-b border-[#dbe0eb] dark:border-[#252733] flex items-center justify-between z-20">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-[#ff1744]/12 text-[#ff1744]">
                  <FileText size={18} />
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-bold text-[#12141c] dark:text-[#f4f5f8] font-display">Curriculum Vitae</h3>
                  <p className="text-[10px] text-[#71758c] font-mono font-bold">ADARSH_A_RESUME.pdf</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={pdfUrl}
                  download="ADARSH_A_RESUME.pdf"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-[#ff1744] hover:bg-[#e50935] text-white font-bold transition-all shadow-md shadow-[#ff1744]/25 hover:shadow-[#00e5ff]/30"
                >
                  <Download size={14} />
                  Download
                </a>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg border border-[#dbe0eb] bg-[#f0f2f5] text-[#71758c] hover:text-[#12141c] dark:border-[#252733] dark:bg-[#08080b] dark:hover:text-[#ff1744] dark:hover:bg-[#171822] transition-colors"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Document Frame / Content — Print-friendly white canvas */}
            <div className="flex-1 bg-[#f0f2f5] dark:bg-[#08080b] p-2 md:p-4 relative flex flex-col justify-center items-center overflow-hidden">
              <iframe
                src={`${pdfUrl}#toolbar=0`}
                className="w-full h-full rounded-lg border border-[#dbe0eb] dark:border-[#252733] bg-white z-10"
                title="ADARSH A Resume PDF"
              />

              {/* Informative Floating Background Message */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 space-y-3 z-0">
                <FileText size={48} className="text-[#71758c] animate-pulse" />
                <h4 className="text-sm font-semibold text-[#12141c] dark:text-[#f4f5f8] font-display">PDF Embed Fallback</h4>
                <p className="text-xs md:text-sm text-[#4c536a] dark:text-[#9da1b5] max-w-sm leading-relaxed font-medium">
                  If your browser blocks embeds or is loading slowly, you can open it directly in a new tab or use the download link.
                </p>
                <div className="flex gap-3 font-mono text-xs">
                  <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#00e5ff] hover:underline font-bold"
                  >
                    Open in New Tab
                    <ExternalLink size={12} />
                  </a>
                  <span className="text-[#dbe0eb] dark:text-[#252733]">|</span>
                  <a
                    href={pdfUrl}
                    download="ADARSH_A_RESUME.pdf"
                    className="inline-flex items-center gap-1 text-[#4c536a] dark:text-[#9da1b5] hover:underline font-bold"
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
