import { useState, useEffect, useRef } from "react";
import { useTheme } from "../hooks/themeContext.jsx";

/**
 * Sidebar Component
 *
 * On desktop (md+): renders as a proper left sidebar with a scrollable
 * list of all documents.
 *
 * On mobile (below md): renders as a compact dropdown showing the current
 * document title, tap to see all documents in a scrollable menu.
 *
 * items — list of document objects
 * currIndex — index of the selected document
 * setCurrDoc — function to change the current index
 */
export default function Sidebar({ items, currIndex, setCurrDoc }) {
  const { isWarmthMode } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const validIndex =
    Array.isArray(items) && currIndex >= 0 && currIndex < items.length;
  const currentTitle = validIndex
    ? items[currIndex].title
    : "Select a document";

  // Close mobile dropdown when tapping outside
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [menuOpen]);

  const desktopBg = isWarmthMode
    ? "bg-[radial-gradient(ellipse_80%_60%_at_20%_10%,rgba(255,226,237,0.7)_60%,#fff8f3_100%)]"
    : "bg-[radial-gradient(ellipse_80%_60%_at_20%_10%,rgba(22,34,57,0.88)_60%,#1b2432_100%)]";

  const headingClass = isWarmthMode ? "text-[#E94E41]" : "text-cyan-300";

  const itemButton = (item, index) => (
    <button
      key={item.id}
      onClick={() => {
        setCurrDoc(index);
        setMenuOpen(false);
      }}
      className={`
        w-full text-left px-4 py-2 rounded-xl transition-colors
        ${
          index === currIndex
            ? isWarmthMode
              ? "bg-[#E94E41]/90 text-white shadow-sm"
              : "bg-cyan-700 text-cyan-50 shadow-sm"
            : isWarmthMode
              ? "bg-white hover:bg-[#ffe6ea] text-[#E94E41]"
              : "bg-[#232940] hover:bg-cyan-950 text-cyan-300"
        }
      `}
    >
      {item.title}
    </button>
  );

  return (
    <>
      {/* Desktop sidebar — hidden below md */}
      <div
        className={`
          hidden md:flex h-full w-full border-r
          ${desktopBg}
          p-4 flex-col
        `}
      >
        <h2 className={`text-xl font-semibold mb-6 ${headingClass}`}>
          Documents
        </h2>
        <div className="space-y-2 overflow-y-auto flex-1">
          {items.map((item, index) => itemButton(item, index))}
        </div>
      </div>

      {/* Mobile dropdown — hidden at md and above */}
      <div
        ref={dropdownRef}
        className={`
          md:hidden relative px-3 pt-3
        `}
      >
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-haspopup="listbox"
          className={`
            w-full flex items-center justify-between gap-2
            px-4 py-3 rounded-xl border-2 shadow-sm text-left
            transition-colors font-medium
            ${
              isWarmthMode
                ? "bg-white border-[#E94E41] text-[#E94E41]"
                : "bg-[#1b2432] border-cyan-500 text-cyan-200"
            }
          `}
        >
          <span className="flex-1 min-w-0">
            <span
              className={`
                block text-[10px] uppercase tracking-widest opacity-60 mb-0.5
              `}
            >
              Documents
            </span>
            <span className="block truncate text-base font-semibold">
              {currentTitle}
            </span>
          </span>
          <svg
            className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 ${
              menuOpen ? "rotate-180" : ""
            }`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        {menuOpen && (
          <div
            className={`
              absolute left-3 right-3 mt-2 z-40
              rounded-xl border-2 shadow-2xl overflow-hidden
              ${
                isWarmthMode
                  ? "bg-white border-[#E94E41]"
                  : "bg-[#1b2432] border-cyan-500"
              }
            `}
          >
            <div className="max-h-[60vh] overflow-y-auto p-2 space-y-1">
              {items.map((item, index) => itemButton(item, index))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
