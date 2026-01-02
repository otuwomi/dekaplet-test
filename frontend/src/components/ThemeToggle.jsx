import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`relative p-2 rounded-full transition-all duration-300 hover:scale-110 ${className}`}
      style={{
        background: theme === 'dark' ? 'var(--bg-tertiary)' : 'var(--bg-secondary)',
        border: '1px solid var(--border-primary)'
      }}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className="relative w-5 h-5">
        <Sun
          size={20}
          className={`absolute inset-0 transition-all duration-300 ${
            theme === 'light' 
              ? 'opacity-100 rotate-0 text-amber-500' 
              : 'opacity-0 rotate-90'
          }`}
        />
        <Moon
          size={20}
          className={`absolute inset-0 transition-all duration-300 ${
            theme === 'dark' 
              ? 'opacity-100 rotate-0 text-blue-400' 
              : 'opacity-0 -rotate-90'
          }`}
        />
      </div>
    </button>
  );
};

export default ThemeToggle;
