import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Trophy, Send, FileText, ArrowRight } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import { GithubIcon, LinkedinIcon } from '../components/Icons';

interface ContactProps {
  onOpenResume: () => void;
}

export const Contact: React.FC<ContactProps> = ({ onOpenResume }) => {
  const { socials } = portfolioData;
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${socials.email?.replace('mailto:', '')}?subject=Opportunity from Portfolio - ${formState.name}&body=${encodeURIComponent(formState.message + '\n\nFrom: ' + formState.name + ' (' + formState.email + ')')}`;
    window.open(mailtoUrl, '_blank');
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormState({ name: '', email: '', message: '' });
    }, 3000);
  };

  const handleScrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="contact" className="py-24 border-t border-slate-150 dark:border-dark-900 bg-slate-50/20 dark:bg-dark-950/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-left mb-12">
          <span className="text-xs text-primary font-mono font-bold uppercase tracking-wider">05 // COMMUNICATIONS</span>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-slate-900 dark:text-white mt-1">Let's Build Something</h2>
          <div className="h-0.5 w-12 bg-primary mt-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Side: Contact Cards & Info - Readability upgraded */}
          <div className="lg:col-span-5 space-y-6">
            <p className="text-base text-slate-600 dark:text-dark-400 leading-relaxed font-sans font-medium">
              I am open to discuss <strong className="text-slate-900 dark:text-white">Java Backend Developer</strong>, <strong className="text-slate-900 dark:text-white">Java Full Stack</strong>, and software engineering opportunities in Bengaluru and across India. Let's connect!
            </p>

            <div className="space-y-3 font-mono text-xs">
              {/* Email */}
              {socials.email && (
                <a
                  href={socials.email}
                  className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 bg-white hover:border-primary/40 hover:bg-slate-50/50 dark:border-dark-800 dark:bg-dark-900/40 dark:hover:border-primary/40 dark:hover:bg-dark-900 transition-all duration-300 group shadow-sm"
                >
                  <div className="p-2 rounded bg-slate-50 border border-slate-200 dark:bg-dark-950 dark:border-dark-850 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <Mail size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 dark:text-dark-500 block font-bold">OFFICIAL EMAIL</span>
                    <span className="text-slate-800 dark:text-white text-xs font-semibold">{socials.email.replace('mailto:', '')}</span>
                  </div>
                </a>
              )}

              {/* Phone */}
              {socials.phone && (
                <a
                  href={`tel:${socials.phone.replace(/\s+/g, '')}`}
                  className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 bg-white hover:border-primary/40 hover:bg-slate-50/50 dark:border-dark-800 dark:bg-dark-900/40 dark:hover:border-primary/40 dark:hover:bg-dark-900 transition-all duration-300 group shadow-sm"
                >
                  <div className="p-2 rounded bg-slate-50 border border-slate-200 dark:bg-dark-950 dark:border-dark-850 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                    <Phone size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 dark:text-dark-500 block font-bold">CONTACT PHONE</span>
                    <span className="text-slate-800 dark:text-white text-xs font-semibold">{socials.phone}</span>
                  </div>
                </a>
              )}

              {/* LinkedIn */}
              {socials.linkedin && (
                <a
                  href={socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 bg-white hover:border-primary/40 hover:bg-slate-50/50 dark:border-dark-800 dark:bg-dark-900/40 dark:hover:border-primary/40 dark:hover:bg-dark-900 transition-all duration-300 group shadow-sm"
                >
                  <div className="p-2 rounded bg-slate-50 border border-slate-200 dark:bg-dark-950 dark:border-dark-850 text-[#0077b5] group-hover:bg-[#0077b5] group-hover:text-white transition-colors">
                    <LinkedinIcon size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 dark:text-dark-500 block font-bold">PROFESSIONAL NETWORK</span>
                    <span className="text-slate-800 dark:text-white text-xs font-semibold">linkedin.com/in/adarsh-ece</span>
                  </div>
                </a>
              )}

              {/* GitHub */}
              {socials.github && (
                <a
                  href={socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 bg-white hover:border-primary/40 hover:bg-slate-50/50 dark:border-dark-800 dark:bg-dark-900/40 dark:hover:border-primary/40 dark:hover:bg-dark-900 transition-all duration-300 group shadow-sm"
                >
                  <div className="p-2 rounded bg-slate-50 border border-slate-200 dark:bg-dark-950 dark:border-dark-850 text-slate-800 dark:text-white group-hover:bg-slate-800 group-hover:text-white transition-colors">
                    <GithubIcon size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 dark:text-dark-500 block font-bold">CODE REPOSITORY</span>
                    <span className="text-slate-800 dark:text-white text-xs font-semibold">github.com/warcraft433</span>
                  </div>
                </a>
              )}

              {/* LeetCode */}
              {socials.leetcode && (
                <a
                  href={socials.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 bg-white hover:border-primary/40 hover:bg-slate-50/50 dark:border-dark-800 dark:bg-dark-900/40 dark:hover:border-primary/40 dark:hover:bg-dark-900 transition-all duration-300 group shadow-sm"
                >
                  <div className="p-2 rounded bg-slate-50 border border-slate-200 dark:bg-dark-950 dark:border-dark-850 text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                    <Trophy size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 dark:text-dark-500 block font-bold">PROBLEM SOLVING</span>
                    <span className="text-slate-800 dark:text-white text-xs font-semibold">leetcode.com/u/warcarft433</span>
                  </div>
                </a>
              )}
            </div>

          </div>

          {/* Right Side: Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="p-6 md:p-8 rounded-2xl border border-slate-200 bg-white dark:border-dark-800 dark:bg-dark-900/60 space-y-4 shadow-md">
              <div className="text-xs text-slate-400 dark:text-dark-400 font-mono pb-2 border-b border-slate-100 dark:border-dark-800/80 mb-2 font-bold">
                RECIPROCAL ROUTING CONTACT PORT
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="name" className="text-[10px] font-mono text-slate-500 dark:text-dark-400 block uppercase font-bold">Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 font-sans text-sm focus:outline-none focus:border-primary focus:bg-white dark:border-dark-800 dark:bg-dark-950 dark:text-white transition-all placeholder:text-slate-400 dark:placeholder:text-dark-600"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="email" className="text-[10px] font-mono text-slate-500 dark:text-dark-400 block uppercase font-bold">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 font-sans text-sm focus:outline-none focus:border-primary focus:bg-white dark:border-dark-800 dark:bg-dark-950 dark:text-white transition-all placeholder:text-slate-400 dark:placeholder:text-dark-600"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="message" className="text-[10px] font-mono text-slate-500 dark:text-dark-400 block uppercase font-bold">Message</label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Describe your project or role details..."
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 font-sans text-sm focus:outline-none focus:border-primary focus:bg-white dark:border-dark-800 dark:bg-dark-950 dark:text-white transition-all resize-none placeholder:text-slate-400 dark:placeholder:text-dark-600"
                />
              </div>

              <button
                type="submit"
                disabled={submitted}
                className="w-full py-3 rounded-lg bg-primary hover:bg-primary-600 text-white font-mono text-xs font-bold tracking-wider transition-all flex items-center justify-center gap-2 disabled:bg-emerald-600 shadow-md shadow-primary-950/20"
              >
                {submitted ? (
                  <>COMMS ROUTED SUCCESSFUL</>
                ) : (
                  <>
                    <Send size={12} />
                    TRANSMIT DISPATCH VIA EMAIL
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

        {/* Final CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 p-8 md:p-12 rounded-2xl border border-slate-200 bg-white dark:border-dark-800 dark:bg-gradient-to-r dark:from-dark-900 dark:to-dark-950 relative overflow-hidden group text-center space-y-6 shadow-md dark:shadow-2xl"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/5 dark:bg-primary/10 rounded-full blur-[80px] pointer-events-none group-hover:scale-110 transition-transform duration-700" />
          
          <div className="space-y-2 z-10 relative">
            <h3 className="text-xl md:text-2xl font-mono text-primary font-bold">Have a project or opportunity?</h3>
            <p className="text-2xl md:text-4xl font-bold font-display text-slate-900 dark:text-white max-w-2xl mx-auto tracking-tight">
              Let's build something meaningful.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center items-center pt-2 z-10 relative">
            {/* View Projects */}
            <button
              onClick={() => handleScrollTo('#projects')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary hover:bg-primary-600 text-white font-bold text-sm transition-all"
            >
              View Projects
              <ArrowRight size={16} />
            </button>

            {/* Open Resume */}
            <button
              onClick={onOpenResume}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 dark:bg-dark-900 dark:border-dark-800 dark:hover:border-dark-700 dark:hover:bg-dark-800 dark:text-white font-bold text-sm transition-all shadow-sm"
            >
              <FileText size={16} />
              Open Resume
            </button>

            {/* Direct Connect */}
            <a
              href={socials.email}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-transparent border border-transparent text-slate-500 hover:text-slate-800 dark:text-dark-400 dark:hover:text-white font-bold text-sm transition-all"
            >
              Get In Touch
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
