import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Code2, Monitor, Cpu, Settings, Layers } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

export const Skills: React.FC = () => {
  const { skills } = portfolioData;

  const getCategoryIcon = (title: string) => {
    const lowercaseTitle = title.toLowerCase();
    if (lowercaseTitle.includes('programming')) return <Terminal size={18} className="text-[#D6B77A]" />;
    if (lowercaseTitle.includes('java') || lowercaseTitle.includes('backend')) return <Code2 size={18} className="text-[#D6B77A]" />;
    if (lowercaseTitle.includes('front')) return <Monitor size={18} className="text-[#777783]" />;
    if (lowercaseTitle.includes('ai') || lowercaseTitle.includes('vision')) return <Cpu size={18} className="text-[#D6B77A]" />;
    if (lowercaseTitle.includes('tool')) return <Settings size={18} className="text-[#777783]" />;
    return <Layers size={18} className="text-[#D6B77A]" />;
  };

  return (
    <section id="skills" className="py-24 border-t border-[#D0C8BC] dark:border-[#303038] bg-[#FAF8F5]/20 dark:bg-[#101014]/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-left mb-12">
          <span className="text-xs text-[#D6B77A] font-mono font-bold uppercase tracking-wider">02 // TECH STACK</span>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-[#19191F] dark:text-[#F7F5F0] mt-1">Skills & Expertises</h2>
          <div className="h-0.5 w-12 bg-[#D6B77A] mt-2" />
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
              className="p-6 rounded-xl border border-[#D0C8BC] bg-[#FAF8F5] hover:border-[#D6B77A]/50 dark:border-[#303038] dark:bg-[#19191F] dark:hover:border-[#D6B77A]/50 hover:shadow-md transition-all duration-300 relative group"
            >
              {/* Corner Glow Effect */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#D6B77A]/10 to-transparent rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {/* Title & Icon */}
              <div className="flex items-center gap-2 mb-4 border-b border-[#D0C8BC] dark:border-[#303038] pb-3">
                <div className="p-1.5 rounded bg-[#FAF8F5] border border-[#D0C8BC] dark:bg-[#101014] dark:border-[#303038]">
                  {getCategoryIcon(category.title)}
                </div>
                <h3 className="text-sm md:text-base font-bold font-display text-[#19191F] dark:text-[#F7F5F0] font-mono">
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
                          ? 'bg-[#D6B77A]/12 border-[#D6B77A]/35 text-[#19191F] dark:bg-[#D6B77A]/10 dark:border-[#D6B77A]/40 dark:text-[#D6B77A] hover:border-[#D6B77A]/60'
                          : 'bg-[#FAF8F5] border-[#D0C8BC] text-[#5A5A66] hover:text-[#19191F] dark:bg-[#101014] dark:border-[#303038] dark:text-[#777783] dark:hover:text-[#F7F5F0] dark:hover:border-[#D6B77A]/30'
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
