// Imports
import Dropdown from '../../components/Dropdown';               // Import Dropdown component from path ../../components/Dropdown
import Filter from '../../components/Filter';                   // Import Filter component from path ../../components/Filter
import SearchBar from '../../components/SearchBar';             // Import SearchBar component from path ../../components/SearchBar  
import { useProjects } from '../../hooks/projectListContext';   // Import useProjects hook from path ../../hooks/projectListContext

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

  return (
    <div className="flex flex-wrap items-center justify-between w-full max-w-4xl mx-auto mb-6 gap-4 px-4">
        {/* Div: Context wrapper for control section of Projects page
          *  
          * flex sets the format as flexbox
          * flex-wrap allows children components to wrap to next line
          * items-center aligns children item perpendicular to the axis (vertical here)
          * justify-between puts children items at the beginning and end first and fill the middle
          * w-full allows the whole width to be taken up
          * max-w-4xl limits the max width size
          * mx-auto adds margins in the horizontal direction based on amount of space left
          * mb-6 adds a bottom margin
          * gap-4 adds a gap in all directions
          * px-4 adds padding in the horizontal direction
          * 
        */}
      <div className="flex-1">
        {/* Div: Context wrapper over the search bar 
          * 
          * flex-1 allows children components to take all extra space
          * 
        */}
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
        />
    </div>
  );
}
