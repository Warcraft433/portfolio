import React from 'react';
import { Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/Icons';
import { portfolioData } from '../data/portfolio';

export const Footer: React.FC = () => {
  const { socials } = portfolioData;

  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 bg-white border-t border-[#dbe0eb] dark:bg-[#08080b] dark:border-[#252733]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left: Branding */}
        <div className="text-center md:text-left space-y-1">
          <p className="text-sm font-bold text-[#12141c] dark:text-[#f4f5f8] font-display">ADARSH A</p>
          <p className="text-[10px] text-[#71758c] font-mono">
            Java Backend Developer / Full Stack Software Engineer
          </p>
        </div>

        {/* Center: Build footnote */}
        <p className="text-[10px] text-[#71758c] font-mono text-center font-medium">
          © {currentYear} Adarsh A. Built with React + TypeScript + Tailwind
        </p>

        {/* Right: Quick Links */}
        <div className="flex items-center gap-4 text-[#71758c]">
          {socials.github && (
            <a
              href={socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#ff1744] transition-colors"
              aria-label="GitHub link"
            >
              <GithubIcon size={16} />
            </a>
          )}
          {socials.linkedin && (
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#00e5ff] transition-colors"
              aria-label="LinkedIn link"
            >
              <LinkedinIcon size={16} />
            </a>
          )}
          {socials.email && (
            <a
              href={socials.email}
              className="hover:text-[#ff1744] transition-colors"
              aria-label="Email link"
            >
              <Mail size={16} />
            </a>
          )}
        </div>

      </div>
    </footer>
  );
};
