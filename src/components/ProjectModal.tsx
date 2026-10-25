import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cpu, ShieldAlert, Award, Lightbulb, Workflow, Sparkles } from 'lucide-react';
import { GithubIcon } from './Icons';
import type { Project } from '../data/portfolio';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
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

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto">
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
            className="relative w-full max-w-4xl bg-white border border-[#dbe0eb] dark:bg-[#12131a] dark:border-[#252733] rounded-2xl shadow-2xl overflow-hidden z-10 my-8 glass-panel"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white/95 dark:bg-[#12131a]/95 backdrop-blur-md px-6 py-4 border-b border-[#dbe0eb] dark:border-[#252733] flex items-center justify-between z-20">
              <div>
                <span className="text-xs text-[#ff1744] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff1744] animate-pulse" />
                  PROJECT CASE STUDY & SPECIFICATIONS
                </span>
                <h3 className="text-xl md:text-2xl font-bold font-display text-[#12141c] dark:text-[#f4f5f8] mt-0.5">{project.title}</h3>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg border border-[#dbe0eb] bg-[#f0f2f5] text-[#71758c] hover:text-[#12141c] dark:border-[#252733] dark:bg-[#08080b] dark:hover:text-[#ff1744] dark:hover:bg-[#171822] transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 md:p-8 max-h-[78vh] overflow-y-auto space-y-7">
              
              {/* Project Image Display Banner */}
              {project.imageUrl && (
                <div className="relative w-full rounded-xl overflow-hidden border border-[#dbe0eb] dark:border-[#252733] bg-[#08080b] shadow-md">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full max-h-[360px] object-cover"
                  />
                  <div className="absolute bottom-3 left-3 px-3 py-1 rounded-md bg-[#08080b]/85 backdrop-blur-md border border-[#00e5ff]/35 text-[10px] font-mono text-[#00e5ff] flex items-center gap-1.5 shadow-sm">
                    <Sparkles size={12} className="text-[#00e5ff]" />
                    <span>SYSTEM ARCHITECTURE & MOCKUP PREVIEW</span>
                  </div>
                </div>
              )}

              {/* Subtitle / Tech stack */}
              <div>
                {project.subtitle && (
                  <p className="text-sm md:text-base text-[#4c536a] dark:text-[#9da1b5] font-sans mb-4 italic">{project.subtitle}</p>
                )}
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded bg-[#f0f2f5] border border-[#dbe0eb] dark:bg-[#08080b] dark:border-[#252733] text-xs font-mono text-[#343a4c] dark:text-[#c8ccd8]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold font-mono rounded-lg bg-[#f0f2f5] border border-[#dbe0eb] text-[#12141c] hover:bg-white hover:border-[#ff1744]/50 dark:bg-[#08080b] dark:border-[#252733] dark:hover:border-[#00e5ff]/50 dark:hover:text-[#00e5ff] dark:text-[#f4f5f8] transition-all shadow-sm"
                    >
                      <GithubIcon size={16} />
                      Code Repository
                    </a>
                  )}
                </div>
              </div>

              {/* Achievement Callout */}
              <div className="flex gap-4 p-4 rounded-xl border border-[#ff1744]/25 bg-[#ff1744]/06 dark:border-[#ff1744]/25 dark:bg-[#ff1744]/08">
                <div className="p-2 rounded bg-[#ff1744]/15 text-[#ff1744] h-fit">
                  <Award size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-mono text-[#ff1744] font-bold uppercase tracking-wider">KEY ENGINEERING ACHIEVEMENT</h4>
                  <p className="text-sm md:text-base text-[#12141c] dark:text-[#f4f5f8] mt-1 leading-relaxed font-semibold">{project.achievement}</p>
                </div>
              </div>

              {/* Problem / Solution Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-xl border border-[#dbe0eb] bg-[#f8f9fb] dark:border-[#252733] dark:bg-[#0c0d12]">
                  <h4 className="text-base font-bold font-display text-[#12141c] dark:text-[#f4f5f8] mb-2 flex items-center gap-2">
                    <ShieldAlert size={18} className="text-[#ff1744]" />
                    The Problem
                  </h4>
                  <p className="text-sm md:text-base text-[#4c536a] dark:text-[#9da1b5] leading-relaxed font-sans font-medium">{project.problem}</p>
                </div>

                <div className="p-5 rounded-xl border border-[#dbe0eb] bg-[#f8f9fb] dark:border-[#252733] dark:bg-[#0c0d12]">
                  <h4 className="text-base font-bold font-display text-[#12141c] dark:text-[#f4f5f8] mb-2 flex items-center gap-2">
                    <Cpu size={18} className="text-[#00e5ff]" />
                    The Solution
                  </h4>
                  <p className="text-sm md:text-base text-[#4c536a] dark:text-[#9da1b5] leading-relaxed font-sans font-medium">{project.solution}</p>
                </div>
              </div>

              {/* PrintGuard AI Architecture Visualization */}
              {project.id === 'printguard-ai' && project.architectureNodes && (
                <div className="p-5 rounded-xl border border-[#dbe0eb] bg-[#f8f9fb]/60 dark:border-[#252733] dark:bg-[#0c0d12] space-y-4">
                  <h4 className="text-base font-bold font-display text-[#12141c] dark:text-[#f4f5f8] flex items-center gap-2">
                    <Workflow size={18} className="text-[#ff1744]" />
                    Data Flow & Hardware Architecture
                  </h4>
                  <p className="text-xs text-[#71758c] font-bold">
                    Real-time error analysis pipeline starting from image capturing down to printer control signals.
                  </p>
                  
                  {/* Flow Diagram */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2.5 pt-2 font-mono text-center">
                    {project.architectureNodes.map((node, i) => (
                      <React.Fragment key={node}>
                        <div className="relative p-2.5 rounded-lg border border-[#dbe0eb] bg-white dark:border-[#252733] dark:bg-[#12131a] flex flex-col justify-center items-center shadow-sm">
                          <span className="text-[9px] text-[#71758c] block mb-1">NODE 0{i + 1}</span>
                          <span className="text-[11px] font-bold text-[#12141c] dark:text-[#f4f5f8] break-words leading-tight">{node}</span>
                          {/* Indicator arrow on larger screens */}
                          {i < project.architectureNodes!.length - 1 && (
                            <div className="hidden md:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-20 text-[#00e5ff] text-xs">
                              →
                            </div>
                          )}
                          {/* Indicator arrow on small mobile layouts */}
                          {i < project.architectureNodes!.length - 1 && (
                            <div className="block md:hidden absolute -bottom-3.5 left-1/2 -translate-x-1/2 z-20 text-[#00e5ff] text-[10px] transform rotate-90">
                              ↓
                            </div>
                          )}
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )}

              {/* Challenges and Learnings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-base font-bold font-display text-[#12141c] dark:text-[#f4f5f8] mb-3">Engineering Challenges</h4>
                  <ul className="space-y-3 font-sans text-sm md:text-base text-[#4c536a] dark:text-[#9da1b5]">
                    {project.challenges.map((challenge, idx) => (
                      <li key={idx} className="flex gap-2 items-start font-medium leading-relaxed">
                        <span className="text-[#ff1744] font-mono mt-0.5 font-bold">0{idx + 1}.</span>
                        <span>{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-base font-bold font-display text-[#12141c] dark:text-[#f4f5f8] mb-3 flex items-center gap-1.5">
                    <Lightbulb size={18} className="text-[#00e5ff]" />
                    Key Learnings
                  </h4>
                  <ul className="space-y-3 font-sans text-sm md:text-base text-[#4c536a] dark:text-[#9da1b5]">
                    {project.learnings.map((learning, idx) => (
                      <li key={idx} className="flex gap-2 items-start font-medium leading-relaxed">
                        <span className="text-[#00e5ff] font-mono mt-0.5 font-bold">✔</span>
                        <span>{learning}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
