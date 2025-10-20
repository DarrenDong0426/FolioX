import { useTheme } from '../hooks/themeContext.jsx'; // Import theme context

/* Defines the SearchBar Component
 *
 * SearchBar with query
 * Takes in a query param for the current value in search bar
 * Takes in setQuery to modify the query in the search bar
 * setCurrentPage function to change the page to 1 on query change
 *  
*/
export default function SearchBar({ query, setQuery, setCurrentPage }) {
  const { isWarmthMode } = useTheme(); // Get theme mode from context

  return (
    <div className="flex items-center space-x-2 w-full">
        {/* Div: Context Wrapper on Search Bar Component
          * 
          * flex sets the flexbox format
          * items-center centers children element on the center of the cross axis (vertical here)
          * space-x-2 adds space in the x axis (horizontal)
          * w-full lets the search bar take the whole width
          * 
        */}
      <label htmlFor="search-input" className={`
        font-medium transition-colors
        ${isWarmthMode ? "text-gray-700" : "text-cyan-200"}
      `}>
        {/* Label: A text to label the input bar
          * 
          * text-gray-700 for warmth, text-cyan-200 for tech/dark mode
          * 
        */}
        Search:
      </label>
      <input
        id="search-input"
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setCurrentPage(1);
        }}
        className={`
          border rounded-md p-2 w-full max-w-xl
          focus:outline-none focus:ring-2 transition duration-200
          ${isWarmthMode
            ? "border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:ring-blue-400"
            : "border-cyan-800 bg-[#192534] text-cyan-100 placeholder-cyan-400 focus:ring-cyan-400"
          }
        `}
        placeholder="Type to search..."
      />
      {/* Input: input bar to act as search bar
          * 
          * border and background change for theme
          * text and placeholder adapt for legibility
          * ring color adapts 
        */}
    </div>
  );
}