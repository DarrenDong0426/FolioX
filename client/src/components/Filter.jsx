import filterIcon from '../assets/images/filter.png';
import Tag from './Tag';
import { useTheme } from '../hooks/themeContext.jsx';

/* Defines the Filter Component 
 *
 * filters param is a array of currently selected filter
 * setFilters param modifies the filter array through appending
 * filterOpen param indicates if the filter menu is open
 * setFilterOpen param modifies the filterOpen state when on hover/click
*/
export default function Filter({
  filters, setFilters, filterOpen, setFilterOpen,
  filterSections, setCurrentPage, colorCode,
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
            absolute right-0 mt-2 w-72 z-40 flex flex-col p-4
            rounded-2xl shadow-2xl border
            transition-all duration-200
            ring-1 ${isWarmthMode ? "ring-[#FFD7B5]/40" : "ring-cyan-600/20"}
            ${isWarmthMode
              ? "bg-[#fffaf7]/95 border-[#E94E41] backdrop-blur-sm"
              : "bg-gradient-to-br from-[#202234]/95 to-[#181F2A] border-cyan-700 backdrop-blur-xl"
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
                    <Tag label={option.label} type={option.type} colorCodeFunc={colorCode} />
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