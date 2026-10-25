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
    <section id="contact" className="py-24 border-t border-[#dbe0eb] dark:border-[#252733] bg-[#f8f9fb]/20 dark:bg-[#08080b]/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-left mb-12">
          <span className="text-xs text-[#ff1744] font-mono font-bold uppercase tracking-wider">05 // COMMUNICATIONS</span>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-[#12141c] dark:text-[#f4f5f8] mt-1">Let's Build Something</h2>
          <div className="h-0.5 w-12 bg-[#ff1744] mt-2 shadow-[0_0_8px_rgba(255,23,68,0.5)]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Side: Contact Cards & Info */}
          <div className="lg:col-span-5 space-y-6">
            <p className="text-base text-[#4c536a] dark:text-[#9da1b5] leading-relaxed font-sans font-medium">
              I am open to discuss <strong className="text-[#12141c] dark:text-[#f4f5f8]">Java Backend Developer</strong>, <strong className="text-[#12141c] dark:text-[#f4f5f8]">Java Full Stack</strong>, and software engineering opportunities in Bengaluru and across India. Let's connect!
            </p>

            <div className="space-y-3 font-mono text-xs">
              {/* Email */}
              {socials.email && (
                <a
                  href={socials.email}
                  className="flex items-center gap-3 p-4 rounded-xl border border-[#dbe0eb] bg-white hover:border-[#ff1744]/50 hover:bg-[#f0f2f5] dark:border-[#252733] dark:bg-[#12131a] dark:hover:border-[#ff1744]/50 dark:hover:bg-[#171822] transition-all duration-300 group shadow-sm"
                >
                  <div className="p-2 rounded bg-[#f0f2f5] border border-[#dbe0eb] dark:bg-[#08080b] dark:border-[#252733] text-[#ff1744] group-hover:bg-[#ff1744] group-hover:text-white transition-colors">
                    <Mail size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#71758c] block font-bold">OFFICIAL EMAIL</span>
                    <span className="text-[#12141c] dark:text-[#f4f5f8] text-xs font-semibold">{socials.email.replace('mailto:', '')}</span>
                  </div>
                </a>
              )}

              {/* Phone */}
              {socials.phone && (
                <a
                  href={`tel:${socials.phone.replace(/\s+/g, '')}`}
                  className="flex items-center gap-3 p-4 rounded-xl border border-[#dbe0eb] bg-white hover:border-[#00e5ff]/50 hover:bg-[#f0f2f5] dark:border-[#252733] dark:bg-[#12131a] dark:hover:border-[#00e5ff]/50 dark:hover:bg-[#171822] transition-all duration-300 group shadow-sm"
                >
                  <div className="p-2 rounded bg-[#f0f2f5] border border-[#dbe0eb] dark:bg-[#08080b] dark:border-[#252733] text-[#00e5ff] group-hover:bg-[#00e5ff] group-hover:text-[#08080b] transition-colors">
                    <Phone size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#71758c] block font-bold">CONTACT PHONE</span>
                    <span className="text-[#12141c] dark:text-[#f4f5f8] text-xs font-semibold">{socials.phone}</span>
                  </div>
                </a>
              )}

              {/* LinkedIn */}
              {socials.linkedin && (
                <a
                  href={socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-xl border border-[#dbe0eb] bg-white hover:border-[#00e5ff]/50 hover:bg-[#f0f2f5] dark:border-[#252733] dark:bg-[#12131a] dark:hover:border-[#00e5ff]/50 dark:hover:bg-[#171822] transition-all duration-300 group shadow-sm"
                >
                  <div className="p-2 rounded bg-[#f0f2f5] border border-[#dbe0eb] dark:bg-[#08080b] dark:border-[#252733] text-[#00e5ff] group-hover:bg-[#00e5ff] group-hover:text-[#08080b] transition-colors">
                    <LinkedinIcon size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#71758c] block font-bold">PROFESSIONAL NETWORK</span>
                    <span className="text-[#12141c] dark:text-[#f4f5f8] text-xs font-semibold">linkedin.com/in/adarsh-ece</span>
                  </div>
                </a>
              )}

              {/* GitHub */}
              {socials.github && (
                <a
                  href={socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-xl border border-[#dbe0eb] bg-white hover:border-[#ff1744]/50 hover:bg-[#f0f2f5] dark:border-[#252733] dark:bg-[#12131a] dark:hover:border-[#ff1744]/50 dark:hover:bg-[#171822] transition-all duration-300 group shadow-sm"
                >
                  <div className="p-2 rounded bg-[#f0f2f5] border border-[#dbe0eb] dark:bg-[#08080b] dark:border-[#252733] text-[#71758c] group-hover:bg-[#ff1744] group-hover:text-white transition-colors">
                    <GithubIcon size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#71758c] block font-bold">CODE REPOSITORY</span>
                    <span className="text-[#12141c] dark:text-[#f4f5f8] text-xs font-semibold">github.com/warcraft433</span>
                  </div>
                </a>
              )}

              {/* LeetCode */}
              {socials.leetcode && (
                <a
                  href={socials.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-xl border border-[#dbe0eb] bg-white hover:border-[#ff1744]/50 hover:bg-[#f0f2f5] dark:border-[#252733] dark:bg-[#12131a] dark:hover:border-[#ff1744]/50 dark:hover:bg-[#171822] transition-all duration-300 group shadow-sm"
                >
                  <div className="p-2 rounded bg-[#f0f2f5] border border-[#dbe0eb] dark:bg-[#08080b] dark:border-[#252733] text-[#ff1744] group-hover:bg-[#ff1744] group-hover:text-white transition-colors">
                    <Trophy size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#71758c] block font-bold">PROBLEM SOLVING</span>
                    <span className="text-[#12141c] dark:text-[#f4f5f8] text-xs font-semibold">leetcode.com/u/warcarft433</span>
                  </div>
                </a>
              )}
            </div>

          </div>

          {/* Right Side: Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="p-6 md:p-8 rounded-2xl border border-[#dbe0eb] bg-white dark:border-[#252733] dark:bg-[#12131a] space-y-4 shadow-md">
              <div className="text-xs text-[#71758c] font-mono pb-2 border-b border-[#dbe0eb] dark:border-[#252733] mb-2 font-bold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff1744]" />
                RECIPROCAL ROUTING CONTACT PORT
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="name" className="text-[10px] font-mono text-[#4c536a] dark:text-[#9da1b5] block uppercase font-bold">Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full px-3 py-2.5 rounded-lg border border-[#dbe0eb] bg-white text-[#12141c] font-sans text-sm focus:outline-none focus:border-[#ff1744] dark:border-[#252733] dark:bg-[#08080b] dark:text-[#f4f5f8] dark:focus:border-[#00e5ff] transition-all placeholder:text-[#71758c]"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="email" className="text-[10px] font-mono text-[#4c536a] dark:text-[#9da1b5] block uppercase font-bold">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full px-3 py-2.5 rounded-lg border border-[#dbe0eb] bg-white text-[#12141c] font-sans text-sm focus:outline-none focus:border-[#ff1744] dark:border-[#252733] dark:bg-[#08080b] dark:text-[#f4f5f8] dark:focus:border-[#00e5ff] transition-all placeholder:text-[#71758c]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="message" className="text-[10px] font-mono text-[#4c536a] dark:text-[#9da1b5] block uppercase font-bold">Message</label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Describe your project or role details..."
                  className="w-full px-3 py-2.5 rounded-lg border border-[#dbe0eb] bg-white text-[#12141c] font-sans text-sm focus:outline-none focus:border-[#ff1744] dark:border-[#252733] dark:bg-[#08080b] dark:text-[#f4f5f8] dark:focus:border-[#00e5ff] transition-all resize-none placeholder:text-[#71758c]"
                />
              </div>

              <button
                type="submit"
                disabled={submitted}
                className="w-full py-3 rounded-lg bg-[#ff1744] hover:bg-[#e50935] text-white font-mono text-xs font-bold tracking-wider transition-all flex items-center justify-center gap-2 disabled:bg-[#ff1744]/60 shadow-md shadow-[#ff1744]/25 hover:shadow-[#00e5ff]/30"
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
          className="mt-20 p-8 md:p-12 rounded-2xl border border-[#dbe0eb] bg-white dark:border-[#252733] dark:bg-[#12131a] relative overflow-hidden group text-center space-y-6 shadow-md dark:shadow-2xl"
        >
          {/* Dual Red & Blue ambient glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] bg-gradient-to-r from-[#ff1744]/10 to-[#00e5ff]/10 rounded-full blur-[100px] pointer-events-none group-hover:scale-110 transition-transform duration-700" />
          
          <div className="space-y-2 z-10 relative">
            <h3 className="text-xl md:text-2xl font-mono text-[#ff1744] font-bold">Have a project or opportunity?</h3>
            <p className="text-2xl md:text-4xl font-bold font-display text-[#12141c] dark:text-[#f4f5f8] max-w-2xl mx-auto tracking-tight">
              Let's build something meaningful.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center items-center pt-2 z-10 relative">
            {/* View Projects */}
            <button
              onClick={() => handleScrollTo('#projects')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#ff1744] hover:bg-[#e50935] text-white font-bold text-sm transition-all shadow-md shadow-[#ff1744]/25 hover:-translate-y-0.5 active:translate-y-0"
            >
              View Projects
              <ArrowRight size={16} />
            </button>

            {/* Open Resume */}
            <button
              onClick={onOpenResume}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white border border-[#dbe0eb] hover:border-[#00e5ff]/50 hover:text-[#00e5ff] text-[#12141c] dark:bg-[#08080b] dark:border-[#252733] dark:hover:border-[#00e5ff]/50 dark:hover:text-[#00e5ff] dark:text-[#f4f5f8] font-bold text-sm transition-all shadow-sm"
            >
              <FileText size={16} className="text-[#00e5ff]" />
              Open Resume
            </button>

            {/* Direct Connect */}
            <a
              href={socials.email}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-transparent border border-transparent text-[#4c536a] hover:text-[#ff1744] dark:text-[#71758c] dark:hover:text-[#00e5ff] font-bold text-sm transition-all"
            >
              Get In Touch
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
