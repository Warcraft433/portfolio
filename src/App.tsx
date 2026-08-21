import { useState, useEffect } from 'react';
import { BackgroundParticles } from './components/BackgroundParticles';
import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Projects } from './sections/Projects';
import { Experience } from './sections/Experience';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';
import { ProjectModal } from './components/ProjectModal';
import { ResumeModal } from './components/ResumeModal';
import type { Project } from './data/portfolio';
import resumePdf from './assets/Adarsh_A.pdf';
import { Analytics } from '@vercel/analytics/react';

function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  const resumeUrl = resumePdf || '/resume/ADARSH_A_RESUME.pdf';

  // Proactive SEO metadata and theme setting
  useEffect(() => {
    // Initial theme validation
    const theme = localStorage.getItem('theme');
    if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    document.title = "ADARSH A — Java Backend Developer | Full Stack Java Engineer";
    
    // Set or update Meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute(
      'content',
      'Portfolio of ADARSH A — Java Backend & Full Stack Developer trained at QSpiders, specializing in Core Java, OOP, SQL, JDBC, Spring Boot, REST APIs, and software engineering.'
    );

    // Set og:title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', 'ADARSH A — Java Full Stack Developer');
  }, []);

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    setIsProjectModalOpen(true);
  };

  const handleOpenResume = () => {
    setIsResumeModalOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-800 dark:bg-dark-950 dark:text-dark-200 selection:bg-primary/20 overflow-x-hidden font-sans transition-colors duration-300">
      {/* Background Interactive Particles Canvas */}
      <BackgroundParticles />

      {/* Floating Active-Sticky Navbar */}
      <Navbar onOpenResume={handleOpenResume} />

      {/* Main Content Layout Sections */}
      <main className="relative z-10">
        {/* 1. Hero Section */}
        <Hero onOpenResume={handleOpenResume} />

        {/* 2. About Section (Includes Currently Learning & Trajectory) */}
        <About />

        {/* 3. Skills Tech Stack Section */}
        <Skills />

        {/* 4. Projects Cards Showcase (Includes Embedded GitHub Telemetry) */}
        <Projects onSelectProject={handleSelectProject} />

        {/* 5. Education & QSpiders Training Timeline */}
        <Experience />

        {/* 6. Contact Recruiter Hub */}
        <Contact onOpenResume={handleOpenResume} />
      </main>

      {/* Footer Branding block */}
      <Footer />

      {/* Case Study Detailed Modal Overlay */}
      <ProjectModal
        project={selectedProject}
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
      />

      {/* Inline PDF Resume Modal */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
        pdfUrl={resumeUrl}
      />

      {/* Vercel Analytics */}
      <Analytics />
    </div>
  );
}

export default App;
