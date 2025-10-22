import React from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Intro from "../sections/Home/Intro";
import Projects from "../sections/Home/Projects";
import Documents from "../sections/Home/Documents";
import Timeline from "../sections/Home/Timeline";
import Information from "../sections/Home/Information";
import Footer from "../components/Footer";

// Motion variants for section entrance
const sectionVariant = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

// Motion variants for content hover
const contentHover = {
  hover: {
    scale: 1.03,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

export default function Home() {
  const sections = [
    { Component: Intro, key: "Intro" },
    { Component: Projects, key: "Projects" },
    { Component: Documents, key: "Documents" },
    { Component: Timeline, key: "Timeline" },
    { Component: Information, key: "Information" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      <Header />

      <main className="flex-1 overflow-y-auto snap-y snap-proximity">
        {sections.map(({ Component, key }) => (
          <motion.section
            key={key}
            className="h-screen flex items-center justify-center snap-start"
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
    </div>
  );
}
