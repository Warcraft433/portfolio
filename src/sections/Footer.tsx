import React from 'react';
import { Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/Icons';
import { portfolioData } from '../data/portfolio';

export const Footer: React.FC = () => {
  const { socials } = portfolioData;

  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 bg-white border-t border-slate-200 dark:bg-dark-950 dark:border-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left: Branding */}
        <div className="text-center md:text-left space-y-1">
          <p className="text-sm font-bold text-slate-900 dark:text-white font-display">ADARSH A</p>
          <p className="text-[10px] text-slate-550 dark:text-dark-500 font-mono">
            Java Full Stack Developer / Software Developer
          </p>
        </div>

        {/* Center: Build footnote */}
        <p className="text-[10px] text-slate-400 dark:text-dark-600 font-mono text-center font-bold">
          © {currentYear} Adarsh A. Built with React + TypeScript + Tailwind
        </p>

        {/* Right: Quick Links */}
        <div className="flex items-center gap-4 text-slate-400 dark:text-dark-500">
          {socials.github && (
            <a
              href={socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
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
              className="hover:text-[#0077b5] dark:hover:text-primary transition-colors"
              aria-label="LinkedIn link"
            >
              <LinkedinIcon size={16} />
            </a>
          )}
          {socials.email && (
            <a
              href={socials.email}
              className="hover:text-primary transition-colors"
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
