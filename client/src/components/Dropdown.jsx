import { useTheme } from '../hooks/themeContext.jsx'; // Import theme context

/* Defines the Dropdown Component 
 *
 * Options param sets array of options that a user can choose from
 * dropDown param is the current value of the dropDown menu
 * setDropDown param is a function to modify the dropDown param
 * isOpen param is a flag to indicate if a dropdown menu is open
 * setIsOpen param is a function to modify the isOpen param
 *  
*/
export default function Dropdown({ options, dropDown, setDropDown, isOpen, setIsOpen }) {
  const { isWarmthMode } = useTheme();

  return (
    <div
      className="relative flex items-center space-x-2"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
        {/* Div: Context wrapper over the entire dropdown component
          *   
          * relative allows children components to be position relative to this component
          * onMouseEnter lets the dropdown menu open up on hover via setIsOpen
          * onMouseLeave lets the dropdown menu close up when not hover via setIsOpen 
          * 
        */}
      <label className={`
        font-medium transition-colors
        ${isWarmthMode ? "text-gray-700" : "text-cyan-200"}
      `}>
        {/* Label: Indicate dropdown is for sort by 
          * 
          * font-medium sets the emphasis of the text
          * color adapts by theme
          * 
        */}
        Sort By:
      </label>
      <div className="relative w-40">
        <button
          className={`
            w-full px-4 py-2 border rounded shadow text-left transition-colors duration-200
            ${isWarmthMode
              ? "bg-white border-gray-300 text-gray-900 hover:bg-gray-100"
              : "bg-[#232b39] border-cyan-900 text-cyan-100 hover:bg-cyan-900"
            }
          `}
        >
          {dropDown}
        </button>
        {isOpen && (
          <div
            className={`
              absolute w-full border rounded shadow-lg z-10 flex flex-col
              transition-colors duration-200
              ${isWarmthMode
                ? "bg-white border-gray-200"
                : "bg-[#192534] border-cyan-700"
              }
            `}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {options
              .filter(option => option !== dropDown)
              .map(option => (
                <button
                  key={option}
                  className={`
                    w-full px-4 py-2 text-left transition-colors
                    ${isWarmthMode
                      ? "text-gray-800 hover:bg-gray-100"
                      : "text-cyan-100 hover:bg-cyan-800"
                    }
                  `}
                  onClick={() => setDropDown(option)}
                >
                  {option}
                </button>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
