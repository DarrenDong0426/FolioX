import { useTheme } from "../hooks/themeContext.jsx";   // Import theme context

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
      h-full w-64 border-r
      ${isWarmthMode
        ? "bg-[radial-gradient(ellipse_80%_60%_at_20%_10%,rgba(255,226,237,0.7)_60%,#fff8f3_100%)]"
        : "bg-[radial-gradient(ellipse_80%_60%_at_20%_10%,rgba(22,34,57,0.88)_60%,#1b2432_100%)]"
      }
      p-4 flex flex-col
    `}>
      {/* Div: Context wrapper over sidebar component
        * 
        * h-full ensures it fills its parent container's height
        * w-64 sets the width to 16rem
        * border-r for right border
        * radial-gradient, theme-aware
        * p-4 for padding, flex flex-col for column layout
        */}
      <h2 className={`
        text-xl font-semibold mb-6
        ${isWarmthMode ? "text-[#E94E41]" : "text-cyan-300"}
      `}>
        Documents
      </h2>
      {/* h2: header to indicate Documents
        * 
        * text-xl, font-semibold, mb-6 for style
        * color is theme-aware
        * 
      */}
      <div className="space-y-2 overflow-y-auto">
        {items.map((item, index) => (
          <button
            key={item.id}
            onClick={() => setCurrDoc(index)}
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
            {item.title}
          </button>
        ))}
      </div>
    </div>
  );
}
