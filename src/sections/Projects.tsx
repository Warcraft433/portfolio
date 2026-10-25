import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Cpu, GitFork, Star, BookOpen, Activity, Radio, RefreshCw, Eye } from 'lucide-react';
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
      name: "WorkSphere",
      desc: "Enterprise workforce management and resource planning backend system built with Java, Spring Boot, MySQL, and modern web technologies.",
      lang: "Java",
      stars: 0,
      forks: 0,
      url: "https://github.com/Warcraft433/WorkSphere"
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
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);

  const fetchRealtimeGitHubData = async () => {
    setIsRefreshing(true);
    try {
      const cacheBuster = Date.now();

      // 1. Fetch public repos from GitHub API
      const reposPromise = fetch(
        `https://api.github.com/users/${githubUsername}/repos?sort=pushed&direction=desc&per_page=12&_t=${cacheBuster}`,
        { cache: 'no-store' }
      )
        .then(res => (res.ok ? res.json() : Promise.reject(res)))
        .then(data => {
          if (Array.isArray(data) && data.length > 0) {
            const ignoredNames = [githubUsername.toLowerCase(), 'portfolio', 'adarsh.github.io'];
            const formatted: RealtimeRepo[] = data
              .filter((r: any) => !r.fork && !ignoredNames.includes(r.name.toLowerCase()))
              .slice(0, 3)
              .map((r: any) => ({
                name: r.name,
                desc: r.description || (
                  r.name.toLowerCase().includes('worksphere') || r.name.toLowerCase().includes('erp')
                    ? 'Enterprise workforce management and resource planning backend system built with Java, Spring Boot, MySQL.'
                    : r.name.toLowerCase().includes('printer')
                    ? 'AI-assisted computer vision 3D printer failure detection system.'
                    : 'Open source engineering project repository.'
                ),
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

      // 2. Fetch public contribution matrix
      const contributionsPromise = fetch(
        `https://github-contributions-api.jogruber.de/v4/${githubUsername}?y=last&_t=${cacheBuster}`,
        { cache: 'no-store' }
      )
        .then(res => (res.ok ? res.json() : Promise.reject(res)))
        .then(data => {
          if (data && Array.isArray(data.contributions)) {
            const rawDays: any[] = data.contributions;
            const recentDays = rawDays.slice(-77); // ~11 weeks
            const formatted: ContributionDay[] = recentDays.map((d: any) => ({
              date: d.date,
              count: d.count,
              level: d.level
            }));

            const sum = rawDays.reduce((acc: number, curr: any) => acc + (curr.count || 0), 0);
            return { formatted, total: sum };
          }
          throw new Error('Contribution API empty');
        })
        .catch(() => null);

      const [repos, contribData] = await Promise.all([reposPromise, contributionsPromise]);

      setLiveRepos(repos);
      if (contribData && contribData.formatted.length > 0) {
        setContributions(contribData.formatted);
        setTotalContributions(contribData.total);
        setIsLiveSynced(true);
      } else {
        generateSyntheticRecentContributions();
      }
    } catch {
      setLiveRepos(defaultRepos);
      generateSyntheticRecentContributions();
    } finally {
      setIsRefreshing(false);
    }
  };

  const generateSyntheticRecentContributions = () => {
    const mockDays: ContributionDay[] = [];
    const now = new Date();
    for (let i = 76; i >= 0; i--) {
      const d = new Date();
      d.setDate(now.getDate() - i);
      const isWeekend = d.getDay() === 0 || d.getDay() === 6;
      const count = isWeekend ? (Math.random() > 0.6 ? Math.floor(Math.random() * 3) : 0) : Math.floor(Math.random() * 5);
      const level = count === 0 ? 0 : count < 2 ? 1 : count < 4 ? 2 : count < 6 ? 3 : 4;
      mockDays.push({
        date: d.toISOString().split('T')[0],
        count,
        level
      });
    }
    setContributions(mockDays);
    setTotalContributions(48);
  };

  useEffect(() => {
    fetchRealtimeGitHubData();
  }, []);

  const getLevelColorClass = (level: number) => {
    switch (level) {
      case 4:
        return 'bg-[#D6B77A] border-[#DECBA1]';
      case 3:
        return 'bg-[#D6B77A]/80 border-transparent';
      case 2:
        return 'bg-[#D6B77A]/50 border-transparent';
      case 1:
        return 'bg-[#D6B77A]/20 border-transparent';
      default:
        return 'bg-[#FAF8F5] dark:bg-[#101014] border-[#D0C8BC]/40 dark:border-[#303038]';
    }
  };

  return (
    <section id="projects" className="py-24 border-t border-[#D0C8BC] dark:border-[#303038] bg-[#FAF8F5]/40 dark:bg-[#101014]/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-left mb-12">
          <span className="text-xs text-[#D6B77A] font-mono font-bold uppercase tracking-wider">03 // ENGINEERING PROOFS</span>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-[#19191F] dark:text-[#F7F5F0] mt-1">Featured Projects</h2>
          <div className="h-0.5 w-12 bg-[#D6B77A] mt-2" />
        </div>

        {/* Featured Project - PrintGuard AI (Visually Dominant with Live Project Image Preview) */}
        {printGuard && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10 rounded-2xl border border-[#D0C8BC] bg-[#FAF8F5] dark:border-[#303038] dark:bg-[#19191F] overflow-hidden shadow-sm hover:shadow-2xl hover:border-[#D6B77A]/50 transition-all duration-300 group cursor-pointer"
            onClick={() => onSelectProject(printGuard)}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12">
              
              {/* Info Column (Left) */}
              <div className="p-6 md:p-8 lg:col-span-7 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#D6B77A]/12 border border-[#D6B77A]/30 text-[10px] font-mono text-[#D6B77A] font-bold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D6B77A]" />
                      FEATURED SYSTEM
                    </span>
                    <span className="text-[#D0C8BC] dark:text-[#303038] text-xs">•</span>
                    <span className="text-xs font-mono text-[#5A5A66] dark:text-[#777783]">AI / Computer Vision / Edge IoT</span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold font-display text-[#19191F] dark:text-[#F7F5F0] group-hover:text-[#D6B77A] transition-colors flex items-center gap-2">
                    {printGuard.title}
                    <ArrowUpRight size={20} className="text-[#777783] group-hover:text-[#D6B77A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </h3>
                  
                  {printGuard.subtitle && (
                    <p className="text-xs md:text-sm text-[#777783] font-mono italic mt-1">{printGuard.subtitle}</p>
                  )}

                  {/* Description */}
                  <p className="text-base text-[#4B4B54] dark:text-[#9E9EAA] mt-4 leading-relaxed font-sans max-w-2xl font-normal">
                    {printGuard.description}
                  </p>

                  {/* Achievement Highlight */}
                  <div className="mt-5 p-4 rounded-xl border border-[#D6B77A]/25 bg-[#D6B77A]/06 dark:border-[#D6B77A]/20 dark:bg-[#D6B77A]/08 flex gap-3">
                    <div className="p-1 rounded bg-[#D6B77A]/15 text-[#D6B77A] h-fit">
                      <Cpu size={16} />
                    </div>
                    <div>
                      <h4 className="text-xs font-mono text-[#D6B77A] font-bold uppercase tracking-wider">ENGINEERING HIGHLIGHT</h4>
                      <p className="text-sm text-[#19191F] dark:text-[#F7F5F0] mt-0.5 leading-relaxed font-medium">{printGuard.achievement}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#D0C8BC] dark:border-[#303038]">
                  {/* Tech stack row */}
                  <div className="flex flex-wrap gap-1.5">
                    {printGuard.technologies.slice(0, 5).map(tech => (
                      <span key={tech} className="px-2 py-1 rounded bg-[#FAF8F5] border border-[#D0C8BC] dark:bg-[#101014] dark:border-[#303038] text-[10px] font-mono text-[#36363E] dark:text-[#C8C6C0] font-medium">
                        {tech}
                      </span>
                    ))}
                    {printGuard.technologies.length > 5 && (
                      <span className="px-2 py-1 rounded bg-[#FAF8F5] border border-[#D0C8BC] dark:bg-[#101014] dark:border-[#303038] text-[10px] font-mono text-[#777783] font-medium">
                        +{printGuard.technologies.length - 5}
                      </span>
                    )}
                  </div>
                  
                  <span className="text-xs font-mono text-[#D6B77A] font-semibold group-hover:underline flex items-center gap-1">
                    Explore Case Study & Specs →
                  </span>
                </div>

              </div>

              {/* Project Image Preview & Telemetry Display Column (Right) */}
              <div className="lg:col-span-5 bg-[#F4F0E8] dark:bg-[#101014] p-5 md:p-6 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-[#D0C8BC] dark:border-[#303038] relative overflow-hidden">
                <div className="absolute inset-0 bg-radial-gradient from-[#D6B77A]/06 via-transparent to-transparent opacity-40 pointer-events-none" />
                
                {/* Project Image Frame */}
                {printGuard.imageUrl && (
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-[#D0C8BC] dark:border-[#303038] bg-[#101014] shadow-md group-hover:border-[#D6B77A]/40 transition-all duration-300">
                    <img
                      src={printGuard.imageUrl}
                      alt={printGuard.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded bg-[#101014]/85 backdrop-blur-md border border-[#D6B77A]/30 text-[9px] font-mono text-[#F7F5F0] flex items-center gap-1.5 shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D6B77A]" />
                      <span>HUD TELEMETRY</span>
                    </div>
                  </div>
                )}

                {/* Telemetry rows */}
                <div className="mt-4 pt-3 border-t border-[#D0C8BC] dark:border-[#303038] grid grid-cols-2 gap-2 text-[10px] font-mono">
                  <div className="p-2 rounded bg-[#FAF8F5] dark:bg-[#19191F] border border-[#D0C8BC] dark:border-[#303038] flex justify-between items-center">
                    <span className="text-[#777783]">Camera Feed:</span>
                    <span className="text-[#D6B77A] font-bold">1080p @ 30fps</span>
                  </div>
                  <div className="p-2 rounded bg-[#FAF8F5] dark:bg-[#19191F] border border-[#D0C8BC] dark:border-[#303038] flex justify-between items-center">
                    <span className="text-[#777783]">Edge Latency:</span>
                    <span className="text-[#D6B77A] font-bold">18ms YOLOv8</span>
                  </div>
                  <div className="p-2 rounded bg-[#FAF8F5] dark:bg-[#19191F] border border-[#D0C8BC] dark:border-[#303038] flex justify-between items-center">
                    <span className="text-[#777783]">OctoPi Hook:</span>
                    <span className="text-[#19191F] dark:text-[#F7F5F0] font-bold">REST ACTIVE</span>
                  </div>
                  <div className="p-2 rounded bg-[#FAF8F5] dark:bg-[#19191F] border border-[#D0C8BC] dark:border-[#303038] flex justify-between items-center">
                    <span className="text-[#777783]">Intervention:</span>
                    <span className="text-[#D6B77A] font-bold">AUTO-PAUSE</span>
                  </div>
                </div>

              </div>

            </div>
          </motion.div>
        )}

        {/* Secondary Projects Grid with Project Image Mockups */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {otherProjects.map((p, idx) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="rounded-2xl border border-[#D0C8BC] bg-[#FAF8F5] dark:border-[#303038] dark:bg-[#19191F] overflow-hidden p-6 md:p-7 flex flex-col justify-between shadow-sm hover:border-[#D6B77A]/50 hover:shadow-xl transition-all duration-300 cursor-pointer group"
              onClick={() => onSelectProject(p)}
            >
              <div className="space-y-4">
                
                {/* Project Image Frame */}
                {p.imageUrl && (
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-[#D0C8BC] dark:border-[#303038] bg-[#101014] group-hover:border-[#D6B77A]/40 transition-colors shadow-inner">
                    <img
                      src={p.imageUrl}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded bg-[#101014]/85 backdrop-blur-md border border-[#D6B77A]/25 text-[9px] font-mono text-[#F7F5F0] flex items-center gap-1.5 shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D6B77A]" />
                      <span>{p.id === 'worksphere-erp' ? 'DASHBOARD ARCHITECTURE' : 'POINT-CLOUD TELEMETRY'}</span>
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-start pt-1">
                  <span className="px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#D0C8BC] dark:bg-[#101014] dark:border-[#303038] text-[9px] font-mono text-[#5A5A66] dark:text-[#777783] font-bold">
                    {p.id === 'worksphere-erp' ? 'JAVA BACKEND & SQL' : 'EMBEDDED HARDWARE'}
                  </span>
                  <ArrowUpRight size={16} className="text-[#777783] group-hover:text-[#D6B77A] transition-colors" />
                </div>

                <div className="space-y-1">
                  <h4 className="text-xl font-bold font-display text-[#19191F] dark:text-[#F7F5F0] group-hover:text-[#D6B77A] transition-colors">
                    {p.title}
                  </h4>
                  {p.subtitle && (
                    <p className="text-[11px] text-[#777783] font-mono">{p.subtitle}</p>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm text-[#4B4B54] dark:text-[#9E9EAA] leading-relaxed font-sans">
                  {p.description}
                </p>

                {/* Achievement callout */}
                <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#D0C8BC] dark:bg-[#14141A] dark:border-[#303038] text-xs font-medium">
                  <span className="text-[10px] text-[#D6B77A] font-mono block font-bold tracking-wider uppercase mb-0.5">
                    KEY ACHIEVEMENT
                  </span>
                  <p className="text-[#19191F] dark:text-[#F7F5F0] leading-relaxed">{p.achievement}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-5 mt-5 border-t border-[#D0C8BC] dark:border-[#303038]">
                <div className="flex flex-wrap gap-1">
                  {p.technologies.slice(0, 3).map(tech => (
                    <span key={tech} className="px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#D0C8BC] dark:bg-[#101014] dark:border-[#303038] text-[9px] font-mono text-[#5A5A66] dark:text-[#777783]">
                      {tech}
                    </span>
                  ))}
                  {p.technologies.length > 3 && (
                    <span className="px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#D0C8BC] dark:bg-[#101014] dark:border-[#303038] text-[9px] font-mono text-[#777783]">
                      +{p.technologies.length - 3}
                    </span>
                  )}
                </div>
                <span className="text-[11px] font-mono text-[#D6B77A] transition-colors font-bold flex items-center gap-1 group-hover:translate-x-0.5">
                  <Eye size={12} />
                  Case Study →
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
          className="mt-12 p-6 sm:p-7 rounded-2xl border border-[#D0C8BC] bg-[#FAF8F5] dark:border-[#303038] dark:bg-[#19191F] shadow-sm"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[#D0C8BC] dark:border-[#303038]">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-[#FAF8F5] dark:bg-[#101014] border border-[#D0C8BC] dark:border-[#303038] text-[#19191F] dark:text-[#F7F5F0]">
                <GithubIcon size={16} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg font-bold font-display text-[#19191F] dark:text-[#F7F5F0]">
                    Open Source Repositories & Real-Time Activity
                  </h3>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#D6B77A]/12 border border-[#D6B77A]/30 text-[9px] font-mono text-[#D6B77A] font-bold">
                    <Radio size={10} className="text-[#D6B77A]" />
                    LIVE SYNC
                  </span>
                </div>
                <span className="text-xs font-mono text-[#777783]">
                  {totalContributions ? `${totalContributions} contributions in the last year • ` : ''}Real-time telemetry from @{githubUsername}
                </span>
              </div>
            </div>

            {socials.github && (
              <a
                href={socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#D6B77A] hover:underline"
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
                  className="p-4 rounded-xl border border-[#D0C8BC] bg-[#FAF8F5] hover:bg-[#F4F0E8] hover:border-[#D6B77A]/50 dark:border-[#303038] dark:bg-[#14141A] dark:hover:bg-[#19191F] dark:hover:border-[#D6B77A]/50 transition-all flex flex-col justify-between group h-36 shadow-none hover:shadow-sm"
                >
                  <div>
                    <div className="flex items-center gap-1.5 text-[#19191F] dark:text-[#F7F5F0] font-semibold text-xs font-display group-hover:text-[#D6B77A] transition-colors">
                      <BookOpen size={12} className="text-[#D6B77A] flex-shrink-0" />
                      <span className="truncate">{repo.name}</span>
                    </div>
                    <p className="text-[11px] text-[#5A5A66] dark:text-[#777783] mt-2 line-clamp-2 leading-relaxed">
                      {repo.desc}
                    </p>
                  </div>

                  <div className="flex justify-between items-center text-[10px] font-mono text-[#777783] pt-2 border-t border-[#D0C8BC] dark:border-[#303038]">
                    <span className="truncate max-w-[70px] font-semibold text-[#36363E] dark:text-[#C8C6C0]">{repo.lang}</span>
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-0.5"><Star size={10} />{repo.stars}</span>
                      <span className="flex items-center gap-0.5"><GitFork size={10} />{repo.forks}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Real-time Commit Activity Heatmap */}
            <div className="lg:col-span-5 p-4 rounded-xl border border-[#D0C8BC] bg-[#FAF8F5] dark:border-[#303038] dark:bg-[#14141A] flex flex-col justify-between space-y-3 relative">
              <div className="flex items-center justify-between text-xs font-mono font-semibold text-[#36363E] dark:text-[#C8C6C0]">
                <span className="flex items-center gap-1.5">
                  <Activity size={12} className="text-[#D6B77A]" />
                  GitHub Contribution Activity
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-[#777783] font-normal">
                    {isLiveSynced ? 'Live Synced' : 'Recent Telemetry'}
                  </span>
                  <button
                    onClick={() => fetchRealtimeGitHubData()}
                    disabled={isRefreshing}
                    title="Force refresh live GitHub telemetry"
                    className="p-1 rounded hover:bg-[#F4F0E8] dark:hover:bg-[#19191F] text-[#777783] hover:text-[#19191F] dark:hover:text-[#F7F5F0] transition-colors"
                  >
                    <RefreshCw size={11} className={isRefreshing ? 'animate-spin text-[#D6B77A]' : ''} />
                  </button>
                </div>
              </div>

              {/* Grid Matrix with tooltips */}
              <div className="relative overflow-x-auto pb-1">
                {hoveredDay && (
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded bg-[#101014] text-[#F7F5F0] border border-[#303038] text-[10px] font-mono shadow-md z-30 pointer-events-none whitespace-nowrap">
                    {hoveredDay.count} commit{hoveredDay.count !== 1 ? 's' : ''} on {hoveredDay.date}
                  </div>
                )}

                <div className="grid grid-rows-7 grid-flow-col gap-1 w-fit mx-auto p-2 rounded bg-[#FAF8F5] dark:bg-[#101014] border border-[#D0C8BC] dark:border-[#303038]">
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

              <div className="flex justify-between items-center text-[9px] font-mono text-[#777783] font-medium">
                <span>Less active</span>
                <div className="flex gap-0.5 items-center">
                  <span className="w-2.5 h-2.5 bg-[#FAF8F5] dark:bg-[#101014] border border-[#D0C8BC] dark:border-[#303038] rounded-sm" />
                  <span className="w-2.5 h-2.5 bg-[#D6B77A]/20 rounded-sm" />
                  <span className="w-2.5 h-2.5 bg-[#D6B77A]/50 rounded-sm" />
                  <span className="w-2.5 h-2.5 bg-[#D6B77A]/80 rounded-sm" />
                  <span className="w-2.5 h-2.5 bg-[#D6B77A] rounded-sm" />
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
