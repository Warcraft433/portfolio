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
            className="fixed inset-0 bg-black/70 dark:bg-charcoal-950/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-5xl h-[85vh] bg-white border border-slate-200 dark:bg-charcoal-900 dark:border-charcoal-800 rounded-2xl shadow-2xl flex flex-col z-10 glass-panel"
          >
            {/* Header */}
            <div className="bg-white/95 dark:bg-charcoal-900/95 backdrop-blur-md px-6 py-4 border-b border-slate-200 dark:border-charcoal-800 flex items-center justify-between z-20">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-neon-500/10 text-neon-500">
                  <FileText size={18} />
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-silver-100 font-display">Curriculum Vitae</h3>
                  <p className="text-[10px] text-slate-500 dark:text-silver-400 font-mono font-bold">ADARSH_A_RESUME.pdf</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={pdfUrl}
                  download="ADARSH_A_RESUME.pdf"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-neon-500 hover:bg-neon-600 text-white font-bold transition-all shadow-md shadow-neon-500/25"
                >
                  <Download size={14} />
                  Download
                </a>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-500 hover:text-slate-900 dark:border-charcoal-800 dark:bg-charcoal-950 dark:text-silver-400 dark:hover:text-neon-400 dark:hover:bg-charcoal-800 transition-colors"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Document Frame / Content */}
            <div className="flex-1 bg-slate-100 dark:bg-charcoal-950 p-2 md:p-4 relative flex flex-col justify-center items-center overflow-hidden">
              <iframe
                src={`${pdfUrl}#toolbar=0`}
                className="w-full h-full rounded-lg border border-slate-250 bg-white dark:border-charcoal-800 z-10"
                title="ADARSH A Resume PDF"
              />

              {/* Informative Floating Background Message */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 space-y-3 z-0">
                <FileText size={48} className="text-slate-400 dark:text-charcoal-600 animate-pulse" />
                <h4 className="text-sm font-semibold text-slate-800 dark:text-silver-100 font-display">PDF Embed Fallback</h4>
                <p className="text-xs md:text-sm text-slate-600 dark:text-silver-400 max-w-sm leading-relaxed font-medium">
                  If your browser blocks embeds or is loading slowly, you can open it directly in a new tab or use the download link.
                </p>
                <div className="flex gap-3 font-mono text-xs">
                  <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-neon-500 hover:underline font-bold"
                  >
                    Open in New Tab
                    <ExternalLink size={12} />
                  </a>
                  <span className="text-slate-300 dark:text-charcoal-700">|</span>
                  <a
                    href={pdfUrl}
                    download="ADARSH_A_RESUME.pdf"
                    className="inline-flex items-center gap-1 text-slate-700 dark:text-silver-300 hover:underline font-bold"
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
