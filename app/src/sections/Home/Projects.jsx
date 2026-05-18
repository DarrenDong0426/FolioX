import React, { useEffect, useState } from "react";
import wordCloud from "../../assets/images/project_word_cloud.png";
import { Link } from "react-router-dom";
import { useTheme } from '../../hooks/themeContext.jsx';
import { motion } from "framer-motion";

const leftSlide = {
  hidden: { opacity: 0, x: -80 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
};

const rightSlide = {
  hidden: { opacity: 0, x: 80 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
};

export default function Projects() {
  const { isWarmthMode } = useTheme();

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => setProjects(data.projects || []))
      .catch(() => {});
  }, []);

  // Compute stats
  const stats = React.useMemo(() => {
    const total = projects.length;
    const langCounts = {};
    const typeCounts = {};
    let earliestYear = null;
    let latestYear = null;

    for (const p of projects) {
      (p.language || []).forEach(l => { langCounts[l] = (langCounts[l] || 0) + 1; });
      (p.type || []).forEach(t => { typeCounts[t] = (typeCounts[t] || 0) + 1; });
      if (p.month_year_raw) {
        const year = parseInt(p.month_year_raw.slice(0, 4), 10);
        if (!earliestYear || year < earliestYear) earliestYear = year;
        if (!latestYear || year > latestYear) latestYear = year;
      }
    }

    const topLanguages = Object.entries(langCounts).sort((a, b) => b[1] - a[1]).slice(0, 3);
    const topTypes = Object.entries(typeCounts).sort((a, b) => b[1] - a[1]).slice(0, 3);

    const yearSpan = earliestYear && latestYear
      ? (earliestYear === latestYear ? `${earliestYear}` : `${earliestYear} – ${latestYear}`)
      : null;

    return { total, topLanguages, topTypes, yearSpan };
  }, [projects]);

  const headingClass = isWarmthMode ? "text-[#E94E41]" : "text-cyan-400";
  const bodyText = isWarmthMode ? "text-[#264653]" : "text-gray-200";
  const labelClass = isWarmthMode ? "text-gray-600" : "text-cyan-400";
  const valueClass = isWarmthMode ? "text-[#264653]" : "text-cyan-200";

  return (
    <div className={`
      w-full h-full flex items-center justify-center
      px-4 py-6 transition-colors duration-500
    `}>
      <div className={`
        flex flex-col max-w-5xl w-full gap-6 rounded-3xl shadow-xl border-2 p-6 my-6 z-10
        ${isWarmthMode
          ? "bg-[#FFF8F3]/90 border-[#E94E41]"
          : "bg-[#151C26]/90 border-cyan-700"
        }
      `}>

        {/* === Top half: intro + image === */}
        <div className="flex flex-col md:flex-row gap-12">
          <motion.div
            className="flex flex-col justify-center flex-[2]"
            variants={leftSlide}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
          >
            <h1 className={`text-3xl lg:text-4xl font-bold mb-4 tracking-wide ${headingClass}`}>
              View Projects
            </h1>
            <p className={`mb-4 ${bodyText}`}>
              A curated collection of academic and personal work — sortable, filterable, and searchable. Each project links to its own page with a description, source, and (when relevant) an interactive demo.
            </p>
            <p className="mb-2">
              <Link
                to="/Projects"
                className={`
                  font-bold transition-colors duration-200 underline underline-offset-2
                  ${isWarmthMode
                    ? "text-blue-600 hover:text-[#E94E41]"
                    : "text-cyan-300 hover:text-cyan-100"}
                `}
              >
                Explore Projects →
              </Link>
            </p>
          </motion.div>

          <motion.div
            className="flex w-full md:w-auto flex-[1] items-center justify-center"
            variants={rightSlide}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
          >
            <img
              src={wordCloud}
              alt="Project Word Cloud"
              className={`
                max-w-xs sm:max-w-sm rounded-xl shadow-lg ring-2 bg-white/70
                ${isWarmthMode ? "ring-[#e2eafc]" : "ring-cyan-900"}
              `}
            />
          </motion.div>
        </div>

        {/* === Divider === */}
        <hr className={`my-2 ${isWarmthMode ? "border-pink-200" : "border-cyan-900"}`} />

        {/* === Bottom half: stats === */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Total */}
          <div className="text-center">
            <div className={`text-4xl md:text-5xl font-bold mb-1 ${valueClass}`}>
              {stats.total}
            </div>
            <div className={`text-xs uppercase tracking-widest ${labelClass}`}>
              Projects
            </div>
          </div>

          {/* Year span */}
          {stats.yearSpan && (
            <div className="text-center">
              <div className={`text-2xl md:text-3xl font-bold mb-1 ${valueClass}`}>
                {stats.yearSpan}
              </div>
              <div className={`text-xs uppercase tracking-widest ${labelClass}`}>
                Years Active
              </div>
            </div>
          )}

          {/* Top domains */}
          <div className="text-center">
            <div className={`text-sm md:text-base font-semibold mb-2 ${valueClass}`}>
              {stats.topTypes.length === 0
                ? '—'
                : stats.topTypes.map(([name]) => name).join(' · ')
              }
            </div>
            <div className={`text-xs uppercase tracking-widest ${labelClass}`}>
              Domains
            </div>
          </div>

          {/* Top languages */}
          <div className="text-center">
            <div className={`text-sm md:text-base font-semibold mb-2 ${valueClass}`}>
              {stats.topLanguages.length === 0
                ? '—'
                : stats.topLanguages.map(([name]) => name).join(' · ')
              }
            </div>
            <div className={`text-xs uppercase tracking-widest ${labelClass}`}>
              Top Languages
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}