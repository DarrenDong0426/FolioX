import React, { useState, useMemo } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../../hooks/themeContext';

const AdminLayout = () => {
  const { isWarmthMode, setIsWarmthMode } = useTheme();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const response = await fetch('/api/admin/logout', {
        method: 'POST',
        credentials: 'include',
      });
      if (response.ok) {
        navigate('/Admin/Login', { replace: true });
      }
    } catch (err) {
      console.error('Logout failed:', err);
      setIsLoggingOut(false);
    }
  };

  const Background = useMemo(() => {
    return (
      <div className="absolute inset-0 z-0 pointer-events-none">
        {isWarmthMode ? (
          <>
            <div className="absolute inset-0 bg-gradient-to-tr from-pink-300 via-purple-300 to-blue-300 animate-gradient bg-[length:400%_400%]" />
            {Array.from({ length: 75 }).map((_, i) => (
              <motion.div
                key={`light-${i}`}
                className="absolute rounded-full"
                style={{
                  width: `${50 + Math.random() * 100}px`,
                  height: `${50 + Math.random() * 100}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  backgroundColor: `hsl(${Math.random() * 360}, 70%, 60%)`,
                  opacity: 0.5 + Math.random() * 0.3,
                }}
                animate={{
                  x: [0, Math.random() * 200 - 100, 0],
                  y: [0, Math.random() * 100 - 50, 0],
                  scale: [1, 0.8 + Math.random() * 0.4, 1],
                }}
                transition={{
                  duration: 15 + Math.random() * 20,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e27] via-[#1a1f4a] to-[#0a0e27]" />
            {Array.from({ length: 100 }).map((_, i) => (
              <motion.div
                key={`dark-${i}`}
                className="absolute rounded-full bg-cyan-300"
                style={{
                  width: `${1 + Math.random() * 3}px`,
                  height: `${1 + Math.random() * 3}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: 0.3 + Math.random() * 0.7,
                  boxShadow: '0 0 4px rgba(125, 227, 252, 0.8)',
                }}
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 2 + Math.random() * 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 3,
                }}
              />
            ))}
          </>
        )}
      </div>
    );
  }, [isWarmthMode]);

  const navLinkClass = ({ isActive }) =>
    `px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
      isActive
        ? isWarmthMode
          ? 'bg-pink-200 text-pink-700'
          : 'bg-cyan-900/60 text-cyan-300'
        : isWarmthMode
          ? 'text-gray-700 hover:bg-pink-100'
          : 'text-cyan-400 hover:bg-cyan-900/40'
    }`;

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      {Background}

      <header
        className={`relative z-10 backdrop-blur-md border-b-2 transition-colors duration-300 ${
          isWarmthMode
            ? 'bg-white/70 border-pink-200'
            : 'bg-[#0a0e27]/70 border-cyan-500/30'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
          <span
            className={`font-bold tracking-wide uppercase text-sm ${
              isWarmthMode ? 'text-pink-700' : 'text-cyan-300'
            }`}
          >
            Admin
          </span>

          <nav className="flex items-center gap-1 flex-wrap">
            <NavLink to="/Admin" end className={navLinkClass}>Dashboard</NavLink>
            <NavLink to="/Admin/Projects" className={navLinkClass}>Projects</NavLink>
            <NavLink to="/Admin/Documents" className={navLinkClass}>Documents</NavLink>
            <NavLink to="/Admin/Events" className={navLinkClass}>Events</NavLink>
            <NavLink to="/Admin/Changelog" className={navLinkClass}>Changelog</NavLink>
            <NavLink to="/Admin/FAQs" className={navLinkClass}>FAQs</NavLink>
          </nav>

          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <button
              onClick={() => setIsWarmthMode(!isWarmthMode)}
              aria-pressed={!isWarmthMode}
              className={`
                relative w-14 h-7 flex items-center rounded-full border-2 overflow-hidden
                transition-colors duration-300 focus:outline-none
                ${isWarmthMode
                  ? "bg-gradient-to-r from-[#FFE2ED] to-[#FAF3E3] border-[#e94e41]"
                  : "bg-gradient-to-l from-[#073047] to-[#222B3A] border-cyan-500"}
                p-0
              `}
              tabIndex={0}
              title={isWarmthMode ? "Switch to Tech Mode" : "Switch to Warmth Mode"}
            >
              {/* Moon icon on left */}
              <span className="absolute left-1 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center pointer-events-none">
                <svg
                  className={`w-4 h-4 transition-opacity duration-300 ${isWarmthMode ? "opacity-60" : "opacity-100"}`}
                  viewBox="0 0 24 24" fill="none"
                >
                  <path
                    d="M17.75 15.61A7.5 7.5 0 0 1 8.39 6.25c.28 0 .36-.37.12-.49A7.501 7.501 0 1 0 18.24 16.37c-.13-.13-.5-.16-.49.12Z"
                    fill="#7DE3FC" />
                </svg>
              </span>

              {/* Sun icon on right */}
              <span className="absolute right-1 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center pointer-events-none">
                <svg
                  className={`w-4 h-4 transition-opacity duration-300 ${isWarmthMode ? "opacity-100" : "opacity-60"}`}
                  viewBox="0 0 24 24" fill="none"
                >
                  <circle cx="12" cy="12" r="5" fill="#FFC66D" />
                  <g stroke="#FFC66D" strokeWidth={2} strokeLinecap="round">
                    <line x1="12" y1="2.5" x2="12" y2="5" />
                    <line x1="12" y1="19" x2="12" y2="21.5" />
                    <line x1="4.93" y1="4.93" x2="6.76" y2="6.76" />
                    <line x1="17.24" y1="17.24" x2="19.07" y2="19.07" />
                    <line x1="2.5" y1="12" x2="5" y2="12" />
                    <line x1="19" y1="12" x2="21.5" y2="12" />
                    <line x1="4.93" y1="19.07" x2="6.76" y2="17.24" />
                    <line x1="17.24" y1="6.76" x2="19.07" y2="4.93" />
                  </g>
                </svg>
              </span>

              {/* Sliding knob */}
              <span
                className={`
                  absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full shadow-md flex items-center justify-center
                  border-2 z-10 bg-white transition-all duration-300
                  ${isWarmthMode
                    ? "right-0 border-[#E94E41]"
                    : "left-0 border-cyan-600"}
                `}
              >
                {isWarmthMode ? (
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
                    <circle cx="12" cy="12" r="5" fill="#FFC66D" />
                    <g stroke="#FFC66D" strokeWidth={2} strokeLinecap="round">
                      <line x1="12" y1="2.5" x2="12" y2="5" />
                      <line x1="12" y1="19" x2="12" y2="21.5" />
                      <line x1="4.93" y1="4.93" x2="6.76" y2="6.76" />
                      <line x1="17.24" y1="17.24" x2="19.07" y2="19.07" />
                      <line x1="2.5" y1="12" x2="5" y2="12" />
                      <line x1="19" y1="12" x2="21.5" y2="12" />
                      <line x1="4.93" y1="19.07" x2="6.76" y2="17.24" />
                      <line x1="17.24" y1="6.76" x2="19.07" y2="4.93" />
                    </g>
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
                    <path
                      d="M17.75 15.61A7.5 7.5 0 0 1 8.39 6.25c.28 0 .36-.37.12-.49A7.501 7.501 0 1 0 18.24 16.37c-.13-.13-.5-.16-.49.12Z"
                      fill="#7DE3FC" />
                  </svg>
                )}
              </span>
            </button>
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className={`text-xs hover:underline ${
                isWarmthMode ? 'text-gray-600' : 'text-cyan-400'
              }`}
            >
              View site ↗
            </a>
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all disabled:opacity-50 ${
                isWarmthMode
                  ? 'bg-pink-100 text-pink-600 hover:bg-pink-200'
                  : 'bg-cyan-900/40 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-900/60'
              }`}
            >
              {isLoggingOut ? 'Logging out...' : 'Logout'}
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex-1 px-4 py-8">
        <Outlet />
      </main>

      <style jsx>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradientShift 40s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default AdminLayout;