// Imports
import Dropdown from '../../components/Dropdown';
import Filter from '../../components/Filter';
import SearchBar from '../../components/SearchBar';
import { useProjects } from '../../hooks/projectListContext';
import { useTheme } from '../../hooks/themeContext.jsx';

/* Defines the Controls section component
 *
 * Calls the search bar, dropdown, and filter components
 */
export default function Controls() {
  const { 
    query, setQuery, setCurrentPage, 
    options, dropDown, setDropDown, 
    isOpen, setIsOpen, filters, setFilters, 
    filterOpen, setFilterOpen 
  } = useProjects();

  const { isWarmthMode } = useTheme();

  // Unified theme-aware color function for tags/filters
  function colorCodeFunc(type, label) {
    switch ((type || label)?.toLowerCase()) {
      case "academics": 
        return { bg: isWarmthMode ? "#FFE6CC" : "#0f1120", text: isWarmthMode ? "#3B185F" : "#0ff" };
      case "professional": 
        return { bg: isWarmthMode ? "#CCF9F0" : "#10141c", text: isWarmthMode ? "#166534" : "#0f0" };
      case "personal": 
        return { bg: isWarmthMode ? "#FFE0EB" : "#1a0d1f", text: isWarmthMode ? "#BE185D" : "#f0f" };
      case "projects": 
        return { bg: isWarmthMode ? "#FFF9CC" : "#1c1a10", text: isWarmthMode ? "#78350F" : "#ff0" };
      case "research": 
        return { bg: isWarmthMode ? "#EAE8FF" : "#100f1e", text: isWarmthMode ? "#6B21A8" : "#a0f" };
      case "type": 
        return { bg: isWarmthMode ? "#CCF9F0" : "#10141c", text: isWarmthMode ? "#166534" : "#0f0" };
      case "language": 
        return { bg: isWarmthMode ? "#FFE6CC" : "#1c1a10", text: isWarmthMode ? "#78350F" : "#ff0" };
      default: 
        return { bg: isWarmthMode ? "#F3F4F6" : "#101010", text: isWarmthMode ? "#1F2937" : "#fff" };
    }
  }

  // Filter sections
  const filterSections = [
    {
      title: "Project Category",
      options: [
        { label: "AI/ML", type: "type" },
        { label: "Hardware", type: "type" },
        { label: "Software", type: "type" }
      ],
    },
    {
      title: "Languages",
      options: [
        { label: "C", type: "language" },
        { label: "C++", type: "language" },
        { label: "CSS", type: "language" },
        { label: "Dart", type: "language" },
        { label: "HTML", type: "language" },
        { label: "Java", type: "language" },
        { label: "JavaScript", type: "language" },
        { label: "Python", type: "language" },
        { label: "Shell", type: "language" }
      ]
    }
  ];

  return (
    <div className={`
      flex flex-wrap items-center justify-between w-full max-w-4xl mx-auto mb-3 gap-4 px-4
      rounded-xl shadow border transition-colors duration-500
      ${isWarmthMode
        ? "bg-[#FFF8F3]/60 border-[#E94E41]"
        : "bg-[#101727]/90 border-cyan-700"
      }
    `}>
      <div className="flex-1">
        <SearchBar
          query={query}
          setQuery={setQuery}
          setCurrentPage={setCurrentPage}
        />
      </div>

      <Dropdown
        options={options}
        dropDown={dropDown}
        setDropDown={setDropDown}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      <Filter 
        filters={filters}
        setFilters={setFilters}
        filterOpen={filterOpen}
        setFilterOpen={setFilterOpen}
        filterSections={filterSections}
        setCurrentPage={setCurrentPage}
        colorCode={colorCodeFunc}
      />
    </div>
  );
}
