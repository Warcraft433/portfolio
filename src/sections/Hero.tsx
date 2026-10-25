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
          setTypingSpeed(2200);
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
      {/* Background Glows — Understated Champagne Gold & Obsidian Mist */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full bg-[#D6B77A]/08 blur-[130px] pointer-events-none animate-glow-slow" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[380px] h-[380px] rounded-full bg-[#303038]/30 dark:bg-[#22222A]/40 blur-[140px] pointer-events-none animate-glow-slow" style={{ animationDelay: '-5s' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Profile Text & Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 space-y-6 text-left"
        >
          {/* Location Badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FAF8F5] border border-[#D0C8BC] text-[#36363E] dark:bg-[#19191F] dark:border-[#303038] text-xs font-mono dark:text-[#C8C6C0] shadow-sm">
            <MapPin size={12} className="text-[#D6B77A]" />
            {location}
          </div>

          {/* Name & Titles */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-display tracking-tight text-[#19191F] dark:text-[#F7F5F0] leading-tight">
              {name}
            </h1>
            
            {/* Dynamic typing role sub-headline */}
            <div className="h-8 md:h-10 flex items-center">
              <span className="text-xl md:text-3xl font-mono text-[#19191F] dark:text-[#F7F5F0] font-bold flex items-center gap-1.5">
                <span className="text-[#D6B77A]">&gt;</span> {subText}
                <span className="inline-block w-1.5 h-6 bg-[#D6B77A] animate-pulse" />
              </span>
            </div>
          </div>

          {/* Tagline */}
          <p className="text-base sm:text-lg md:text-xl text-[#4B4B54] dark:text-[#9E9EAA] font-sans leading-relaxed max-w-2xl font-normal">
            {tagline}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3.5 pt-4">
            {/* View Projects — Champagne Gold Accent */}
            <button
              onClick={() => handleScrollTo('#projects')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#D6B77A] hover:bg-[#C5A566] text-[#101014] font-bold text-sm transition-all duration-200 shadow-md shadow-[#D6B77A]/20 hover:shadow-[#D6B77A]/30 hover:-translate-y-0.5 group active:translate-y-0"
            >
              View Projects
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>

            {/* View Resume — Refined Secondary Button */}
            <button
              onClick={onOpenResume}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#FAF8F5] border border-[#D0C8BC] text-[#19191F] hover:border-[#D6B77A]/60 hover:bg-[#F4F0E8] dark:bg-[#19191F] dark:border-[#303038] dark:hover:border-[#D6B77A]/50 dark:hover:text-[#D6B77A] dark:hover:bg-[#22222A] dark:text-[#F7F5F0] font-semibold text-sm transition-all duration-200 shadow-sm hover:-translate-y-0.5 active:translate-y-0"
            >
              <FileText size={16} className="text-[#D6B77A]" />
              View Resume
            </button>

            {/* Let's Connect */}
            <button
              onClick={() => handleScrollTo('#contact')}
              className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-[#5A5A66] hover:text-[#19191F] dark:text-[#777783] dark:hover:text-[#D6B77A] font-medium text-sm transition-colors hover:bg-[#FAF8F5] dark:hover:bg-[#19191F]"
            >
              <Send size={14} />
              Let's Connect
            </button>
          </div>

          {/* Inline Micro-Skills Banner */}
          <div className="pt-6 border-t border-[#D0C8BC] dark:border-[#303038] flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-[#5A5A66] dark:text-[#777783] font-mono">
            <span className="text-[#36363E] dark:text-[#C8C6C0] font-bold">CORE STACK:</span>
            <span className="flex items-center gap-1.5 hover:text-[#19191F] dark:hover:text-[#F7F5F0] transition-colors cursor-default">
              <span className="w-2 h-2 rounded-full bg-[#D6B77A]" /> Core Java & OOP
            </span>
            <span className="flex items-center gap-1.5 hover:text-[#19191F] dark:hover:text-[#F7F5F0] transition-colors cursor-default">
              <span className="w-2 h-2 rounded-full bg-[#777783]" /> SQL & JDBC
            </span>
            <span className="flex items-center gap-1.5 hover:text-[#19191F] dark:hover:text-[#F7F5F0] transition-colors cursor-default">
              <span className="w-2 h-2 rounded-full bg-[#D6B77A]" /> Spring Boot
            </span>
            <span className="flex items-center gap-1.5 hover:text-[#19191F] dark:hover:text-[#F7F5F0] transition-colors cursor-default">
              <span className="w-2 h-2 rounded-full bg-[#DECBA1]" /> REST APIs
            </span>
          </div>
        </motion.div>

        {/* Right Side: Photo and Interactive Architecture Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-5 flex flex-col items-center gap-6 justify-center w-full"
        >
          {/* Profile image with subtle Champagne Gold rim */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D6B77A] via-[#DECBA1] to-[#D6B77A] rounded-2xl blur opacity-20 dark:opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-300" />
            <div className="relative w-44 h-44 sm:w-48 sm:h-48 rounded-2xl overflow-hidden border border-[#D0C8BC] bg-[#FAF8F5] dark:border-[#303038] dark:bg-[#19191F] flex justify-center items-center p-1.5 shadow-md">
              <img
                src={profileImg}
                alt="Adarsh A Portrait"
                className="w-full h-full object-cover rounded-xl grayscale hover:grayscale-0 transition-all duration-500 scale-105 hover:scale-100"
              />
            </div>
            {/* Embedded Microchips tag */}
            <div className="absolute -bottom-2 -right-2 px-3 py-1 rounded bg-[#FAF8F5] border border-[#D0C8BC] dark:bg-[#19191F] dark:border-[#303038] text-[10px] font-mono text-[#36363E] dark:text-[#C8C6C0] flex items-center gap-1.5 shadow-lg">
              <Terminal size={10} className="text-[#D6B77A]" />
              <span>B.Tech KTU</span>
            </div>
          </div>

          {/* Architecture flow visualization */}
          <div className="w-full max-w-sm sm:max-w-md">
            <ArchitectureViz />
          </div>
        </motion.div>

      </div>
    </section>
  );
};
