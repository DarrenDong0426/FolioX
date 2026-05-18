import React, { useEffect, useState } from "react";
import documents from "../../assets/images/documents.png";
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

export default function Documents() {
  const { isWarmthMode } = useTheme();
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    fetch('/api/documents')
      .then(res => res.json())
      .then(data => setDocs(data.documents || []))
      .catch(() => {});
  }, []);

  const stats = React.useMemo(() => {
    const total = docs.length;
    let mostRecent = null;
    for (const d of docs) {
      if (!d.last_updated_raw) continue;
      if (!mostRecent || d.last_updated_raw > mostRecent.last_updated_raw) {
        mostRecent = d;
      }
    }
    return {
      total,
      mostRecent: mostRecent ? mostRecent.month_year : null,
      mostRecentTitle: mostRecent ? mostRecent.title : null,
    };
  }, [docs]);

  const headingClass = isWarmthMode ? "text-[#E94E41]" : "text-cyan-400";
  const bodyText = isWarmthMode ? "text-[#264653]" : "text-gray-200";
  const labelClass = isWarmthMode ? "text-gray-600" : "text-cyan-400";
  const valueClass = isWarmthMode ? "text-[#264653]" : "text-cyan-200";

  return (
    <div className="w-full h-full flex items-center justify-center transition-colors duration-500">
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
            className="flex w-full md:w-auto flex-[1] items-center justify-center"
            variants={leftSlide}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
          >
            <img
              src={documents}
              alt="Documents Illustration"
              className={`
                w-[200px] md:w-[240px] rounded-xl shadow-lg ring-2 bg-white/70
                ${isWarmthMode ? "ring-[#e2eafc]" : "ring-cyan-900"}
              `}
            />
          </motion.div>

          <motion.div
            className="flex flex-col justify-center flex-[2]"
            variants={rightSlide}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
          >
            <h1 className={`text-3xl lg:text-4xl font-bold mb-4 tracking-wide ${headingClass}`}>
              View Documents
            </h1>
            <p className={`mb-4 ${bodyText}`}>
              Résumés tailored for different roles, academic records, and other reference materials — all viewable inline or downloadable. Pick a doc from the sidebar and the embedded viewer opens it in place.
            </p>
            <p className="mb-2">
              <Link
                to="/Documents"
                className={`
                  font-bold transition-colors duration-200 underline underline-offset-2
                  ${isWarmthMode
                    ? "text-blue-600 hover:text-[#E94E41]"
                    : "text-cyan-300 hover:text-cyan-100"}
                `}
              >
                Browse Documents →
              </Link>
            </p>
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
              Documents
            </div>
          </div>

          {stats.mostRecent && (
            <div className="text-center">
              <div className={`text-xl md:text-2xl font-bold mb-1 ${valueClass}`}>
                {stats.mostRecent}
              </div>
              <div className={`text-xs uppercase tracking-widest ${labelClass}`}>
                Last Updated
              </div>
            </div>
          )}

          <div className="text-center">
            <div className={`text-base md:text-lg font-semibold mb-2 ${valueClass}`}>
              PDF · Downloadable
            </div>
            <div className={`text-xs uppercase tracking-widest ${labelClass}`}>
              Format
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}