import React, { useRef } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Intro from "../sections/Home/Intro";
import Projects from "../sections/Home/Projects";
import Documents from "../sections/Home/Documents";
import Timeline from "../sections/Home/Timeline";
import Information from "../sections/Home/Information";
import Footer from "../components/Footer";
import { useTheme } from "../hooks/themeContext";
import FeaturedCarousel from "../sections/Home/FeaturedCarousel";

const sectionVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

function IntroCombined() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 md:gap-4 py-4">
      
      {/* Intro: only takes what it needs */}
      <div className="shrink-0 w-full">
        <Intro />
      </div>

      {/* Carousel: gets all remaining space */}
      <div className="w-full flex-1 min-h-0 flex flex-col items-center justify-center">
        <FeaturedCarousel />
      </div>

    </div>
  );
}

// Floating arrow that scrolls to the next sibling section
function NextArrow({ isWarmthMode }) {
  const handleClick = (e) => {
    const current = e.currentTarget.closest('section');
    const next = current?.nextElementSibling;
    if (next) {
      next.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      animate={{ y: [0, 6, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      className={`
        absolute bottom-6 left-1/2 -translate-x-1/2 z-20
        w-12 h-12 rounded-full flex items-center justify-center
        backdrop-blur-md border-2 transition-opacity opacity-70 hover:opacity-100
        ${isWarmthMode
          ? "bg-white/40 border-[#E94E41] text-[#E94E41]"
          : "bg-[#0a0e27]/40 border-cyan-500 text-cyan-300"}
      `}
      aria-label="Scroll to next section"
    >
      <span className="text-2xl">↓</span>
    </motion.button>
  );
}
export default function Home() {
  const { isWarmthMode } = useTheme();
  const sections = [
    { Component: IntroCombined, key: "IntroCombined" },
    { Component: Projects, key: "Projects" },
    { Component: Documents, key: "Documents" },
    { Component: Timeline, key: "Timeline" },
    { Component: Information, key: "Information" },
  ];

  return (
    // 1. Force the root container to strictly obey the layout viewport width without scrollbar interference
    <div className="relative w-full h-screen flex flex-col text-gray-900 overflow-hidden select-none">

      {/* Background Wrapper */}
      {/* 2. Changed inset-0 to absolute top-0 left-0 w-full h-full to guarantee it ties to the layout container, not the window size */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none overflow-hidden">
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
                  left: `${Math.random() * 95}%`, // 3. Kept slightly away from 100% to stop border clipping
                  backgroundColor: `hsl(${Math.random() * 360}, 70%, 60%)`,
                  opacity: 0.5 + Math.random() * 0.3,
                }}
                animate={{
                  x: [0, Math.random() * 100 - 50, 0], // Reduced movement radius
                  y: [0, Math.random() * 100 - 50, 0],
                  scale: [1, 0.8 + Math.random() * 0.4, 1],
                }}
                transition={{ duration: 15 + Math.random() * 20, repeat: Infinity, ease: "easeInOut" }}
              />
            ))}
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e27] via-[#1a1f4a] to-[#0a0e27]" />
            {Array.from({ length: 75 }).map((_, i) => ( // Dropped from 2000 to improve rendering overhead
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
                animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.3, 1] }}
                transition={{ duration: 2 + Math.random() * 4, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 3 }}
              />
            ))}
          </>
        )}
      </div>

      {/* Header Container */}
      <div className="relative z-20 shrink-0 w-full">
        <Header />
      </div>

      {/* Main Container */}
      {/* 4. Added custom scrollbar hiding utilities or standard cross-browser containment */}
      <main className="flex-1 relative z-10 overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-smooth w-full style-scrollbar">
        {sections.map(({ Component, key }, idx) => {
          const isLast = idx === sections.length - 1;
          return (
            <motion.section
              key={key}
              className={`
                relative snap-start flex flex-col w-full min-w-0
                ${isLast ? "min-h-full" : "h-full"}
              `}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={sectionVariant}
            >
              <div className="flex-1 min-h-0 w-full flex items-center justify-center p-4">
                <Component />
              </div>
              {isLast && <Footer />}
            </motion.section>
          );
        })}
      </main>

      <style jsx global>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradientShift 40s ease infinite;
        }
        /* 5. Clean up scrollbar footprint to prevent viewport shifting */
        .style-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .style-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .style-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(156, 163, 175, 0.3);
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}