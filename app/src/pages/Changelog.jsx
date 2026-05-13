// Imports
import React, { useMemo } from 'react';
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer.jsx";
import { useTheme } from "../hooks/themeContext.jsx";

export default function Changelog() {
  const { isWarmthMode } = useTheme();

  // Memoize the background to prevent recalculating random positions on every render
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

  const headingText = isWarmthMode ? "text-[#8B2D2D]" : "text-cyan-300";
  const subText = isWarmthMode ? "text-gray-600" : "text-gray-400";
  const cardBg = isWarmthMode ? "bg-[#FFF8F0]/90 border-[#E94E41]" : "bg-[#181b22]/90 border-cyan-500";
  const itemText = isWarmthMode ? "text-gray-700" : "text-cyan-100";

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      {Background}
      
      <Header />
      
      <div className="flex-1 flex flex-col items-center p-6 relative z-10">
        <h1 className={`text-4xl font-bold mb-2 text-center ${headingText}`}>
          Changelog
        </h1>
        <p className={`text-center text-sm mb-8 ${subText}`}>
          Last Updated: October 2025
        </p>

        <div className={`w-full max-w-3xl p-6 rounded-xl shadow-lg border-2 backdrop-blur-md ${cardBg}`}>
          <ul className="space-y-3">
            <li className={`text-sm ${itemText}`}>
              • Version 1.0.0 – Initial release of the portfolio.
            </li>
            <li className={`text-sm ${itemText}`}>
              • Version 1.1.0 – Contact Form on Main Page Implemented.
            </li>
            <li className={`text-sm ${itemText}`}>
              • Version 1.1.1 – Fixed bug with Timeline events not showing correctly on Safari Browser.
            </li>
          </ul>
        </div>
      </div>

      <Footer />

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