import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BrandVisual } from '../components/BrandVisual';
import { LoginForm } from '../components/LoginForm';
import { Logo } from '../components/Logo';
import { ArrowLeft, CheckCircle2, ExternalLink } from 'lucide-react';

export const Login: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>(window.location.pathname || '/login');
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

  // Synchronize with history popstate if user navigates back/forward
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleLoginSuccess = (email: string) => {
    setLoggedInUser(email);
    const newPath = '/app/dashboard';
    window.history.pushState({}, '', newPath);
    setCurrentPath(newPath);
  };

  const handleReturnToLogin = () => {
    setLoggedInUser(null);
    window.history.pushState({}, '', '/');
    setCurrentPath('/login');
  };

  // If redirected to /app/dashboard, show a clean simulated dashboard redirect confirmation
  if (currentPath === '/app/dashboard' || loggedInUser) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center p-6 bg-[#090C10] text-slate-100">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md p-8 rounded-2xl glass-panel glass-panel-glow border border-white/10 text-center relative overflow-hidden"
        >
          {/* Subtle background glow */}
          <div className="absolute -top-16 -right-16 w-36 h-36 bg-cyan-500/20 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />

          <div className="w-12 h-12 mx-auto rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-5">
            <CheckCircle2 className="w-6 h-6" />
          </div>

          <h2 className="text-2xl font-bold text-white mb-2">
            Authentication Successful
          </h2>

          <p className="text-sm text-slate-400 mb-6">
            Navigated to <span className="font-mono text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/30">/app/dashboard</span>
          </p>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-white/5 text-left mb-6">
            <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-1">
              Active Session
            </div>
            <div className="text-sm font-medium text-slate-200 truncate">
              {loggedInUser || 'developer@codepulse.io'}
            </div>
            <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/5 text-xs text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Ready for dashboard initialization</span>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleReturnToLogin}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-all shadow-lg shadow-indigo-600/20"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to CodePulse Login</span>
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <main className="min-h-screen w-full flex flex-col lg:flex-row bg-[#080A0E]">
      {/* ============================================================ */}
      {/* LEFT BRAND SECTION (50–55% on Desktop)                       */}
      {/* ============================================================ */}
      <section
        aria-label="CodePulse Brand Overview"
        className="w-full lg:w-[52%] xl:w-[55%] hidden lg:flex flex-col relative"
      >
        <BrandVisual />
      </section>

      {/* ============================================================ */}
      {/* MOBILE COMPACT BRAND HEADER (Visible ONLY on Mobile & Tablet)*/}
      {/* ============================================================ */}
      <div className="lg:hidden w-full bg-[#080A0E] px-6 pt-8 pb-6 border-b border-white/[0.08] relative overflow-hidden">
        {/* Subtle background grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

        <div className="relative z-10 max-w-md mx-auto">
          {/* Compact Logo */}
          <Logo size="md" variant="light" showTagline />

          {/* Compact brand headline */}
          <div className="mt-4">
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Your coding journey.{' '}
              <span className="bg-gradient-to-r from-indigo-300 to-cyan-300 bg-clip-text text-transparent">
                One clear picture.
              </span>
            </h1>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-400 leading-relaxed">
              Connect GitHub, LeetCode, CodeChef, and Codeforces in one unified profile.
            </p>
          </div>

          {/* Compact Platform Pill badges */}
          <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-white/[0.06]">
            {['GitHub', 'LeetCode', 'Codeforces', 'CodeChef'].map((plat) => (
              <span
                key={plat}
                className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-white/10 text-slate-300"
              >
                {plat}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* RIGHT LOGIN SECTION (45–50% on Desktop)                      */}
      {/* Clean light / slightly off-white background                  */}
      {/* ============================================================ */}
      <section
        aria-label="User Authentication"
        className="w-full lg:w-[48%] xl:w-[45%] flex flex-col justify-center items-center px-6 sm:px-10 py-10 lg:py-16 bg-[#FAFBFD] relative min-h-[500px]"
      >
        {/* Subtle ambient gradient in light area */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-50/50 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-50/40 rounded-full blur-3xl pointer-events-none" />

        {/* Desktop subtle top right navigation / status */}
        <div className="hidden lg:flex absolute top-8 right-8 items-center gap-2 text-xs text-slate-500">
          <span>Need help?</span>
          <a
            href="mailto:support@codepulse.io"
            className="text-indigo-600 hover:text-indigo-700 font-medium inline-flex items-center gap-0.5"
          >
            Contact support
            <ExternalLink className="w-3 h-3 ml-0.5 inline" />
          </a>
        </div>

        {/* Animated Login Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          className="w-full relative z-10 flex flex-col justify-center"
        >
          <LoginForm
            onSuccess={handleLoginSuccess}
          />
        </motion.div>
      </section>
    </main>
  );
};
