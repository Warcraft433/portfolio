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
    <section id="contact" className="py-24 border-t border-[#D0C8BC] dark:border-[#303038] bg-[#FAF8F5]/20 dark:bg-[#101014]/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-left mb-12">
          <span className="text-xs text-[#D6B77A] font-mono font-bold uppercase tracking-wider">05 // COMMUNICATIONS</span>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-[#19191F] dark:text-[#F7F5F0] mt-1">Let's Build Something</h2>
          <div className="h-0.5 w-12 bg-[#D6B77A] mt-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Side: Contact Cards & Info */}
          <div className="lg:col-span-5 space-y-6">
            <p className="text-base text-[#4B4B54] dark:text-[#9E9EAA] leading-relaxed font-sans font-medium">
              I am open to discuss <strong className="text-[#19191F] dark:text-[#F7F5F0]">Java Backend Developer</strong>, <strong className="text-[#19191F] dark:text-[#F7F5F0]">Java Full Stack</strong>, and software engineering opportunities in Bengaluru and across India. Let's connect!
            </p>

            <div className="space-y-3 font-mono text-xs">
              {/* Email */}
              {socials.email && (
                <a
                  href={socials.email}
                  className="flex items-center gap-3 p-4 rounded-xl border border-[#D0C8BC] bg-[#FAF8F5] hover:border-[#D6B77A]/50 hover:bg-[#F4F0E8] dark:border-[#303038] dark:bg-[#19191F] dark:hover:border-[#D6B77A]/50 dark:hover:bg-[#22222A] transition-all duration-300 group shadow-sm"
                >
                  <div className="p-2 rounded bg-[#FAF8F5] border border-[#D0C8BC] dark:bg-[#101014] dark:border-[#303038] text-[#D6B77A] group-hover:bg-[#D6B77A] group-hover:text-[#101014] transition-colors">
                    <Mail size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#777783] block font-bold">OFFICIAL EMAIL</span>
                    <span className="text-[#19191F] dark:text-[#F7F5F0] text-xs font-semibold">{socials.email.replace('mailto:', '')}</span>
                  </div>
                </a>
              )}

              {/* Phone */}
              {socials.phone && (
                <a
                  href={`tel:${socials.phone.replace(/\s+/g, '')}`}
                  className="flex items-center gap-3 p-4 rounded-xl border border-[#D0C8BC] bg-[#FAF8F5] hover:border-[#D6B77A]/50 hover:bg-[#F4F0E8] dark:border-[#303038] dark:bg-[#19191F] dark:hover:border-[#D6B77A]/50 dark:hover:bg-[#22222A] transition-all duration-300 group shadow-sm"
                >
                  <div className="p-2 rounded bg-[#FAF8F5] border border-[#D0C8BC] dark:bg-[#101014] dark:border-[#303038] text-[#777783] group-hover:bg-[#D6B77A] group-hover:text-[#101014] transition-colors">
                    <Phone size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#777783] block font-bold">CONTACT PHONE</span>
                    <span className="text-[#19191F] dark:text-[#F7F5F0] text-xs font-semibold">{socials.phone}</span>
                  </div>
                </a>
              )}

              {/* LinkedIn */}
              {socials.linkedin && (
                <a
                  href={socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-xl border border-[#D0C8BC] bg-[#FAF8F5] hover:border-[#D6B77A]/50 hover:bg-[#F4F0E8] dark:border-[#303038] dark:bg-[#19191F] dark:hover:border-[#D6B77A]/50 dark:hover:bg-[#22222A] transition-all duration-300 group shadow-sm"
                >
                  <div className="p-2 rounded bg-[#FAF8F5] border border-[#D0C8BC] dark:bg-[#101014] dark:border-[#303038] text-[#777783] group-hover:bg-[#D6B77A] group-hover:text-[#101014] transition-colors">
                    <LinkedinIcon size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#777783] block font-bold">PROFESSIONAL NETWORK</span>
                    <span className="text-[#19191F] dark:text-[#F7F5F0] text-xs font-semibold">linkedin.com/in/adarsh-ece</span>
                  </div>
                </a>
              )}

              {/* GitHub */}
              {socials.github && (
                <a
                  href={socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-xl border border-[#D0C8BC] bg-[#FAF8F5] hover:border-[#D6B77A]/50 hover:bg-[#F4F0E8] dark:border-[#303038] dark:bg-[#19191F] dark:hover:border-[#D6B77A]/50 dark:hover:bg-[#22222A] transition-all duration-300 group shadow-sm"
                >
                  <div className="p-2 rounded bg-[#FAF8F5] border border-[#D0C8BC] dark:bg-[#101014] dark:border-[#303038] text-[#777783] group-hover:bg-[#D6B77A] group-hover:text-[#101014] transition-colors">
                    <GithubIcon size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#777783] block font-bold">CODE REPOSITORY</span>
                    <span className="text-[#19191F] dark:text-[#F7F5F0] text-xs font-semibold">github.com/warcraft433</span>
                  </div>
                </a>
              )}

              {/* LeetCode */}
              {socials.leetcode && (
                <a
                  href={socials.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-xl border border-[#D0C8BC] bg-[#FAF8F5] hover:border-[#D6B77A]/50 hover:bg-[#F4F0E8] dark:border-[#303038] dark:bg-[#19191F] dark:hover:border-[#D6B77A]/50 dark:hover:bg-[#22222A] transition-all duration-300 group shadow-sm"
                >
                  <div className="p-2 rounded bg-[#FAF8F5] border border-[#D0C8BC] dark:bg-[#101014] dark:border-[#303038] text-[#D6B77A] group-hover:bg-[#D6B77A] group-hover:text-[#101014] transition-colors">
                    <Trophy size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#777783] block font-bold">PROBLEM SOLVING</span>
                    <span className="text-[#19191F] dark:text-[#F7F5F0] text-xs font-semibold">leetcode.com/u/warcarft433</span>
                  </div>
                </a>
              )}
            </div>

          </div>

          {/* Right Side: Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="p-6 md:p-8 rounded-2xl border border-[#D0C8BC] bg-[#FAF8F5] dark:border-[#303038] dark:bg-[#19191F] space-y-4 shadow-md">
              <div className="text-xs text-[#777783] font-mono pb-2 border-b border-[#D0C8BC] dark:border-[#303038] mb-2 font-bold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D6B77A]" />
                RECIPROCAL ROUTING CONTACT PORT
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="name" className="text-[10px] font-mono text-[#5A5A66] dark:text-[#777783] block uppercase font-bold">Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full px-3 py-2.5 rounded-lg border border-[#D0C8BC] bg-[#FFFFFF] text-[#19191F] font-sans text-sm focus:outline-none focus:border-[#D6B77A] dark:border-[#303038] dark:bg-[#101014] dark:text-[#F7F5F0] transition-all placeholder:text-[#777783]"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="email" className="text-[10px] font-mono text-[#5A5A66] dark:text-[#777783] block uppercase font-bold">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full px-3 py-2.5 rounded-lg border border-[#D0C8BC] bg-[#FFFFFF] text-[#19191F] font-sans text-sm focus:outline-none focus:border-[#D6B77A] dark:border-[#303038] dark:bg-[#101014] dark:text-[#F7F5F0] transition-all placeholder:text-[#777783]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="message" className="text-[10px] font-mono text-[#5A5A66] dark:text-[#777783] block uppercase font-bold">Message</label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Describe your project or role details..."
                  className="w-full px-3 py-2.5 rounded-lg border border-[#D0C8BC] bg-[#FFFFFF] text-[#19191F] font-sans text-sm focus:outline-none focus:border-[#D6B77A] dark:border-[#303038] dark:bg-[#101014] dark:text-[#F7F5F0] transition-all resize-none placeholder:text-[#777783]"
                />
              </div>

              <button
                type="submit"
                disabled={submitted}
                className="w-full py-3 rounded-lg bg-[#D6B77A] hover:bg-[#C5A566] text-[#101014] font-mono text-xs font-bold tracking-wider transition-all flex items-center justify-center gap-2 disabled:bg-[#D6B77A]/60 shadow-md shadow-[#D6B77A]/20"
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
          className="mt-20 p-8 md:p-12 rounded-2xl border border-[#D0C8BC] bg-[#FAF8F5] dark:border-[#303038] dark:bg-[#19191F] relative overflow-hidden group text-center space-y-6 shadow-md dark:shadow-2xl"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] bg-[#D6B77A]/08 rounded-full blur-[90px] pointer-events-none group-hover:scale-110 transition-transform duration-700" />
          
          <div className="space-y-2 z-10 relative">
            <h3 className="text-xl md:text-2xl font-mono text-[#D6B77A] font-bold">Have a project or opportunity?</h3>
            <p className="text-2xl md:text-4xl font-bold font-display text-[#19191F] dark:text-[#F7F5F0] max-w-2xl mx-auto tracking-tight">
              Let's build something meaningful.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center items-center pt-2 z-10 relative">
            {/* View Projects */}
            <button
              onClick={() => handleScrollTo('#projects')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#D6B77A] hover:bg-[#C5A566] text-[#101014] font-bold text-sm transition-all shadow-md shadow-[#D6B77A]/20 hover:-translate-y-0.5 active:translate-y-0"
            >
              View Projects
              <ArrowRight size={16} />
            </button>

            {/* Open Resume */}
            <button
              onClick={onOpenResume}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#FAF8F5] border border-[#D0C8BC] hover:border-[#D6B77A]/50 hover:bg-[#F4F0E8] text-[#19191F] dark:bg-[#101014] dark:border-[#303038] dark:hover:border-[#D6B77A]/50 dark:hover:text-[#D6B77A] dark:text-[#F7F5F0] font-bold text-sm transition-all shadow-sm"
            >
              <FileText size={16} className="text-[#D6B77A]" />
              Open Resume
            </button>

            {/* Direct Connect */}
            <a
              href={socials.email}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-transparent border border-transparent text-[#5A5A66] hover:text-[#D6B77A] dark:text-[#777783] dark:hover:text-[#D6B77A] font-bold text-sm transition-all"
            >
              Get In Touch
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
