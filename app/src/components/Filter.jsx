import filterIcon from '../assets/images/filter.png';
import Tag from './Tag';
import { useTheme } from '../hooks/themeContext.jsx';

/* Defines the Filter Component 
 *
 * filters param is an array of currently selected filters
 * setFilters modifies the filter array through appending
 * filterOpen indicates if the filter menu is open
 * setFilterOpen modifies the filterOpen state when on hover/click
 */
export default function Filter({
  filters, setFilters, filterOpen, setFilterOpen,
  filterSections, setCurrentPage,
}) {
  const { isWarmthMode } = useTheme();

  const toggleCategory = (category) => {
    setFilters((prev) => {
      const categories = prev.category.includes(category)
        ? prev.category.filter((c) => c !== category)
        : [...prev.category, category];
      return { ...prev, category: categories };
    });
  };

  // Same color logic as Card/Events
  const colorCodeFunc = (type, label) => {
  const t = type?.toLowerCase();
  const l = label?.toLowerCase();

  // Handle project categories (types)
  if (t === "type") {
    switch (l) {
      case "ai/ml":
        return { bg: isWarmthMode ? "#E0F7FA" : "#1c2a2f", text: isWarmthMode ? "#006064" : "#0ff" };
      case "hardware":
        return { bg: isWarmthMode ? "#FEF3C7" : "#3b2f1c", text: isWarmthMode ? "#78350F" : "#ff0" };
      case "software":
        return { bg: isWarmthMode ? "#E0F2FE" : "#2c2d3f", text: isWarmthMode ? "#0369a1" : "#0ff" };
      default:
        return { bg: isWarmthMode ? "#CCF9F0" : "#2d3c45", text: isWarmthMode ? "#166534" : "#0f0" };
    }
  }

  // Handle languages
  if (t === "language") {
    switch (l) {
      case "c":
      case "c++":
        return { bg: isWarmthMode ? "#E0F2FE" : "#2c2d3f", text: isWarmthMode ? "#0369a1" : "#0ff" };
      case "java":
        return { bg: isWarmthMode ? "#FEF3C7" : "#3b2f1c", text: isWarmthMode ? "#78350F" : "#ff0" };
      case "python":
        return { bg: isWarmthMode ? "#E0F2F1" : "#1f2a2f", text: isWarmthMode ? "#065f46" : "#0f0" };
      case "javascript":
        return { bg: isWarmthMode ? "#FEF9C3" : "#3b351f", text: isWarmthMode ? "#78350F" : "#ff0" };
      case "html":
        return { bg: isWarmthMode ? "#FFE6E6" : "#3a1f1f", text: isWarmthMode ? "#b91c1c" : "#f0f" };
      case "css":
        return { bg: isWarmthMode ? "#DBEAFE" : "#1e2c3b", text: isWarmthMode ? "#1e40af" : "#0ff" };
      case "dart":
        return { bg: isWarmthMode ? "#E0F7FA" : "#1c2a2f", text: isWarmthMode ? "#006064" : "#0ff" };
      case "shell":
        return { bg: isWarmthMode ? "#F3F4F6" : "#2a2a2a", text: isWarmthMode ? "#374151" : "#fff" };
      default:
        return { bg: isWarmthMode ? "#F3F4F6" : "#2a2a2a", text: isWarmthMode ? "#1F2937" : "#fff" };
    }
  }

  switch (type?.toLowerCase()) {
    case "professional": return { bg: isWarmthMode ? "#E6F9F0" : "#0b1e13", text: isWarmthMode ? "#16A34A" : "#0f0" };
    case "personal":     return { bg: isWarmthMode ? "#E8F0FF" : "#0a1a2f", text: isWarmthMode ? "#1F51FF" : "#04D9FF" };
    case "projects":     return { bg: isWarmthMode ? "#FFFBE6" : "#332600", text: isWarmthMode ? "#D97706" : "#FF5F1F" };
    case "research":     return { bg: isWarmthMode ? "#F3E8FF" : "#1a0f2e", text: isWarmthMode ? "#7C3AED" : "#a0f" };
    default:             return { bg: isWarmthMode ? "#F3F4F6" : "#121212", text: isWarmthMode ? "#1F2937" : "#fff" };
  }
};

  return (
    <div
      className="relative"
      onMouseEnter={() => setFilterOpen(true)}
      onMouseLeave={() => setFilterOpen(false)}
      tabIndex={0}
    >
      <img
        src={filterIcon}
        alt="Filter Icon"
        className={`
          w-7 h-7 cursor-pointer transition-all duration-150
          ${isWarmthMode
            ? "filter-none"
            : "invert drop-shadow-[0_0_3px_#00eaff99]"}
        `}
        aria-label="Filter"
        tabIndex={0}
      />

      {filterOpen && (
        <div
          className={`
            absolute right-0 mt-0.5 w-72 z-40 flex flex-col p-4
            rounded-2xl shadow-2xl border
            transition-all duration-200
            ring-1 ${isWarmthMode ? "ring-[#FFD7B5]/40" : "ring-cyan-600/30"}
            ${isWarmthMode
              ? "bg-[#fffaf7] border-[#E94E41] backdrop-blur-sm"
              : "bg-gradient-to-br from-[#1a1f2e]/95 to-[#161921]/95 border-cyan-700 backdrop-blur-xl"
            }
          `}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="filter-menu"
        >
          {filterSections.map((section, idx) => (
            <div key={idx} className="flex flex-col mt-5 first:mt-0">
              <span className={`
                font-bold mb-2 w-full text-center border-b pb-1 tracking-wide
                ${isWarmthMode
                  ? "text-[#E94E41] border-gray-200"
                  : "text-cyan-200 border-cyan-800"
                }
              `}>
                {section.title}
              </span>
              <div className="flex flex-wrap gap-2">
                {section.options.map((option) => (
                  <label key={option.label} className="flex items-center space-x-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={filters.category.includes(option.label)}
                      onChange={() => {
                        toggleCategory(option.label);
                        if (setCurrentPage) setCurrentPage(1);
                      }}
                      className={`
                        transition accent-blue-600
                        rounded-md
                        focus:ring-2 focus:ring-offset-1
                        ${isWarmthMode
                          ? "accent-[#E94E41] focus:ring-[#fae3e3]"
                          : "accent-cyan-400 focus:ring-cyan-800"}
                      `}
                    />
                    <Tag 
                      label={option.label} 
                      type={option.type} 
                      colorCodeFunc={colorCodeFunc} 
                    />
                  </label>
                ))}
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={() => setFilters({ ...filters, category: [] })}
            className={`
              mt-6 bg-none border font-medium rounded-lg px-4 py-1.5 text-sm transition-all w-fit mx-auto
              hover:drop-shadow
              ${isWarmthMode
                ? "border-[#E94E41] text-[#E94E41] hover:bg-[#E94E41]/10"
                : "border-cyan-400 text-cyan-200 hover:bg-cyan-900/70"}
            `}
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
