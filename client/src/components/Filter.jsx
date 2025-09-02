// Imports
import filterIcon from '../assets/images/filter.png';                   // Import filter icon image 
import Tag from './Tag';                                                // Import Tag component   

/* Defines the Filter Component 
 *
 * filters param is a array of currently selected filter
 * setFilters param modifies the filter array through appending
 * filterOpen param indicates if the filter menu is open
 * setFilterOpen param modifies the filterOpen state when on hover
 *  
*/
export default function Filter( {filters, setFilters, filterOpen, setFilterOpen, filterSections }) {

    {/* Toggle Category function
        *   
        * Function to add or remove a category from the filter array
        * category param is the category to be added or removed
        * Ternary operator checks if the category is already in the filter array
        * If it is, it removes it from the filter array
        * If it is not, it adds it to the filter array via spread operator
        * 
      */}
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
      onMouseEnter={() => setFilterOpen(true)}
      onMouseLeave={() => setFilterOpen(false)}
    >
      {/* Div: Context wrapper over entire filter component
          * 
          * onMouseEnter calls the setFilterOpen function to open the filter menu on hover
          * onMouseLeave calls the setFilterOpen function to close the filter menu when not hover
          * 
        */}
      <img
        src={filterIcon}
        alt="Filter Icon"
        className="w-6 h-6 cursor-pointer"
      />
      {/* Img: filter icon image
          * 
          * w-6 sets the width of the image to 0.25rem * 6 = 1.5rem
          * h-6 sets the height of the image to 0.25rem * 6 = 1.5rem
          * cursor-pointer changes the cursor to a pointer when hovering over the image
          * 
        */}
      {filterOpen && (
        <div
          className="absolute w-1/6 bg-white border border-gray-200 rounded shadow-lg z-10 flex flex-col p-3"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          {/* Div: Context wrapper over the filter menu if filterOpen is true
            * 
            * absolute sets the position to be asolute relatied to the nearested positioned ancestor
            * w-1/6 sets the width to be 1/6 of the parent container
            * bg-white sets the background color to white
            * border adds a 1pm border to the div
            * border-gray-200 sets the border color to gray-200
            * rounded makes the corner of the div rounded
            * shadow-lg adds a large shadow to the div in all directions
            * z-10 sets the z-index to 10 to ensure it is above other elements
            * flex sets the format as flexbox for children components
            * flex-col sets the flex direction to column so children item stack vertically
            * p-3 adds padding of 0.25rm * 3 = 0.75rem in all directions
            * role="menu" indicates that this div is a menu for accessibility
            * aria-orientation="vertical" indicates that the menu is vertical for accessibility
            * aria-labelledby="options-menu" associates the menu with a label for accessibility
            * 
          */}
          {filterSections.map((section, idx) => (
            <div key={idx} className="flex flex-col mt-4 first:mt-0">
              {/* Div: Context wrapper over different sections of the filter menu
                * 
                * flex sets the format as flexbox for children components
                * flex-col sets the flex direction to column so children item stack vertically
                * mt-4 adds a top margin of 4 * 0.25rem = 1rem
                * first:mt-0 makes the first item in the map to have a top margin of 0rem
                * 
              */}
              <span className="font-semibold mb-1 w-full text-center border-b border-gray-300">
                {section.title}
              </span>
              {/* Span: Title for the project category section (same format for language section below)
                * 
                * font-semibold sets the font weight to semibold
                * mb-1 adds a bottom margin of 0.25rem * 1 = 0.25rem
                * w-full sets the width to be the full width of the parent container
                * text-center centers the text horizontally
                * border-b adds a bottom border to the span
                * border-gray-300 sets the border color to gray-300
                * 
              */}
              {/* Section options */}
              <div className="flex flex-wrap gap-2">
                {/* Div: Context wrapper over the different category options
                  * 
                  * flex sets the format as flexbox for children components
                  * flex-wrap allows children components to wrap to the next line if necessary
                  * gap-2 adds a gap of 0.25rem * 2 = 0.5rem in all directions between children components
                  * 
                */}
                {section.options.map((option) => (
                  <label key={option} className="flex items-center space-x-2">
                    {/* Label: Context wrapper over each category option (same format for all options)
                      * 
                      * flex sets the format as flexbox for children components
                      * items-center aligns children item perpendicular to the axis (vertical here)
                      * space-x-2 adds a horizontal space of 0.25rem * 2 = 0.5rem between children components
                      * 
                    */}
                    <input
                      type="checkbox"
                      checked={filters.category.includes(option)}
                      onChange={() => toggleCategory(option)}
                    />
                    <Tag label={option} type={section.type} />
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
