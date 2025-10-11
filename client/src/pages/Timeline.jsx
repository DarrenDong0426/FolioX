// Imports
import Header from "../components/Header";                               // Imports the Header component from the path ../components/Header.jsx
import { EventProvider } from "../hooks/eventsContext";                  // Import EventProvider from the path ../hooks/eventsContext.jsx
import Events from "../sections/Timeline/Events";                        // Import Events component from the path ../sections/Timeline/Events.jsx
import { useTheme } from '../hooks/themeContext.jsx';                   // Import theme context

/* *
 * Timeline page
 * 
 * Displays project/events in chronological order.
 * 
 */
export default function Timeline(){
  const { isWarmthMode } = useTheme();

  return (
    <div className={`
      min-h-screen flex flex-col transition-colors duration-500
      ${isWarmthMode
        ? "bg-[radial-gradient(ellipse_80%_60%_at_20%_10%,rgba(255,226,237,0.7)_60%,#fff8f3_100%)]"
        : "bg-[radial-gradient(ellipse_80%_60%_at_20%_10%,rgba(22,34,57,0.88)_60%,#1b2432_100%)]"
      }
    `}>
      {/* Div: Content Wrapper over the entire home page
        *
        * min-h-screen sets the minimum height of the element to be 100% of the viewpoint height (the entire browser window screen)
        * flex sets the children to be in a flexbox format
        * flex-col sets the flex direction to be columns so children are placed vertically
        * bg (theme-adaptive) sets the background of the timeline page
        *  
      */}
      <Header/>
      <main className='flex flex-col flex-1 px-4 py-3 min-h-0'>
        {/* Main: Content Wrapper over all sections. Main is used to identify the "main" part of this page
          *
          * flex-1 fills in the flex direction (column here)
          * overflow-y-auto shows scrollbar if children overflow. Otherwise, no scrollbar
          * px-4 sets the horizontal padding 
          * py-8 sets the vertical padding 
          * min-h-0 ensures that the main can shrink below its content size when inside a flex container
          *  
          */}
        <h1
          style={{ fontFamily: "'Orbitron', 'Arial', sans-serif" }}
          className={`
            text-4xl font-bold mb-8 text-center transition-colors tracking-wide uppercase drop-shadow-sm
            ${isWarmthMode ? "text-[#E94E41]" : "text-cyan-300"}
          `}
        >
          Timeline
        </h1>
        {/* h1: Overall project heading of the page
          *
          * text-4xl sets the text size of the heading to extra large 4x
          * font-bold sets the text emphasis to bold
          * mb-8 adds a margin to the bottom of the component
          * text-center puts the text in the center of the flex direction (horizontal here)
          * transition-colors for smooth theme transitions
          * tracking-wide for wider letters
          * uppercase for all caps
          * drop-shadow-sm for subtle shadow
          * dynamic color per theme
          *  
          */}
          
        <EventProvider>
          {/* Wrap the Events component with EventProvider to provide context */}
          <Events/>
        </EventProvider>
      </main>
    </div>
  );
}