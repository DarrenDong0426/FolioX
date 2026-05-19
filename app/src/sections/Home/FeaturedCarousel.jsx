import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../hooks/themeContext';
import Tag from '../../components/Tag';
import { useTagColor } from '../../components/TagColor.jsx';

const AUTO_ADVANCE_MS = 7000;

function LoadingSpinner({ isWarmthMode }) {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-3 py-8">
      <div className={`w-10 h-10 rounded-full border-4 border-t-transparent animate-spin ${isWarmthMode ? "border-[#E94E41]" : "border-cyan-400"}`} />
      <p className={`text-sm ${isWarmthMode ? "text-gray-500" : "text-cyan-500"}`}>
        Loading featured projects...
      </p>
    </div>
  );
}

function NoDemoPanel({ isWarmthMode }) {
  return (
    <div className={`w-full md:w-1/2 flex-shrink-0 flex flex-col items-center justify-center gap-3 p-6 ${isWarmthMode ? "bg-pink-50" : "bg-cyan-900/30"}`}>
      <div className={`text-5xl font-mono opacity-20 select-none ${isWarmthMode ? "text-[#E94E41]" : "text-cyan-400"}`}>
        {"{ }"}
      </div>
      <span className={`text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full border ${isWarmthMode ? "border-[#E94E41]/40 text-[#E94E41]/60 bg-[#E94E41]/5" : "border-cyan-700 text-cyan-500 bg-cyan-900/20"}`}>
        No Demo Available
      </span>
    </div>
  );
}

function getDemoBlock(project) {
  const blocks = project.content_blocks || [];
  return blocks.find(b => b.type === 'demo') || null;
}

function buildSrcDoc(block) {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  body { margin: 0; padding: 1rem; font-family: -apple-system, BlinkMacSystemFont, sans-serif; }
  ${block.css || ''}
</style>
</head>
<body>
  ${block.html || ''}
  <script>
    try {
      ${block.js || ''}
    } catch (err) {
      document.body.innerHTML = '<pre style="color:red;padding:1rem;">' + err.toString() + '</pre>';
    }
  </script>
</body>
</html>`.trim();
}

export default function FeaturedCarousel() {
  const { isWarmthMode } = useTheme();
  const colorCodeFunc = useTagColor();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    fetch('/api/projects/featured')
      .then(res => res.json())
      .then(data => {
        setProjects(data.projects || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load featured projects:', err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (projects.length <= 1 || isPaused) return;
    timerRef.current = setTimeout(() => {
      setCurrentIdx((prev) => (prev + 1) % projects.length);
    }, AUTO_ADVANCE_MS);
    return () => clearTimeout(timerRef.current);
  }, [currentIdx, projects.length, isPaused]);

  const goTo = (idx) => { clearTimeout(timerRef.current); setCurrentIdx(idx); };
  const goPrev = () => goTo((currentIdx - 1 + projects.length) % projects.length);
  const goNext = () => goTo((currentIdx + 1) % projects.length);

  const cardBg = isWarmthMode ? "bg-white/90 border-[#E94E41]" : "bg-[#151C26]/90 border-cyan-700";
  const arrowBg = isWarmthMode
    ? "bg-white/80 hover:bg-white text-[#E94E41] border-[#E94E41]"
    : "bg-[#0a0e27]/80 hover:bg-[#0a0e27] text-cyan-400 border-cyan-500";

  return (
    <div className="w-full max-w-5xl mx-auto px-4 md:px-6 flex flex-col h-full min-h-0 justify-center">

      {/* Header */}
      <div className="shrink-0 mb-1">
        <h2 className={`text-lg md:text-2xl font-bold text-center ${isWarmthMode ? "text-[#E94E41]" : "text-cyan-300"}`}>
            Featured Work
        </h2>
        <p className={`text-center text-xs ${isWarmthMode ? "text-gray-600" : "text-cyan-400"}`}>
            A rotating look at projects worth highlighting.
        </p>
    </div>

      {loading && <LoadingSpinner isWarmthMode={isWarmthMode} />}

      {!loading && projects.length > 0 && (
        <>
          <div
            className="relative flex-1 min-h-0 w-full"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <AnimatePresence mode="wait">
              {(() => {
                const current = projects[currentIdx];
                const demoBlock = getDemoBlock(current);
                const srcDoc = demoBlock ? buildSrcDoc(demoBlock) : null;

                return (
                  <motion.div
                    key={current.id}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <Link
                      to={`/Projects/${current.id}`}
                      className={`flex flex-col md:flex-row w-full max-h-full rounded-2xl border-2 shadow-xl overflow-hidden hover:scale-[1.01] transition-transform duration-300 ${cardBg}`}
                    >
                      {/* Left: demo or fallback */}
                      {srcDoc ? (
                        <div className="w-full md:w-1/2 flex-shrink-0 min-h-[160px] md:min-h-0 overflow-hidden">
                          <iframe
                            srcDoc={srcDoc}
                            sandbox="allow-scripts"
                            className="w-full h-full border-0 pointer-events-none"
                            style={{ background: 'white' }}
                            title={`${current.name} demo`}
                          />
                        </div>
                      ) : (
                        <NoDemoPanel isWarmthMode={isWarmthMode} />
                      )}

                      {/* Right: text */}
                      <div className="w-full md:w-1/2 p-4 md:p-6 flex flex-col justify-center min-h-0 overflow-y-auto">
                        <div className={`text-[10px] md:text-xs uppercase tracking-widest mb-1 opacity-70 ${isWarmthMode ? "text-[#E94E41]" : "text-cyan-400"}`}>
                          {current.month_year}
                        </div>
                        <h3 className={`text-xl md:text-2xl font-bold mb-2 ${isWarmthMode ? "text-[#264653]" : "text-cyan-200"}`}>
                          {current.name}
                        </h3>
                        <p className={`text-xs md:text-sm mb-3 line-clamp-2 ${isWarmthMode ? "text-gray-700" : "text-gray-300"}`}>
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
                );
              })()}
            </AnimatePresence>

            {projects.length > 1 && (
              <>
                <button type="button" onClick={goPrev} aria-label="Previous project"
                  className={`absolute left-0 md:-left-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full border-2 flex items-center justify-center transition-all shadow-lg z-10 ${arrowBg}`}>
                  ←
                </button>
                <button type="button" onClick={goNext} aria-label="Next project"
                  className={`absolute right-0 md:-right-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full border-2 flex items-center justify-center transition-all shadow-lg z-10 ${arrowBg}`}>
                  →
                </button>
              </>
            )}
          </div>

          {projects.length > 1 && (
            <div className="shrink-0 flex justify-center gap-2 mt-3 md:mt-4">
              {projects.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => goTo(idx)}
                  className={`h-2 rounded-full transition-all ${idx === currentIdx
                    ? isWarmthMode ? "w-6 md:w-8 bg-[#E94E41]" : "w-6 md:w-8 bg-cyan-400"
                    : isWarmthMode ? "w-2 bg-gray-300" : "w-2 bg-cyan-700"
                  }`}
                  aria-label={`Go to project ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}