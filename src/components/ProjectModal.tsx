import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cpu, ShieldAlert, Award, Lightbulb, Workflow } from 'lucide-react';
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
            className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-4xl bg-white border border-slate-200 dark:bg-dark-900 dark:border-dark-800 rounded-2xl shadow-2xl overflow-hidden z-10 my-8 glass-panel"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white/95 dark:bg-dark-900/90 backdrop-blur-md px-6 py-4 border-b border-slate-200 dark:border-dark-800 flex items-center justify-between z-20">
              <div>
                <span className="text-xs text-primary font-mono font-bold uppercase tracking-wider">PROJECT CASE STUDY</span>
                <h3 className="text-xl md:text-2xl font-bold font-display text-slate-900 dark:text-white mt-0.5">{project.title}</h3>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-500 hover:text-slate-900 dark:border-dark-800 dark:bg-dark-950 dark:text-dark-400 dark:hover:text-white dark:hover:bg-dark-800 transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 md:p-8 max-h-[75vh] overflow-y-auto space-y-8">
              {/* Subtitle / Tech stack */}
              <div>
                {project.subtitle && (
                  <p className="text-sm md:text-base text-slate-500 dark:text-dark-400 font-sans mb-4 italic">{project.subtitle}</p>
                )}
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded bg-slate-100 border border-slate-250 dark:bg-dark-950 dark:border-dark-800 text-xs font-mono text-slate-700 dark:text-dark-200"
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
                      className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold font-mono rounded-lg bg-slate-100 border border-slate-200 hover:bg-slate-200 hover:border-slate-350 text-slate-800 dark:bg-dark-950 dark:border-dark-800 dark:hover:border-dark-600 dark:hover:bg-dark-800 dark:text-white transition-all shadow-sm"
                    >
                      <GithubIcon size={16} />
                      Code Repository
                    </a>
                  )}
                </div>
              </div>

              {/* Achievement Callout - Readability Upgrade */}
              <div className="flex gap-4 p-4 rounded-xl border border-primary/20 bg-primary/5 dark:bg-primary/5">
                <div className="p-2 rounded bg-primary/10 text-primary h-fit">
                  <Award size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-mono text-primary font-bold uppercase tracking-wider">KEY ENGINEERING ACHIEVEMENT</h4>
                  <p className="text-sm md:text-base text-slate-800 dark:text-dark-200 mt-1 leading-relaxed font-semibold">{project.achievement}</p>
                </div>
              </div>

              {/* Problem / Solution Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 dark:border-dark-800 dark:bg-dark-950/40">
                  <h4 className="text-base font-bold font-display text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                    <ShieldAlert size={18} className="text-red-500" />
                    The Problem
                  </h4>
                  <p className="text-sm md:text-base text-slate-600 dark:text-dark-400 leading-relaxed font-sans font-medium">{project.problem}</p>
                </div>

                <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 dark:border-dark-800 dark:bg-dark-950/40">
                  <h4 className="text-base font-bold font-display text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                    <Cpu size={18} className="text-emerald-500" />
                    The Solution
                  </h4>
                  <p className="text-sm md:text-base text-slate-600 dark:text-dark-400 leading-relaxed font-sans font-medium">{project.solution}</p>
                </div>
              </div>

              {/* PrintGuard AI Architecture Visualization */}
              {project.id === 'printguard-ai' && project.architectureNodes && (
                <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/20 dark:border-dark-800 dark:bg-dark-950/20 space-y-4">
                  <h4 className="text-base font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
                    <Workflow size={18} className="text-primary" />
                    Data Flow & Hardware Architecture
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-dark-400 font-bold">
                    Real-time error analysis pipeline starting from image capturing down to printer control signals.
                  </p>
                  
                  {/* Flow Diagram */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2.5 pt-2 font-mono text-center">
                    {project.architectureNodes.map((node, i) => (
                      <React.Fragment key={node}>
                        <div className="relative p-2.5 rounded-lg border border-slate-200 bg-white dark:border-dark-800 dark:bg-dark-950 flex flex-col justify-center items-center shadow-sm">
                          <span className="text-[9px] text-slate-400 dark:text-dark-500 block mb-1">NODE 0{i + 1}</span>
                          <span className="text-[11px] font-bold text-slate-800 dark:text-white break-words leading-tight">{node}</span>
                          {/* Indicator arrow on larger screens */}
                          {i < project.architectureNodes!.length - 1 && (
                            <div className="hidden md:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-20 text-slate-400 dark:text-dark-600 text-xs">
                              →
                            </div>
                          )}
                          {/* Indicator arrow on small mobile layouts */}
                          {i < project.architectureNodes!.length - 1 && (
                            <div className="block md:hidden absolute -bottom-3.5 left-1/2 -translate-x-1/2 z-20 text-slate-400 dark:text-dark-600 text-[10px] transform rotate-90">
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
                  <h4 className="text-base font-bold font-display text-slate-900 dark:text-white mb-3">Engineering Challenges</h4>
                  <ul className="space-y-3 font-sans text-sm md:text-base text-slate-600 dark:text-dark-400">
                    {project.challenges.map((challenge, idx) => (
                      <li key={idx} className="flex gap-2 items-start font-medium leading-relaxed">
                        <span className="text-primary font-mono mt-0.5 font-bold">0{idx + 1}.</span>
                        <span>{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-base font-bold font-display text-slate-900 dark:text-white mb-3 flex items-center gap-1.5">
                    <Lightbulb size={18} className="text-yellow-500" />
                    Key Learnings
                  </h4>
                  <ul className="space-y-3 font-sans text-sm md:text-base text-slate-600 dark:text-dark-400">
                    {project.learnings.map((learning, idx) => (
                      <li key={idx} className="flex gap-2 items-start font-medium leading-relaxed">
                        <span className="text-emerald-500 font-mono mt-0.5 font-bold">✔</span>
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
