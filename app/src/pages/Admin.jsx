import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../hooks/themeContext.jsx';

export default function Admin() {
  const { isWarmthMode } = useTheme();

  const cards = [
    { label: 'Projects', path: '/Admin/Projects', color: 'from-blue-400 to-cyan-400' },
    { label: 'Documents', path: '/Admin/Documents', color: 'from-purple-400 to-pink-400' },
    { label: 'Events', path: '/Admin/Events', color: 'from-orange-400 to-red-400' },
    { label: 'Changelog', path: '/Admin/Changelog', color: 'from-green-400 to-emerald-400' },
    { label: 'FAQs', path: '/Admin/FAQs', color: 'from-yellow-400 to-amber-400' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`max-w-5xl mx-auto p-8 rounded-2xl backdrop-blur-md border-2 shadow-2xl ${
        isWarmthMode
          ? 'bg-white/80 border-pink-200 text-gray-800'
          : 'bg-[#0a0e27]/60 border-cyan-500/50 text-white'
      }`}
    >
      <h1
        className={`text-4xl font-bold mb-4 tracking-tight ${
          isWarmthMode
            ? 'text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600'
            : 'text-cyan-400'
        }`}
      >
        Admin Dashboard
      </h1>
      <p className="text-lg opacity-90 mb-8">
        Welcome back, Darren. Use the cards below or the navigation above to manage your site.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            to={card.path}
            className="p-5 rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm hover:scale-[1.02] hover:bg-white/20 transition-all"
          >
            <div className={`text-2xl font-semibold bg-gradient-to-r ${card.color} bg-clip-text text-transparent`}>
              {card.label}
            </div>
            <p className="text-xs uppercase tracking-widest opacity-70 mt-1">Manage →</p>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}