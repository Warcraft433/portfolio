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
            className="fixed inset-0 bg-black/60 dark:bg-[#101014]/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-4xl bg-[#FAF8F5] border border-[#D0C8BC] dark:bg-[#19191F] dark:border-[#303038] rounded-2xl shadow-2xl overflow-hidden z-10 my-8 glass-panel"
          >
            {/* Header */}
            <div className="sticky top-0 bg-[#FAF8F5]/95 dark:bg-[#19191F]/95 backdrop-blur-md px-6 py-4 border-b border-[#D0C8BC] dark:border-[#303038] flex items-center justify-between z-20">
              <div>
                <span className="text-xs text-[#D6B77A] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D6B77A]" />
                  PROJECT CASE STUDY & SPECIFICATIONS
                </span>
                <h3 className="text-xl md:text-2xl font-bold font-display text-[#19191F] dark:text-[#F7F5F0] mt-0.5">{project.title}</h3>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg border border-[#D0C8BC] bg-[#FAF8F5] text-[#777783] hover:text-[#19191F] dark:border-[#303038] dark:bg-[#101014] dark:hover:text-[#D6B77A] dark:hover:bg-[#22222A] transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 md:p-8 max-h-[78vh] overflow-y-auto space-y-7">
              
              {/* Project Image Display Banner */}
              {project.imageUrl && (
                <div className="relative w-full rounded-xl overflow-hidden border border-[#D0C8BC] dark:border-[#303038] bg-[#101014] shadow-md">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full max-h-[360px] object-cover"
                  />
                  <div className="absolute bottom-3 left-3 px-3 py-1 rounded-md bg-[#101014]/85 backdrop-blur-md border border-[#D6B77A]/30 text-[10px] font-mono text-[#F7F5F0] flex items-center gap-1.5 shadow-sm">
                    <Sparkles size={12} className="text-[#D6B77A]" />
                    <span>SYSTEM ARCHITECTURE & MOCKUP PREVIEW</span>
                  </div>
                </div>
              )}

              {/* Subtitle / Tech stack */}
              <div>
                {project.subtitle && (
                  <p className="text-sm md:text-base text-[#5A5A66] dark:text-[#777783] font-sans mb-4 italic">{project.subtitle}</p>
                )}
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded bg-[#FAF8F5] border border-[#D0C8BC] dark:bg-[#101014] dark:border-[#303038] text-xs font-mono text-[#36363E] dark:text-[#C8C6C0]"
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
                      className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold font-mono rounded-lg bg-[#FAF8F5] border border-[#D0C8BC] text-[#19191F] hover:bg-[#F4F0E8] hover:border-[#D6B77A]/50 dark:bg-[#101014] dark:border-[#303038] dark:hover:border-[#D6B77A]/50 dark:hover:text-[#D6B77A] dark:text-[#F7F5F0] transition-all shadow-sm"
                    >
                      <GithubIcon size={16} />
                      Code Repository
                    </a>
                  )}
                </div>
              </div>

              {/* Achievement Callout */}
              <div className="flex gap-4 p-4 rounded-xl border border-[#D6B77A]/25 bg-[#D6B77A]/06 dark:border-[#D6B77A]/20 dark:bg-[#D6B77A]/08">
                <div className="p-2 rounded bg-[#D6B77A]/15 text-[#D6B77A] h-fit">
                  <Award size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-mono text-[#D6B77A] font-bold uppercase tracking-wider">KEY ENGINEERING ACHIEVEMENT</h4>
                  <p className="text-sm md:text-base text-[#19191F] dark:text-[#F7F5F0] mt-1 leading-relaxed font-semibold">{project.achievement}</p>
                </div>
              </div>

              {/* Problem / Solution Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-xl border border-[#D0C8BC] bg-[#FAF8F5] dark:border-[#303038] dark:bg-[#14141A]">
                  <h4 className="text-base font-bold font-display text-[#19191F] dark:text-[#F7F5F0] mb-2 flex items-center gap-2">
                    <ShieldAlert size={18} className="text-[#D6B77A]" />
                    The Problem
                  </h4>
                  <p className="text-sm md:text-base text-[#5A5A66] dark:text-[#777783] leading-relaxed font-sans font-medium">{project.problem}</p>
                </div>

                <div className="p-5 rounded-xl border border-[#D0C8BC] bg-[#FAF8F5] dark:border-[#303038] dark:bg-[#14141A]">
                  <h4 className="text-base font-bold font-display text-[#19191F] dark:text-[#F7F5F0] mb-2 flex items-center gap-2">
                    <Cpu size={18} className="text-[#D6B77A]" />
                    The Solution
                  </h4>
                  <p className="text-sm md:text-base text-[#5A5A66] dark:text-[#777783] leading-relaxed font-sans font-medium">{project.solution}</p>
                </div>
              </div>

              {/* PrintGuard AI Architecture Visualization */}
              {project.id === 'printguard-ai' && project.architectureNodes && (
                <div className="p-5 rounded-xl border border-[#D0C8BC] bg-[#FAF8F5]/60 dark:border-[#303038] dark:bg-[#14141A] space-y-4">
                  <h4 className="text-base font-bold font-display text-[#19191F] dark:text-[#F7F5F0] flex items-center gap-2">
                    <Workflow size={18} className="text-[#D6B77A]" />
                    Data Flow & Hardware Architecture
                  </h4>
                  <p className="text-xs text-[#777783] font-bold">
                    Real-time error analysis pipeline starting from image capturing down to printer control signals.
                  </p>
                  
                  {/* Flow Diagram */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2.5 pt-2 font-mono text-center">
                    {project.architectureNodes.map((node, i) => (
                      <React.Fragment key={node}>
                        <div className="relative p-2.5 rounded-lg border border-[#D0C8BC] bg-[#FFFFFF] dark:border-[#303038] dark:bg-[#19191F] flex flex-col justify-center items-center shadow-sm">
                          <span className="text-[9px] text-[#777783] block mb-1">NODE 0{i + 1}</span>
                          <span className="text-[11px] font-bold text-[#19191F] dark:text-[#F7F5F0] break-words leading-tight">{node}</span>
                          {/* Indicator arrow on larger screens */}
                          {i < project.architectureNodes!.length - 1 && (
                            <div className="hidden md:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-20 text-[#777783] text-xs">
                              →
                            </div>
                          )}
                          {/* Indicator arrow on small mobile layouts */}
                          {i < project.architectureNodes!.length - 1 && (
                            <div className="block md:hidden absolute -bottom-3.5 left-1/2 -translate-x-1/2 z-20 text-[#777783] text-[10px] transform rotate-90">
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
                  <h4 className="text-base font-bold font-display text-[#19191F] dark:text-[#F7F5F0] mb-3">Engineering Challenges</h4>
                  <ul className="space-y-3 font-sans text-sm md:text-base text-[#5A5A66] dark:text-[#777783]">
                    {project.challenges.map((challenge, idx) => (
                      <li key={idx} className="flex gap-2 items-start font-medium leading-relaxed">
                        <span className="text-[#D6B77A] font-mono mt-0.5 font-bold">0{idx + 1}.</span>
                        <span>{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-base font-bold font-display text-[#19191F] dark:text-[#F7F5F0] mb-3 flex items-center gap-1.5">
                    <Lightbulb size={18} className="text-[#D6B77A]" />
                    Key Learnings
                  </h4>
                  <ul className="space-y-3 font-sans text-sm md:text-base text-[#5A5A66] dark:text-[#777783]">
                    {project.learnings.map((learning, idx) => (
                      <li key={idx} className="flex gap-2 items-start font-medium leading-relaxed">
                        <span className="text-[#D6B77A] font-mono mt-0.5 font-bold">✔</span>
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
