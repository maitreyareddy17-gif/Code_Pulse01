import React, { useState } from 'react';
import { Mail, ArrowRight, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { PasswordInput } from './PasswordInput';
import { SocialLoginButton } from './SocialLoginButton';

interface LoginFormProps {
  onSuccess: (email: string) => void;
  onNavigateToSignup?: () => void;
  onForgotPassword?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSuccess,
  onNavigateToSignup,
  onForgotPassword,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const validateEmail = (val: string): boolean => {
    const trimmed = val.trim();
    if (!trimmed) {
      setEmailError('Email is required');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = (val: string): boolean => {
    if (!val) {
      setPasswordError('Password is required');
      return false;
    }
    if (val.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError('');

    const isEmailValid = validateEmail(email);
    const isPassValid = validatePassword(password);

    if (!isEmailValid || !isPassValid) {
      setGeneralError('Please enter a valid email and password.');
      return;
    }

    setIsLoading(true);

    // Mock authentication with realistic delay
    setTimeout(() => {
      setIsLoading(false);
      onSuccess(email);
    }, 1200);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onSuccess('alex.developer@gmail.com');
    }, 1000);
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="w-full max-w-[420px] mx-auto text-left relative">
      {/* Toast Notification Container */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 animate-in fade-in slide-in-from-top-3 duration-300">
          <div className="flex items-center gap-2.5 px-4 py-3 bg-slate-900 text-white rounded-xl shadow-2xl border border-white/10 text-xs font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
          Welcome back
        </h2>
        <p className="mt-2 text-sm text-slate-500 font-normal">
          Continue building your developer journey.
        </p>
      </div>

      {/* General Form Error Alert */}
      {generalError && (
        <div
          role="alert"
          className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200/80 text-rose-700 text-xs font-medium flex items-center gap-2.5 animate-in fade-in duration-200"
        >
          <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-500" />
          <span>{generalError}</span>
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Email Field */}
        <div>
          <label
            htmlFor="email-input"
            className="block text-xs font-semibold text-slate-700 tracking-wide uppercase font-mono mb-1.5"
          >
            Email address
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
              <Mail className="w-4 h-4" />
            </div>
            <input
              id="email-input"
              type="email"
              value={email}
              autoComplete="email"
              placeholder="you@example.com"
              disabled={isLoading}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) validateEmail(e.target.value);
                if (generalError) setGeneralError('');
              }}
              onBlur={() => validateEmail(email)}
              aria-invalid={!!emailError}
              aria-describedby={emailError ? 'email-error' : undefined}
              className={`w-full pl-10 pr-3.5 py-2.5 bg-white text-slate-900 placeholder:text-slate-400 text-sm rounded-xl border transition-all duration-200 outline-none
                ${
                  emailError
                    ? 'border-rose-400 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10'
                    : 'border-slate-200 hover:border-slate-300 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-500/15 focus:shadow-[0_0_15px_rgba(99,102,241,0.12)]'
                }
                ${isLoading ? 'bg-slate-50 cursor-not-allowed text-slate-400' : ''}
              `}
            />
          </div>
          {emailError && (
            <p id="email-error" className="mt-1.5 text-xs text-rose-500 font-medium flex items-center gap-1">
              <span>•</span> {emailError}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <PasswordInput
            id="password-input"
            label="Password"
            value={password}
            autoComplete="current-password"
            placeholder="Enter your password"
            disabled={isLoading}
            error={passwordError}
            onChange={(e) => {
              setPassword(e.target.value);
              if (passwordError) validatePassword(e.target.value);
              if (generalError) setGeneralError('');
            }}
            onBlur={() => validatePassword(password)}
          />

          {/* Forgot Password Link */}
          <div className="flex justify-end mt-2">
            <button
              type="button"
              onClick={() => {
                if (onForgotPassword) {
                  onForgotPassword();
                } else {
                  triggerToast('Password reset link sent if account exists.');
                }
              }}
              className="text-xs font-medium text-slate-600 hover:text-indigo-600 transition-colors focus:outline-none focus:underline"
            >
              Forgot password?
            </button>
          </div>
        </div>

        {/* Primary Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full relative flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-950 hover:bg-slate-900 active:bg-black text-white text-sm font-semibold tracking-wide transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-slate-950/20 disabled:opacity-75 disabled:cursor-not-allowed group overflow-hidden mt-2"
        >
          {/* Subtle gradient shimmer on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/15 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {isLoading ? (
            <span className="flex items-center gap-2 relative z-10">
              <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
              <span>Signing in...</span>
            </span>
          ) : (
            <span className="flex items-center gap-2 relative z-10">
              <span>Sign in</span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 group-hover:text-white transition-all" />
            </span>
          )}
        </button>
      </form>

      {/* OR Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200" />
        </div>
        <div className="relative flex justify-center text-xs uppercase font-mono tracking-wider">
          <span className="bg-[#FAFBFD] px-3 text-slate-400 font-medium">OR</span>
        </div>
      </div>

      {/* Continue with Google */}
      <div>
        <SocialLoginButton
          provider="google"
          isLoading={isLoading}
          onClick={handleGoogleLogin}
        />
      </div>

      {/* Don't have an account? Create account */}
      <div className="mt-8 text-center text-sm text-slate-600">
        Don’t have an account?{' '}
        <button
          type="button"
          onClick={() => {
            if (onNavigateToSignup) {
              onNavigateToSignup();
            } else {
              triggerToast('Signup flow will open once created.');
            }
          }}
          className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors focus:outline-none focus:underline"
        >
          Create account
        </button>
      </div>

      {/* Terms and Privacy Footer */}
      <div className="mt-8 pt-6 border-t border-slate-100 text-center text-xs text-slate-400 leading-relaxed">
        By continuing, you agree to our{' '}
        <a
          href="#terms"
          onClick={(e) => {
            e.preventDefault();
            triggerToast('Terms of Service dialog');
          }}
          className="underline hover:text-slate-600 transition-colors focus:outline-none"
        >
          Terms of Service
        </a>{' '}
        and{' '}
        <a
          href="#privacy"
          onClick={(e) => {
            e.preventDefault();
            triggerToast('Privacy Policy dialog');
          }}
          className="underline hover:text-slate-600 transition-colors focus:outline-none"
        >
          Privacy Policy
        </a>
        .
      </div>
    </div>
  );
};
