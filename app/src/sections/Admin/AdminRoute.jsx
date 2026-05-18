import { useState, useEffect, useMemo } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../../hooks/themeContext';

const AdminRoute = () => {
  const { isWarmthMode } = useTheme();
  const [authed, setAuthed] = useState(null);

  useEffect(() => {
    fetch('/api/admin/me', { credentials: 'include' })
      .then(response => setAuthed(response.ok))
      .catch(() => setAuthed(false));
  }, []);

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
            {Array.from({ length: 75 }).map((_, i) => (
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

  // While checking auth: same loading screen as Login.jsx
  if (authed === null) {
    return (
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {Background}
        <div
          className={`relative z-10 w-12 h-12 rounded-full border-4 border-t-transparent animate-spin
            ${isWarmthMode ? "border-[#E94E41]" : "border-cyan-400"}
          `}
        />
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
  }

  if (authed === false) return <Navigate to="/Admin/Login" replace />;

  return <Outlet />;
};

export default AdminRoute;