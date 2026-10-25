import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, Briefcase, CheckCircle2, ShieldCheck } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

export const Experience: React.FC = () => {
  const { experience, certifications } = portfolioData;

  const getIcon = (type: string) => {
    if (type === 'training') return <Award size={18} className="text-[#D6B77A]" />;
    if (type === 'internship') return <Briefcase size={18} className="text-[#777783]" />;
    return <GraduationCap size={18} className="text-[#D6B77A]" />;
  };

  return (
    <section id="experience" className="py-24 border-t border-[#D0C8BC] dark:border-[#303038] bg-[#FAF8F5]/20 dark:bg-[#101014]/40 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-left mb-16">
          <span className="text-xs text-[#D6B77A] font-mono font-bold uppercase tracking-wider">04 // QUALIFICATIONS</span>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-[#19191F] dark:text-[#F7F5F0] mt-1">Education, Training & Experience</h2>
          <div className="h-0.5 w-12 bg-[#D6B77A] mt-2" />
        </div>

        {/* Timeline Path */}
        <div className="relative border-l border-[#D0C8BC] dark:border-[#303038] ml-4 md:ml-8 pl-6 md:pl-10 space-y-10">
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
              <div className="absolute -left-[35px] md:-left-[51px] top-1.5 p-1.5 rounded-full bg-[#FAF8F5] border border-[#D0C8BC] dark:bg-[#101014] dark:border-[#303038] text-[#19191F] dark:text-[#F7F5F0] z-10 group-hover:border-[#D6B77A] group-hover:bg-[#D6B77A]/10 dark:group-hover:bg-[#19191F] dark:group-hover:border-[#D6B77A] dark:group-hover:text-[#D6B77A] transition-colors duration-300">
                {getIcon(item.type)}
              </div>

              {/* Card Container */}
              <div className="p-6 rounded-xl border border-[#D0C8BC] bg-[#FAF8F5] hover:border-[#D6B77A]/50 dark:border-[#303038] dark:bg-[#19191F] dark:hover:border-[#D6B77A]/50 hover:shadow-md transition-all duration-300 relative">
                
                {/* Header info */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                  <div>
                    <span className="px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#D0C8BC] dark:bg-[#101014] dark:border-[#303038] text-[9px] font-mono text-[#5A5A66] dark:text-[#777783] font-bold">
                      {item.type === 'training' ? 'PROFESSIONAL TRAINING' : item.type === 'internship' ? 'INTERNSHIP & INDUSTRIAL' : 'DEGREE EDUCATION'}
                    </span>
                    <h3 className="text-lg md:text-xl font-bold text-[#19191F] dark:text-[#F7F5F0] font-display mt-1">{item.role}</h3>
                    <p className="text-sm md:text-base text-[#36363E] dark:text-[#C8C6C0] font-sans font-medium">{item.organization}</p>
                    {item.location && (
                      <p className="text-xs md:text-sm text-[#777783] font-sans">{item.location}</p>
                    )}
                  </div>
                  
                  {/* Period Badge */}
                  <span className="h-fit px-3 py-1 rounded bg-[#FAF8F5] border border-[#D0C8BC] dark:bg-[#101014] dark:border-[#303038] text-[10px] font-mono text-[#5A5A66] dark:text-[#777783] font-bold">
                    {item.period}
                  </span>
                </div>

                {/* Bullet Points */}
                <ul className="space-y-2 font-sans text-sm md:text-base text-[#5A5A66] dark:text-[#777783] leading-relaxed list-none pl-0">
                  {item.description.map((bullet, bulletIdx) => (
                    <li key={bulletIdx} className="flex gap-2 items-start">
                      <span className="text-[#D6B77A] font-mono select-none mt-0.5 font-bold">↳</span>
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
          className="mt-16 pt-12 border-t border-[#D0C8BC] dark:border-[#303038]"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={20} className="text-[#D6B77A]" />
                <h3 className="text-2xl font-bold font-display text-[#19191F] dark:text-[#F7F5F0]">
                  Licenses & Certifications
                </h3>
              </div>
              <p className="text-xs font-mono text-[#777783] mt-1">
                Verified industry certifications & technical coursework
              </p>
            </div>
            <span className="hidden sm:inline-block text-xs font-mono text-[#D6B77A] font-semibold">
              {certifications.length} Verifications
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="p-5 rounded-xl border border-[#D0C8BC] bg-[#FAF8F5] hover:border-[#D6B77A]/50 dark:border-[#303038] dark:bg-[#19191F] dark:hover:border-[#D6B77A]/50 transition-all shadow-sm hover:shadow flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2 py-0.5 rounded bg-[#D6B77A]/12 border border-[#D6B77A]/30 text-[9px] font-mono text-[#19191F] dark:text-[#D6B77A] font-bold">
                      {cert.issuer}
                    </span>
                    <span className="text-[10px] font-mono text-[#777783] font-semibold">
                      {cert.year}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-[#19191F] dark:text-[#F7F5F0] font-display leading-snug">
                    {cert.title}
                  </h4>
                </div>

                {cert.badge && (
                  <div className="mt-4 pt-3 border-t border-[#D0C8BC] dark:border-[#303038] flex items-center gap-1.5 text-[11px] font-mono text-[#777783] font-medium">
                    <CheckCircle2 size={12} className="text-[#D6B77A] flex-shrink-0" />
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
