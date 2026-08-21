import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight, FileText, Send, Terminal } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import { ArchitectureViz } from '../components/ArchitectureViz';
import profileImg from '../assets/profile.jpeg';

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const { name, tagline, location, typingTitles } = portfolioData.personalInfo;
  
  // Custom typing animation logic
  const [titleIdx, setTitleIdx] = useState(0);
  const [subText, setSubText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const fullText = typingTitles[titleIdx];
    
    const handleTyping = () => {
      if (!isDeleting) {
        setSubText(fullText.substring(0, subText.length + 1));
        setTypingSpeed(80);
        
        if (subText === fullText) {
          setTypingSpeed(2000);
          setIsDeleting(true);
        }
      } else {
        setSubText(fullText.substring(0, subText.length - 1));
        setTypingSpeed(45);
        
        if (subText === '') {
          setIsDeleting(false);
          setTitleIdx((prev) => (prev + 1) % typingTitles.length);
          setTypingSpeed(500);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [subText, isDeleting, titleIdx, typingSpeed, typingTitles]);

  const handleScrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden"
    >
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-primary/5 dark:bg-primary/10 blur-[100px] pointer-events-none animate-glow-slow" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[400px] h-[400px] rounded-full bg-spring/5 dark:bg-spring/10 blur-[120px] pointer-events-none animate-glow-slow" style={{ animationDelay: '-5s' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Profile Text & Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 space-y-6 text-left"
        >
          {/* Location Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-600 dark:bg-dark-900 dark:border-dark-800 text-xs font-mono dark:text-dark-400 shadow-sm">
            <MapPin size={12} className="text-primary animate-pulse" />
            {location}
          </div>

          {/* Name & Titles */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-display tracking-tight text-slate-900 dark:text-white leading-tight">
              {name}
            </h1>
            
            {/* Dynamic typing role sub-headline */}
            <div className="h-8 md:h-10 flex items-center">
              <span className="text-xl md:text-3xl font-mono text-primary font-bold flex items-center gap-1">
                &gt; {subText}
                <span className="inline-block w-1.5 h-6 bg-primary animate-pulse" />
              </span>
            </div>
          </div>

          {/* Tagline - Readability Upgrade: larger size and high contrast */}
          <p className="text-base sm:text-lg md:text-xl text-slate-700 dark:text-dark-400 font-sans leading-relaxed max-w-2xl font-medium">
            {tagline}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3.5 pt-4">
            {/* View Projects - Prominent Primary CTA */}
            <button
              onClick={() => handleScrollTo('#projects')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-slate-900 text-white hover:bg-slate-800 dark:bg-primary dark:hover:bg-primary-600 dark:text-white font-semibold text-sm transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 group active:translate-y-0"
            >
              View Projects
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>

            {/* View Resume - Clean Secondary CTA */}
            <button
              onClick={onOpenResume}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white border-2 border-slate-200 text-slate-800 hover:border-slate-400 hover:bg-slate-50 dark:bg-dark-900 dark:border-dark-700 dark:hover:border-dark-500 dark:hover:bg-dark-800 dark:text-white font-semibold text-sm transition-all duration-200 shadow-sm hover:-translate-y-0.5 active:translate-y-0"
            >
              <FileText size={16} className="text-primary" />
              View Resume
            </button>

            {/* Let's Connect */}
            <button
              onClick={() => handleScrollTo('#contact')}
              className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-slate-600 hover:text-slate-900 dark:text-dark-400 dark:hover:text-white font-medium text-sm transition-colors hover:bg-slate-100 dark:hover:bg-dark-900/60"
            >
              <Send size={14} />
              Let's Connect
            </button>
          </div>

          {/* Inline Micro-Skills Banner */}
          <div className="pt-6 border-t border-slate-200 dark:border-dark-800/80 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-slate-500 dark:text-dark-400 font-mono">
            <span className="text-slate-400 dark:text-dark-600 font-bold">CORE STACK:</span>
            <span className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-white transition-colors cursor-default">
              <span className="w-2 h-2 rounded-full bg-java" /> Core Java & OOP
            </span>
            <span className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-white transition-colors cursor-default">
              <span className="w-2 h-2 rounded-full bg-[#00758f]" /> SQL & JDBC
            </span>
            <span className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-white transition-colors cursor-default">
              <span className="w-2 h-2 rounded-full bg-spring" /> Spring Boot
            </span>
            <span className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-white transition-colors cursor-default">
              <span className="w-2 h-2 rounded-full bg-primary" /> REST APIs
            </span>
          </div>
        </motion.div>

        {/* Right Side: Photo and Interactive SVG Architecture Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-5 flex flex-col items-center gap-6 justify-center w-full"
        >
          {/* Circular profile image container with glow border */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-spring rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
            <div className="relative w-44 h-44 sm:w-48 sm:h-48 rounded-2xl overflow-hidden border border-slate-200 bg-white dark:border-dark-800 dark:bg-dark-950 flex justify-center items-center p-1 shadow-md">
              <img
                src={profileImg}
                alt="Adarsh A Portrait"
                className="w-full h-full object-cover rounded-xl grayscale hover:grayscale-0 transition-all duration-500 scale-105 hover:scale-100"
              />
            </div>
            {/* Embedded Microchips tag */}
            <div className="absolute -bottom-2 -right-2 px-3 py-1 rounded bg-white border border-slate-200 dark:bg-dark-950 dark:border-dark-800 text-[10px] font-mono text-slate-600 dark:text-dark-400 flex items-center gap-1 shadow-lg">
              <Terminal size={10} className="text-spring" />
              <span>B.Tech KTU</span>
            </div>
          </div>

          {/* Architecture flow visualization: responsive on all screens */}
          <div className="w-full max-w-sm sm:max-w-md">
            <ArchitectureViz />
          </div>
        </motion.div>

      </div>
    </section>
  );
};
