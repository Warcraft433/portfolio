import React from 'react';
import { motion } from 'framer-motion';

export const ArchitectureViz: React.FC = () => {
  const nodes = [
    { id: 'fe', x: 200, y: 30, label: 'Frontend', sub: 'React / TS', color: '#D6B77A' },
    { id: 'api', x: 200, y: 110, label: 'REST API', sub: 'JSON / JWT', color: '#DECBA1' },
    { id: 'sb', x: 200, y: 190, label: 'Spring Boot', sub: 'Java Engine', color: '#D6B77A' },
    { id: 'db', x: 200, y: 270, label: 'Database', sub: 'MySQL / JDBC', color: '#777783' },
    // Secondary Nodes
    { id: 'ai', x: 60, y: 110, label: 'AI Inference', sub: 'YOLOv8 / Python', color: '#D6B77A', side: 'left' },
    { id: 'emb', x: 60, y: 190, label: 'Embedded C', sub: 'Hardware/Sensors', color: '#777783', side: 'left' },
    { id: 'git', x: 340, y: 30, label: 'Git / CI', sub: 'GitHub Actions', color: '#777783', side: 'right' },
    { id: 'cloud', x: 340, y: 270, label: 'Vercel / Cloud', sub: 'Deployment', color: '#D6B77A', side: 'right' }
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
    <div className="relative w-full max-w-[420px] mx-auto p-4 sm:p-5 rounded-2xl border border-[#D0C8BC] bg-[#FAF8F5]/90 dark:border-[#303038] dark:bg-[#19191F]/90 backdrop-blur-md shadow-lg dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden group">
      {/* Background radial glow */}
      <div className="absolute -inset-10 bg-radial-gradient from-[#D6B77A]/10 via-transparent to-transparent opacity-40 pointer-events-none group-hover:opacity-70 transition-opacity duration-700" />
      
      <div className="text-[10px] sm:text-[11px] text-[#5A5A66] dark:text-[#777783] font-mono font-semibold mb-3 sm:mb-4 border-b border-[#D0C8BC] dark:border-[#303038] pb-2 flex justify-between items-center">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D6B77A]" />
          CORE ARCHITECTURE ENGINE
        </span>
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D6B77A] opacity-60"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D6B77A]"></span>
        </span>
      </div>

      <svg viewBox="0 0 400 310" className="w-full h-auto max-h-[280px] sm:max-h-[310px] overflow-visible select-none">
        <defs>
          <filter id="gold-flow-filter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <linearGradient id="gold-line-light" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#19191F" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#D6B77A" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#777783" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="gold-line-dark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#777783" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#D6B77A" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#777783" stopOpacity="0.4" />
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
                className="stroke-[#D0C8BC] dark:stroke-[#303038]"
                strokeWidth="1.8"
              />
              {/* Animated stream (Light mode) */}
              <motion.line
                x1={fromCoords.x}
                y1={fromCoords.y}
                x2={toCoords.x}
                y2={toCoords.y}
                stroke="url(#gold-line-light)"
                className="dark:hidden"
                strokeWidth="1.4"
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
              {/* Animated stream (Dark mode: Champagne Gold) */}
              <motion.line
                x1={fromCoords.x}
                y1={fromCoords.y}
                x2={toCoords.x}
                y2={toCoords.y}
                stroke="url(#gold-line-dark)"
                className="hidden dark:block"
                strokeWidth="1.4"
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
              {/* Flow particle in Champagne Gold */}
              <motion.circle
                r="2.5"
                className="fill-[#D6B77A]"
                filter="url(#gold-flow-filter)"
                animate={{
                  cx: [fromCoords.x, toCoords.x],
                  cy: [fromCoords.y, toCoords.y]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2.6 + Math.random() * 1.5,
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
                  r="22"
                  fill="transparent"
                  stroke={nodeColor}
                  strokeWidth="1"
                  strokeOpacity="0.18"
                />
              )}

              {/* Node background pill */}
              <rect
                x={node.x - 55}
                y={node.y - 18}
                width="110"
                height="36"
                rx="6"
                className="fill-[#FFFFFF] dark:fill-[#101014]"
                stroke={nodeColor}
                strokeWidth="1.2"
                strokeOpacity={isMain ? 0.75 : 0.35}
              />

              {/* Node label */}
              <text
                x={node.x}
                y={node.y - 3}
                textAnchor="middle"
                className="fill-[#19191F] dark:fill-[#F7F5F0]"
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
                className="fill-[#777783]"
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
