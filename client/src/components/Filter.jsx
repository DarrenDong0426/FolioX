// Imports
import filterIcon from '../assets/images/filter.png';                   // Import filter icon image 
import Tag from './Tag';                                                // Import Tag component   

/* Defines the Filter Component 
 *
 * Options param sets array of options that a user can choose from
 * dropDown param is the current value of the dropDown menu
 * setDropDown param is a function to modify the dropDown param
 * isOpen param is a flag to indicate if a dropdown menu is open
 * setIsOpen param is a function to modify the isOpen param
 *  
*/
export default function Filter( {filters, setFilters, filterOpen, setFilterOpen }) {

    const toggleCategory = (category) => {
    setFilters((prev) => {
      const categories = prev.category.includes(category)
        ? prev.category.filter((c) => c !== category) 
        : [...prev.category, category]; 
      return { ...prev, category: categories };
    });
  };

  return (
    <aside>
      <div 
        onMouseEnter={() => setFilterOpen(true)}
        onMouseLeave={() => setFilterOpen(false)}>
        <img
          src={filterIcon}
          alt="Filter Icon"
          className="w-6 h-6 cursor-pointer"
          />
        {filterOpen && (
          <div
              className="absolute w-1/6 bg-white border border-gray-200 rounded shadow-lg z-10 flex flex-col p-3"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
            <div className="flex flex-col space-y-2">
                <span className="font-semibold mb-1 w-full text-center border-b border-gray-300">Project Category</span>
                <div className='flex flex-wrap gap-2'>
                  <label className='flex items-center space-x-2"'>
                    <input
                      type="checkbox"
                      checked={filters.category.includes("AI/ML")}
                      onChange={() => toggleCategory("AI/ML")}
                      />
                      <Tag label="AI/ML" type="type" />
                  </label>
                  <label className='flex items-center space-x-2"'>
                    <input
                      type="checkbox"
                      checked={filters.category.includes("Hardware")}
                      onChange={() => toggleCategory("Hardware")}
                      />
                      <Tag label="Hardware" type="type" />
                  </label>
                  <label className='flex items-center space-x-2"'>
                    <input
                      type="checkbox"
                      checked={filters.category.includes("Software")}
                      onChange={() => toggleCategory("Software")}
                      />
                    <Tag label="Software" type="type" />
                  </label>
              </div>
            </div >
            <div className="flex flex-col mt-4">
                <span className="font-semibold mb-1 w-full text-center border-b border-gray-300">Languages</span>
                <div className='flex flex-wrap gap-2'>
                  <label className='flex items-center space-x-2"'>
                    <input
                      type="checkbox"
                      checked={filters.category.includes("C")}
                      onChange={() => toggleCategory("C")}
                      />
                    <Tag label="C" type="language" />
                  </label>

                  <label className='flex items-center space-x-2"'>
                    <input
                      type="checkbox"
                      checked={filters.category.includes("C++")}
                      onChange={() => toggleCategory("C++")}
                      />
                    <Tag label="C++" type="language" />
                  </label>

                  <label className='flex items-center space-x-2"'>
                    <input
                      type="checkbox"
                      checked={filters.category.includes("CSS")}
                      onChange={() => toggleCategory("CSS")}
                      />
                    <Tag label="CSS" type="language" />
                  </label>

                  <label className='flex items-center space-x-2"'>
                    <input
                      type="checkbox"
                      checked={filters.category.includes("Dart")}
                      onChange={() => toggleCategory("Dart")}
                      />
                    <Tag label="Dart" type="language" />
                  </label>

                  <label className='flex items-center space-x-2"'>
                    <input
                      type="checkbox"
                      checked={filters.category.includes("HTML")}
                      onChange={() => toggleCategory("HTML")}
                      />
                    <Tag label="HTML" type="language" />
                  </label>

                  <label className='flex items-center space-x-2"'>
                    <input
                      type="checkbox"
                      checked={filters.category.includes("Java")}
                      onChange={() => toggleCategory("Java")}
                      />
                    <Tag label="Java" type="language" />
                  </label>
                      
                  <label className='flex items-center space-x-2"'>
                    <input
                      type="checkbox"
                      checked={filters.category.includes("JavaScript")}
                      onChange={() => toggleCategory("JavaScript")}
                      />
                    <Tag label="JavaScript" type="language" />
                  </label>

                  <label className='flex items-center space-x-2"'>
                    <input
                      type="checkbox"
                      checked={filters.category.includes("Python")}
                      onChange={() => toggleCategory("Python")}
                      />
                    <Tag label="Python" type="language" />
                  </label>

                  <label className='flex items-center space-x-2"'>
                    <input
                      type="checkbox"
                      checked={filters.category.includes("Shell")}
                      onChange={() => toggleCategory("Shell")}
                      />
                    <Tag label="Shell" type="language" />
                  </label>
                  
                  
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
