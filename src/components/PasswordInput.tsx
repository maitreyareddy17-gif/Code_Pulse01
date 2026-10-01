import React, { useState, forwardRef } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  id: string;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label = 'Password', error, id, className = '', disabled, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    return (
      <div className="w-full text-left">
        {label && (
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor={id}
              className="block text-xs font-semibold text-slate-700 tracking-wide uppercase font-mono"
            >
              {label}
            </label>
          </div>
        )}

        <div className="relative group">
          {/* Leading Icon */}
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
            <Lock className="w-4 h-4" />
          </div>

          <input
            ref={ref}
            id={id}
            type={showPassword ? 'text' : 'password'}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
            className={`w-full pl-10 pr-11 py-2.5 bg-white text-slate-900 placeholder:text-slate-400 text-sm rounded-xl border transition-all duration-200 outline-none
              ${
                error
                  ? 'border-rose-400 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10'
                  : 'border-slate-200 hover:border-slate-300 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-500/15 focus:shadow-[0_0_15px_rgba(99,102,241,0.12)]'
              }
              ${disabled ? 'bg-slate-50 cursor-not-allowed text-slate-400' : ''}
              ${className}
            `}
            {...props}
          />

          {/* Show/Hide Toggle Button */}
          <button
            type="button"
            onClick={togglePasswordVisibility}
            disabled={disabled}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-700 focus:outline-none focus:text-indigo-600 transition-colors"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            aria-pressed={showPassword}
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" aria-hidden="true" />
            ) : (
              <Eye className="w-4 h-4" aria-hidden="true" />
            )}
          </button>
        </div>

        {error && (
          <p id={`${id}-error`} className="mt-1.5 text-xs text-rose-500 font-medium flex items-center gap-1">
            <span>•</span> {error}
          </p>
        )}
      </div>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';
