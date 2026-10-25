import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Code2, Database } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

export const About: React.FC = () => {
  const { bio } = portfolioData.personalInfo;

  const highlights = [
    {
      icon: <Code2 size={20} className="text-neon-500" />,
      title: "Java Backend Engineering",
      text: "Writing clean, modular Core Java with OOP, JDBC, Servlets, and Spring Boot REST APIs."
    },
    {
      icon: <Database size={20} className="text-silver-400 dark:text-silver-300" />,
      title: "Database & SQL Systems",
      text: "Designing normalized MySQL schemas, handling structured CRUD operations, and writing optimized queries."
    },
    {
      icon: <ShieldCheck size={20} className="text-neon-500" />,
      title: "AI & Computer Vision",
      text: "Deploying edge inference scripts using YOLOv8 & OpenCV pipelines for automated defect detection."
    }
  ];

  return (
    <section id="about" className="py-24 border-t border-slate-200/80 dark:border-charcoal-800 bg-slate-50/50 dark:bg-charcoal-950/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-left mb-12">
          <span className="text-xs text-neon-500 font-mono font-bold uppercase tracking-wider">01 // PROFILE</span>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-slate-900 dark:text-silver-100 mt-1">About Me</h2>
          <div className="h-0.5 w-12 bg-neon-500 mt-2 shadow-[0_0_8px_rgba(255,30,56,0.6)]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Bio text column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 space-y-5 text-slate-700 dark:text-silver-300 text-base md:text-lg leading-relaxed font-sans"
          >
            <p className="text-slate-900 dark:text-silver-100 font-semibold text-lg md:text-xl leading-snug">
              Hi, I'm Adarsh A. I'm a Java developer focused on building robust backend systems, scalable APIs, and clean software architectures.
            </p>
            <p className="text-slate-700 dark:text-silver-300 leading-relaxed font-normal">
              {bio}
            </p>
            <p className="text-slate-700 dark:text-silver-300 leading-relaxed font-normal">
              {portfolioData.personalInfo.careerSummary}
            </p>
            
            <div className="p-4 rounded-xl border border-slate-200 bg-white dark:border-charcoal-800 dark:bg-charcoal-900/60 flex items-center gap-3 font-mono text-xs shadow-sm">
              <span className="h-2.5 w-2.5 rounded-full bg-neon-500 animate-pulse flex-shrink-0" />
              <span className="text-slate-800 dark:text-silver-200 font-semibold">Actively seeking Java Backend Developer & Full Stack opportunities.</span>
            </div>
          </motion.div>

          {/* Highlights Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-6 flex flex-col gap-4"
          >
            {highlights.map((h, i) => (
              <div
                key={i}
                className="p-5 rounded-xl border border-slate-200 bg-white hover:border-neon-500/50 dark:border-charcoal-800 dark:bg-charcoal-900/60 dark:hover:border-neon-500/50 dark:hover:bg-charcoal-900 hover:shadow-sm transition-all duration-200 flex items-start gap-4"
              >
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 dark:bg-charcoal-950 dark:border-charcoal-800 flex-shrink-0">
                  {h.icon}
                </div>
                <div>
                  <h3 className="text-base font-bold font-display text-slate-900 dark:text-silver-100 mb-1">
                    {h.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-silver-400 font-sans leading-relaxed">
                    {h.text}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>

        </div>

      </div>
    </section>
  );
};
