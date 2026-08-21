import React from 'react';
import { motion } from 'framer-motion';

export const ArchitectureViz: React.FC = () => {
  const nodes = [
    { id: 'fe', x: 200, y: 30, label: 'Frontend', sub: 'React / TS', color: '#0070f3' },
    { id: 'api', x: 200, y: 110, label: 'REST API', sub: 'JSON / JWT', color: '#6b7280' },
    { id: 'sb', x: 200, y: 190, label: 'Spring Boot', sub: 'Java Engine', color: '#6db33f' },
    { id: 'db', x: 200, y: 270, label: 'Database', sub: 'PostgreSQL', color: '#336791' },
    // Secondary Nodes
    { id: 'ai', x: 60, y: 110, label: 'AI Inference', sub: 'YOLOv8 / Python', color: '#f89820', side: 'left' },
    { id: 'emb', x: 60, y: 190, label: 'Embedded C', sub: 'Hardware/Sensors', color: '#10b981', side: 'left' },
    { id: 'git', x: 340, y: 30, label: 'Git / CI', sub: 'GitHub Actions', color: '#000000', side: 'right' },
    { id: 'cloud', x: 340, y: 270, label: 'Vercel / Cloud', sub: 'Deployment', color: '#a855f7', side: 'right' }
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
    <div className="relative w-full max-w-[420px] mx-auto p-4 sm:p-5 rounded-2xl border border-slate-200 bg-white/90 dark:border-dark-800 dark:bg-dark-900/80 backdrop-blur-md shadow-lg dark:shadow-2xl overflow-hidden group">
      {/* Background radial glow */}
      <div className="absolute -inset-10 bg-radial-gradient from-primary/5 via-transparent to-transparent opacity-50 pointer-events-none group-hover:opacity-75 transition-opacity duration-700" />
      
      <div className="text-[10px] sm:text-[11px] text-slate-600 dark:text-dark-400 font-mono font-semibold mb-3 sm:mb-4 border-b border-slate-150 dark:border-dark-800 pb-2 flex justify-between items-center">
        <span>CORE ARCHITECTURE ENGINE</span>
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
      </div>

      <svg viewBox="0 0 400 310" className="w-full h-auto max-h-[280px] sm:max-h-[310px] overflow-visible select-none">
        <defs>
          <filter id="glow-filter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Draw connection lines */}
        {connections.map((conn, idx) => {
          const fromCoords = getNodeCoords(conn.from);
          const toCoords = getNodeCoords(conn.to);
          return (
            <g key={idx}>
              {/* Core static path */}
              <line
                x1={fromCoords.x}
                y1={fromCoords.y}
                x2={toCoords.x}
                y2={toCoords.y}
                className="stroke-slate-200 dark:stroke-dark-800"
                strokeWidth="2"
              />
              {/* Glowing animated line */}
              <motion.line
                x1={fromCoords.x}
                y1={fromCoords.y}
                x2={toCoords.x}
                y2={toCoords.y}
                stroke="url(#line-grad)"
                strokeWidth="1.5"
                strokeDasharray="8 12"
                animate={{
                  strokeDashoffset: [-40, 0]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: 'linear'
                }}
              />
              {/* Flow particle */}
              <motion.circle
                r="3"
                className="fill-slate-700 dark:fill-white"
                filter="url(#glow-filter)"
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

        <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0070f3" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#6db33f" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#f89820" stopOpacity="0.3" />
        </linearGradient>

        {/* Draw nodes */}
        {nodes.map((node) => {
          const isMain = ['fe', 'api', 'sb', 'db'].includes(node.id);
          const nodeColor = node.id === 'git' ? '#4b5563' : node.color; // adjust git badge color for light mode readability
          return (
            <g key={node.id} className="cursor-default">
              {isMain && (
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="24"
                  fill="transparent"
                  stroke={nodeColor}
                  strokeWidth="1"
                  strokeOpacity="0.15"
                  className="animate-pulse"
                />
              )}

              {/* Node background pill */}
              <rect
                x={node.x - 55}
                y={node.y - 18}
                width="110"
                height="36"
                rx="6"
                className="fill-white dark:fill-dark-900"
                stroke={nodeColor}
                strokeWidth="1.2"
                strokeOpacity={isMain ? 0.7 : 0.4}
              />

              {/* Node label */}
              <text
                x={node.x}
                y={node.y - 3}
                textAnchor="middle"
                className="fill-slate-900 dark:fill-white"
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
                className="fill-slate-500 dark:fill-dark-400"
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
