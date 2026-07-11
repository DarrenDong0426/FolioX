import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../hooks/themeContext";

const NAV_LINKS = [
  { to: "/Projects", label: "Projects" },
  { to: "/Documents", label: "Documents" },
  { to: "/Timeline", label: "Timeline" },
  { to: "/FAQs", label: "FAQs" },
  { to: "/Changelog", label: "Changelog" },
];

export default function Header() {
  const { isWarmthMode, setIsWarmthMode } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const clickCount = useRef(0);
  const clickTimer = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleLogoClick = (e) => {
    clickCount.current += 1;

    clearTimeout(clickTimer.current);
    clickTimer.current = setTimeout(() => {
      clickCount.current = 0;
    }, 600);

    if (clickCount.current === 3) {
      e.preventDefault();
      clickCount.current = 0;
      navigate("/admin/login");
    }
  };

  const navLinkClass = `
    text-sm lg:text-base font-medium 
    font-sans 
    tracking-wide uppercase
    px-2 py-1 rounded transition-colors duration-200
    ${
      isWarmthMode
        ? "text-[#39536B] hover:text-[#E94E41] hover:bg-[#ffe2ed]/60"
        : "text-cyan-200 hover:text-white hover:bg-[#044064]/60"
    }
  `;

  const mobileNavLinkClass = `
    text-lg font-medium font-sans tracking-wide uppercase
    px-4 py-3 rounded transition-colors duration-200 block
    ${
      isWarmthMode
        ? "text-[#39536B] hover:text-[#E94E41] hover:bg-[#ffe2ed]/60"
        : "text-cyan-200 hover:text-white hover:bg-[#044064]/60"
    }
  `;

  const themeToggle = (
    <button
      onClick={() => setIsWarmthMode(!isWarmthMode)}
      aria-pressed={!isWarmthMode}
      className={`
        relative w-16 h-8 flex items-center rounded-full border-2 overflow-hidden
        transition-colors duration-300 focus:outline-none flex-shrink-0
        ${
          isWarmthMode
            ? "bg-gradient-to-r from-[#FFE2ED] to-[#FAF3E3] border-[#e94e41]"
            : "bg-gradient-to-l from-[#073047] to-[#222B3A] border-cyan-500"
        }
        p-0
      `}
      tabIndex={0}
      title={isWarmthMode ? "Switch to Tech Mode" : "Switch to Warmth Mode"}
    >
      <span className="absolute left-1 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center pointer-events-none">
        <svg
          className={`w-5 h-5 transition-opacity duration-300 ${isWarmthMode ? "opacity-60" : "opacity-100"}`}
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M17.75 15.61A7.5 7.5 0 0 1 8.39 6.25c.28 0 .36-.37.12-.49A7.501 7.501 0 1 0 18.24 16.37c-.13-.13-.5-.16-.49.12Z"
            fill="#7DE3FC"
          />
        </svg>
      </span>

      <span className="absolute right-1 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center pointer-events-none">
        <svg
          className={`w-5 h-5 transition-opacity duration-300 ${isWarmthMode ? "opacity-100" : "opacity-60"}`}
          viewBox="0 0 24 24"
          fill="none"
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

      <span
        className={`
          absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full shadow-md flex items-center justify-center
          border-2 z-10 bg-white transition-all duration-300
          ${
            isWarmthMode ? "right-0 border-[#E94E41]" : "left-0 border-cyan-600"
          }
        `}
      >
        {isWarmthMode ? (
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
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
            <path
              d="M17.75 15.61A7.5 7.5 0 0 1 8.39 6.25c.28 0 .36-.37.12-.49A7.501 7.501 0 1 0 18.24 16.37c-.13-.13-.5-.16-.49.12Z"
              fill="#7DE3FC"
            />
          </svg>
        )}
      </span>
    </button>
  );

  return (
    <header
      className={`
      sticky top-0 z-50
      ${
        isWarmthMode
          ? "bg-[#FAF3E3] border-b-4 border-[#E94E41] shadow-xl"
          : "bg-neutral-900 border-b-4 border-cyan-500 shadow-xl"
      }
      backdrop-blur-md
      transition-colors duration-300
    `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 lg:py-3 flex items-center justify-between gap-2">
        <Link
          to="/"
          onClick={handleLogoClick}
          className={`
            text-xl sm:text-2xl lg:text-3xl font-extrabold font-serif tracking-wide select-none whitespace-nowrap
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

        {/* Desktop nav — hidden below md */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6">
          {NAV_LINKS.map((link) => (
            <Link key={link.to} to={link.to} className={navLinkClass}>
              {link.label}
            </Link>
          ))}
          <div className="mx-2">{themeToggle}</div>
        </nav>

        {/* Mobile controls — hidden at md and above */}
        <div className="flex md:hidden items-center gap-2">
          {themeToggle}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className={`
              p-2 rounded transition-colors duration-200 flex-shrink-0
              ${
                isWarmthMode
                  ? "text-[#E94E41] hover:bg-[#ffe2ed]/60"
                  : "text-cyan-300 hover:bg-[#044064]/60"
              }
            `}
          >
            {menuOpen ? (
              // X icon
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              // Hamburger icon
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div
          className={`
            md:hidden border-t-2 transition-colors duration-300
            ${
              isWarmthMode
                ? "bg-[#FAF3E3] border-[#E94E41]"
                : "bg-neutral-900 border-cyan-500"
            }
          `}
        >
          <nav className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={mobileNavLinkClass}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
