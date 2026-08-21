import React, { useState, useEffect } from 'react';
import { GitFork, Star, BookOpen, Info } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

// Configurable Username
const GITHUB_USERNAME = "placeholder-adarsh"; // Adarsh can easily swap this out

interface GithubUser {
  login: string;
  public_repos: number;
  followers: number;
  following: number;
  avatar_url: string;
}

interface GithubRepo {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  html_url: string;
}

export const GitHubStats: React.FC = () => {
  const [user, setUser] = useState<GithubUser | null>(null);
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFallback, setIsFallback] = useState(false);

  useEffect(() => {
    const fetchGitHubData = async () => {
      if (!GITHUB_USERNAME || GITHUB_USERNAME.includes('placeholder')) {
        setIsFallback(true);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const userRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
        if (!userRes.ok) throw new Error('Failed to fetch user');
        const userData = await userRes.json();
        setUser({
          login: userData.login,
          public_repos: userData.public_repos,
          followers: userData.followers,
          following: userData.following,
          avatar_url: userData.avatar_url
        });

        const reposRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=4`);
        if (!reposRes.ok) throw new Error('Failed to fetch repos');
        const reposData = await reposRes.json();
        const formattedRepos = reposData.map((repo: any) => ({
          id: repo.id,
          name: repo.name,
          description: repo.description || 'No description provided.',
          stargazers_count: repo.stargazers_count,
          forks_count: repo.forks_count,
          language: repo.language || 'Code',
          html_url: repo.html_url
        }));
        setRepos(formattedRepos);
      } catch (err) {
        console.warn('GitHub API failed or rate limited, falling back to static repos.', err);
        setIsFallback(true);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  const fallbackRepos: GithubRepo[] = [
    {
      id: 101,
      name: "printguard-ai",
      description: "AI-Enhanced 3D Printer for Autonomous Printing and Real-Time Error Detection using YOLOv8 and OctoPrint.",
      stargazers_count: 8,
      forks_count: 2,
      language: "Python",
      html_url: `${portfolioData.socials.github}/printguard-ai`
    },
    {
      id: 102,
      name: "worksphere-erp",
      description: "Enterprise workflow management and resource planning backend engine built on Spring Boot.",
      stargazers_count: 12,
      forks_count: 3,
      language: "Java",
      html_url: `${portfolioData.socials.github}/worksphere-erp`
    },
    {
      id: 103,
      name: "ir-3d-scanner",
      description: "Embedded coordinate capture and mapping using Infrared sensors and dual-axis stepper control.",
      stargazers_count: 5,
      forks_count: 1,
      language: "Embedded C",
      html_url: `${portfolioData.socials.github}/ir-3d-scanner`
    }
  ];

  // Helper to generate simulated GitHub commit grid squares (16 weeks x 7 days)
  const generateSimulatedGrid = () => {
    const squares = [];
    const colors = [
      'bg-slate-100 dark:bg-dark-900 border-slate-200/50 dark:border-dark-950', // 0 commits
      'bg-emerald-500/10 dark:bg-emerald-950/40 border-transparent', // light commits
      'bg-emerald-500/30 dark:bg-emerald-900/60 border-transparent', // medium commits
      'bg-emerald-500/60 dark:bg-emerald-700/80 border-transparent', // busy commits
      'bg-emerald-500 dark:bg-emerald-500 border-transparent' // heavy commits
    ];
    
    for (let i = 0; i < 16 * 7; i++) {
      const seed = Math.random();
      let colorClass = colors[0];
      if (seed > 0.85) colorClass = colors[4];
      else if (seed > 0.65) colorClass = colors[3];
      else if (seed > 0.45) colorClass = colors[2];
      else if (seed > 0.25) colorClass = colors[1];
      
      squares.push(
        <div
          key={i}
          className={`w-2.5 h-2.5 rounded-sm border ${colorClass} transition-colors duration-300 hover:scale-110`}
        />
      );
    }
    return squares;
  };

  const displayUser = user || {
    login: GITHUB_USERNAME.includes('placeholder') ? "adarsh-dev" : GITHUB_USERNAME,
    public_repos: 3,
    followers: 12,
    following: 15,
    avatar_url: `https://api.dicebear.com/7.x/bottts/svg?seed=adarsh`
  };

  const displayRepos = isFallback ? fallbackRepos : repos;

  return (
    <section id="github" className="py-20 border-t border-slate-150 dark:border-dark-900 bg-slate-50/20 dark:bg-dark-950/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-left mb-12">
          <span className="text-xs text-primary font-mono font-bold uppercase tracking-wider">06 // CODE TELEMETRY</span>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-slate-900 dark:text-white mt-1">Open Source & Activity</h2>
          <div className="h-0.5 w-12 bg-primary mt-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left panel: GitHub Profile and commit stats */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* User Profile summary Card */}
            <div className="p-6 rounded-xl border border-slate-200 bg-white dark:border-dark-800 dark:bg-dark-900/60 relative overflow-hidden group shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl overflow-hidden border border-slate-200 bg-slate-50 dark:border-dark-800 dark:bg-dark-950 flex items-center justify-center">
                  <img
                    src={displayUser.avatar_url}
                    alt={`${displayUser.login} avatar`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-base font-bold font-display text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                    @{displayUser.login}
                  </h3>
                  <a
                    href={`https://github.com/${GITHUB_USERNAME}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-mono text-slate-400 dark:text-dark-500 hover:text-primary transition-colors font-bold"
                  >
                    view github profile ↗
                  </a>
                </div>
              </div>

              {/* API status callout */}
              {isFallback && (
                <div className="mt-4 p-2.5 rounded bg-amber-500/5 border border-amber-550/10 flex items-center gap-2 text-[10px] text-amber-600 dark:text-amber-400 font-mono font-bold">
                  <Info size={12} className="flex-shrink-0" />
                  <span>Showing repository profile details (API Demo Mode).</span>
                </div>
              )}

              <div className="grid grid-cols-3 gap-2 mt-6 pt-4 border-t border-slate-100 dark:border-dark-800/60 text-center font-mono text-xs">
                <div className="p-2 rounded bg-slate-50 border border-slate-200 dark:bg-dark-950 dark:border-dark-850">
                  <span className="text-[10px] text-slate-400 dark:text-dark-500 block">Repos</span>
                  <span className="text-sm font-bold text-slate-800 dark:text-white mt-0.5">{displayUser.public_repos}</span>
                </div>
                <div className="p-2 rounded bg-slate-50 border border-slate-200 dark:bg-dark-950 dark:border-dark-850">
                  <span className="text-[10px] text-slate-400 dark:text-dark-500 block">Followers</span>
                  <span className="text-sm font-bold text-slate-800 dark:text-white mt-0.5">{displayUser.followers}</span>
                </div>
                <div className="p-2 rounded bg-slate-50 border border-slate-200 dark:bg-dark-950 dark:border-dark-850">
                  <span className="text-[10px] text-slate-400 dark:text-dark-500 block">Following</span>
                  <span className="text-sm font-bold text-slate-800 dark:text-white mt-0.5">{displayUser.following}</span>
                </div>
              </div>
            </div>

            {/* Commit contribution card */}
            <div className="p-6 rounded-xl border border-slate-200 bg-white dark:border-dark-800 dark:bg-dark-900/60 space-y-4 shadow-sm">
              <div className="flex justify-between items-center text-xs font-mono font-bold">
                <span className="text-slate-500 dark:text-dark-400">ACTIVITY GRAPH</span>
                <span className="text-[10px] text-slate-400 dark:text-dark-600">Simulated 16w</span>
              </div>
              
              {/* Contribution Grid */}
              <div className="flex flex-wrap gap-1 items-center justify-center p-1.5 rounded-lg bg-slate-50 border border-slate-200 dark:bg-dark-950 dark:border-dark-850">
                {generateSimulatedGrid()}
              </div>

              <div className="flex justify-between items-center text-[9px] font-mono text-slate-400 dark:text-dark-600 font-bold">
                <span>Less</span>
                <div className="flex gap-0.5">
                  <span className="w-2.5 h-2.5 bg-slate-100 dark:bg-dark-900 border border-slate-200/50 dark:border-dark-950 rounded-sm" />
                  <span className="w-2.5 h-2.5 bg-emerald-500/10 dark:bg-emerald-950/40 rounded-sm" />
                  <span className="w-2.5 h-2.5 bg-emerald-500/30 dark:bg-emerald-900/60 rounded-sm" />
                  <span className="w-2.5 h-2.5 bg-emerald-500/60 dark:bg-emerald-700/80 rounded-sm" />
                  <span className="w-2.5 h-2.5 bg-emerald-500 dark:bg-emerald-500 rounded-sm" />
                </div>
                <span>More</span>
              </div>
            </div>

          </div>

          {/* Right panel: Active/Public repos list */}
          <div className="lg:col-span-8 space-y-4">
            <h4 className="text-xs text-slate-400 dark:text-dark-500 font-mono font-bold uppercase tracking-wider mb-2">
              Selected Repositories
            </h4>

            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="p-5 rounded-xl border border-slate-200 bg-white dark:border-dark-800 dark:bg-dark-900/30 animate-pulse h-28" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {displayRepos.map((repo) => (
                  <a
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-5 rounded-xl border border-slate-200 bg-white hover:border-primary/45 hover:bg-slate-50/50 dark:border-dark-800 dark:bg-dark-900/40 dark:hover:border-primary/40 dark:hover:bg-dark-900/85 hover:shadow-md transition-all duration-300 flex flex-col justify-between group h-32"
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <BookOpen size={14} className="text-primary group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
                        <h4 className="text-sm font-bold font-display text-slate-900 dark:text-white group-hover:text-primary transition-colors truncate max-w-[200px]">
                          {repo.name}
                        </h4>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-dark-400 mt-2 line-clamp-2 leading-relaxed">
                        {repo.description}
                      </p>
                    </div>

                    <div className="flex justify-between items-center pt-3 border-t border-slate-100 dark:border-dark-800/50 mt-3 text-[10px] font-mono text-slate-500 dark:text-dark-500 font-bold">
                      <span className="text-slate-700 dark:text-dark-300">{repo.language}</span>
                      <div className="flex gap-3">
                        <span className="flex items-center gap-0.5">
                          <Star size={10} />
                          {repo.stargazers_count}
                        </span>
                        <span className="flex items-center gap-0.5">
                          <GitFork size={10} />
                          {repo.forks_count}
                        </span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
