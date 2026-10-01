import React from 'react';
import { motion } from 'framer-motion';
import { Logo } from './Logo';
import { AnalyticsPreview } from './AnalyticsPreview';
import { Sparkles, Activity } from 'lucide-react';

export const BrandVisual: React.FC = () => {
  return (
    <div className="relative w-full h-full flex flex-col justify-between p-8 lg:p-12 xl:p-16 bg-[#080A0E] text-white overflow-hidden border-r border-white/[0.06]">
      {/* 1. Subtle Background Architectural Layers */}
      
      {/* Faint technical grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      {/* Radial fade to keep edges deep and centered glow minimal */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(6,182,212,0.08),transparent_50%)] pointer-events-none" />

      {/* Abstract technical lines and telemetry points */}
      <svg
        className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366F1" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Faint geometric telemetry lines */}
        <line x1="10%" y1="20%" x2="45%" y2="35%" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="3 6" />
        <line x1="45%" y1="35%" x2="85%" y2="25%" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="4 8" />
        <line x1="85%" y1="25%" x2="90%" y2="60%" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="2 4" />
        <line x1="30%" y1="65%" x2="70%" y2="75%" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="3 5" />

        {/* Tiny connected nodes */}
        <circle cx="10%" cy="20%" r="2" fill="#818CF8" />
        <circle cx="45%" cy="35%" r="2.5" fill="#38BDF8" />
        <circle cx="85%" cy="25%" r="2" fill="#06B6D4" />
        <circle cx="30%" cy="65%" r="1.5" fill="#818CF8" />
      </svg>

      {/* Subtle faint code watermark in the background */}
      <div
        className="absolute top-28 right-8 font-mono text-[11px] text-slate-700/35 select-none pointer-events-none leading-relaxed hidden xl:block"
        aria-hidden="true"
      >
        <pre>{`type PlatformSync = 'github' | 'leetcode' | 'codeforces';
interface DeveloperProfile {
  handle: string;
  verifiedStreak: number;
  totalSolved: number;
  metrics: Record<PlatformSync, number>;
}`}</pre>
      </div>

      {/* 2. Top Header: Logo */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10"
      >
        <Logo size="md" variant="light" showTagline />
      </motion.div>

      {/* 3. Middle Content: Headline, Value Proposition & Analytics Cards */}
      <div className="relative z-10 my-auto py-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
          className="max-w-xl"
        >
          {/* Subtle pill tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium mb-5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span className="tracking-wide">Unified Developer Profile</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.12] mb-4">
            Your coding journey.{' '}
            <span className="block mt-1 bg-gradient-to-r from-slate-100 via-indigo-200 to-cyan-300 bg-clip-text text-transparent">
              One clear picture.
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-lg mb-8 font-normal">
            Connect your coding platforms, track your progress, and build a developer profile that shows what you’ve actually built.
          </p>
        </motion.div>

        {/* Floating Developer Activity & Connected Platforms Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-2"
        >
          <AnalyticsPreview />
        </motion.div>
      </div>

      {/* 4. Bottom Footer: Live System Status / Subtle Trust Metric */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.45 }}
        className="relative z-10 pt-4 flex items-center justify-between text-xs text-slate-500 border-t border-white/[0.05]"
      >
        <div className="flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-mono text-[11px] text-slate-400">
            Real-time webhook sync enabled
          </span>
        </div>
        <div className="flex items-center gap-4 text-[11px] font-mono text-slate-500">
          <span>v1.2.0-prod</span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Operational
          </span>
        </div>
      </motion.div>
    </div>
  );
};
