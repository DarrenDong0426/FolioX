import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../hooks/themeContext.jsx';
import { LogOut } from 'lucide-react'; // Optional: if you have lucide-react installed

export default function Admin() {
  const { isWarmthMode } = useTheme();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      // 1. Call the backend to revoke the session
      const response = await fetch('/api/admin/logout', { 
        method: 'POST',
        credentials: 'include' 
      });

      if (response.ok) {
        // 2. Wipe the session from browser and go to login
        window.location.href = '/Admin/Login';
      }
    } catch (err) {
      console.error("Logout failed:", err);
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
            {Array.from({ length: 2000 }).map((_, i) => (
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

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      {Background}

      <main className="flex-1 relative z-10 flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`w-full max-w-4xl p-12 rounded-2xl backdrop-blur-md border-2 shadow-2xl relative ${
            isWarmthMode 
              ? "bg-white/80 border-pink-200 text-gray-800" 
              : "bg-[#0a0e27]/60 border-cyan-500/50 text-white"
          }`}
        >
          {/* LOGOUT BUTTON */}
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className={`absolute top-6 right-6 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              isWarmthMode 
                ? "bg-pink-100 text-pink-600 hover:bg-pink-200" 
                : "bg-cyan-900/40 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-900/60"
            } disabled:opacity-50`}
          >
            {isLoggingOut ? "Logging out..." : "Logout"}
          </button>

          <h1 className={`text-5xl font-bold mb-6 tracking-tight text-center ${
            isWarmthMode ? "text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600" : "text-cyan-400"
          }`}>
            Admin Dashboard
          </h1>
          
          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8 text-center">
            Welcome back, Darren. Your administrative session is active.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {[
              { label: "Projects", color: "from-blue-400 to-cyan-400" },
              { label: "Documents", color: "from-purple-400 to-pink-400" },
              { label: "Events", color: "from-orange-400 to-red-400" }
            ].map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm">
                <p className="text-xs uppercase tracking-widest opacity-70">{item.label}</p>
                <p className="text-2xl font-semibold mt-1">Ready</p>
              </div>
            ))}
          </div>
        </motion.div>
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
}