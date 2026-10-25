import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Code2, Monitor, Cpu, Settings, Layers } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

export const Skills: React.FC = () => {
  const { skills } = portfolioData;

  const getCategoryIcon = (title: string) => {
    const lowercaseTitle = title.toLowerCase();
    if (lowercaseTitle.includes('programming')) return <Terminal size={18} className="text-neon-500" />;
    if (lowercaseTitle.includes('java') || lowercaseTitle.includes('backend')) return <Code2 size={18} className="text-neon-500" />;
    if (lowercaseTitle.includes('front')) return <Monitor size={18} className="text-silver-400 dark:text-silver-300" />;
    if (lowercaseTitle.includes('ai') || lowercaseTitle.includes('vision')) return <Cpu size={18} className="text-neon-500" />;
    if (lowercaseTitle.includes('tool')) return <Settings size={18} className="text-silver-400 dark:text-silver-300" />;
    return <Layers size={18} className="text-neon-500" />;
  };

  return (
    <section id="skills" className="py-24 border-t border-slate-200/80 dark:border-charcoal-800 bg-slate-50/20 dark:bg-charcoal-950/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-left mb-12">
          <span className="text-xs text-neon-500 font-mono font-bold uppercase tracking-wider">02 // TECH STACK</span>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-slate-900 dark:text-silver-100 mt-1">Skills & Expertises</h2>
          <div className="h-0.5 w-12 bg-neon-500 mt-2 shadow-[0_0_8px_rgba(255,30,56,0.6)]" />
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="p-6 rounded-xl border border-slate-200 bg-white hover:border-neon-500/50 dark:border-charcoal-800 dark:bg-charcoal-900/60 dark:hover:border-neon-500/50 hover:shadow-md transition-all duration-300 relative group"
            >
              {/* Corner Glow Effect */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-neon-500/10 to-transparent rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {/* Title & Icon */}
              <div className="flex items-center gap-2 mb-4 border-b border-slate-200 dark:border-charcoal-800/80 pb-3">
                <div className="p-1.5 rounded bg-slate-50 border border-slate-200 dark:bg-charcoal-950 dark:border-charcoal-800">
                  {getCategoryIcon(category.title)}
                </div>
                <h3 className="text-sm md:text-base font-bold font-display text-slate-900 dark:text-silver-100 font-mono">
                  {category.title.toUpperCase()}
                </h3>
              </div>

              {/* Badges Flow */}
              <div className="flex flex-wrap gap-2 pt-1.5">
                {category.skills.map((skill) => {
                  const isSpecial = ['Java', 'Core Java', 'OOP', 'Spring Boot', 'SQL', 'JDBC', 'REST APIs', 'YOLOv8'].includes(skill);
                  return (
                    <span
                      key={skill}
                      className={`px-3 py-1.5 rounded text-xs font-semibold font-mono border transition-colors ${
                        isSpecial
                          ? 'bg-neon-500/10 border-neon-500/35 text-neon-600 dark:bg-neon-500/15 dark:border-neon-500/40 dark:text-silver-100 hover:border-neon-500/60'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 dark:bg-charcoal-950 dark:border-charcoal-800/80 dark:text-silver-400 dark:hover:text-silver-100 dark:hover:border-neon-500/40'
                      }`}
                    >
                      {skill}
                    </span>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
