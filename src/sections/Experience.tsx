import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, Briefcase, CheckCircle2, ShieldCheck } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

export const Experience: React.FC = () => {
  const { experience, certifications } = portfolioData;

  const getIcon = (type: string) => {
    if (type === 'training') return <Award size={18} className="text-spring" />;
    if (type === 'internship') return <Briefcase size={18} className="text-primary" />;
    return <GraduationCap size={18} className="text-primary" />;
  };

  return (
    <section id="experience" className="py-24 border-t border-slate-150 dark:border-dark-900 bg-slate-50/20 dark:bg-dark-950/20 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-left mb-16">
          <span className="text-xs text-primary font-mono font-bold uppercase tracking-wider">04 // QUALIFICATIONS</span>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-slate-900 dark:text-white mt-1">Education, Training & Experience</h2>
          <div className="h-0.5 w-12 bg-primary mt-2" />
        </div>

        {/* Timeline Path */}
        <div className="relative border-l border-slate-200 dark:border-dark-800 ml-4 md:ml-8 pl-6 md:pl-10 space-y-10">
          {experience.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative group"
            >
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-[35px] md:-left-[51px] top-1.5 p-1.5 rounded-full bg-slate-50 border border-slate-250 dark:bg-dark-950 dark:border-dark-850 text-slate-800 dark:text-white z-10 group-hover:border-primary group-hover:bg-slate-100 dark:group-hover:bg-dark-900 transition-colors duration-300">
                {getIcon(item.type)}
              </div>

              {/* Card Container */}
              <div className="p-6 rounded-xl border border-slate-200 bg-white hover:border-slate-350 dark:border-dark-800 dark:bg-dark-900/40 dark:hover:border-dark-700/80 hover:shadow-md transition-all duration-300 relative">
                
                {/* Header info */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                  <div>
                    <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 dark:bg-dark-950 dark:border-dark-850 text-[9px] font-mono text-slate-500 dark:text-dark-400 font-bold">
                      {item.type === 'training' ? 'PROFESSIONAL TRAINING' : item.type === 'internship' ? 'INTERNSHIP & INDUSTRIAL' : 'DEGREE EDUCATION'}
                    </span>
                    <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white font-display mt-1">{item.role}</h3>
                    <p className="text-sm md:text-base text-slate-700 dark:text-dark-300 font-sans font-medium">{item.organization}</p>
                    {item.location && (
                      <p className="text-xs md:text-sm text-slate-500 dark:text-dark-500 font-sans">{item.location}</p>
                    )}
                  </div>
                  
                  {/* Period Badge */}
                  <span className="h-fit px-3 py-1 rounded bg-slate-100 border border-slate-200 dark:bg-dark-950 dark:border-dark-800 text-[10px] font-mono text-slate-600 dark:text-dark-400 font-bold">
                    {item.period}
                  </span>
                </div>

                {/* Bullet Points */}
                <ul className="space-y-2 font-sans text-sm md:text-base text-slate-600 dark:text-dark-400 leading-relaxed list-none pl-0">
                  {item.description.map((bullet, bulletIdx) => (
                    <li key={bulletIdx} className="flex gap-2 items-start">
                      <span className="text-primary font-mono select-none mt-0.5 font-bold">↳</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 pt-12 border-t border-slate-200/80 dark:border-dark-800/80"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={20} className="text-primary" />
                <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
                  Licenses & Certifications
                </h3>
              </div>
              <p className="text-xs font-mono text-slate-500 dark:text-dark-400 mt-1">
                Verified industry certifications & technical coursework
              </p>
            </div>
            <span className="hidden sm:inline-block text-xs font-mono text-primary font-semibold">
              {certifications.length} Verifications
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="p-5 rounded-xl border border-slate-200 bg-white hover:border-primary/30 dark:border-dark-800 dark:bg-dark-900/40 dark:hover:border-dark-700 transition-all shadow-sm hover:shadow flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2 py-0.5 rounded bg-primary/10 border border-primary/20 text-[9px] font-mono text-primary font-bold">
                      {cert.issuer}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 dark:text-dark-500 font-semibold">
                      {cert.year}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white font-display leading-snug">
                    {cert.title}
                  </h4>
                </div>

                {cert.badge && (
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-dark-850 flex items-center gap-1.5 text-[11px] font-mono text-slate-500 dark:text-dark-400 font-medium">
                    <CheckCircle2 size={12} className="text-emerald-500 flex-shrink-0" />
                    <span>{cert.badge}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

