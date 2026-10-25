import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Code2, Monitor, Cpu, Settings, Layers } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

export const Skills: React.FC = () => {
  const { skills } = portfolioData;

  const getCategoryIcon = (title: string) => {
    const lowercaseTitle = title.toLowerCase();
    if (lowercaseTitle.includes('programming')) return <Terminal size={18} className="text-[#ff1744]" />;
    if (lowercaseTitle.includes('java') || lowercaseTitle.includes('backend')) return <Code2 size={18} className="text-[#ff1744]" />;
    if (lowercaseTitle.includes('front')) return <Monitor size={18} className="text-[#00e5ff]" />;
    if (lowercaseTitle.includes('ai') || lowercaseTitle.includes('vision')) return <Cpu size={18} className="text-[#ff1744]" />;
    if (lowercaseTitle.includes('tool')) return <Settings size={18} className="text-[#00e5ff]" />;
    return <Layers size={18} className="text-[#ff1744]" />;
  };

  return (
    <section id="skills" className="py-24 border-t border-[#dbe0eb] dark:border-[#252733] bg-[#f8f9fb]/20 dark:bg-[#08080b]/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-left mb-12">
          <span className="text-xs text-[#ff1744] font-mono font-bold uppercase tracking-wider">02 // TECH STACK</span>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-[#12141c] dark:text-[#f4f5f8] mt-1">Skills & Expertises</h2>
          <div className="h-0.5 w-12 bg-[#ff1744] mt-2 shadow-[0_0_8px_rgba(255,23,68,0.5)]" />
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
              className="p-6 rounded-xl border border-[#dbe0eb] bg-white hover:border-[#ff1744]/50 dark:border-[#252733] dark:bg-[#12131a] dark:hover:border-[#00e5ff]/50 hover:shadow-md transition-all duration-300 relative group"
            >
              {/* Corner Glow Effect (Dual Red/Blue) */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#ff1744]/10 via-[#00e5ff]/08 to-transparent rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {/* Title & Icon */}
              <div className="flex items-center gap-2 mb-4 border-b border-[#dbe0eb] dark:border-[#252733] pb-3">
                <div className="p-1.5 rounded bg-[#f0f2f5] border border-[#dbe0eb] dark:bg-[#08080b] dark:border-[#252733]">
                  {getCategoryIcon(category.title)}
                </div>
                <h3 className="text-sm md:text-base font-bold font-display text-[#12141c] dark:text-[#f4f5f8] font-mono">
                  {category.title.toUpperCase()}
                </h3>
              </div>

              {/* Badges Flow */}
              <div className="flex flex-wrap gap-2 pt-1.5">
                {category.skills.map((skill) => {
                  const isRedSpecial = ['Java', 'Core Java', 'OOP', 'Spring Boot', 'YOLOv8'].includes(skill);
                  const isBlueSpecial = ['SQL', 'JDBC', 'REST APIs', 'React'].includes(skill);
                  return (
                    <span
                      key={skill}
                      className={`px-3 py-1.5 rounded text-xs font-semibold font-mono border transition-colors ${
                        isRedSpecial
                          ? 'bg-[#ff1744]/12 border-[#ff1744]/35 text-[#ff1744] hover:border-[#ff1744]/60'
                          : isBlueSpecial
                          ? 'bg-[#00e5ff]/10 border-[#00e5ff]/35 text-[#00b4d8] dark:text-[#00e5ff] hover:border-[#00e5ff]/60'
                          : 'bg-[#f0f2f5] border-[#dbe0eb] text-[#4c536a] hover:text-[#12141c] dark:bg-[#08080b] dark:border-[#252733] dark:text-[#9da1b5] dark:hover:text-[#f4f5f8] dark:hover:border-[#71758c]'
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
