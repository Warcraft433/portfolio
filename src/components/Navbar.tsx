import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Initialize theme from localStorage or system setting
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const navItems = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Experience', href: '#experience', id: 'experience' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  // Scroll spy effect to check scrolled status and active section
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Intersection observer for section tracking
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -50% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const targetEl = document.querySelector(href);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-white/90 dark:bg-dark-950/80 backdrop-blur-lg border-b border-slate-200/80 dark:border-dark-800/80 shadow-md'
          : 'py-5 bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-8">
          
          {/* Logo Brand */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, '#home')}
            className="flex items-center gap-2 group font-display"
          >
            <div className="p-1.5 rounded bg-primary/10 border border-primary/20 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
              <Terminal size={16} />
            </div>
            <div>
              <span className="text-sm md:text-base font-bold text-slate-900 dark:text-white tracking-wide block leading-none">
                ADARSH A
              </span>
              <span className="text-[10px] text-slate-500 dark:text-dark-400 font-mono tracking-tight block mt-0.5">
                Java Engineer
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                className={`px-3 py-1.5 rounded-md text-sm font-semibold font-mono border transition-all duration-200 ${
                  activeSection === item.id
                    ? 'text-slate-900 bg-slate-100 border-slate-250 dark:text-white dark:bg-dark-800 dark:border-dark-700'
                    : 'text-slate-600 dark:text-dark-400 hover:text-slate-950 dark:hover:text-white border-transparent hover:bg-slate-100 dark:hover:bg-dark-900/50'
                }`}
              >
                {item.label}
              </a>
            ))}

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-1.5 ml-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 dark:border-dark-800 dark:bg-dark-950 dark:hover:bg-dark-800 dark:text-dark-400 dark:hover:text-white transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            {/* Quick Resume Button */}
            <button
              onClick={onOpenResume}
              className="ml-3 px-4 py-1.5 rounded-md text-sm font-mono font-bold bg-primary hover:bg-primary-600 text-white transition-all shadow-md shadow-primary-900/20"
            >
              Resume
            </button>
          </div>

          {/* Mobile Theme & Hamburger Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Theme Toggle Button Mobile */}
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 dark:border-dark-800 dark:bg-dark-950 dark:text-dark-400 transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 dark:border-dark-800 dark:bg-dark-950 dark:text-dark-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-dark-800 transition-colors"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white/95 dark:bg-dark-950/95 border-b border-slate-200 dark:border-dark-800 backdrop-blur-xl shadow-2xl py-4 px-4 flex flex-col space-y-1">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={(e) => handleLinkClick(e, item.href)}
              className={`px-4 py-2.5 rounded-lg text-sm font-semibold font-mono border transition-all ${
                activeSection === item.id
                  ? 'text-slate-900 bg-slate-100 border-slate-250 dark:text-white dark:bg-dark-800 dark:border-dark-700'
                  : 'text-slate-600 dark:text-dark-400 hover:text-slate-950 dark:hover:text-white border-transparent hover:bg-slate-100 dark:hover:bg-dark-900/40'
              }`}
            >
              {item.label}
            </a>
          ))}
          <button
            onClick={() => {
              setIsOpen(false);
              onOpenResume();
            }}
            className="w-full mt-2 py-3 rounded-lg text-sm font-bold font-mono text-center bg-primary hover:bg-primary-600 text-white transition-all"
          >
            Open Resume
          </button>
        </div>
      )}
    </nav>
  );
};
