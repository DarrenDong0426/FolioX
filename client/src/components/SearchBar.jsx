// Imports
import React from "react";                                          // Import React to make react components


/* Defines the SearchBar Component
 *
 * SearchBar with query
 * Takes in a query param for the current value in search bar
 * Takes in setQuery to modify the query in the search bar
 * setCurrentPage function to change the page to 1 on query change
 *  
*/
export default function SearchBar({ query, setQuery, setCurrentPage }) {
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
      <label htmlFor="search-input" className="text-gray-700 font-medium">
        {/* Label: A text to label the input bar
          * 
          * text-gray-700 sets the color of the label text
          * font-medium sets the emphasis of the text to medium boldness
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
        className="border border-gray-300 rounded-md p-2 w-full max-w-xl
                   focus:outline-none focus:ring-2 focus:ring-blue-400
                   transition duration-200"
        placeholder="Type to search..."
      />
      {/* Input: input bar to act as search bar
          * 
          * border adds a border around the input box
          * border-gray-300 sets the color of the border
          * rounded-md curve the corner of the input box
          * p-2 adds padding in all four direction
          * w-full sets the width to the max width size
          * max-w-xl sets the max width size to extra large
          * focus:outline-none removes the outline when using the search bar
          * focus:ring-2 sets a ring around the search bar when used
          * focus:ring-blue-400 sets the color of the ring when using the search bar
          * transition allows the ring to appear smoothly
          * duration-200 sets how fast the transition is
          * placeholder value is set to "Type to search..."
          * 
        */}
    </div>
  );
}
