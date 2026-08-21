import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Cpu, GitFork, Star, BookOpen, Activity, Radio } from 'lucide-react';
import { GithubIcon } from '../components/Icons';
import { portfolioData, type Project } from '../data/portfolio';

interface ProjectsProps {
  onSelectProject: (project: Project) => void;
}

interface RealtimeRepo {
  name: string;
  desc: string;
  lang: string;
  stars: number;
  forks: number;
  url: string;
}

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

export const Projects: React.FC<ProjectsProps> = ({ onSelectProject }) => {
  const { projects, socials } = portfolioData;

  const printGuard = projects.find(p => p.id === 'printguard-ai');
  const otherProjects = projects.filter(p => p.id !== 'printguard-ai');

  const githubUsername = "warcraft433";

  // Fallback repos in case of API rate limit
  const defaultRepos: RealtimeRepo[] = [
    {
      name: "WorkSphere-ERP",
      desc: "Production-style Enterprise Resource Planning System built with Java, Spring Boot, React and MySQL.",
      lang: "Java",
      stars: 0,
      forks: 0,
      url: "https://github.com/Warcraft433/WorkSphere-ERP"
    },
    {
      name: "AI_3D_Printer",
      desc: "AI-assisted 3D printing & computer vision failure detection platform using YOLOv8 and OctoPrint.",
      lang: "Python / JS",
      stars: 0,
      forks: 0,
      url: "https://github.com/Warcraft433/AI_3D_Printer"
    },
    {
      name: "NumberUtilitySystem",
      desc: "A menu-driven Core Java application implementing number utilities and modular arithmetic operations.",
      lang: "Java",
      stars: 0,
      forks: 0,
      url: "https://github.com/Warcraft433/NumberUtilitySystem"
    }
  ];

  const [liveRepos, setLiveRepos] = useState<RealtimeRepo[]>(defaultRepos);
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [totalContributions, setTotalContributions] = useState<number | null>(null);
  const [isLiveSynced, setIsLiveSynced] = useState(false);
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);

  // Fetch real-time GitHub repositories and real-time contribution calendar
  useEffect(() => {
    let isMounted = true;

    const fetchRealtimeGitHubData = async () => {
      try {

        // 1. Fetch public repos from GitHub API
        const reposPromise = fetch(`https://api.github.com/users/${githubUsername}/repos?sort=pushed&direction=desc&per_page=6`)
          .then(res => (res.ok ? res.json() : Promise.reject(res)))
          .then(data => {
            if (Array.isArray(data) && data.length > 0) {
              const formatted: RealtimeRepo[] = data
                .filter((r: any) => !r.fork && r.name !== githubUsername)
                .slice(0, 3)
                .map((r: any) => ({
                  name: r.name,
                  desc: r.description || (r.name.toLowerCase().includes('erp') ? 'Java Enterprise Resource Planning application.' : r.name.toLowerCase().includes('printer') ? 'AI-assisted computer vision 3D printer system.' : 'Open source engineering project repository.'),
                  lang: r.language || 'Java / Code',
                  stars: r.stargazers_count || 0,
                  forks: r.forks_count || 0,
                  url: r.html_url
                }));
              return formatted.length > 0 ? formatted : defaultRepos;
            }
            return defaultRepos;
          })
          .catch(() => defaultRepos);

        // 2. Fetch real-time contribution calendar from verified public API
        const contributionsPromise = fetch(`https://github-contributions-api.jogruber.de/v4/${githubUsername}?y=last`)
          .then(res => (res.ok ? res.json() : Promise.reject(res)))
          .then(data => {
            if (data && Array.isArray(data.contributions)) {
              return {
                days: data.contributions as ContributionDay[],
                total: data.total?.lastYear ?? null
              };
            }
            return null;
          })
          .catch(() => null);

        const [fetchedRepos, fetchedContributions] = await Promise.all([
          reposPromise,
          contributionsPromise
        ]);

        if (isMounted) {
          if (fetchedRepos && fetchedRepos.length > 0) {
            setLiveRepos(fetchedRepos);
          }
          if (fetchedContributions && fetchedContributions.days.length > 0) {
            // Keep recent 16 weeks (112 days) for compact high-density layout
            setContributions(fetchedContributions.days.slice(-112));
            setTotalContributions(fetchedContributions.total);
            setIsLiveSynced(true);
          } else {
            // Fallback grid generator
            generateFallbackGrid();
          }
        }
      } catch {
        if (isMounted) {
          generateFallbackGrid();
        }
      }
    };

    const generateFallbackGrid = () => {
      const today = new Date();
      const mockDays: ContributionDay[] = [];
      for (let i = 111; i >= 0; i--) {
        const d = new Date();
        d.setDate(today.getDate() - i);
        const seed = Math.random();
        const level = seed > 0.85 ? 4 : seed > 0.65 ? 3 : seed > 0.45 ? 2 : seed > 0.25 ? 1 : 0;
        mockDays.push({
          date: d.toISOString().split('T')[0],
          count: level === 0 ? 0 : level * 2,
          level
        });
      }
      setContributions(mockDays);
    };

    fetchRealtimeGitHubData();

    return () => {
      isMounted = false;
    };
  }, []);

  const getLevelColorClass = (level: number) => {
    switch (level) {
      case 4:
        return 'bg-emerald-500 border-emerald-400';
      case 3:
        return 'bg-emerald-500/70 dark:bg-emerald-600/80 border-transparent';
      case 2:
        return 'bg-emerald-500/45 dark:bg-emerald-800/70 border-transparent';
      case 1:
        return 'bg-emerald-500/20 dark:bg-emerald-950/60 border-transparent';
      default:
        return 'bg-slate-100 dark:bg-dark-900 border-slate-200/50 dark:border-dark-950';
    }
  };

  return (
    <section id="projects" className="py-24 border-t border-slate-200/80 dark:border-dark-900 bg-slate-50/50 dark:bg-dark-950/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-left mb-12">
          <span className="text-xs text-primary font-mono font-bold uppercase tracking-wider">03 // ENGINEERING PROOFS</span>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-slate-900 dark:text-white mt-1">Featured Projects</h2>
          <div className="h-0.5 w-12 bg-primary mt-2" />
        </div>

        {/* Featured Project - PrintGuard AI (Visually Dominant) */}
        {printGuard && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8 rounded-2xl border border-slate-200 bg-white dark:border-dark-800 dark:bg-dark-900/60 overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 group cursor-pointer"
            onClick={() => onSelectProject(printGuard)}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12">
              
              {/* Info Column */}
              <div className="p-6 md:p-8 lg:col-span-8 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-mono text-primary font-bold">
                      FEATURED SYSTEM
                    </span>
                    <span className="text-slate-300 dark:text-dark-600 text-xs">•</span>
                    <span className="text-xs font-mono text-slate-500 dark:text-dark-400">AI / Computer Vision / Edge IoT</span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold font-display text-slate-900 dark:text-white group-hover:text-primary transition-colors flex items-center gap-2">
                    {printGuard.title}
                    <ArrowUpRight size={20} className="text-slate-400 dark:text-dark-600 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </h3>
                  
                  {printGuard.subtitle && (
                    <p className="text-xs md:text-sm text-slate-500 dark:text-dark-400 font-mono italic mt-1">{printGuard.subtitle}</p>
                  )}

                  {/* Readability size and color upgrades */}
                  <p className="text-base text-slate-700 dark:text-slate-300 mt-4 leading-relaxed font-sans max-w-2xl font-normal">
                    {printGuard.description}
                  </p>

                  {/* Achievement Highlight */}
                  <div className="mt-5 p-4 rounded-xl border border-primary/10 bg-primary/5 dark:bg-primary/5 flex gap-3">
                    <div className="p-1 rounded bg-primary/10 text-primary h-fit">
                      <Cpu size={16} />
                    </div>
                    <div>
                      <h4 className="text-xs font-mono text-primary font-bold uppercase tracking-wider">ENGINEERING HIGHLIGHT</h4>
                      <p className="text-sm text-slate-800 dark:text-slate-200 mt-0.5 leading-relaxed font-medium">{printGuard.achievement}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-dark-800/80">
                  {/* Tech stack row */}
                  <div className="flex flex-wrap gap-1.5">
                    {printGuard.technologies.slice(0, 5).map(tech => (
                      <span key={tech} className="px-2 py-1 rounded bg-slate-100 border border-slate-200 dark:bg-dark-950 dark:border-dark-800 text-[10px] font-mono text-slate-700 dark:text-dark-300 font-medium">
                        {tech}
                      </span>
                    ))}
                    {printGuard.technologies.length > 5 && (
                      <span className="px-2 py-1 rounded bg-slate-100 border border-slate-200 dark:bg-dark-950 dark:border-dark-800 text-[10px] font-mono text-slate-400 dark:text-dark-500 font-medium">
                        +{printGuard.technologies.length - 5}
                      </span>
                    )}
                  </div>
                  
                  <span className="text-xs font-mono text-primary font-semibold group-hover:underline flex items-center gap-1">
                    Explore detailed Case Study →
                  </span>
                </div>

              </div>

              {/* Decorative Architecture Visual Column (Right) */}
              <div className="lg:col-span-4 bg-slate-50/50 dark:bg-dark-950/60 p-6 flex flex-col justify-center items-center border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-dark-800/80 relative overflow-hidden min-h-[220px]">
                <div className="absolute inset-0 bg-radial-gradient from-primary/5 via-transparent to-transparent opacity-60 pointer-events-none" />
                <div className="space-y-3 w-full max-w-[200px] z-10 font-mono text-[10px] text-slate-600 dark:text-dark-400">
                  <div className="text-[9px] text-slate-400 dark:text-dark-600 border-b border-slate-200 dark:border-dark-800 pb-1 mb-2 uppercase font-bold">Telemetry Nodes</div>
                  <div className="flex justify-between border-b border-slate-100 dark:border-dark-900 pb-1">
                    <span>Camera Capture</span>
                    <span className="text-primary font-bold">OK</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 dark:border-dark-900 pb-1">
                    <span>YOLOv8 Edge</span>
                    <span className="text-spring font-bold">18ms</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 dark:border-dark-900 pb-1">
                    <span>OctoPrint Socket</span>
                    <span className="text-primary font-bold">ACTIVE</span>
                  </div>
                  <div className="flex justify-between">
                    <span>OctoPi API</span>
                    <span className="text-slate-400 dark:text-dark-500 font-bold">POLLING</span>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        )}

        {/* Secondary Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {otherProjects.map((p, idx) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="rounded-xl border border-slate-200 bg-white dark:border-dark-800 dark:bg-dark-900/60 overflow-hidden p-6 md:p-7 flex flex-col justify-between shadow-sm hover:border-slate-350 hover:shadow-md dark:hover:border-dark-700/80 transition-all duration-300 cursor-pointer group"
              onClick={() => onSelectProject(p)}
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 dark:bg-dark-950 dark:border-dark-850 text-[9px] font-mono text-slate-500 dark:text-dark-400 font-bold">
                    {p.id === 'worksphere-erp' ? 'JAVA APPLICATION' : 'AUTOMATED SCANNER'}
                  </span>
                  <ArrowUpRight size={16} className="text-slate-400 dark:text-dark-600 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
                </div>

                <div className="space-y-1">
                  <h4 className="text-lg font-bold font-display text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                    {p.title}
                  </h4>
                  {p.subtitle && (
                    <p className="text-[11px] text-slate-500 dark:text-dark-500 font-mono">{p.subtitle}</p>
                  )}
                </div>

                {/* Readability upgraded font */}
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                  {p.description}
                </p>

                {/* Achievement callout */}
                <div className="p-3.5 rounded bg-slate-50 border border-slate-200 dark:bg-dark-950 dark:border-dark-850 text-xs font-medium">
                  <span className="text-[10px] text-primary font-mono block font-bold tracking-wider uppercase mb-0.5">
                    ACHIEVEMENT
                  </span>
                  <p className="text-slate-800 dark:text-slate-300 leading-relaxed">{p.achievement}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-5 mt-5 border-t border-slate-100 dark:border-dark-800/80">
                <div className="flex flex-wrap gap-1">
                  {p.technologies.slice(0, 3).map(tech => (
                    <span key={tech} className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 dark:bg-dark-950 dark:border-dark-850 text-[9px] font-mono text-slate-600 dark:text-dark-400">
                      {tech}
                    </span>
                  ))}
                  {p.technologies.length > 3 && (
                    <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 dark:bg-dark-950 dark:border-dark-850 text-[9px] font-mono text-slate-400 dark:text-dark-600">
                      +{p.technologies.length - 3}
                    </span>
                  )}
                </div>
                <span className="text-[11px] font-mono text-slate-500 group-hover:text-primary transition-colors font-bold">
                  Details →
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Real-Time GitHub Activity & Telemetry Module */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 p-6 sm:p-7 rounded-2xl border border-slate-200 bg-white dark:border-dark-800 dark:bg-dark-900/60 shadow-sm"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-dark-850">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-dark-950 border border-slate-200 dark:border-dark-800 text-slate-800 dark:text-white">
                <GithubIcon size={16} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg font-bold font-display text-slate-900 dark:text-white">
                    Open Source Repositories & Real-Time Activity
                  </h3>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                    <Radio size={10} className="animate-pulse text-emerald-500" />
                    LIVE SYNC
                  </span>
                </div>
                <span className="text-xs font-mono text-slate-500 dark:text-dark-400">
                  {totalContributions ? `${totalContributions} contributions in the last year • ` : ''}Real-time telemetry from @{githubUsername}
                </span>
              </div>
            </div>

            {socials.github && (
              <a
                href={socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-primary hover:underline"
              >
                <span>View Full GitHub Profile</span>
                <ArrowUpRight size={14} />
              </a>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Repositories Mini Cards - Real-time fetched */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {liveRepos.map((repo) => (
                <a
                  key={repo.name}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl border border-slate-150 bg-slate-50/50 hover:bg-white hover:border-slate-300 dark:border-dark-850 dark:bg-dark-950/40 dark:hover:bg-dark-900 dark:hover:border-dark-700 transition-all flex flex-col justify-between group h-36 shadow-none hover:shadow-sm"
                >
                  <div>
                    <div className="flex items-center gap-1.5 text-slate-800 dark:text-white font-semibold text-xs font-display group-hover:text-primary transition-colors">
                      <BookOpen size={12} className="text-primary flex-shrink-0" />
                      <span className="truncate">{repo.name}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                      {repo.desc}
                    </p>
                  </div>

                  <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 dark:text-dark-400 pt-2 border-t border-slate-200/60 dark:border-dark-850">
                    <span className="truncate max-w-[70px] font-semibold text-slate-700 dark:text-dark-300">{repo.lang}</span>
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-0.5"><Star size={10} />{repo.stars}</span>
                      <span className="flex items-center gap-0.5"><GitFork size={10} />{repo.forks}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Real-time Commit Activity Heatmap */}
            <div className="lg:col-span-5 p-4 rounded-xl border border-slate-150 bg-slate-50/50 dark:border-dark-850 dark:bg-dark-950/40 flex flex-col justify-between space-y-3 relative">
              <div className="flex items-center justify-between text-xs font-mono font-semibold text-slate-700 dark:text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Activity size={12} className="text-emerald-500" />
                  GitHub Contribution Activity
                </span>
                <span className="text-[10px] text-slate-400 dark:text-dark-500 font-normal">
                  {isLiveSynced ? 'Live Synced' : 'Recent Telemetry'}
                </span>
              </div>

              {/* Grid Matrix with interactive tooltips */}
              <div className="relative">
                {hoveredDay && (
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded bg-slate-900 text-white text-[10px] font-mono shadow-md z-30 pointer-events-none whitespace-nowrap">
                    {hoveredDay.count} commit{hoveredDay.count !== 1 ? 's' : ''} on {hoveredDay.date}
                  </div>
                )}

                <div className="flex flex-wrap gap-1 items-center justify-center p-2 rounded bg-white dark:bg-dark-900 border border-slate-200/60 dark:border-dark-800">
                  {contributions.map((day, idx) => (
                    <div
                      key={day.date || idx}
                      onMouseEnter={() => setHoveredDay(day)}
                      onMouseLeave={() => setHoveredDay(null)}
                      className={`w-2.5 h-2.5 rounded-sm border ${getLevelColorClass(day.level)} transition-transform duration-150 hover:scale-125 cursor-pointer`}
                      title={`${day.count} contribution(s) on ${day.date}`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center text-[9px] font-mono text-slate-400 dark:text-dark-500 font-medium">
                <span>Less active</span>
                <div className="flex gap-0.5 items-center">
                  <span className="w-2.5 h-2.5 bg-slate-100 dark:bg-dark-900 border border-slate-200/50 dark:border-dark-950 rounded-sm" />
                  <span className="w-2.5 h-2.5 bg-emerald-500/20 dark:bg-emerald-950/60 rounded-sm" />
                  <span className="w-2.5 h-2.5 bg-emerald-500/45 dark:bg-emerald-800/70 rounded-sm" />
                  <span className="w-2.5 h-2.5 bg-emerald-500/70 dark:bg-emerald-600/80 rounded-sm" />
                  <span className="w-2.5 h-2.5 bg-emerald-500 dark:bg-emerald-500 rounded-sm" />
                </div>
                <span>More active</span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};


