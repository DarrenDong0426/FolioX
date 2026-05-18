import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../hooks/themeContext';
import Tag from '../../components/Tag';
import { useTagColor } from '../../components/TagColor.jsx';


const AUTO_ADVANCE_MS = 7000;

export default function FeaturedCarousel() {
  const { isWarmthMode } = useTheme();
  const colorCodeFunc = useTagColor();

  const [projects, setProjects] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  // Load featured projects
  useEffect(() => {
    fetch('/api/projects/featured')
      .then(res => res.json())
      .then(data => setProjects(data.projects || []))
      .catch(err => console.error('Failed to load featured projects:', err));
  }, []);

  // Auto-advance timer
  useEffect(() => {
    if (projects.length <= 1 || isPaused) return;
    timerRef.current = setTimeout(() => {
      setCurrentIdx((prev) => (prev + 1) % projects.length);
    }, AUTO_ADVANCE_MS);
    return () => clearTimeout(timerRef.current);
  }, [currentIdx, projects.length, isPaused]);

  const goTo = (idx) => {
    clearTimeout(timerRef.current);
    setCurrentIdx(idx);
  };
  const goPrev = () => goTo((currentIdx - 1 + projects.length) % projects.length);
  const goNext = () => goTo((currentIdx + 1) % projects.length);

  // Extract first image from project's content_blocks (if any)
  const getProjectImage = (project) => {
    const blocks = project.content_blocks || [];
    const imgBlock = blocks.find(b => b.type === 'image' && b.url);
    return imgBlock?.url || null;
  };

  if (projects.length === 0) {
    return null;  // Nothing to show
  }

  const current = projects[currentIdx];
  const imageUrl = getProjectImage(current);

  const cardBg = isWarmthMode
    ? "bg-white/90 border-[#E94E41]"
    : "bg-[#151C26]/90 border-cyan-700";

  const arrowBg = isWarmthMode
    ? "bg-white/80 hover:bg-white text-[#E94E41] border-[#E94E41]"
    : "bg-[#0a0e27]/80 hover:bg-[#0a0e27] text-cyan-400 border-cyan-500";

  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-8">
      <h2 className={`
        text-3xl md:text-4xl font-bold text-center mb-2
        ${isWarmthMode ? "text-[#E94E41]" : "text-cyan-300"}
      `}>
        Featured Work
      </h2>
      <p className={`
        text-center text-sm mb-6
        ${isWarmthMode ? "text-gray-600" : "text-cyan-400"}
      `}>
        A rotating look at projects worth highlighting.
      </p>

      <div
        className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Slide */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <Link
              to={`/Projects/${current.id}`}
              className={`
                block rounded-2xl border-2 shadow-xl overflow-hidden
                hover:scale-[1.01] transition-transform duration-300
                ${cardBg}
              `}
            >
              <div className="flex flex-col md:flex-row">
                {/* Image side */}
                <div className={`
                  md:w-1/2 h-56 md:h-72 flex items-center justify-center overflow-hidden
                  ${isWarmthMode ? "bg-pink-50" : "bg-cyan-900/30"}
                `}>
                  {imageUrl ? (
                    <img src={imageUrl} alt={current.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className={`
                      text-6xl font-bold opacity-30
                      ${isWarmthMode ? "text-[#E94E41]" : "text-cyan-400"}
                    `}>
                      {current.name?.[0] || "?"}
                    </span>
                  )}
                </div>

                {/* Text side */}
                <div className="md:w-1/2 p-6 flex flex-col justify-center">
                  <div className={`
                    text-xs uppercase tracking-widest mb-2 opacity-70
                    ${isWarmthMode ? "text-[#E94E41]" : "text-cyan-400"}
                  `}>
                    {current.month_year}
                  </div>
                  <h3 className={`
                    text-2xl md:text-3xl font-bold mb-2
                    ${isWarmthMode ? "text-[#264653]" : "text-cyan-200"}
                  `}>
                    {current.name}
                  </h3>
                  <p className={`
                    text-sm mb-4 line-clamp-3
                    ${isWarmthMode ? "text-gray-700" : "text-gray-300"}
                  `}>
                    {current.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {(current.type || []).slice(0, 3).map(t => (
                      <Tag key={`t-${t}`} label={t} type="type" colorCodeFunc={colorCodeFunc} />
                    ))}
                    {(current.language || []).slice(0, 4).map(l => (
                      <Tag key={`l-${l}`} label={l} type="language" colorCodeFunc={colorCodeFunc} />
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows (only if >1 project) */}
        {projects.length > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              className={`
                absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full
                border-2 flex items-center justify-center transition-all
                shadow-lg z-10
                ${arrowBg}
              `}
              aria-label="Previous project"
            >
              ←
            </button>
            <button
              type="button"
              onClick={goNext}
              className={`
                absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full
                border-2 flex items-center justify-center transition-all
                shadow-lg z-10
                ${arrowBg}
              `}
              aria-label="Next project"
            >
              →
            </button>
          </>
        )}
      </div>

      {/* Pagination dots */}
      {projects.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {projects.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => goTo(idx)}
              className={`
                h-2 rounded-full transition-all
                ${idx === currentIdx
                  ? isWarmthMode ? "w-8 bg-[#E94E41]" : "w-8 bg-cyan-400"
                  : isWarmthMode ? "w-2 bg-gray-300" : "w-2 bg-cyan-700"
                }
              `}
              aria-label={`Go to project ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}