import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, CheckCircle2, RefreshCw } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

export const Learning: React.FC = () => {
  const { learning } = portfolioData;

  const getStatusBadge = (status: 'learning' | 'building' | 'mastered') => {
    switch (status) {
      case 'mastered':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-mono text-emerald-600 dark:text-emerald-400 font-bold uppercase">
            <CheckCircle2 size={10} />
            Focus Area
          </span>
        );
      case 'building':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-[9px] font-mono text-primary font-bold uppercase">
            <RefreshCw size={10} className="animate-spin-slow" />
            Building Projects
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-[9px] font-mono text-yellow-600 dark:text-yellow-400 font-bold uppercase">
            <BookOpen size={10} />
            Learning Track
          </span>
        );
    }
  };

  return (
    <section id="learning" className="py-24 border-t border-slate-150 dark:border-dark-900 bg-slate-50/50 dark:bg-dark-950/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-left mb-12">
          <span className="text-xs text-primary font-mono font-bold uppercase tracking-wider">05 // CURRENT TRAJECTORY</span>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-slate-900 dark:text-white mt-1">Currently Building & Learning</h2>
          <div className="h-0.5 w-12 bg-primary mt-2" />
        </div>

        {/* Roadmap Roadmap Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {learning.map((item, idx) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="p-5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 dark:border-dark-800 dark:bg-dark-900/50 dark:hover:border-dark-700/80 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-mono text-slate-400 dark:text-dark-500">STAGE 0{idx + 1}</span>
                  {getStatusBadge(item.status)}
                </div>

                <h3 className="text-base font-bold font-display text-slate-900 dark:text-white mt-1 leading-snug">
                  {item.name}
                </h3>
              </div>

              {/* Progress Indicator */}
              <div className="mt-5 space-y-1.5">
                <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 dark:text-dark-500 font-bold">
                  <span>FOCUS INTENSITY</span>
                  <span>{item.progress}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-dark-950 rounded-full overflow-hidden border border-slate-200 dark:border-dark-850">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.progress}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: idx * 0.1 }}
                    className={`h-full rounded-full ${
                      item.status === 'mastered'
                        ? 'bg-emerald-500 shadow-lg shadow-emerald-500/20'
                        : item.status === 'building'
                        ? 'bg-primary shadow-lg shadow-primary-500/20'
                        : 'bg-yellow-500 shadow-lg shadow-yellow-500/20'
                    }`}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
