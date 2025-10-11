import { useTheme } from "../hooks/themeContext.jsx";   // <-- Add this import for theme support

/* *
 * Sidebar Component
 * 
 * Sidebar component with list of items
 * Items param is the list of items to be enumerated on the sidebar
 * currIndex is the index of the selected item
 * setCurrDoc is a function to change the currIndex on click
 * 
 */
export default function Sidebar({ items, currIndex, setCurrDoc }) {
  const { isWarmthMode } = useTheme();   // Get current theme

  return (
    <div className={`
      h-screen w-64 border-r
      ${isWarmthMode ? "border-[#ffe6ea] bg-[#fff7f7]" : "border-cyan-900 bg-[#161b22]/95"}
      p-4 flex flex-col
    `}>
      {/* Div: Context wrapper over sidebar component
        * 
        * h-screen sets the height to be the size of the screen
        * w-64 sets the width of the component to 16rem (64 is the value set by CSS)
        * border-r adds a border to the right side of the component
        * border-gray-300 sets the color of the border to gray (now theme-aware)
        * bg-gray-50 sets the color of the background to gray (now theme-aware)
        * p-4 adds a padding of size 4 * 0.25rem = 1rem in all directions
        * flex sets the container to be in flex format
        * flex-col sets the children on the container to be in a column
        * 
        */}
      <h2 className={`
        text-xl font-semibold mb-6
        ${isWarmthMode ? "text-[#E94E41]" : "text-cyan-300"}
      `}>
        Documents
      </h2>
      {/* h2: header to indicate Documents
        * 
        * text-xl sets the size of the text to extra large
        * font-semibold sets the font of the text to semibold
        * mb-6 sets the bottom margin to 6 * 0.25 = 1.5rem
        * text-gray-800 sets the color of the text to gray (now theme-aware)
        * 
      */}
      <div className="space-y-2 overflow-y-auto">
        {/* Div: Context wrapper over the items of the sidebar
          * 
          * space-y-2 adds a space of 2 * 0.25rem = 0.5rem after each children component not including the first and last
          * overflow-y-auto shows a scroll bar in the y-direction only when needed
          * 
        */}
        {/* Iterate through each item in the items list */}
        {items.map((item, index) => (
          <button
            key={item.id}                                                 // Sets the key of each item to be the id
            onClick={() => setCurrDoc(index)}                             // On click, use setCurrDoc to set the new index to index
            className={`
              w-full text-left px-4 py-2 rounded-xl transition-colors
              ${index === currIndex
                ? isWarmthMode
                  ? "bg-[#E94E41]/90 text-white shadow-sm"
                  : "bg-cyan-700 text-cyan-50 shadow-sm"
                : isWarmthMode
                  ? "bg-white hover:bg-[#ffe6ea] text-[#E94E41]"
                  : "bg-[#232940] hover:bg-cyan-950 text-cyan-300"
              }
            `}
          >
            {/* Button: Each item on the list of items
              * 
              * w-full sets the size of the button to be the width of the container
              * text-left aligns the text to start on the left
              * px-4 adds a padding in the x direction by 4 * 0.25rem = 1 rem
              * py-2 adds a padding in the y direction by 2 * 0.25rem = 0.5rem
              * rounded-xl sets the container to be rounded on the corners
              * transition-color adds a transition in the color change
              * bg-blue-500 sets the background of the button to blue if selected (now theme-aware)
              * text-white sets the text color to be white if selected
              * shadow-sm adds a small shadow in all directions if selected
              * bg-white sets the background to be white if not selected
              * hover:bg-blue-100 sets the background to be lighter blue if not selected but hovered
              * text-gray-700 sets the text color to be gray if not selected (now theme-aware)
              * 
              */}
            {item.title}
          </button>
        ))}
      </div>
    </div>
  );
}