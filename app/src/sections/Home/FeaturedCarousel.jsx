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

  useEffect(() => {
    fetch('/api/projects/featured')
      .then(res => res.json())
      .then(data => setProjects(data.projects || []))
      .catch(err => console.error('Failed to load featured projects:', err));
  }, []);

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

  const getProjectImage = (project) => {
    const blocks = project.content_blocks || [];
    const imgBlock = blocks.find(b => b.type === 'image' && b.url);
    return imgBlock?.url || null;
  };

  if (projects.length === 0) {
    return null; 
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
    // 1. Strict h-full and min-h-0 on the outer wrapper
    <div className="w-full max-w-5xl mx-auto px-4 md:px-6 flex flex-col h-full min-h-0 justify-center">
      
      {/* 2. Header area marked as shrink-0 so it doesn't compress, but with tighter margins */}
      <div className="shrink-0 mb-2 md:mb-4">
        <h2 className={`
          text-2xl md:text-3xl font-bold text-center mb-1
          ${isWarmthMode ? "text-[#E94E41]" : "text-cyan-300"}
        `}>
          Featured Work
        </h2>
        <p className={`
          text-center text-xs md:text-sm
          ${isWarmthMode ? "text-gray-600" : "text-cyan-400"}
        `}>
          A rotating look at projects worth highlighting.
        </p>
      </div>

      {/* 3. Carousel Body: flex-1 and min-h-0 forces it to stay within boundaries */}
      <div
        className="relative flex-1 min-h-0 w-full"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            // Absolute positioning here prevents layout thrashing during animations
            className="absolute inset-0 flex items-center justify-center"
          >
            <Link
              to={`/Projects/${current.id}`}
              className={`
                flex flex-col md:flex-row w-full max-h-full rounded-2xl border-2 shadow-xl overflow-hidden
                hover:scale-[1.01] transition-transform duration-300
                ${cardBg}
              `}
            >
              {/* Image side: flex-1 on mobile, 50% width on desktop. min-h-0 is crucial. */}
              <div className={`
                w-full md:w-1/2 flex-1 md:flex-auto min-h-[120px] md:min-h-0 flex items-center justify-center overflow-hidden shrink-0
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

              {/* Text side: overflow-y-auto allowed only inside the card if text gets crazy long */}
              <div className="w-full md:w-1/2 p-4 md:p-6 flex flex-col justify-center min-h-0 overflow-y-auto">
                <div className={`
                  text-[10px] md:text-xs uppercase tracking-widest mb-1 opacity-70
                  ${isWarmthMode ? "text-[#E94E41]" : "text-cyan-400"}
                `}>
                  {current.month_year}
                </div>
                <h3 className={`
                  text-xl md:text-2xl font-bold mb-2
                  ${isWarmthMode ? "text-[#264653]" : "text-cyan-200"}
                `}>
                  {current.name}
                </h3>
                {/* 4. Added line-clamp-2 to prevent descriptions from breaking layout height */}
                <p className={`
                  text-xs md:text-sm mb-3 line-clamp-2
                  ${isWarmthMode ? "text-gray-700" : "text-gray-300"}
                `}>
                  {current.desc}
                </p>
                <div className="flex flex-wrap gap-1.5 md:gap-2 mt-auto">
                  {(current.type || []).slice(0, 3).map(t => (
                    <Tag key={`t-${t}`} label={t} type="type" colorCodeFunc={colorCodeFunc} />
                  ))}
                  {(current.language || []).slice(0, 4).map(l => (
                    <Tag key={`l-${l}`} label={l} type="language" colorCodeFunc={colorCodeFunc} />
                  ))}
                </div>
              </div>
            </Link>
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows */}
        {projects.length > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              className={`
                absolute left-0 md:-left-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full
                border-2 flex items-center justify-center transition-all shadow-lg z-10
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
                absolute right-0 md:-right-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full
                border-2 flex items-center justify-center transition-all shadow-lg z-10
                ${arrowBg}
              `}
              aria-label="Next project"
            >
              →
            </button>
          </>
        )}
      </div>

      {/* 5. Pagination dots shrink-0 */}
      {projects.length > 1 && (
        <div className="shrink-0 flex justify-center gap-2 mt-3 md:mt-4">
          {projects.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => goTo(idx)}
              className={`
                h-2 rounded-full transition-all
                ${idx === currentIdx
                  ? isWarmthMode ? "w-6 md:w-8 bg-[#E94E41]" : "w-6 md:w-8 bg-cyan-400"
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