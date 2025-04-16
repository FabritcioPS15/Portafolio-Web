// src/components/ThemeToggle.tsx
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className={`relative flex items-center justify-between w-14 h-8 rounded-full p-1 cursor-pointer focus:outline-none ${
        theme === 'dark' ? 'bg-slate-800' : 'bg-amber-100'
      } border ${
        theme === 'dark' ? 'border-teal-400/30' : 'border-amber-400/30'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      initial={false}
    >
      <motion.div
        className={`absolute w-6 h-6 rounded-full flex items-center justify-center shadow-md ${
          theme === 'dark' ? 'bg-teal-400 left-1' : 'bg-amber-400 left-7'
        }`}
        layout
        transition={{
          type: 'spring',
          stiffness: 700,
          damping: 30
        }}
      >
        {theme === 'dark' ? (
          <Moon size={14} className="text-slate-900" />
        ) : (
          <Sun size={14} className="text-slate-900" />
        )}
      </motion.div>
    </motion.button>
  );
};