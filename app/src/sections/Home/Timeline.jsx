import React, { useEffect, useState } from "react";
import timeline from "../../assets/images/timeline.png";
import { Link } from "react-router-dom";
import { useTheme } from "../../hooks/themeContext.jsx";
import { motion } from "framer-motion";

const leftSlide = {
  hidden: { opacity: 0, x: -80 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
};

const rightSlide = {
  hidden: { opacity: 0, x: 80 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
};

export default function Timeline() {
  const { isWarmthMode } = useTheme();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('/api/events?all=true')
      .then(res => res.json())
      .then(data => setEvents(data.events || []))
      .catch(() => {});
  }, []);

  const stats = React.useMemo(() => {
    const total = events.length;
    const tagCounts = {};
    let earliestYear = null;
    let latestYear = null;

    for (const e of events) {
      if (e.tags) {
        tagCounts[e.tags] = (tagCounts[e.tags] || 0) + 1;
      }
      if (e.start) {
        const year = parseInt(e.start.slice(0, 4), 10);
        if (!earliestYear || year < earliestYear) earliestYear = year;
        if (!latestYear || year > latestYear) latestYear = year;
      }
    }

    const topTags = Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    const yearSpan = earliestYear && latestYear
      ? (earliestYear === latestYear ? `${earliestYear}` : `${earliestYear} – ${latestYear}`)
      : null;

    return { total, topTags, yearSpan };
  }, [events]);

  const headingClass = isWarmthMode ? "text-[#E94E41]" : "text-cyan-400";
  const bodyText = isWarmthMode ? "text-[#264653]" : "text-gray-200";
  const labelClass = isWarmthMode ? "text-gray-600" : "text-cyan-400";
  const valueClass = isWarmthMode ? "text-[#264653]" : "text-cyan-200";

  return (
    <div className="w-full h-full flex items-center justify-center px-4 py-6 transition-colors duration-500">
      <div
        className={`
          flex flex-col max-w-5xl w-full gap-6 rounded-3xl shadow-xl border-2 px-6 py-6 my-6 z-10
          ${isWarmthMode
            ? "bg-[#FFF8F3]/90 border-[#E94E41]"
            : "bg-[#151C26]/90 border-cyan-700"
          }
        `}
      >
        {/* Top half: intro + image */}
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <motion.div
            className="flex flex-col justify-center flex-[2]"
            variants={leftSlide}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
          >
            <h1 className={`text-3xl lg:text-4xl font-bold mb-4 tracking-wide ${headingClass}`}>
              View Timeline
            </h1>
            <p className={`mb-4 ${bodyText}`}>
              A chronological view of academic milestones, professional experiences, and personal events. Hover for a quick summary, click to dive deeper, and filter by category to focus on what matters.
            </p>
            <p className="mb-2">
              <Link
                to="/Timeline"
                className={`
                  font-bold underline underline-offset-2 transition-colors duration-200
                  ${isWarmthMode
                    ? "text-blue-600 hover:text-[#E94E41]"
                    : "text-cyan-300 hover:text-cyan-100"}
                `}
              >
                Explore Timeline →
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
              src={timeline}
              alt="Timeline"
              className={`
                w-[200px] md:w-[240px] rounded-xl shadow-lg ring-2 bg-white/70
                ${isWarmthMode ? "ring-[#e2eafc]" : "ring-cyan-900"}
              `}
            />
          </motion.div>
        </div>

        {/* Divider */}
        <hr className={`my-2 ${isWarmthMode ? "border-pink-200" : "border-cyan-900"}`} />

        {/* Bottom half: stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="text-center">
            <div className={`text-4xl md:text-5xl font-bold mb-1 ${valueClass}`}>
              {stats.total}
            </div>
            <div className={`text-xs uppercase tracking-widest ${labelClass}`}>
              Events
            </div>
          </div>

          {stats.yearSpan && (
            <div className="text-center">
              <div className={`text-2xl md:text-3xl font-bold mb-1 ${valueClass}`}>
                {stats.yearSpan}
              </div>
              <div className={`text-xs uppercase tracking-widest ${labelClass}`}>
                Years Spanned
              </div>
            </div>
          )}

          <div className="text-center">
            <div className={`text-sm md:text-base font-semibold mb-2 ${valueClass}`}>
              {stats.topTags.length === 0
                ? '—'
                : stats.topTags.map(([name]) => name).join(' · ')
              }
            </div>
            <div className={`text-xs uppercase tracking-widest ${labelClass}`}>
              Top Categories
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}