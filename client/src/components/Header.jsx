import { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from React-router-DOM to link certain component to a path
import { useTheme } from '../hooks/themeContext'; // Adjust path as needed

/* 
 * Defines the Header Component 
 *
 * A reusable component that links elements to certain parts of the site
 *
 * This component will be rendered on top of all pages as a way for user to navigate 
 * 
 */
export default function Header() {
  // Controls the theme mode state: true = warmth, false = tech
  const { isWarmthMode, setIsWarmthMode } = useTheme();

  return (
    <header className={`
      sticky top-0 z-50
      ${isWarmthMode
        ? "bg-[#FAF3E3] border-b-4 border-[#E94E41] shadow-xl"
        : "bg-neutral-900 border-b-4 border-cyan-500 shadow-xl"
      }
      backdrop-blur-md
      transition-colors duration-300
    `}>
      <div className="max-w-7xl mx-auto px-6 py-2 lg:py-3 flex items-center justify-between">
        {/* Brand/Logo Link (refined, elegant) */}
        <Link 
          to="/"
          className={`
            text-2xl lg:text-3xl font-extrabold font-serif tracking-wide select-none
            ${isWarmthMode ? "text-[#E94E41] hover:text-[#264653]" : "text-cyan-400 hover:text-white"}
            transition-colors duration-200
            drop-shadow-sm
          `}
          style={{
            fontFamily: `'Noto Serif JP', serif`,
          }}
        >
          Darren Dong
        </Link>

        {/* Navigation Bar with Toggle to the Right */}
        <nav className="flex items-center gap-4 lg:gap-6">
          <Link 
            to="/Projects"
            className={`
              text-sm lg:text-base font-medium 
              font-sans 
              tracking-wide uppercase
              px-2 py-1 rounded transition-colors duration-200
              ${isWarmthMode
                ? "text-[#39536B] hover:text-[#E94E41] hover:bg-[#ffe2ed]/60"
                : "text-cyan-200 hover:text-white hover:bg-[#044064]/60"}
            `}
          >Projects</Link>
          <Link 
            to="/Documents"
            className={`
              text-sm lg:text-base font-medium 
              font-sans 
              tracking-wide uppercase
              px-2 py-1 rounded transition-colors duration-200
              ${isWarmthMode
                ? "text-[#39536B] hover:text-[#E94E41] hover:bg-[#ffe2ed]/60"
                : "text-cyan-200 hover:text-white hover:bg-[#044064]/60"}
            `}
          >Documents</Link>
          <Link 
            to="/Timeline"
            className={`
              text-sm lg:text-base font-medium 
              font-sans 
              tracking-wide uppercase
              px-2 py-1 rounded transition-colors duration-200
              ${isWarmthMode
                ? "text-[#39536B] hover:text-[#E94E41] hover:bg-[#ffe2ed]/60"
                : "text-cyan-200 hover:text-white hover:bg-[#044064]/60"}
            `}
          >Timeline</Link>
          <Link 
            to="/FAQs"
            className={`
              text-sm lg:text-base font-medium 
              font-sans 
              tracking-wide uppercase
              px-2 py-1 rounded transition-colors duration-200
              ${isWarmthMode
                ? "text-[#39536B] hover:text-[#E94E41] hover:bg-[#ffe2ed]/60"
                : "text-cyan-200 hover:text-white hover:bg-[#044064]/60"}
            `}
          >FAQs</Link>
          <Link 
            to="/Changelog"
            className={`
              text-sm lg:text-base font-medium 
              font-sans 
              tracking-wide uppercase
              px-2 py-1 rounded transition-colors duration-200
              ${isWarmthMode
                ? "text-[#39536B] hover:text-[#E94E41] hover:bg-[#ffe2ed]/60"
                : "text-cyan-200 hover:text-white hover:bg-[#044064]/60"}
            `}
          >Changelog</Link>

          {/* Theme Toggle Slider: Flush to edge */}
          <button
            onClick={() => setIsWarmthMode(!isWarmthMode)}
            aria-pressed={!isWarmthMode}
            className={`
              relative w-16 h-8 flex items-center rounded-full mx-2 border-2 overflow-hidden
              transition-colors duration-300 focus:outline-none
              ${isWarmthMode 
                ? "bg-gradient-to-r from-[#FFE2ED] to-[#FAF3E3] border-[#e94e41]"
                : "bg-gradient-to-l from-[#073047] to-[#222B3A] border-cyan-500"}
              p-0
            `}
            tabIndex={0}
            title={isWarmthMode ? "Switch to Tech Mode" : "Switch to Warmth Mode"}
          >
            {/* Moon icon on left in the track */}
            <span className="
              absolute left-1 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center pointer-events-none
            ">
              <svg
                className={`w-5 h-5 transition-opacity duration-300
                  ${isWarmthMode ? "opacity-60" : "opacity-100"}
                `}
                viewBox="0 0 24 24" fill="none"
              >
                <path
                  d="M17.75 15.61A7.5 7.5 0 0 1 8.39 6.25c.28 0 .36-.37.12-.49A7.501 7.501 0 1 0 18.24 16.37c-.13-.13-.5-.16-.49.12Z"
                  fill="#7DE3FC" />
              </svg>
            </span>
            {/* Sun icon on right in the track */}
            <span className="
              absolute right-1 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center pointer-events-none
            ">
              <svg
                className={`w-5 h-5 transition-opacity duration-300
                  ${isWarmthMode ? "opacity-100" : "opacity-60"}
                `}
                viewBox="0 0 24 24" fill="none"
              >
                <circle cx="12" cy="12" r="5" fill="#FFC66D" />
                <g stroke="#FFC66D" strokeWidth={2} strokeLinecap="round">
                  <line x1="12" y1="2.5" x2="12" y2="5" />
                  <line x1="12" y1="19" x2="12" y2="21.5" />
                  <line x1="4.93" y1="4.93" x2="6.76" y2="6.76" />
                  <line x1="17.24" y1="17.24" x2="19.07" y2="19.07" />
                  <line x1="2.5" y1="12" x2="5" y2="12" />
                  <line x1="19" y1="12" x2="21.5" y2="12" />
                  <line x1="4.93" y1="19.07" x2="6.76" y2="17.24" />
                  <line x1="17.24" y1="6.76" x2="19.07" y2="4.93" />
                </g>
              </svg>
            </span>
            {/* Slider knob: flush to left (tech) or right (warmth) edge */}
            <span
              className={`
                absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full shadow-md flex items-center justify-center
                border-2 z-10 bg-white transition-all duration-300
                ${isWarmthMode
                  ? "right-0 border-[#E94E41]"
                  : "left-0 border-cyan-600"}
              `}
            >
              {isWarmthMode ? (
                // Sun icon in knob for warmth mode
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
                  <circle cx="12" cy="12" r="5" fill="#FFC66D" />
                  <g stroke="#FFC66D" strokeWidth={2} strokeLinecap="round">
                    <line x1="12" y1="2.5" x2="12" y2="5" />
                    <line x1="12" y1="19" x2="12" y2="21.5" />
                    <line x1="4.93" y1="4.93" x2="6.76" y2="6.76" />
                    <line x1="17.24" y1="17.24" x2="19.07" y2="19.07" />
                    <line x1="2.5" y1="12" x2="5" y2="12" />
                    <line x1="19" y1="12" x2="21.5" y2="12" />
                    <line x1="4.93" y1="19.07" x2="6.76" y2="17.24" />
                    <line x1="17.24" y1="6.76" x2="19.07" y2="4.93" />
                  </g>
                </svg>
              ) : (
                // Moon icon in knob for tech mode
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
                  <path
                    d="M17.75 15.61A7.5 7.5 0 0 1 8.39 6.25c.28 0 .36-.37.12-.49A7.501 7.501 0 1 0 18.24 16.37c-.13-.13-.5-.16-.49.12Z"
                    fill="#7DE3FC" />
                </svg>
              )}
            </span>
          </button>
          {/*
            * Brand is elegant but not huge
            * Nav links are compact and stylish
            * Theme Toggle as before, knob flush to edge
          */}
        </nav>
      </div>
    </header>
  );
}