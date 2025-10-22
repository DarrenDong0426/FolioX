import React from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Intro from "../sections/Home/Intro";
import Projects from "../sections/Home/Projects";
import Documents from "../sections/Home/Documents";
import Timeline from "../sections/Home/Timeline";
import Information from "../sections/Home/Information";
import Footer from "../components/Footer";
import { useTheme } from "../hooks/themeContext";

const sectionVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const contentHover = {
  hover: { scale: 1.03, transition: { duration: 0.3, ease: "easeOut" } },
};

export default function Home() {
  const { isWarmthMode } = useTheme();
  const sections = [
    { Component: Intro, key: "Intro" },
    { Component: Projects, key: "Projects" },
    { Component: Documents, key: "Documents" },
    { Component: Timeline, key: "Timeline" },
    { Component: Information, key: "Information" },
  ];

  return (
    <div className="relative min-h-screen flex flex-col text-gray-900 overflow-hidden">

      {/* =========================
          BLOBS + GRADIENT (Light Mode Only)
      ========================== */}
      {isWarmthMode && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-tr from-pink-300 via-purple-300 to-blue-300 animate-gradient bg-[length:400%_400%]" />

          {Array.from({ length: 500 }).map((_, i) => (
            <motion.div
              key={i}
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
        </div>
      )}

      <Header />

      <main className="flex-1 relative z-10">
        {sections.map(({ Component, key }, idx) => (
          <motion.section
            key={key}
            className={`min-h-screen flex items-center justify-center ${idx === sections.length - 1 ? "mb-0" : ""}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionVariant}
          >
            <motion.div
              className="w-full max-w-4xl flex flex-col items-center justify-center"
              whileHover="hover"
              variants={contentHover}
            >
              <Component />
            </motion.div>
          </motion.section>
        ))}
      </main>

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
