import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Code2, Database } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

export const About: React.FC = () => {
  const { bio } = portfolioData.personalInfo;

  const highlights = [
    {
      icon: <Code2 size={20} className="text-[#D6B77A]" />,
      title: "Java Backend Engineering",
      text: "Writing clean, modular Core Java with OOP, JDBC, Servlets, and Spring Boot REST APIs."
    },
    {
      icon: <Database size={20} className="text-[#DECBA1]" />,
      title: "Database & SQL Systems",
      text: "Designing normalized MySQL schemas, handling structured CRUD operations, and writing optimized queries."
    },
    {
      icon: <ShieldCheck size={20} className="text-[#D6B77A]" />,
      title: "AI & Computer Vision",
      text: "Deploying edge inference scripts using YOLOv8 & OpenCV pipelines for automated defect detection."
    }
  ];

  return (
    <section id="about" className="py-24 border-t border-[#D0C8BC] dark:border-[#303038] bg-[#FAF8F5]/40 dark:bg-[#101014]/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-left mb-12">
          <span className="text-xs text-[#D6B77A] font-mono font-bold uppercase tracking-wider">01 // PROFILE</span>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-[#19191F] dark:text-[#F7F5F0] mt-1">About Me</h2>
          <div className="h-0.5 w-12 bg-[#D6B77A] mt-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Bio text column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 space-y-5 text-[#4B4B54] dark:text-[#9E9EAA] text-base md:text-lg leading-relaxed font-sans"
          >
            <p className="text-[#19191F] dark:text-[#F7F5F0] font-semibold text-lg md:text-xl leading-snug">
              Hi, I'm Adarsh A. I'm a Java developer focused on building robust backend systems, scalable APIs, and clean software architectures.
            </p>
            <p className="leading-relaxed font-normal">
              {bio}
            </p>
            <p className="leading-relaxed font-normal">
              {portfolioData.personalInfo.careerSummary}
            </p>
            
            <div className="p-4 rounded-xl border border-[#D0C8BC] bg-[#FAF8F5] dark:border-[#303038] dark:bg-[#19191F] flex items-center gap-3 font-mono text-xs shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#D6B77A] animate-pulse flex-shrink-0" />
              <span className="text-[#19191F] dark:text-[#F7F5F0] font-semibold">Actively seeking Java Backend Developer & Full Stack opportunities.</span>
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
                className="p-5 rounded-xl border border-[#D0C8BC] bg-[#FAF8F5] hover:border-[#D6B77A]/50 dark:border-[#303038] dark:bg-[#19191F] dark:hover:border-[#D6B77A]/50 dark:hover:bg-[#22222A] hover:shadow-sm transition-all duration-200 flex items-start gap-4"
              >
                <div className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#D0C8BC] dark:bg-[#101014] dark:border-[#303038] flex-shrink-0">
                  {h.icon}
                </div>
                <div>
                  <h3 className="text-base font-bold font-display text-[#19191F] dark:text-[#F7F5F0] mb-1">
                    {h.title}
                  </h3>
                  <p className="text-sm text-[#5A5A66] dark:text-[#777783] font-sans leading-relaxed">
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
