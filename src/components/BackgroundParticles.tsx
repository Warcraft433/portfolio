import React, { useEffect, useRef } from 'react';

export const BackgroundParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    let animationFrameId: number;
    let particles: Particle[] = [];
    const mouse = { x: 0, y: 0, radius: 120 };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseAlpha: number;
      alpha: number;
      isGold: boolean;

      constructor(w: number, h: number) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 0.15; // Slow movement
        this.vy = (Math.random() - 0.5) * 0.15;
        this.radius = Math.random() * 1.5 + 0.6; // Small, refined particle
        this.baseAlpha = Math.random() * 0.15 + 0.06;
        this.alpha = this.baseAlpha;
        this.isGold = Math.random() > 0.45;
      }

      update(w: number, h: number) {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce on boundaries
        if (this.x < 0 || this.x > w) this.vx *= -1;
        if (this.y < 0 || this.y > h) this.vy *= -1;

        // Mouse hover interaction: push slightly or highlight alpha
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          // Increase opacity and repel slightly
          const force = (mouse.radius - dist) / mouse.radius;
          this.alpha = Math.min(0.55, this.baseAlpha + force * 0.35);
          
          // Repel force
          this.x -= (dx / dist) * force * 0.4;
          this.y -= (dy / dist) * force * 0.4;
        } else {
          // Fade back to normal
          if (this.alpha > this.baseAlpha) {
            this.alpha -= 0.005;
          }
        }
      }

      draw(c: CanvasRenderingContext2D, isDark: boolean) {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        if (isDark) {
          // Dark mode: Champagne Gold and Graphite Grey on Obsidian Black
          c.fillStyle = this.isGold
            ? `rgba(214, 183, 122, ${Math.min(0.65, this.alpha * 1.6)})` // Champagne Gold
            : `rgba(119, 119, 131, ${Math.min(0.5, this.alpha * 1.3)})`; // Graphite Grey
        } else {
          // Light mode: Champagne Gold and Graphite Grey on Warm Ivory Canvas
          c.fillStyle = this.isGold
            ? `rgba(195, 161, 95, ${Math.min(0.6, this.alpha * 1.5)})` // Warm Gold
            : `rgba(96, 96, 107, ${Math.min(0.45, this.alpha * 1.2)})`; // Graphite Grey
        }
        c.fill();
      }
    }

    const init = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;

      // Lighter for mobile, standard for desktop
      const count = w < 768 ? 35 : 90;
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push(new Particle(w, h));
      }
    };

    const handleResize = () => {
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    init();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const w = canvas.width;
      const h = canvas.height;
      const isDark = document.documentElement.classList.contains('dark');

      // Draw particle connections first
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            const alpha = (100 - dist) / 100 * 0.04 * (p1.alpha + p2.alpha);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = isDark
              ? `rgba(214, 183, 122, ${alpha * 1.2})`
              : `rgba(96, 96, 107, ${alpha * 0.9})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw and update particles
      particles.forEach((p) => {
        p.update(w, h);
        p.draw(ctx, isDark);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 bg-transparent"
    />
  );
};
