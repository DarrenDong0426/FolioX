// Imports
import Dropdown from '../../components/Dropdown';               // Import Dropdown component
import Filter from '../../components/Filter';                   // Import Filter component
import SearchBar from '../../components/SearchBar';             // Import SearchBar component  
import { useProjects } from '../../hooks/projectListContext';   // Import useProjects hook
import { useTheme } from '../../hooks/themeContext.jsx';        // Import theme context

/* Defines the Controls section component
 *
 * Calls the search bar component
 * Calls the legend box component
 * Calls the filter option component
 * 
*/
export default function Controls() {

  // Get query, pagination, and dropdown states from useProjects 
  const { query, setQuery, setCurrentPage, options, dropDown, setDropDown, isOpen, setIsOpen, filters, setFilters, filterOpen, setFilterOpen } = useProjects();
  const { isWarmthMode } = useTheme(); // Get theme from context

  // ColorCode Function for filter tags/labels/icons (theme-aware!)
  function colorCodeFunc(type) {
    // Use theme-adaptive backgrounds & text
    if (type === "type") {
      return isWarmthMode
        ? "bg-blue-100 text-blue-800 border-blue-300"
        : "bg-cyan-900 text-cyan-100 border-cyan-700";
    } else {
      return isWarmthMode
        ? "bg-green-100 text-green-800 border-green-300"
        : "bg-green-900 text-green-100 border-green-700";
    }
  }

  // Define the sections and options for filter with theme-aware types
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
      rounded-xl shadow border
      transition-colors duration-500
      ${isWarmthMode
        ? "bg-[#FFF8F3]/60 border-[#E94E41]"
        : "bg-[#172230]/90 border-cyan-700"
      }
    `}>
      {/* Div: Context wrapper for control section of Projects page
        * flex, flex-wrap, items-center, justify-between for layout
        * rounded-xl, shadow, border, bg: theme-adaptive appearance
      */}
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