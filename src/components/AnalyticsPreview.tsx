import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Code2,
  GitCommit,
  FolderGit2,
  CheckCircle2,
  Flame,
  Layers,
} from 'lucide-react';

export const AnalyticsPreview: React.FC = () => {
  const [hoveredBarIndex, setHoveredBarIndex] = useState<number | null>(null);

  // 14 days activity data matching the prompt vibe: █▂▃▅▆▅▇▆▇▇▆▇▇
  const activityData = [
    { day: 'Mon', count: 9, height: '70%' },
    { day: 'Tue', count: 2, height: '22%' },
    { day: 'Wed', count: 4, height: '38%' },
    { day: 'Thu', count: 6, height: '55%' },
    { day: 'Fri', count: 7, height: '68%' },
    { day: 'Sat', count: 5, height: '48%' },
    { day: 'Sun', count: 10, height: '90%' },
    { day: 'Mon', count: 8, height: '76%' },
    { day: 'Tue', count: 9, height: '88%' },
    { day: 'Wed', count: 10, height: '95%' },
    { day: 'Thu', count: 7, height: '72%' },
    { day: 'Fri', count: 10, height: '94%' },
    { day: 'Sat', count: 8, height: '82%' },
    { day: 'Sun', count: 9, height: '86%' },
  ];

  const platforms = [
    {
      name: 'GitHub',
      color: 'bg-white/10 text-white',
      dotColor: 'bg-emerald-400',
      metric: '642 commits',
    },
    {
      name: 'LeetCode',
      color: 'bg-amber-500/15 text-amber-300 border-amber-500/20',
      dotColor: 'bg-amber-400',
      metric: '210 solved',
    },
    {
      name: 'Codeforces',
      color: 'bg-blue-500/15 text-blue-300 border-blue-500/20',
      dotColor: 'bg-blue-400',
      metric: 'Expert 1642',
    },
    {
      name: 'CodeChef',
      color: 'bg-rose-500/15 text-rose-300 border-rose-500/20',
      dotColor: 'bg-rose-400',
      metric: '4-Star 1820',
    },
  ];

  return (
    <div className="relative w-full max-w-lg mx-auto select-none">
      {/* Decorative ambient background blur behind the cards */}
      <div className="absolute -top-10 -left-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Primary Floating Analytics Card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ y: -4 }}
        className="glass-panel glass-panel-glow relative rounded-2xl p-5 md:p-6 text-slate-100 z-10 transition-shadow duration-300"
      >
        {/* Card Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[11px] font-mono tracking-widest text-slate-400 uppercase font-semibold">
              Developer Activity
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
            <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />
            <span className="font-semibold">23 day streak</span>
            <span className="inline-flex items-center text-[10px] text-emerald-300 font-mono">
              <TrendingUp className="w-3 h-3 ml-0.5 inline" /> 18%
            </span>
          </div>
        </div>

        {/* Activity Heatmap Bar Chart (█▂▃▅▆▅▇▆▇▇▆▇▇) */}
        <div className="mt-5">
          <div className="flex items-baseline justify-between text-xs text-slate-400 mb-2">
            <span className="font-mono text-[11px] text-slate-400">Past 14 Days Activity</span>
            <span className="text-[11px] font-medium text-cyan-400">
              {hoveredBarIndex !== null
                ? `${activityData[hoveredBarIndex].count * 3} platform actions`
                : '142 total actions this week'}
            </span>
          </div>

          {/* Dynamic Interactive Activity Bars */}
          <div className="h-16 flex items-end gap-1.5 p-2 bg-slate-950/50 rounded-xl border border-white/[0.04]">
            {activityData.map((item, idx) => {
              const isHovered = hoveredBarIndex === idx;
              return (
                <div
                  key={idx}
                  className="flex-1 flex flex-col items-center justify-end h-full relative group cursor-pointer"
                  onMouseEnter={() => setHoveredBarIndex(idx)}
                  onMouseLeave={() => setHoveredBarIndex(null)}
                >
                  {/* Tooltip on hover */}
                  {isHovered && (
                    <div className="absolute -top-7 px-1.5 py-0.5 rounded bg-slate-800 border border-white/10 text-[10px] text-cyan-300 font-mono whitespace-nowrap shadow-lg z-20 pointer-events-none">
                      {item.count} items
                    </div>
                  )}

                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: item.height }}
                    transition={{ duration: 0.5, delay: 0.2 + idx * 0.03, ease: 'easeOut' }}
                    className={`w-full rounded-sm transition-all duration-200 ${
                      isHovered
                        ? 'bg-gradient-to-t from-cyan-400 to-indigo-400 shadow-sm shadow-cyan-400/50'
                        : idx > 6
                        ? 'bg-gradient-to-t from-indigo-500/70 to-cyan-400/90'
                        : 'bg-gradient-to-t from-slate-700/80 to-indigo-400/60'
                    }`}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* 3 Metric Pills: 387 Problems, 642 Contributions, 8 Projects */}
        <div className="grid grid-cols-3 gap-3 mt-5 pt-4 border-t border-white/[0.08]">
          <div className="p-2.5 rounded-xl bg-slate-900/60 border border-white/[0.05] hover:border-cyan-500/30 transition-colors">
            <div className="flex items-center gap-1.5 text-slate-400 text-[11px] mb-1">
              <Code2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Problems</span>
            </div>
            <div className="text-lg font-bold tracking-tight text-white font-mono">
              387
            </div>
            <div className="text-[10px] text-slate-500 font-medium">LeetCode & CF</div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900/60 border border-white/[0.05] hover:border-indigo-500/30 transition-colors">
            <div className="flex items-center gap-1.5 text-slate-400 text-[11px] mb-1">
              <GitCommit className="w-3.5 h-3.5 text-indigo-400" />
              <span>Contributions</span>
            </div>
            <div className="text-lg font-bold tracking-tight text-white font-mono">
              642
            </div>
            <div className="text-[10px] text-slate-500 font-medium">GitHub sync</div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900/60 border border-white/[0.05] hover:border-emerald-500/30 transition-colors">
            <div className="flex items-center gap-1.5 text-slate-400 text-[11px] mb-1">
              <FolderGit2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Projects</span>
            </div>
            <div className="text-lg font-bold tracking-tight text-white font-mono">
              8
            </div>
            <div className="text-[10px] text-slate-500 font-medium">Showcased</div>
          </div>
        </div>
      </motion.div>

      {/* Secondary Floating Card: "6 platforms connected" */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ y: -3 }}
        className="glass-panel glass-panel-glow relative -mt-3 md:-mt-4 ml-auto mr-2 md:mr-4 max-w-[340px] rounded-xl p-3.5 text-slate-100 z-20 border border-cyan-500/20 shadow-xl"
      >
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-indigo-500/20 flex items-center justify-center text-indigo-300">
              <Layers className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-semibold text-slate-200">
              6 platforms connected
            </span>
          </div>
          <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono">
            <CheckCircle2 className="w-3 h-3" /> Live Sync
          </span>
        </div>

        {/* Platforms Badges list: GitHub • LeetCode • CodeChef • Codeforces */}
        <div className="flex flex-wrap gap-1.5">
          {platforms.map((plat) => (
            <div
              key={plat.name}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium border border-white/5 bg-slate-900/80 hover:bg-slate-800/90 transition-colors`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${plat.dotColor}`} />
              <span className="text-slate-300">{plat.name}</span>
            </div>
          ))}
          <div className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono text-slate-400 bg-white/5">
            +2 more
          </div>
        </div>
      </motion.div>
    </div>
  );
};
