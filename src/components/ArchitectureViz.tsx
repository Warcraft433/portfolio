import React from 'react';
import { motion } from 'framer-motion';

export const ArchitectureViz: React.FC = () => {
  const nodes = [
    { id: 'fe', x: 200, y: 30, label: 'Frontend', sub: 'React / TS', color: '#ff1744' },
    { id: 'api', x: 200, y: 110, label: 'REST API', sub: 'JSON / JWT', color: '#00e5ff' },
    { id: 'sb', x: 200, y: 190, label: 'Spring Boot', sub: 'Java Engine', color: '#ff1744' },
    { id: 'db', x: 200, y: 270, label: 'Database', sub: 'MySQL / JDBC', color: '#9da1b5' },
    // Secondary Nodes
    { id: 'ai', x: 60, y: 110, label: 'AI Inference', sub: 'YOLOv8 / Python', color: '#00e5ff', side: 'left' },
    { id: 'emb', x: 60, y: 190, label: 'Embedded C', sub: 'Hardware/Sensors', color: '#71758c', side: 'left' },
    { id: 'git', x: 340, y: 30, label: 'Git / CI', sub: 'GitHub Actions', color: '#71758c', side: 'right' },
    { id: 'cloud', x: 340, y: 270, label: 'Vercel / Cloud', sub: 'Deployment', color: '#00e5ff', side: 'right' }
  ];

  const connections = [
    { from: 'fe', to: 'api' },
    { from: 'api', to: 'sb' },
    { from: 'sb', to: 'db' },
    { from: 'git', to: 'fe' },
    { from: 'ai', to: 'api' },
    { from: 'emb', to: 'sb' },
    { from: 'sb', to: 'cloud' }
  ];

  const getNodeCoords = (id: string) => {
    const node = nodes.find(n => n.id === id);
    return node ? { x: node.x, y: node.y } : { x: 0, y: 0 };
  };

  return (
    <div className="relative w-full max-w-[420px] mx-auto p-4 sm:p-5 rounded-2xl border border-[#dbe0eb] bg-white/90 dark:border-[#252733] dark:bg-[#12131a]/90 backdrop-blur-md shadow-lg dark:shadow-[0_8px_32px_rgba(0,0,0,0.7)] overflow-hidden group">
      {/* Background radial glow — subtle Neon Red & Neon Blue */}
      <div className="absolute -inset-10 bg-radial-gradient from-[#ff1744]/12 via-[#00e5ff]/08 to-transparent opacity-50 pointer-events-none group-hover:opacity-80 transition-opacity duration-700" />
      
      <div className="text-[10px] sm:text-[11px] text-[#4c536a] dark:text-[#9da1b5] font-mono font-semibold mb-3 sm:mb-4 border-b border-[#dbe0eb] dark:border-[#252733] pb-2 flex justify-between items-center">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff1744]" />
          CORE ARCHITECTURE ENGINE
        </span>
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00e5ff] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00e5ff]"></span>
        </span>
      </div>

      <svg viewBox="0 0 400 310" className="w-full h-auto max-h-[280px] sm:max-h-[310px] overflow-visible select-none">
        <defs>
          <filter id="neon-stream-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <linearGradient id="neon-stream-dark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff1744" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#71758c" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#00e5ff" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="neon-stream-light" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff1744" stopOpacity="0.7" />
            <stop offset="50%" stopColor="#4c536a" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#00b4d8" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {/* Draw connection lines */}
        {connections.map((conn, idx) => {
          const fromCoords = getNodeCoords(conn.from);
          const toCoords = getNodeCoords(conn.to);
          return (
            <g key={idx}>
              {/* Static path */}
              <line
                x1={fromCoords.x}
                y1={fromCoords.y}
                x2={toCoords.x}
                y2={toCoords.y}
                className="stroke-[#dbe0eb] dark:stroke-[#252733]"
                strokeWidth="1.8"
              />
              {/* Animated stream (Light mode) */}
              <motion.line
                x1={fromCoords.x}
                y1={fromCoords.y}
                x2={toCoords.x}
                y2={toCoords.y}
                stroke="url(#neon-stream-light)"
                className="dark:hidden"
                strokeWidth="1.6"
                strokeDasharray="6 12"
                animate={{
                  strokeDashoffset: [-36, 0]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: 'linear'
                }}
              />
              {/* Animated stream (Dark mode: Neon Red to Neon Blue) */}
              <motion.line
                x1={fromCoords.x}
                y1={fromCoords.y}
                x2={toCoords.x}
                y2={toCoords.y}
                stroke="url(#neon-stream-dark)"
                className="hidden dark:block"
                strokeWidth="1.6"
                strokeDasharray="6 12"
                animate={{
                  strokeDashoffset: [-36, 0]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: 'linear'
                }}
              />
              {/* Flow particle (alternating Red / Blue) */}
              <motion.circle
                r="2.8"
                className={idx % 2 === 0 ? "fill-[#ff1744]" : "fill-[#00e5ff]"}
                filter="url(#neon-stream-glow)"
                animate={{
                  cx: [fromCoords.x, toCoords.x],
                  cy: [fromCoords.y, toCoords.y]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2.5 + Math.random() * 1.5,
                  ease: 'easeInOut'
                }}
              />
            </g>
          );
        })}

        {/* Draw nodes */}
        {nodes.map((node) => {
          const isMain = ['fe', 'api', 'sb', 'db'].includes(node.id);
          const nodeColor = node.color;
          return (
            <g key={node.id} className="cursor-default">
              {isMain && (
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="23"
                  fill="transparent"
                  stroke={nodeColor}
                  strokeWidth="1"
                  strokeOpacity="0.22"
                />
              )}

              {/* Node background pill */}
              <rect
                x={node.x - 55}
                y={node.y - 18}
                width="110"
                height="36"
                rx="6"
                className="fill-white dark:fill-[#08080b]"
                stroke={nodeColor}
                strokeWidth="1.2"
                strokeOpacity={isMain ? 0.8 : 0.4}
              />

              {/* Node label */}
              <text
                x={node.x}
                y={node.y - 3}
                textAnchor="middle"
                className="fill-[#12141c] dark:fill-[#f4f5f8]"
                fontSize="9.5"
                fontWeight="700"
                fontFamily="Outfit"
              >
                {node.label}
              </text>

              {/* Node subtitle */}
              <text
                x={node.x}
                y={node.y + 9}
                textAnchor="middle"
                className="fill-[#71758c]"
                fontSize="7.5"
                fontFamily="JetBrains Mono"
              >
                {node.sub}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
